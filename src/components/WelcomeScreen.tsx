import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/mockData';
import { SafeImage } from './SafeImage';

interface WelcomeScreenProps {
  onEnterApp: () => void;
  onEnterExplore: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onEnterApp,
  onEnterExplore,
}) => {
  return (
    <div className="relative w-full h-full min-h-[100dvh] sm:min-h-full flex flex-col justify-between overflow-hidden bg-[#26180C] text-white select-none">
      {/* Background equestrian sunset image */}
      <SafeImage
        src={IMAGES.welcomeSunset}
        alt="Caballo galopando al atardecer en CampoVivo"
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03]"
        fallbackLabel="CampoVivo"
      />

      {/* Warm atmospheric contrast scrims */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(36, 22, 10, 0.72) 0%, rgba(46, 28, 13, 0.34) 42%, rgba(28, 17, 7, 0.90) 100%)',
        }}
      />

      {/* Top breathing space */}
      <div className="relative z-10 pt-10 px-6 flex justify-end">
        <button
          type="button"
          onClick={onEnterExplore}
          className="text-xs font-medium text-white/80 hover:text-white transition-colors min-h-[44px] px-3 flex items-center gap-1 whitespace-nowrap"
        >
          Explorar rutas
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center brand emblem & title */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-8">
        <div className="w-24 h-24 rounded-full border border-white/45 bg-white/10 backdrop-blur-[2px] flex items-center justify-center mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.28)]">
          {/* Custom equestrian horseshoe & crest mark */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-white"
          >
            <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.85" />
            <path
              d="M17.5 31.5C15.2 28.5 14.5 24.4 15.8 20.5C17.2 16.5 20.4 14 24 14C27.6 14 30.8 16.5 32.2 20.5C33.5 24.4 32.8 28.5 30.5 31.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M16.5 31.5H19.8M28.2 31.5H31.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="24" cy="22.5" r="2.2" fill="currentColor" />
          </svg>
        </div>

        <h1 className="font-display text-[38px] leading-[1.08] font-extrabold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
          CampoVivo
        </h1>

        <p className="mt-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-white/90 uppercase">
          CABALLO, FINCA Y TRADICIÓN
        </p>
      </div>

      {/* Bottom tagline & primary CTA */}
      <div className="relative z-10 px-6 pb-10 pt-8 flex flex-col items-center text-center">
        <p className="text-[15px] leading-relaxed text-white/95 max-w-[280px] mb-6 font-normal">
          La comunidad ecuestre más grande de Latinoamérica te está esperando.
        </p>

        <button
          type="button"
          onClick={onEnterApp}
          className="w-full h-[52px] rounded-2xl bg-[#8C6239] hover:bg-[#7C532B] active:scale-[0.985] transition-all duration-150 text-white font-semibold text-[15px] shadow-[0_10px_28px_rgba(0,0,0,0.35)] flex items-center justify-center cursor-pointer"
        >
          Ingresar con CampoID
        </button>
      </div>
    </div>
  );
};
