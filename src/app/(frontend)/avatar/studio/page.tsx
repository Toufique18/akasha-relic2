"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mic,
  Image as ImageIcon,
  Play,
  Pause,
  Download,
  UploadCloud,
  Video,
  Volume2,
  VolumeX,
  Sparkles,
  Loader2,
  CheckCircle2,
  FileVideo,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getStoredToken } from "@/utils/tokenHandler";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const DEFAULT_AVATAR_IMG =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop";

const PRESET_AVATARS = [
  {
    name: "Elena",
    role: "Female",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "David",
    role: "Male",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Arthur",
    role: "Senior",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Maya",
    role: "Portrait",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  },
];

const VOICE_OPTIONS = [
  { id: "049413e41c334753984c294d694afb5c", name: "👨 Male (EN) - Lucian (Natural & Conversational)", gender: "Male", lang: "EN" },
  { id: "3195f3da04c94984a0a77a4b757c8119", name: "👩 Female (EN) - Elowen (Warm & Soothing)", gender: "Female", lang: "EN" },
  { id: "41f17b4ebd334ac99a91c2aada5f86d7", name: "👩 Female (EN) - Cecily (Warm & Friendly)", gender: "Female", lang: "EN" },
  { id: "0ff4cc4fcd2245218cb78607d7c1af44", name: "👨 Male (বাংলা) - Sadachbia (বাংলা পুরুষ কণ্ঠ)", gender: "Male", lang: "BN" },
  { id: "10a50e2dc5bf432b8ca29f3ffd31c416", name: "👩 Female (বাংলা) - Autonoe (বাংলা নারী কণ্ঠ)", gender: "Female", lang: "BN" },
];

const PRESET_SCRIPTS = [
  "Hello, I am living forever inside Akasha Relic. My memories and voice will be preserved here across time.",
  "Always remember that true legacy is not what we leave behind, but who we inspire.",
  "আমি সবসময় তোমাদের সাথে আছি। এই মেমোরির মাঝে আমি চিরকাল বেঁচে থাকব।",
];

