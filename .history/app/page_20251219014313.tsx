import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, ExternalLink, Star, GitFork, ArrowUpRight, Send, User, Phone, MessageSquare, Linkedin, Twitter } from 'lucide-react';

const PortfolioWebsite = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);

  const GITHUB_USERNAME = 'blazethunderstorm';
  const roles = ['Full Stack Developer', 'Backend Developer', 'Frontend Developer', 'Problem Solver'];

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
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

          if (distance < 120) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
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

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! 🚀');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">ANIRUDH NARANG</div>
            <div className="flex gap-6 text-sm">
              <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative z-10">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Hi There,
              <br />
              I'm <span className="text-purple-500">Anirudh</span>
            </h1>
            <div className="text-2xl md:text-3xl mb-8 h-12">
              I Am Into <span className="text-orange-500 font-bold">{displayText}</span>
              <span className="animate-blink">|</span>
            </div>
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all flex items-center gap-2">
              About Me <ArrowUpRight size={18} />
            </button>
            <div className="flex gap-4 mt-8">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center transition-all">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center transition-all">
                <Twitter size={20} />
              </a>
              <a href="mailto:aniruddhnaarang@gmail.com" className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-96 h-96 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-float relative overflow-hidden">
              <img 
                src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg" 
                alt="Profile"
                className="w-full h-full object-cover rounded-full animate-rotate-slow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <User className="inline mr-2" size={40} />
            About <span className="text-purple-500">Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <img 
                src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                alt="Anirudh"
                className="w-64 h-64 rounded-2xl mx-auto mb-6 object-cover grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="text-left flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">I'm Anirudh</h3>
              <p className="text-xl text-purple-400 mb-6">Full Stack Developer</p>
              <p className="text-gray-400 leading-relaxed mb-6">
                I am a Full-Stack developer based in Jabalpur, India. I am studying at IIIT Jabalpur pursuing B.Tech in Electronics and Communication Engineering. I am passionate about building scalable applications and solving complex problems through code.
              </p>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-purple-400 font-semibold">Email:</span> aniruddhnaarang@gmail.com</p>
                <p><span className="text-purple-400 font-semibold">Place:</span> Jabalpur, India</p>
              </div>
              <button className="mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all inline-flex items-center gap-2 w-fit">
                Resume <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Featured <span className="text-purple-500">Projects</span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {repos.map((repo, idx) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all hover:scale-105"
                  style={{
                    animation: 'fade-in-up 0.6s ease-out',
                    animationDelay: `${idx * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Github className="text-purple-400" size={32} />
                    <ExternalLink className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{repo.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{repo.description || 'No description'}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {repo.language && <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      {repo.language}
                    </span>}
                    <span className="flex items-center gap-1">
                      <Star size={12} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10 bg-gradient-to-b from-gray-900 to-purple-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            🎧 Get In <span className="text-purple-500">Touch</span>
          </h2>
          
          <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex items-center justify-center">
                <img 
                  src="https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg"
                  alt="Contact"
                  className="w-full max-w-md"
                />
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <User className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>
                
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>
                
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
                  <textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 transition-all resize-none"
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  Submit <Send size={18} />
                </button>
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
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;