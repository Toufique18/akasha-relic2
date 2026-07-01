"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import BlogCard from './BlogCard';

import image1 from '@/assets/home/Avatar1.svg';
import image2 from '@/assets/home/Avatar2.svg';
import image3 from '@/assets/home/Avatar3.svg';
import image4 from '@/assets/home/Avatar4.svg';
import Image from 'next/image';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export default function Blog() {
    const posts = [
        {
            id: 1,
            title: "Creating Meaningful Digital Legacies Through Avatars",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem lit sed risus amet lacinia. Aliquam in elementum tellus...",
            image: "/vr.png",
        },
        {
            id: 2,
            title: "The Future of Digital Memorial Experiences",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, entum tellus...",
            image: image2,
        },
        {
            id: 3,
            title: "AR & VR in Memory Preservation",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, entum tellus...",
            image: image3,
        },
        {
            id: 4,
            title: "Building Human Connections in",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, entum tellus...",
            image: image4,
        }
    ];

    return (
        <section id="blog" className="lg:py-20 py-10 px-6 sm:px-12 lg:px-24 bg-[#02021F]">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <motion.div 
                    className="space-y-6 flex flex-col md:flex-row md:space-y-0 md:space-x-6 mb-4 lg:mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex-1">
                        <motion.h2 
                            className="text-5xl sm:text-3xl md:text-6xl font-normal font-serif text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <span className="text-white">Metaverse </span>
                            <motion.span 
                                className="text-[#C5FF41] italic font-serif inline-block"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Blog
                            </motion.span>
                        </motion.h2>
                        <motion.p 
                            className="text-gray-400 text-base sm:text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Innovative concepts and emerging trends are reshaping our perceptions of digital legacy. As technology evolves, we are rethinking how our online presence impacts our identity and memory. From social media profiles to digital assets, the way we manage and curate our digital footprint is becoming increasingly significant. This shift encourages us to consider the long-term implications of our online activities and how they contribute to our legacy in the digital age.
                        </motion.p>
                    </div> 
                    <motion.div 
                        className="flex items-end"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <motion.button 
                            className="px-6 py-3 flex items-center gap-1 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white text-sm sm:text-sm font-medium tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            See all post
                            <span className="text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right">
                                    <path d="M5 12h14"/>
                                    <path d="m12 5 7 7-7 7"/>
                                </svg>
                            </span>
                        </motion.button>
                    </motion.div> 
                </motion.div>

                {/* Featured Post */}
                <motion.div 
                    className="group bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden h-full flex flex-col md:flex-row transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(147,51,234,0.1)] mb-5"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    whileHover={{ 
                        borderColor: "rgba(147, 51, 234, 0.3)",
                        boxShadow: "0 8px 32px rgba(147, 51, 234, 0.1)"
                    }}
                >
                    <motion.div 
                        className="relative overflow-hidden md:w-1/2 h-80 md:h-auto aspect-[5/3]"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src={image1}
                            alt="Featured Post"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </motion.div>

                    <motion.div 
                        className="md:w-1/2 p-6 flex flex-col justify-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="flex items-center gap-4 mb-4 text-xs sm:text-sm text-[#D2DC3C]">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                FEATURED
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                            >
                                8 MIN READ
                            </motion.p>
                        </div>

                        <motion.h3 
                            className="font-normal text-white mb-4 text-2xl sm:text-3xl md:text-4xl leading-tight group-hover:text-purple-400 transition-colors font-serif"
                            whileHover={{ color: "#a78bfa" }}
                        >
                            Creating Meaningful Digital Legacies Through Avatars
                        </motion.h3>

                        <motion.p 
                            className="text-gray-400 leading-relaxed text-sm sm:text-base"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Innovative concepts and emerging trends are reshaping our perceptions of digital legacy. As technology evolves, we are rethinking how our online presence impacts our identity and memory. From social media profiles to digital assets, the way we manage and curate our digital footprint is becoming increasingly significant. This shift encourages us to consider the long-term implications of our online activities and how they contribute to our legacy in the digital age.
                        </motion.p>

                        <motion.a 
                            className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-4 transition-colors flex items-center gap-2"
                            href=""
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            READ POST 
                            <span className="text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right">
                                    <path d="M5 12h14"/>
                                    <path d="m12 5 7 7-7 7"/>
                                </svg>
                            </span>
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Grid Posts */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {posts.slice(1).map((post) => (
                        <motion.div key={post.id} variants={itemVariants}>
                            <BlogCard
                                title={post.title}
                                description={post.description}
                                image={post.image}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}