import React from 'react';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { HorseProfile } from '../types/campo';
import { SafeImage } from './SafeImage';

interface HorseDetailViewProps {
  horse: HorseProfile;
  onBack: () => void;
  onMessageOwner: (horse: HorseProfile) => void;
  onOpenGalleryImage: (imageUrl: string, caption: string) => void;
}

export const HorseDetailView: React.FC<HorseDetailViewProps> = ({
  horse,
  onBack,
  onMessageOwner,
  onOpenGalleryImage,
}) => {
  const specs = [
    { label: 'Raza', value: horse.breed },
    { label: 'Edad', value: horse.age },
    { label: 'Capa', value: horse.coat },
    { label: 'Alzada', value: horse.height },
  ];

  return (
    <div className="pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-[#F7F5F0]/95 backdrop-blur-md px-3 py-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all text-[#1F1A15] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.1} />
        </button>
        <h1 className="font-display text-[19px] font-bold text-[#1F1A15] truncate">
          Ficha del Caballo
        </h1>
      </header>

      <div className="px-4 pt-1">
        {/* Hero Card */}
        <div className="relative rounded-[24px] overflow-hidden h-[276px] shadow-[0_4px_18px_rgba(43,31,20,0.08)] mb-4">
          <SafeImage
            src={horse.image}
            alt={horse.name}
            className="w-full h-full object-cover"
            fallbackLabel={horse.name}
          />

          {/* Bottom Scrim */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(24,16,9,0.12) 0%, rgba(24,16,9,0.05) 45%, rgba(22,14,7,0.82) 100%)',
            }}
          />

          {/* Top-left Badge */}
          <span className="absolute top-3.5 left-3.5 inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#8C6239]/90 backdrop-blur-sm text-white text-[12px] font-semibold shadow-sm">
            {horse.badge}
          </span>

          {/* Bottom Name & Registry */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="font-display text-[25px] font-extrabold leading-tight drop-shadow-sm">
              {horse.name}
            </h2>
            <p className="text-[12.5px] text-white/85 mt-1 font-normal">
              {horse.registryCode}
            </p>
          </div>
        </div>

        {/* 4 Spec Cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="bg-white rounded-[16px] py-3 px-1.5 text-center shadow-[0_2px_10px_rgba(43,31,20,0.04)]"
            >
              <p className="text-[11px] text-[#7D7369] font-normal">
                {spec.label}
              </p>
              <p className="font-display text-[13px] font-extrabold text-[#8C6239] mt-1 leading-tight tabular-nums">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

        {/* Owner Card */}
        <div className="bg-white rounded-[20px] p-3.5 shadow-[0_2px_12px_rgba(43,31,20,0.045)] flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <SafeImage
              src={horse.ownerAvatar}
              alt={horse.ownerName}
              className="w-11 h-11 rounded-full object-cover shrink-0 border border-[#EAE4DA]"
              fallbackLabel={horse.ownerName[0]}
            />
            <div className="min-w-0">
              <p className="text-[12px] text-[#6E655D] font-medium">
                {horse.ownerRole}
              </p>
              <p className="font-display text-[14.5px] font-bold text-[#8C6239] truncate">
                {horse.ownerName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onMessageOwner(horse)}
            aria-label={`Enviar mensaje a ${horse.ownerName}`}
            className="w-11 h-11 rounded-full bg-[#E9F0E6] hover:bg-[#DCE7D7] active:scale-95 transition-all flex items-center justify-center text-[#4D6646] shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>
        </div>

        {/* Bio snippet */}
        <p className="text-[13px] leading-relaxed text-[#5C534B] mb-5 px-0.5">
          {horse.bio}
        </p>

        {/* Galería del Campeón */}
        <section>
          <h3 className="font-display text-[16.5px] font-bold text-[#1F1A15] mb-3">
            Galería del Campeón
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {horse.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  onOpenGalleryImage(
                    imgUrl,
                    `${horse.name} — Galería del Campeón (${idx + 1}/3)`
                  )
                }
                className="aspect-square rounded-[14px] overflow-hidden bg-[#EAE4DA] shadow-[0_1px_6px_rgba(43,31,20,0.06)] group cursor-pointer active:scale-[0.97] transition-transform"
              >
                <SafeImage
                  src={imgUrl}
                  alt={`${horse.name} foto ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  fallbackLabel={horse.name}
                />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
