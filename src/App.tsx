import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import { supabase, PortfolioContent, Project } from './lib/supabase';

interface ContentMap {
  [key: string]: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<ContentMap>({});
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadContent();
    loadProjects();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('*');

      if (error) {
        console.error('Error loading content:', error);
        return;
      }

      const contentMap: ContentMap = {};
      data?.forEach((item: PortfolioContent) => {
        contentMap[`${item.section}.${item.key}`] = item.value;
      });

      setContent(contentMap);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error loading projects:', error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <HeroSection
        name={content['hero.name'] || 'Ryan Christopher G. Co'}
        title={content['hero.title'] || 'Front-End Developer'}
        tagline={content['hero.tagline'] || 'Crafting immersive digital experiences through code and creativity'}
        ctaText={content['hero.cta_text'] || 'Explore My Work'}
        onCtaClick={() => scrollToSection('about')}
      />

      <AboutSection
        heading={content['about.heading'] || 'About Me'}
        bio={content['about.bio'] || 'I am a passionate Front-End Developer specializing in creating cutting-edge web applications with modern technologies.'}
      />

      <ProjectsSection projects={projects} />

      <ContactSection
        heading={content['contact.heading'] || 'Get In Touch'}
        description={content['contact.description'] || "Have a project in mind? Let's build something extraordinary together."}
      />

      <footer className="bg-black border-t border-cyan-500/30 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-mono text-sm"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-mono text-sm"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-mono text-sm"
              aria-label="Twitter"
            >
              Twitter
            </a>
          </div>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-6"></div>

          <p className="text-gray-500 font-mono text-sm">
            &copy; 2025 Ryan Christopher G. Co. All rights reserved.
          </p>

          <p className="text-gray-600 font-mono text-xs mt-2">
            Designed & Built with React + Supabase
          </p>

          <div className="flex justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-cyan-400 opacity-50"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
