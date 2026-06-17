import React, { useState, useEffect } from 'react';
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
  LuSend,
  LuCircleCheck,
  LuArrowRight,
  LuArrowLeft,
  LuDollarSign,
  LuClock
} from 'react-icons/lu';
import { api } from '../../api';
import AuthCard from '../auth/AuthCard';

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
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [step, setStep] = useState(1);
  const [configSelections, setConfigSelections] = useState<any>({});

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Reset auth gate view & configurator when modal is closed/opened
  useEffect(() => {
    if (!selectedService) {
      setShowAuthGate(false);
      setStep(1);
      setConfigSelections({});
    } else {
      setStep(1);
      setConfigSelections({});
    }
  }, [selectedService]);

  const calculateEstimate = () => {
    if (!selectedService) return { minPrice: 0, maxPrice: 0, days: 0 };
    let minPrice = 0;
    let maxPrice = 0;
    let days = 0;

    switch (selectedService.id) {
      case 1: // Web Development
        const platform = configSelections.platform || 'landing';
        if (platform === 'landing') {
          minPrice = 25000; maxPrice = 45000; days = 5;
        } else if (platform === 'ecommerce') {
          minPrice = 80000; maxPrice = 150000; days = 14;
        } else {
          minPrice = 120000; maxPrice = 250000; days = 21;
        }

        const pages = configSelections.pages || '1-3';
        if (pages === '4-10') {
          minPrice += 15000; maxPrice += 25000; days += 2;
        } else if (pages === '10+') {
          minPrice += 40000; maxPrice += 60000; days += 5;
        }

        const webFeatures = configSelections.webFeatures || [];
        if (webFeatures.includes('payment')) {
          minPrice += 15000; maxPrice += 20000; days += 2;
        }
        if (webFeatures.includes('cms')) {
          minPrice += 20000; maxPrice += 30000; days += 3;
        }
        if (webFeatures.includes('chat')) {
          minPrice += 10000; maxPrice += 15000; days += 1;
        }
        if (webFeatures.includes('seo')) {
          minPrice += 15000; maxPrice += 20000; days += 1;
        }
        break;

      case 2: // Mobile App
        const mobPlatform = configSelections.mobPlatform || 'android';
        if (mobPlatform === 'android') {
          minPrice = 90000; maxPrice = 150000; days = 20;
        } else if (mobPlatform === 'ios') {
          minPrice = 110000; maxPrice = 180000; days = 25;
        } else {
          minPrice = 160000; maxPrice = 280000; days = 30;
        }

        const mobFeatures = configSelections.mobFeatures || [];
        if (mobFeatures.includes('auth')) {
          minPrice += 15000; maxPrice += 25000; days += 3;
        }
        if (mobFeatures.includes('push')) {
          minPrice += 12000; maxPrice += 18000; days += 2;
        }
        if (mobFeatures.includes('gps')) {
          minPrice += 18000; maxPrice += 25000; days += 3;
        }
        if (mobFeatures.includes('payments')) {
          minPrice += 20000; maxPrice += 30000; days += 3;
        }
        break;

      case 3: // SEO
        const seoScale = configSelections.seoScale || 'audit';
        if (seoScale === 'audit') {
          minPrice = 15000; maxPrice = 25000; days = 6;
        } else if (seoScale === 'onpage') {
          minPrice = 30000; maxPrice = 50000; days = 12;
        } else {
          minPrice = 60000; maxPrice = 100000; days = 30;
        }
        break;

      case 4: // Graphic Design
        const designType = configSelections.designType || 'logo';
        if (designType === 'logo') {
          minPrice = 10000; maxPrice = 20000; days = 4;
        } else if (designType === 'social') {
          minPrice = 12000; maxPrice = 22000; days = 5;
        } else if (designType === 'print') {
          minPrice = 8000; maxPrice = 15000; days = 3;
        } else {
          minPrice = 25000; maxPrice = 45000; days = 8;
        }
        break;

      case 5: // Video Production
        const videoType = configSelections.videoType || 'reels';
        if (videoType === 'reels') {
          minPrice = 15000; maxPrice = 25000; days = 3;
        } else if (videoType === 'cinematic') {
          minPrice = 35000; maxPrice = 60000; days = 6;
        } else {
          minPrice = 45000; maxPrice = 80000; days = 9;
        }

        const length = configSelections.length || 'short';
        if (length === 'medium') {
          minPrice += 10000; maxPrice += 15000; days += 2;
        } else if (length === 'long') {
          minPrice += 25000; maxPrice += 35000; days += 4;
        }
        break;

      case 6: // Photography & Event
        const shootType = configSelections.shootType || 'portrait';
        if (shootType === 'portrait') {
          minPrice = 12000; maxPrice = 20000; days = 2;
        } else if (shootType === 'batch') {
          minPrice = 20000; maxPrice = 35000; days = 3;
        } else {
          minPrice = 40000; maxPrice = 75000; days = 4;
        }

        const duration = configSelections.duration || '2h';
        if (duration === '4h') {
          minPrice += 10000; maxPrice += 15000; days += 0;
        } else if (duration === '8h') {
          minPrice += 25000; maxPrice += 35000; days += 1;
        }

        const photoFeatures = configSelections.photoFeatures || [];
        if (photoFeatures.includes('album')) {
          minPrice += 15000; maxPrice += 20000; days += 3;
        }
        if (photoFeatures.includes('canvas')) {
          minPrice += 8000; maxPrice += 12000; days += 2;
        }
        break;

      default:
        minPrice = 10000; maxPrice = 20000; days = 5;
    }

    return { minPrice, maxPrice, days };
  };

  const getEstimatedDateString = (days: number) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    return targetDate.toISOString().split('T')[0];
  };

  const buildBriefString = (clientNotes: string) => {
    const summary = [];
    if (selectedService?.id === 1) {
      const platNames = { landing: 'Landing Page', ecommerce: 'E-commerce Site', custom: 'Custom Web App' };
      summary.push(`Platform: ${platNames[configSelections.platform as keyof typeof platNames] || 'Landing Page'}`);
      summary.push(`Pages: ${configSelections.pages || '1-3'}`);
      if (configSelections.webFeatures && configSelections.webFeatures.length > 0) {
        summary.push(`Features: ${configSelections.webFeatures.join(', ')}`);
      }
    } else if (selectedService?.id === 2) {
      const platNames = { android: 'Android App', ios: 'iOS App', both: 'Cross-platform (Both)' };
      summary.push(`Platform: ${platNames[configSelections.mobPlatform as keyof typeof platNames] || 'Android'}`);
      if (configSelections.mobFeatures && configSelections.mobFeatures.length > 0) {
        summary.push(`Features: ${configSelections.mobFeatures.join(', ')}`);
      }
    } else if (selectedService?.id === 3) {
      const scales = { audit: 'Local Audit', onpage: 'On-page Optimization', full: 'Full Campaign' };
      summary.push(`SEO Scope: ${scales[configSelections.seoScale as keyof typeof scales] || 'Audit'}`);
    } else if (selectedService?.id === 4) {
      const types = { logo: 'Logo / Visual Identity', social: 'Social Branding Kit', print: 'Print Designs', complete: 'Complete Branding' };
      summary.push(`Type: ${types[configSelections.designType as keyof typeof types] || 'Logo'}`);
    } else if (selectedService?.id === 5) {
      const types = { reels: 'Social Reels', cinematic: 'Cinematic Film', promo: 'Promo Video' };
      summary.push(`Type: ${types[configSelections.videoType as keyof typeof types] || 'Social Reels'}`);
      const lengths = { short: '< 1 min', medium: '1-3 mins', long: '5+ mins' };
      summary.push(`Duration: ${lengths[configSelections.length as keyof typeof lengths] || 'Under 1 minute'}`);
    } else if (selectedService?.id === 6) {
      const types = { portrait: 'Portrait Shoot', batch: 'Batch Photoshoot', event: 'Campus Event Coverage' };
      summary.push(`Type: ${types[configSelections.shootType as keyof typeof types] || 'Portrait'}`);
      summary.push(`Hours: ${configSelections.duration || '2 Hours'}`);
      if (configSelections.photoFeatures && configSelections.photoFeatures.length > 0) {
        summary.push(`Deliverables: ${configSelections.photoFeatures.join(', ')}`);
      }
    }
    return `[Config: ${summary.join(' | ')}] \n\nClient Notes: ${clientNotes}`;
  };

  // Form submission handler: checks auth, caches request if guest, otherwise submits to backend
  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const token = localStorage.getItem('userToken');
    const formData = new FormData(e.target as HTMLFormElement);
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const brief = formData.get('brief') as string;
    
    const est = calculateEstimate();
    const estBudget = `LKR ${est.minPrice.toLocaleString()} - ${est.maxPrice.toLocaleString()}`;
    const budgetInput = formData.get('budget') as string;
    const budget = budgetInput || estBudget;

    const deadlineInput = formData.get('deadline') as string;
    const estDeadline = getEstimatedDateString(est.days);
    const deadline = deadlineInput || estDeadline;

    const finalBrief = buildBriefString(brief);

    if (!token) {
      // User is not logged in — cache inputs and show AuthCard
      const pendingData = {
        serviceTitle: selectedService.title,
        serviceId: selectedService.id,
        phone,
        email,
        brief: finalBrief,
        deadline,
        budget
      };
      localStorage.setItem('pending_service_request', JSON.stringify(pendingData));
      setShowAuthGate(true);
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit request to backend with auth token
      await api.submitServiceRequest({
        serviceName: selectedService.title,
        clientPhone: phone,
        clientEmail: email || undefined,
        brief: finalBrief,
        deadline: deadline || undefined,
        budget: budget || undefined
      }, token);

      // Secondary WhatsApp notification redirect
      const message = `*Project Request: ${selectedService.title}*%0A%0A` +
        `*WhatsApp:* ${phone}%0A` +
        (email ? `*Email:* ${email}%0A` : '') +
        `*Brief:* ${finalBrief}%0A` +
        `*Deadline:* ${deadline}%0A` +
        `*Budget:* ${budget}`;

      window.open(`https://wa.me/94724478148?text=${encodeURIComponent(message)}`, '_blank');

      setIsSubmitting(false);
      setSelectedService(null);
      setShowToast(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to submit service request. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Auth callback: automatically submits cached request once user authenticates
  const handleAuthSuccess = async () => {
    setShowAuthGate(false);
    const token = localStorage.getItem('userToken');
    const pendingRequestStr = localStorage.getItem('pending_service_request');

    if (!token || !pendingRequestStr) return;

    setIsSubmitting(true);
    try {
      const pendingData = JSON.parse(pendingRequestStr);
      
      await api.submitServiceRequest({
        serviceName: pendingData.serviceTitle,
        clientPhone: pendingData.phone,
        clientEmail: pendingData.email || undefined,
        brief: pendingData.brief,
        deadline: pendingData.deadline || undefined,
        budget: pendingData.budget || undefined
      }, token);

      const message = `*Project Request: ${pendingData.serviceTitle}*%0A%0A` +
        `*WhatsApp:* ${pendingData.phone}%0A` +
        (pendingData.email ? `*Email:* ${pendingData.email}%0A` : '') +
        `*Brief:* ${pendingData.brief}%0A` +
        `*Deadline:* ${pendingData.deadline}%0A` +
        `*Budget:* ${pendingData.budget}`;

      window.open(`https://wa.me/94724478148?text=${encodeURIComponent(message)}`, '_blank');

      localStorage.removeItem('pending_service_request');
      setSelectedService(null);
      setShowToast(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to submit cached request after authenticating.');
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xl"
            />

            {/* Modal Container - Handles scrolling on small screens */}
            <div className="fixed inset-0 z-[101] overflow-y-auto pointer-events-none">
              <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
                {/* Modal Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="w-full max-w-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.4)] border border-white/40 dark:border-white/10 pointer-events-auto relative overflow-hidden"
                >
                  {/* Background Decorative Blobs - More Organic Motion */}
                  <motion.div
                    animate={{
                      x: [0, 50, -20, 40, 0],
                      y: [0, -60, 40, -30, 0],
                      scale: [1, 1.25, 0.95, 1.1, 1],
                      rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full pointer-events-none"
                  />
                  <motion.div
                    animate={{
                      x: [0, -60, 30, -40, 0],
                      y: [0, 40, -50, 20, 0],
                      scale: [1, 1.15, 0.85, 1.2, 1],
                      rotate: [360, 270, 180, 90, 0],
                    }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 2
                    }}
                    className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"
                  />

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white hover:rotate-90 transition-all duration-500 z-10"
                    aria-label="Close modal"
                  >
                    <LuX size={18} />
                  </button>

                  {/* Staggered Content Animation */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.12,
                          delayChildren: 0.2
                        }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {showAuthGate ? (
                      <div className="pt-4">
                        <div className="text-center mb-8">
                          <h4 className="text-2xl font-black tracking-tight dark:text-white uppercase">Authentication Required</h4>
                          <div className="h-1.5 w-16 bg-primary rounded-full mt-3 mb-3 mx-auto" />
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                            Sign in to automatically finalize your request
                          </p>
                        </div>
                        <AuthCard onAuthSuccess={handleAuthSuccess} />
                      </div>
                    ) : (
                      <>
                        {/* Header Section */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          className="relative flex flex-col items-center text-center mb-8 sm:mb-12"
                        >
                          <motion.div
                            initial={{ rotate: -15, scale: 0.5, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 15, delay: 0.2 }}
                            className={`p-5 sm:p-6 rounded-[2rem] bg-gradient-to-tr ${selectedService.gradient} text-primary text-3xl sm:text-5xl mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)] ring-1 ring-white/20`}
                          >
                            {selectedService.icon}
                          </motion.div>
                          <h4 className="text-2xl sm:text-4xl font-black tracking-tight dark:text-white uppercase">
                            {selectedService.title}
                          </h4>
                          <div className="h-1.5 w-16 bg-primary rounded-full mt-4 mb-3" />
                          <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-sm leading-relaxed">
                            Ready to launch your vision? Let's get started.
                          </p>
                        </motion.div>
                        <form onSubmit={handleWhatsAppSubmit} className="space-y-5 sm:space-y-6 relative">
                          <AnimatePresence mode="wait">
                            {step === 1 ? (
                              <motion.div
                                key="configurator-step"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                              >
                                {/* SERVICE SPECIFIC CONFIGURATORS */}
                                {selectedService.id === 1 && (
                                  <div className="space-y-4 text-left">
                                    {/* Web platform selection */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Platform Type</label>
                                      <div className="grid grid-cols-3 gap-2">
                                        {[
                                          { id: 'landing', label: 'Landing Page' },
                                          { id: 'ecommerce', label: 'E-commerce' },
                                          { id: 'custom', label: 'Custom App' }
                                        ].map((p) => (
                                          <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setConfigSelections({ ...configSelections, platform: p.id })}
                                            className={`py-3 px-2 rounded-xl text-xs font-black uppercase tracking-tight border transition-all ${
                                              (configSelections.platform || 'landing') === p.id
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            {p.label}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Web pages count */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Pages Count</label>
                                      <div className="grid grid-cols-3 gap-2">
                                        {['1-3', '4-10', '10+'].map((p) => (
                                          <button
                                            key={p}
                                            type="button"
                                            onClick={() => setConfigSelections({ ...configSelections, pages: p })}
                                            className={`py-3 px-2 rounded-xl text-xs font-black uppercase tracking-tight border transition-all ${
                                              (configSelections.pages || '1-3') === p
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            {p}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Web features checklist */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Integrations Checklist</label>
                                      <div className="grid grid-cols-2 gap-2">
                                        {[
                                          { id: 'payment', label: 'Payments' },
                                          { id: 'cms', label: 'CMS (Admin)' },
                                          { id: 'chat', label: 'Live Chat' },
                                          { id: 'seo', label: 'SEO Audit' }
                                        ].map((f) => {
                                          const current = configSelections.webFeatures || [];
                                          const has = current.includes(f.id);
                                          return (
                                            <button
                                              key={f.id}
                                              type="button"
                                              onClick={() => {
                                                const next = has ? current.filter((x: string) => x !== f.id) : [...current, f.id];
                                                setConfigSelections({ ...configSelections, webFeatures: next });
                                              }}
                                              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-tight border transition-all flex items-center justify-between ${
                                                has
                                                  ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                  : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                              }`}
                                            >
                                              <span>{f.label}</span>
                                              {has && <LuCheck size={14} />}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {selectedService.id === 2 && (
                                  <div className="space-y-4 text-left">
                                    {/* Mobile Platform */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Target Platforms</label>
                                      <div className="grid grid-cols-3 gap-2">
                                        {[
                                          { id: 'android', label: 'Android' },
                                          { id: 'ios', label: 'iOS App' },
                                          { id: 'both', label: 'Both' }
                                        ].map((p) => (
                                          <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setConfigSelections({ ...configSelections, mobPlatform: p.id })}
                                            className={`py-3 px-2 rounded-xl text-xs font-black uppercase tracking-tight border transition-all ${
                                              (configSelections.mobPlatform || 'android') === p.id
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            {p.label}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Mobile features */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">App Integrations</label>
                                      <div className="grid grid-cols-2 gap-2">
                                        {[
                                          { id: 'auth', label: 'Profiles & Auth' },
                                          { id: 'push', label: 'Push Alert' },
                                          { id: 'gps', label: 'GPS / Maps' },
                                          { id: 'payments', label: 'In-app Pay' }
                                        ].map((f) => {
                                          const current = configSelections.mobFeatures || [];
                                          const has = current.includes(f.id);
                                          return (
                                            <button
                                              key={f.id}
                                              type="button"
                                              onClick={() => {
                                                const next = has ? current.filter((x: string) => x !== f.id) : [...current, f.id];
                                                setConfigSelections({ ...configSelections, mobFeatures: next });
                                              }}
                                              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-tight border transition-all flex items-center justify-between ${
                                                has
                                                  ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                  : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                              }`}
                                            >
                                              <span>{f.label}</span>
                                              {has && <LuCheck size={14} />}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {selectedService.id === 3 && (
                                  <div className="space-y-4 text-left">
                                    {/* SEO scale */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">SEO Campaign Scope</label>
                                      <div className="flex flex-col gap-2">
                                        {[
                                          { id: 'audit', label: 'Local SEO Audit & Setup', desc: 'Perfect for small local entities.' },
                                          { id: 'onpage', label: 'On-page & Technical SEO', desc: 'Optimize structural ranks & speeds.' },
                                          { id: 'full', label: 'Full SEO Campaign', desc: 'Monthly backlinks, speedups & blogging.' }
                                        ].map((s) => (
                                          <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => setConfigSelections({ ...configSelections, seoScale: s.id })}
                                            className={`p-4 rounded-xl text-left border transition-all flex flex-col ${
                                              (configSelections.seoScale || 'audit') === s.id
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            <span className="text-xs font-black uppercase tracking-tight">{s.label}</span>
                                            <span className="text-[10px] opacity-75 mt-1 font-medium">{s.desc}</span>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {selectedService.id === 4 && (
                                  <div className="space-y-4 text-left">
                                    {/* Design options */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Design Deliverables</label>
                                      <div className="flex flex-col gap-2">
                                        {[
                                          { id: 'logo', label: 'Logo & Visual Identity Kit' },
                                          { id: 'social', label: 'Social Media Branding Package' },
                                          { id: 'print', label: 'Print Design & Layouts' },
                                          { id: 'complete', label: 'Complete Brand Overhaul (All in One)' }
                                        ].map((d) => (
                                          <button
                                            key={d.id}
                                            type="button"
                                            onClick={() => setConfigSelections({ ...configSelections, designType: d.id })}
                                            className={`p-3 rounded-xl text-left border text-xs font-black uppercase tracking-tight transition-all ${
                                              (configSelections.designType || 'logo') === d.id
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            {d.label}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {selectedService.id === 5 && (
                                  <div className="space-y-4 text-left">
                                    {/* Video format */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Production Format</label>
                                      <div className="grid grid-cols-3 gap-2">
                                        {[
                                          { id: 'reels', label: 'Social Reels' },
                                          { id: 'cinematic', label: 'Cinematic' },
                                          { id: 'promo', label: 'Promo/Ads' }
                                        ].map((v) => (
                                          <button
                                            key={v.id}
                                            type="button"
                                            onClick={() => setConfigSelections({ ...configSelections, videoType: v.id })}
                                            className={`py-3 px-1 rounded-xl text-[10px] font-black uppercase tracking-tight border transition-all text-center ${
                                              (configSelections.videoType || 'reels') === v.id
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            {v.label}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Video length */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Final Video Duration</label>
                                      <div className="grid grid-cols-3 gap-2">
                                        {[
                                          { id: 'short', label: 'Under 1 min' },
                                          { id: 'medium', label: '1 - 3 mins' },
                                          { id: 'long', label: '5+ mins' }
                                        ].map((l) => (
                                          <button
                                            key={l.id}
                                            type="button"
                                            onClick={() => setConfigSelections({ ...configSelections, length: l.id })}
                                            className={`py-3 px-1 rounded-xl text-[10px] font-black uppercase tracking-tight border transition-all text-center ${
                                              (configSelections.length || 'short') === l.id
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            {l.label}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {selectedService.id === 6 && (
                                  <div className="space-y-4 text-left">
                                    {/* Photography type */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Coverage Scope</label>
                                      <div className="grid grid-cols-3 gap-2">
                                        {[
                                          { id: 'portrait', label: 'Portrait' },
                                          { id: 'batch', label: 'Batch Shoot' },
                                          { id: 'event', label: 'Campus Event' }
                                        ].map((s) => (
                                          <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => setConfigSelections({ ...configSelections, shootType: s.id })}
                                            className={`py-3 px-1 rounded-xl text-[10px] font-black uppercase tracking-tight border transition-all text-center ${
                                              (configSelections.shootType || 'portrait') === s.id
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            {s.label}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Coverage Duration */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Hours of Coverage</label>
                                      <div className="grid grid-cols-3 gap-2">
                                        {['2h', '4h', '8h'].map((d) => (
                                          <button
                                            key={d}
                                            type="button"
                                            onClick={() => setConfigSelections({ ...configSelections, duration: d })}
                                            className={`py-3 px-2 rounded-xl text-xs font-black uppercase tracking-tight border transition-all text-center ${
                                              (configSelections.duration || '2h') === d
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            {d === '2h' ? '2 Hours' : d === '4h' ? '4 Hours' : 'Full Day'}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Photography deliverables */}
                                    <div>
                                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block ml-1">Deliverables</label>
                                      <div className="grid grid-cols-2 gap-2">
                                        {[
                                          { id: 'album', label: 'Printed Album' },
                                          { id: 'canvas', label: 'Framed Canvas' }
                                        ].map((f) => {
                                          const current = configSelections.photoFeatures || [];
                                          const has = current.includes(f.id);
                                          return (
                                            <button
                                              key={f.id}
                                              type="button"
                                              onClick={() => {
                                                const next = has ? current.filter((x: string) => x !== f.id) : [...current, f.id];
                                                setConfigSelections({ ...configSelections, photoFeatures: next });
                                              }}
                                              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-tight border transition-all flex items-center justify-between ${
                                                has
                                                  ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                  : 'bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                              }`}
                                            >
                                              <span>{f.label}</span>
                                              {has && <LuCheck size={14} />}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* ESTIMATOR PANEL */}
                                <div className="p-5 rounded-2xl bg-blue-500/5 dark:bg-slate-950/40 border border-blue-500/10 dark:border-slate-800/60 flex flex-col justify-between items-center sm:flex-row gap-4 mt-8">
                                  <div className="flex items-center gap-3 text-left">
                                    <div className="p-3 bg-blue-500/10 text-primary rounded-xl">
                                      <LuDollarSign className="size-6" />
                                    </div>
                                    <div>
                                      <p className="text-[9px] font-black tracking-widest text-slate-400 dark:text-slate-450 uppercase">Budget Estimate</p>
                                      <p className="text-base font-black text-slate-900 dark:text-white mt-1">
                                        LKR {calculateEstimate().minPrice.toLocaleString()} - {calculateEstimate().maxPrice.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 text-left">
                                    <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
                                      <LuClock className="size-6" />
                                    </div>
                                    <div>
                                      <p className="text-[9px] font-black tracking-widest text-slate-400 dark:text-slate-455 uppercase">Estimated Delivery</p>
                                      <p className="text-base font-black text-slate-900 dark:text-white mt-1">
                                        ~ {calculateEstimate().days} Days
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Continue Button */}
                                <div className="pt-2">
                                  <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="w-full py-4 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                                  >
                                    Continue to Details <LuArrowRight size={16} />
                                  </button>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="details-step"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-5 text-left"
                              >
                                {/* Step Back Button */}
                                <button
                                  type="button"
                                  onClick={() => setStep(1)}
                                  className="text-xs font-black uppercase text-primary hover:text-blue-700 flex items-center gap-1.5 mb-4 select-none outline-none"
                                >
                                  <LuArrowLeft size={14} /> Back to Configuration
                                </button>

                                <div className="space-y-2">
                                  <label className="text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-[0.3em] ml-1">
                                    Contact Connection (WhatsApp)
                                  </label>
                                  <motion.input
                                    whileFocus={{
                                      scale: 1.02,
                                      boxShadow: "0 0 25px rgba(0, 63, 221, 0.15)",
                                      borderColor: "#003fdd"
                                    }}
                                    name="phone"
                                    required
                                    type="text"
                                    placeholder="WhatsApp Number"
                                    className="w-full px-5 py-4 sm:p-5 rounded-2xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all duration-300 placeholder:text-slate-400 backdrop-blur-sm"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-[0.3em] ml-1">
                                    Email Connection (Optional)
                                  </label>
                                  <motion.input
                                    whileFocus={{
                                      scale: 1.02,
                                      boxShadow: "0 0 25px rgba(0, 63, 221, 0.15)",
                                      borderColor: "#003fdd"
                                    }}
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-5 py-4 sm:p-5 rounded-2xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all duration-300 placeholder:text-slate-400 backdrop-blur-sm"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-[0.3em] ml-1">
                                    Brief & Additional Requirements
                                  </label>
                                  <motion.textarea
                                    whileFocus={{
                                      scale: 1.02,
                                      boxShadow: "0 0 25px rgba(0, 63, 221, 0.15)",
                                      borderColor: "#003fdd"
                                    }}
                                    name="brief"
                                    required
                                    placeholder={`Mention any additional requirements or notes for ${selectedService.title}...`}
                                    rows={3}
                                    className="w-full px-5 py-4 sm:p-6 rounded-2xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all duration-300 resize-none placeholder:text-slate-400 backdrop-blur-sm"
                                  />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                  <div className="space-y-2">
                                    <label className="text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-[0.3em] ml-1">
                                      Launch Date
                                    </label>
                                    <motion.input
                                      whileFocus={{ scale: 1.01 }}
                                      name="deadline"
                                      type="date"
                                      defaultValue={getEstimatedDateString(calculateEstimate().days)}
                                      className="w-full px-5 py-4 sm:p-5 rounded-2xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all text-sm dark:text-slate-300 backdrop-blur-sm"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-[0.3em] ml-1">
                                      Budget (LKR)
                                    </label>
                                    <motion.input
                                      whileFocus={{ scale: 1.01 }}
                                      name="budget"
                                      placeholder={`LKR ${calculateEstimate().minPrice.toLocaleString()} - ${calculateEstimate().maxPrice.toLocaleString()}`}
                                      className="w-full px-5 py-4 sm:p-5 rounded-2xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all text-sm placeholder:text-slate-400 backdrop-blur-sm"
                                    />
                                  </div>
                                </div>

                                {/* Submit Button with Advanced Hover */}
                                <div className="pt-4">
                                  <motion.button
                                    whileHover={{
                                      scale: 1.02,
                                      y: -4,
                                      boxShadow: "0 25px 50px -12px rgba(0, 63, 221, 0.5)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative w-full py-5 bg-gradient-to-r from-primary via-blue-600 to-primary bg-[length:200%_auto] hover:bg-right transition-all duration-700 text-white font-black rounded-2xl flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-xs sm:text-sm overflow-hidden"
                                  >
                                    <motion.div
                                      animate={{
                                        x: ["-100%", "200%"],
                                      }}
                                      transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        repeatDelay: 1
                                      }}
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                                    />
                                    <LuSend size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                                    <span className="relative z-10">
                                      {isSubmitting ? 'Transmitting...' : 'Initialize Project'}
                                    </span>
                                  </motion.button>
                                </div>

                                <p className="text-center text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.4em] pt-4 font-bold opacity-70">
                                  Secure Transmission Active
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </form>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* 5. Progress Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-[200] w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden p-4 flex items-start gap-4"
          >
            {/* Icon */}
            <div className="bg-emerald-500/20 text-emerald-500 rounded-full p-2 mt-0.5">
              <LuCircleCheck size={20} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="text-slate-900 dark:text-white font-bold text-sm">Transmission Successful!</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                Project DNA secured. We will contact you via WhatsApp shortly.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <LuX size={16} />
            </button>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-500"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
