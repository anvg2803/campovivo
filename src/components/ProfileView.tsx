import React, { useState } from 'react';
import { ChevronRight, LogOut, Sparkles } from 'lucide-react';
import { CURRENT_USER, PROFILE_GALLERY } from '../data/mockData';
import { HorseProfile } from '../types/campo';
import { SafeImage } from './SafeImage';

interface ProfileViewProps {
  horses: HorseProfile[];
  onSelectHorse: (horseId: string) => void;
  onSelectGalleryItem: (item: { image: string; caption: string; likes: number; horseId?: string }) => void;
  onShowWelcome: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  horses,
  onSelectHorse,
  onSelectGalleryItem,
  onShowWelcome,
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'horses'>('posts');

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h1 className="font-display text-[22px] font-extrabold tracking-tight text-[#1F1A15]">
          Mi Perfil
        </h1>

        <button
          type="button"
          onClick={onShowWelcome}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#8C6239] hover:text-[#7C532B] bg-white px-3 py-1.5 rounded-full shadow-[0_1px_4px_rgba(43,31,20,0.06)] cursor-pointer transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Bienvenida</span>
        </button>
      </header>

      {/* Profile Identity Row */}
      <section className="px-5 pt-2 pb-5 flex items-center gap-4">
        <div className="w-[76px] h-[76px] rounded-full p-[3px] bg-[#8C6239] shrink-0 shadow-sm">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#F7F5F0]">
            <SafeImage
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-full h-full object-cover"
              fallbackLabel="AG"
            />
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-[20px] font-extrabold text-[#1F1A15] leading-tight truncate">
            {CURRENT_USER.name}
          </h2>
          <p className="text-[13px] text-[#6E655D] mt-1">
            {CURRENT_USER.roleLocation}
          </p>
        </div>
      </section>

      {/* Stats Card */}
      <section className="px-4 mb-5">
        <div className="bg-white rounded-[20px] py-3.5 px-4 shadow-[0_2px_12px_rgba(43,31,20,0.045)] grid grid-cols-3 divide-x divide-[#F1EDE6] text-center">
          <button
            type="button"
            onClick={() => setActiveTab('horses')}
            className="cursor-pointer group"
          >
            <p className="font-display text-[19px] font-extrabold text-[#8C6239] tabular-nums group-hover:scale-105 transition-transform">
              {horses.length}
            </p>
            <p className="text-[12px] text-[#6E655D] mt-0.5">Caballos</p>
          </button>

          <div>
            <p className="font-display text-[19px] font-extrabold text-[#8C6239] tabular-nums">
              {CURRENT_USER.stats.routes}
            </p>
            <p className="text-[12px] text-[#6E655D] mt-0.5">Rutas</p>
          </div>

          <div>
            <p className="font-display text-[19px] font-extrabold text-[#8C6239] tabular-nums">
              {CURRENT_USER.stats.followers}
            </p>
            <p className="text-[12px] text-[#6E655D] mt-0.5">Seguidores</p>
          </div>
        </div>
      </section>

      {/* Sub-Tabs */}
      <div className="px-5 border-b border-[#E8E2D9] flex items-center gap-7 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('posts')}
          className={`pb-2.5 text-[14.5px] font-semibold relative transition-colors cursor-pointer ${
            activeTab === 'posts'
              ? 'text-[#8C6239]'
              : 'text-[#7D7369] hover:text-[#1F1A15]'
          }`}
        >
          Publicaciones
          {activeTab === 'posts' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#8C6239]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('horses')}
          className={`pb-2.5 text-[14.5px] font-semibold relative transition-colors cursor-pointer ${
            activeTab === 'horses'
              ? 'text-[#8C6239]'
              : 'text-[#7D7369] hover:text-[#1F1A15]'
          }`}
        >
          Mis Caballos ({horses.length})
          {activeTab === 'horses' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#8C6239]" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'posts' ? (
        <section aria-label="Galería de publicaciones" className="px-4">
          <div className="grid grid-cols-3 gap-2.5">
            {PROFILE_GALLERY.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectGalleryItem(item)}
                className="aspect-square rounded-[14px] overflow-hidden bg-[#EAE4DA] shadow-[0_1px_4px_rgba(43,31,20,0.06)] group cursor-pointer active:scale-[0.97] transition-transform"
              >
                <SafeImage
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  fallbackLabel="Foto"
                />
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section aria-label="Mis caballos registrados" className="px-4 space-y-3">
          {horses.map((horse) => (
            <article
              key={horse.id}
              onClick={() => onSelectHorse(horse.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectHorse(horse.id);
                }
              }}
              className="bg-white rounded-[18px] p-3 shadow-[0_2px_10px_rgba(43,31,20,0.045)] flex items-center gap-3.5 cursor-pointer hover:bg-[#FCFBF8] active:scale-[0.99] transition-all"
            >
              <div className="w-[68px] h-[68px] rounded-[14px] overflow-hidden shrink-0 bg-[#EAE4DA]">
                <SafeImage
                  src={horse.image}
                  alt={horse.name}
                  className="w-full h-full object-cover"
                  fallbackLabel={horse.name[0]}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8C6239] mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{horse.badge}</span>
                </div>
                <h3 className="font-display text-[15.5px] font-bold text-[#1F1A15] truncate">
                  {horse.name}
                </h3>
                <p className="text-[12.5px] text-[#6E655D] truncate">
                  {horse.breed} · {horse.age} · {horse.coat}
                </p>
              </div>

              <ChevronRight className="w-5 h-5 text-[#9C9186] shrink-0" />
            </article>
          ))}
        </section>
      )}
    </div>
  );
};
