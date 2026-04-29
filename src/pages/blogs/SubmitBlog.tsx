import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuImage, LuType, LuLayoutDashboard, LuCheck, LuArrowRight, LuArrowLeft, LuSend, LuSparkles, LuGlobe } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';
import { toast } from 'react-hot-toast';

const SubmitBlog: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Campus Life',
    excerpt: '',
    content: '',
    tags: '',
    image: null as File | null
  });

  const categories = ['Campus Life', 'Career Advice', 'Exam Tips', 'Technology'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for premium feel
    setTimeout(() => {
      setLoading(false);
      toast.success('Your blog has been submitted for review!', {
        duration: 5000,
        style: {
          borderRadius: '20px',
          background: '#1e293b',
          color: '#fff',
          fontWeight: 'bold'
        }
      });
      navigate('/blogs');
    }, 2500);
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20 pt-32">
      <SEO 
        title="Share Your Story - Blogs" 
        description="Amplify your voice and share your campus experiences with the Uni Gang community." 
      />

      <PremiumPageLoader isLoading={loading} message="Publishing your story to the world..." />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Progress Header */}
        <div className="mb-12 flex items-center justify-between">
          <button 
            onClick={() => step > 1 ? prevStep() : navigate('/blogs')}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group"
          >
            <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            {step === 1 ? 'Back to Blogs' : 'Previous Step'}
          </button>
          
          <div className="flex items-center gap-4">
            {[1, 2, 3].map(i => (
              <div 
                key={i}
                className={`h-2 w-12 rounded-full transition-all duration-500 ${
                  step >= i ? 'bg-blue-600 w-16' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-2xl p-10 md:p-16"
        >
          {step === 1 && (
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-widest border border-blue-200/50 dark:border-blue-800/50">
                  <LuType /> Step 01
                </div>
                <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">The Vision.</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Every great story starts with a compelling title and a clear purpose.</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Title of your Story</label>
                  <input 
                    type="text"
                    placeholder="e.g. How I Survived My First Semester"
                    className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl p-6 text-xl font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Choose a Category</label>
                  <div className="flex flex-wrap gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFormData({...formData, category: cat})}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                          formData.category === cat 
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
                            : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={nextStep}
                  disabled={!formData.title}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  Continue to Content <LuArrowRight />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-black uppercase tracking-widest border border-indigo-200/50 dark:border-indigo-800/50">
                  <LuLayoutDashboard /> Step 02
                </div>
                <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">The Core.</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Pour your heart out. Share your wisdom with thousands of peers.</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">A brief excerpt</label>
                  <textarea 
                    placeholder="Sum up your story in two sentences..."
                    className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl p-6 text-lg font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none h-24 resize-none"
                    value={formData.excerpt}
                    onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Full Content (HTML Supported)</label>
                  <textarea 
                    placeholder="Start writing your masterpiece..."
                    className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl p-6 text-lg font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none h-64 resize-none"
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                  />
                </div>

                <button 
                  onClick={nextStep}
                  disabled={!formData.content || !formData.excerpt}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  Finalize Details <LuArrowRight />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-widest border border-emerald-200/50 dark:border-emerald-800/50">
                  <LuCheck /> Step 03
                </div>
                <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">The Finish Line.</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Add some final polish and tags to help people find your blog.</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Featured Image</label>
                  <div className="relative h-48 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-blue-500 transition-all">
                    <LuImage className="text-4xl text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <p className="text-sm font-bold text-slate-500">Drag or click to upload your cover image</p>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Tags (Comma separated)</label>
                  <div className="relative">
                    <LuSparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="e.g. lifestyle, career, advice"
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl py-6 pl-12 pr-6 text-lg font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                      value={formData.tags}
                      onChange={e => setFormData({...formData, tags: e.target.value})}
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-start gap-4">
                  <LuGlobe className="text-blue-600 mt-1" />
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    By submitting, you agree to our community guidelines. Your post will be reviewed by our team before going live.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3"
                >
                  Publish Story <LuSend />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitBlog;
