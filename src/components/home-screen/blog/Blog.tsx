import React from 'react';
import BlogCard from './BlogCard';

import image1 from '@/assets/home/Avatar1.svg';
import image2 from '@/assets/home/Avatar2.svg';
import image3 from '@/assets/home/Avatar3.svg';
import image4 from '@/assets/home/Avatar4.svg';
import Image from 'next/image';

export default function Blog() {
    const posts = [
        {
            id: 1,
            title: "Creating Meaningful Digital Legacies Through Avatars",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem lit sed risus amet lacinia. Aliquam in elementum tellus...",
            image: "/vr.png",
            variant: "featured" as const
        },
        {
            id: 2,
            title: "The Future of Digital Memorial Experiences",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, entum tellus...",
            image: image2,
            variant: "standard" as const
        },
        {
            id: 3,
            title: "AR & VR in Memory Preservation",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, entum tellus...",
            image: image3,
            variant: "standard" as const
        },
        {
            id: 4,
            title: "Building Human Connections in",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, entum tellus...",
            image: image4,
            variant: "standard" as const
        }
    ];

    return (
        <section id="blog" className="lg:py-20 py-10 px-6 sm:px-12 lg:px-24 bg-[#02021F]">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="space-y-6 flex flex-col md:flex-row md:space-y-0 md:space-x-6 mb-0 lg:mb-12">
                    <div className="flex-1">
                        <h2 className="text-5xl sm:text-3xl md:text-6xl font-normal font-serif text-white mb-6">
                            <span className="text-white">Metaverse </span>
                            <span className="text-[#C5FF41] italic font-serif">Blog</span>
                        </h2>
                        <p className="text-gray-400 text-base sm:text-lg">
                            Innovative concepts and emerging trends are reshaping our perceptions of digital legacy. As technology evolves, we are rethinking how our online presence impacts our identity and memory. From social media profiles to digital assets, the way we manage and curate our digital footprint is becoming increasingly significant. This shift encourages us to consider the long-term implications of our online activities and how they contribute to our legacy in the digital age.
                        </p>
                    </div>
                    <div className="flex items-end">
                        <button className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap">
                            See all post
                            <span className="text-xl">→</span>
                        </button>
                    </div>
                </div>

                {/* Featured Post - Left Column */}
                {/* <div className="lg:col-span-5">
            <BlogCard 
              title={posts[0].title}
              description={posts[0].description}
              image={posts[0].image}
              variant={posts[0].variant}
            />
          </div> */}
                <div className={`group bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden h-full flex transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(147,51,234,0.1)] mb-5`}>
                    <div className={`relative overflow-hidden h-80 w-full`}>
                        <Image
                            src={image1}
                            alt="Featured Post"
                            className='h-full w-full object-cover'
                            fill // Use fill instead of className for Next.js Image
                        />
                    </div>


                    <div>
                        <div className="px-6 py-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 mb-4 text-xs sm:text-sm text-[#D2DC3C]">
                                <p>FEATURED</p>
                                <p>8 MIN READ</p>
                            </div>

                            <h3 className={` font-normal text-white mb-4 text-[32px] leading-tight group-hover:text-purple-400 transition-colors font-serif`}>
                                Creating Meaningful Digital Legacies Through Avatars
                            </h3>

                            {/* Fixed: Show ALL content, no line-clamp, natural height */}
                            <p className={`text-gray-400 leading-relaxed `}>
                                Innovative concepts and emerging trends are reshaping our perceptions of digital legacy. As technology evolves, we are rethinking how our online presence impacts our identity and memory. From social media profiles to digital assets, the way we manage and curate our digital footprint is becoming increasingly significant. This shift encourages us to consider the long-term implications of our online activities and how they contribute to our legacy in the digital age.
                            </p>

                            <a className="text-purple-400 hover:text-purple-300 text-sm font-semibold mt-4 transition-colors" href="">
                                READ POST
                            </a>
                        </div>
                    </div>



                </div>

                {/* Grid with auto rows and items-stretch */}
                <div className="grid grid-cols-1  lg:items-stretch">



                    {/* Right Column */}
                    <div className="lg:col-span-7 flex flex-col gap-8">



                        {/* Smaller Posts Grid - will stretch to fill remaining space */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
                            {posts.slice(1).map((post) => (
                                <div key={post.id} className="h-full">
                                    <BlogCard
                                        title={post.title}
                                        description={post.description}
                                        image={post.image}
                                        variant={post.variant}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}