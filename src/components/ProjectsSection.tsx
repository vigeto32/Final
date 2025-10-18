import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../lib/supabase';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-orbitron mb-4 inline-block">
            Featured Projects
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg font-exo">Showcasing innovation through code</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-gray-900 rounded-lg overflow-hidden border border-cyan-500/30 hover:border-cyan-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              <div className="relative h-48 overflow-hidden bg-gray-800">
                {project.image_url ? (
                  <>
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900 to-purple-900">
                    <div className="text-6xl text-cyan-400 opacity-20 font-orbitron">RC</div>
                  </div>
                )}

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black/80 rounded-full hover:bg-cyan-500 transition-colors duration-300"
                      aria-label="View project"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black/80 rounded-full hover:bg-purple-500 transition-colors duration-300"
                      aria-label="View GitHub repository"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-cyan-400 font-orbitron group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-800 border border-purple-500/30 rounded-full text-xs text-purple-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-2 text-sm text-cyan-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Details</span>
                  <span className="inline-block transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 text-cyan-400 opacity-20">[ ]</div>
            <p className="text-gray-500 font-mono">No projects found. Add projects via the database.</p>
          </div>
        )}
      </div>

      <div className="absolute top-1/4 left-10 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/2 right-10 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}
