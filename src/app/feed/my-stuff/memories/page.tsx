"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Globe,
  Lock,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Trash2,
  X,
  Sparkles,
  Plus,
  Loader2,
} from "lucide-react";
import { getStoredToken } from "@/utils/tokenHandler";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface MemoryItem {
  id: string | number;
  image: string;
  title: string;
  script?: string;
  video_url?: string;
  video_id?: string;
  date: string;
  status: "Public" | "Private";
}

const DEFAULT_SAMPLE_MEMORIES: MemoryItem[] = [
  {
    id: "sample-1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    title: "I want to tell you something...",
    script: "Hello, I am living forever inside Akasha Relic. My memories and voice will be preserved here across time.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    date: "22 Feb 2026",
    status: "Public",
  },
  {
    id: "sample-2",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    title: "Some Advice for My Next Gen...",
    script: "Always remember that true legacy is not what we leave behind, but who we inspire.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    date: "22 Feb 2026",
    status: "Public",
  },
  {
    id: "sample-3",
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop",
    title: "A few words from my journey...",
    script: "Life is a journey of memories and love that never fades.",
    date: "22 Feb 2026",
    status: "Public",
  },
  {
    id: "sample-4",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    title: "A Memorial Day with My Family...",
    script: "Remembering our cherished moments and the bonds that connect us.",
    date: "22 Feb 2026",
    status: "Public",
  },
  {
    id: "sample-5",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=800&auto=format&fit=crop",
    title: "Private Family Memory",
    script: "Special private memory preserved with love.",
    date: "21 Feb 2026",
    status: "Private",
  },
];

