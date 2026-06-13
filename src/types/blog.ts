export type BlogCategory = 
  | 'Campus Life' 
  | 'Career Advice' 
  | 'Exam Tips' 
  | 'Technology'
  | 'Student Accommodation'
  | 'Sports & Fitness'
  | 'Clubs & Societies'
  | 'Events & Festivities'
  | 'General Discussion';

export interface BlogComment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email?: string;
    profile_pic?: string;
    avatar?: string;
  };
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // Rich Text/HTML
  excerpt: string;
  author: {
    id: string;
    name: string;
    profile_pic?: string;
    avatar?: string;
    university?: string;
  };
  category: BlogCategory;
  featuredImage: string;
  createdAt: string;
  readTime: string;
  likes: number;
  views: number;
  isTrending: boolean;
  tags: string[];
  comments?: BlogComment[];
  hasLiked?: boolean;
}

export interface Contributor {
  id: string;
  name: string;
  avatar: string;
  university: string;
  blogsCount: number;
  totalLikes: number;
  rank: number;
}
