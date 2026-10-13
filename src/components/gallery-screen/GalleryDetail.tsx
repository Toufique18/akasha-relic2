"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Flame,
  ChevronRight,
  ChevronLeft,
  Trees,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  MapPin,
  Send,
  Loader2,
  PackageCheck,
} from "lucide-react";
import { toast } from "sonner";
import { MemorialItem } from "./memorial.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const GalleryDetail: React.FC<{ item: MemorialItem }> = ({ item }) => {
  const [candles, setCandles] = useState(item.candlesCount || 0);
  const [flowers, setFlowers] = useState(item.flowersCount || 0);
  const [isCandleLighting, setIsCandleLighting] = useState(false);
  const [isFlowerOffering, setIsFlowerOffering] = useState(false);

  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Guestbook comments state
  const [condolences, setCondolences] = useState(item.condolences || []);
  const [guestName, setGuestName] = useState("");
  const [guestRelation, setGuestRelation] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLightCandle = async () => {
    setIsCandleLighting(true);
    setTimeout(() => setIsCandleLighting(false), 1500);

    const newCount = candles + 1;
    setCandles(newCount);
    toast.success(`A sacred candle has been lit in memory of ${item.name} 🕯️`);

    try {
      await fetch(`${API_BASE_URL}/memorials/${item.id}/tribute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "candle" }),
      });
    } catch (err) {
      console.warn("Could not sync tribute to server:", err);
    }
  };

  const handleOfferFlower = async () => {
    setIsFlowerOffering(true);
    setTimeout(() => setIsFlowerOffering(false), 1500);

    const newCount = flowers + 1;
    setFlowers(newCount);
    toast.success(`White roses placed at the shrine of ${item.name} 💐`);

    try {
      await fetch(`${API_BASE_URL}/memorials/${item.id}/tribute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "flower" }),
      });
    } catch (err) {
      console.warn("Could not sync tribute to server:", err);
    }
  };

  const handleSubmitCondolence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) {
      toast.error("Please enter your name and condolence message.");
      return;
    }

    setIsSubmittingNote(true);
    const newEntry = {
      name: guestName.trim(),
      relation: guestRelation.trim() || "Visitor",
      message: guestMessage.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(`${API_BASE_URL}/memorials/${item.id}/condolence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (res.ok) {
        toast.success("Your tribute message has been recorded.");
      } else {
        toast.success("Message recorded.");
      }
    } catch (err) {
      console.warn("Local condolence added:", err);
      toast.success("Message recorded.");
    } finally {
      setCondolences([newEntry, ...condolences]);
      setGuestMessage("");
      setIsSubmittingNote(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Memorial link copied to clipboard!");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <Link href="/memorials/gallery" className="hover:text-white transition-colors">Memorials</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <span className="text-amber-300 font-medium">{item.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Media & Living Voice (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-[#111227] border border-amber-500/25 shadow-2xl shadow-amber-500/10"
          >
            {item.avatarVideoUrl ? (
              <div className="relative aspect-[4/5] bg-black">
                <video
                  ref={videoRef}
                  src={item.avatarVideoUrl}
                  playsInline
                  loop
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                />

                {/* Floating controls overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Center play icon on pause */}
                {!isPlaying && (
                  <button
                    onClick={handleTogglePlay}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-black flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Play className="w-7 h-7 fill-black ml-1" />
                  </button>
                )}

                {/* Video HUD */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTogglePlay}
                      className="p-2.5 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-md text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <button
                      onClick={handleToggleMute}
                      className="p-2.5 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-md text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-400/40 text-[11px] text-indigo-200 font-semibold flex items-center gap-1.5 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                    <span>3D Living Voice</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[4/5] bg-[#161733]">
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111227] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Link
                    href="/avatar/studio"
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 backdrop-blur-md text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Video className="w-4 h-4" />
                    Generate 3D Living Voice in Studio
                  </Link>
                </div>
              </div>
            )}
          </motion.div>

          {/* Living Script Quote Box */}
          {item.avatarScript && (
            <div className="p-5 rounded-2xl bg-[#14152e] border border-amber-500/20 text-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lasting Words & Wisdom</span>
              </div>
              <blockquote className="text-sm italic leading-relaxed text-amber-100/90">
                &ldquo;{item.avatarScript}&rdquo;
              </blockquote>
            </div>
          )}

          {/* Cross Link to Family Tree */}
          <div className="p-5 rounded-2xl bg-[#12132b] border border-white/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Ancestral Family Tree</h4>
                <p className="text-[11px] text-gray-400">Trace genealogical roots and kinship</p>
              </div>
            </div>
            <Link
              href="/family-tree"
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors shrink-0"
            >
              View Tree
            </Link>
          </div>
        </div>

        {/* Right Column: Memorial Sanctuary Info & Tributes (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Title & Life dates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-3">
              <span>🕊️ Sacred Memorial Sanctuary</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-2 leading-tight">
              {item.name}
            </h1>

            <p className="text-indigo-300 font-medium text-sm sm:text-base mb-4">
              {item.relation}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{item.birthDate || "Unknown"} — {item.deathDate || "Present"}</span>
              </div>
              {item.birthPlace && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{item.birthPlace}</span>
                </div>
              )}
              <button
                onClick={handleShare}
                className="ml-auto text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Shrine</span>
              </button>
            </div>

            {/* Sacred Epitaph */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 mb-8">
              <p className="text-sm italic text-amber-200/90 leading-relaxed">
                &ldquo;{item.epitaph}&rdquo;
              </p>
            </div>

            {/* Virtual Tribute Shrine Actions */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#15162e] to-[#121329] border border-amber-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Virtual Memorial Shrine
                  </h3>
                </div>
                <span className="text-xs text-gray-400">Offer your tribute</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Light Candle Button */}
                <button
                  onClick={handleLightCandle}
                  className="p-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-left transition-all group cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Flame className="w-5 h-5 fill-amber-400" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-amber-300">{candles}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-white">Light a Candle</h4>
                  <p className="text-[11px] text-amber-200/70">Kindle a flame of eternal remembrance</p>
                </button>

                {/* Offer Flower Button */}
                <button
                  onClick={handleOfferFlower}
                  className="p-4 rounded-2xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-left transition-all group cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      💐
                    </div>
                    <span className="text-2xl font-serif font-bold text-pink-300">{flowers}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-white">Offer White Roses</h4>
                  <p className="text-[11px] text-pink-200/70">Place flowers of peace and gratitude</p>
                </button>
              </div>
            </div>

            {/* Life Story & Biography */}
            <div className="mt-8 space-y-3">
              <h3 className="text-base font-serif font-semibold text-white">Life Story & Legacy</h3>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {item.bio || "Arthur lived an exemplary life devoted to wisdom, family, and community."}
              </p>
            </div>

            {/* Physical Relic Keepsake Option */}
            <div className="mt-8 p-5 rounded-2xl bg-[#14152d] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Physical Memorial Relic Plaque</h4>
                  <p className="text-[11px] text-gray-400">Order an engraved acrylic keepsake with QR code to this living shrine</p>
                </div>
              </div>
              <Link
                href={`/memorials/gallery/${item.numeric_id || item.id}/checkout`}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-semibold shrink-0 transition-all shadow-md"
              >
                Order Plaque
              </Link>
            </div>

            {/* Digital Guestbook & Wall of Remembrance */}
            <div className="mt-10 pt-8 border-t border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-serif text-white">Tributes & Condolences</h3>
                </div>
                <span className="text-xs text-gray-400">{condolences.length} messages</span>
              </div>

              {/* Leave a tribute form */}
              <form onSubmit={handleSubmitCondolence} className="p-5 rounded-2xl bg-[#111227] border border-white/10 space-y-3">
                <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wider">Leave a Message of Remembrance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full bg-[#181938] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400/50"
                  />
                  <input
                    type="text"
                    value={guestRelation}
                    onChange={(e) => setGuestRelation(e.target.value)}
                    placeholder="Relationship (e.g. Grandson, Friend, Niece)"
                    className="w-full bg-[#181938] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400/50"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder="Share a heartfelt memory, tribute, or prayer..."
                  className="w-full bg-[#181938] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400/50 resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingNote}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Post Tribute Note</span>
                  </button>
                </div>
              </form>

              {/* Guestbook List */}
              <div className="space-y-3">
                {condolences.length > 0 ? (
                  condolences.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#14152d] border border-white/5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{note.name}</span>
                        <span className="text-[10px] text-gray-500">{note.date}</span>
                      </div>
                      <span className="inline-block text-[11px] text-amber-400/80 font-medium">
                        {note.relation}
                      </span>
                      <p className="text-xs text-gray-300 leading-relaxed italic">
                        &ldquo;{note.message}&rdquo;
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 text-center py-4">
                    Be the first to leave a message of remembrance.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};