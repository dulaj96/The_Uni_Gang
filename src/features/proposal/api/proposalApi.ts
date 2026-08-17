import { io, Socket } from 'socket.io-client';

const API_URL = '/api/proposals'; 

const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const proposalApi = {
  // Profiles
  getMyProfile: async () => {
    const response = await fetch(`${API_URL}/me`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  submitProfile: async (data: any) => {
    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to submit profile');
    return response.json();
  },

  getFeed: async (filters: any) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/feed?${query}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch feed');
    return response.json();
  },

  getLikedMe: async () => {
    const response = await fetch(`${API_URL}/liked-me`, { headers: getHeaders() });
    if (response.status === 403) {
      throw { requiresPremium: true };
    }
    if (!response.ok) throw new Error('Failed to fetch liked me profiles');
    return response.json();
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/stats`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  // Swipes / Matching
  swipe: async (targetId: string, action: 'like' | 'pass') => {
    const response = await fetch(`${API_URL}/swipe`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ targetId, action })
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  },

  // Chat
  getInbox: async () => {
    const response = await fetch(`${API_URL}/inbox`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch inbox');
    return response.json();
  },

  getMessages: async (matchId: string) => {
    const response = await fetch(`${API_URL}/messages/${matchId}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  sendMessage: async (matchId: string, text: string) => {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ matchId, text })
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 403 && data.requiresPremium) {
        throw { requiresPremium: true, message: data.message };
      }
      throw new Error(data.message || 'Failed to send message');
    }
    return data;
  },

  // Gamification
  getGamificationStatus: async () => {
    const response = await fetch(`${API_URL}/gamification/status`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch gamification status');
    return response.json();
  },

  claimPremiumTrial: async () => {
    const response = await fetch(`${API_URL}/gamification/claim-trial`, { 
      method: 'POST', 
      headers: getHeaders() 
    });
    if (!response.ok) throw new Error('Failed to claim trial');
    return response.json();
  },

  // Developer / Testing
  seedTestData: async () => {
    const response = await fetch(`${API_URL}/seed-test-data`, {
      method: 'POST',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to generate test data');
    return response.json();
  },
};

// Socket.io Service
let socket: Socket | null = null;

export const proposalSocketService = {
  connect: (userId: string) => {
    if (!socket) {
      const token = localStorage.getItem('userToken') || '';
      socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001', {
        withCredentials: true,
        auth: { token },
      });

      socket.on('connect', () => {
        socket?.emit('register'); // Backend now reads user ID from token automatically
      });
    }
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  joinChat: (chatId: string) => {
    socket?.emit('join_chat', chatId);
  },

  leaveChat: (chatId: string) => {
    socket?.emit('leave_chat', chatId);
  },

  onNewMessage: (callback: (msg: any) => void) => {
    socket?.on('receive_message', callback);
  },
  
  onUserStatusChange: (callback: (data: { userId: string; status: 'online' | 'offline' }) => void) => {
    socket?.on('user_status', callback);
  },

  offUserStatusChange: () => {
    socket?.off('user_status');
  },

  offNewMessage: () => {
    socket?.off('receive_message');
  }
};
