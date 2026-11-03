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
  Square,
  Trash2,
  RotateCcw,
  Radio,
  Upload,
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

// Helper: Converts any browser audio (e.g. webm/opus) to standard 16-bit PCM WAV (audio/wav)
async function convertAudioBlobToWav(blob: Blob): Promise<Blob> {
  try {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return blob;
    const audioCtx = new AudioContextClass();
    const arrayBuffer = await blob.arrayBuffer();
    const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const numChannels = Math.min(decodedBuffer.numberOfChannels, 2);
    const sampleRate = decodedBuffer.sampleRate;
    const samples = decodedBuffer.length;
    const bitDepth = 16;
    const blockAlign = (numChannels * bitDepth) / 8;
    const byteRate = sampleRate * blockAlign;
    const dataSize = samples * blockAlign;
    const wavBuffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(wavBuffer);

    const writeStr = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeStr(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeStr(36, "data");
    view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let i = 0; i < samples; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = Math.max(
          -1,
          Math.min(1, decodedBuffer.getChannelData(channel)[i])
        );
        const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, intSample, true);
        offset += 2;
      }
    }

    try {
      await audioCtx.close();
    } catch {}

    return new Blob([wavBuffer], { type: "audio/wav" });
  } catch (err) {
    console.warn("WAV conversion fallback:", err);
    return blob;
  }
}

