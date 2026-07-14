// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";

// interface AvatarResultProps {
//   type: "human" | "pet";
// }

// export const AvatarResult = ({ type }: AvatarResultProps) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState(50); // Starts at 50% middle
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Handle Slider Mouse/Touch Movement
//   const handleMove = (clientX: number) => {
//     if (containerRef.current && (isDragging || type === "human")) { // Allowing click to move for demo simplicity
//       const rect = containerRef.current.getBoundingClientRect();
//       const x = clientX - rect.left;
//       const percent = (x / rect.width) * 100;
//       setPosition(Math.min(100, Math.max(0, percent)));
//     }
//   };

//   // Event Listeners
//   const onMouseDown = () => setIsDragging(true);
//   const onMouseUp = () => setIsDragging(false);
//   const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
//   const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

//   useEffect(() => {
//     window.addEventListener("mouseup", onMouseUp);
//     return () => window.removeEventListener("mouseup", onMouseUp);
//   }, []);

//   return (
//     <section className="w-full min-h-screen flex flex-col items-center pt-20 pb-16 px-4 sm:px-6 relative z-10 bg-[#020215]">
      
//       {/* --- Header --- */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-8 max-w-3xl"
//       >
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4 flex flex-wrap items-center justify-center gap-3">
//           Create Your <span className="text-[#D4AF37]">3D Avatar</span>
//           <span className="text-2xl sm:text-3xl">🖼️</span>
//         </h1>
//         <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6">
//           Upload a photo to automatically generate your digital avatar. Supports humans and animals. Customize style, colors, shape, and save to your profile.
//         </p>
        
//         {/* Action Buttons (Top) */}
//         <div className="flex flex-wrap justify-center gap-4">
//           <Link href={`/avatar/create/${type}`}>
//             <button className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(124,74,237,0.3)]">
//               Create Avatar
//             </button>
//           </Link>
//           <Link href="/memorials/gallery">
//             <button className="bg-[#2A2A3E] hover:bg-[#3A3A52] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all">
//               Explore now
//             </button>
//           </Link>
//         </div>
//       </motion.div>

//       {/* --- Image Slider Container --- */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//         className="w-full max-w-4xl relative rounded-3xl overflow-hidden aspect-[16/9] bg-[#1A1B31] border border-white/5 group"
//         ref={containerRef}
//         onMouseMove={onMouseMove}
//         onTouchMove={onTouchMove}
//         onMouseDown={onMouseDown}
//         style={{ userSelect: "none" }}
//       >
//         {/* 1. Left Side (2D Digital / Original) */}
//         <div 
//           className="absolute inset-0 z-10 overflow-hidden"
//           style={{ width: `${position}%` }}
//         >
//           <img 
//             src={type === "human" 
//               ? "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" // Human Left
//               : "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1000&auto=format&fit=crop" // Pet Left
//             } 
//             alt="Original" 
//             className="w-full h-full object-cover" 
//           />
//           {/* Label */}
//           <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs border border-white/10">
//             Digital
//           </div>
//         </div>

//         {/* 2. Right Side (3D Render) */}
//         <div className="absolute inset-0 z-0">
//           <img 
//             src={type === "human" 
//               ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" // Human Right (3D-ish)
//               : "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop" // Pet Right (3D-ish)
//             } 
//             alt="3D Render" 
//             className="w-full h-full object-cover" 
//           />
//           {/* Label */}
//           <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs border border-white/10">
//             3D Render
//           </div>
//         </div>

//         {/* 3. The White Handle / Dragger */}
//         <div 
//           className="absolute top-0 bottom-0 z-20 w-1 bg-white/30 cursor-ew-resize hover:bg-white/50 transition-colors"
//           style={{ left: `${position}%`, transform: "translateX(-50%)" }}
//         >
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
//             <div className="flex gap-1">
//               <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
//               <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
//             </div>
//           </div>
//         </div>
//       </motion.div>

//     </section>
//   );
// };

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface AvatarResultProps {
  type: "human" | "pet";
  originalImage?: string | null;
  upscaledImage?: string | null;
}

export const AvatarResult = ({ 
  type, 
  originalImage = null, 
  upscaledImage = null 
}: AvatarResultProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50); 
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback images if no processed image is provided
  const fallbackOriginal = type === "human" 
    ? "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1000&auto=format&fit=crop";

  const fallbackUpscaled = type === "human" 
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop";

  // Handle Slider Mouse/Touch Movement
  const handleMove = (clientX: number) => {
    if (containerRef.current && isDragging) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setPosition(Math.min(100, Math.max(0, percent)));
    }
  };

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center pt-20 pb-16 px-4 sm:px-6 relative z-10 bg-[#020215]">
      
      {/* --- Header --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 max-w-3xl"
      >
        <p className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4 flex flex-wrap items-center justify-center gap-3">
          Create Your <span className="text-[#D4AF37]">3D Avatar</span>
          <span className="text-2xl sm:text-3xl">🖼️</span>
        </p>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6">
          Upload a photo to automatically generate your digital avatar. Supports humans and animals. Customize style, colors, shape, and save to your profile.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={`/avatar/create/${type}`}>
            <button className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(124,74,237,0.3)]">
              Create Avatar
            </button>
          </Link>
          <Link href="/memorials/gallery">
            <button className="bg-[#2A2A3E] hover:bg-[#3A3A52] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all">
              Explore now
            </button>
          </Link>
        </div>
      </motion.div>

      {/* --- Image Slider Container --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-4xl relative rounded-3xl overflow-hidden aspect-[16/9] bg-[#1A1B31] border border-white/5 group"
        ref={containerRef}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseDown={onMouseDown}
        style={{ userSelect: "none" }}
      >
        {/* 1. Left Side (Original Image) */}
        <div 
          className="absolute inset-0 z-10 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img 
            src={originalImage || fallbackOriginal} 
            alt="Original" 
            className="w-full h-full object-cover" 
          />
          {/* Label */}
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs border border-white/10">
            Original
          </div>
        </div>

        {/* 2. Right Side (Processed / Enhanced Image) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={upscaledImage || fallbackUpscaled} 
            alt="Enhanced 3D Render" 
            className="w-full h-full object-cover" 
          />
          {/* Label */}
          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs border border-white/10">
            3D Enhanced
          </div>
        </div>

        {/* 3. The White Handle / Dragger */}
        <div 
          className="absolute top-0 bottom-0 z-20 w-1 bg-white/30 cursor-ew-resize hover:bg-white/50 transition-colors"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>

      <Link href="/avatar/studio">
  <button className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(124,74,237,0.3)]">
    Create Avatar
  </button>
</Link>

    </section>
  );
};