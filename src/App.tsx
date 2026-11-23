import React, { useMemo, useRef, useState } from 'react';
import {
  Calendar,
  Compass,
  Home,
  Sparkles,
  User,
} from 'lucide-react';
import { BottomNav } from './components/BottomNav';
import { EventDetailView, EventsListView } from './components/EventsView';
import { ExploreView } from './components/ExploreView';
import { HomeView } from './components/HomeView';
import { HorseDetailView } from './components/HorseDetailView';
import {
  CommentsModal,
  CreateStoryModal,
  EventRegistrationModal,
  MessageOwnerModal,
  NotificationsModal,
  PhotoLightboxModal,
  PlaceDetailModal,
  StoryViewerModal,
  TrailMapModal,
} from './components/Modals';
import { ProfileView } from './components/ProfileView';
import { WelcomeScreen } from './components/WelcomeScreen';
import {
  CURRENT_USER,
  EXPLORE_PLACES,
  HORSES,
  INITIAL_EVENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_POSTS,
  INITIAL_STORIES,
} from './data/mockData';
import {
  EquestrianEvent,
  ExplorePlace,
  HorseProfile,
  NotificationItem,
  PostItem,
  StoryItem,
  TabKey,
} from './types/campo';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('inicio');

  // Sub-views
  const [selectedHorseId, setSelectedHorseId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Stateful collections
  const [stories, setStories] = useState<StoryItem[]>(INITIAL_STORIES);
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);
  const [events, setEvents] = useState<EquestrianEvent[]>(INITIAL_EVENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );
  const [reservedPlaceIds, setReservedPlaceIds] = useState<string[]>([]);

  // Modal states
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [commentsPostId, setCommentsPostId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTrailMap, setShowTrailMap] = useState(false);
  const [activePlaceModal, setActivePlaceModal] = useState<ExplorePlace | null>(null);
  const [registerEventModal, setRegisterEventModal] = useState<EquestrianEvent | null>(null);
  const [messageHorseModal, setMessageHorseModal] = useState<HorseProfile | null>(null);
  const [lightboxData, setLightboxData] = useState<{
    image: string;
    caption: string;
    likes?: number;
    horseId?: string;
  } | null>(null);

  // Subtle toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Derived data
  const unreadNotifications = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );

  const selectedHorse = useMemo(
    () => HORSES.find((h) => h.id === selectedHorseId) || null,
    [selectedHorseId]
  );

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId) || null,
    [events, selectedEventId]
  );

  const activeCommentsPost = useMemo(
    () => posts.find((p) => p.id === commentsPostId) || null,
    [posts, commentsPostId]
  );

  // Navigation helpers
  const handleSelectTab = (tab: TabKey) => {
    setShowWelcome(false);
    setSelectedHorseId(null);
    setSelectedEventId(null);
    setActiveTab(tab);
    scrollToTop();
  };

  const handleOpenHorse = (horseId: string) => {
    setShowWelcome(false);
    setSelectedEventId(null);
    setSelectedHorseId(horseId);
    scrollToTop();
  };

  const handleOpenEvent = (eventId: string) => {
    setShowWelcome(false);
    setSelectedHorseId(null);
    setActiveTab('eventos');
    setSelectedEventId(eventId);
    scrollToTop();
  };

  // Interactions
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const handleToggleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const nextSaved = !p.saved;
        triggerToast(
          nextSaved ? 'Publicación guardada' : 'Eliminada de guardados'
        );
        return { ...p, saved: nextSaved };
      })
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: `c-${Date.now()}`,
                  author: CURRENT_USER.name,
                  avatar: CURRENT_USER.avatar,
                  text,
                  timeAgo: 'Ahora',
                },
              ],
            }
          : p
      )
    );
    triggerToast('Comentario publicado');
  };

  const handleOpenStory = (story: StoryItem) => {
    const idx = stories.findIndex((s) => s.id === story.id);
    setStories((prev) =>
      prev.map((s) => (s.id === story.id ? { ...s, viewed: true } : s))
    );
    setActiveStoryIndex(idx >= 0 ? idx : 0);
  };

  const handlePublishStory = (caption: string, image: string) => {
    const newStory: StoryItem = {
      id: `story-user-${Date.now()}`,
      name: 'Tu Historia',
      handle: CURRENT_USER.name,
      location: 'Antioquia, CO',
      avatar: CURRENT_USER.avatar,
      image,
      caption,
      timeAgo: 'Hace un momento',
      isOwn: true,
      viewed: false,
    };
    setStories((prev) => [newStory, ...prev]);
    setShowCreateStory(false);
    triggerToast('Historia compartida con la comunidad');
  };

  const handleConfirmRegistration = (eventId: string, horseName: string) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId
          ? {
              ...ev,
              registered: true,
              confirmedCount: ev.registered
                ? ev.confirmedCount
                : ev.confirmedCount + 1,
              selectedHorseName: horseName,
            }
          : ev
      )
    );
    setRegisterEventModal(null);
    triggerToast('¡Inscripción confirmada para el evento!');
  };

  const handleCancelRegistration = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId && ev.registered
          ? {
              ...ev,
              registered: false,
              confirmedCount: Math.max(0, ev.confirmedCount - 1),
              selectedHorseName: undefined,
            }
          : ev
      )
    );
    triggerToast('Inscripción cancelada');
  };

  const handleReservePlace = (place: ExplorePlace) => {
    setReservedPlaceIds((prev) =>
      prev.includes(place.id) ? prev : [...prev, place.id]
    );
    triggerToast(`Solicitud enviada a ${place.title}`);
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
    setShowNotifications(false);

    if (notif.targetType === 'event') {
      handleOpenEvent(notif.targetId);
    } else if (notif.targetType === 'horse') {
      handleOpenHorse(notif.targetId);
    } else {
      handleSelectTab('inicio');
    }
  };

  const renderMainContent = () => {
    if (selectedHorse) {
      return (
        <HorseDetailView
          horse={selectedHorse}
          onBack={() => setSelectedHorseId(null)}
          onMessageOwner={(horse) => setMessageHorseModal(horse)}
          onOpenGalleryImage={(image, caption) =>
            setLightboxData({ image, caption })
          }
        />
      );
    }

    if (selectedEvent) {
      return (
        <EventDetailView
          event={selectedEvent}
          onBack={() => setSelectedEventId(null)}
          onOpenRegistration={(ev) => setRegisterEventModal(ev)}
          onCancelRegistration={handleCancelRegistration}
        />
      );
    }

    switch (activeTab) {
      case 'inicio':
        return (
          <HomeView
            stories={stories}
            posts={posts}
            unreadNotifications={unreadNotifications}
            onOpenNotifications={() => setShowNotifications(true)}
            onOpenStory={handleOpenStory}
            onCreateStory={() => setShowCreateStory(true)}
            onToggleLike={handleToggleLike}
            onToggleSave={handleToggleSave}
            onOpenComments={(post) => setCommentsPostId(post.id)}
            onOpenHorse={handleOpenHorse}
            onOpenEvent={handleOpenEvent}
          />
        );
      case 'explorar':
        return (
          <ExploreView
            places={EXPLORE_PLACES}
            onOpenMap={() => setShowTrailMap(true)}
            onSelectPlace={(place) => setActivePlaceModal(place)}
            onGoToEvents={() => handleSelectTab('eventos')}
          />
        );
      case 'eventos':
        return (
          <EventsListView
            events={events}
            onSelectEvent={(ev) => {
              setSelectedEventId(ev.id);
              scrollToTop();
            }}
          />
        );
      case 'perfil':
        return (
          <ProfileView
            horses={HORSES}
            onSelectHorse={handleOpenHorse}
            onSelectGalleryItem={(item) => setLightboxData(item)}
            onShowWelcome={() => setShowWelcome(true)}
          />
        );
    }
  };

  // Highlight active desktop shortcut
  const activeShortcut = showWelcome
    ? 'welcome'
    : selectedHorseId
    ? 'horse'
    : selectedEventId
    ? 'event-detail'
    : activeTab;

  return (
    <div className="min-h-[100dvh] bg-[#EDE8DF] sm:flex sm:items-center sm:justify-center sm:p-4 lg:gap-12">
      {/* Vertical Mobile App Viewport */}
      <main
        aria-label="Aplicación CampoVivo"
        className="w-full min-h-[100dvh] sm:min-h-0 sm:w-[404px] sm:h-[min(844px,calc(100dvh-32px))] sm:rounded-[38px] sm:border-[8px] sm:border-[#241C15] sm:shadow-[0_26px_68px_rgba(36,24,14,0.18)] bg-[#F7F5F0] relative overflow-hidden flex flex-col"
      >
        {showWelcome ? (
          <WelcomeScreen
            onEnterApp={() => {
              setShowWelcome(false);
              setActiveTab('inicio');
              setSelectedHorseId(null);
              setSelectedEventId(null);
            }}
            onEnterExplore={() => {
              setShowWelcome(false);
              setActiveTab('explorar');
              setSelectedHorseId(null);
              setSelectedEventId(null);
            }}
          />
        ) : (
          <>
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto no-scrollbar"
            >
              {renderMainContent()}
            </div>

            <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />
          </>
        )}

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#241C15]/92 text-white text-[12.5px] font-medium px-4 py-2 rounded-full shadow-lg whitespace-nowrap pointer-events-none">
            {toastMessage}
          </div>
        )}

        {/* In-App Modals & Sheets */}
        {activeStoryIndex !== null && stories[activeStoryIndex] && (
          <StoryViewerModal
            story={stories[activeStoryIndex]}
            onClose={() => setActiveStoryIndex(null)}
            onNext={() => {
              if (activeStoryIndex < stories.length - 1) {
                const nextIdx = activeStoryIndex + 1;
                setStories((prev) =>
                  prev.map((s, i) => (i === nextIdx ? { ...s, viewed: true } : s))
                );
                setActiveStoryIndex(nextIdx);
              } else {
                setActiveStoryIndex(null);
              }
            }}
            onPrev={() => {
              if (activeStoryIndex > 0) {
                setActiveStoryIndex(activeStoryIndex - 1);
              }
            }}
          />
        )}

        {showCreateStory && (
          <CreateStoryModal
            onClose={() => setShowCreateStory(false)}
            onPublish={handlePublishStory}
          />
        )}

        {activeCommentsPost && (
          <CommentsModal
            post={activeCommentsPost}
            onClose={() => setCommentsPostId(null)}
            onAddComment={handleAddComment}
          />
        )}

        {showNotifications && (
          <NotificationsModal
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onMarkAllRead={() => {
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, unread: false }))
              );
              triggerToast('Notificaciones marcadas como leídas');
            }}
            onSelectNotification={handleSelectNotification}
          />
        )}

        {showTrailMap && (
          <TrailMapModal
            places={EXPLORE_PLACES}
            onClose={() => setShowTrailMap(false)}
            onSelectPlace={(place) => {
              setShowTrailMap(false);
              setActivePlaceModal(place);
            }}
          />
        )}

        {activePlaceModal && (
          <PlaceDetailModal
            place={activePlaceModal}
            isReserved={reservedPlaceIds.includes(activePlaceModal.id)}
            onClose={() => setActivePlaceModal(null)}
            onReserve={handleReservePlace}
          />
        )}

        {registerEventModal && (
          <EventRegistrationModal
            event={registerEventModal}
            horses={HORSES}
            onClose={() => setRegisterEventModal(null)}
            onConfirm={handleConfirmRegistration}
          />
        )}

        {messageHorseModal && (
          <MessageOwnerModal
            horse={messageHorseModal}
            onClose={() => setMessageHorseModal(null)}
            onSendMessage={() =>
              triggerToast(`Mensaje enviado a ${messageHorseModal.ownerName}`)
            }
          />
        )}

        {lightboxData && (
          <PhotoLightboxModal
            image={lightboxData.image}
            caption={lightboxData.caption}
            likes={lightboxData.likes}
            horseId={lightboxData.horseId}
            onClose={() => setLightboxData(null)}
            onOpenHorse={handleOpenHorse}
          />
        )}
      </main>

      {/* Desktop Companion Quick Navigator (hidden on mobile/tablet) */}
      <aside className="hidden lg:flex flex-col w-[300px] text-[#1F1A15]">
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#8C6239]">
          Caballo, Finca y Tradición
        </p>
        <h2 className="font-display text-[30px] font-extrabold tracking-tight mt-1 leading-tight">
          CampoVivo
        </h2>
        <p className="text-[14px] text-[#5C534B] leading-relaxed mt-2 mb-6">
          Navega de forma interactiva dentro de la vista móvil o salta directamente a cualquiera de las pantallas principales.
        </p>

        <div className="bg-white/80 backdrop-blur-sm rounded-[22px] p-3 shadow-[0_4px_20px_rgba(43,31,20,0.06)] space-y-1.5">
          <button
            type="button"
            onClick={() => setShowWelcome(true)}
            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-[13.5px] font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
              activeShortcut === 'welcome'
                ? 'bg-[#8C6239] text-white'
                : 'text-[#3A3129] hover:bg-[#F1ECE3]'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>1. Pantalla de Bienvenida</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTab('inicio')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-[13.5px] font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
              activeShortcut === 'inicio'
                ? 'bg-[#8C6239] text-white'
                : 'text-[#3A3129] hover:bg-[#F1ECE3]'
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>2. Inicio · Comunidad Rural</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTab('explorar')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-[13.5px] font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
              activeShortcut === 'explorar'
                ? 'bg-[#8C6239] text-white'
                : 'text-[#3A3129] hover:bg-[#F1ECE3]'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>3. Explorar Campo & Rutas</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenEvent('evt-primavera-2026')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-[13.5px] font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
              activeShortcut === 'event-detail' || activeShortcut === 'eventos'
                ? 'bg-[#8C6239] text-white'
                : 'text-[#3A3129] hover:bg-[#F1ECE3]'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>4. Detalle de Evento</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTab('perfil')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-[13.5px] font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
              activeShortcut === 'perfil'
                ? 'bg-[#8C6239] text-white'
                : 'text-[#3A3129] hover:bg-[#F1ECE3]'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>5. Mi Perfil · Alejandro</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenHorse('horse-don-juan')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-[13.5px] font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
              activeShortcut === 'horse'
                ? 'bg-[#8C6239] text-white'
                : 'text-[#3A3129] hover:bg-[#F1ECE3]'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>6. Ficha · Don Juan de Villa</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
