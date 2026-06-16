import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuClock, LuCalendar, LuThumbsUp, LuShare2, LuMessageSquare, LuTrash2, LuSend, LuBookOpen } from 'react-icons/lu';
import { api } from '../../api';
import { Blog } from '../../types/blog';
import SEO from '../../components/SEO';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import ArticleCard from './ArticleCard';

const getLoggedInUserEmail = (): string | null => {
  const token = localStorage.getItem('userToken');
  if (token) {
    if (token === 'dummy_token') return 'john@example.com';
    if (token.startsWith('mock_token:')) return token.split(':')[1] || null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload).email || null;
    } catch (e) {}
  }
  return localStorage.getItem('userEmail') || null;
};

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // TOC State
  const [headings, setHeadings] = useState<{id: string, text: string, level: number}[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  // Comments state
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const fetchBlog = async () => {
    if (slug) {
      try {
        const data = await api.getBlogBySlug(slug);
        if (data) {
          setBlog(data);
          // Fetch related blogs
          try {
            const all = await api.getBlogs();
            const related = all.filter((b: Blog) => b.category === data.category && b.id !== data.id).slice(0, 3);
            setRelatedBlogs(related);
          } catch (e) { console.error('Failed to fetch related blogs'); }
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  // Generate TOC
  useEffect(() => {
    if (blog?.content) {
      setTimeout(() => {
        const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3'));
        const newHeadings = elements.map((elem, index) => {
          if (!elem.id) elem.id = `heading-${index}`;
          return {
            id: elem.id,
            text: elem.textContent || '',
            level: Number(elem.tagName.substring(1))
          };
        });
        setHeadings(newHeadings);
      }, 500); // Wait for dangerouslySetInnerHTML rendering
    }
  }, [blog]);

  // TOC Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveHeadingId(entry.target.id);
        });
      }, { rootMargin: '0px 0px -80% 0px' }
    );
    
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const handleLike = async () => {
    if (!blog) return;
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('Please login to like this blog post.', { style: { borderRadius: '20px', background: '#1e293b', color: '#fff' } });
      return;
    }
    try {
      const result = await api.toggleLike(blog.id, token);
      setBlog(prev => prev ? { ...prev, likes: result.likes, hasLiked: result.hasLiked } : null);
      if (result.hasLiked) {
        toast.success('Liked story!', { style: { borderRadius: '20px', background: '#1e293b', color: '#fff' } });
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
          disableForReducedMotion: true
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to toggle like.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Story link copied to clipboard!', { style: { borderRadius: '20px', background: '#1e293b', color: '#fff' } });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('Please login to write a comment.', { style: { borderRadius: '20px', background: '#1e293b', color: '#fff' } });
      return;
    }
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = await api.addComment(blog.id, commentText, token);
      setBlog(prev => prev ? { ...prev, comments: [newComment, ...(prev.comments || [])] } : null);
      setCommentText('');
      toast.success('Comment posted successfully!', { style: { borderRadius: '20px', background: '#1e293b', color: '#fff' } });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to submit comment.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleCommentDelete = (commentId: string) => {
    if (!blog) return;
    const token = localStorage.getItem('userToken');
    if (!token) return;

    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <p className="text-sm font-semibold text-white">Are you sure you want to remove this comment?</p>
        <div className="flex justify-end gap-2 mt-1">
          <button onClick={() => toast.dismiss(t.id)} className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700">Cancel</button>
          <button onClick={async () => {
              toast.dismiss(t.id);
              try {
                await api.deleteComment(blog.id, commentId, token);
                setBlog(prev => prev ? { ...prev, comments: (prev.comments || []).filter(c => c.id !== commentId) } : null);
                toast.success('Comment removed.', { style: { borderRadius: '20px', background: '#1e293b', color: '#fff' } });
              } catch (err) { toast.error('Failed to delete comment.'); }
            }}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/20"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000, position: 'top-center',
      style: { borderRadius: '24px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b', padding: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)' }
    });
  };

  if (!loading && !blog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Blog not found</h2>
        <Link to="/blogs" className="mt-4 text-blue-600 font-bold">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pt-24 pb-20">
      <PremiumPageLoader isLoading={loading} message="Loading Story..." />
      
      <AnimatePresence>
        {!loading && blog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <SEO title={`${blog.title} - Blogs`} description={blog.excerpt} />

            {/* Reading Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 z-[60] h-1.5 origin-left bg-gradient-to-r from-blue-500 to-indigo-500" style={{ scaleX }} />

            {/* Floating Action Bar (Desktop) */}
            <div className="hidden xl:flex fixed left-10 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-40 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-3 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xl">
              <button onClick={handleLike} className={`p-3 rounded-full transition-all duration-300 ${blog.hasLiked ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-600 hover:scale-110'}`}>
                <LuThumbsUp className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-500 -mt-2">{blog.likes}</span>
              
              <button onClick={() => document.getElementById('discussion')?.scrollIntoView({ behavior: 'smooth' })} className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-600 hover:scale-110 transition-all">
                <LuMessageSquare className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-500 -mt-2">{blog.comments?.length || 0}</span>

              <div className="w-8 h-px bg-slate-200 dark:bg-slate-700 my-2" />
              
              <button onClick={handleShare} className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-600 hover:scale-110 transition-all" title="Copy Link">
                <LuShare2 className="w-5 h-5" />
              </button>

              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-[#1DA1F2] hover:scale-110 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-[#25D366] hover:scale-110 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.383 0 12.03c0 2.13.553 4.183 1.584 5.992L.25 24l6.155-1.614A11.966 11.966 0 0012.031 24c6.645 0 12.03-5.383 12.03-12.03S18.676 0 12.031 0zm0 21.996c-1.803 0-3.565-.483-5.112-1.402l-.367-.216-3.8.995 1.01-3.705-.237-.376A9.96 9.96 0 012.034 12.03C2.034 6.505 6.51 2.034 12.031 2.034c5.522 0 10.001 4.471 10.001 9.996 0 5.526-4.479 9.966-10.001 9.966zm5.492-7.508c-.301-.151-1.782-.879-2.059-.979-.277-.101-.479-.151-.68.151-.202.302-.779.979-.955 1.18-.176.202-.352.227-.654.076-1.303-.655-2.28-1.442-3.04-2.824-.175-.302.176-.277.618-.888.101-.151.151-.252.227-.403.076-.151.038-.277-.038-.428-.076-.151-.68-1.637-.932-2.241-.244-.59-.492-.51-.68-.519-.176-.008-.378-.008-.579-.008-.202 0-.528.075-.805.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.923 1.233 3.124.151.202 2.128 3.25 5.155 4.557.72.311 1.282.497 1.722.637.722.228 1.38.196 1.895.118.579-.088 1.782-.728 2.034-1.434.252-.705.252-1.31.176-1.434-.076-.126-.278-.202-.579-.353z"/></svg>
              </a>
            </div>

            <div className="container mx-auto px-4 lg:px-8 xl:px-20 max-w-7xl flex flex-col lg:flex-row gap-12 relative">
              
              {/* Main Content Area */}
              <div className="flex-1 max-w-3xl xl:max-w-4xl mx-auto lg:mx-0 w-full">
                {/* Navigation */}
                <Link to="/blogs" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-800">
                  <LuArrowLeft className="w-4 h-4" /> Back to Blogs
                </Link>

                {/* Header */}
                <header className="mb-10">
                  <div className="mb-6 flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-black text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 tracking-wider uppercase border border-blue-200 dark:border-blue-800">
                      {blog.category}
                    </span>
                  </div>

                  <h1 className="mb-8 text-4xl font-black text-slate-900 dark:text-white md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                    {blog.title}
                  </h1>

                  <div className="flex flex-wrap items-center justify-between gap-6 pb-8">
                    <div className="flex items-center gap-4">
                      <img src={blog.author.avatar} alt={blog.author.name} className="h-14 w-14 rounded-full border-2 border-white shadow-md object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-lg">{blog.author.name}</p>
                        <div className="flex items-center gap-3 text-sm font-medium text-slate-500 mt-1">
                          <span className="flex items-center gap-1.5"><LuCalendar className="w-4 h-4 text-blue-500" /> {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span className="flex items-center gap-1.5"><LuClock className="w-4 h-4 text-orange-500" /> {blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Featured Image */}
                <div className="mb-14 overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <img src={blog.featuredImage} alt={blog.title} className="w-full object-cover max-h-[600px]" />
                </div>

                {/* Blog Body */}
                <article className="prose prose-lg md:prose-xl mx-auto max-w-none dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-3xl prose-img:shadow-xl">
                  {/* Used specifically for ReactQuill rendered content */}
                  <div className="ql-editor" style={{ padding: 0 }} dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>

                {/* Tags */}
                <div className="mt-12 flex flex-wrap gap-2 pt-8 border-t border-slate-200 dark:border-slate-800">
                  {blog.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">#{tag}</span>
                  ))}
                </div>

                {/* Author Bio Box */}
                <div className="mt-16 rounded-[2rem] bg-white dark:bg-slate-900 p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <img src={blog.author.avatar} alt={blog.author.name} className="h-28 w-28 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl object-cover" />
                    <div className="text-center md:text-left flex-1">
                      <p className="text-sm font-black text-blue-600 uppercase tracking-widest mb-1">Written By</p>
                      <h4 className="mb-3 text-3xl font-black text-slate-900 dark:text-white">{blog.author.name}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        Contributor from {blog.author.university || 'University of Colombo'}. Passionate about sharing student perspectives and helping the community grow. Follow for more insights and campus life stories.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Discussion Section */}
                <section id="discussion" className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                        <LuMessageSquare className="text-blue-600 dark:text-blue-400 text-2xl" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Discussion ({blog.comments ? blog.comments.length : 0})
                      </h3>
                    </div>
                  </div>

                  {/* Comment Input */}
                  {localStorage.getItem('userToken') ? (
                    <form onSubmit={handleCommentSubmit} className="mb-12 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="flex gap-4 items-start">
                        <img src={localStorage.getItem('userProfilePicture') || `https://api.dicebear.com/7.x/avataaars/svg?seed=${localStorage.getItem('userName') || 'User'}`} alt="avatar" className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-md object-cover shrink-0" />
                        <div className="flex-1 space-y-4">
                          <textarea
                            value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="What are your thoughts?" required
                            className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-base font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white transition-all resize-none h-32"
                          />
                          <div className="flex justify-end">
                            <button type="submit" disabled={submittingComment} className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-70">
                              {submittingComment ? 'Posting...' : 'Publish'} <LuSend className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="mb-12 p-10 rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900/50 border border-blue-100 dark:border-slate-800 text-center shadow-inner">
                      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">Join the Conversation</h4>
                      <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 max-w-md mx-auto">Sign in to share your thoughts, ask questions, and connect with the author.</p>
                      <Link to="/post-ad" className="inline-block px-8 py-3.5 bg-slate-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-500 dark:text-slate-900 text-white dark:hover:text-white rounded-full text-sm font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1">
                        Sign In / Register
                      </Link>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-6">
                    {blog.comments && blog.comments.length > 0 ? (
                      blog.comments.map((comment) => {
                        const userEmail = getLoggedInUserEmail();
                        const isOwner = comment.user.email === userEmail;
                        return (
                          <motion.div key={comment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-5 p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                            <img src={comment.user.avatar || comment.user.profile_pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.name}`} alt={comment.user.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <span className="font-bold text-base text-slate-900 dark:text-white mr-3">{comment.user.name}</span>
                                  <span className="text-xs text-slate-500 font-semibold">{new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                </div>
                                {isOwner && (
                                  <button onClick={() => handleCommentDelete(comment.id)} className="text-red-500 hover:text-white p-2 rounded-xl hover:bg-red-500 transition-all cursor-pointer">
                                    <LuTrash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
                        <p className="text-slate-400 font-semibold text-lg">No comments on this story yet. Be the first!</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Sidebar Area (TOC) */}
              <div className="hidden lg:block w-80 shrink-0">
                <div className="sticky top-32 space-y-10">
                  {/* Table of Contents */}
                  {headings.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                      <h3 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                        <LuBookOpen className="text-blue-500 w-5 h-5" /> In this article
                      </h3>
                      <nav className="flex flex-col gap-3">
                        {headings.map(h => (
                          <a 
                            key={h.id} 
                            href={`#${h.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`text-sm font-semibold transition-all duration-300 border-l-2 pl-4 py-1
                              ${activeHeadingId === h.id 
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:border-slate-400'
                              }
                              ${h.level === 3 ? 'ml-4 text-xs' : ''}
                            `}
                          >
                            {h.text}
                          </a>
                        ))}
                      </nav>
                    </div>
                  )}

                  {/* Sidebar Stats Widget */}
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-500/20">
                    <h3 className="font-black text-white/90 mb-6 uppercase tracking-widest text-sm">Story Stats</h3>
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-4xl font-black">{blog.views}</p>
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mt-1">Reads</p>
                      </div>
                      <div className="w-px h-10 bg-white/20" />
                      <div>
                        <p className="text-4xl font-black">{blog.likes}</p>
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mt-1">Claps</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Read Next Section */}
            {relatedBlogs.length > 0 && (
              <section className="bg-white dark:bg-slate-900 mt-20 py-24 border-t border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4 max-w-7xl">
                  <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Read Next</h2>
                    <Link to="/blogs" className="text-blue-600 font-bold hover:underline">View all in {blog.category}</Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedBlogs.map((b) => (
                      <ArticleCard key={b.id} blog={b} />
                    ))}
                  </div>
                </div>
              </section>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogDetail;
