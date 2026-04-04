import { useState } from "react";
import {
    LuArrowRight, LuGraduationCap, LuSearch, LuArrowLeft, LuPlus,
    LuHeart, LuMapPin, LuBedDouble, LuShowerHead, LuWifi
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

// Mock Data Array for Annex Advertisements
const DUMMY_ANNEXES = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    title: `Student Suite ${i + 1}`,
    location: i % 2 === 0 ? 'Colombo 07, Colombo' : 'Malabe, Colombo',
    price: 15000 + (i * 1000),
    image: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDTdj_osJPm_miTm1ZdA7n9ABpR8K7MnkN_DJf-7RXT57gl84Wy7eB92EUQe8YDsQixPfJya1khvz1Xvq2arDrUdO83Hj04QsR020gnFPoTUXfW-ffrArcfSG_Xw6o3YwW6cZgM9ELhaMJ9TfYsKPMoRgCB8eeuOp0RCC_fc_jiw9EPGkkS6V52Bn8wwcT1M8VXtWe1LsG-PCF0Rzla-olJHYsRk-sMcqYHM9J2Y7JQUZGu0ACvl1Ya6RAcKO5FP1a2ITY03nBSmHPA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAoH1pH1dd9-h7NZ92GLC57pa3-K1G0bNX_ymlwtYu_YUfuDEifNAtTps-g8FnWUueg2dB2gxui4jTXx9qWRyc-6wAcXsDL3Ltxg7D-pQakTA0u-YBfc84b57-Cpiq5cBK3RNuBUaFyqhxVrfTimthYuhcSASM46rUG8SnhbjeOpWYectwygWw9ohtQTKU4A7sOXuHNRUH5sO23YqRT1YloeC4NUoBUomnCggQ4BZnLHSJ_SeoWb5uriWqsIbI8cFMTUHiyDBH4mNe6",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCe3ZfDrLSw7m9dDvbS_1c-Qjg7OBIbRZ0h_apGsGFYLAh3xzFiFmL-pB88eY4S0w5nhRFLxOtSW-_wDBoI7PCndjkYBTI3VRPaDN4YsjQpfGMNngOU-EDJT2sMO-6EoXMxwa7ja3N6wTzvai2rphC3KXwP2cSWDkMdvCaZM7vbINDWiqUaWIsvnTZ5GyMZ89VGhAA9rXJKJCcp7wTf_MbTn8tbecRiLGgZfQNosvi22G1vi-BZ0VSGj8nmrEIIwy2dagLhSwa1ozam"
    ][i % 3],
    verified: i % 3 !== 0,
    beds: (i % 3) + 1,
    bath: i % 2 === 0 ? 'Private Bath' : 'Shared Bath',
    perk: i % 2 === 0 ? 'High-Speed WiFi' : 'Kitchen Access',
}));

