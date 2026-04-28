import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LuCalendar,
    LuMapPin,
    LuShieldCheck,
    LuMegaphone,
    LuChevronDown,
    LuMessageSquare
} from 'react-icons/lu';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';

interface FAQItemProps {
    question: string;
    answer: string | React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <motion.div
            className={`border ${isOpen ? 'border-amber-500/50 dark:border-amber-500/50 bg-white/60 dark:bg-slate-800/80 shadow-lg shadow-amber-500/5' : 'border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 hover:bg-white/60 dark:hover:bg-slate-800/60'} backdrop-blur-xl rounded-2xl overflow-hidden transition-colors duration-300`}
        >
            <button
                onClick={onClick}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
            >
                <span className="font-bold text-lg text-slate-800 dark:text-slate-100">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
                >
                    <LuChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 mt-2">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const categories = [
        {
            title: "Events on Campus",
            icon: LuCalendar,
            color: "text-blue-500 dark:text-blue-400",
            bg: "bg-blue-100 dark:bg-blue-900/30",
            border: "border-blue-200 dark:border-blue-800/50",
            questions: [
                {
                    question: "How do I stay updated on university events?",
                    answer: "Simply check the 'Events' section on our platform! We strictly operate as a central aggregator, meaning we pull all event buzz across faculties into one easy-to-read feed."
                },
                {
                    question: "Is there a cost to use the platform?",
                    answer: "No, The Uni Gang is completely free for all university students to use for discovering events and accommodations."
                },
                {
                    question: "What does the 'Interested' button actually do?",
                    answer: "Clicking 'Interested' bookmarks the event in your profile to help you track what's coming up. However, please note that this does not serve as an official registration or ticket purchase for the event itself."
                }
            ]
        },
        {
            title: "Accommodations & Annexes",
            icon: LuMapPin,
            color: "text-emerald-500 dark:text-emerald-400",
            bg: "bg-emerald-100 dark:bg-emerald-900/30",
            border: "border-emerald-200 dark:border-emerald-800/50",
            questions: [
                {
                    question: "How do I contact a landlord for an annex?",
                    answer: "You can find direct contact links (usually WhatsApp or a phone number) clearly visible on the specific Annex listing page. Clicking it will seamlessly redirect you to message the landlord directly."
                },
                {
                    question: "How accurate are these listings?",
                    answer: "We strive to provide excellent and helpful data, but as an aggregator platform, we rely heavily on the accuracy of the listers. We highly recommend verifying the location, terms, and photos directly with the landlord before making any payments."
                }
            ]
        },
        {
            title: "Safety & Privacy",
            icon: LuShieldCheck,
            color: "text-purple-500 dark:text-purple-400",
            bg: "bg-purple-100 dark:bg-purple-900/30",
            border: "border-purple-200 dark:border-purple-800/50",
            questions: [
                {
                    question: "Is my personal data safe?",
                    answer: "Absolutely. We employ industry-standard security and have strict data-retention rules, such as temporarily archiving accounts entirely inactive for 1 month, and irreversibly deleting them entirely after 12 months. View our Privacy Policy for more details."
                },
                {
                    question: "How do I report a fake listing or platform bug?",
                    answer: "You can use the 'Feedback' or 'Request Service' forms on our Contact page to instantly alert us of suspicious activity, fake annexes, or technical bugs. We review all reports carefully."
                }
            ]
        },
        {
            title: "Advertising & Partnerships",
            icon: LuMegaphone,
            color: "text-rose-500 dark:text-rose-400",
            bg: "bg-rose-100 dark:bg-rose-900/30",
            border: "border-rose-200 dark:border-rose-800/50",
            questions: [
                {
                    question: "How can my club or organization post an event ad?",
                    answer: "You can use the 'Create Your Event' service button! You simply fill out your event's crucial details and cover image, and it will be forwarded to our team to verify and publish cleanly onto the main feed."
                }
            ]
        }
    ];

    let globalIndex = 0;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
            <PremiumPageLoader isLoading={loading} message="Searching for answers..." />
            
            <AnimatePresence>
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-4xl mx-auto relative z-10 space-y-12 pt-10 pb-24"
                    >
                        {/* Ambient Animated Backgrounds */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="fixed top-20 right-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[130px] pointer-events-none translate-x-1/3"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                            className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none -translate-x-1/3 translate-y-1/3"
                        />

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center space-y-5"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-widest border border-amber-200/50 dark:border-amber-800/50 backdrop-blur-md shadow-sm">
                                <LuMessageSquare size={16} /> Help Center
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Questions</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-xl mx-auto">
                                Everything you need to know about how The Uni Gang platform works, from events to finding your next annex.
                            </p>
                        </motion.div>

                        {/* FAQ Content Box */}
                        <div className="space-y-12">
                            {categories.map((category, catIdx) => (
                                <motion.div
                                    key={catIdx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                                        <div className={`w-12 h-12 rounded-xl ${category.bg} ${category.border} border flex items-center justify-center ${category.color} flex-shrink-0 shadow-inner`}>
                                            <category.icon size={22} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{category.title}</h2>
                                    </div>

                                    <div className="space-y-4">
                                        {category.questions.map((q) => {
                                            const currentIndex = globalIndex++;
                                            return (
                                                <FAQItem
                                                    key={currentIndex}
                                                    question={q.question}
                                                    answer={q.answer}
                                                    isOpen={openIndex === currentIndex}
                                                    onClick={() => setOpenIndex(openIndex === currentIndex ? null : currentIndex)}
                                                />
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FAQ;
