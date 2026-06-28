"use client";
import image1 from "@/assets/home/image1.svg"
import image2 from "@/assets/home/image2.svg"
import image3 from "@/assets/home/image3.svg"
import image4 from "@/assets/home/image4.svg"
import image5 from "@/assets/home/image5.svg"
import image6 from "@/assets/home/image6.svg"
import image7 from "@/assets/home/image7.svg"
import image8 from "@/assets/home/image8.svg"
import { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

const partners = [
  { src: image1, alt: "Group 1", name: "Group 1" },
  { src: image2, alt: "Creative Infinity", name: "Creative Infinity" },
  { src: image3, alt: "Creative Market", name: "Creative Market" },
  { src: image4, alt: "Crowd Code", name: "Crowd Code" },
  { src: image5, alt: "Digiart", name: "Digiart" },
  { src: image6, alt: "Digiart", name: "Digiart" },
  { src: image7, alt: "Digiart", name: "Digiart" },
  { src: image8, alt: "Digiart", name: "Digiart" }, 
 
];

export default function Architecture() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1; // Adjust speed here (lower = slower)

    const scroll = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;

      // Reset for seamless loop
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="w-full overflow-hidden bg-white py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-2 text-center">
          <h2 className="text-xl font-display text-[#000E14] md:text-xl lg:text-xl font-Playfair">The Core Architecture
          </h2>

        </div>

        <div className="relative">
          {/* Gradient fade effects on edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-gray-50 to-transparent" />

          {/* Auto-scrolling container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden overflow-y-visible gap-4 md:gap-12 scrollbar-hide"
            style={{ whiteSpace: "nowrap" }}
          >
            {duplicatedPartners.map((partner, index) => {
              const srcString = typeof partner.src === "object" ? (partner.src as StaticImageData).src : partner.src;
              return (
                <div
                  key={`${partner.alt}-${index}`}
                  className="flex-shrink-0 transition-all duration-300 hover:scale-110"
                >
                  <div className="group flex items-center justify-center rounded-xl bg-white px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-lg md:h-20 md:w-40">
                    <img
                      src={srcString}
                      alt={partner.alt}
                      className="md:h-full h-6 w-auto object-contain transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}