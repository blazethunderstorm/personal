""
import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, Star, GitFork, ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';

const PortfolioWebsite = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const GITHUB_USERNAME = 'blazethunderstorm';

  useEffect(() => {
    fetchGitHubRepos();
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`);
      const data = await response.json();
      setRepos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching repos:', error);
      setLoading(false);
    }
  };

  const skills = [
    'JavaScript', 'TypeScript', 'Python', 'Go', 'Rust',
    'React.js', 'Next.js', 'Vue.js', 'Node.js',
    'PostgreSQL', 'MongoDB', 'Prisma', 'Docker'
  ];

  const projects = [
    {
      title: 'AI Interview Platform',
      description: 'AI-powered interview platform with real-time voice recording and speech-to-text conversion using Google Voice API.',
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'TypeScript'],
      image: 'https://framerusercontent.com/images/N16VdOBv1amjj0wr12P6E3gOwmE.png',
      link: 'https://github.com/blazethunderstorm'
    },
    {
      title: 'Real-Time Chat',
      description: 'Full-stack chat application with Socket.io. 60% performance improvement and 10+ customizable themes.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.io'],
      image: 'https://framerusercontent.com/images/1T1ldBJSor5rgN46llm2vgVpk0.png',
      link: 'https://github.com/blazethunderstorm'
    },
    {
      title: 'P2P File Storage',
      description: 'Decentralized storage system in Go with AES-256 encryption. 10x faster file lookup with content addressing.',
      tech: ['Go', 'AES-256', 'P2P'],
      image: 'https://framerusercontent.com/images/ddhY3P17R8lXbF3cEN4iBWcWAU.png',
      link: 'https://github.com/blazethunderstorm'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Floating icons background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-20 h-20 animate-float" style={{animationDelay: '0s'}}>
          <img src="https://framerusercontent.com/images/grOfHN4Z91R4RY8Ye02dPcpCXAw.png" alt="" className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-16 h-16 animate-float" style={{animationDelay: '1s'}}>
          <img src="https://framerusercontent.com/images/kAx6zQGxVDsbioR4i7SOKmmhus.png" alt="" className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-20 w-24 h-24 animate-float" style={{animationDelay: '2s'}}>
          <img src="https://framerusercontent.com/images/Tj5TFfAwkBCxbEHWxHJ6nHCo8s.png" alt="" className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 right-10 w-20 h-20 animate-float" style={{animationDelay: '1.5s'}}>
          <img src="https://framerusercontent.com/images/jA8BEN7KXQjGxAD88VYd9sfoyJo.png" alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold tracking-tight">ANIRUDH NARANG</div>
            <div className="hidden md:flex gap-8 text-sm">
              <a href="#work" className="text-gray-400 hover:text-white transition-colors">Work</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-6xl w-full" style={{transform: `translateY(${scrollY * 0.1}px)`}}>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6 animate-fade-in">
              <Sparkles size={14} />
              <span>Available for opportunities</span>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tight leading-none animate-fade-in">
            Full Stack
            <br />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Developer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
            Building exceptional digital experiences with modern technologies. 
            Specialized in AI, real-time systems, and scalable architectures.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <a href="#contact" className="group px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all flex items-center gap-2">
              <span>Get in touch</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="#work" className="px-8 py-4 border border-white/10 rounded-full font-medium hover:border-white/30 transition-all">
              View work
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-6 text-sm text-gray-500 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <div>📍 Jabalpur, India</div>
            <div>💻 IIIT Jabalpur</div>
            <div>🏆 LeetCode 1769</div>
          </div>
        </div>
      </section>

      {/* Projects with Images */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Featured Work</h2>
            <p className="text-4xl md:text-5xl font-bold">Selected Projects</p>
          </div>
          
          {/* Horizontal Scrolling Container */}
          <div className="overflow-x-auto pb-8 -mx-6 px-6">
            <div className="flex gap-6" style={{width: 'max-content'}}>
              {projects.map((project, idx) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-96 flex-shrink-0"
                  style={{
                    animation: 'fade-in-up 0.6s ease-out',
                    animationDelay: `${idx * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="text-gray-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={20} />
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
            <ChevronRight size={16} />
            <span>Scroll to see more</span>
          </div>
        </div>
      </section>

      {/* GitHub Grid */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Open Source</h2>
            <p className="text-4xl md:text-5xl font-bold">GitHub Repositories</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.slice(0, 9).map((repo, idx) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                  style={{
                    animation: 'fade-in-up 0.6s ease-out',
                    animationDelay: `${idx * 0.05}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Github className="text-gray-400" size={24} />
                    <ExternalLink className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" size={16} />
                  </div>
                  
                  <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {repo.name}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={12} />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} />
                      {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills */}
      <section id="about" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-sm cursor-default"
                    style={{
                      animation: 'fade-in 0.5s ease-out',
                      animationDelay: `${idx * 0.03}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8">GitHub Activity</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <img 
                    src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=dark&bg_color=00000000&title_color=a855f7&text_color=ffffff&icon_color=a855f7&border_color=ffffff20&hide_border=false`}
                    alt="GitHub Stats"
                    className="w-full"
                  />
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <img 
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=dark&bg_color=00000000&title_color=a855f7&text_color=ffffff&border_color=ffffff20&hide_border=false`}
                    alt="Top Languages"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8">Get in Touch</h2>
            <p className="text-5xl md:text-7xl font-bold mb-8">
              Let's work
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                together
              </span>
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <a 
              href="mailto:aniruddhnaarang@gmail.com"
              className="group text-3xl md:text-4xl font-bold hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-pink-500 transition-all flex items-center gap-3"
            >
              aniruddhnaarang@gmail.com
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={32} />
            </a>
            
            <div className="flex gap-8 text-gray-400">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a href="https://leetcode.com/blazethunderstorm" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LeetCode
              </a>
              <a href="tel:+919996751679" className="hover:text-white transition-colors">
                +91 99967 51679
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Anirudh Narang. All rights reserved.</p>
          <p>Designed & developed with React + TypeScript</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;