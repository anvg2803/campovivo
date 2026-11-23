import React, { useState } from 'react';
import { Award, Calendar, Home, Map, MapPin, Star } from 'lucide-react';
import { IMAGES } from '../data/mockData';
import { ExploreCategory, ExplorePlace } from '../types/campo';
import { SafeImage } from './SafeImage';

interface ExploreViewProps {
  places: ExplorePlace[];
  onOpenMap: () => void;
  onSelectPlace: (place: ExplorePlace) => void;
  onGoToEvents: () => void;
}

const FILTER_OPTIONS: {
  id: Exclude<ExploreCategory, 'all'>;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'Fincas', label: 'Fincas', icon: Home },
  { id: 'Cabalgatas', label: 'Cabalgatas', icon: Map },
  { id: 'Escuelas', label: 'Escuelas', icon: Award },
  { id: 'Eventos', label: 'Eventos', icon: Calendar },
];

export const ExploreView: React.FC<ExploreViewProps> = ({
  places,
  onOpenMap,
  onSelectPlace,
  onGoToEvents,
}) => {
  const [activeFilter, setActiveFilter] = useState<ExploreCategory>('all');

  const filteredPlaces =
    activeFilter === 'all'
      ? places
      : places.filter((p) => p.tags.includes(activeFilter));

  const handleFilterClick = (category: Exclude<ExploreCategory, 'all'>) => {
    setActiveFilter((prev) => (prev === category ? 'all' : category));
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-5 pt-5 pb-3">
        <h1 className="font-display text-[22px] font-extrabold tracking-tight text-[#1F1A15] leading-tight">
          Explorar Campo
        </h1>
        <p className="text-[13px] text-[#6E655D] mt-0.5">
          Rutas y Escuelas Cercanas
        </p>
      </header>

      {/* Top Illustrated Map Card */}
      <section className="px-4 mb-4">
        <div
          onClick={onOpenMap}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenMap();
            }
          }}
          className="relative w-full h-[156px] rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(43,31,20,0.06)] cursor-pointer group"
        >
          <SafeImage
            src={IMAGES.mapaRutas}
            alt="Mapa ilustrado de rutas ecuestres"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            fallbackLabel="Mapa de rutas ecuestres"
          />

          {/* Subtle corner pins on map preview */}
          <div className="absolute top-[54%] left-[38%] w-3 h-3 rounded-full bg-[#8C6239] ring-4 ring-white/80 shadow" />
          <div className="absolute top-[42%] left-[72%] w-3 h-3 rounded-full bg-[#4D6646] ring-4 ring-white/80 shadow" />

          {/* Floating Map Action Pill */}
          <div className="absolute top-3 left-3 inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-[#1F1A15] px-3.5 py-2 rounded-full shadow-sm text-[12.5px] font-semibold group-hover:bg-white transition-colors">
            <MapPin className="w-4 h-4 text-[#8C6239]" strokeWidth={2} />
            <span>Ver mapa de rutas ecuestres</span>
          </div>
        </div>
      </section>

      {/* Filter Chips */}
      <section aria-label="Filtrar por categoría" className="px-4 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          {FILTER_OPTIONS.map((item) => {
            const Icon = item.icon;
            const isActive = activeFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleFilterClick(item.id)}
                className={`min-h-[40px] px-3.5 py-2 rounded-full text-[13px] font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#4D6646] text-white shadow-sm'
                    : 'bg-white text-[#2B241D] hover:bg-[#EFECE5] shadow-[0_1px_4px_rgba(43,31,20,0.04)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recommended Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <h2 className="font-display text-[17px] font-bold text-[#1F1A15]">
            {activeFilter === 'all'
              ? 'Recomendado para ti'
              : `Resultados · ${activeFilter}`}
          </h2>
          {activeFilter !== 'all' && (
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="text-[12.5px] font-semibold text-[#8C6239] hover:text-[#7C532B] cursor-pointer py-1 px-2"
            >
              Ver todo
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filteredPlaces.map((place) => (
            <article
              key={place.id}
              onClick={() => onSelectPlace(place)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPlace(place);
                }
              }}
              className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(43,31,20,0.045)] cursor-pointer group active:scale-[0.99] transition-transform"
            >
              <div className="w-full h-[152px] overflow-hidden">
                <SafeImage
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  fallbackLabel={place.title}
                />
              </div>

              <div className="p-4">
                <h3 className="font-display text-[16.5px] font-bold text-[#1F1A15] leading-snug">
                  {place.title}
                </h3>
                <p className="text-[13px] text-[#6E655D] mt-0.5">
                  {place.subtitle}
                </p>

                <div className="mt-3 flex items-center justify-between text-[12.5px] gap-2">
                  <span className="text-[#7D7369] truncate">{place.metaLeft}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#1F1A15] whitespace-nowrap shrink-0 tabular-nums">
                    <Star
                      className="w-3.5 h-3.5 text-[#8C6239]"
                      fill="#8C6239"
                      strokeWidth={1.5}
                    />
                    {place.rating}
                    <span className="font-normal text-[#6E655D]">
                      {place.reviewsLabel}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          ))}

          {activeFilter === 'Eventos' && (
            <button
              type="button"
              onClick={onGoToEvents}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#8C6239] hover:bg-[#7C532B] text-white font-semibold text-[13.5px] transition-colors cursor-pointer"
            >
              Ver calendario completo de Eventos Ecuestres
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
