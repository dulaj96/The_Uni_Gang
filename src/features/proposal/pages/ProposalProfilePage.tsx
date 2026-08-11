import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Camera, User, Settings2, Heart, Save } from 'lucide-react';
import { PrimaryButton, Card, cx } from '../components/ui/ProposalPrimitives';
import { proposalApi } from '../api/proposalApi';

export default function ProposalProfilePage({ setPage }: { setPage: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<'photos' | 'bio' | 'preferences'>('photos');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<any>({
    images: ['', '', ''],
    bio: '',
    height: '',
    religion: '',
    hobbies: '',
    pref_age_min: 18,
    pref_age_max: 35,
    pref_district: 'Anywhere in Sri Lanka',
    pref_religion: '',
    pref_smoking: '',
    pref_drinking: '',
    pref_strict_matching: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await proposalApi.getMyProfile();
        if (res.success && res.profile) {
          const p = res.profile;
          // Pad images array to 3 elements for the grid
          const imgs = p.images ? [...p.images] : [];
          while (imgs.length < 3) imgs.push('');

          setFormData({
            ...p,
            images: imgs,
            hobbies: p.hobbies ? p.hobbies.join(', ') : '',
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...formData,
        hobbies: formData.hobbies.split(',').map((h: string) => h.trim()).filter(Boolean),
        images: formData.images.filter((img: string) => img !== '')
      };
      const res = await proposalApi.submitProfile(payload);
      if (res.success) {
        alert('Profile saved successfully!');
      } else {
        alert(res.message || 'Error saving profile');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-80px)]">
      {/* Header - Fixed Black Box UI */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-transparent py-4 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setPage('dashboard')} className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm">
            <ChevronLeft size={24} className="text-slate-700 dark:text-slate-300" />
          </button>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white drop-shadow-sm">Edit Profile</h1>
        </div>
        <PrimaryButton small icon={Save} onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </PrimaryButton>
      </div>

      <Card className="overflow-hidden shadow-xl border-slate-200 dark:border-slate-800">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto hide-scrollbar">
          {[
            { id: 'photos', label: 'Photos', icon: Camera },
            { id: 'bio', label: 'About Me', icon: User },
            { id: 'preferences', label: 'Preferences', icon: Settings2 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cx(
                "flex items-center gap-2 px-6 py-4 text-sm font-bold transition-colors whitespace-nowrap relative",
                activeTab === tab.id ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/10" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="profileTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900">
          <AnimatePresence mode="wait">
            
            {activeTab === 'photos' && (
              <motion.div key="photos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gallery</h3>
                  <p className="text-sm text-slate-500 mt-1">Upload at least 2 photos to activate your profile. The first photo is your main profile picture.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((src: string, idx: number) => (
                    <div key={idx} className="aspect-[3/4] rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 relative overflow-hidden group cursor-pointer hover:border-blue-500 transition-colors">
                      {src ? (
                        <>
                          <img src={src} alt="Upload" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-bold">Replace</span>
                          </div>
                          {idx === 0 && <span className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">Main</span>}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors" onClick={() => {
                          const newUrl = prompt("Enter Image URL (Temporary UI):");
                          if (newUrl) {
                            const newImages = [...formData.images];
                            newImages[idx] = newUrl;
                            setFormData({...formData, images: newImages});
                          }
                        }}>
                          <Camera size={24} className="mb-2" />
                          <span className="text-xs font-bold">Add Photo</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'bio' && (
              <motion.div key="bio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Dating Bio</label>
                  <textarea 
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    placeholder="Write a little bit about yourself, your goals, and what you are looking for..."
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Height</label>
                      <select name="height" value={formData.height || ''} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                        <option value="">Select Height</option>
                        <option value="5'0&quot; (152 cm)">5'0" (152 cm)</option>
                        <option value="5'5&quot; (165 cm)">5'5" (165 cm)</option>
                        <option value="6'0&quot; (183 cm)">6'0" (183 cm)</option>
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Weight (kg)</label>
                      <input 
                        type="number"
                        name="weight"
                        value={formData.weight || ''}
                        onChange={handleChange}
                        placeholder="e.g. 65"
                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Religion</label>
                    <select name="religion" value={formData.religion || ''} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="">Select Religion</option>
                      <option value="Buddhist">Buddhist</option>
                      <option value="Christian">Christian</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Other">Other / Prefer not to say</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Hobbies (Comma separated)</label>
                    <input 
                      type="text" 
                      name="hobbies"
                      value={formData.hobbies || ''}
                      onChange={handleChange}
                      placeholder="e.g. Reading, Coding, Traveling"
                      className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div key="preferences" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><Heart size={20} className="text-rose-500" /> Partner Preferences</h3>
                  <p className="text-sm text-slate-500 mb-6">Set your criteria to find the perfect match. Complete this section to reach 100% profile strength.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Age Range</label>
                    <div className="flex items-center gap-4">
                      <input type="number" name="pref_age_min" value={formData.pref_age_min || ''} onChange={handleChange} placeholder="Min" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                      <span className="text-slate-400">to</span>
                      <input type="number" name="pref_age_max" value={formData.pref_age_max || ''} onChange={handleChange} placeholder="Max" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Preferred Districts</label>
                    <select name="pref_district" value={formData.pref_district || ''} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="">Anywhere in Sri Lanka</option>
                      <option value="Colombo">Colombo</option>
                      <option value="Kandy">Kandy</option>
                      <option value="Galle">Galle</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Religion</label>
                    <select name="pref_religion" value={formData.pref_religion || ''} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="">Any Religion</option>
                      <option value="Buddhist">Buddhist</option>
                      <option value="Christian">Christian</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Muslim">Muslim</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Smoking & Drinking Habits</label>
                    <div className="flex items-center gap-4">
                      <select name="pref_smoking" value={formData.pref_smoking || ''} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                        <option value="">Smoking: Any</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                      <select name="pref_drinking" value={formData.pref_drinking || ''} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                        <option value="">Drinking: Any</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Strict Matching</h4>
                      <p className="text-xs text-slate-500 mt-1">Only show me people who strictly fit these filters.</p>
                    </div>
                    <button 
                      onClick={() => setFormData((p: any) => ({ ...p, pref_strict_matching: !p.pref_strict_matching }))}
                      className={cx("w-12 h-6 rounded-full relative transition-colors duration-300", formData.pref_strict_matching ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700")}
                    >
                      <span className={cx("absolute top-1 w-4 h-4 bg-white rounded-full transition-transform", formData.pref_strict_matching ? "left-7" : "left-1")} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
