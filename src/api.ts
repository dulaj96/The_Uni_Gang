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

// Removed initStorage

export const api = {
  // Blogs
  getBlogs: async (category?: string, search?: string): Promise<Blog[]> => {
    const queryParams = new URLSearchParams();
    if (category && category !== 'All') queryParams.append('category', category);
    if (search) queryParams.append('search', search);

    const token = localStorage.getItem('userToken');
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(`http://localhost:5000/api/blogs?${queryParams.toString()}`, {
      headers
    });
    if (!response.ok) throw new Error('Failed to fetch blogs');
    const data = await response.json();
    return data.map((blog: any) => ({
      ...blog,
      tags: blog.tags ? blog.tags.split(',').map((t: string) => t.trim()) : [],
      author: {
        ...blog.author,
        avatar: blog.author.profile_pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.author.name}`
      },
      featuredImage: blog.featuredImage ? (blog.featuredImage.startsWith('http') ? blog.featuredImage : `http://localhost:5000${blog.featuredImage}`) : ''
    }));
  },

  getBlogBySlug: async (slug: string): Promise<Blog> => {
    const token = localStorage.getItem('userToken');
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(`http://localhost:5000/api/blogs/slug/${slug}`, {
      headers
    });
    if (!response.ok) throw new Error('Failed to fetch blog post');
    const blog = await response.json();
    return {
      ...blog,
      tags: blog.tags ? blog.tags.split(',').map((t: string) => t.trim()) : [],
      author: {
        ...blog.author,
        avatar: blog.author.profile_pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.author.name}`,
        university: 'University of Colombo'
      },
      featuredImage: blog.featuredImage ? (blog.featuredImage.startsWith('http') ? blog.featuredImage : `http://localhost:5000${blog.featuredImage}`) : '',
      comments: blog.comments ? blog.comments.map((comment: any) => ({
        ...comment,
        user: {
          ...comment.user,
          avatar: comment.user.profile_pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.name}`
        }
      })) : []
    };
  },

  getMyBlogs: async (token: string): Promise<Blog[]> => {
    const response = await fetch(`http://localhost:5000/api/blogs/my`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch your blogs');
    const data = await response.json();
    return data.map((blog: any) => ({
      ...blog,
      tags: blog.tags ? blog.tags.split(',').map((t: string) => t.trim()) : [],
      author: {
        ...blog.author,
        avatar: blog.author?.profile_pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.author?.name || 'User'}`
      },
      featuredImage: blog.featuredImage ? (blog.featuredImage.startsWith('http') ? blog.featuredImage : `http://localhost:5000${blog.featuredImage}`) : ''
    }));
  },

  createBlog: async (formData: FormData, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/blogs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const rawText = await response.text();

    if (!response.ok) {
      // Safely try to parse JSON error message from backend
      try {
        const err = JSON.parse(rawText);
        throw new Error(err.message || `Server error ${response.status}`);
      } catch {
        // Server returned HTML (e.g. crash page) instead of JSON
        console.error('Non-JSON error from /api/blogs:', rawText.slice(0, 300));
        throw new Error(`Server error ${response.status} — check backend console for details.`);
      }
    }

    try {
      return JSON.parse(rawText);
    } catch {
      throw new Error('Server returned an unexpected response. Please try again.');
    }
  },

  toggleLike: async (blogId: string, token: string): Promise<{ likes: number; hasLiked: boolean }> => {
    const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to toggle like');
    return response.json();
  },

  addComment: async (blogId: string, content: string, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });
    if (!response.ok) throw new Error('Failed to submit comment');
    const result = await response.json();
    const comment = result.comment;
    return {
      ...comment,
      user: {
        ...comment.user,
        avatar: comment.user.profile_pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.name}`
      }
    };
  },

  deleteComment: async (blogId: string, commentId: string, token: string): Promise<void> => {
    const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete comment');
  },

  updateProfile: async (
    profileData: { name: string; profile_pic?: string | null; phone?: string | null },
    token: string
  ): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },

  // Contributors
  getContributors: async (): Promise<Contributor[]> => {
    const response = await fetch(`http://localhost:5000/api/blogs/contributors/leaderboard`);
    if (!response.ok) throw new Error('Failed to fetch contributors leaderboard');
    return response.json();
  },

  // Annexes & Accommodations Connected to Backend
  getAnnexes: async (filters?: any): Promise<any[]> => {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          queryParams.append(key, String(filters[key]));
        }
      });
    }
    const response = await fetch(`http://localhost:5000/api/annexes?${queryParams.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch approved listings');
    return response.json();
  },

  getAnnexById: async (id: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/annexes/${id}`);
    if (!response.ok) throw new Error('Listing not found');
    return response.json();
  },

  createAnnex: async (formData: FormData, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/annexes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to submit property');
    }
    return response.json();
  },

  deleteAnnex: async (id: string, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/annexes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to remove listing');
    return response.json();
  },

  submitReview: async (id: string, reviewData: any, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/annexes/${id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    });
    if (!response.ok) throw new Error('Failed to submit your review');
    return response.json();
  },

  submitServiceRequest: async (requestData: {
    serviceName: string;
    clientPhone: string;
    clientEmail?: string;
    brief: string;
    deadline?: string;
    budget?: string;
  }, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(requestData)
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to submit service request');
    }
    return response.json();
  },

  getMyServiceRequests: async (token: string): Promise<any[]> => {
    const response = await fetch(`http://localhost:5000/api/services/my-requests`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch your service requests');
    const data = await response.json();
    return data.data ?? [];
  },

  getServiceMessages: async (requestId: string, token: string): Promise<any[]> => {
    const response = await fetch(`http://localhost:5000/api/services/${requestId}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch messages for this request');
    const data = await response.json();
    return data.data ?? [];
  },

  addServiceMessage: async (requestId: string, message: string, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/services/${requestId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ message })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to submit comment');
    }
    const data = await response.json();
    return data.data;
  },

  // Events API Integration
  getApprovedEvents: async (): Promise<any[]> => {
    const response = await fetch(`http://localhost:5000/api/events`);
    if (!response.ok) throw new Error('Failed to fetch approved events');
    return response.json();
  },

  submitEvent: async (formData: FormData, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to submit event');
    }
    return response.json();
  },

  getMyEvents: async (token: string): Promise<any[]> => {
    const response = await fetch(`http://localhost:5000/api/events/my-events`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch your events');
    const data = await response.json();
    return data.data ?? [];
  },

  deleteEvent: async (id: string, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to delete event');
    }
    return response.json();
  },

  // Notifications API Integration
  getMyNotifications: async (token: string): Promise<any[]> => {
    const response = await fetch(`http://localhost:5000/api/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch notifications');
    const data = await response.json();
    return data.notifications ?? [];
  },

  markNotificationAsRead: async (id: string, token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to mark notification as read');
    return response.json();
  },

  markAllNotificationsAsRead: async (token: string): Promise<any> => {
    const response = await fetch(`http://localhost:5000/api/notifications/read-all`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to mark all as read');
    return response.json();
  }
};
