"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, ExternalLink, Star, GitFork, ArrowUpRight, Send, User, Phone, MessageSquare, Linkedin, Code } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

const PortfolioWebsite = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const GITHUB_USERNAME = 'blazethunderstorm';
  const roles = ['Frontend Developer', 'Backend Developer', 'Problem Solver'];

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
        { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
        { name: 'Rust', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
        { name: 'Ruby', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg' },
        { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' }
      ]
    },
    {
      title: 'Frameworks & Technologies',
      skills: [
        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
        { name: 'Nuxt.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Socket.io', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg' },
        { name: 'Rails', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain-wordmark.svg' },
        { name: 'Prisma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' }
      ]
    },
    {
      title: 'Databases',
      skills: [
        { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' }
      ]
    },
    {
      title: 'Development Tools',
      skills: [
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'npm', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' },
        { name: 'Webpack', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg' }
      ]
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface ParticleType {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      update: () => void;
      draw: () => void;
    }

    const particles: ParticleType[] = [];
    const particleCount = 150;

    class Particle implements ParticleType {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 3 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > (canvas?.width || 0)) this.vx *= -1;
        if (this.y < 0 || this.y > (canvas?.height || 0)) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200 && ctx) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 200)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [repos]);

  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      } else if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
      const data = await response.json();
      setRepos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields (Name, Email, Message)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`);
    
    window.location.href = `mailto:aniruddhnaarang@gmail.com?subject=${subject}&body=${body}`;
    
    setFormData({ name: '', email: '', phone: '', message: '' });
    alert('Opening your email client... 📧');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-white">ANIRUDH NARANG</div>
            <div className="flex gap-6 text-sm">
              <a href="#home" className="hover:text-gray-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-gray-400 transition-colors">About</a>
              <a href="#skills" className="hover:text-gray-400 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-gray-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-gray-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative z-10 pt-20">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              Hi There,<br />I'm <span className="text-gray-400">Anirudh</span>
            </h1>
            <div className="text-2xl md:text-3xl mb-8 h-12 text-gray-300">
              I Am Into <span className="text-white font-bold">{displayText}</span>
              <span className="animate-blink">|</span>
            </div>
            <a href="#about" className="inline-flex px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all items-center gap-2">
              About Me <ArrowUpRight size={18} />
            </a>
            <div className="flex gap-4 mt-8">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform hover:scale-110 border border-white/20">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/anirudh-narang" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform hover:scale-110 border border-white/20">
                <Linkedin size={20} />
              </a>
              <a href="https://leetcode.com/anirudh-narang" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform hover:scale-110 border border-white/20">
                <Code size={20} />
              </a>
              <a href="mailto:aniruddhnaarang@gmail.com" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform hover:scale-110 border border-white/20">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="flex justify-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
            <div className="w-96 h-96 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center animate-float relative overflow-hidden border-4 border-white/20 group">
              <img src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg" alt="Profile" className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <User className="inline mr-2" size={40} />About <span className="text-gray-400">Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0 -translate-x-10 transition-all duration-1000">
              <div className="relative group">
                <div className="absolute -inset-1 bg-white/10 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg" alt="Anirudh" className="relative w-full rounded-3xl object-cover border-2 border-white/20 transform group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div className="text-left animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000 delay-300">
              <h3 className="text-4xl font-bold mb-4 text-white">I'm Anirudh</h3>
              <p className="text-2xl text-gray-400 font-semibold mb-6">Full Stack Developer</p>
              <p className="text-gray-400 leading-relaxed mb-6 text-lg">I am a Full-Stack developer based in Jabalpur, India. I am studying at IIIT Jabalpur pursuing B.Tech in Electronics and Communication Engineering. I am passionate about building scalable applications and solving complex problems through code.</p>
              <div className="space-y-3 text-gray-400 mb-8">
                <p className="flex items-center gap-3"><Mail className="text-white" size={20} /><span className="text-white font-semibold">Email:</span> aniruddhnaarang@gmail.com</p>
                <p className="flex items-center gap-3"><Phone className="text-white" size={20} /><span className="text-white font-semibold">Phone:</span> +91 99967 51679</p>
                <p className="flex items-center gap-3"><User className="text-white" size={20} /><span className="text-white font-semibold">Place:</span> Jabalpur, India</p>
              </div>
              <a href="#contact" className="inline-flex px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all items-center gap-2 transform hover:scale-105">
                Resume <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-32 px-6 relative z-10 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            Skills & <span className="text-gray-400">Abilities</span>
          </h2>
          <p className="text-center text-gray-500 mb-16 text-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">Technologies I work with</p>
          
          <div className="space-y-16">
            {skillCategories.map((category, catIdx) => (
              <div key={catIdx} className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000" style={{ transitionDelay: `${catIdx * 200}ms` }}>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">{category.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group" style={{ transitionDelay: `${(catIdx * 200) + (idx * 80)}ms` }}>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative bg-gray-900 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all transform group-hover:scale-105 group-hover:-translate-y-2 h-full flex flex-col items-center justify-center min-h-[140px]">
                          <img src={skill.logo} alt={skill.name} className="w-16 h-16 mb-3 transform group-hover:scale-110 transition-transform object-contain" />
                          <h3 className="text-base font-semibold text-white text-center">{skill.name}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            Featured <span className="text-gray-400">Projects</span> & Other <span className="text-gray-400">Repos</span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {repos.map((repo, idx) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <div className="relative h-full">
                    <div className="absolute -inset-0.5 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-gray-900 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all transform group-hover:scale-105 group-hover:-translate-y-2 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <Github className="text-white group-hover:text-gray-300 transition-colors" size={32} />
                        <ExternalLink className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-300 transition-colors">{repo.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{repo.description || 'No description available'}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-white/10">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-white" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={12} /> {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="py-32 px-6 relative z-10 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            🎧 Get In <span className="text-gray-400">Touch</span>
          </h2>
          
          <div className="mt-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
            <div className="relative group">
              <div className="absolute -inset-1 bg-white/5 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="flex items-center justify-center">
                    <img src="https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg" alt="Contact" className="w-full max-w-md transform hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                      <User className="absolute left-4 top-4 text-gray-500 group-focus-within:text-white transition-colors" size={20} />
                      <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/20 rounded-xl focus:outline-none focus:border-white focus:bg-black/70 transition-all text-white placeholder-gray-500" />
                    </div>
                    
                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 text-gray-500 group-focus-within:text-white transition-colors" size={20} />
                      <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/20 rounded-xl focus:outline-none focus:border-white focus:bg-black/70 transition-all text-white placeholder-gray-500" />
                    </div>
                    
                    <div className="relative group">
                      <Phone className="absolute left-4 top-4 text-gray-500 group-focus-within:text-white transition-colors" size={20} />
                      <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/20 rounded-xl focus:outline-none focus:border-white focus:bg-black/70 transition-all text-white placeholder-gray-500" />
                    </div>
                    
                    <div className="relative group">
                      <MessageSquare className="absolute left-4 top-4 text-gray-500 group-focus-within:text-white transition-colors" size={20} />
                      <textarea placeholder="Message *" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required rows={4} className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/20 rounded-xl focus:outline-none focus:border-white focus:bg-black/70 transition-all resize-none text-white placeholder-gray-500" />
                    </div>
                    
                    <button type="submit" className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 transform hover:scale-105">
                      Submit <Send size={18} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/10 text-center text-gray-500 relative z-10">
        <p>© Anirudh Narang. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `
}</style>
    </div>
  );
}
export default PortfolioWebsite;