import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Camera, User, Settings2, Heart, Save } from 'lucide-react';
import { PrimaryButton, Card, cx } from '../components/ui/ProposalPrimitives';

export default function ProposalProfilePage({ setPage }: { setPage: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<'photos' | 'bio' | 'preferences'>('photos');

  // Dummy data state for the editor
  const [photos] = useState([
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    '', '', '', '', ''
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md py-4 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setPage('dashboard')} className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft size={24} className="text-slate-700 dark:text-slate-300" />
          </button>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Edit Profile</h1>
        </div>
        <PrimaryButton small icon={Save}>Save Changes</PrimaryButton>
      </div>

      <Card className="overflow-hidden">
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
                activeTab === tab.id ? "text-blue-600 dark:text-blue-400" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
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
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            
            {activeTab === 'photos' && (
              <motion.div key="photos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gallery</h3>
                  <p className="text-sm text-slate-500 mt-1">Upload at least 2 photos to activate your profile. The first photo is your main profile picture.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((src, idx) => (
                    <div key={idx} className="aspect-[3/4] rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 relative overflow-hidden group cursor-pointer hover:border-blue-500 transition-colors">
                      {src ? (
                        <>
                          <img src={src} alt="Upload" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-bold">Replace</span>
                          </div>
                          {idx === 0 && <span className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Main</span>}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
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
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    placeholder="Write a little bit about yourself, your goals, and what you are looking for..."
                  />
                  <p className="text-[11px] text-slate-400 mt-2 text-right">0/500 characters</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Height</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option>Select Height</option>
                      <option>5'0" (152 cm)</option>
                      <option>5'5" (165 cm)</option>
                      <option>6'0" (183 cm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Religion</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option>Buddhist</option>
                      <option>Christian</option>
                      <option>Hindu</option>
                      <option>Muslim</option>
                      <option>Other / Prefer not to say</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Hobbies (Comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Reading, Coding, Traveling"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div key="preferences" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><Heart size={20} className="text-rose-500" /> Match Preferences</h3>
                  <p className="text-sm text-slate-500 mb-6">Who are you looking to meet?</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Age Range</label>
                  <div className="flex items-center gap-4">
                    <input type="number" placeholder="Min" className="w-24 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    <span className="text-slate-400">to</span>
                    <input type="number" placeholder="Max" className="w-24 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Preferred Districts</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 mb-2">
                    <option>Anywhere in Sri Lanka</option>
                    <option>Colombo Only</option>
                    <option>Western Province</option>
                  </select>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Strict Matching</h4>
                      <p className="text-xs text-slate-500 mt-1">Only show me people who strictly fit these filters.</p>
                    </div>
                    <button className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative transition-colors duration-300">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
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
