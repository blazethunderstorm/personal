"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, ExternalLink, Star, GitFork, ArrowUpRight, Send, User, Phone, MessageSquare, Linkedin, Code } from 'lucide-react';

const PortfolioWebsite = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const GITHUB_USERNAME = 'blazethunderstorm';
  const roles = ['Business Analyst', 'Full Stack Developer', 'Data Analyst', 'Problem Solver'];

  // Skills data
  const skills = [
    { name: 'ReactJS', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-emerald-500' },
    { name: 'Python', icon: '🐍', color: 'from-blue-400 to-yellow-500' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-500 to-indigo-500' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-teal-500' },
    { name: 'JavaScript', icon: '📜', color: 'from-yellow-400 to-orange-500' },
    { name: 'TypeScript', icon: '💠', color: 'from-blue-500 to-blue-600' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-700 to-gray-900' },
    { name: 'Tailwind CSS', icon: '🎨', color: 'from-cyan-400 to-blue-400' },
    { name: 'Go', icon: '🔷', color: 'from-cyan-500 to-blue-600' },
    { name: 'SQL', icon: '📊', color: 'from-orange-400 to-red-500' },
    { name: 'Tableau', icon: '📈', color: 'from-blue-400 to-purple-500' },
    { name: 'Docker', icon: '🐳', color: 'from-blue-500 to-cyan-500' },
    { name: 'Git', icon: '📂', color: 'from-orange-500 to-red-500' },
    { name: 'Socket.io', icon: '🔌', color: 'from-gray-700 to-gray-900' },
    { name: 'Excel', icon: '📊', color: 'from-green-500 to-green-600' }
  ];

  // Particle Animation with white particles on dark background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        particles.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll animations
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

  // Typewriter Effect
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
  }, [displayText, isDeleting, currentRole, roles]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! 🚀');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              ANIRUDH NARANG
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative z-10 pt-20">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Hi There,
              <br />
              I'm <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Anirudh</span>
            </h1>
            <div className="text-2xl md:text-3xl mb-8 h-12">
              I Am Into <span className="text-orange-400 font-bold">{displayText}</span>
              <span className="animate-blink">|</span>
            </div>
            <a href="#about" className="inline-flex px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold transition-all items-center gap-2 shadow-lg shadow-purple-500/50">
              About Me <ArrowUpRight size={18} />
            </a>
            <div className="flex gap-4 mt-8">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 flex items-center justify-center transition-all transform hover:scale-110 shadow-lg">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/anirudh-narang" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 flex items-center justify-center transition-all transform hover:scale-110 shadow-lg">
                <Linkedin size={20} />
              </a>
              <a href="https://leetcode.com/anirudh-narang" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 flex items-center justify-center transition-all transform hover:scale-110 shadow-lg">
                <Code size={20} />
              </a>
              <a href="mailto:aniruddhnaarang@gmail.com" className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 flex items-center justify-center transition-all transform hover:scale-110 shadow-lg">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="flex justify-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
            <div className="w-96 h-96 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center animate-float relative overflow-hidden shadow-2xl shadow-purple-500/50 group">
              <img 
                src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg" 
                alt="Profile"
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <User className="inline mr-2" size={40} />
            About <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0 -translate-x-10 transition-all duration-1000">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <img 
                  src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                  alt="Anirudh"
                  className="relative w-full rounded-3xl object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="text-left animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000 delay-300">
              <h3 className="text-4xl font-bold mb-4">I'm Anirudh</h3>
              <p className="text-2xl bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent font-semibold mb-6">Business Analyst & Full Stack Developer</p>
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                I am a Full-Stack developer and Business Analyst based in Jabalpur, India. I am studying at IIIT Jabalpur pursuing B.Tech in Electronics and Communication Engineering. I am passionate about building scalable applications, analyzing data for business insights, and solving complex problems through code.
              </p>
              <div className="space-y-3 text-gray-300 mb-8">
                <p className="flex items-center gap-3">
                  <Mail className="text-purple-400" size={20} />
                  <span className="text-purple-400 font-semibold">Email:</span> aniruddhnaarang@gmail.com
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="text-purple-400" size={20} />
                  <span className="text-purple-400 font-semibold">Phone:</span> +91 99967 51679
                </p>
                <p className="flex items-center gap-3">
                  <User className="text-purple-400" size={20} />
                  <span className="text-purple-400 font-semibold">Place:</span> Jabalpur, India
                </p>
              </div>
              <a href="#contact" className="inline-flex px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold transition-all items-center gap-2 shadow-lg shadow-purple-500/50 transform hover:scale-105">
                Resume <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative z-10 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            Skills & <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Abilities</span>
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
            Technologies I work with
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500`}></div>
                  <div className="relative bg-gray-900 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all transform group-hover:scale-105 group-hover:-translate-y-2 shadow-xl">
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{skill.icon}</div>
                    <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            Featured <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {repos.map((repo, idx) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="relative h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative bg-gray-900 rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all transform group-hover:scale-105 group-hover:-translate-y-2 shadow-xl h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <Github className="text-purple-400 group-hover:text-pink-400 transition-colors" size={32} />
                        <ExternalLink className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{repo.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{repo.description || 'No description available'}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-white/10">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400" /> {repo.stargazers_count}
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

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            🎧 Get In <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          
          <div className="mt-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="flex items-center justify-center">
                    <img 
                      src="https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg"
                      alt="Contact"
                      className="w-full max-w-md transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative group">
                      <User className="absolute left-4 top-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                      <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                      />
                    </div>
                    
                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                      />
                    </div>
                    
                    <div className="relative group">
                      <Phone className="absolute left-4 top-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                      />
                    </div>
                    
                    <div className="relative group">
                      <MessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                      <textarea
                        placeholder="Message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
                      />
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50 transform hover:scale-105"
                    >
                      Submit <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 text-center text-gray-400 relative z-10">
        <p>© 2024 Anirudh Narang. All rights reserved.</p>
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
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;