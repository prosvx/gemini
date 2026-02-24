import React, { useState } from 'react';
import { ProfileData } from '../types';
import { 
  ChevronLeft, 
  MoreHorizontal, 
  BadgeCheck, 
  Grid3X3, 
  Clapperboard, 
  UserSquare2, 
  Home, 
  Search, 
  PlusSquare, 
  Heart,
  Circle,
  X,
  Download
} from 'lucide-react';

interface ProfilePreviewProps {
  data: ProfileData;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({ data }) => {
  const [enlargedImageUrl, setEnlargedImageUrl] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!enlargedImageUrl) return;
    try {
      const response = await fetch(enlargedImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback
      const link = document.createElement('a');
      link.href = enlargedImageUrl;
      link.download = 'image.jpg';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="w-full max-w-[375px] bg-white text-black rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-900 relative h-[812px] flex flex-col">
      {/* Dynamic Island / Notch Simulation */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-20"></div>

      {/* Status Bar Area */}
      <div className="h-12 w-full bg-white flex items-end justify-between px-6 pb-2 text-xs font-semibold z-10">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-3 bg-black rounded-sm"></div>
          <div className="w-4 h-3 bg-black rounded-sm"></div>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-6 h-6" />
          <span className="font-bold text-lg truncate max-w-[150px]">{data.username}</span>
          {data.isVerified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />}
        </div>
        <div className="flex gap-4">
          <div className="relative">
             <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            <Heart className="w-6 h-6" />
          </div>
          <MoreHorizontal className="w-6 h-6" />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
        
        {/* Profile Stats Header */}
        <div className="flex items-center px-4 py-4">
          {/* Avatar */}
          <div className="relative mr-8 cursor-pointer transition-transform hover:scale-105" onClick={() => setEnlargedImageUrl(data.profileImage)}>
            <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100">
                <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 flex justify-between text-center">
            <div>
              <div className="font-bold text-lg">{data.postsCount}</div>
              <div className="text-sm text-gray-500">Publicações</div>
            </div>
            <div>
              <div className="font-bold text-lg">{data.followersCount}</div>
              <div className="text-sm text-gray-500">Seguidores</div>
            </div>
            <div>
              <div className="font-bold text-lg">{data.followingCount}</div>
              <div className="text-sm text-gray-500">Seguindo</div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="px-4 pb-4">
          <div className="font-bold">{data.name}</div>
          <div className="text-gray-500 text-sm">{data.category}</div>
          <div className="text-sm whitespace-pre-line leading-tight mt-1">{data.bio}</div>
          {data.website && (
            <div className="text-sm text-blue-900 font-medium mt-1">🔗 {data.website}</div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-4 flex gap-2 mb-6">
          <button className="flex-1 bg-blue-500 text-white py-1.5 rounded-lg text-sm font-semibold">Seguir</button>
          <button className="flex-1 bg-gray-100 text-black py-1.5 rounded-lg text-sm font-semibold">Mensagem</button>
          <button className="bg-gray-100 px-2 rounded-lg flex items-center justify-center">
             <div className="w-4 h-4 border border-black rounded-sm"></div>
          </button>
        </div>

        {/* Highlights */}
        <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar mb-4">
          {data.highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col items-center gap-1 min-w-[64px]">
              <div 
                className="w-16 h-16 rounded-full border border-gray-200 p-0.5 cursor-pointer transition-transform hover:scale-105"
                onClick={() => setEnlargedImageUrl(highlight.imageUrl)}
              >
                <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
                   <img src={highlight.imageUrl} alt={highlight.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-xs truncate max-w-[60px]">{highlight.title}</div>
            </div>
          ))}
          <div className="flex flex-col items-center gap-1 min-w-[64px]">
             <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-2xl font-light text-gray-400">+</span>
             </div>
             <div className="text-xs">Novo</div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex border-t border-gray-200">
          <div className="flex-1 py-2 flex justify-center border-b-2 border-black">
            <Grid3X3 className="w-6 h-6" />
          </div>
          <div className="flex-1 py-2 flex justify-center text-gray-400">
            <Clapperboard className="w-6 h-6" />
          </div>
          <div className="flex-1 py-2 flex justify-center text-gray-400">
            <UserSquare2 className="w-6 h-6" />
          </div>
        </div>

        {/* Grid Posts */}
        <div className="grid grid-cols-3 gap-0.5">
          {data.posts.map((post) => (
            <div 
              key={post.id} 
              className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
              onClick={() => setEnlargedImageUrl(post.imageUrl)}
            >
              <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              {/* Optional: Hover effect for desktop view to see likes */}
              <div className="absolute inset-0 bg-black/30 hidden group-hover:flex items-center justify-center text-white font-bold gap-1">
                 <Heart className="w-4 h-4 fill-white" /> {post.likes}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="h-16 border-t border-gray-200 bg-white flex items-center justify-around px-2 z-10 pb-2">
        <Home className="w-7 h-7" />
        <Search className="w-7 h-7 text-gray-400" />
        <PlusSquare className="w-7 h-7 text-gray-400" />
        <Clapperboard className="w-7 h-7 text-gray-400" />
        <div className="w-7 h-7 rounded-full overflow-hidden">
             <img src={data.profileImage} alt="Me" className="w-full h-full object-cover" />
        </div>
      </div>
      
       {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-20"></div>
    </div>

      {/* Enlarged Image Modal */}
      {enlargedImageUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setEnlargedImageUrl(null)}>
          <div className="relative max-w-md w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
              onClick={() => setEnlargedImageUrl(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className={`w-full ${enlargedImageUrl === data.profileImage || enlargedImageUrl.includes('highlight') ? 'aspect-square rounded-full border-4 border-white/20' : 'aspect-square rounded-xl'} overflow-hidden shadow-2xl bg-gray-900`}>
              <img 
                src={enlargedImageUrl} 
                alt="Enlarged" 
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              onClick={handleDownload}
              className="mt-8 flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <Download className="w-5 h-5" />
              Baixar Imagem
            </button>
          </div>
        </div>
      )}
    </>
  );
};