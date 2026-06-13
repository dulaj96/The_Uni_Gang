import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuClock, LuCalendar, LuThumbsUp, LuShare2, LuMessageSquare, LuTrash2, LuSend } from 'react-icons/lu';
import { api } from '../../api';
import { Blog } from '../../types/blog';
import SEO from '../../components/SEO';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';
import toast from 'react-hot-toast';

const getLoggedInUserEmail = (): string | null => {
  const token = localStorage.getItem('userToken');
  if (token) {
    if (token === 'dummy_token') {
      return 'john@example.com';
    }
    if (token.startsWith('mock_token:')) {
      const parts = token.split(':');
      return parts[1] || null;
    }
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload).email || null;
    } catch (e) {
      // ignore parsing errors and fall back to local storage
    }
  }
  
  const email = localStorage.getItem('userEmail');
  if (email) return email;
  
  return null;
};

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Comments state
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fetchBlog = async () => {
    if (slug) {
      try {
        const data = await api.getBlogBySlug(slug);
        if (data) setBlog(data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const handleLike = async () => {
    if (!blog) return;
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('Please login to like this blog post.', {
        style: { borderRadius: '20px', background: '#1e293b', color: '#fff' }
      });
      return;
    }
    try {
      const result = await api.toggleLike(blog.id, token);
      setBlog(prev => prev ? {
        ...prev,
        likes: result.likes,
        hasLiked: result.hasLiked
      } : null);
      if (result.hasLiked) {
        toast.success('Liked story!', { style: { borderRadius: '20px', background: '#1e293b', color: '#fff' } });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to toggle like.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Story link copied to clipboard!', {
      style: { borderRadius: '20px', background: '#1e293b', color: '#fff' }
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('Please login to write a comment.', {
        style: { borderRadius: '20px', background: '#1e293b', color: '#fff' }
      });
      return;
    }
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = await api.addComment(blog.id, commentText, token);
      setBlog(prev => prev ? {
        ...prev,
        comments: [newComment, ...(prev.comments || [])]
      } : null);
      setCommentText('');
      toast.success('Comment posted successfully!', {
        style: { borderRadius: '20px', background: '#1e293b', color: '#fff' }
      });
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
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700"
          >
            Cancel
          </button>
          <button 
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await api.deleteComment(blog.id, commentId, token);
                setBlog(prev => prev ? {
                  ...prev,
                  comments: (prev.comments || []).filter(c => c.id !== commentId)
                } : null);
                toast.success('Comment removed.', {
                  style: { borderRadius: '20px', background: '#1e293b', color: '#fff' }
                });
              } catch (err) {
                console.error(err);
                toast.error('Failed to delete comment.', {
                  style: { borderRadius: '20px', background: '#1e293b', color: '#fff' }
                });
              }
            }}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-red-600/20"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center',
      style: {
        borderRadius: '24px',
        background: '#0f172a',
        color: '#fff',
        border: '1px solid #1e293b',
        padding: '16px',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)'
      }
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
    <div className="min-h-screen bg-white pt-24 pb-20 dark:bg-slate-950">
      <PremiumPageLoader isLoading={loading} message="Loading Story..." />
      
      <AnimatePresence>
        {!loading && blog && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SEO title={`${blog.title} - Blogs`} description={blog.excerpt} />

            {/* Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-[60] h-1.5 origin-left bg-blue-600"
              style={{ scaleX }}
            />

            <div className="container mx-auto max-w-4xl px-4">
              {/* Navigation */}
              <Link 
                to="/blogs" 
                className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
              >
                <LuArrowLeft className="w-4 h-4" /> Back to Blogs
              </Link>

              {/* Header */}
              <header className="mb-12">
                <div className="mb-6 flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {blog.category}
                  </span>
                </div>

                <h1 className="mb-8 text-4xl font-black text-slate-900 dark:text-white md:text-5xl lg:text-6xl tracking-tight leading-tight">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-100 pb-8 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <img 
                      src={blog.author.avatar} 
                      alt={blog.author.name} 
                      className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white">{blog.author.name}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><LuCalendar className="w-3 h-3" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><LuClock className="w-3 h-3" /> {blog.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleLike}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                        blog.hasLiked 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                          : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-blue-400'
                      }`}
                    >
                      <LuThumbsUp className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleShare}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      <LuShare2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="mb-12 overflow-hidden rounded-3xl shadow-2xl bg-slate-100 dark:bg-slate-900">
                <img 
                  src={blog.featuredImage} 
                  alt={blog.title} 
                  className="w-full object-cover max-h-[500px]"
                />
              </div>

              {/* Blog Body */}
              <article className="prose prose-lg mx-auto max-w-none dark:prose-invert prose-headings:font-black prose-a:text-blue-600">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </article>

              {/* Footer Stats */}
              <div className="mt-20 flex items-center justify-center gap-12 border-t border-slate-100 pt-12 dark:border-slate-800">
                <div className="text-center">
                  <p className="text-3xl font-black text-slate-800 dark:text-white">{blog.views}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-slate-800 dark:text-white">{blog.likes}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Likes</p>
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-20 rounded-3xl bg-slate-50 p-8 dark:bg-slate-900">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <img 
                    src={blog.author.avatar} 
                    alt={blog.author.name} 
                    className="h-24 w-24 rounded-full border-4 border-white shadow-xl object-cover"
                  />
                  <div className="text-center md:text-left">
                    <h4 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">Written by {blog.author.name}</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Contributor from {blog.author.university || 'University of Colombo'}. Passionate about sharing student perspectives and helping the community grow.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                      {blog.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discussion Section */}
              <section className="mt-20 border-t border-slate-100 pt-12 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-8">
                  <LuMessageSquare className="text-blue-600 text-2xl" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Discussion ({blog.comments ? blog.comments.length : 0})
                  </h3>
                </div>

                {/* Comment Input */}
                {localStorage.getItem('userToken') ? (
                  <form onSubmit={handleCommentSubmit} className="mb-12 flex gap-4 items-start">
                    <img 
                      src={localStorage.getItem('userProfilePicture') || `https://api.dicebear.com/7.x/avataaars/svg?seed=${localStorage.getItem('userName') || 'User'}`} 
                      alt="avatar" 
                      className="w-10 h-10 rounded-full border border-slate-200 object-cover shrink-0 shadow-sm"
                    />
                    <div className="flex-1 space-y-3">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Join the conversation..."
                        required
                        className="w-full p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-sm font-semibold focus:border-blue-500 focus:outline-none dark:text-white transition-all resize-none h-24 shadow-inner"
                      />
                      <button
                        type="submit"
                        disabled={submittingComment}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                      >
                        {submittingComment ? 'Posting...' : 'Post Comment'} <LuSend />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="mb-12 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-slate-600 dark:text-slate-400 font-bold mb-4">Sign in to join the conversation and share your thoughts.</p>
                    <Link to="/post-ad" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md">
                      Sign In / Register
                    </Link>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-6">
                  {blog.comments && blog.comments.length > 0 ? (
                    blog.comments.map((comment) => {
                      const userEmail = getLoggedInUserEmail();
                      const commentEmail = comment.user.email;
                      console.log('DEBUG COMMENT OWNER CHECK:', {
                        commentId: comment.id,
                        commentContent: comment.content,
                        commentUser: comment.user,
                        commentUserEmail: commentEmail,
                        loggedInUserEmail: userEmail,
                        match: commentEmail === userEmail
                      });
                      const isOwner = commentEmail === userEmail;
                      return (
                        <motion.div 
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-4 p-5 rounded-2xl bg-slate-50/30 dark:bg-slate-900/20 border border-slate-100/50 dark:border-slate-900/50 hover:bg-slate-50/50 transition-colors"
                        >
                          <img 
                            src={comment.user.avatar || comment.user.profile_pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.name}`} 
                            alt={comment.user.name} 
                            className="w-10 h-10 rounded-full border border-slate-200 object-cover shrink-0 shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="font-bold text-sm text-slate-800 dark:text-white mr-2">{comment.user.name}</span>
                                <span className="text-[10px] text-slate-400 font-semibold">{new Date(comment.createdAt).toLocaleDateString()}</span>
                              </div>
                              {isOwner && (
                                <button 
                                  onClick={() => handleCommentDelete(comment.id)}
                                  className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-sm cursor-pointer"
                                >
                                  <LuTrash2 />
                                </button>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <p className="text-center py-10 text-slate-400 font-semibold italic">No comments on this story yet. Be the first to share your thoughts!</p>
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogDetail;
