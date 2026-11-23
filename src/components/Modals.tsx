import React, { useState } from 'react';
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Heart,
  MapPin,
  Send,
  Star,
  X,
} from 'lucide-react';
import { CURRENT_USER, IMAGES } from '../data/mockData';
import {
  EquestrianEvent,
  ExplorePlace,
  HorseProfile,
  NotificationItem,
  PostItem,
  StoryItem,
} from '../types/campo';
import { SafeImage } from './SafeImage';

/* -------------------------------------------------------------------------- */
/* 1. Story Viewer Modal                                                      */
/* -------------------------------------------------------------------------- */
export const StoryViewerModal: React.FC<{
  story: StoryItem;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ story, onClose, onNext, onPrev }) => {
  return (
    <div className="absolute inset-0 z-50 bg-[#18110B] text-white flex flex-col">
      {/* Progress bar */}
      <div className="pt-3 px-4 flex gap-1.5 z-20">
        <div className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden">
          <div className="h-full w-full bg-white rounded-full animate-[pulse_2.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Story Header */}
      <div className="px-4 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5 min-w-0">
          <SafeImage
            src={story.avatar}
            alt={story.handle}
            className="w-9 h-9 rounded-full object-cover border border-white/40"
            fallbackLabel={story.name[0]}
          />
          <div className="min-w-0">
            <p className="text-[13.5px] font-bold truncate">{story.handle}</p>
            <p className="text-[11px] text-white/75 truncate">
              {story.location} · {story.timeAgo}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar historia"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Full Media */}
      <div className="relative flex-1 overflow-hidden">
        <SafeImage
          src={story.image}
          alt={story.caption}
          className="w-full h-full object-cover"
          fallbackLabel={story.handle}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,14,8,0.45) 0%, rgba(20,14,8,0) 30%, rgba(20,14,8,0.8) 100%)',
          }}
        />

        {/* Tap zones left/right */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Historia anterior"
          className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-pointer"
        />
        <button
          type="button"
          onClick={onNext}
          aria-label="Siguiente historia"
          className="absolute inset-y-0 right-0 w-2/3 z-10 cursor-pointer"
        />

        <div className="absolute bottom-6 left-5 right-5 z-20">
          <p className="text-[15px] leading-relaxed text-white font-medium drop-shadow">
            {story.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Create Story Composer Sheet                                             */
/* -------------------------------------------------------------------------- */
const STORY_PRESETS = [
  { label: 'Paso Fino', image: IMAGES.pasoFinoTraining },
  { label: 'Cabalgata', image: IMAGES.cabalgataRio },
  { label: 'Atardecer', image: IMAGES.fincaAtardecer },
  { label: 'Montura', image: IMAGES.saddleBarn },
];

export const CreateStoryModal: React.FC<{
  onClose: () => void;
  onPublish: (caption: string, image: string) => void;
}> = ({ onClose, onPublish }) => {
  const [caption, setCaption] = useState('Listos para cabalgar por los senderos de Antioquia.');
  const [selectedImage, setSelectedImage] = useState(STORY_PRESETS[0].image);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;
    onPublish(caption.trim(), selectedImage);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-end">
      <div className="w-full bg-[#F7F5F0] rounded-t-[26px] p-5 shadow-2xl max-h-[88%] overflow-y-auto">
        <div className="w-10 h-1 bg-[#D6CEC2] rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-[18px] font-bold text-[#1F1A15]">
            Compartir en Mi Historia
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 text-[#6E655D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-[12.5px] font-semibold text-[#6E655D] mb-2">
              Elige una fotografía
            </p>
            <div className="grid grid-cols-4 gap-2">
              {STORY_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSelectedImage(preset.image)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                    selectedImage === preset.image
                      ? 'border-[#8C6239] scale-[1.02]'
                      : 'border-transparent opacity-80'
                  }`}
                >
                  <SafeImage
                    src={preset.image}
                    alt={preset.label}
                    className="w-full h-full object-cover"
                    fallbackLabel={preset.label}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="story-caption"
              className="block text-[12.5px] font-semibold text-[#6E655D] mb-1.5"
            >
              Mensaje de tu historia
            </label>
            <textarea
              id="story-caption"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full rounded-2xl bg-white border border-[#E5DFD5] p-3 text-[13.5px] text-[#1F1A15] focus:outline-none focus:border-[#8C6239]"
              placeholder="¿Qué está pasando hoy en la finca?"
            />
          </div>

          <button
            type="submit"
            className="w-full h-[48px] rounded-2xl bg-[#8C6239] hover:bg-[#7C532B] text-white font-bold text-[14.5px] cursor-pointer transition-colors"
          >
            Publicar Historia
          </button>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Post Comments Sheet                                                     */
/* -------------------------------------------------------------------------- */
export const CommentsModal: React.FC<{
  post: PostItem;
  onClose: () => void;
  onAddComment: (postId: string, text: string) => void;
}> = ({ post, onClose, onAddComment }) => {
  const [draft, setDraft] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onAddComment(post.id, draft.trim());
    setDraft('');
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-end">
      <div className="w-full bg-[#F7F5F0] rounded-t-[26px] pt-3 pb-5 px-4 shadow-2xl max-h-[82%] flex flex-col">
        <div className="w-10 h-1 bg-[#D6CEC2] rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
          <h2 className="font-display text-[17px] font-bold text-[#1F1A15]">
            Comentarios · {post.author}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar comentarios"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 text-[#6E655D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {post.comments.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-3 flex gap-3 shadow-[0_1px_4px_rgba(43,31,20,0.04)]">
              <SafeImage
                src={c.avatar}
                alt={c.author}
                className="w-9 h-9 rounded-full object-cover shrink-0"
                fallbackLabel={c.author[0]}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold text-[#1F1A15] truncate">
                    {c.author}
                  </span>
                  <span className="text-[11px] text-[#8E847A] shrink-0">
                    {c.timeAgo}
                  </span>
                </div>
                <p className="text-[13px] text-[#3A3129] mt-0.5 leading-snug">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="pt-2 flex items-center gap-2">
          <SafeImage
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.name}
            className="w-9 h-9 rounded-full object-cover shrink-0"
            fallbackLabel="AG"
          />
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Escribe un comentario..."
            className="flex-1 h-[44px] rounded-full bg-white border border-[#E5DFD5] px-4 text-[13.5px] text-[#1F1A15] focus:outline-none focus:border-[#8C6239]"
          />
          <button
            type="submit"
            aria-label="Enviar comentario"
            className="w-[44px] h-[44px] rounded-full bg-[#8C6239] hover:bg-[#7C532B] text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Notifications Drawer                                                    */
/* -------------------------------------------------------------------------- */
export const NotificationsModal: React.FC<{
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}> = ({ notifications, onClose, onMarkAllRead, onSelectNotification }) => {
  return (
    <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-end">
      <div className="w-full bg-[#F7F5F0] rounded-t-[26px] pt-3 pb-6 px-4 shadow-2xl max-h-[82%] flex flex-col">
        <div className="w-10 h-1 bg-[#D6CEC2] rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#8C6239]" />
            <h2 className="font-display text-[17px] font-bold text-[#1F1A15]">
              Notificaciones
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-[12px] font-semibold text-[#8C6239] hover:text-[#7C532B] px-2.5 py-1.5 cursor-pointer"
            >
              Marcar leídas
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar notificaciones"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 text-[#6E655D] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-3 space-y-2.5">
          {notifications.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => onSelectNotification(n)}
              className={`w-full text-left rounded-2xl p-3.5 transition-colors flex items-start justify-between gap-3 cursor-pointer ${
                n.unread
                  ? 'bg-white shadow-[0_2px_10px_rgba(43,31,20,0.06)] border border-[#E9DFD2]'
                  : 'bg-white/75'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {n.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#8C6239] shrink-0" />
                  )}
                  <p className="text-[13.5px] font-bold text-[#1F1A15] leading-snug">
                    {n.title}
                  </p>
                </div>
                <p className="text-[12.5px] text-[#6E655D] mt-1 leading-snug">
                  {n.body}
                </p>
                <p className="text-[11px] text-[#8E847A] mt-1.5">{n.timeAgo}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9C9186] shrink-0 mt-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. Interactive Trail Map Modal                                             */
/* -------------------------------------------------------------------------- */
export const TrailMapModal: React.FC<{
  places: ExplorePlace[];
  onClose: () => void;
  onSelectPlace: (place: ExplorePlace) => void;
}> = ({ places, onClose, onSelectPlace }) => {
  const [selectedPin, setSelectedPin] = useState<ExplorePlace>(places[0]);

  return (
    <div className="absolute inset-0 z-50 bg-[#F7F5F0] flex flex-col">
      <header className="px-4 py-3 flex items-center justify-between bg-white/90 border-b border-[#EAE4DA]">
        <div>
          <h2 className="font-display text-[17px] font-bold text-[#1F1A15]">
            Mapa de Rutas Ecuestres
          </h2>
          <p className="text-[12px] text-[#6E655D]">
            Toca un punto para ver detalles
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar mapa"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 text-[#1F1A15] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Map Canvas */}
      <div className="relative flex-1 overflow-hidden bg-[#DDE4D5]">
        <SafeImage
          src={IMAGES.mapaRutas}
          alt="Mapa interactivo de rutas ecuestres"
          className="w-full h-full object-cover"
          fallbackLabel="Mapa de Rutas"
        />

        {places.map((p) => {
          const active = selectedPin.id === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPin(p)}
              style={{
                left: `${p.mapCoords.x}%`,
                top: `${p.mapCoords.y}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11.5px] font-bold shadow-md transition-all cursor-pointer ${
                active
                  ? 'bg-[#8C6239] text-white scale-110 z-20 ring-4 ring-white/80'
                  : 'bg-white/95 text-[#1F1A15] hover:scale-105 z-10'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">{p.title.split(' ')[0]}</span>
            </button>
          );
        })}

        {/* Selected Place Floating Card */}
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-[20px] p-3.5 shadow-[0_8px_28px_rgba(31,26,21,0.18)] flex items-center gap-3">
          <SafeImage
            src={selectedPin.image}
            alt={selectedPin.title}
            className="w-20 h-20 rounded-2xl object-cover shrink-0"
            fallbackLabel={selectedPin.title}
          />
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-semibold text-[#4D6646]">
              {selectedPin.category} · {selectedPin.metaLeft}
            </span>
            <h3 className="font-display text-[15px] font-bold text-[#1F1A15] truncate mt-0.5">
              {selectedPin.title}
            </h3>
            <p className="text-[12px] text-[#6E655D] truncate">
              {selectedPin.location}
            </p>
            <button
              type="button"
              onClick={() => onSelectPlace(selectedPin)}
              className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-bold text-[#8C6239] cursor-pointer"
            >
              <span>Ver ruta y reservar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Place Detail & Reservation Modal                                        */
/* -------------------------------------------------------------------------- */
export const PlaceDetailModal: React.FC<{
  place: ExplorePlace;
  onClose: () => void;
  onReserve: (place: ExplorePlace) => void;
  isReserved: boolean;
}> = ({ place, onClose, onReserve, isReserved }) => {
  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-end">
      <div className="w-full bg-[#F7F5F0] rounded-t-[26px] overflow-hidden shadow-2xl max-h-[88%] flex flex-col">
        <div className="relative h-[190px] shrink-0">
          <SafeImage
            src={place.image}
            alt={place.title}
            className="w-full h-full object-cover"
            fallbackLabel={place.title}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle"
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/45 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0E5] text-[#435F3C] text-[11.5px] font-semibold">
                {place.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#1F1A15] tabular-nums">
                <Star className="w-3.5 h-3.5 text-[#8C6239]" fill="#8C6239" />
                {place.rating} <span className="font-normal text-[#6E655D]">{place.reviewsLabel}</span>
              </span>
            </div>
            <h2 className="font-display text-[21px] font-extrabold text-[#1F1A15] mt-2">
              {place.title}
            </h2>
            <p className="text-[13px] text-[#6E655D]">{place.subtitle}</p>
          </div>

          <p className="text-[13.5px] leading-relaxed text-[#3D342C]">
            {place.description}
          </p>

          <div className="bg-white rounded-2xl p-3.5 space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-[#7D7369]">Ubicación</span>
              <span className="font-semibold text-[#1F1A15]">{place.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7D7369]">Nivel</span>
              <span className="font-semibold text-[#1F1A15]">{place.difficulty || 'Todos'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7D7369]">Tarifa</span>
              <span className="font-bold text-[#8C6239]">{place.priceLabel}</span>
            </div>
          </div>

          {isReserved ? (
            <div className="w-full h-[50px] rounded-2xl bg-[#E8F0E5] text-[#3F5838] font-bold text-[14.5px] flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Visita solicitada con éxito</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onReserve(place)}
              className="w-full h-[50px] rounded-2xl bg-[#8C6239] hover:bg-[#7C532B] text-white font-bold text-[14.5px] cursor-pointer transition-colors"
            >
              Solicitar Reserva / Visita
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 7. Event Registration Modal                                                */
/* -------------------------------------------------------------------------- */
export const EventRegistrationModal: React.FC<{
  event: EquestrianEvent;
  horses: HorseProfile[];
  onClose: () => void;
  onConfirm: (eventId: string, horseName: string) => void;
}> = ({ event, horses, onClose, onConfirm }) => {
  const [selectedHorse, setSelectedHorse] = useState(horses[0]?.name || 'Don Juan de Villa');

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-end">
      <div className="w-full bg-[#F7F5F0] rounded-t-[26px] pt-3 pb-6 px-5 shadow-2xl">
        <div className="w-10 h-1 bg-[#D6CEC2] rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[18px] font-bold text-[#1F1A15]">
            Confirmar Inscripción
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar inscripción"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 text-[#6E655D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-3.5 mb-4">
          <p className="font-display text-[14.5px] font-bold text-[#1F1A15]">
            {event.title}
          </p>
          <p className="text-[12.5px] text-[#6E655D] mt-0.5">
            {event.dateLabel}
          </p>
        </div>

        <p className="text-[12.5px] font-semibold text-[#6E655D] mb-2">
          Selecciona el ejemplar con el que participarás
        </p>
        <div className="space-y-2 mb-5 max-h-[190px] overflow-y-auto">
          {horses.map((h) => {
            const active = selectedHorse === h.name;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setSelectedHorse(h.name)}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between border transition-all cursor-pointer ${
                  active
                    ? 'bg-white border-[#8C6239] shadow-sm'
                    : 'bg-white/70 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <SafeImage
                    src={h.image}
                    alt={h.name}
                    className="w-10 h-10 rounded-xl object-cover"
                    fallbackLabel={h.name[0]}
                  />
                  <div className="text-left">
                    <p className="text-[13.5px] font-bold text-[#1F1A15]">
                      {h.name}
                    </p>
                    <p className="text-[11.5px] text-[#6E655D]">
                      {h.breed} · {h.coat}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    active ? 'bg-[#8C6239] text-white' : 'border border-[#CFC7BA]'
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onConfirm(event.id, selectedHorse)}
          className="w-full h-[52px] rounded-2xl bg-[#8C6239] hover:bg-[#7C532B] text-white font-bold text-[15px] shadow-md cursor-pointer transition-colors"
        >
          Confirmar Cupo (${event.priceUsd} USD)
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 8. Message Owner Modal                                                     */
/* -------------------------------------------------------------------------- */
export const MessageOwnerModal: React.FC<{
  horse: HorseProfile;
  onClose: () => void;
  onSendMessage: (message: string) => void;
}> = ({ horse, onClose, onSendMessage }) => {
  const [text, setText] = useState(
    `Hola ${horse.ownerName}, me encantaría consultar información sobre ${horse.name}.`
  );
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = text.trim();
    setSentMessages((prev) => [...prev, msg]);
    onSendMessage(msg);
    setText('');
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-end">
      <div className="w-full bg-[#F7F5F0] rounded-t-[26px] pt-3 pb-5 px-4 shadow-2xl max-h-[75%] flex flex-col">
        <div className="w-10 h-1 bg-[#D6CEC2] rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
          <div className="flex items-center gap-2.5">
            <SafeImage
              src={horse.ownerAvatar}
              alt={horse.ownerName}
              className="w-9 h-9 rounded-full object-cover"
              fallbackLabel={horse.ownerName[0]}
            />
            <div>
              <h2 className="font-display text-[15px] font-bold text-[#1F1A15]">
                {horse.ownerName}
              </h2>
              <p className="text-[11.5px] text-[#6E655D]">
                Propietario de {horse.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar chat"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 text-[#6E655D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-2.5 flex-1 overflow-y-auto">
          <div className="bg-white rounded-2xl rounded-tl-sm p-3 max-w-[85%] text-[13px] text-[#2B241D] shadow-sm">
            ¡Bienvenido a CampoVivo! Estoy disponible para responder preguntas sobre el linaje y disponibilidad de {horse.name}.
          </div>
          {sentMessages.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#8C6239] text-white rounded-2xl rounded-tr-sm p-3 max-w-[85%] ml-auto text-[13px] shadow-sm"
            >
              {m}
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="pt-2 flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 h-[44px] rounded-full bg-white border border-[#E5DFD5] px-4 text-[13.5px] text-[#1F1A15] focus:outline-none focus:border-[#8C6239]"
          />
          <button
            type="submit"
            aria-label="Enviar mensaje"
            className="w-[44px] h-[44px] rounded-full bg-[#8C6239] hover:bg-[#7C532B] text-white flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 9. Photo Lightbox Modal                                                    */
/* -------------------------------------------------------------------------- */
export const PhotoLightboxModal: React.FC<{
  image: string;
  caption: string;
  likes?: number;
  horseId?: string;
  onClose: () => void;
  onOpenHorse?: (horseId: string) => void;
}> = ({ image, caption, likes, horseId, onClose, onOpenHorse }) => {
  return (
    <div className="absolute inset-0 z-50 bg-[#1A130D]/95 text-white flex flex-col justify-between p-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar foto"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="my-auto rounded-2xl overflow-hidden max-h-[65%]">
        <SafeImage
          src={image}
          alt={caption}
          className="w-full h-full object-contain max-h-[440px] mx-auto"
          fallbackLabel={caption}
        />
      </div>

      <div className="pb-4 space-y-2.5">
        <p className="text-[14px] text-white/95 leading-snug">{caption}</p>
        <div className="flex items-center justify-between">
          {typeof likes === 'number' && (
            <span className="inline-flex items-center gap-1.5 text-[13px] text-white/80 tabular-nums">
              <Heart className="w-4 h-4 text-[#D9A066]" fill="#D9A066" />
              {likes} me gusta
            </span>
          )}
          {horseId && onOpenHorse && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenHorse(horseId);
              }}
              className="text-[13px] font-bold text-[#E6B88A] hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver ficha del caballo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
