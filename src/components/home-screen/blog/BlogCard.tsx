import React from 'react';
import Image, { type StaticImageData } from 'next/image';

interface BlogCardProps {
    title: string;
    description: string;
    image: string | StaticImageData;
    variant?: 'featured' | 'standard';
}

export default function BlogCard({ title, description, image, variant = 'standard' }: BlogCardProps) {
    const isFeatured = variant === 'featured';

    return (
        <div className={`group bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(147,51,234,0.1)]`}>
            <div className={`relative ${isFeatured ? 'aspect-[4/4]' : 'aspect-[4/4]'} overflow-hidden mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20`}>
                {/* Image: support either string URLs or StaticImageData imports */}
                {typeof image === 'string' ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ) : (
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                        <Image src={image} alt={title} className="h-full w-full object-cover" fill />
                    </div>
                )}
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11072B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>


            <div>
                
            </div>


            <div className="px-6 pb-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-xs sm:text-sm text-[#D2DC3C]">
                    <p>FEATURED</p>
                    <p>8 MIN READ</p>
                </div>

                <h3 className={`${isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'} font-normal text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors font-serif`}>
                    {title}
                </h3>

                {/* Fixed: Show ALL content, no line-clamp, natural height */}
                <p className={`text-gray-400 ${isFeatured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} leading-relaxed `}>
                    {description}
                </p>

                <a className="text-purple-400 hover:text-purple-300 text-sm font-semibold mt-4 transition-colors" href="">
                    VIEW POST
                </a>
            </div>
        </div>
    );
}