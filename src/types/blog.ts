export type BlogCategory = 'Campus Life' | 'Career Advice' | 'Exam Tips' | 'Technology';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // Rich Text/HTML
  excerpt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
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
