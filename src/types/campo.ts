export type TabKey = 'inicio' | 'explorar' | 'eventos' | 'perfil';

export type ExploreCategory = 'all' | 'Fincas' | 'Cabalgatas' | 'Escuelas' | 'Eventos';

export interface StoryItem {
  id: string;
  name: string;
  handle: string;
  location: string;
  avatar: string;
  image: string;
  caption: string;
  timeAgo: string;
  isOwn?: boolean;
  viewed?: boolean;
}

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timeAgo: string;
}

export interface PostItem {
  id: string;
  author: string;
  role: string;
  avatar: string;
  timeAgo: string;
  text: string;
  image: string;
  likes: number;
  liked: boolean;
  saved: boolean;
  comments: CommentItem[];
  horseId?: string;
  horseLabel?: string;
  eventId?: string;
  eventLabel?: string;
}

export interface ExplorePlace {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ExploreCategory, 'all'>;
  tags: Exclude<ExploreCategory, 'all'>[];
  metaLeft: string;
  rating: string;
  reviewsLabel: string;
  image: string;
  description: string;
  location: string;
  priceLabel: string;
  difficulty?: string;
  mapCoords: { x: number; y: number };
}

export interface EquestrianEvent {
  id: string;
  title: string;
  category: string;
  availabilityLabel: string;
  dateLabel: string;
  meetingPoint: string;
  priceUsd: number;
  confirmedCount: number;
  description: string;
  distanceLabel: string;
  image: string;
  riderAvatars: string[];
  registered: boolean;
  selectedHorseName?: string;
}

export interface HorseProfile {
  id: string;
  name: string;
  badge: string;
  registryCode: string;
  breed: string;
  age: string;
  coat: string;
  height: string;
  image: string;
  ownerName: string;
  ownerAvatar: string;
  ownerRole: string;
  gallery: string[];
  bio: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timeAgo: string;
  unread: boolean;
  targetType: 'event' | 'horse' | 'post';
  targetId: string;
}
