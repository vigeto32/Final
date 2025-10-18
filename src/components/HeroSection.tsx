import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  name: string;
  title: string;
  tagline: string;
  ctaText: string;
  onCtaClick: () => void;
}

export default function HeroSection({ name, title, tagline, ctaText, onCtaClick }: HeroSectionProps) {
  const [displayedName, setDisplayedName] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let nameIndex = 0;
    const nameInterval = setInterval(() => {
      if (nameIndex <= name.length) {
        setDisplayedName(name.slice(0, nameIndex));
        nameIndex++;
      } else {
        clearInterval(nameInterval);
        setTimeout(() => {
          let titleIndex = 0;
          const titleInterval = setInterval(() => {
            if (titleIndex <= title.length) {
              setDisplayedTitle(title.slice(0, titleIndex));
              titleIndex++;
            } else {
              clearInterval(titleInterval);
              setIsComplete(true);
            }
          }, 80);
        }, 300);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(nameInterval);
      clearInterval(cursorInterval);
    };
  }, [name, title]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="particles-container"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="inline-block relative">
            <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 font-orbitron tracking-tight cyber-glitch">
              {displayedName}
              {!isComplete && showCursor && <span className="text-cyan-400">|</span>}
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg opacity-20 blur-xl"></div>
          </div>
        </div>

        <div className="mb-8 h-12 md:h-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-green-400 font-exo tracking-wide">
            {displayedTitle}
            {isComplete && showCursor && <span className="text-green-400">|</span>}
          </h2>
        </div>

        <div
          className={`transition-all duration-1000 ${
            isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            {tagline}
          </p>

          <button
            onClick={onCtaClick}
            className="group relative px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] font-exo tracking-wide"
          >
            <span className="relative z-10 flex items-center gap-2">
              {ctaText}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>

          <div className="mt-16 flex justify-center gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-cyan-400 cyber-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-cyan-400 cyber-glow" />
      </div>

      <div className="absolute top-10 right-10 w-32 h-32 border border-purple-500 rotate-45 opacity-30 animate-spin-slow"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 border border-cyan-500 opacity-30 animate-pulse"></div>
    </section>
  );
}