export default function MemoriesPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<"All" | "Public" | "Private">("All");
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal Video Player State
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch real user memories from backend
  const fetchMemories = async () => {
    const token = getStoredToken();
    if (!token) {
      setMemories(DEFAULT_SAMPLE_MEMORIES);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/avatar/my-memories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.memories) && data.memories.length > 0) {
        setMemories(data.memories);
      } else {
        // If user hasn't generated any yet, show samples
        setMemories(DEFAULT_SAMPLE_MEMORIES);
      }
    } catch (err) {
      console.error("Failed to fetch memories:", err);
      setMemories(DEFAULT_SAMPLE_MEMORIES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  // Toggle Public / Private
  const handleToggleStatus = async (e: React.MouseEvent, memory: MemoryItem) => {
    e.stopPropagation();
    const token = getStoredToken();
    const newStatus: "Public" | "Private" = memory.status === "Public" ? "Private" : "Public";

    // Optimistic UI update
    setMemories((prev) =>
      prev.map((item) => (item.id === memory.id ? { ...item, status: newStatus } : item))
    );

    if (selectedMemory && selectedMemory.id === memory.id) {
      setSelectedMemory((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    if (token && typeof memory.id === "string" && !memory.id.startsWith("sample-")) {
      try {
        await fetch(`${API_BASE_URL}/avatar/my-memories/${memory.id}/status`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(`Memory visibility updated to ${newStatus}`);
      } catch (err) {
        console.error("Failed to toggle status:", err);
      }
    } else {
      toast.success(`Visibility updated to ${newStatus}`);
    }
  };

  // Delete memory
  const handleDeleteMemory = async (memoryId: string | number) => {
    const token = getStoredToken();
    setMemories((prev) => prev.filter((item) => item.id !== memoryId));
    if (selectedMemory?.id === memoryId) {
      setSelectedMemory(null);
    }

    if (token && typeof memoryId === "string" && !memoryId.startsWith("sample-")) {
      try {
        await fetch(`${API_BASE_URL}/avatar/my-memories/${memoryId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Memory deleted successfully");
      } catch (err) {
        console.error("Failed to delete memory:", err);
      }
    } else {
      toast.success("Memory removed");
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

  const filteredMemories = memories.filter((item) => {
    if (activeFilter === "All") return true;
    return item.status === activeFilter;
  });

  return (
    <div className="relative">
      {/* ====== FILTER TABS & CREATE ACTION ====== */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          {(["All", "Public", "Private"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === tab
                  ? "bg-white text-[#020215] shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Link href="/avatar/studio">
          <button className="flex items-center gap-2 bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-[0_0_15px_rgba(124,74,237,0.3)] hover:scale-105 active:scale-95 cursor-pointer">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create 3D Avatar Video</span>
          </button>
        </Link>
      </div>

      {/* ====== LOADING STATE ====== */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 text-[#A78BFA] animate-spin" />
          <p className="text-xs">Loading memories...</p>
        </div>
      ) : (
        /* ====== MEMORIES GRID ====== */
        <AnimatePresence mode="wait">
          {filteredMemories.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredMemories.map((memory) => (
                <motion.div
                  key={memory.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedMemory(memory)}
                  className="group bg-[#15162C] border border-white/5 rounded-2xl overflow-hidden hover:border-[#7C4AED]/40 hover:shadow-[0_0_25px_rgba(124,74,237,0.15)] transition-all duration-300 cursor-pointer relative flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#1A1B31]">
                    <Image
                      src={memory.image}
                      alt={memory.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Video Indicator Badge */}
                    {memory.video_url && (
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#7C4AED]/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Status Pill (Clickable to toggle) */}
                    <div
                      onClick={(e) => handleToggleStatus(e, memory)}
                      title="Click to toggle Public / Private"
                      className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/10 hover:border-white/30 transition-colors shadow-lg z-10"
                    >
                      {memory.status === "Public" ? (
                        <Globe className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Lock className="w-3 h-3 text-amber-400" />
                      )}
                      <span>{memory.status}</span>
                      <ChevronDown className="w-2.5 h-2.5 ml-0.5 opacity-60" />
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <div className="w-2 h-2 rounded-full bg-[#7C4AED] shrink-0" />
                      <span className="text-white text-sm font-medium truncate">
                        {memory.title}
                      </span>
                    </div>
                    <span className="text-gray-400 text-[10px] shrink-0 whitespace-nowrap">
                      {memory.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#15162C] border border-white/10 flex items-center justify-center">
                <Lock className="w-8 h-8 opacity-40 text-[#A78BFA]" />
              </div>
              <p className="text-sm">No {activeFilter.toLowerCase()} memories found.</p>
              <Link href="/avatar/studio">
                <button className="flex items-center gap-2 bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)]">
                  <Plus className="w-4 h-4" />
                  <span>Create Your First Talking Avatar</span>
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ====== MODAL VIDEO PLAYER ====== */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#0B0C1E] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#15162C]/60">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-sm font-semibold text-white truncate max-w-md">
                    {selectedMemory.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleToggleStatus(e, selectedMemory)}
                    className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    {selectedMemory.status === "Public" ? (
                      <Globe className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Lock className="w-3 h-3 text-amber-400" />
                    )}
                    <span>{selectedMemory.status}</span>
                  </button>
                  <button
                    onClick={() => setSelectedMemory(null)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Viewport */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                {selectedMemory.video_url ? (
                  <>
                    <video
                      ref={videoRef}
                      src={selectedMemory.video_url}
                      className="w-full h-full object-contain"
                      loop
                      playsInline
                      muted={isMuted}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      autoPlay
                    />

                    {/* Video Player Floating Overlay Controls */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full flex items-center gap-4 z-20">
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

                      <span className="text-[11px] text-gray-300 font-medium">
                        Akasha Avatar Video
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedMemory.image}
                      alt={selectedMemory.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Details & Action Bar */}
              <div className="p-6 bg-[#0B0C1E] border-t border-white/5 space-y-4">
                {selectedMemory.script && (
                  <div>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block mb-1">
                      Spoken Script / Memory Transcript
                    </span>
                    <p className="text-xs text-gray-200 leading-relaxed bg-[#15162C]/60 p-3 rounded-xl border border-white/5">
                      "{selectedMemory.script}"
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <span>Created: {selectedMemory.date}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {selectedMemory.video_url && (
                      <a
                        href={selectedMemory.video_url}
                        download={`${selectedMemory.title || "avatar"}.mp4`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-[0_0_15px_rgba(124,74,237,0.3)] cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download MP4</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        if (selectedMemory.image) {
                          try {
                            sessionStorage.setItem("akasha_avatar_photo", selectedMemory.image);
                          } catch (e) {
                            console.warn("Storage error:", e);
                          }
                        }
                        router.push("/avatar/studio");
                      }}
                      className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-medium border border-white/10 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
                      <span>Animate Again</span>
                    </button>

                    <button
                      onClick={() => handleDeleteMemory(selectedMemory.id)}
                      className="p-2 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                      title="Delete Memory"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}