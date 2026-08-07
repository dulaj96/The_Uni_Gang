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

  getFeed: async (params: any) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/feed?${query}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch feed');
    return response.json();
  },

  // Swipes / Matching
  swipe: async (targetId: string, action: 'like' | 'pass') => {
    const response = await fetch(`${API_URL}/swipe`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ targetId, action })
    });
    if (!response.ok) throw new Error('Failed to swipe');
    return response.json();
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
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },
};

// Socket.io Service
let socket: Socket | null = null;

export const proposalSocketService = {
  connect: (userId: string) => {
    if (!socket) {
      socket = io(process.env.VITE_API_URL || 'http://localhost:5000', {
        withCredentials: true,
      });

      socket.on('connect', () => {
        socket?.emit('register', userId);
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
