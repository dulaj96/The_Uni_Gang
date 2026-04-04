const AnnexList = () => {
    return (
        <div className="relative z-10 font-sans pb-8 md:pb-0">
            {/* Hero Section */}
            <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content & Floating Elements */}
                    <div className="relative z-10 space-y-10">
                        <div className="space-y-6">
                            <span className="text-blue-800 dark:text-blue-400 font-bold tracking-widest text-sm uppercase">
                                Premier Student Housing
                            </span>
                            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                                Efficient Management. <br />
                                <span className="text-blue-800 dark:text-blue-500">Exceptional Living.</span>
                            </h1>
                            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                                Curated spaces designed for the modern scholar. Experience the perfect blend of academic focus and refined comfort in the world's most vibrant student communities.
                            </p>
                        </div>
                        {/* Floating Cards */}
                        <div className="hidden md:grid grid-cols-2 gap-4 pt-8">
                            <div className="glass-card dark:bg-slate-900/40 p-4 rounded-xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform">
                                <img
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                    alt="minimalist modern student dorm room with desk, warm lighting, and a large window overlooking trees"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGhAtTRv4YETE_l3kthBiRfvl5i3hovr-AlpW5vluxBwPn3QCjJUC56kW0pz7V8DuZkKK-9ed4xkLS4f52saB_DX7iyO2rW9ettc9DuxP4tqArzuazsh6njre6kOPivAXKAMPEFxGHvFupgZC24UesQgRKWpY2YD6o94b3zAXPoRGS4JPhBdshP_-P-dHfTjLwVpzA1HSn1BeXycBmj3Gfm6vpJ5pyrMTPK10v7ISuSJ4WZx2EOn2Ybw-Hgm2MBgFzMt5dw7esh5AR"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">The Study Loft</span>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full font-bold">New</span>
                                </div>
                            </div>
                            <div className="glass-card dark:bg-slate-900/40 p-4 rounded-xl shadow-lg transform rotate-3 translate-y-8 hover:rotate-0 transition-transform">
                                <img
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                    alt="cozy common area in a luxury student residence with soft blue velvet sofas and architectural lighting"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXVjBjuRyVD_GdHsXCoJBF-3L_6yfqsQfZ7eVctHyCUAWEN6xhV7_Mm191cRUkn5Cet6hD5pCH8fgRlPs3aze3FgzAslWkx3hW6_gHrgVStfuo3gGi-9fuNwVNDvh988lMmcWhCLu6MDUbKNrWP8ZnRjfB-EATrgxjdIG_1wNi_K8v44aKS0YF0q_xc2vurCFrxhAVvm9JzzQTWZlz3USPGlhggzMWjSwRa36a4FKpqKMxNfEV2vB8HyIABqGieF30Os_x1kGbqss8"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Lounge Area</span>
                                    <span className="text-xs text-blue-800 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full border border-blue-100 dark:border-blue-800/50">Premium</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Mosaic Visual */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-blue-800/10 dark:bg-blue-500/10 rounded-3xl blur-3xl group-hover:bg-blue-800/20 dark:group-hover:bg-blue-500/20 transition-all"></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[600px]">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="architectural vertical shot of a modern luxury apartment building interior with natural wood accents and large windows"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_a9K6J0T27yXtg8BVkOms82Z4hYqbA3bbaBnDJFSayEv31Q3cpORu_tx4ZT2XccVgdHQp1MnIpz2W34ywh8jE4sh9LfVvgbruEobqkXFysvxpHturvQlOomS4x2VgovVm7e9s0athDqlOeqVerfWk1_wTbQBf3n7EwPHpJC3fZtKNYBIO1aoYY5M6jPcJudpFm-NfKwQUEawpdIvJpGBbQ4WsJb_vSuW_HN5GwP3lRVKT9YcDm-lz8yLaUISBifiHnTNZA0cTdWxY"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-center gap-4 text-white">
                                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Verified Residencies</p>
                                        <p className="text-sm opacity-80">1,200+ properties across 40 cities</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Centralized Search Control */}
                <div className="mt-20 relative z-20">
                    <div className="max-w-5xl mx-auto glass-card dark:bg-slate-900/60 p-4 md:p-2 rounded-2xl md:rounded-full shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center gap-2">
                            {/* Type */}
                            <div className="flex-1 w-full px-6 py-3 md:border-r border-b md:border-b-0 border-slate-200 dark:border-slate-700">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Type</label>
                                <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-semibold text-slate-900 dark:text-white cursor-pointer outline-none">
                                    <option className="text-slate-900 dark:bg-slate-800">Studio Apartment</option>
                                    <option className="text-slate-900 dark:bg-slate-800">Shared Suite</option>
                                    <option className="text-slate-900 dark:bg-slate-800">Private Room</option>
                                </select>
                            </div>
                            {/* Rent or Buy */}
                            <div className="flex-1 w-full px-6 py-3 md:border-r border-b md:border-b-0 border-slate-200 dark:border-slate-700">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</label>
                                <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-semibold text-slate-900 dark:text-white cursor-pointer outline-none">
                                    <option className="text-slate-900 dark:bg-slate-800">Rent Monthly</option>
                                    <option className="text-slate-900 dark:bg-slate-800">Full Academic Year</option>
                                </select>
                            </div>
                            {/* Location */}
                            <div className="flex-1 w-full px-6 py-3 md:border-r border-b md:border-b-0 border-slate-200 dark:border-slate-700">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Location</label>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 text-sm">location_on</span>
                                    <input
                                        className="w-full bg-transparent border-none p-0 focus:ring-0 font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                                        placeholder="London, UK"
                                        type="text"
                                    />
                                </div>
                            </div>
                            {/* Brand/Provider */}
                            <div className="flex-1 w-full px-6 py-3">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Brand</label>
                                <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-semibold text-slate-900 dark:text-white cursor-pointer outline-none">
                                    <option className="text-slate-900 dark:bg-slate-800">All Premium Brands</option>
                                    <option className="text-slate-900 dark:bg-slate-800">Vita Student</option>
                                    <option className="text-slate-900 dark:bg-slate-800">Scape Living</option>
                                </select>
                            </div>
                            {/* Search Action */}
                            <button className="w-full md:w-auto bg-blue-800 text-white px-10 py-4 md:rounded-full rounded-xl font-bold hover:bg-blue-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-800/20">
                                <span className="material-symbols-outlined">search</span>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnnexList;