function AvatarStudioContent() {
  const searchParams = useSearchParams();

  // IMAGE STATE
  const [originalImage, setOriginalImage] = useState<string | null>(DEFAULT_AVATAR_IMG);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === HEYGEN TALKING AVATAR VIDEO & VOICE STATE ===
  const [audioMode, setAudioMode] = useState<"script" | "voice">("script");

  // Script & AI Voice State
  const [scriptText, setScriptText] = useState(
    "Hello! I am your 3D digital persona in Akasha. My memories and voice live forever here."
  );
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[0].id);

  // Dictation / Speech Recognition
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Custom Voice Recording / Audio Upload State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedAudioName, setRecordedAudioName] = useState<string>("My Live Recording");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  // General Video Gen State
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videoStatusText, setVideoStatusText] = useState("");
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"photo" | "video">("photo");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Voice Recording Functions
  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Microphone access is not supported on this browser.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const rawAudioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType || "audio/webm",
        });
        stream.getTracks().forEach((track) => track.stop());

        try {
          const wavBlob = await convertAudioBlobToWav(rawAudioBlob);
          const reader = new FileReader();
          reader.onloadend = () => {
            setRecordedAudioUrl(reader.result as string);
            setRecordedAudioName("My Live Recording.wav");
            toast.success("Voice recording captured as WAV audio! Ready to animate avatar.");
          };
          reader.readAsDataURL(wavBlob);
        } catch (convErr) {
          console.error("WAV conversion error:", convErr);
          const reader = new FileReader();
          reader.onloadend = () => {
            setRecordedAudioUrl(reader.result as string);
            setRecordedAudioName("My Live Recording");
          };
          reader.readAsDataURL(rawAudioBlob);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error("Microphone error:", err);
      toast.error("Could not access microphone. Please allow microphone permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const deleteRecording = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    setIsPlayingAudio(false);
    setRecordedAudioUrl(null);
    setRecordedAudioName("");
    setRecordingSeconds(0);
  };

  const handleAudioFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("audio/") && !file.name.match(/\.(mp3|wav|m4a|aac|ogg|webm)$/i)) {
      toast.error("Please upload a valid audio file (.mp3, .wav, .m4a, .webm).");
      return;
    }
    try {
      let finalBlob: Blob = file;
      if (!file.name.toLowerCase().endsWith(".wav") && !file.name.toLowerCase().endsWith(".mp3")) {
        finalBlob = await convertAudioBlobToWav(file);
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setRecordedAudioUrl(ev.target?.result as string);
        setRecordedAudioName(file.name);
        toast.success(`Audio uploaded: ${file.name}`);
      };
      reader.readAsDataURL(finalBlob);
    } catch {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setRecordedAudioUrl(ev.target?.result as string);
        setRecordedAudioName(file.name);
        toast.success(`Audio uploaded: ${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleAudioPreview = () => {
    if (!audioPlayerRef.current) return;
    if (isPlayingAudio) {
      audioPlayerRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Speech-to-Text Dictation
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported by this browser. Chrome or Edge recommended.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang =
        selectedVoice.includes(" Sadachbia") || selectedVoice.includes("Autonoe")
          ? "bn-BD"
          : "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("🎙️ Listening... Speak now to dictate script!");
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setScriptText((prev) => (prev ? prev + " " + transcript : transcript));
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Speech recognition initialization error:", err);
      setIsListening(false);
    }
  };

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
    if (audioMode === "script" && !scriptText.trim()) {
      toast.error("Please enter what the avatar should speak.");
      return;
    }
    if (audioMode === "voice" && !recordedAudioUrl) {
      toast.error("Please record your voice or upload an audio file first.");
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
      const payload: any = {
        image_url: currentImg,
      };

      if (audioMode === "script") {
        payload.script_text = scriptText;
        payload.voice_id = selectedVoice;
      } else {
        payload.audio_url = recordedAudioUrl;
      }

      const res = await fetch(`${API_BASE_URL}/avatar/generate-video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.detail || data.error || "Failed to start video generation");
      }

      const videoId = data.video_id;
      setVideoStatusText(
        audioMode === "voice"
          ? "AI is synchronizing 3D facial movements to your recorded voice..."
          : "AI is synthesizing voice & generating talking avatar..."
      );
      setGenerationProgress(25);

      // Local progress ticker for smooth visual UX while waiting for single response
      let simProgress = 25;
      const progressTimer = setInterval(() => {
        simProgress = Math.min(simProgress + 7, 92);
        setGenerationProgress(simProgress);
        if (simProgress < 50) {
          setVideoStatusText(
            audioMode === "voice"
              ? "Mapping vocal frequencies & 3D facial landmarks..."
              : "Synthesizing neural audio & facial landmarks..."
          );
        } else if (simProgress < 80) {
          setVideoStatusText("Rendering lip-sync movements & realistic head poses...");
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
            const memoryTitle =
              audioMode === "script"
                ? scriptText.slice(0, 35) + (scriptText.length > 35 ? "..." : "")
                : `Voice Message (${recordedAudioName || "Custom Voice"})`;
            const memoryScript =
              audioMode === "script" ? scriptText : "Custom user recorded voice message";

            fetch(`${API_BASE_URL}/avatar/save-memory`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                title: memoryTitle,
                script: memoryScript,
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

            {/* Hidden Audio Player & Audio File Input */}
            <input
              type="file"
              ref={audioFileInputRef}
              onChange={handleAudioFileUpload}
              accept="audio/*"
              className="hidden"
            />
            {recordedAudioUrl && (
              <audio
                ref={audioPlayerRef}
                src={recordedAudioUrl}
                onEnded={() => setIsPlayingAudio(false)}
                className="hidden"
              />
            )}

            {/* 2. Audio Mode Tabs (Script vs Voice) */}
            <div className="bg-[#15162C]/90 border border-white/10 rounded-2xl p-2.5 shadow-xl space-y-2">
              <label className="text-[11px] font-medium text-gray-400 px-1 block">
                Choose Voice Source:
              </label>
              <div className="flex bg-[#0B0C1E] p-1 rounded-xl border border-white/5 gap-1">
                <button
                  type="button"
                  onClick={() => setAudioMode("script")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    audioMode === "script"
                      ? "bg-[#7C4AED] text-white shadow-lg shadow-[#7C4AED]/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Text Script</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAudioMode("voice")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    audioMode === "voice"
                      ? "bg-[#7C4AED] text-white shadow-lg shadow-[#7C4AED]/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 text-red-400" />
                  <span>Your Voice</span>
                </button>
              </div>
            </div>

            {/* 3A. SCRIPT MODE CONTROLS */}
            {audioMode === "script" && (
              <>
                <div className="bg-[#15162C]/90 border border-white/10 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-white flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-[#A78BFA]" />
                      <span>Avatar Script (What will it speak?)</span>
                    </label>
                    {/* Live Speech Recognition Dictate Button */}
                    <button
                      type="button"
                      onClick={toggleSpeechRecognition}
                      className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                        isListening
                          ? "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse font-medium"
                          : "bg-white/5 text-gray-300 hover:text-white border-white/10 hover:border-white/20"
                      }`}
                      title="Speak into your microphone to dictate text"
                    >
                      <Mic className={`w-3 h-3 ${isListening ? "text-red-400 animate-bounce" : "text-[#A78BFA]"}`} />
                      <span>{isListening ? "Listening..." : "Dictate"}</span>
                    </button>
                  </div>

                  <textarea
                    value={scriptText}
                    onChange={(e) => setScriptText(e.target.value)}
                    rows={4}
                    placeholder="Type or dictate the message for your 3D avatar..."
                    className="w-full bg-[#0B0C1E] border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all resize-none"
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-gray-400">
                      {scriptText.length}/2000
                    </span>
                  </div>

                  {/* Quick Presets */}
                  <div className="mt-2.5">
                    <p className="text-[10px] text-gray-400 mb-1.5">Quick Presets:</p>
                    <div className="flex flex-col gap-1.5">
                      {PRESET_SCRIPTS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setScriptText(preset)}
                          className="text-left text-[11px] text-gray-300 hover:text-white bg-[#0B0C1E]/60 hover:bg-[#7C4AED]/20 border border-white/5 rounded-lg px-2.5 py-1.5 transition-colors truncate cursor-pointer"
                        >
                          "{preset.slice(0, 48)}..."
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Voice Selection */}
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
              </>
            )}

            {/* 3B. USER VOICE MODE CONTROLS */}
            {audioMode === "voice" && (
              <div className="bg-[#15162C]/90 border border-white/10 rounded-2xl p-4 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-white flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-red-400" />
                    <span>Your Real Voice Recording</span>
                  </label>
                  {recordedAudioUrl && (
                    <button
                      type="button"
                      onClick={deleteRecording}
                      className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                {!recordedAudioUrl ? (
                  <div className="space-y-3">
                    {/* Live Mic Record Button */}
                    {isRecording ? (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-center space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                          <span className="text-xs font-semibold text-red-400">
                            Recording Voice ({formatSeconds(recordingSeconds)})
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-300">
                          Speak clearly into your microphone...
                        </p>
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-medium text-xs transition-all shadow-lg cursor-pointer"
                        >
                          <Square className="w-3.5 h-3.5 fill-white" />
                          <span>Stop Recording</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600/20 to-[#7C4AED]/20 hover:from-red-600/30 hover:to-[#7C4AED]/30 text-white border border-red-500/30 hover:border-red-500/50 py-3.5 rounded-xl font-medium text-xs transition-all cursor-pointer group"
                      >
                        <div className="w-3 h-3 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
                        <span>Click to Record Voice (Mic)</span>
                      </button>
                    )}

                    <div className="flex items-center gap-2 text-gray-500 text-[10px]">
                      <div className="h-px bg-white/10 flex-1" />
                      <span>OR UPLOAD AUDIO</span>
                      <div className="h-px bg-white/10 flex-1" />
                    </div>

                    {/* Upload Audio Button */}
                    <button
                      type="button"
                      onClick={() => audioFileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 bg-[#0B0C1E] hover:bg-[#7C4AED]/10 text-gray-300 hover:text-white border border-white/10 hover:border-[#7C4AED]/40 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#A78BFA]" />
                      <span>Upload Audio File (.mp3, .wav, .m4a)</span>
                    </button>
                  </div>
                ) : (
                  /* Audio Preview Player */
                  <div className="p-3.5 rounded-xl bg-[#0B0C1E] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          type="button"
                          onClick={toggleAudioPreview}
                          className="w-8 h-8 rounded-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md"
                        >
                          {isPlayingAudio ? (
                            <Pause className="w-4 h-4 fill-white" />
                          ) : (
                            <Play className="w-4 h-4 fill-white translate-x-0.5" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-white truncate">
                            {recordedAudioName}
                          </p>
                          <p className="text-[10px] text-[#A78BFA]">
                            {isPlayingAudio ? "Playing preview..." : "Ready for animation"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={deleteRecording}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                        title="Delete and re-record"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Avatar will animate & lip-sync directly to this voice recording!</span>
                    </div>
                  </div>
                )}
              </div>
            )}

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
                  <span>
                    {audioMode === "voice"
                      ? "Generate Avatar with Your Voice"
                      : "Generate Talking Avatar Video"}
                  </span>
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