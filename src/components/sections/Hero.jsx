import { ChevronDown, Star } from 'lucide-react';
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb } from 'react-icons/si';
import { PERSONAL_INFO, STATS } from '../../utils/constants'; 
import { scrollToSection } from '../../hooks/useScrollSpy';
import FadeIn from '../animations/FadeIn';
import RadialGradientBackground from '../backgrounds/RadialGradientBackground';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <RadialGradientBackground variant="hero"/>

      {/*Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */} 
        <div className="text-left">
          <FadeIn delay={0}>
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-linear-to-r from-primary/10 via-primary/15 to-primary/20 px-4.5 py-2.75">
              <Star className="w-4 h-4 text-white fill-white"/>
              <span className="text-xs md:text-sm text-white tracking-[1.2px]">
                {PERSONAL_INFO.title} | Based in {PERSONAL_INFO.location}
                </span>
            </div>
          </FadeIn> 

          <FadeIn delay={100}>
            <h1 className="text-4xl md:text-5xl lg-text-6xl font-normal text-white mb-6 leading-tight">
              React.js Developer Portfolio
              </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p className="mb-8 max-w-137.5 text-lg text-white/70">
                  Buillding modern , scalable web applications with React, JavaScript, and cutting-edge technologies. Transforming ideas into exceptional digital experiences.
                </p>  
              </FadeIn>

              <FadeIn delay={300}>  
                <button
                  onClick={()=> scrollToSection('contact')}
                  className="inline-flex items-center gap-0 mb-12 group"
                  >
                    <div className="relative z-10 rounded-[17px] border border-white bg-white px-6.5 py-3.25 text-base font-medium text-[#212121]">
                      Get in Touch
                      </div>
                      </button>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-full">
                  {STATS.map((stat, index) => (
                    <div key={index} className="text-left border-r border-white/50 pr-10 last:border-r-0">
                      <div className="mb-2 font-mono text-2xl font-normal text-primary">
                        {stat.value}
                        </div>
                        <p className="text-sm text-white leading-snug">
                          {stat.label}
                          </p>
                          </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            {/* Right Column - Developer Image */}
            <FadeIn delay ={200}>
              <div className="relative">
                <div className="group relative ml-auto aspect-4/5 max-w-125 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-primary/20 via-primary/10 to-primary animate-spin-slow"></div>
                    </div>

                    {/* Image Container*/}
                    <div className="relative m-px h-[calc(100%-2px)] overflow-hidden rounded-2xl">
                      <img
                        src="/Coder.jpg"
                        alt="Developer at work"
                        className="w-full h-full object-cover"
                        />
                        </div>

                        {/* Technology Logos */}
                        <div className="absolute bottom-6 left-6 z-20">
                          <FadeIn delay={500}>
                            <div className="flex items-center gap-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
                              <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                <SiReact className="w-full h-full text-primary " />
                                </div>

                                <div className=" w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                  <SiNextdotjs className="w-full h-full text-primary" />
                                  </div>

                                  <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                    <SiNodedotjs className="w-full h-full text-primary" />
                                    </div>

                                    <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                      <SiTailwindcss className="w-full h-full text-primary" />
                                      </div>

                                      <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                        <SiMongodb className="w-full h-full text-primary" />
                                        </div>
                                      </div>
                                    </FadeIn>
                                 </div>
                               </div>
                            </div>
                          </FadeIn>
                  </div>
            </div>

            {/* Scroll Indicator */}
            <button 
              onClick={() => scrollToSection('about')}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">

                <ChevronDown className="w-8 h-8 text-primary"/>
              </button>
        </section>


        
  )
}

export default Hero
