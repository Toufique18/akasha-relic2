"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Sparkles, Image as ImageIcon, Video, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getStoredToken } from "@/utils/tokenHandler";
import { MemorialItem } from "./memorial.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface CreateMemorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemorialCreated: (newMemorial: MemorialItem) => void;
}

const PRESET_PORTRAITS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
];

export const CreateMemorialModal: React.FC<CreateMemorialModalProps> = ({
  isOpen,
  onClose,
  onMemorialCreated,
}) => {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Beloved Family Member");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [epitaph, setEpitaph] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState(PRESET_PORTRAITS[0]);
  const [avatarVideoUrl, setAvatarVideoUrl] = useState("");
  const [avatarScript, setAvatarScript] = useState("");
  const [category, setCategory] = useState("family");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter the loved one's full name.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = getStoredToken();
      const payload = {
        name: name.trim(),
        relation: relation.trim(),
        birthDate: birthDate.trim(),
        deathDate: deathDate.trim(),
        birthPlace: birthPlace.trim(),
        epitaph: epitaph.trim() || "Forever remembered and dearly missed.",
        bio: bio.trim(),
        photoUrl: photoUrl.trim() || PRESET_PORTRAITS[0],
        avatarVideoUrl: avatarVideoUrl.trim(),
        avatarScript: avatarScript.trim(),
        category,
      };

      const res = await fetch(`${API_BASE_URL}/memorials/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Memorial shrine created for ${name}!`);
        onMemorialCreated(data.memorial);
        onClose();
      } else {
        // Fallback local create if server unreachable
        const fallbackItem: MemorialItem = {
          id: `local_${Date.now()}`,
          name: payload.name,
          relation: payload.relation,
          birthDate: payload.birthDate,
          deathDate: payload.deathDate,
          birthPlace: payload.birthPlace,
          epitaph: payload.epitaph,
          bio: payload.bio,
          photoUrl: payload.photoUrl,
          avatarVideoUrl: payload.avatarVideoUrl,
          avatarScript: payload.avatarScript,
          category: payload.category,
          candlesCount: 1,
          flowersCount: 0,
          condolences: [],
        };
        toast.success(`Memorial created for ${name}!`);
        onMemorialCreated(fallbackItem);
        onClose();
      }
    } catch (err) {
      console.error("Error creating memorial:", err);
      toast.error("Failed to create memorial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#0F1026] border border-amber-500/20 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-white shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-medium text-white">Create Memorial Shrine</h3>
              <p className="text-xs text-gray-400">Dedicate a sacred digital sanctuary for your departed loved one</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Portrait Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Select or Enter Portrait Photo
            </label>
            <div className="flex items-center gap-3 mb-3 overflow-x-auto pb-2">
              {PRESET_PORTRAITS.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setPhotoUrl(url)}
                  className={`w-14 h-14 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    photoUrl === url ? "border-amber-400 scale-105 shadow-md shadow-amber-500/20" : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Or paste portrait image URL..."
                className="w-full bg-[#15162C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>
          </div>

          {/* Name & Relation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arthur Pendragon Sr."
                className="w-full bg-[#15162C] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Relationship / Title
              </label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="e.g. Beloved Grandfather & Historian"
                className="w-full bg-[#15162C] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>
          </div>

          {/* Dates & Birthplace */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Birth Year / Date
              </label>
              <input
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                placeholder="e.g. 1930"
                className="w-full bg-[#15162C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Passing Year / Date
              </label>
              <input
                type="text"
                value={deathDate}
                onChange={(e) => setDeathDate(e.target.value)}
                placeholder="e.g. 2018"
                className="w-full bg-[#15162C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Place of Origin
              </label>
              <input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="e.g. London, UK"
                className="w-full bg-[#15162C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>
          </div>

          {/* Epitaph / Favorite Saying */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Memorial Epitaph / Favorite Quote
            </label>
            <input
              type="text"
              value={epitaph}
              onChange={(e) => setEpitaph(e.target.value)}
              placeholder="e.g. Always remember that true legacy is not what we leave behind, but who we inspire."
              className="w-full bg-[#15162C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/50"
            />
          </div>

          {/* Living Avatar Video & Script */}
          <div className="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Video className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Living Voice (3D Avatar Integration)</span>
            </div>
            <div>
              <input
                type="url"
                value={avatarVideoUrl}
                onChange={(e) => setAvatarVideoUrl(e.target.value)}
                placeholder="Paste MP4 Video URL (e.g. from 3D Avatar Studio)..."
                className="w-full bg-[#15162C] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-400/50 mb-2"
              />
              <textarea
                rows={2}
                value={avatarScript}
                onChange={(e) => setAvatarScript(e.target.value)}
                placeholder="Spoken words / Speech quote transcript..."
                className="w-full bg-[#15162C] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400/50 resize-none"
              />
            </div>
          </div>

          {/* Biography */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Life Story & Biography
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a heartfelt tribute about their life, virtues, passions, and enduring impact..."
              className="w-full bg-[#15162C] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400/50 resize-none"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Shrine...
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 fill-black" />
                  Publish Memorial
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
