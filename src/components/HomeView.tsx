import React from 'react';
import { Bell, Bookmark, ChevronRight, Heart, MessageCircle, Plus } from 'lucide-react';
import { PostItem, StoryItem } from '../types/campo';
import { SafeImage } from './SafeImage';

interface HomeViewProps {
  stories: StoryItem[];
  posts: PostItem[];
  unreadNotifications: number;
  onOpenNotifications: () => void;
  onOpenStory: (story: StoryItem) => void;
  onCreateStory: () => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
  onOpenComments: (post: PostItem) => void;
  onOpenHorse: (horseId: string) => void;
  onOpenEvent: (eventId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  stories,
  posts,
  unreadNotifications,
  onOpenNotifications,
  onOpenStory,
  onCreateStory,
  onToggleLike,
  onToggleSave,
  onOpenComments,
  onOpenHorse,
  onOpenEvent,
}) => {
  return (
    <div className="pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#F7F5F0]/92 backdrop-blur-md px-5 pt-4 pb-3 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-extrabold tracking-tight text-[#1F1A15] leading-tight">
            CampoVivo
          </h1>
          <p className="text-[13px] text-[#6E655D] font-normal mt-0.5">
            Comunidad Rural
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNotifications}
          aria-label="Abrir notificaciones"
          className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all text-[#1F1A15] cursor-pointer"
        >
          <Bell className="w-[21px] h-[21px]" strokeWidth={1.9} />
          {unreadNotifications > 0 && (
            <span className="absolute top-2.5 right-2.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#8C6239] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
              {unreadNotifications}
            </span>
          )}
        </button>
      </header>

      {/* Stories Strip */}
      <section aria-label="Historias de la comunidad" className="px-4 pt-1 pb-4">
        <div className="flex items-start gap-3.5 overflow-x-auto no-scrollbar py-1">
          {/* Mi Historia (+) */}
          <button
            type="button"
            onClick={onCreateStory}
            className="flex flex-col items-center shrink-0 w-[64px] group cursor-pointer focus:outline-none"
          >
            <div className="w-[58px] h-[58px] rounded-full bg-[#8C6239] group-hover:bg-[#7C532B] group-active:scale-95 transition-all flex items-center justify-center text-white shadow-sm">
              <Plus className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <span className="mt-1.5 text-[11px] font-medium text-[#4A4139] truncate w-full text-center">
              Mi Historia
            </span>
          </button>

          {/* Community Stories */}
          {stories.map((story) => (
            <button
              key={story.id}
              type="button"
              onClick={() => onOpenStory(story)}
              className="flex flex-col items-center shrink-0 w-[64px] group cursor-pointer focus:outline-none"
            >
              <div
                className={`w-[58px] h-[58px] rounded-full p-[2.5px] transition-transform group-active:scale-95 ${
                  story.viewed
                    ? 'bg-[#D6CEC2]'
                    : 'bg-gradient-to-tr from-[#8C6239] via-[#A97B4C] to-[#5B744F]'
                }`}
              >
                <div className="w-full h-full rounded-full p-[2px] bg-[#F7F5F0]">
                  <SafeImage
                    src={story.avatar}
                    alt={story.name}
                    className="w-full h-full rounded-full object-cover"
                    fallbackLabel={story.name[0]}
                  />
                </div>
              </div>
              <span className="mt-1.5 text-[11px] font-medium text-[#4A4139] truncate w-full text-center">
                {story.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Feed Cards */}
      <section aria-label="Publicaciones recientes" className="px-4 space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-[20px] p-4 shadow-[0_2px_12px_rgba(43,31,20,0.045)]"
          >
            {/* Card Author Row */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <SafeImage
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#EAE4DA]"
                  fallbackLabel={post.author[0]}
                />
                <div className="min-w-0">
                  <h2 className="font-display text-[14.5px] font-bold text-[#1F1A15] truncate leading-snug">
                    {post.author}
                  </h2>
                  <p className="text-[12px] text-[#7D7369] truncate">
                    {post.role}
                  </p>
                </div>
              </div>
              <span className="text-[11.5px] text-[#8E847A] whitespace-nowrap shrink-0">
                {post.timeAgo}
              </span>
            </div>

            {/* Post Body Copy */}
            <p className="text-[14px] leading-[1.48] text-[#2B241D] mb-3">
              {post.text}
            </p>

            {/* Post Photo (clickable if linked to horse or event) */}
            <button
              type="button"
              onClick={() => {
                if (post.horseId) onOpenHorse(post.horseId);
                else if (post.eventId) onOpenEvent(post.eventId);
              }}
              className={`block w-full overflow-hidden rounded-[14px] relative text-left ${
                post.horseId || post.eventId ? 'cursor-pointer group' : 'cursor-default'
              }`}
            >
              <SafeImage
                src={post.image}
                alt={post.horseLabel || post.author}
                className="w-full aspect-[16/10] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                fallbackLabel={post.author}
              />
            </button>

            {/* Related Horse or Event Quick Link */}
            {(post.horseId || post.eventId) && (
              <div className="mt-2.5 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (post.horseId) onOpenHorse(post.horseId);
                    else if (post.eventId) onOpenEvent(post.eventId);
                  }}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#8C6239] hover:text-[#7C532B] transition-colors py-1 cursor-pointer"
                >
                  <span>
                    {post.horseId
                      ? `Ver ficha de ${post.horseLabel}`
                      : `Ver evento: ${post.eventLabel}`}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Action Bar: Likes, Comments, Bookmark */}
            <div className="mt-2 pt-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleLike(post.id)}
                  aria-label={post.liked ? 'Quitar me gusta' : 'Me gusta'}
                  className={`min-h-[44px] px-2 -ml-2 rounded-xl flex items-center gap-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
                    post.liked
                      ? 'text-[#8C6239]'
                      : 'text-[#6E655D] hover:text-[#1F1A15]'
                  }`}
                >
                  <Heart
                    className="w-[19px] h-[19px] transition-transform active:scale-125"
                    strokeWidth={1.9}
                    fill={post.liked ? '#8C6239' : 'none'}
                  />
                  <span className="tabular-nums">{post.likes}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenComments(post)}
                  aria-label="Ver comentarios"
                  className="min-h-[44px] px-2 rounded-xl flex items-center gap-1.5 text-[13px] font-medium text-[#6E655D] hover:text-[#1F1A15] transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-[19px] h-[19px]" strokeWidth={1.9} />
                  <span className="tabular-nums">{post.comments.length + (post.id === 'post-1' ? 26 : post.id === 'post-2' ? 34 : 18)}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => onToggleSave(post.id)}
                aria-label={post.saved ? 'Quitar de guardados' : 'Guardar publicación'}
                className={`min-w-[44px] min-h-[44px] -mr-2 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  post.saved
                    ? 'text-[#8C6239]'
                    : 'text-[#6E655D] hover:text-[#1F1A15]'
                }`}
              >
                <Bookmark
                  className="w-[19px] h-[19px]"
                  strokeWidth={1.9}
                  fill={post.saved ? '#8C6239' : 'none'}
                />
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
