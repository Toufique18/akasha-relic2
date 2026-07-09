"use client";

import { motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const AvatarUpload = () => {
    // State to hold the uploaded image preview
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
        }
    };
    const router = useRouter();

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
                <p className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4 flex flex-wrap items-center justify-center gap-3">
                    Create Your <span className="text-[#D4AF37]">3D Avatar</span>
                    <span className="text-2xl sm:text-3xl">🖼️</span>
                </p>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                    Upload a clear photo of your face. Our AI will transform it into a stunning 3D avatar.
                </p>
            </motion.div>

            {/* --- Dashed Border Container --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-4xl bg-[#15162C]/30 border-2 border-dashed border-white/20 rounded-3xl p-8 sm:p-12 flex flex-col items-center"
            >
                <h2 className="text-center text-white text-xl sm:text-2xl font-serif mb-8">
                    Upload Your Photo
                </h2>

                {/* --- Single Centered Upload Box --- */}
                <motion.div
                    whileHover={{ scale: 1.03, borderColor: "#7C4AED", boxShadow: "0 0 30px rgba(124,74,237,0.2)" }}
                    onClick={triggerFileInput}
                    className="w-full max-w-[320px] aspect-square bg-[#1A1B31] border-2 border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group"
                >
                    {uploadedImage ? (
                        <>
                            <img src={uploadedImage} alt="Uploaded Face" className="w-full h-full object-cover absolute inset-0" />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                Click to change
                            </div>
                        </>
                    ) : (
                        <>
                            <Camera className="w-12 h-12 text-white/70 mb-3 group-hover:text-[#A78BFA] transition-colors" />
                            <span className="text-white text-base font-medium px-2 text-center">Upload Face Photo</span>
                            <span className="text-gray-400 text-[10px] mt-1">Click to browse</span>
                        </>
                    )}
                    {/* Hover Glow Ring */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#7C4AED] rounded-2xl transition-all pointer-events-none" />
                </motion.div>

                {/* --- Action Button --- */}
                <div className="flex justify-center mt-10">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(124,74,237,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-medium transition-all ${uploadedImage
                                ? 'bg-[#7C4AED] hover:bg-[#6D39D2] text-white shadow-[0_0_15px_rgba(124,74,237,0.2)] cursor-pointer'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        onClick={() => {
  if (uploadedImage) {
    // Trigger the image processing logic here
    // ... (Your existing applyCanvasEnhancement logic)
    
    // Instead of alert, we navigate to the result page passing the image data
    // NOTE: For large images, it's better to store these in LocalStorage or a state management library like Redux.
    // Passing via URL is good for demo purposes. We convert to Base64 for URL safety.
    const originalBase64 = encodeURIComponent(uploadedImage);
    
    // Simulating the enhanced image result from your canvas logic
    // In reality, your canvas logic should output a dataURL, and you pass that here.
    const upscaledBase64 = encodeURIComponent(uploadedImage); // Replace this with your actual processed Canvas output

    router.push(`/avatar/create/human/result?orig=${originalBase64}&enhanced=${upscaledBase64}`);
  }
}}
                    >
                        <Sparkles className="w-4 h-4" />
                        Generate Avatar
                    </motion.button>
                </div>

            </motion.div>
        </section>
    );
};