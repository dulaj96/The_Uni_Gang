import { Blog, Contributor } from './types/blog';

const BLOGS_KEY = 'uni_gang_blogs';
const CONTRIBUTORS_KEY = 'uni_gang_blog_contributors';

// Mock Initial Data
const MOCK_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'Navigating Your First Year: A Survival Guide',
    slug: 'navigating-your-first-year',
    excerpt: 'Transitioning to university life can be daunting. Here are the top 10 tips to make your first year a success.',
    content: '<h1>Navigating Your First Year</h1><p>Full content goes here...</p>',
    author: {
      id: 'a1',
      name: 'Dulaj Chamara',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dulaj',
      university: 'University of Colombo'
    },
    category: 'Campus Life',
    featuredImage: 'https://images.unsplash.com/photo-1523050853063-bd8012fec042?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date().toISOString(),
    readTime: '5 min read',
    likes: 124,
    views: 1540,
    isTrending: true,
    tags: ['Freshmen', 'Tips', 'Colombo']
  },
  {
    id: '2',
    title: 'Future of AI in Higher Education',
    slug: 'future-of-ai-higher-education',
    excerpt: 'How artificial intelligence is reshaping the way we learn, research, and collaborate on campus.',
    content: '<h1>Future of AI</h1><p>AI is not just a tool, it is a partner...</p>',
    author: {
      id: 'a2',
      name: 'Sarah Perera',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      university: 'UOM'
    },
    category: 'Technology',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    readTime: '8 min read',
    likes: 89,
    views: 890,
    isTrending: false,
    tags: ['AI', 'Tech', 'Education']
  }
];

const MOCK_CONTRIBUTORS: Contributor[] = [
  {
    id: 'a1',
    name: 'Dulaj Chamara',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dulaj',
    university: 'University of Colombo',
    blogsCount: 12,
    totalLikes: 450,
    rank: 1
  },
  {
    id: 'a2',
    name: 'Sarah Perera',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    university: 'University of Moratuwa',
    blogsCount: 8,
    totalLikes: 320,
    rank: 2
  }
];

// Helper to initialize local storage
const initStorage = () => {
  if (!localStorage.getItem(BLOGS_KEY)) {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(MOCK_BLOGS));
  }
  if (!localStorage.getItem(CONTRIBUTORS_KEY)) {
    localStorage.setItem(CONTRIBUTORS_KEY, JSON.stringify(MOCK_CONTRIBUTORS));
  }
};

export const api = {
  // Blogs
  getBlogs: async (): Promise<Blog[]> => {
    initStorage();
    return new Promise((resolve) => {
      setTimeout(() => {
        const blogs = JSON.parse(localStorage.getItem(BLOGS_KEY) || '[]');
        resolve(blogs);
      }, 300);
    });
  },

  getBlogBySlug: async (slug: string): Promise<Blog | undefined> => {
    initStorage();
    return new Promise((resolve) => {
      setTimeout(() => {
        const blogs = JSON.parse(localStorage.getItem(BLOGS_KEY) || '[]');
        resolve(blogs.find((b: Blog) => b.slug === slug));
      }, 200);
    });
  },

  createBlog: async (blog: Omit<Blog, 'id' | 'createdAt' | 'likes' | 'views' | 'isTrending'>): Promise<Blog> => {
    initStorage();
    return new Promise((resolve) => {
      setTimeout(() => {
        const blogs = JSON.parse(localStorage.getItem(BLOGS_KEY) || '[]');
        const newBlog: Blog = {
          ...blog,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          likes: 0,
          views: 0,
          isTrending: false
        };
        blogs.unshift(newBlog);
        localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
        resolve(newBlog);
      }, 400);
    });
  },

  // Contributors
  getContributors: async (): Promise<Contributor[]> => {
    initStorage();
    return new Promise((resolve) => {
      setTimeout(() => {
        const contributors = JSON.parse(localStorage.getItem(CONTRIBUTORS_KEY) || '[]');
        resolve(contributors.sort((a: Contributor, b: Contributor) => b.totalLikes - a.totalLikes));
      }, 250);
    });
  }
};
