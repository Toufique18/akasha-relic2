import Image from "next/image";
import React from "react";
import parties from "@/assets/home/parties.svg";

const systems = [
    {
        title: "01. INITIALIZATION",
        description: "Synthesize your digital twin with hyper-realistic fidelity. Manage neural imprints and visual manifestations.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="8" r="1" />
            </svg>
        ),
        active: true
    },
    {
        title: "02. AVATAR SYNTHESIS",
        description: "Immersive VR/AR integration allows seamless transitions between physical and digital planes of existence.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <rect x="7" y="7" width="10" height="10" rx="2" />
            </svg>
        ),
    },
    {
        title: "03. PORTAL ACCESS",
        description: "Connect with a global network of Relic users in decentralized community hubs and shared social voids.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="12" cy="12" r="3" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
                <circle cx="5" cy="5" r="2" />
                <line x1="12" y1="12" x2="19" y2="5" />
                <line x1="12" y1="12" x2="5" y2="19" />
                <line x1="12" y1="12" x2="19" y2="19" />
                <line x1="12" y1="12" x2="5" y2="5" />
            </svg>
        ),
    }
];

export default function Chronicles() {
    return (
        <section className="lg:py-24 py-12 px-6 sm:px-12 lg:px-24 relative overflow-hidden bg-[#040425]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 relative z-10 w-full">
                {/* Left Side: Title */}
                <div className="flex-1 min-w-[250px]">
                    <h2 className="text-[48px] md:text-[56px] lg:text-[64px] font-normal font-serif text-white tracking-tight">
                        Chronicles <br />
                        of the <br />
                        <span className="text-[#C5FF41] italic font-serif">
                            &nbsp;&nbsp;&nbsp;&nbsp;Metaverse
                        </span>
                    </h2>
                </div>

                {/* Center: Description */}
                <div className="flex-1 min-w-[320px]">
                    <p className="text-[#CACACA] text-xl font-normal max-w-[320px] font-inter">
                        The starting point for every operator. Initialize your presence and
                        begin the journey through the digital void.
                    </p>
                </div>

                {/* Right Side: Interactive Video Player Card */}
                <div className="flex-1 min-w-[320px] w-full flex justify-end">
                    <div className="relative w-full max-w-[460px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer bg-white/5">
                        {/* Background Image */}
                        <Image
                            src={parties}
                            alt="Metaverse Training"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />

                    </div>
                </div>


            </div>


            <div className="max-w-7xl mx-auto">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                    {systems.map((system, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl transition-all duration-300 group bg-white/10 backdrop-blur-2xl border border-white/10 hover:border-blue-500 hover:bg-blue/10`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-xl border border-white/5  flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                                {system.icon}
                            </div>


                            <h3 className="text-xl font-bold mb-4 tracking-tight text-[#FFFFFF] font-space-grotesk">
                                {system.title}
                            </h3>

                            <p className="text-[#FFFFFF] text-sm leading-relaxed">
                                {system.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