const AnnexList = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState<number[]>([]);

    const itemsPerPage = 12;
    const totalPages = Math.ceil(DUMMY_ANNEXES.length / itemsPerPage);
    const paginatedData = DUMMY_ANNEXES.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll back to the grid smoothly
        document.getElementById('listing-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
        );
    };

    return (
        <div className="relative z-10 font-sans pb-8 md:pb-0">
            {/* Top Action Bar */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 flex justify-between items-center relative z-20">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full text-slate-700 dark:text-slate-300 font-semibold border border-white/40 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
                >
                    <LuArrowLeft /> Back to Home
                </button>
            </div>

            {/* Hero Section */}
            <main className="pt-2 pb-10 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="relative z-10 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <span className="text-blue-800 dark:text-blue-400 font-bold tracking-widest text-sm uppercase">
                                Verified Accommodations
                            </span>
                            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                                Discover Your <br />
                                <span className="text-blue-800 dark:text-blue-500">Perfect Annex.</span>
                            </h1>
                            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                                Curated annexes and boarding places designed for the modern Sri Lankan scholar. High-value living near your campus.
                            </p>
                        </motion.div>

                        {/* Floating Cards (Animated) */}
                        <div className="hidden md:grid grid-cols-2 gap-4 pt-8">
                            <motion.div
                                className="bg-white/45 dark:bg-slate-900/45 glass-card p-4 rounded-xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform origin-bottom-right"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            >
                                <img
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                    alt="minimalist dorm"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGhAtTRv4YETE_l3kthBiRfvl5i3hovr-AlpW5vluxBwPn3QCjJUC56kW0pz7V8DuZkKK-9ed4xkLS4f52saB_DX7iyO2rW9ettc9DuxP4tqArzuazsh6njre6kOPivAXKAMPEFxGHvFupgZC24UesQgRKWpY2YD6o94b3zAXPoRGS4JPhBdshP_-P-dHfTjLwVpzA1HSn1BeXycBmj3Gfm6vpJ5pyrMTPK10v7ISuSJ4WZx2EOn2Ybw-Hgm2MBgFzMt5dw7esh5AR"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">The Study Loft</span>
                                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full font-bold uppercase tracking-wide">New</span>
                                </div>
                            </motion.div>
                            <motion.div
                                className="bg-white/45 dark:bg-slate-900/45 glass-card p-4 rounded-xl shadow-lg transform rotate-3 translate-y-8 hover:rotate-0 transition-transform origin-bottom-left"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            >
                                <img
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                    alt="cozy room"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXVjBjuRyVD_GdHsXCoJBF-3L_6yfqsQfZ7eVctHyCUAWEN6xhV7_Mm191cRUkn5Cet6hD5pCH8fgRlPs3aze3FgzAslWkx3hW6_gHrgVStfuo3gGi-9fuNwVNDvh988lMmcWhCLu6MDUbKNrWP8ZnRjfB-EATrgxjdIG_1wNi_K8v44aKS0YF0q_xc2vurCFrxhAVvm9JzzQTWZlz3USPGlhggzMWjSwRa36a4FKpqKMxNfEV2vB8HyIABqGieF30Os_x1kGbqss8"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Lounge Area</span>
                                    <span className="text-[10px] text-blue-800 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full border border-blue-100 dark:border-blue-800/50 uppercase tracking-wide">Premium</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Mosaic Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-4 bg-blue-800/10 dark:bg-blue-500/10 rounded-3xl blur-3xl group-hover:bg-blue-800/20 dark:group-hover:bg-blue-500/20 transition-all"></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[600px] border border-white/20">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                                alt="modern luxury apartment"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_a9K6J0T27yXtg8BVkOms82Z4hYqbA3bbaBnDJFSayEv31Q3cpORu_tx4ZT2XccVgdHQp1MnIpz2W34ywh8jE4sh9LfVvgbruEobqkXFysvxpHturvQlOomS4x2VgovVm7e9s0athDqlOeqVerfWk1_wTbQBf3n7EwPHpJC3fZtKNYBIO1aoYY5M6jPcJudpFm-NfKwQUEawpdIvJpGBbQ4WsJb_vSuW_HN5GwP3lRVKT9YcDm-lz8yLaUISBifiHnTNZA0cTdWxY"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                <motion.div
                                    className="flex items-center gap-4 text-white"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                >
                                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                        <span className="material-symbols-outlined text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Verified Residencies</p>
                                        <p className="text-sm text-gray-300">100+ properties across Sri Lanka</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Centralized Search Control */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 relative z-20"
                >
                    <div className="max-w-4xl mx-auto p-2 glass-card bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,63,221,0.08)] flex flex-col md:flex-row gap-2 border border-white/50 dark:border-slate-800/50">
                        {/* Search Input */}
                        <div className="flex-1 flex items-center px-6 gap-3">
                            <LuSearch className="text-slate-400 dark:text-slate-500 text-xl flex-shrink-0" />
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-4 font-medium"
                                placeholder="Search by University, City..."
                                type="text"
                            />
                        </div>

                        {/* Vertical Divider */}
                        <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 hidden md:block self-center"></div>

                        {/* University Dropdown */}
                        <div className="flex-none md:w-64 flex items-center px-6 gap-3 relative">
                            <LuGraduationCap className="text-slate-400 dark:text-slate-500 text-xl flex-shrink-0" />
                            <select className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white font-medium cursor-pointer appearance-none">
                                <option className="text-slate-900 dark:bg-slate-800">All Universities</option>
                                <option className="text-slate-900 dark:bg-slate-800">SLIIT</option>
                                <option className="text-slate-900 dark:bg-slate-800">NSBM</option>
                                <option className="text-slate-900 dark:bg-slate-800">University of Colombo</option>
                            </select>
                        </div>

                        {/* Search Button */}
                        <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-[2rem] font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-800/20 flex-shrink-0">
                            Search Now
                            <LuArrowRight className="group-hover:translate-x-1 transition-transform text-lg" />
                        </button>
                    </div>
                </motion.div>
            </main>

            {/* Annex Listings Section */}
            <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-16" id="listing-grid">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="space-y-2 flex-grow">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Refined Accommodations</h2>
                        <p className="text-slate-500 dark:text-slate-400">The most coveted listings currently available near top campuses</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        {/* Post Ad Button moved here */}
                        <Link
                            to="/post-ad"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-full font-bold shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                        >
                            <LuPlus /> Post Advertisement
                        </Link>

                        {/* Pagination Context Info */}
                        <div className="text-sm font-semibold text-slate-500 bg-white/40 dark:bg-slate-900/40 px-4 py-3 rounded-full border border-slate-200 dark:border-slate-800 w-full sm:w-auto text-center">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, DUMMY_ANNEXES.length)} of {DUMMY_ANNEXES.length}
                        </div>
                    </div>
                </div>

                {/* Animated Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <AnimatePresence mode="popLayout">
                        {paginatedData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="group glass-card bg-white/45 dark:bg-slate-900/40 border border-white/60 dark:border-slate-800 rounded-[2.5rem] p-4 hover:shadow-[0_40px_80px_-20px_rgba(0,63,221,0.12)] transition-shadow duration-500"
                            >
                                <div className="relative h-[280px] rounded-[2rem] overflow-hidden mb-6">
                                    <img
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        src={item.image}
                                    />
                                    {item.verified && (
                                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20">
                                            <span className="material-symbols-outlined text-green-600 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-200">Verified</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => toggleFavorite(item.id)}
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-white/20"
                                    >
                                        <LuHeart className={`text-xl transition-colors ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-slate-400 dark:text-slate-300'}`} />
                                    </button>
                                </div>
                                <div className="px-3 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mt-1">
                                                <LuMapPin className="text-[14px] text-blue-800/60 dark:text-blue-400/60" />
                                                {item.location}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-blue-800 dark:text-blue-400">Rs.{item.price}</span>
                                            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">per month</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 py-4 border-y border-slate-200/50 dark:border-slate-800/50">
                                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm font-medium"><LuBedDouble className="text-lg text-slate-400" /> {item.beds} Bed</div>
                                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm font-medium"><LuShowerHead className="text-lg text-slate-400" /> {item.bath}</div>
                                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm font-medium"><LuWifi className="text-lg text-slate-400" /> WiFi</div>
                                    </div>
                                    <button 
                                        onClick={() => navigate(`/annex/${item.id}`)}
                                        className="w-full bg-blue-800 text-white py-4 rounded-3xl font-bold tracking-tight shadow-md shadow-blue-800/20 hover:bg-blue-900 transition-all active:scale-95"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Glass Pagination System */}
                {totalPages > 1 && (
                    <div className="mt-20 flex justify-center w-full">
                        <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-2 rounded-full border border-white/40 dark:border-slate-800 shadow-xl">
                            <button
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${currentPage === 1 ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 shadow-sm'}`}
                            >
                                <LuArrowLeft className="text-lg" />
                            </button>

                            <div className="flex gap-1 px-2">
                                {Array.from({ length: totalPages }).map((_, i) => {
                                    const page = i + 1;
                                    const isActive = currentPage === page;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 flex items-center justify-center font-bold rounded-full transition-all ${isActive ? 'bg-blue-800 text-white shadow-md shadow-blue-800/30 font-black' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60'}`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${currentPage === totalPages ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 shadow-sm'}`}
                            >
                                <LuArrowRight className="text-lg" />
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/* Newsletter / Priority Access Section */}
            {/* <section className="max-w-6xl mx-auto px-4 md:px-8 mb-24">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-blue-800 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl shadow-blue-800/20"
                >
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                            <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.1"></path>
                        </svg>
                    </div>
                    <div className="relative z-10 space-y-6 max-w-xl text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Join the community <br/> of elite students.
                        </h2>
                        <p className="text-blue-100/80 text-lg">
                            Receive exclusive early access to premium listings and priority housing opportunities direct to your inbox.
                        </p>
                    </div>
                    <div className="relative z-10 w-full lg:w-auto">
                        <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20">
                            <input 
                                className="bg-transparent border-none text-white placeholder:text-white/60 px-6 py-4 focus:ring-0 focus:outline-none min-w-[300px] font-medium" 
                                placeholder="Enter your edu email" 
                                type="email"
                            />
                            <button className="bg-white text-blue-900 px-8 py-4 rounded-[1.5rem] font-bold hover:scale-105 active:scale-95 transition-all w-full sm:w-auto shadow-xl">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </motion.div>
            </section> */}
        </div>
    );
};

export default AnnexList;
