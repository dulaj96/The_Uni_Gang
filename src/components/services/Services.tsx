import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  LuLayoutDashboard,
  LuSmartphone,
  LuVideo,
  LuSearch,
  LuCheck,
  LuPalette,
  LuCamera,
  LuX,
  LuSend
} from 'react-icons/lu';

interface ServiceItem {
  id: number;
  title: string;
  image: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: 'Web Development',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    description: 'We build high-performance, responsive websites using modern frameworks like React and Next.js to ensure your business stands out.',
    icon: <LuLayoutDashboard />,
    features: ['Custom Web Applications', 'E-commerce Solutions', 'Performance Optimization', 'Responsive Design'],
    gradient: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    id: 2,
    title: 'Mobile App Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    description: 'Our team specializes in creating intuitive iOS and Android applications using React Native, providing a seamless user experience.',
    icon: <LuSmartphone />,
    features: ['Cross-platform Apps', 'UI/UX Design', 'App Store Optimization', 'API Integration'],
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 3,
    title: 'SEO Services',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=800&auto=format&fit=crop',
    description: 'Drive organic traffic to your platform with our data-driven SEO strategies. We help you rank higher on search engines.',
    icon: <LuSearch />,
    features: ['Keyword Research', 'Technical SEO Audits', 'On-page Optimization', 'Backlink Building'],
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    id: 4,
    title: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
    description: 'From branding to digital assets, our creative designers craft visual identities that capture your brand essence.',
    icon: <LuPalette />,
    features: ['Logo & Branding', 'Social Media Graphics', 'Print Design', 'Marketing Material'],
    gradient: 'from-orange-500/20 to-amber-500/20'
  },
  {
    id: 5,
    title: 'Video Production',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    description: 'Professional video production and cinematic editing services to tell your story. High-quality promotional videos.',
    icon: <LuVideo />,
    features: ['Professional Video Editing', 'Motion Graphics', 'Cinematic Shooting', 'Social Media Shorts'],
    gradient: 'from-rose-500/20 to-red-500/20'
  },
  {
    id: 6,
    title: 'Photography & Event Coverage',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    description: 'Capturing your most precious campus moments with a cinematic touch. From batch photos to grand convocations, we preserve your memories forever.',
    icon: <LuCamera />,
    features: ['Batch Photo Shoots', 'Convocation Photography', 'Campus Event Coverage', 'Model & Portrait Sessions'],
    gradient: 'from-blue-600/20 to-cyan-500/20'
  }
];

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // 2. WhatsApp message generate function 
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const phone = formData.get('phone');
    const brief = formData.get('brief');
    const deadline = formData.get('deadline');
    const budget = formData.get('budget');

    const message = `*Project Request: ${selectedService?.title}*%0A%0A` +
      `*WhatsApp:* ${phone}%0A` +
      `*Brief:* ${brief}%0A` +
      `*Deadline:* ${deadline}%0A` +
      `*Budget:* ${budget}`;

    window.open(`https://wa.me/94724478148?text=${message}`, '_blank');
  };

  return (
    <section id="services" className="relative pt-12 pb-10 bg-slate-150 font-sans overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-indigo-500/20 blur-[150px] rounded-full animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Our Uni Gang<span className="text-primary italic">  Services</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Floating above the competition with cutting-edge digital solutions tailored for the Sri Lankan student ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-24">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Floating Image Section */}
              <div className="flex-1 w-full max-w-md">
                <TiltCard className="perspective-1000">
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-15, 15, -15] }}
                    transition={{
                      duration: 5 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative group"
                  >
                    {/* Shadow Glow */}
                    <div className={`absolute -inset-4 bg-gradient-to-tr ${service.gradient} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700`}></div>

                    {/* Image Container */}
                    <div className="relative premium-glass rounded-[2rem] p-4 border border-white/30 dark:border-white/10 overflow-hidden shadow-2xl">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Floating Icon Badge */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="absolute bottom-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-xl border border-white/20 text-primary text-3xl"
                      >
                        {service.icon}
                      </motion.div>
                    </div>
                  </motion.div>
                </TiltCard>
              </div>

              {/* Text Context Section */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="h-1 w-12 bg-primary rounded-full"></span>
                  <span className="text-primary font-bold uppercase tracking-widest text-sm">Service {index + 1}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                  {service.title}
                </h3>

                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                    >
                      <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <LuCheck className="size-4" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8">
                  <motion.button
                    onClick={() => setSelectedService(service)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 transition-all uppercase tracking-wider text-sm"
                  >
                    Request Project
                  </motion.button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Popup Modal Implementation */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Background Overlay - Blur එක වැඩි කරා */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-xl" // High blur for premium look
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border border-white/40 dark:border-white/10 pointer-events-auto relative overflow-hidden">

                {/* Background Decorative Blobs - Modal එක ඇතුළේ තියෙන ලස්සනට */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

                {/* Close Button - Clean circle with hover effect */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-8 right-8 p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <LuX size={18} />
                </button>

                {/* Header Section - More Spacing and Bold Icon */}
                <div className="relative flex flex-col items-center text-center mb-10">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    className={`p-5 rounded-3xl bg-gradient-to-tr ${selectedService.gradient} text-primary text-4xl mb-4 shadow-inner`}
                  >
                    {selectedService.icon}
                  </motion.div>
                  <h4 className="text-3xl font-black tracking-tight dark:text-white uppercase">
                    {selectedService.title}
                  </h4>
                  <div className="h-1.5 w-12 bg-primary rounded-full mt-3 mb-2" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Ready to start your project? Fill in the details below.
                  </p>
                </div>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-5 relative">
                  {/* Input Group with floating label style feel */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Contact Details</label>
                    <div className="relative group">
                      <input
                        name="phone"
                        required
                        type="text"
                        placeholder="WhatsApp Number (e.g. +94 77 123 4567)"
                        className="w-full p-4 pl-5 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Project Scope</label>
                    <textarea
                      name="brief"
                      required
                      placeholder={`Tell us about your ${selectedService.title} requirements...`}
                      rows={3}
                      className="w-full p-5 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none placeholder:text-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Target Date</label>
                      <input
                        name="deadline"
                        required
                        type="date"
                        className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm dark:text-slate-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Estimated Budget</label>
                      <input
                        name="budget"
                        placeholder="LKR 10,000+"
                        className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Submit Button - Gradient with Shine effect */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-5 bg-gradient-to-r from-primary to-indigo-600 text-white font-black rounded-2xl shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.3)] flex items-center justify-center gap-3 mt-6 uppercase tracking-widest text-sm"
                  >
                    <LuSend size={20} className="animate-pulse" />
                    Initialize Project
                  </motion.button>

                  <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest pt-2">
                    Instant reply via WhatsApp secure line
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;