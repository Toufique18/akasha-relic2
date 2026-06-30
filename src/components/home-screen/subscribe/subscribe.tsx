import vector from '@/assets/banner/Vector 1.svg';
import Image from 'next/image';

export default function Subscribe() {
  const vectorSrc = typeof vector === 'string' ? vector : vector.src;

  return (
    <section className="relative w-full lg:py-20 py-10 px-6 sm:px-12 lg:px-24 bg-[#11072B]">
        {/* Background image using Next.js Image */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <Image
            src={vectorSrc}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        
        
        <div className="relative z-10 flex items-center justify-center px-4 py-20">
          <div className="max-w-2xl w-full mx-auto">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-4 font-serif">
                Start Your Digital <span className="text-[#C5FF41] italic font-serif">Journey</span>
              </h2>
              
              <p className="text-gray-300 text-base sm:text-lg mb-6 max-w-md mx-auto">
                Join 50,000+ pioneers securing their legacies. Subscribe to our monthlynewsletter for insights on digital preservation.
              </p>
              
              <div className="mb-6 max-w-md mx-auto">
                <div className=" flex items-center">
                  <input 
                    type="email" 
                    placeholder="Enter email address"
                    className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className=" px-6 py-4 rounded-full bg-[#9157FF]/80 backdrop-blur-md text-white hover:bg-white  tracking-wider transition-all duration-300">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

    </section>
  );
}