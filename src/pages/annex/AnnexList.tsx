import { useState, useEffect } from "react";
import {
    LuArrowRight, LuGraduationCap, LuSearch, LuArrowLeft, LuPlus,
    LuHeart, LuMapPin, LuBedDouble, LuShowerHead, LuWifi, LuMap
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import universitiesData from "../../constants/annex/Universities.json";
import PremiumPageLoader from "../../components/ui/PremiumPageLoader";

// Dynamic Leaflet map rendering component using dynamic CDN script injections
const LeafletListMap = ({ items, centerUniId }: { items: any[], centerUniId: string }) => {
    useEffect(() => {
        // Load Leaflet styles and scripts dynamically
        if (!document.getElementById('leaflet-css')) {
            const css = document.createElement('link');
            css.id = 'leaflet-css';
            css.rel = 'stylesheet';
            css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(css);
        }
        if (!document.getElementById('leaflet-js')) {
            const js = document.createElement('script');
            js.id = 'leaflet-js';
            js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            document.body.appendChild(js);
            js.onload = () => initMap();
        } else {
            initMap();
        }

        let map: any;
        function initMap() {
            if (!(window as any).L) return;
            const L = (window as any).L;
            
            const container = L.DomUtil.get('list-map-canvas');
            if (container != null) {
                container._leaflet_id = null; // Prevent dual rendering errors
            }

            // Defaults center
            let centerLat = 6.7969;
            let centerLng = 79.9018;

            if (centerUniId && centerUniId !== "All Universities") {
                const campusCoords: Record<string, [number, number]> = {
                    "1": [6.9016, 79.8589],   // Colombo
                    "2": [7.2549, 80.5925],   // Peradeniya
                    "3": [6.9062, 79.9018],   // USJ
                    "4": [6.9740, 79.9160],   // Kelaniya
                    "5": [6.7969, 79.9018],   // Moratuwa
                    "12": [6.7136, 80.7872],  // Sabaragamuwa (SUSL)
                };
                if (campusCoords[centerUniId]) {
                    [centerLat, centerLng] = campusCoords[centerUniId];
                }
            }

            map = L.map('list-map-canvas').setView([centerLat, centerLng], 14);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Seed University Marker
            if (centerUniId && centerUniId !== "All Universities") {
                L.marker([centerLat, centerLng], {
                    icon: L.divIcon({
                        className: 'custom-div-icon',
                        html: "<div style='background-color:#1e40af; color:white; padding:5px 10px; border-radius:10px; font-weight:bold; font-size:10px; border:2px solid white; box-shadow:0 10px 15px rgba(0,0,0,0.1);'>CAMPUS</div>",
                        iconSize: [60, 30]
                    })
                }).addTo(map);
            }

            // Map Listing pins
            items.forEach((item: any) => {
                if (item.latitude && item.longitude) {
                    const price = item.price;
                    const marker = L.marker([parseFloat(item.latitude), parseFloat(item.longitude)]).addTo(map);
                    marker.bindPopup(`
                        <div style="font-family:sans-serif; padding:5px; max-width:200px;">
                            <h4 style="margin:0 0 5px 0; color:#1e40af; font-weight:bold; font-size:12px;">${item.title}</h4>
                            <p style="margin:0 0 5px 0; font-size:10px; color:#666;">${item.address}</p>
                            <p style="margin:0 0 5px 0; font-size:10px; font-weight:bold; color:#22c55e;">${item.distanceToUni ? `${item.distanceToUni} km from campus` : ''}</p>
                            <p style="margin:0 0 5px 0; font-weight:black; color:#1e40af; font-size:12px;">Rs. ${price}</p>
                            <button onclick="window.location.href='/annex/${item.id}'" style="width:100%; display:inline-block; margin-top:5px; font-size:10px; font-weight:bold; background-color:#1e40af; color:white; border:none; padding:5px; border-radius:5px; cursor:pointer;">View Details</button>
                        </div>
                    `);
                }
            });
        }
    }, [items, centerUniId]);

    return (
        <div 
            id="list-map-canvas" 
            className="w-full h-[520px] rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-slate-800 relative z-10"
        />
    );
};

const AnnexList = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [mapView, setMapView] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUni, setSelectedUni] = useState("All Universities");
    const [maxDistance, setMaxDistance] = useState("Any Distance");
    const [loading, setLoading] = useState(true);
    const [annexes, setAnnexes] = useState<any[]>([]);

    const fetchAnnexes = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (selectedUni !== "All Universities") {
                queryParams.append("universityId", selectedUni);
            }
            if (maxDistance !== "Any Distance" && selectedUni !== "All Universities") {
                queryParams.append("maxDistance", maxDistance);
            }

            const response = await fetch(`http://localhost:5000/api/annexes?${queryParams.toString()}`);
            const data = await response.json();
            
            // Search locally by search keyword supporting title, address, university, or distance
            let filtered = data;
            if (searchTerm.trim() !== "") {
                const query = searchTerm.toLowerCase();
                const numericQuery = parseFloat(query);
                const isNumeric = !isNaN(numericQuery);

                filtered = data.filter((item: any) => {
                    const matchesTitle = item.title?.toLowerCase().includes(query);
                    const matchesAddress = item.address?.toLowerCase().includes(query);
                    const matchesUniName = item.university?.name?.toLowerCase().includes(query);
                    const matchesUniLoc = item.university?.location?.toLowerCase().includes(query);
                    const matchesDistance = isNumeric && item.distanceToUni && parseFloat(item.distanceToUni) <= numericQuery;

                    return matchesTitle || matchesAddress || matchesUniName || matchesUniLoc || matchesDistance;
                });
            }
            setAnnexes(filtered);
        } catch (error) {
            console.error("Error loading annexes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnexes();
    }, [selectedUni, maxDistance]);

    const handleSearchClick = () => {
        fetchAnnexes();
        setCurrentPage(1);
    };

    const itemsPerPage = 12;
    const totalPages = Math.max(1, Math.ceil(annexes.length / itemsPerPage));
    const paginatedData = annexes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        document.getElementById('listing-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const toggleFavorite = (id: string) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
        );
    };

    return (
        <div className="relative z-10 font-sans pb-8 md:pb-0">
            <PremiumPageLoader isLoading={loading} message="Scouting the best annexes for you..." />

            <AnimatePresence>
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
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
                                        whileInView={{ opacity: 1, x: 0 }}
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
                                <div className="max-w-5xl mx-auto p-2 glass-card bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,63,221,0.08)] flex flex-col md:flex-row gap-2 border border-white/50 dark:border-slate-800/50">
                                    {/* Search Input */}
                                    <div className="flex-1 flex items-center px-6 gap-3">
                                        <LuSearch className="text-slate-400 dark:text-slate-500 text-xl flex-shrink-0" />
                                        <input
                                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-4 font-medium"
                                            placeholder="Search by university, address, or distance (e.g. '1.5' or 'Moratuwa')..."
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Vertical Divider */}
                                    <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 hidden md:block self-center"></div>

                                    {/* University Dropdown */}
                                    <div className="flex-none md:w-64 flex items-center px-6 gap-3 relative">
                                        <LuGraduationCap className="text-slate-400 dark:text-slate-500 text-xl flex-shrink-0" />
                                        <select
                                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white font-medium cursor-pointer appearance-none"
                                            value={selectedUni}
                                            onChange={(e) => {
                                                setSelectedUni(e.target.value);
                                                if (e.target.value === "All Universities") setMaxDistance("Any Distance");
                                            }}
                                        >
                                            <option className="text-slate-900 dark:bg-slate-800" value="All Universities">All Universities</option>
                                            {universitiesData.map(uni => (
                                                <option key={uni.id} value={uni.id} className="text-slate-900 dark:bg-slate-800">{uni.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Distance Dropdown (Sleek proximity loader visible when Uni is selected) */}
                                    {selectedUni !== "All Universities" && (
                                        <>
                                            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 hidden md:block self-center"></div>
                                            <div className="flex-none md:w-48 flex items-center px-6 gap-3 relative">
                                                <span className="text-slate-400 dark:text-slate-500 text-[18px]">📍</span>
                                                <select
                                                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white font-medium cursor-pointer appearance-none"
                                                    value={maxDistance}
                                                    onChange={(e) => setMaxDistance(e.target.value)}
                                                >
                                                    <option className="text-slate-900 dark:bg-slate-800" value="Any Distance">Any Distance</option>
                                                    <option className="text-slate-900 dark:bg-slate-800" value="1">Within 1 km</option>
                                                    <option className="text-slate-900 dark:bg-slate-800" value="2">Within 2 km</option>
                                                    <option className="text-slate-900 dark:bg-slate-800" value="3">Within 3 km</option>
                                                    <option className="text-slate-900 dark:bg-slate-800" value="5">Within 5 km</option>
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {/* Search Button */}
                                    <button
                                        onClick={handleSearchClick}
                                        className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-[2rem] font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-800/20 flex-shrink-0"
                                    >
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
                                    {/* Toggle Map View button next to Post Ad */}
                                    <button
                                        onClick={() => setMapView(!mapView)}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full text-slate-700 dark:text-slate-300 font-bold border border-white/40 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-sm w-full sm:w-auto"
                                    >
                                        <LuMap /> {mapView ? "Show Grid View" : "Show Map View"}
                                    </button>

                                    <Link
                                        to="/post-ad"
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-full font-bold shadow-lg shadow-blue-800/30 hover:bg-blue-900 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                                    >
                                        <LuPlus /> Post Advertisement
                                    </Link>

                                    {/* Pagination Context Info */}
                                    <div className="text-sm font-semibold text-slate-500 bg-white/40 dark:bg-slate-900/40 px-4 py-3 rounded-full border border-slate-200 dark:border-slate-800 w-full sm:w-auto text-center">
                                        Showing {annexes.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} - {Math.min(currentPage * itemsPerPage, annexes.length)} of {annexes.length}
                                    </div>
                                </div>
                            </div>

                            {/* Render Map View or Grid View based on Toggle */}
                            {mapView ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-10"
                                >
                                    <LeafletListMap items={annexes} centerUniId={selectedUni} />
                                </motion.div>
                            ) : (
                                /* Animated Grid */
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {paginatedData.map((item, index) => {
                                            // Handle images mapping correctly
                                            const coverImage = item.images && item.images.length > 0 
                                                ? `http://localhost:5000${item.images[0].imageUrl}` 
                                                : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800";
                                                
                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 40 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                                    className="group relative h-full bg-white/45 dark:bg-slate-900/45 backdrop-blur-[24px] border border-white/40 dark:border-slate-800 rounded-[2.5rem] p-4 hover:shadow-[0_40px_80px_-20px_rgba(0,63,221,0.12)] transition-all duration-500 flex flex-col"
                                                >
                                                    <div className="relative h-[280px] rounded-[2rem] overflow-hidden mb-6">
                                                        <img
                                                            alt={item.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                            src={coverImage}
                                                        />

                                                        {/* Verified Badge */}
                                                        {item.status === 'Approved' && (
                                                            <div className="absolute top-4 left-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20 dark:border-slate-700/50">
                                                                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-200">Verified</span>
                                                            </div>
                                                        )}

                                                        {/* Favorite Button */}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleFavorite(item.id);
                                                            }}
                                                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-white/20 dark:border-slate-700/50"
                                                        >
                                                            <LuHeart className={`text-xl transition-colors ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-slate-400 dark:text-slate-300'}`} />
                                                        </button>
                                                    </div>

                                                    <div className="px-3 space-y-4 flex-grow flex flex-col">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-1">
                                                                    {item.title}
                                                                </h3>
                                                                <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1 mt-1 font-medium line-clamp-1">
                                                                    <LuMapPin className="text-[14px] text-blue-800/60 dark:text-blue-400/60 flex-shrink-0" />
                                                                    {item.address} {item.distanceToUni && `(📍 ${item.distanceToUni} km to campus)`}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Amenities Row */}
                                                        <div className="flex items-center gap-4 py-4 border-y border-slate-200/50 dark:border-slate-800/50 mt-auto">
                                                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm font-medium">
                                                                <LuBedDouble className="text-lg text-slate-400 dark:text-slate-500" /> {item.beds} Beds
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm font-medium">
                                                                <LuShowerHead className="text-lg text-slate-400 dark:text-slate-500" /> {item.bath || "Shared Bath"}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm font-medium">
                                                                <LuWifi className="text-lg text-slate-400 dark:text-slate-500" /> Wi-Fi
                                                            </div>
                                                        </div>

                                                        {/* Action Button */}
                                                        <div className="mt-auto pt-4 flex flex-row items-end justify-between gap-2 border-t border-slate-100 dark:border-slate-800/50">
                                                            <div className="flex flex-col">
                                                                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-0.5">Monthly Fee</span>
                                                                <span className="text-xl md:text-2xl font-extrabold text-blue-800 dark:text-blue-400 leading-none">
                                                                    <span className="text-xs mr-0.5">Rs.</span>{parseFloat(item.price).toLocaleString()}
                                                                </span>
                                                            </div>
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => navigate(`/annex/${item.id}`)}
                                                                className="w-auto text-[11px] md:text-sm bg-blue-50 dark:bg-slate-800/80 hover:bg-blue-800 hover:text-white dark:hover:bg-blue-800 text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-slate-700 px-4 md:px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center"
                                                            >
                                                                Details
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </motion.div>
                            )}

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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnnexList;
