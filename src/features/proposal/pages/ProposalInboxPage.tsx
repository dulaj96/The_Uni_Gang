import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, MoreVertical, Phone, Video, Send, Paperclip, Smile, Check, CheckCheck } from 'lucide-react';
import { cx } from '../components/ui/ProposalPrimitives';
import { proposalApi, proposalSocketService } from '../api/proposalApi';
import { ScreenshotBlocker } from '../components/privacy/ScreenshotBlocker';

export default function ProposalInboxPage({ setPage }: { setPage: (p: any) => void }) {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial profile to get my userId (for Socket) and inbox
  useEffect(() => {
    const init = async () => {
      try {
        const profile = await proposalApi.getMyProfile();
        if (profile.success && profile.profile) {
          const uid = profile.profile.user_id;
          setUserId(uid);
          proposalSocketService.connect(uid);
        }
        
        const inbox = await proposalApi.getInbox();
        if (inbox.success) {
          setChats(inbox.chats);
        }
      } catch (err) {
        console.error('Error fetching inbox:', err);
      }
    };
    init();

    // Listen for online status changes globally
    proposalSocketService.onUserStatusChange(({ userId: changedUserId, status }) => {
      setChats(prev => prev.map(c => 
        c.userId === changedUserId ? { ...c, online: status === 'online' } : c
      ));
    });

    return () => {
      proposalSocketService.offUserStatusChange();
      proposalSocketService.disconnect();
    };
  }, []);

  // Fetch messages when a chat is selected
  useEffect(() => {
    if (activeChatId) {
      const fetchMessages = async () => {
        try {
          const res = await proposalApi.getMessages(activeChatId);
          if (res.success) {
            setActiveMessages(res.messages);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchMessages();

      // Join Socket Room
      proposalSocketService.joinChat(activeChatId);

      // Listen for incoming messages
      proposalSocketService.onNewMessage((msg) => {
        setActiveMessages(prev => [...prev, msg]);
        // Update last message in sidebar
        setChats(prev => prev.map(c => 
          c.id === activeChatId ? { ...c, lastMessage: msg.text } : c
        ));
      });

      return () => {
        proposalSocketService.leaveChat(activeChatId);
        proposalSocketService.offNewMessage();
      };
    }
  }, [activeChatId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !activeChatId) return;
    const msgText = message;
    setMessage('');
    try {
      const res = await proposalApi.sendMessage(activeChatId, msgText);
      if (res.success) {
        setActiveMessages(prev => [...prev, res.message]);
        setChats(prev => prev.map(c => 
          c.id === activeChatId ? { ...c, lastMessage: msgText } : c
        ));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <div className="w-full max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col p-0 sm:p-4">
      
      {/* Split Pane Layout */}
      <div className="flex-1 flex overflow-hidden sm:rounded-[2rem] sm:border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-2xl backdrop-blur-xl">
        
        {/* Left Pane - Chat List */}
        <div className={cx(
          "w-full md:w-[380px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 shrink-0 transition-transform duration-300",
          activeChatId ? "hidden md:flex" : "flex"
        )}>
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <button onClick={() => setPage('dashboard')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ChevronLeft size={24} className="text-slate-700 dark:text-slate-300" />
            </button>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Messages</h2>
          </div>
          
          {/* New Matches Strip */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">New Matches</h3>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {chats.filter(c => c.isMatch).map(match => (
                <div key={`match-${match.id}`} className="flex flex-col items-center gap-2 cursor-pointer shrink-0" onClick={() => setActiveChatId(match.id)}>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 to-blue-600">
                      <img src={match.avatar || 'https://via.placeholder.com/150'} alt={match.name} className="w-full h-full rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{match.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={cx(
                  "flex items-center gap-4 p-4 cursor-pointer transition-colors border-l-4",
                  activeChatId === chat.id 
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500" 
                    : "border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50"
                )}
              >
                <div className="relative shrink-0">
                  <img src={chat.avatar || 'https://via.placeholder.com/150'} alt={chat.name} className="w-14 h-14 rounded-full object-cover" />
                  {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{chat.name}</h3>
                    <span className="text-[10px] font-medium text-slate-500 shrink-0">
                      {new Date(chat.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane - Active Chat */}
        <div className={cx(
          "flex-1 flex flex-col bg-white dark:bg-slate-900/50 relative",
          !activeChatId ? "hidden md:flex items-center justify-center" : "flex"
        )}>
          
          {/* Chat Placeholder (When none selected) */}
          {!activeChatId && (
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full grid place-items-center mx-auto mb-4">
                <Send size={32} className="text-slate-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your Messages</h2>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">Select a conversation from the list to start chatting with your matches.</p>
            </div>
          )}

          {activeChat && (
            <>
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                  <button className="md:hidden p-2 -ml-2 text-slate-500" onClick={() => setActiveChatId(null)}>
                    <ChevronLeft size={24} />
                  </button>
                  <div className="relative">
                    <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                    {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{activeChat.name}</h3>
                    <p className="text-xs text-slate-500">{activeChat.online ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><Phone size={20} /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><Video size={20} /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><MoreVertical size={20} /></button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <ScreenshotBlocker currentUserId={userId || 'unknown'}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-slate-950/30 relative">
                <div className="text-center">
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Today
                  </span>
                </div>
                
                {activeMessages.map((msg: any) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={cx("flex", msg.sender === 'me' ? "justify-end" : "justify-start")}
                  >
                    <div className={cx(
                      "max-w-[75%] rounded-2xl px-5 py-3 shadow-sm relative group",
                      msg.sender === 'me' 
                        ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-sm" 
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm border border-slate-100 dark:border-slate-700"
                    )}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      
                      <div className={cx(
                        "flex items-center gap-1 mt-1 justify-end",
                        msg.sender === 'me' ? "text-blue-100" : "text-slate-400"
                      )}>
                        <span className="text-[10px]">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {msg.sender === 'me' && (
                          msg.read ? <CheckCheck size={14} className="text-white" /> : <Check size={14} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-2 border border-slate-200 dark:border-slate-700 focus-within:border-blue-500/50 focus-within:ring-2 ring-blue-500/20 transition-all">
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors shrink-0">
                    <Smile size={24} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors shrink-0">
                    <Paperclip size={24} />
                  </button>
                  
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 text-sm text-slate-900 dark:text-white max-h-32 min-h-[44px]"
                    rows={1}
                  />

                  <button 
                    disabled={!message.trim()}
                    onClick={handleSendMessage}
                    className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
                  >
                    <Send size={18} className="ml-1" />
                  </button>
                </div>
              </div>
                </div>
              </ScreenshotBlocker>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
