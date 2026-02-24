import React, { useState } from 'react';
import { ProfileData } from '../types';
import { Sparkles, RefreshCw, Loader2 } from 'lucide-react';

interface ProfileFormProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
  onGenerate: (prompt: string) => Promise<void>;
  isGenerating: boolean;
}

const CATEGORIES = [
  "Influenciador de Estilo de Vida",
  "Fotógrafo de Viagem", 
  "Startup de Tecnologia", 
  "Chef Gourmet", 
  "Treinador Fitness", 
  "Artista Digital", 
  "Pet Influencer", 
  "Marca de Moda", 
  "Músico Indie", 
  "Designer de Interiores", 
  "Streamer de Games", 
  "Guru do Bem-Estar",
  "Marca de Streetwear",
  "Cafeteria",
  "Estúdio de Yoga"
];

export const ProfileForm: React.FC<ProfileFormProps> = ({ data, onChange, onGenerate, isGenerating }) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const handleChange = (field: keyof ProfileData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const handleGenerate = () => {
    onGenerate(selectedCategory);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 w-full max-w-xl">
      {/* AI Generator Section */}
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl border border-indigo-100">
        <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Gerador de Perfil IA
        </h3>
        <p className="text-sm text-indigo-700 mb-4">
            Selecione uma categoria abaixo e deixe a IA criar uma persona única para você instantaneamente.
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none px-4 py-2 pr-8 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700 cursor-pointer"
              disabled={isGenerating}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-600">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap shadow-sm active:transform active:scale-95"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Gerar
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 my-6"></div>

      {/* Manual Editing Form */}
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-gray-500" />
        Edição Manual
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Usuário</label>
            <input
              type="text"
              value={data.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Nome de Exibição</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Categoria</label>
            <input
              type="text"
              value={data.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors"
            />
          </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Biografia</label>
          <textarea
            value={data.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Site</label>
          <input
            type="text"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Publicações</label>
            <input
              type="text"
              value={data.postsCount}
              onChange={(e) => handleChange('postsCount', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-center"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Seguidores</label>
            <input
              type="text"
              value={data.followersCount}
              onChange={(e) => handleChange('followersCount', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-center"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Seguindo</label>
            <input
              type="text"
              value={data.followingCount}
              onChange={(e) => handleChange('followingCount', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-center"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
           <input 
             type="checkbox" 
             id="verified"
             checked={data.isVerified}
             onChange={(e) => handleChange('isVerified', e.target.checked)}
             className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
           />
           <label htmlFor="verified" className="text-sm font-medium text-gray-700">Conta Verificada (Selo Azul)</label>
        </div>
        
        <div className="pt-4">
            <p className="text-xs text-gray-400 italic">
                Nota: As imagens do perfil e das publicações são geradas usando placeholders do Picsum. Para alterá-las, gere um novo conjunto via IA ou modifique a URL no estado do código.
            </p>
        </div>
      </div>
    </div>
  );
};