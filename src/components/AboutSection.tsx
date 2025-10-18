interface AboutSectionProps {
  heading: string;
  bio: string;
}

export default function AboutSection({ heading, bio }: AboutSectionProps) {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-orbitron mb-4 inline-block">
            {heading}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg opacity-50 blur group-hover:opacity-75 transition duration-500"></div>
            <div className="relative">
              <img
                src="/My Photo.jpg"
                alt="Ryan Christopher G. Co"
                className="w-full rounded-lg shadow-2xl border-2 border-cyan-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
            </div>
            <div className="absolute top-4 left-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -left-4 top-0 text-6xl text-cyan-500 opacity-20 font-mono">"</div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed pl-8">
                {bio}
              </p>
              <div className="absolute -right-4 bottom-0 text-6xl text-cyan-500 opacity-20 font-mono">"</div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8">
              {[
                { label: 'Projects', value: '50+' },
                { label: 'Experience', value: '5+ Years' },
                { label: 'Technologies', value: '20+' },
                { label: 'Clients', value: '30+' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] group"
                >
                  <div className="text-3xl font-bold text-cyan-400 font-orbitron group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-exo">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-6">
              {['React', 'TypeScript', 'Tailwind', 'Node.js', 'Next.js', 'Vue.js'].map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-900 border border-purple-500/50 rounded-full text-sm text-purple-400 font-mono hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-20 w-64 h-64 border-2 border-cyan-500/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}
