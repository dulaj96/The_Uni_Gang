import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuClock, LuCalendar, LuThumbsUp, LuShare2 } from 'react-icons/lu';
import { api } from '../../api';
import { Blog } from '../../types/blog';
import SEO from '../../components/SEO';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchBlog = async () => {
      if (slug) {
        const data = await api.getBlogBySlug(slug);
        if (data) setBlog(data);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

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

                <h1 className="mb-8 text-4xl font-black text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-100 pb-8 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <img 
                      src={blog.author.avatar} 
                      alt={blog.author.name} 
                      className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
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
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400">
                      <LuThumbsUp className="w-5 h-5" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400">
                      <LuShare2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="mb-12 overflow-hidden rounded-3xl shadow-2xl">
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
                    className="h-24 w-24 rounded-full border-4 border-white shadow-xl"
                  />
                  <div className="text-center md:text-left">
                    <h4 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">Written by {blog.author.name}</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Contributor from {blog.author.university}. Passionate about sharing student perspectives and helping the community grow.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                      {blog.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-blue-600">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogDetail;
