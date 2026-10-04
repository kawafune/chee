export interface Instructor {
  name: string;
  title: string;
  image: string;
}

export interface Video {
  id: number;
  category: string;
  title: string;
  instructor: string;
  location: string;
  date: string;
  image: string;
  duration: string;
  isPremium: boolean;
  description: string;
}

export interface UserInfo {
  name: string;
  region: string;
  icon: string;
  followedInstructors: string[];
}

export type View = 'home' | 'map' | 'register' | 'become-instructor' | 'privacy' | 'mypage';

export interface MapPath {
  name: string;
  d: string;
  transform?: string;
}

export type ToggleLike = (e: React.MouseEvent, id: number) => void;
