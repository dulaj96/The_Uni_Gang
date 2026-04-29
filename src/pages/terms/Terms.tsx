import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LuScale,
    LuLayers,
    LuUserCog,
    LuMessageSquareWarning,
    LuClock,
    LuBan,
    LuShieldAlert,
    LuMail
} from 'react-icons/lu';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';

const Terms = () => {
    const [loading, setLoading] = useState(true);
    const lastUpdated = "April 2026";

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const sections = [
        {
            id: "platform-role",
            icon: LuLayers,
            title: "1. Platform Role & Limitations",
            content: (
                <div className="space-y-3">
                    <p>
                        "The Uni Gang" operates exclusively as a digital platform and aggregator designed to connect university students
                        with relevant campus information, events, and local accommodations.
                    </p>
                    <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                            We act solely as a facilitator. We do <strong>not</strong> own, manage, endorse, or guarantee the quality, safety,
                            or legality of any external services, events, or rental properties listed on our platform.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: "user-content",
            icon: LuUserCog,
            title: "2. User Content Responsibility",
            content: (
                <p>
                    As a community-driven platform, users are permitted to post event details, upload annex photos, and share
                    academic information. By submitting content to "The Uni Gang", you agree that you are <strong>100% responsible
                        for the accuracy, legality, and licensing</strong> of the content you upload. We reserve the right to remove
                    any content that violates our standards or is flagged as fraudulent, offensive, or inaccurate without prior notice.
                </p>
            )
        },
        {
            id: "third-party",
            icon: LuMessageSquareWarning,
            title: "3. Third-Party Interactions",
            content: (
                <div className="space-y-3">
                    <p>
                        Our platform facilitates direct connections between students and third parties, such as event organizers
                        and independent landlords, often via direct WhatsApp links or external websites.
                    </p>
                    <p className="font-semibold text-amber-700 dark:text-amber-500">
                        All offline or third-party interactions, financial transactions, and agreements made outside of "The Uni Gang"
                        are strictly at your own risk. We strongly advise users to exercise caution and verify the identity of parties
                        before making payments or sharing sensitive information.
                    </p>
                </div>
            )
        },
        {
            id: "inactivity-policy",
            icon: LuClock,
            title: "4. Account Inactivity & Data Retention",
            content: (
                <p>
                    To ensure optimal system performance and respect data privacy, we enforce a strict account data retention policy based on activity:
                    <ul className="list-disc pl-5 mt-4 space-y-3 text-slate-700 dark:text-slate-300">
                        <li>
                            <strong className="text-amber-600 dark:text-amber-400">1 Month Inactivity:</strong> Accounts showing zero activity for a continuous 30-day period will be temporarily archived to conserve database infrastructure.
                        </li>
                        <li>
                            <strong className="text-red-500 dark:text-red-400">12 Months Inactivity:</strong> Accounts and all associated personal data dormant for a consecutive 12-month period will be permanently and irreversibly deleted from our servers.
                        </li>
                    </ul>
                </p>
            )
        },
        {
            id: "prohibited-use",
            icon: LuBan,
            title: "5. Prohibited Activities",
            content: (
                <p>
                    While using our platform, you agree not to engage in any of the following prohibited behaviors:
                    <ul className="list-disc pl-5 mt-3 space-y-2 opacity-90">
                        <li>Spamming community feeds or mass-messaging users.</li>
                        <li>Using automated scraping tools to extract accommodation or user data.</li>
                        <li>Providing fake, misleading, or deceptive university and faculty affiliations.</li>
                        <li>Attempting to bypass security protocols or reverse-engineer the platform.</li>
                    </ul>
                    Violating these rules may result in immediate and permanent suspension from the service.
                </p>
            )
        },
        {
            id: "liability",
            icon: LuShieldAlert,
            title: "6. Limitation of Liability",
            content: (
                <p>
                    To the maximum extent permitted by applicable law, "The Uni Gang", its creators, and affiliates shall not be
                    held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability
                    to use the platform. This includes, but is not limited to, legal issues arising from canceled university events,
                    misrepresented accommodations, or disputes strictly between students and landlords.
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
            <PremiumPageLoader isLoading={loading} message="Reviewing terms..." />
            
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
                            className="fixed top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/3 translate-x-1/3"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                rotate: [0, -90, 0],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/3"
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
                                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 dark:bg-slate-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-black uppercase tracking-widest border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-xl shadow-lg"
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <LuScale size={18} />
                                    </motion.div>
                                    The Uni Gang Legal
                                </motion.div>

                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                                    Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Service</span>
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
                                <div className="absolute left-[39px] sm:left-[51px] top-10 bottom-10 w-px bg-gradient-to-b from-indigo-500/0 via-indigo-500/30 to-purple-500/0 hidden md:block"></div>

                                {sections.map((section) => (
                                    <motion.div
                                        key={section.id}
                                        variants={cardVariants}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2rem] p-6 md:p-10 transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_40px_rgb(79,70,229,0.1)]"
                                    >
                                        {/* Card Inner Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent rounded-[2rem] pointer-events-none" />

                                        <div className="flex items-start gap-5 md:gap-8 relative z-10">
                                            <motion.div
                                                whileHover={{ rotate: 10, scale: 1.1 }}
                                                className="hidden sm:flex mt-1 w-14 h-14 justify-center items-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-100 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 flex-shrink-0 shadow-inner group-hover:text-purple-600 transition-colors"
                                            >
                                                <section.icon size={26} />
                                            </motion.div>

                                            <div className="space-y-4 w-full">
                                                <div className="flex items-center gap-4">
                                                    <div className="sm:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-inner">
                                                        <section.icon size={20} />
                                                    </div>
                                                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
                                className="mt-20 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[3rem] p-10 md:p-14 text-center text-white shadow-[0_20px_50px_rgba(79,70,229,0.3)] relative overflow-hidden group"
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
                                    className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"
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
                                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Need further clarification?</h2>
                                        <p className="text-indigo-100 font-medium max-w-lg mx-auto text-lg leading-relaxed">
                                            If you require assistance understanding these terms, please contact our legal and support team.
                                        </p>
                                    </div>

                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        href="mailto:legal@theunigang.com"
                                        className="inline-flex items-center gap-3 bg-white text-indigo-700 hover:text-purple-800 px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm transition-all shadow-xl"
                                    >
                                        Contact Legal <LuMail size={18} />
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

export default Terms;
