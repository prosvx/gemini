export interface ProfileData {
  username: string;
  name: string;
  category: string;
  bio: string;
  website: string;
  postsCount: string;
  followersCount: string;
  followingCount: string;
  isVerified: boolean;
  profileImage: string; // URL
  posts: Post[];
  highlights: Highlight[];
}

export interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  caption: string;
}

export interface Highlight {
  id: string;
  title: string;
  imageUrl: string;
}

export const INITIAL_PROFILE: ProfileData = {
  username: "estudio_criativo_design",
  name: "Estúdio Criativo",
  category: "Arte e Design",
  bio: "Ajudando marcas a contar sua história através do design minimalista. \n📍 São Paulo, SP\n👇 Confira nosso portfólio",
  website: "www.designstudio.com.br",
  postsCount: "142",
  followersCount: "12.5K",
  followingCount: "420",
  isVerified: true,
  profileImage: "https://picsum.photos/seed/profile1/200/200",
  highlights: [
    { id: '1', title: 'Trabalhos', imageUrl: 'https://picsum.photos/seed/highlight1/100/100' },
    { id: '2', title: 'Equipe', imageUrl: 'https://picsum.photos/seed/highlight2/100/100' },
    { id: '3', title: 'Eventos', imageUrl: 'https://picsum.photos/seed/highlight3/100/100' },
    { id: '4', title: 'Dúvidas', imageUrl: 'https://picsum.photos/seed/highlight4/100/100' },
  ],
  posts: Array.from({ length: 9 }).map((_, i) => ({
    id: i.toString(),
    imageUrl: `https://picsum.photos/seed/post${i + 1}/400/400`,
    likes: Math.floor(Math.random() * 1000) + 50,
    caption: "Boas vibrações apenas ✨ #design #arte"
  }))
};