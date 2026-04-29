import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LuSearch, LuTrendingUp, LuArrowLeft, LuSparkles, LuMic, LuClock, LuQuote } from 'react-icons/lu';
import { api } from '../../api';
import { Blog, Contributor, BlogCategory } from '../../types/blog';
import BlogCard from './ArticleCard';
import ContributorLeaderboard from './ContributorLeaderboard';
import SEO from '../../components/SEO';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';
import TiltCard from '../../components/ui/TiltCard';

const CATEGORIES: BlogCategory[] = ['Campus Life', 'Career Advice', 'Exam Tips', 'Technology'];

const FloatingIcon = ({ icon: Icon, index }: { icon: React.ComponentType, index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{
      duration: 5 + index,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.5
    }}
    className="absolute text-blue-500/20 pointer-events-none"
    style={{
      left: `${15 + (index * 20)}%`,
      top: `${10 + (index * 15)}%`,
      fontSize: `${2 + (index % 3)}rem`
    }}
  >
    <Icon />
  </motion.div>
);

const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // Simulate a slightly longer loading for "premium" feel as requested
      setLoading(true);
      try {
        const [blogsData, contributorsData] = await Promise.all([
          api.getBlogs(),
          api.getContributors()
        ]);
        setBlogs(blogsData);
        setContributors(contributorsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchData();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs.find(a => a.isTrending) || blogs[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20">
      <SEO
        title="Campus Blogs - The Uni Gang"
        description="Share and discover campus stories, career advice, and tech tips from fellow students."
      />

      <PremiumPageLoader isLoading={loading} message="Curating student stories..." />

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            {/* Background Decorative Globs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 relative z-10">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-full text-slate-700 dark:text-slate-200 font-bold border border-white/20 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all shadow-xl group"
              >
                <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Hub
              </motion.button>
            </div>

            {/* Hero Section */}
            <section className="relative pt-12 pb-16 px-4 md:px-8 max-w-7xl mx-auto z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-widest border border-blue-200/50 dark:border-blue-800/50">
                    <LuSparkles className="animate-pulse" /> Intellectual Pulse
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                    Campus <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Blogs.</span>
                  </h1>
                  <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                    Share and discover campus stories, career advice, and tech tips from fellow students across the nation.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 object-cover bg-slate-100" alt="avatar" />
                      ))}
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white dark:border-slate-950 text-white text-xs font-black">
                        +500
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Shared Insights</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Active Bloggers</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="relative hidden lg:block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-[3rem] blur-3xl animate-pulse" />

                  {/* Floating Icons */}
                  <FloatingIcon icon={LuMic} index={0} />
                  <FloatingIcon icon={LuQuote} index={1} />
                  <FloatingIcon icon={LuTrendingUp} index={2} />
                  <FloatingIcon icon={LuSparkles} index={3} />

                  <TiltCard>
                    <div className="relative rounded-[3rem] overflow-hidden border border-white/30 dark:border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] bg-white/10 backdrop-blur-sm p-6">
                      <motion.div
                        className="relative h-[500px] rounded-[2.5rem] overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={featuredBlog?.featuredImage || "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                          className="w-full h-full object-cover"
                          alt="Featured Blog"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                        <div className="absolute bottom-10 left-10 right-10 space-y-4">
                          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/30 text-white">
                            <span className="text-xs font-black uppercase tracking-widest">Featured Story</span>
                          </div>
                          <h3 className="text-4xl font-black text-white uppercase tracking-tighter line-clamp-2">
                            {featuredBlog?.title || "Unleash Your Voice"}
                          </h3>
                          <div className="flex items-center gap-6 text-white/80 font-bold">
                            <div className="flex items-center gap-2">
                              <LuClock className="text-blue-400" /> {featuredBlog?.readTime || "5 min read"}
                            </div>
                            <div className="flex items-center gap-2">
                              <LuTrendingUp className="text-blue-400" /> {featuredBlog?.views || "1.5k"} Views
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </TiltCard>
                </motion.div>
              </div>
            </section>

            {/* Blogs Grid Section */}
            <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column: Blogs */}
                <div className="lg:col-span-8 space-y-16">

                  {/* Featured Blog */}
                  {featuredBlog && (
                    <div>
                      <h2 className="mb-8 flex items-center gap-2 text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        <LuTrendingUp className="text-blue-600" /> Featured Blog
                      </h2>
                      <BlogCard blog={featuredBlog} isFeatured={true} />
                    </div>
                  )}

                  {/* Filters & Search */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-y border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className={`rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === 'All'
                          ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                          : 'bg-white/50 dark:bg-slate-900/50 text-slate-500 border border-slate-200 dark:border-slate-800 hover:bg-white transition-colors'
                          }`}
                      >
                        All
                      </button>
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                            : 'bg-white/50 dark:bg-slate-900/50 text-slate-500 border border-slate-200 dark:border-slate-800 hover:bg-white transition-colors'
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full md:w-80">
                      <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white/50 py-4 pl-12 pr-6 text-sm font-semibold focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/50 dark:text-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Blogs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredBlogs.map(blog => (
                      <BlogCard key={blog.id} blog={blog} />
                    ))}
                  </div>

                  {filteredBlogs.length === 0 && (
                    <div className="text-center py-32 bg-white/30 dark:bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                      <p className="text-slate-500 dark:text-slate-400 text-xl font-bold">No blogs found matching your criteria.</p>
                      <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="mt-4 text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">Reset Filters</button>
                    </div>
                  )}
                </div>

                {/* Right Column: Sidebar */}
                <div className="lg:col-span-4 space-y-10">
                  <ContributorLeaderboard contributors={contributors} />

                  {/* Premium CTA */}
                  <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000" />
                    <h3 className="mb-4 text-3xl font-black uppercase tracking-tighter">Join the <br /> Gang</h3>
                    <p className="mb-8 text-blue-100 font-medium opacity-90">
                      Your experiences can help thousands. Share your story today.
                    </p>
                    <Link to="/submit-blog" className="block w-full text-center rounded-2xl bg-white py-4 font-black text-blue-600 uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                      Start Your Journey
                    </Link>
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

export default BlogList;
