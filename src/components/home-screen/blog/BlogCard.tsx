import React from 'react';
import Image, { type StaticImageData } from 'next/image';

interface BlogCardProps {
    title: string;
    description: string;
    image: string | StaticImageData;
}

export default function BlogCard({ title, description, image }: BlogCardProps) {
    return (
        <div className="group bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(147,51,234,0.1)]">
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                {typeof image === 'string' ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                        <Image 
                            src={image} 
                            alt={title} 
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11072B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="px-6 pb-6 flex flex-col flex-grow pt-4">
                <div className="flex items-center gap-4 mb-4 text-xs sm:text-sm text-[#D2DC3C]">
                    <p>FEATURED</p>
                    <p>8 MIN READ</p>
                </div>

                <h3 className="text-xl font-normal text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors font-serif">
                    {title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed flex-grow">
                    {description}
                </p>

                <a 
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-4 transition-all flex items-center gap-2" 
                    href=""
                >
                    VIEW POST <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>
        </div>
    );
}