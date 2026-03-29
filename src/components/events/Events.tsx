import React, { useRef, useState, useEffect } from 'react';

const Events = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                // If we've reached the end, loop back (allowing 10px threshold)
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll by approximately one card width + gap (350px)
                    scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
                }
            }
        }, 3000); // 3 seconds per slide

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <section id="events" className="relative pt-24 pb-12 px-4 md:px-8 overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-fixed/30 to-surface pointer-events-none -z-10"></div>

            {/* Floating Symbols (Simulating 3D University Icons) */}
            <div className="absolute top-20 left-[10%] opacity-20 rotate-12 -z-10 animate-float">
                <span className="material-symbols-outlined text-[120px] text-primary">school</span>
            </div>
            <div className="absolute bottom-10 right-[15%] opacity-20 -rotate-12 -z-10 animate-float [animation-delay:1s] [animation-duration:8s]">
                <span className="material-symbols-outlined text-[100px] text-primary">menu_book</span>
            </div>
            <div className="absolute top-40 right-[5%] opacity-10 rotate-45 -z-10 animate-float [animation-delay:2s] [animation-duration:7s]">
                <span className="material-symbols-outlined text-[80px] text-primary">music_note</span>
            </div>
            <div className="absolute bottom-20 left-[5%] opacity-10 -rotate-45 -z-10 animate-float [animation-delay:1.5s] [animation-duration:9s]">
                <span className="material-symbols-outlined text-[90px] text-primary">theater_comedy</span>
            </div>

            {/* Header Logic */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-[1.1] font-plus-jakarta">
                        Featured Campus <br /> <span className="text-primary">Experiences</span>
                    </h1>
                </div>
                <div className="flex items-center gap-6 font-sans">
                    <button className="relative group animate-glow-pulse rounded-2xl">
                        <div className="relative flex items-center gap-3 px-8 py-4 premium-glass rounded-2xl leading-none transition duration-500 group-hover:scale-[1.02] group-hover:bg-white/20 active:scale-95">
                            <span className="text-primary font-bold tracking-tight">View All Events</span>
                            <span className="material-symbols-outlined text-primary font-bold text-xl group-hover:translate-x-1 transition-transform">east</span>
                            <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden pointer-events-none">
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                            </div>
                        </div>
                    </button>
                    <button className="relative group animate-glow-pulse rounded-2xl">
                        <div className="relative flex items-center gap-3 px-8 py-4 premium-glass rounded-2xl leading-none transition duration-500 group-hover:scale-[1.02] group-hover:bg-white/20 active:scale-95">
                            <span className="text-primary font-bold tracking-tight">Create Your Event</span>
                            <span className="material-symbols-outlined text-primary font-bold text-xl animate-pulse">auto_awesome</span>
                            <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden pointer-events-none">
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Horizontal Scrolling Section */}
            <div
                className="relative max-w-[1440px] mx-auto"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-8 pb-12 px-4 hide-scrollbar snap-x snap-mandatory"
                >
                    {/* Card 1: Musical */}
                    <div className="flex-none w-[320px] md:w-[380px] snap-start">
                        <div className="glass-card p-4 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,63,221,0.04)] group hover:-translate-y-2 transition-all duration-500">
                            <div className="relative h-[400px] rounded-[2rem] overflow-hidden mb-6">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB386kjiWCvvnq24wlNnUcCNMOzh6kLycy_5DqcGPNR0aAkOjp8q0FrGBhEKe7UJMkT69ydBxS4AZaLCF1XA7WaoCNzrCvAP_FOzWaiEO7OFuavMRBf7AvrmL4x_jTk4noyE2r4h9mlV4lyMULxIPlhIffK3_hhz2S7zmQkZZSpigSdzJvZpVig_IEiAnNC2waeI4StBSTG4TsTp1V9g1jJzI03q8GhxVe1dztOU_iwYitpBi33TNPEMRC3vgUJ0rBbaGKeh3rcLtAi"
                                    alt="Musical Event"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center">
                                    <span className="text-xl font-bold text-primary leading-none">24</span>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">OCT</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/20 backdrop-blur-md text-white border border-white/20">
                                    <div className="flex items-center gap-2 text-xs font-medium opacity-90 mb-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        Grand Auditorium
                                    </div>
                                    <h3 className="text-2xl font-bold leading-tight">Neon Nights: The University Musical</h3>
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-2 pb-2">
                                <div className="flex -space-x-2">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfkcA0esEExCcmheb-xaO1r12sCq4qfYFlX5IRGc3S08Ehnl4wQUvp13Q7i35GcJ5cNgHe93Shsm3SsEn4lXd2ULrCZqDaHpw--0AyMIMak3eDn6yiIfaQn1k5h1Y6TIIf1QMilcl0d7AX1jKmOZHFppH94tD6wAvc0sD4_ua6eKd4tMWRhOFE3gitHneYpAAaYJm6WX8Ak-ypRKrqus6aOJhNumuEIN_ZESfZ0E016brb7xTSTWv9TfEDeAF0dd7MBysaG69U1pcJ" alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white" />
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrJOi3KPPKnuE9Tww4atliHgqbSHC4LOhEHQ--LHRKIPG-v3i04Cfxq6q_je4unyEy-wnnU9rSz7UZdrxnj3GibHBQDdLGEOCcwH9O-fxjXRz9zcvUF_chO4qU-0shSULBuwkEdO9AXwjbE1B8fN7-Xy7NR4RR9vl8DSN75l1EumKblLXGfxlyNtxvPBt8K014BQ1A9zb2bNQ3andPjtcCgwHNgjk5wMbZuKiDBzl9M3QxY9rtHBuLZUpf6agfPlW82M8qy0m6wh2M" alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white" />
                                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-[10px] font-bold flex items-center justify-center border-2 border-white text-on-secondary-container">+42</div>
                                </div>
                                <button className="bg-surface-container-highest hover:bg-primary hover:text-white text-on-surface px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300">
                                    Interested
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Drama */}
                    <div className="flex-none w-[320px] md:w-[380px] snap-start">
                        <div className="glass-card p-4 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,63,221,0.04)] group hover:-translate-y-2 transition-all duration-500">
                            <div className="relative h-[400px] rounded-[2rem] overflow-hidden mb-6">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKTPuAVQ1vX0swBVF6OGG6R4jhB7yNm63A6kyLsKtiNl40WutRHECVRSKpyrqvZTH5Y_QwLg04fgqKOhdXXMPtom96oHMygJnGLPgtsPGE-wII7pD3kdCZpnCQI1jGMnK6bZcXZAJxL4dpNiLJHfzkYcPJaVnyS8d_py2VyZVFRtkuZHTxEM5cLdETg2iyYasrJkUNsRaEmHvDCefquRSrMEVL2Ktq6ejAJZnLq3278lfQKKhJ0iK8r5giZGzKDvWBmxj80DdV2qiE"
                                    alt="Drama Event"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center">
                                    <span className="text-xl font-bold text-primary leading-none">28</span>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">OCT</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/20 backdrop-blur-md text-white border border-white/20">
                                    <div className="flex items-center gap-2 text-xs font-medium opacity-90 mb-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        Experimental Theatre
                                    </div>
                                    <h3 className="text-2xl font-bold leading-tight">Shadows of the Past: A Drama Series</h3>
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-2 pb-2">
                                <div className="flex -space-x-2">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtCoaRU30kaM1PAppRP5LBSP53iPiTG-_g1fZ0NWhPYNHnqv3fJhiT2aJIX04Os-0l4nyOiu0XWC1di30BxIixg36rpIXaKoxtlCLd-J0rprC7pVHlLgwE4LO2ftexuq16MkLGQMO5TS2DetmUwmjdOPrbPwMxpy2vj4JSFfv0AJ47so9k__gHcBgG7YgIc6RtJRufEiqlvnTZQ5FEzkAFmPU9oJAobeqp_h-EMJrkegbiVoUB-KjfUXUMq4JylZw-8adSK2TXi6JK" alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white" />
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMyE0jMHDCutZBlYFwcFMUkuF68SQFiICZJfS4IMSPK3Yz-oXFMFRXmxgqfZsyr8b0EbrUhUn0V40IDuvFtvAgKuMmB1Oy6Icnca9OpAkDLrcYVEDTMRhESgOGirTzo8Jn_esIrfo0vFa9IoQKKUQV446l0pK7AAjvlq_l31KrOok-2JbncYGeUuPRpyqfpI0qhPQNCBX4nRtDYQ-hRNBHmuLvH-1VsmTSK3Y3q2N165Ao5xcBaiJSz_OsbDdZFwEbdnt0oA45HoqE" alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white" />
                                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-[10px] font-bold flex items-center justify-center border-2 border-white text-on-secondary-container">+15</div>
                                </div>
                                <button className="bg-surface-container-highest hover:bg-primary hover:text-white text-on-surface px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300">
                                    Interested
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Tech */}
                    <div className="flex-none w-[320px] md:w-[380px] snap-start">
                        <div className="glass-card p-4 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,63,221,0.04)] group hover:-translate-y-2 transition-all duration-500">
                            <div className="relative h-[400px] rounded-[2rem] overflow-hidden mb-6">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgXe1zXdwTo8o6OK528cQ_mojg7FxY6kHOtTgBmSWLzlKBFsCKF9b-2aFknkJsRoXF-cr8e-5eQfRDdRQa7QQteujrwkgEQBoVaBPZawwE8WDa5pqC2XJk4EURL6oBCtVtTCbnoBXqT2QeO0I6fsIkzNcwINBgIH7B4b0WMzznStxPz5NPO8400iP8KpKDf7u9bNWP1SCKRgspcn4JmCPu3EO0653CoN_ky9oOUzQFuSzfeWMpUg5VWZawOQYgRjKWIes9uES2BMTP"
                                    alt="Tech Event"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center">
                                    <span className="text-xl font-bold text-primary leading-none">02</span>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">NOV</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/20 backdrop-blur-md text-white border border-white/20">
                                    <div className="flex items-center gap-2 text-xs font-medium opacity-90 mb-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        Science & Innovation Lab
                                    </div>
                                    <h3 className="text-2xl font-bold leading-tight">AI & Ethics: The Annual Symposium</h3>
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-2 pb-2">
                                <div className="flex -space-x-2">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOkQOp4-LYexkCOF4Gvrs0dQ2t3zIKZiVX_WC6meGN0t4RETWjUdbGvZPjST0VPt9A_5jZDV-tTNWRX0W0sSjJP-2OouNDZN9LTrJyoATKRf4ZM_SWgGW3w5xpEBk-Ds1S1R3LCbWJdvlnX2I4_4H5XjnBOKiSbUtyCeY3G_AWo5b57GlFX4D-GAMZtZT60xRFKjFzzpP1b9jzIaFLCvTeMrZgKCUggy46KZf18SUsmiaUkH0COHhR9hjnktbBRNQrWL3OP2jWZD8V" alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white" />
                                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-[10px] font-bold flex items-center justify-center border-2 border-white text-on-secondary-container">+128</div>
                                </div>
                                <button className="bg-surface-container-highest hover:bg-primary hover:text-white text-on-surface px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300">
                                    Interested
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Art */}
                    <div className="flex-none w-[320px] md:w-[380px] snap-start">
                        <div className="glass-card p-4 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,63,221,0.04)] group hover:-translate-y-2 transition-all duration-500">
                            <div className="relative h-[400px] rounded-[2rem] overflow-hidden mb-6">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSG4y7H9SS9fbdxyjvLM557iD09ZWfDjDpUSYoUKyEiBeCYaWBWv7bLlzgSJMglXs3ShiQTazKhWsga4sWxBZgAtzzL7ZJcWog7s9PpVJ8pYbpgCFNaeXQnbLWZWhhhYGdoEA6_Q9rHGLij76F6CTMnsx6OByRv_-2H9uqR8qkbQQnddsxXcsXdcRbre9UKziAKVEy0fptosrHItayBe0u2JfECOaSSGZIq4pwrYVmmgQYEeuOttSmIzwM68ECk8sVwd7YGjxcTySV"
                                    alt="Art Event"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center">
                                    <span className="text-xl font-bold text-primary leading-none">05</span>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">NOV</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/20 backdrop-blur-md text-white border border-white/20">
                                    <div className="flex items-center gap-2 text-xs font-medium opacity-90 mb-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        Main Campus Gallery
                                    </div>
                                    <h3 className="text-2xl font-bold leading-tight">Expressions: A Visual Art Exhibition</h3>
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-2 pb-2">
                                <div className="flex -space-x-2">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR15hpSyvIqrV5QOdWk-JRz6prhahBaXOI9NR-smkRRrz0Kh2nAVMJ3j8riSHBUeHxET0dTuNolymcSs-uSVwgnCz7XmZ7eqiOjBEbfqND4245EvaYjnnD2VmwBGEyrNK-fCqOUJIY7CCRdpwM5V-aLWgSGDdVxS41XRzBy3x0GsYcsC_dnjjA-7Dsv-Gbpzy3NEOXMr9MeuJwK8BKb0_mE9MN-FC0DU0QhkpKRgqbHcR4IT2SqA0SiqGGb4SheIFVMRwtBlv1d9J9" alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white" />
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7fiioS-y-SmCNgJGN-JrKu2lhbM8wzKqtMF-etGUEifk3HMq1KQYOtjGjFHQKL6L34-OljMKZ2oWPThYdWi_5uREYxqth3Zqs9nLmTmSueXgu0cs9yVwWwxW41M2mVIiJJrXlwQQdQNWnT0NbltMf6iqUJ68697DaUJiGO4Av3nP3-pLcp1OmzUVQ1NpEMjRNqWOu7q2huMj0piJ0z9j82PHiCR9ycNMwJfXhKciVIL3BDwy9ICjSBZvqJVC3HignZ_B0YgRFFuKC" alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white" />
                                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-[10px] font-bold flex items-center justify-center border-2 border-white text-on-secondary-container">+31</div>
                                </div>
                                <button className="bg-surface-container-highest hover:bg-primary hover:text-white text-on-surface px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300">
                                    Interested
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Workshop */}
                    <div className="flex-none w-[320px] md:w-[380px] snap-start">
                        <div className="glass-card p-4 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,63,221,0.04)] group hover:-translate-y-2 transition-all duration-500">
                            <div className="relative h-[400px] rounded-[2rem] overflow-hidden mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
                                    alt="Workshop Event"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center">
                                    <span className="text-xl font-bold text-primary leading-none">12</span>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">NOV</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/20 backdrop-blur-md text-white border border-white/20">
                                    <div className="flex items-center gap-2 text-xs font-medium opacity-90 mb-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        Innovation Hub
                                    </div>
                                    <h3 className="text-2xl font-bold leading-tight">Startup Pitch: Student Entrepreneurs</h3>
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-2 pb-2">
                                <div className="flex -space-x-2">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOkQOp4-LYexkCOF4Gvrs0dQ2t3zIKZiVX_WC6meGN0t4RETWjUdbGvZPjST0VPt9A_5jZDV-tTNWRX0W0sSjJP-2OouNDZN9LTrJyoATKRf4ZM_SWgGW3w5xpEBk-Ds1S1R3LCbWJdvlnX2I4_4H5XjnBOKiSbUtyCeY3G_AWo5b57GlFX4D-GAMZtZT60xRFKjFzzpP1b9jzIaFLCvTeMrZgKCUggy46KZf18SUsmiaUkH0COHhR9hjnktbBRNQrWL3OP2jWZD8V" alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white" />
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR15hpSyvIqrV5QOdWk-JRz6prhahBaXOI9NR-smkRRrz0Kh2nAVMJ3j8riSHBUeHxET0dTuNolymcSs-uSVwgnCz7XmZ7eqiOjBEbfqND4245EvaYjnnD2VmwBGEyrNK-fCqOUJIY7CCRdpwM5V-aLWgSGDdVxS41XRzBy3x0GsYcsC_dnjjA-7Dsv-Gbpzy3NEOXMr9MeuJwK8BKb0_mE9MN-FC0DU0QhkpKRgqbHcR4IT2SqA0SiqGGb4SheIFVMRwtBlv1d9J9" alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white" />
                                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-[10px] font-bold flex items-center justify-center border-2 border-white text-on-secondary-container">+65</div>
                                </div>
                                <button className="bg-surface-container-highest hover:bg-primary hover:text-white text-on-surface px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300">
                                    Interested
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Counter Section (Additional Aesthetic Depth) */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: "Active Students", value: "12k+", icon: "groups" },
                        { label: "Events Hosted", value: "450", icon: "event_available" },
                        { label: "Clubs & Societies", value: "85", icon: "diversity_3" },
                        { label: "Experience Rating", value: "4.9", icon: "grade" }
                    ].map((s, i) => (
                        <div
                            key={i}
                            className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/60 dark:border-slate-800 shadow-sm text-center group transition-all duration-500 hover:-translate-y-2 hover:bg-white dark:hover:bg-slate-800"
                        >
                            {/* Icon Container - Matching your Clients Say stats style */}
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary text-3xl mx-auto mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                                <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                            </div>

                            {/* Value */}
                            <h4 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                                {s.value}
                            </h4>

                            {/* Label */}
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default Events;
