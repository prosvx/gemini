import React, { useState } from 'react';
import { ProfileData, INITIAL_PROFILE } from './types';
import { ProfilePreview } from './components/ProfilePreview';
import { ProfileForm } from './components/ProfileForm';
import { generateProfileWithAI } from './services/geminiService';
import { Instagram, Smartphone, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);
    try {
      const newData = await generateProfileWithAI(prompt);
      setProfileData(newData);
    } catch (err) {
      console.error(err);
      setError("Falha ao gerar perfil. Verifique se você tem uma chave API válida configurada ou tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white p-2 rounded-xl shadow-md">
              <Instagram className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Insta<span className="text-purple-600">Gen</span> AI
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-gray-500">
             <span className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                <Smartphone className="w-4 h-4" /> Modo Visualização
             </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center">
        
        {/* Left Side: Controls */}
        <div className="w-full lg:flex-1 flex flex-col items-center lg:items-end space-y-6">
          <div className="w-full max-w-xl">
             <div className="mb-6">
                 <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Crie seus mockups.</h2>
                 <p className="text-gray-600 text-lg">
                    Gere instantaneamente prévias realistas de perfis do Instagram para seus moodboards, brincadeiras ou projetos de design usando Gemini AI.
                 </p>
             </div>
             
             {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{error}</p>
                </div>
             )}

             <ProfileForm 
                data={profileData} 
                onChange={setProfileData} 
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
             />
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="w-full lg:w-auto flex justify-center lg:sticky lg:top-24">
            <div className="relative">
                {/* Decorative blobs behind phone */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                
                <ProfilePreview data={profileData} />
            </div>
        </div>

      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} InstaGen AI. Não afiliado ao Instagram/Meta.</p>
      </footer>
    </div>
  );
};

export default App;