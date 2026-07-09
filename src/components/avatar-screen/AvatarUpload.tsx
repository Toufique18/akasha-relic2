"use client";

import { motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

export const AvatarUpload = () => {
  // State to hold the uploaded image preview
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Only the Face Photo is active in this version
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center py-16 px-4 sm:px-6 relative z-10">
      {/* Hidden standard file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* --- Header --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 max-w-3xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4 flex flex-wrap items-center justify-center gap-3">
          Create Your <span className="text-[#D4AF37]">3D Avatar</span>
          <span className="text-2xl sm:text-3xl">🖼️</span>
        </h1>
      </motion.div>

      {/* --- Dashed Border Container --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-4xl bg-[#15162C]/30 border-2 border-dashed border-white/20 rounded-3xl p-8 sm:p-12"
      >
        <h2 className="text-center text-white text-xl sm:text-2xl font-serif mb-10">
          Upload Photo 
        </h2>   

        {/* --- 5 Upload Grid Boxes --- */}
        <div className="gap-6 mb-6 flex justify-center">
          
          {/* 1. Face Photo (ACTIVE) */}
          <motion.div
            whileHover={{ scale: 1.03, borderColor: "#7C4AED" }}
            onClick={triggerFileInput}
            className=" bg-[#1A1B31] border-2 border-white/10 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group"
          >
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded Face" className="w-full h-full object-cover absolute inset-0" />
            ) : (
              <>
                <Camera className="w-10 h-10 text-white/70 mb-3 group-hover:text-[#A78BFA] transition-colors " />
                <span className="text-white text-sm font-medium px-2">Upload Face Photo</span>
              </>
            )} 
            {/* Hover Glow Ring */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#7C4AED] rounded-xl transition-all pointer-events-none" />
          </motion.div>

          {/* 2. Front Side Photo (DISABLED PLACEHOLDER) */}
          {/* <div className="col-span-1 sm:col-span-1 bg-[#1A1B31]/50 border border-white/5 rounded-xl aspect-square flex flex-col items-center justify-center cursor-not-allowed opacity-60">
            <Camera className="w-10 h-10 text-gray-500 mb-3" />
            <span className="text-gray-500 text-sm font-medium">Upload Front Side Photo</span>
          </div> */}

          {/* 3. Back Side Photo (DISABLED PLACEHOLDER) */}
          {/* <div className="col-span-1 sm:col-span-1 bg-[#1A1B31]/50 border border-white/5 rounded-xl aspect-square flex flex-col items-center justify-center cursor-not-allowed opacity-60">
            <Camera className="w-10 h-10 text-gray-500 mb-3" />
            <span className="text-gray-500 text-sm font-medium">Upload Back Side Photo</span>
          </div> */}

          {/* 4. Left Side Photo (DISABLED PLACEHOLDER) */}
          {/* <div className="col-span-1 sm:col-span-1 bg-[#1A1B31]/50 border border-white/5 rounded-xl aspect-square flex flex-col items-center justify-center cursor-not-allowed opacity-60">
            <Camera className="w-10 h-10 text-gray-500 mb-3" />
            <span className="text-gray-500 text-sm font-medium">Upload Left Side Photo</span>
          </div> */}

          {/* 5. Right Side Photo (DISABLED PLACEHOLDER) */}
          {/* <div className="col-span-1 sm:col-span-1 bg-[#1A1B31]/50 border border-white/5 rounded-xl aspect-square flex flex-col items-center justify-center cursor-not-allowed opacity-60">
            <Camera className="w-10 h-10 text-gray-500 mb-3" />
            <span className="text-gray-500 text-sm font-medium">Upload Right Side Photo</span>
          </div> */}
        </div>

        {/* --- Action Button --- */}
        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(124,74,237,0.4)" }}
            whileTap={{ scale: 0.95 }}
            // Only enable if an image is uploaded
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-medium transition-all ${
              uploadedImage 
                ? 'bg-[#7C4AED] hover:bg-[#6D39D2] text-white shadow-[0_0_15px_rgba(124,74,237,0.2)] cursor-pointer' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => uploadedImage && alert("Generating Avatar from Face Photo...")}
          >
            <Sparkles className="w-4 h-4" />
            Generate Avatar
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
};