import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LuShieldCheck, LuCookie, LuDatabase, LuUserCheck,
    LuLock, LuGlobe, LuMail, LuFileText, LuClock
} from 'react-icons/lu';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';

const PrivacyPolicy = () => {
    const [loading, setLoading] = useState(true);
    const lastUpdated = "April 2026";

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const sections = [
        {
            id: "introduction",
            icon: LuShieldCheck,
            title: "Introduction",
            content: (
                <p>
                    Welcome to <strong>The Uni Gang</strong>. We are committed to protecting your personal information and your right to privacy.
                    This Privacy Policy describes how we collect, use, and protect the personal information provided by users on our platforms,
                    websites, and related services. By accessing or using our services, you signify that you have read, understood, and agree
                    to our collection, storage, use, and disclosure of your personal information as described in this policy.
                </p>
            )
        },
        {
            id: "information-collection",
            icon: LuDatabase,
            title: "Information Collection",
            content: (
                <div className="space-y-4">
                    <p>We collect information in two primary ways:</p>
                    <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-2">
                            <LuGlobe className="text-blue-500" /> Automatic Information
                        </h4>
                        <p className="text-sm">
                            When you visit, use, or navigate our platform, we automatically collect certain information. This does not reveal
                            your specific identity (like your name or contact info) but may include device and usage information, such as your
                            IP address, browser and device characteristics, operating system, language preferences, and usage statistics.
                        </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-2">
                            <LuUserCheck className="text-blue-500" /> Voluntary Information
                        </h4>
                        <p className="text-sm">
                            We collect personal information that you voluntarily provide to us when you register on the specified platform, express
                            an interest in obtaining information about us or our products, or when you interact with our features. This includes your
                            <strong> Name, Email Address, University/Faculty details</strong>, and interaction data (such as when you click
                            "Interested" on an event).
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: "use-of-information",
            icon: LuFileText,
            title: "Use of Information",
            content: (
                <div className="space-y-3">
                    <p>
                        We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance
                        with our legal obligations, and/or your consent. Specifically, we use your data to:
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-2 opacity-90">
                        <li>Personalize your university and event engagement experience.</li>
                        <li>Manage your user account and verify your identity.</li>
                        <li>Send you important event updates, notifications, and administrative information.</li>
                        <li>Deliver targeted advertising and show relevant campus services/annexes based on your preferences.</li>
                    </ul>
                </div>
            )
        },
        {
            id: "data-retention",
            icon: LuClock,
            title: "Data Retention & Deletion",
            content: (
                <div className="space-y-3">
                    <p>We are transparent about how long we hold onto your data in compliance with the Personal Data Protection Act (PDPA) regulations:</p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="flex-1 p-5 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/50">
                            <span className="text-amber-600 dark:text-amber-400 font-black tracking-widest text-[10px] uppercase block mb-1">1 Month Inactivity</span>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200">Account Archival</h4>
                            <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">If your account remains completely inactive for a duration of one month, we will temporarily archive your profile to conserve resources.</p>
                        </div>
                        <div className="flex-1 p-5 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-700/50">
                            <span className="text-red-600 dark:text-red-400 font-black tracking-widest text-[10px] uppercase block mb-1">12 Months Inactivity</span>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200">Permanent Deletion</h4>
                            <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">Under PDPA compliance, accounts and all associated data showing no activity for a consecutive 12-month period will be permanently and securely deleted from our systems.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "user-rights",
            icon: LuUserCheck,
            title: "Your Privacy Rights",
            content: (
                <p>
                    In some regions, you have certain rights under applicable data protection laws. These may include the right to
                    <strong> access and obtain a copy</strong> of your personal information, the right to request <strong>rectification or erasure</strong>,
                    and to restrict the processing of your data. If you wish to exercise any of these rights, please reach out to us using the contact
                    information provided at the bottom of this page.
                </p>
            )
        },
        {
            id: "third-party",
            icon: LuGlobe,
            title: "Third-Party Services",
            content: (
                <p>
                    We may share your information with third-party vendors, service providers, or contractors who perform services for us or on our behalf.
                    This includes payment processors (for secure ticketing or transactions) and analytics/advertising partners. Please note that these third
                    parties have their own privacy policies, and their handling of your data is governed by those specific agreements when you interact with their plugins or links on our platform.
                </p>
            )
        },
        {
            id: "security",
            icon: LuLock,
            title: "Data Security",
            content: (
                <p>
                    We have implemented appropriate and industry-standard administrative and technical security measures (including data encryption in transit
                    and at rest) designed to protect the security of any personal information we process. However, despite our safeguards, no internet transmission
                    is 100% secure. You should only access our services within a secure environment and acknowledge that sharing data online inherently holds some risk.
                </p>
            )
        },
        {
            id: "cookies",
            icon: LuCookie,
            title: "Cookies and Tracking",
            content: (
                <p>
                    Our platform uses cookies and similar tracking technologies to access and store information. These cookies are essential to provide you with seamless
                    functionality, such as securely keeping you logged in, saving your preferences (e.g., remembering which events you are "Interested" in), and ensuring
                    our site responds quickly. You can set your browser to refuse all or some browser cookies, but this may affect your user experience.
                </p>
            )
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring" as const, stiffness: 100, damping: 20 }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
            <PremiumPageLoader isLoading={loading} message="Securing your data..." />
            
            <AnimatePresence>
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Ambient Animated Backgrounds */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/3 translate-x-1/3"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                rotate: [0, -90, 0],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/3"
                        />

                        <div className="max-w-4xl mx-auto relative z-10 pt-10 pb-20">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-center mb-16 space-y-6"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 dark:bg-slate-900/40 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-widest border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-xl shadow-lg"
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <LuShieldCheck size={18} />
                                    </motion.div>
                                    The Uni Gang Legal
                                </motion.div>

                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                                    Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Policy</span>
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-slate-500 dark:text-slate-400 font-medium"
                                >
                                    Last Updated: <span className="font-bold text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">{lastUpdated}</span>
                                </motion.p>
                            </motion.div>

                            {/* Content Cards */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                className="space-y-8 relative"
                            >
                                {/* Connecting UI Line */}
                                <div className="absolute left-[39px] sm:left-[51px] top-10 bottom-10 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-indigo-500/0 hidden md:block"></div>

                                {sections.map((section) => (
                                    <motion.div
                                        key={section.id}
                                        variants={cardVariants}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2rem] p-6 md:p-10 transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_20px_40px_rgb(59,130,246,0.1)]"
                                    >
                                        {/* Card Inner Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent rounded-[2rem] pointer-events-none" />

                                        <div className="flex items-start gap-5 md:gap-8 relative z-10">
                                            <motion.div
                                                whileHover={{ rotate: 10, scale: 1.1 }}
                                                className="hidden sm:flex mt-1 w-14 h-14 justify-center items-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 flex-shrink-0 shadow-inner group-hover:text-indigo-600 transition-colors"
                                            >
                                                <section.icon size={26} />
                                            </motion.div>

                                            <div className="space-y-4 w-full">
                                                <div className="flex items-center gap-4">
                                                    <div className="sm:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-inner">
                                                        <section.icon size={20} />
                                                    </div>
                                                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {section.title}
                                                    </h3>
                                                </div>
                                                <div className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                    {section.content}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Call to Action - Contact */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                                className="mt-20 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-10 md:p-14 text-center text-white shadow-[0_20px_50px_rgba(59,130,246,0.3)] relative overflow-hidden group"
                            >
                                {/* Animated Overlay Shapes */}
                                <motion.div
                                    animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"
                                />
                                <motion.div
                                    animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"
                                />

                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10"></div>

                                <div className="relative z-10 space-y-8 flex flex-col items-center">
                                    <motion.div
                                        whileHover={{ rotate: 180, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl"
                                    >
                                        <LuMail size={36} />
                                    </motion.div>

                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Still have questions?</h2>
                                        <p className="text-blue-100 font-medium max-w-lg mx-auto text-lg leading-relaxed">
                                            Our dedicated data privacy and support team is available around the clock to assist you.
                                        </p>
                                    </div>

                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        href="mailto:support@theunigang.com"
                                        className="inline-flex items-center gap-3 bg-white text-blue-700 hover:text-indigo-800 px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm transition-all shadow-xl"
                                    >
                                        Contact Support <LuMail size={18} />
                                    </motion.a>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PrivacyPolicy;
