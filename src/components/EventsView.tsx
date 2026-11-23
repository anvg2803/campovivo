import React from 'react';
import { ArrowLeft, Calendar, CheckCircle2, ChevronRight, MapPin, Users } from 'lucide-react';
import { EquestrianEvent } from '../types/campo';
import { SafeImage } from './SafeImage';

interface EventsListViewProps {
  events: EquestrianEvent[];
  onSelectEvent: (event: EquestrianEvent) => void;
}

export const EventsListView: React.FC<EventsListViewProps> = ({
  events,
  onSelectEvent,
}) => {
  return (
    <div className="pb-24">
      <header className="px-5 pt-5 pb-3">
        <h1 className="font-display text-[22px] font-extrabold tracking-tight text-[#1F1A15] leading-tight">
          Eventos Ecuestres
        </h1>
        <p className="text-[13px] text-[#6E655D] mt-0.5">
          Cabalgatas, ferias y clínicas de la temporada
        </p>
      </header>

      <section className="px-4 space-y-4">
        {events.map((ev, idx) => (
          <article
            key={ev.id}
            onClick={() => onSelectEvent(ev)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectEvent(ev);
              }
            }}
            className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(43,31,20,0.045)] cursor-pointer group active:scale-[0.99] transition-transform"
          >
            <div className="relative h-[168px] overflow-hidden">
              <SafeImage
                src={ev.image}
                alt={ev.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fallbackLabel={ev.title}
              />
              {ev.registered && (
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-[#4D6646] text-white text-[11.5px] font-semibold px-3 py-1 rounded-full shadow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Inscrito</span>
                </div>
              )}
              {idx === 0 && !ev.registered && (
                <div className="absolute top-3 left-3 inline-flex items-center bg-[#8C6239]/95 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Destacado
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2.5 text-[12px] mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E9F0E6] text-[#3F5838] font-semibold">
                  {ev.category}
                </span>
                <span className="text-[#7D7369]">{ev.availabilityLabel}</span>
              </div>

              <h2 className="font-display text-[17.5px] font-bold text-[#1F1A15] leading-snug">
                {ev.title}
              </h2>

              <div className="mt-2.5 space-y-1 text-[12.5px] text-[#6E655D]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#8C6239] shrink-0" />
                  <span className="truncate">{ev.dateLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6239] shrink-0" />
                  <span className="truncate">{ev.meetingPoint}</span>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-[#F1EDE6] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[12.5px] text-[#4A4139] font-medium tabular-nums">
                  <Users className="w-4 h-4 text-[#8C6239]" />
                  <span>{ev.confirmedCount} jinetes</span>
                </div>

                <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#8C6239]">
                  <span>{ev.registered ? 'Ver pase' : `$${ev.priceUsd} USD`}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

interface EventDetailViewProps {
  event: EquestrianEvent;
  onBack: () => void;
  onOpenRegistration: (event: EquestrianEvent) => void;
  onCancelRegistration: (eventId: string) => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event,
  onBack,
  onOpenRegistration,
  onCancelRegistration,
}) => {
  const extraCount = Math.max(0, event.confirmedCount - event.riderAvatars.length);

  return (
    <div className="pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-[#F7F5F0]/95 backdrop-blur-md px-3 py-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver a eventos"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all text-[#1F1A15] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.1} />
        </button>
        <h1 className="font-display text-[19px] font-bold text-[#1F1A15] truncate">
          Detalle de Evento
        </h1>
      </header>

      <div className="px-4 pt-1">
        {/* Hero Image */}
        <div className="rounded-[20px] overflow-hidden shadow-[0_3px_14px_rgba(43,31,20,0.06)] mb-4">
          <SafeImage
            src={event.image}
            alt={event.title}
            className="w-full h-[200px] object-cover"
            fallbackLabel={event.title}
          />
        </div>

        {/* Category Badge + Availability */}
        <div className="flex items-center gap-3 mb-2.5">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#E8F0E5] text-[#435F3C] text-[12px] font-semibold">
            {event.category}
          </span>
          <span className="text-[13px] font-medium text-[#6E655D]">
            {event.availabilityLabel}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-[24px] leading-[1.18] font-extrabold text-[#1F1A15] tracking-tight mb-4">
          {event.title}
        </h2>

        {/* Info Card: Fecha y Hora & Punto de Encuentro */}
        <div className="bg-white rounded-[20px] p-4 shadow-[0_2px_12px_rgba(43,31,20,0.045)] mb-5">
          <div className="flex items-start gap-3.5 pb-3.5 border-b border-[#EFEBE4]">
            <div className="w-10 h-10 rounded-xl bg-[#F4F0E8] flex items-center justify-center shrink-0 text-[#8C6239]">
              <Calendar className="w-5 h-5" strokeWidth={1.9} />
            </div>
            <div className="min-w-0">
              <p className="text-[13.5px] font-bold text-[#1F1A15]">
                Fecha y Hora
              </p>
              <p className="text-[13px] text-[#6E655D] mt-0.5 leading-snug">
                {event.dateLabel}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 pt-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F4F0E8] flex items-center justify-center shrink-0 text-[#8C6239]">
              <MapPin className="w-5 h-5" strokeWidth={1.9} />
            </div>
            <div className="min-w-0">
              <p className="text-[13.5px] font-bold text-[#1F1A15]">
                Punto de Encuentro
              </p>
              <p className="text-[13px] text-[#6E655D] mt-0.5 leading-snug">
                {event.meetingPoint}
              </p>
            </div>
          </div>
        </div>

        {/* Jinetes Confirmados */}
        <div className="mb-5">
          <h3 className="font-display text-[15.5px] font-bold text-[#1F1A15] mb-3 tabular-nums">
            Jinetes Confirmados ({event.confirmedCount})
          </h3>
          <div className="flex items-center">
            <div className="flex -space-x-2.5">
              {event.riderAvatars.map((av, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full ring-2 ring-[#F7F5F0] overflow-hidden bg-[#EAE4DA]"
                >
                  <SafeImage
                    src={av}
                    alt={`Jinete confirmado ${idx + 1}`}
                    className="w-full h-full object-cover"
                    fallbackLabel="J"
                  />
                </div>
              ))}
              {extraCount > 0 && (
                <div className="w-10 h-10 rounded-full ring-2 ring-[#F7F5F0] bg-[#8C6239] text-white text-[12px] font-bold flex items-center justify-center tabular-nums">
                  +{extraCount}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Description */}
        <p className="text-[13.5px] leading-relaxed text-[#5C534B] mb-5">
          {event.description}
        </p>

        {/* Primary Action CTA */}
        {event.registered ? (
          <div className="bg-[#EBF2E8] border border-[#C6D9BE] rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-[#3B5434] font-bold text-[14.5px]">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>¡Tu inscripción está confirmada!</span>
            </div>
            <p className="text-[12.5px] text-[#4C6345]">
              Ejemplar registrado: <strong>{event.selectedHorseName || 'Don Juan de Villa'}</strong> · Pase digital #CV-2026-46
            </p>
            <button
              type="button"
              onClick={() => onCancelRegistration(event.id)}
              className="text-[12px] font-semibold text-[#6E655D] hover:text-[#1F1A15] underline pt-1 cursor-pointer"
            >
              Cancelar mi inscripción
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpenRegistration(event)}
            className="w-full h-[52px] rounded-2xl bg-[#8C6239] hover:bg-[#7C532B] active:scale-[0.985] transition-all text-white font-bold text-[15px] shadow-[0_6px_18px_rgba(140,98,57,0.28)] cursor-pointer"
          >
            Inscribirme al Evento (${event.priceUsd} USD)
          </button>
        )}
      </div>
    </div>
  );
};
