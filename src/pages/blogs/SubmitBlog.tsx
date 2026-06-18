import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuImage, LuType, LuLayoutDashboard, LuCheck, LuArrowRight, LuArrowLeft, LuSend, LuSparkles, LuGlobe } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SEO from '../../components/SEO';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';
import { toast } from 'react-hot-toast';
import { api } from '../../api';

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

  const [draftStatus, setDraftStatus] = useState<string>('');
  const [showDraftBanner, setShowDraftBanner] = useState(false);

  const categories = [
    'Campus Life',
    'Career Advice',
    'Exam Tips',
    'Technology',
    'Student Accommodation',
    'Sports & Fitness',
    'Clubs & Societies',
    'Events & Festivities',
    'General Discussion'
  ];

  // Draft Recovery on Mount
  React.useEffect(() => {
    const savedDraft = localStorage.getItem('blog_draft');
    if (savedDraft) {
      setShowDraftBanner(true);
    }
  }, []);

  const restoreDraft = () => {
    try {
      const savedDraft = localStorage.getItem('blog_draft');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setFormData({
          ...formData,
          title: parsed.title || '',
          category: parsed.category || 'Campus Life',
          excerpt: parsed.excerpt || '',
          content: parsed.content || '',
          tags: parsed.tags || ''
        });
        toast.success('Draft restored successfully!', { style: { borderRadius: '20px', background: '#1e293b', color: '#fff' } });
      }
    } catch (e) {
      console.error('Failed to parse draft', e);
    }
    setShowDraftBanner(false);
  };

  const discardDraft = () => {
    localStorage.removeItem('blog_draft');
    setShowDraftBanner(false);
  };

  // Debounced Auto-Save
  React.useEffect(() => {
    if (!formData.title && !formData.content) return; // Don't save empty drafts initially
    
    setDraftStatus('Saving draft...');
    const timeoutId = setTimeout(() => {
      const draftToSave = {
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags
      };
      localStorage.setItem('blog_draft', JSON.stringify(draftToSave));
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setDraftStatus(`Draft saved locally at ${time}`);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [formData.title, formData.category, formData.excerpt, formData.content, formData.tags]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('You must be logged in to submit a blog post.');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('excerpt', formData.excerpt);
      data.append('content', formData.content);
      data.append('tags', formData.tags);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await api.createBlog(data, token);
      
      // Clear draft on successful submit
      localStorage.removeItem('blog_draft');
      setDraftStatus('');

      toast.success('Your blog has been submitted for moderation!', {
        duration: 5000,
        style: {
          borderRadius: '20px',
          background: '#1e293b',
          color: '#fff',
          fontWeight: 'bold'
        }
      });
      navigate('/blogs');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to submit blog post.');
    } finally {
      setLoading(false);
    }
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

        {/* Draft Recovery Slide-in Banner */}
        {showDraftBanner && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-slate-900 dark:bg-blue-900/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 dark:border-blue-800/50 shadow-xl"
          >
            <div className="flex items-center gap-3 text-white">
              <LuSparkles className="text-yellow-400 w-5 h-5" />
              <p className="text-sm font-semibold">You have an unsaved draft from a previous session.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={discardDraft} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">Discard</button>
              <button onClick={restoreDraft} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/20">Restore Draft</button>
            </div>
          </motion.div>
        )}

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

                  <button 
                    onClick={nextStep}
                    disabled={!formData.title}
                    className="w-full mt-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    Continue to Content <LuArrowRight />
                  </button>
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
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Full Content</label>
                  <div className="bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50">
                    <ReactQuill 
                      theme="snow"
                      value={formData.content}
                      onChange={content => setFormData({...formData, content})}
                      placeholder="Start writing your masterpiece..."
                      className="text-slate-900 dark:text-white"
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}],
                          ['link', 'image', 'code-block'],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                  <style>{`
                    .ql-toolbar.ql-snow { border: none; border-bottom: 1px solid rgba(148, 163, 184, 0.2); font-family: inherit; }
                    .ql-container.ql-snow { border: none; font-family: inherit; font-size: 1.125rem; }
                    .ql-editor { min-height: 300px; padding: 1.5rem; }
                    .dark .ql-snow .ql-stroke { stroke: #94a3b8; }
                    .dark .ql-snow .ql-fill { fill: #94a3b8; }
                    .dark .ql-snow .ql-picker { color: #94a3b8; }
                    .dark .ql-snow .ql-picker-options { background-color: #1e293b; border-color: #334155; }
                    .dark .ql-snow .ql-tooltip { background-color: #1e293b; border-color: #334155; color: #fff; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.5); }
                    .dark .ql-snow .ql-tooltip input[type=text] { background-color: #0f172a; color: #fff; border-color: #334155; }
                    .dark .ql-editor.ql-blank::before { color: #64748b; font-style: normal; }
                  `}</style>
                </div>

                <button 
                    type="button"
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
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Featured Image (Only 1 Cover Photo)</label>

                  {/* Empty state: click-to-upload zone */}
                  {!formData.image && (
                    <div className="relative rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all py-16 overflow-hidden">
                      <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                        <LuImage className="text-3xl text-slate-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div className="text-center">
                        <p className="font-black text-slate-600 dark:text-slate-300 text-sm uppercase tracking-wider">Click to upload cover image</p>
                        <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP — max one image</p>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFormData({ ...formData, image: file });
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer z-30" 
                      />
                    </div>
                  )}

                  {/* Preview: show full uploaded image */}
                  {formData.image && (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 group">
                      <img 
                        src={URL.createObjectURL(formData.image)} 
                        alt="Cover preview" 
                        className="w-full max-h-[480px] object-contain"
                      />
                      {/* Change image overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                        <div className="bg-white/90 backdrop-blur rounded-xl px-5 py-3 flex items-center gap-2">
                          <LuImage className="text-slate-700" />
                          <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Change Image</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: null })}
                          className="bg-red-500/90 backdrop-blur text-white text-xs font-black px-5 py-3 rounded-xl uppercase tracking-wider hover:bg-red-600 transition-colors"
                        >
                          Remove Image
                        </button>
                      </div>
                      {/* Hidden file input to re-select */}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFormData({ ...formData, image: file });
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                      />
                    </div>
                  )}
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

                <div className="flex items-center gap-6 mt-8">
                  {draftStatus && (
                    <span className="text-xs font-semibold text-slate-400 animate-pulse hidden sm:block w-32">
                      {draftStatus}
                    </span>
                  )}
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3"
                  >
                    Publish Story <LuSend />
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitBlog;
