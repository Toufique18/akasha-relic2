"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, Mic, PenLine, Move, Crown, Shirt, Glasses, User, 
  Image as ImageIcon, Zap, Play, Pause, RotateCcw, RotateCw, 
  Maximize2, Download, UploadCloud, Wand2
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function AvatarStudioPage() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("Edit");
  const [haloColor, setHaloColor] = useState("Gold");
  const [selectedOutfit, setSelectedOutfit] = useState("Blue");
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(15);
  
  // USER IMAGE STATE
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // CSS FILTER SLIDER STATES
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);

  // --- NEW: BACKGROUND COLOR STATE ---
  const [bgColor, setBgColor] = useState("#0B0C1E");

  // Timeline & Animation refs
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // --- IMAGE UPLOAD HANDLER ---
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null); 
        setBrightness(100); setContrast(100); setSaturation(100); setBlur(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  // --- CANVAS ENHANCEMENT LOGIC ---
  const applyCanvasEnhancement = () => {
    if (!originalImage) return;
    setIsProcessing(true);

    setTimeout(() => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) { setIsProcessing(false); return; }
        
        let w = img.width * 1.5, h = img.height * 1.5;
        if (w > 3840 || h > 3840) { const r = Math.min(3840/w, 3840/h); w = Math.round(w*r); h = Math.round(h*r); }
        else { w = Math.round(w); h = Math.round(h); }
        
        canvas.width = w; canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        const amount = 0.65, kEdge = -amount, kCenter = 1+4*amount;
        
        for (let y=1;y<h-1;y++) for (let x=1;x<w-1;x++) {
          const idx=(y*w+x)*4;
          for (let c=0;c<3;c++) {
            let val=data[idx+c]*kCenter+(data[idx-w*4+c]+data[idx+w*4+c]+data[idx-4+c]+data[idx+4+c])*kEdge;
            val=(val-128)*1.04+128;
            data[idx+c]=Math.max(0,Math.min(255,val));
          }
        }
        ctx.putImageData(new ImageData(data,w,h),0,0);
        setProcessedImage(canvas.toDataURL("image/png"));
        setIsProcessing(false);
      };
      img.src = originalImage;
    }, 1000);
  };

  // --- TIMELINE PLAY/PAUSE LOGIC ---
  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = performance.now();
      const animate = (time: number) => {
        if (!startTimeRef.current) return;
        const elapsed = (time - startTimeRef.current) / 3000;
        const newProgress = (elapsed % 1) * 90 + 5;
        setTimelineProgress(newProgress);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = null; }
    }
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isPlaying]);

  // HELPERS
  const haloColors: Record<string, string> = {
    Gold: "#D4AF37", White: "#FFFFFF", Rainbow: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)", Red: "#EF4444", Blue: "#3B82F6"
  };
  
  // NEW: Background Color Mapping
  const bgColorOptions: Record<string, string> = {
    Purple: "#0B0C1E", // Default dark
    White: "#FFFFFF",
    Blue: "#1E3A8A", 
    Red: "#991B1B",
    Rainbow: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)"
  };

  const frames = Array.from({ length: 20 }).map((_, i) => ({
    id: i, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&auto=format&fit=crop"
  }));

  return (
    <div className="min-h-screen bg-[#0B0C1E] text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[#020215]" />
      
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

      <div className="relative z-10 flex flex-col h-screen">
        {/* ================= TOP HEADER ================= */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0B0C1E]/80 backdrop-blur-sm shrink-0">
          <Link href="/avatar/create/human/result" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>My Own 3D Avatar</span>
          </Link>
        </header>

        {/* ================= 3-COLUMN GRID ================= */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* --- LEFT COLUMN: EDITOR TOOLS --- */}
          <aside className="w-full lg:w-[320px] xl:w-[360px] shrink-0 border-r border-white/5 overflow-y-auto p-4 space-y-6 bg-[#0B0C1E]/60 scrollbar-hide">
            
            {/* Tabs */}
            <div className="flex gap-2 rounded-xl bg-[#15162C] p-1">
              {["Edit", "Layer", "History"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === tab ? 'bg-[#7C4AED] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Tool Card: Edit Voice */}
            <div className="bg-[#15162C] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 text-gray-300 text-xs font-medium">
                <Mic className="w-4 h-4" />
                <span>Edit Voice</span>
              </div>
              <div className="flex gap-2 mb-2">
                <button className="flex-1 bg-[#7C4AED] text-white text-[10px] py-1.5 rounded-lg">Text to voice</button>
                <button className="flex-1 bg-[#1A1B31] text-gray-400 text-[10px] py-1.5 rounded-lg hover:bg-white/5">Upload Voice</button>
              </div>
              <textarea className="w-full bg-[#0B0C1E] border border-white/5 rounded-lg p-2 min-h-[40px] text-gray-400 text-xs placeholder-gray-500 focus:outline-none focus:border-[#7C4AED] resize-none" placeholder="Type your voice text and style..." />
            </div>

            {/* Tool Card: Edit Image */}
            <div className="bg-[#15162C] border border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-300 text-xs font-medium">
                  <PenLine className="w-4 h-4" />
                  <span>Edit Image</span>
                </div>
              </div>

              {!originalImage ? (
                <div 
                  onClick={triggerUpload}
                  className="w-full bg-[#0B0C1E] border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#7C4AED] transition-all group"
                >
                  <UploadCloud className="w-8 h-8 text-gray-500 group-hover:text-[#7C4AED] transition-colors mb-2" />
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Click to Upload Photo</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-full aspect-video bg-[#0B0C1E] rounded-lg overflow-hidden border border-white/5 relative">
                    <img src={processedImage || originalImage} alt="Avatar" className="w-full h-full object-contain" />
                    {isProcessing && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs text-[#7C4AED]">Processing AI Enhance...</div>}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-[10px] text-gray-400"><span>Brightness</span><span>{brightness}%</span></div>
                    <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full h-1 bg-[#1A1B31] rounded-lg appearance-none cursor-pointer accent-[#7C4AED]" />
                    
                    <div className="flex items-center justify-between text-[10px] text-gray-400"><span>Contrast</span><span>{contrast}%</span></div>
                    <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full h-1 bg-[#1A1B31] rounded-lg appearance-none cursor-pointer accent-[#7C4AED]" />
                    
                    <div className="flex items-center justify-between text-[10px] text-gray-400"><span>Saturation</span><span>{saturation}%</span></div>
                    <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="w-full h-1 bg-[#1A1B31] rounded-lg appearance-none cursor-pointer accent-[#7C4AED]" />
                  </div>

                  <div className="flex gap-2">
                    <button onClick={triggerUpload} className="flex-1 bg-[#1A1B31] hover:bg-white/5 text-white text-[10px] py-2 rounded-lg transition-colors">Replace</button>
                    <button onClick={applyCanvasEnhancement} disabled={isProcessing} className="flex-1 bg-[#7C4AED] hover:bg-[#6D39D2] text-white text-[10px] py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1">
                      {isProcessing ? "..." : <><Wand2 className="w-3 h-3" /> AI Enhance</>}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tool Card: Memorial Halo */}
            <div className="bg-[#15162C] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 text-gray-300 text-xs font-medium">
                <Crown className="w-4 h-4" />
                <span>Memorial Halo</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.keys(haloColors).map((color) => (
                  <button key={color} onClick={() => setHaloColor(color)} className={`px-3 py-1 text-[10px] rounded-lg transition-all ${haloColor === color ? 'bg-[#7C4AED] text-white shadow-md' : 'bg-[#1A1B31] text-gray-400 hover:text-white'}`}>
                    {color}
                  </button>
                ))}
              </div>
              <textarea className="w-full bg-[#0B0C1E] border border-white/5 rounded-lg p-2 min-h-[40px] text-gray-400 text-xs placeholder-gray-500 focus:outline-none focus:border-[#7C4AED] resize-none" placeholder="Type your memorial halo..." />
            </div>

            {/* === NEW TOOL CARD: Background Environment === */}
            <div className="bg-[#15162C] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 text-gray-300 text-xs font-medium">
                <ImageIcon className="w-4 h-4" />
                <span>Background Environment</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.keys(bgColorOptions).map((color) => (
                  <button 
                    key={color} 
                    onClick={() => setBgColor(bgColorOptions[color])} 
                    className={`px-3 py-1 text-[10px] rounded-lg transition-all ${bgColor === bgColorOptions[color] ? 'bg-[#7C4AED] text-white shadow-md' : 'bg-[#1A1B31] text-gray-400 hover:text-white'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* --- CENTER COLUMN: 3D VIEWER & TIMELINE --- */}
          <main className="flex-1 flex flex-col relative bg-[#020215] overflow-hidden">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#020215] border border-white/5 shadow-2xl">
                    
                    {/* USER SELECTABLE BACKGROUND */}
                    <div 
                      className="absolute inset-0 transition-colors duration-500"
                      style={{ 
                        background: bgColor === "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" 
                          ? bgColor 
                          : bgColor
                      }} 
                    />
                    
                    {/* INTERACTIVE CENTER IMAGE */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-[80%] w-auto max-w-[80%] aspect-square rounded-2xl relative shadow-2xl flex items-center justify-center overflow-hidden">
                        {originalImage ? (
                          <img 
                            src={processedImage || originalImage} 
                            alt="Avatar"
                            className="w-full h-full object-cover"
                            style={{
                              filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#0B0C1E]/50 backdrop-blur-sm text-gray-300 text-[10px] text-center px-4">
                            Upload a photo <br/> to start editing
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Halo */}
                    <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[150px] h-[15px] rounded-full border-2 transition-all duration-500 blur-[2px]" style={{ borderColor: haloColors[haloColor], boxShadow: `0 0 30px ${haloColors[haloColor]}80` }} />

                    {/* Center Floating Controls */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30"><RotateCcw className="w-4 h-4" /></button>
                      <button className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30"><Maximize2 className="w-4 h-4" /></button>
                      <button className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30"><RotateCw className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline & Controls */}
            <div className="h-[160px] sm:h-[180px] border-t border-white/5 bg-[#0B0C1E]/80 backdrop-blur-sm p-4 flex flex-col gap-3 relative">
              <div className="flex items-center justify-center gap-4">
                <button className="text-gray-400 hover:text-white"><RotateCcw className="w-4 h-4" /></button>
                <div className="flex items-center gap-1 bg-[#1A1B31] rounded-full px-2 py-1 border border-white/5">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 text-white hover:bg-white/5 rounded-full">
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-white rounded-full"><RotateCw className="w-3 h-3" /></button>
                </div>
                <button className="text-gray-400 hover:text-white"><RotateCw className="w-4 h-4" /></button>
              </div>

              <div className="relative flex-1 flex items-end gap-1 overflow-x-auto pb-2 scrollbar-hide">
                <div className="absolute bottom-2 left-0 right-0 h-[2px] bg-white/10" />
                <motion.div className="absolute bottom-0 w-1 h-8 bg-white rounded-full shadow-lg z-10" animate={{ left: `${timelineProgress}%` }} transition={{ type: "tween", duration: 0.05 }} />
                {frames.map((frame, i) => (
                  <div key={i} className={`relative flex-shrink-0 w-8 h-8 rounded-full border border-white/5 transition-colors flex items-center justify-center ${Math.abs((timelineProgress / 100) * 20 - i) < 1 ? 'border-[#7C4AED] bg-[#7C4AED]/20 scale-110' : 'bg-[#1A1B31] opacity-50'}`}>
                    <img src={frame.image} alt="Frame" className="w-full h-full object-cover rounded-full" />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 right-6 flex items-center gap-2">
                <button className="bg-[#1A1B31] p-1.5 rounded-md text-gray-400 hover:text-white"><RotateCcw className="w-3.5 h-3.5" /></button>
                <button className="bg-[#1A1B31] p-1.5 rounded-md text-gray-400 hover:text-white"><Zap className="w-3.5 h-3.5" /></button>
                <button className="bg-[#1A1B31] p-1.5 rounded-md text-gray-400 hover:text-white"><Download className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </main>

          {/* --- RIGHT COLUMN --- */}
          <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0 border-l border-white/5 overflow-y-auto p-4 space-y-6 bg-[#0B0C1E]/60 scrollbar-hide">
            <div className="flex gap-2">
              <button className="flex-1 bg-[#7C4AED] hover:bg-[#6D39D2] text-white text-xs py-2 rounded-lg font-medium">Asset</button>
              <button className="flex-1 bg-[#1A1B31] hover:bg-white/5 text-gray-300 text-xs py-2 rounded-lg font-medium">Share & Export</button>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 border-b border-white/5 pb-2">
              <User className="w-3 h-3" />
              <span>Avatar Customization</span>
            </div>
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-white/80">Clothing</span>
              </div>
              <div className="flex gap-3">
                <div onClick={() => setSelectedOutfit("Blue")} className={`flex-1 aspect-square rounded-lg flex items-center justify-center border transition-all cursor-pointer ${selectedOutfit === 'Blue' ? 'bg-[#7C4AED]/20 border-[#7C4AED]' : 'bg-[#1A1B31] border-white/5'}`}>
                  <Shirt className="w-6 h-6 text-[#A78BFA]" />
                </div>
                <div onClick={() => setSelectedOutfit("Red")} className={`flex-1 aspect-square rounded-lg flex items-center justify-center border transition-all cursor-pointer ${selectedOutfit === 'Red' ? 'bg-[#7C4AED]/20 border-[#7C4AED]' : 'bg-[#1A1B31] border-white/5'}`}>
                  <Shirt className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1 aspect-square bg-[#1A1B31] rounded-lg flex flex-col items-center justify-center border border-white/5 hover:border-[#7C4AED] cursor-pointer">
                  <ImageIcon className="w-4 h-4 text-gray-400 mb-1" />
                  <span className="text-[8px] text-gray-400">Get More</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}