function AvatarStudioContent() {
  const searchParams = useSearchParams();

  // IMAGE STATE
  const [originalImage, setOriginalImage] = useState<string | null>(DEFAULT_AVATAR_IMG);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === HEYGEN TALKING AVATAR VIDEO STATE ===
  const [scriptText, setScriptText] = useState(
    "Hello! I am your 3D digital persona in Akasha. My memories and voice live forever here."
  );
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[0].id);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videoStatusText, setVideoStatusText] = useState("");
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"photo" | "video">("photo");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setGeneratedVideoUrl(null);
        setViewMode("photo");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // 1. Check if an image was passed via sessionStorage (from AvatarUpload or Gallery)
    try {
      const stored = sessionStorage.getItem("akasha_avatar_photo");
      if (stored) {
        setOriginalImage(stored);
        sessionStorage.removeItem("akasha_avatar_photo");
        return;
      }
    } catch (e) {
      console.warn("Could not read sessionStorage:", e);
    }

    // 2. Fallback to URL searchParams
    const imgParam = searchParams.get("img");
    if (imgParam) {
      try {
        setOriginalImage(decodeURIComponent(imgParam));
      } catch {
        setOriginalImage(imgParam);
      }
    }
  }, [searchParams]);

  const triggerUpload = () => fileInputRef.current?.click();

  // === GENERATE HEYGEN TALKING AVATAR VIDEO ===
  const handleGenerateVideo = async () => {
    if (!scriptText.trim()) {
      toast.error("Please enter what the avatar should speak.");
      return;
    }

    let currentImg = originalImage;
    if (!currentImg) {
      toast.error("Please upload or choose an avatar photo.");
      return;
    }

    // Convert blob: or local URLs (http://localhost, relative /) to Base64 data URL
    if (
      currentImg.startsWith("blob:") ||
      currentImg.startsWith("http://localhost") ||
      currentImg.startsWith("http://127.0.0.1") ||
      currentImg.startsWith("/")
    ) {
      try {
        const blobResp = await fetch(currentImg);
        const blob = await blobResp.blob();
        currentImg = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (convErr) {
        console.error("Failed to convert image to data URL:", convErr);
      }
    }

    setIsGeneratingVideo(true);
    setGenerationProgress(10);
    setVideoStatusText("Initiating HeyGen AI animation pipeline...");

    try {
      // 1. Call Backend API
      const res = await fetch(`${API_BASE_URL}/avatar/generate-video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: currentImg,
          script_text: scriptText,
          voice_id: selectedVoice,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.detail || data.error || "Failed to start video generation");
      }

      const videoId = data.video_id;
      setVideoStatusText("AI is synthesizing voice & generating talking avatar...");
      setGenerationProgress(25);

      // Local progress ticker for smooth visual UX while waiting for single response
      let simProgress = 25;
      const progressTimer = setInterval(() => {
        simProgress = Math.min(simProgress + 7, 92);
        setGenerationProgress(simProgress);
        if (simProgress < 50) {
          setVideoStatusText("Synthesizing neural audio & facial landmarks...");
        } else if (simProgress < 80) {
          setVideoStatusText("Rendering lip-sync movements & 3D head poses...");
        } else {
          setVideoStatusText("Finalizing high-definition video rendering...");
        }
      }, 3500);

      // 2. Single Wait-Video Request (Server-Side wait — NO repeated browser polling!)
      try {
        const waitRes = await fetch(`${API_BASE_URL}/avatar/wait-video/${videoId}`);
        const waitData = await waitRes.json();
        clearInterval(progressTimer);

        if (waitData.success && waitData.status === "completed" && waitData.video_url) {
          setGeneratedVideoUrl(waitData.video_url);
          setViewMode("video");
          setIsGeneratingVideo(false);
          setGenerationProgress(100);
          setVideoStatusText("Video generated successfully!");
          toast.success("🎉 Talking Avatar Video Ready & Saved to Memories!");

          // Automatically persist to user's MongoDB memories!
          const token = getStoredToken();
          if (token) {
            fetch(`${API_BASE_URL}/avatar/save-memory`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                title: scriptText.slice(0, 35) + (scriptText.length > 35 ? "..." : ""),
                script: scriptText,
                video_url: waitData.video_url,
                video_id: videoId,
                thumbnail_url: currentImg,
                status: "Public",
              }),
            }).catch((saveErr) => console.error("Error auto-saving memory:", saveErr));
          }
        } else {
          setIsGeneratingVideo(false);
          toast.error(waitData.error || "Video generation failed or timed out.");
        }
      } catch (waitErr: any) {
        clearInterval(progressTimer);
        setIsGeneratingVideo(false);
        toast.error(waitErr.message || "Failed waiting for video completion.");
      }
    } catch (err: any) {
      setIsGeneratingVideo(false);
      toast.error(err.message || "Failed to generate video.");
    }
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C1E] text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[#020215]" />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="relative z-10 flex flex-col h-screen">
        {/* ================= TOP HEADER ================= */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#0B0C1E]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <h1 className="text-sm font-semibold flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-[#A78BFA]" />
              <span>3D Avatar & Talking Video Studio</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle (Photo vs Video) */}
            {generatedVideoUrl && (
              <div className="flex items-center bg-[#15162C] border border-white/10 rounded-xl p-1 text-xs">
                <button
                  onClick={() => setViewMode("photo")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === "photo"
                      ? "bg-[#7C4AED] text-white shadow-md font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Photo
                </button>
                <button
                  onClick={() => setViewMode("video")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "video"
                      ? "bg-[#7C4AED] text-white shadow-md font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  Video
                </button>
              </div>
            )}

            {/* View in Memories button */}
            {generatedVideoUrl && (
              <Link
                href="/feed/my-stuff/memories"
                className="flex items-center gap-1.5 bg-[#15162C] hover:bg-white/10 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border border-white/10"
              >
                <span>View in Memories</span>
              </Link>
            )}

            {/* Download Video button */}
            {generatedVideoUrl && (
              <a
                href={generatedVideoUrl}
                download="akasha_talking_avatar.mp4"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-[0_0_15px_rgba(124,74,237,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download MP4</span>
              </a>
            )}
          </div>
        </header>

        {/* ================= 2-COLUMN STUDIO ================= */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* --- LEFT COLUMN: AVATAR CONTROLS & SCRIPT --- */}
          <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0 border-r border-white/5 overflow-y-auto p-4 space-y-4 bg-[#0B0C1E]/70 scrollbar-hide">
            {/* 1. Avatar Face Photo Card */}
            <div className="bg-[#15162C]/90 border border-white/10 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-medium text-white flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>Avatar Face Photo</span>
                </label>
                <button
                  type="button"
                  onClick={triggerUpload}
                  className="text-[11px] text-[#A78BFA] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-3 h-3" />
                  <span>Upload Photo</span>
                </button>
              </div>

              {/* Active Selected Photo Preview */}
              <div className="flex items-center gap-3 mb-3 p-2.5 rounded-xl bg-[#0B0C1E] border border-white/5">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                  <img
                    src={originalImage || DEFAULT_AVATAR_IMG}
                    alt="Selected Avatar Face"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white font-medium truncate">
                    {originalImage?.startsWith("data:") ? "Custom Uploaded Photo" : "Active Photo Model"}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Lip-sync & facial movement will animate this face
                  </p>
                </div>
                <button
                  type="button"
                  onClick={triggerUpload}
                  className="bg-[#7C4AED]/20 hover:bg-[#7C4AED] text-[#A78BFA] hover:text-white text-[11px] px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium"
                >
                  Browse
                </button>
              </div>

              {/* Sample Preset Avatars */}
              <div>
                <p className="text-[10px] text-gray-400 mb-2">Or select a sample portrait:</p>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_AVATARS.map((preset) => {
                    const isSelected = originalImage === preset.url;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setOriginalImage(preset.url);
                          setGeneratedVideoUrl(null);
                          setViewMode("photo");
                        }}
                        className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-all border cursor-pointer ${
                          isSelected
                            ? "border-[#7C4AED] bg-[#7C4AED]/20 shadow-[0_0_10px_rgba(124,74,237,0.3)]"
                            : "border-white/5 bg-[#0B0C1E] hover:border-white/20"
                        }`}
                      >
                        <div className="w-full aspect-square rounded-lg overflow-hidden">
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[10px] text-gray-300 font-medium truncate">
                          {preset.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Script Box */}
            <div className="bg-[#15162C]/90 border border-white/10 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-white flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>Avatar Script (What will it speak?)</span>
                </label>
                <span className="text-[10px] text-gray-400">
                  {scriptText.length}/2000
                </span>
              </div>

              <textarea
                value={scriptText}
                onChange={(e) => setScriptText(e.target.value)}
                rows={4}
                placeholder="Type the message or speech for your 3D avatar..."
                className="w-full bg-[#0B0C1E] border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all resize-none"
              />

              {/* Quick Presets */}
              <div className="mt-2.5">
                <p className="text-[10px] text-gray-400 mb-1.5">Quick Presets:</p>
                <div className="flex flex-col gap-1.5">
                  {PRESET_SCRIPTS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setScriptText(preset)}
                      className="text-left text-[11px] text-gray-300 hover:text-white bg-[#0B0C1E]/60 hover:bg-[#7C4AED]/20 border border-white/5 rounded-lg px-2.5 py-1.5 transition-colors truncate"
                    >
                      "{preset.slice(0, 48)}..."
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Voice Selection */}
            <div className="bg-[#15162C]/90 border border-white/10 rounded-2xl p-4 shadow-xl">
              <label className="text-xs font-medium text-white block mb-2">
                Choose AI Voice Model
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full bg-[#0B0C1E] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C4AED] transition-all cursor-pointer"
              >
                {VOICE_OPTIONS.map((v) => (
                  <option key={v.id} value={v.id} className="bg-[#0B0C1E] text-white">
                    {v.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-gray-400 mt-2">
                Supported via HeyGen Neural Voice Synthesizer
              </p>
            </div>

            {/* 4. Generate Button */}
            <button
              onClick={handleGenerateVideo}
              disabled={isGeneratingVideo}
              className="w-full bg-gradient-to-r from-[#7C4AED] to-[#A78BFA] hover:from-[#6D39D2] hover:to-[#906CF7] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(124,74,237,0.4)] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGeneratingVideo ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Video...</span>
                </>
              ) : (
                <>
                  <FileVideo className="w-4 h-4" />
                  <span>Generate Talking Avatar Video</span>
                </>
              )}
            </button>

            {/* 5. Video Generation Live Status Box */}
            {isGeneratingVideo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-[#7C4AED]/10 border border-[#7C4AED]/30 text-xs space-y-2"
              >
                <div className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 text-[#A78BFA] animate-spin" />
                    Processing AI Video
                  </span>
                  <span className="font-semibold text-[#A78BFA]">{generationProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0B0C1E] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7C4AED] to-[#A78BFA]"
                    animate={{ width: `${generationProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  {videoStatusText}
                </p>
              </motion.div>
            )}
          </aside>

          {/* --- CENTER COLUMN: MAIN VIEWPORT (VIDEO OR PHOTO) --- */}
          <main className="flex-1 flex flex-col relative bg-[#020215] overflow-hidden">
            <div className="flex-1 relative flex items-center justify-center p-6">
              <div className="relative w-full max-w-3xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center bg-[#090A1A]">
                {/* --- VIDEO MODE VIEWPORT --- */}
                {viewMode === "video" && generatedVideoUrl ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <video
                      ref={videoRef}
                      src={generatedVideoUrl}
                      className="w-full h-full object-contain"
                      loop
                      playsInline
                      muted={isMuted}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                    />

                    {/* Overlay Controls */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full flex items-center gap-4 z-30">
                      <button
                        onClick={toggleVideoPlayback}
                        className="text-white hover:text-[#A78BFA] transition-colors p-1"
                        title={isVideoPlaying ? "Pause" : "Play"}
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 fill-current" />
                        )}
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:text-[#A78BFA] transition-colors p-1"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>

                      <div className="h-4 w-px bg-white/20" />

                      <span className="text-[11px] text-gray-300 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Talking Avatar Live
                      </span>
                    </div>
                  </div>
                ) : (
                  /* --- PHOTO VIEWPORT --- */
                  <div className="relative w-full h-full flex items-center justify-center p-6">
                    <div className="h-full aspect-square rounded-2xl overflow-hidden shadow-2xl relative border border-white/10">
                      <img
                        src={originalImage || DEFAULT_AVATAR_IMG}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Status / Mode Bar */}
            <div className="h-16 border-t border-white/5 bg-[#0B0C1E]/80 backdrop-blur-md px-8 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {viewMode === "video"
                    ? "Currently Viewing: Talking Video Mode"
                    : "Currently Viewing: Avatar Photo"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={triggerUpload}
                  className="bg-[#1A1B31] hover:bg-white/5 border border-white/10 text-white text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Upload New Photo
                </button>

                <button
                  onClick={handleGenerateVideo}
                  disabled={isGeneratingVideo}
                  className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white text-xs px-5 py-2 rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(124,74,237,0.3)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Make Avatar Speak</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AvatarStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#020215] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[#A78BFA] animate-spin" />
            <p className="text-sm text-gray-400">Loading Avatar Studio...</p>
          </div>
        </div>
      }
    >
      <AvatarStudioContent />
    </Suspense>
  );
}