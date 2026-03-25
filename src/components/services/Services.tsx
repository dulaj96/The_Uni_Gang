import React from 'react';
import {
  LuLayoutDashboard,
  LuSmartphone,
  LuVideo,
  LuSearch,
  LuCheck,
  LuPalette
} from 'react-icons/lu';

interface ServiceItem {
  id: number;
  title: string;
  image: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  buttonText: string;
  isReversed: boolean;
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: 'Web Development',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    description: 'We build high-performance, responsive websites using modern frameworks like React and Next.js to ensure your business stands out in the digital landscape.',
    icon: <LuLayoutDashboard />,
    features: ['Custom Web Applications', 'E-commerce Solutions', 'Performance Optimization', 'Responsive Design'],
    buttonText: 'Request Project',
    isReversed: false
  },
  {
    id: 2,
    title: 'Mobile App Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    description: 'Our team specializes in creating intuitive iOS and Android applications using React Native, providing a seamless user experience across all devices.',
    icon: <LuSmartphone />,
    features: ['Cross-platform Apps', 'UI/UX Design', 'App Store Optimization', 'API Integration'],
    buttonText: 'Request Project',
    isReversed: true
  },
  {
    id: 3,
    title: 'SEO Services',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=800&auto=format&fit=crop',
    description: 'Drive organic traffic to your platform with our data-driven SEO strategies. We help you rank higher on search engines and reach your target audience effectively.',
    icon: <LuSearch />,
    features: ['Keyword Research', 'Technical SEO Audits', 'On-page Optimization', 'Backlink Building'],
    buttonText: 'Request Project',
    isReversed: false
  },
  {
    id: 4,
    title: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
    description: 'From branding to digital assets, our creative designers craft visual identities that capture your brand essence and engage your customers.',
    icon: <LuPalette />,
    features: ['Logo & Branding', 'Social Media Graphics', 'Print Design', 'Marketing Material'],
    buttonText: 'Request Project',
    isReversed: true
  },
  {
    id: 5,
    title: 'Video Production',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    description: 'Professional video production and cinematic editing services to tell your story. We create high-quality promotional videos and motion graphics.',
    icon: <LuVideo />,
    features: ['Professional Video Editing', 'Motion Graphics', 'Cinematic Shooting', 'Social Media Shorts'],
    buttonText: 'Request Project',
    isReversed: false
  }
];

const Services = () => {
  return (
    <section id="services" className="bg-white dark:bg-slate-950 font-sans overflow-x-hidden">

      {/* --- Header Section --- */}
      <section className="text-white py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
            Our Digital Services
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed font-light">
            High-impact IT solutions designed specifically for the modern system ecosystem.
          </p>
        </div>
      </section>

      {/* --- Services Loop --- */}
      <main>
        {servicesData.map((service, index) => (
          <section
            key={service.id}
            className={`py-20 border-b border-gray-100 dark:border-gray-800 ${index % 2 !== 0 ? 'bg-gray-50 dark:bg-gray-900/30' : ''
              }`}
          >
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Image / Icon Area */}
              <div className={`lg:col-span-5 flex justify-center ${service.isReversed ? 'lg:order-2' : ''}`}>
                <div className="relative group/img size-64 md:size-80 transition-transform hover:scale-105 duration-500">
                  <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/20 group-hover/img:border-[#d4af37]/50 transition-colors duration-500"></div>
                  <div className="absolute inset-4 rounded-full overflow-hidden bg-blue-50 dark:bg-gray-800/50 flex items-center justify-center shadow-xl">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                      />
                    ) : (
                      // Fallback icon
                      <div className="text-7xl text-blue-600">
                        {service.icon}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#0a1432]/20 group-hover/img:bg-transparent transition-colors duration-500"></div>
                  </div>

                  {/* Floating Small Icon Button */}
                  <div className="absolute bottom-4 right-4 bg-white dark:bg-[#0a1432] p-4 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 z-10 group-hover/img:rotate-12 transition-transform text-blue-600 text-2xl flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className={`lg:col-span-7 ${service.isReversed ? 'lg:order-1' : ''}`}>
                <h2 className="text-3xl font-bold mb-6 text-[#0a1432] dark:text-white flex items-center gap-4">
                  <span className="w-8 h-1 bg-[#d4af37] rounded-full"></span>
                  {service.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-400">
                      <LuCheck className="text-[#d4af37] text-xl" />
                      <span className="text-sm md:text-base font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <a
                  href="#contact-form"
                  className="inline-block text-center bg-[#d4af37] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#c4a02d] transition-all transform hover:-translate-y-1 shadow-md uppercase tracking-wider text-sm cursor-pointer"
                >
                  {service.buttonText}
                </a>
              </div>

            </div>
          </section>
        ))}
      </main>
    </section>
  );
};

export default Services;