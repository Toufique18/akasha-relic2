import Image from "next/image";
import Frame1 from "@/assets/banner/Frame1.svg";
import Frame2 from "@/assets/banner/Frame2.svg";
import Frame3 from "@/assets/banner/Frame3.svg";
import Frame4 from "@/assets/banner/frame4.svg";

export default function Memory() {
    return (
        <section className="lg:py-20 py-10 px-6 sm:px-12 lg:px-24 relative overflow-hidden bg-[#FFFFFF]">
            {/* Floating App Cards - Configured to match the layout positions */}
            <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
                {/* Frame 1 - Pink Avatar Card (Top Left) */}
                <div className="absolute top-[18%] left-[8%] md:left-[12%] lg:left-[15%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block">
                    <Image src={Frame1} alt="Avatar Card" className="w-[72px] h-auto" />
                </div>

                {/* Frame 3 - Green Gift Card (Bottom Left) */}
                <div className="absolute bottom-[5%] left-[6%] md:left-[10%] lg:left-[15%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block">
                    <Image src={Frame3} alt="Gift Card" className="w-[72px] h-auto" />
                </div>

                {/* Frame 2 - Orange Clapper Card (Top Right) */}
                <div className="absolute top-[15%] right-[8%] md:right-[12%] lg:right-[18%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block">
                    <Image src={Frame2} alt="Media Card" className="w-[72px] h-auto" />
                </div>

                {/* Frame 4 - Blue Photo Card (Center Right) */}
                <div className="absolute bottom-[5%] right-[10%] md:right-[15%] lg:right-[28%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block">
                    <Image src={Frame4} alt="Photo Card" className="w-[72px] h-auto" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-center justify-start text-center flex-grow pt-8">
                <div className="w-full mb-16 text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-normal font-serif mb-4 inline-block text-[#282828]">
                        Memory fades. Digital presence <span className="text-[#C5FF41] italic font-serif">lasts forever.</span>
                    </h2>
                    <p className='text-[#333333] text-sm leading-relaxed max-w-[65ch] mx-auto '>&ldquo;In the traditional world, our stories eventually become echoes. We are building
                        the infrastructure for permanence, ensuring your presence, wisdom, and
                        connections remain vibrant across centuries.&rdquo;</p>
                </div> 
            </div>
        </section> 
    );
}