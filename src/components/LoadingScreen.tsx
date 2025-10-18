import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEM');

  useEffect(() => {
    const texts = [
      'INITIALIZING SYSTEM',
      'LOADING NEURAL NETWORK',
      'ESTABLISHING CONNECTION',
      'DECRYPTING DATA',
      'RENDERING INTERFACE',
      'SYSTEM READY'
    ];

    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setLoadingText(texts[textIndex]);
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <div className="matrix-rain"></div>

      <div className="relative z-10 text-center px-4">
        <div className="cyber-glitch mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 font-orbitron tracking-wider">
            RYAN.CO
          </h1>
        </div>

        <div className="space-y-6">
          <div className="text-green-400 font-mono text-sm md:text-base glitch-text">
            {loadingText}
            <span className="animate-pulse">...</span>
          </div>

          <div className="w-64 md:w-96 h-2 bg-gray-900 border border-cyan-500 mx-auto overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out cyber-glow"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-cyan-400 font-mono text-2xl md:text-3xl font-bold cyber-glow">
            {progress}%
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce cyber-glow"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-xs text-gray-500 font-mono">
          <div className="hexagon-container">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="hexagon"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
