import { GoogleGenAI, Type } from "@google/genai";
import { ProfileData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProfileWithAI = async (category: string): Promise<ProfileData> => {
  
  const systemInstruction = `You are an expert social media manager and creative director. 
  Your task is to generate realistic, engaging, and creative Instagram profile data based on a user's selected category.
  The OUTPUT CONTENT MUST BE IN PORTUGUESE (Brazil).
  Return strictly JSON data.
  Ensure the profile image and post images utilize 'https://picsum.photos/...' URLs with random seeds to ensure variety.
  `;

  // We add 'random' instructions to the prompt to ensure repeated clicks on the same category produce different results.
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a UNIQUE and CREATIVE fictional Instagram profile for the category: "${category}". 
    Create a specific persona within this category (don't just be generic).
    Make it look authentic. Create 9 distinct posts with captions suitable for this specific persona. Create 4 highlights.
    Ensure all text (bio, names, captions, highlight titles) is in Portuguese.`,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          username: { type: Type.STRING },
          name: { type: Type.STRING },
          category: { type: Type.STRING },
          bio: { type: Type.STRING },
          website: { type: Type.STRING },
          postsCount: { type: Type.STRING },
          followersCount: { type: Type.STRING },
          followingCount: { type: Type.STRING },
          isVerified: { type: Type.BOOLEAN },
          profileImage: { type: Type.STRING, description: "Use https://picsum.photos/200/200?random=999" },
          highlights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                imageUrl: { type: Type.STRING, description: "Use https://picsum.photos/100/100?random=XXX" }
              }
            }
          },
          posts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                imageUrl: { type: Type.STRING, description: "Use https://picsum.photos/400/400?random=XXX" },
                likes: { type: Type.NUMBER },
                caption: { type: Type.STRING }
              }
            }
          }
        },
        required: ["username", "name", "bio", "posts", "highlights"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No data returned from Gemini");
  }

  const data = JSON.parse(response.text);
  
  // Post-process to ensure image URLs are valid placeholders if the model hallucinates a bad URL
  // We re-randomize seeds here in the client to guarantee fresh images every time, regardless of what the model returns for the URL string.
  const randomSeed = Math.floor(Math.random() * 10000);
  
  const processedData: ProfileData = {
    ...data,
    profileImage: `https://picsum.photos/seed/${randomSeed}/200/200`,
    highlights: data.highlights.map((h: any, i: number) => ({
        ...h,
        imageUrl: `https://picsum.photos/seed/${randomSeed + i + 100}/100/100`
    })),
    posts: data.posts.map((p: any, i: number) => ({
        ...p,
        imageUrl: `https://picsum.photos/seed/${randomSeed + i + 200}/400/400`
    }))
  };

  return processedData;
};