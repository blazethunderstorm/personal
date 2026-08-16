"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Github, Mail, ExternalLink, Star, GitFork, ArrowUpRight, Send, User, Phone,
  MessageSquare, Linkedin, Code, Menu, X, MapPin, Download, Briefcase,
  GraduationCap, Trophy, Users, Award, FileText,
} from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

const GITHUB_USERNAME = 'blazethunderstorm';
const RESUME_URL = '/Anirudh_Narang_Resume.pdf';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const ROLES = ['Software Engineer', 'Backend Developer', 'Full-Stack Developer', 'Problem Solver'];

const SOCIALS = [
  { icon: Github, href: `https://github.com/${GITHUB_USERNAME}`, label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/anirudh-narang', label: 'LinkedIn' },
  { icon: Code, href: 'https://leetcode.com/anirudh-narang', label: 'LeetCode' },
  { icon: Mail, href: 'mailto:aniruddhnaarang@gmail.com', label: 'Email' },
];

const EXPERIENCE = [
  {
    role: 'Software Development Engineer Intern',
    company: 'Docstribe',
    location: 'Gurgaon, India',
    date: 'Aug 2026 - Present',
    stack: ['Python', 'FastAPI', 'Celery', 'Redis', 'Google Cloud Storage', 'PostgreSQL', 'REST APIs'],
    points: [
      'Rebuilt WhatsApp notification delivery on the Pinnacle API with split connect/read timeouts and a 3-attempt retry in place of one 30s timeout, reaching 1.04s average latency in production.',
      'Served consultation audio, radiology scans and patient images from Google Cloud Storage via time-bound signed URLs; fixed a private-LAN routing failure by generating prescription PDFs through GCS, restoring 100% delivery success.',
      'Decoupled long-running AI transcription jobs from FastAPI workers with a Celery + Redis task queue, and added RBAC with multi-tenant data scoping across admin endpoints.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Rimo LLC',
    location: 'Tokyo, Japan (Remote)',
    date: 'Jun 2026 - Jul 2026',
    stack: ['TypeScript', 'React', 'Next.js', 'Go', 'Python', 'LangChain/LLMs', 'GCP (Cloud Run)', 'Firestore'],
    points: [
      'Improved stability of the Rimo Voice web platform: diagnosed and fixed bugs in the TypeScript/Next.js client and shipped targeted UX improvements.',
      'Analysed quality of AI-generated landing pages and refined LLM prompts, validating each change against a repeatable eval setup to lift generation accuracy.',
      'Tested new features and triaged defects with the engineering team to keep releases on track.',
    ],
  },
  {
    role: 'Issue Triage Team Member',
    company: 'CircuitVerse (Open Source)',
    location: 'Remote',
    date: 'Jan 2026 - Present',
    stack: ['Ruby on Rails', 'PostgreSQL', 'Vue.js', 'JavaScript', 'HTML5 Canvas', 'Jest', 'GitHub Actions'],
    points: [
      'Triaged and categorised the incoming issue backlog on the Rails monorepo, turning raw reports into a clear, actionable queue for maintainers.',
      'Reproduced reported bugs in the Vue.js UI and HTML5 Canvas logic simulator and improved contributor documentation, lowering onboarding friction for newcomers.',
    ],
  },
];

const SKILL_GROUPS = [
  {
    title: 'Languages',
    skills: [
      { name: 'TypeScript', logo: 'typescript/typescript-original' },
      { name: 'JavaScript', logo: 'javascript/javascript-original' },
      { name: 'Go', logo: 'go/go-original' },
      { name: 'Python', logo: 'python/python-original' },
      { name: 'C/C++', logo: 'cplusplus/cplusplus-original' },
      { name: 'Ruby', logo: 'ruby/ruby-original' },
      { name: 'SQL', logo: null },
      { name: 'HTML/CSS', logo: 'html5/html5-original' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'React', logo: 'react/react-original' },
      { name: 'Next.js', logo: 'nextjs/nextjs-original' },
      { name: 'Vue.js', logo: 'vuejs/vuejs-original' },
      { name: 'Node.js', logo: 'nodejs/nodejs-original' },
      { name: 'FastAPI', logo: 'fastapi/fastapi-original' },
      { name: 'Celery', logo: null },
      { name: 'Rails', logo: 'rails/rails-plain-wordmark' },
      { name: 'Prisma', logo: 'prisma/prisma-original' },
      { name: 'LangChain', logo: null },
    ],
  },
  {
    title: 'Tools & Data',
    skills: [
      { name: 'Git', logo: 'git/git-original' },
      { name: 'Docker', logo: 'docker/docker-original' },
      { name: 'GCP', logo: 'googlecloud/googlecloud-original' },
      { name: 'PostgreSQL', logo: 'postgresql/postgresql-original' },
      { name: 'Redis', logo: 'redis/redis-original' },
      { name: 'MongoDB', logo: 'mongodb/mongodb-original' },
      { name: 'Firestore', logo: 'firebase/firebase-plain' },
      { name: 'BigQuery', logo: null },
      { name: 'GitHub Actions', logo: 'githubactions/githubactions-plain' },
    ],
  },
  {
    title: 'Core Concepts',
    skills: [
      { name: 'Data Structures & Algorithms', logo: null },
      { name: 'Object-Oriented Programming', logo: null },
      { name: 'Operating Systems', logo: null },
      { name: 'Computer Networks', logo: null },
      { name: 'DBMS', logo: null },
      { name: 'Distributed Systems', logo: null },
    ],
  },
];

const FEATURED_PROJECTS = [
  {
    title: 'Mock Master',
    subtitle: 'AI Interview Platform',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    points: [
      'Engineered an AI-powered mock-interview platform in Next.js and TypeScript with a responsive Tailwind + Shadcn UI front end.',
      'Backed it with Prisma ORM on PostgreSQL and secure authentication, and integrated the Google Voice API for real-time speech-to-text.',
    ],
    href: `https://github.com/${GITHUB_USERNAME}/Mock-Master`,
  },
  {
    title: 'P2P Encrypted File Storage',
    subtitle: 'Distributed Systems',
    tags: ['Go', 'TCP', 'AES', 'SHA-1', 'Concurrency'],
    points: [
      'Built a peer-to-peer distributed file store in Go on a custom TCP transport with message broadcasting and streaming — no central server required.',
      'Added AES encryption per transfer over a SHA-1 content-addressable store, and served peers concurrently with goroutines, fetching missing files from peers on demand.',
    ],
    href: `https://github.com/${GITHUB_USERNAME}/file_storage`,
  },
  {
    title: 'GoRedis',
    subtitle: 'In-Memory Key-Value Store',
    tags: ['Go', 'TCP/IP', 'RESP', 'Concurrency'],
    points: [
      'Engineered an in-memory key-value store in Go implementing the Redis Serialization Protocol (RESP), so standard Redis clients connect unchanged.',
      'Architected a concurrent TCP server on goroutines and channels with an event-loop pattern, using sync.RWMutex for thread safety under parallel reads and writes.',
    ],
    href: `https://github.com/${GITHUB_USERNAME}/redisserver-go-`,
  },
];

const FEATURED_HANDLES = new Set(FEATURED_PROJECTS.map((p) => p.href.split('/').pop()?.toLowerCase()));

const ACHIEVEMENTS = [
  { icon: Trophy, value: '650+', label: 'LeetCode problems solved', detail: 'Rating 1,851 · Knight' },
  { icon: Award, value: '200+', label: 'Competitive programming', detail: 'Codeforces Pupil · CodeChef 3★' },
  { icon: Users, value: 'Core', label: 'Programming Club member', detail: 'Mentoring juniors in DSA' },
  { icon: Star, value: '2nd', label: 'Place, PROD-G', detail: 'Business Event' },
];

function DevIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`}
      alt=""
      aria-hidden="true"
      className={className}
      loading="lazy"
    />
  );
}

function SectionHeading({
  eyebrow,
  title,
  accentWord,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  accentWord?: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
      <span className="inline-block text-xs font-semibold tracking-[0.3em] text-accent uppercase mb-4">
        {eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-white">
        {title} {accentWord && <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">{accentWord}</span>}
      </h2>
      {subtitle && <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

const PortfolioWebsite = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [repoError, setRepoError] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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
    const particleCount = 90;

    class Particle implements ParticleType {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = Math.random() * 2 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > (canvas?.width || 0)) this.vx *= -1;
        if (this.y < 0 || this.y > (canvas?.height || 0)) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(139, 124, 246, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let frameId: number;
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

          if (distance < 160 && ctx) {
            ctx.strokeStyle = `rgba(139, 124, 246, ${0.12 * (1 - distance / 160)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      frameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [repos]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const currentText = ROLES[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % ROLES.length);
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
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setRepos(data.filter((r) => !r.fork && !FEATURED_HANDLES.has(r.name.toLowerCase())).slice(0, 6));
      } else {
        setRepoError(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setRepoError(true);
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

    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-accent selection:text-black">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-2/10 rounded-full blur-[140px] pointer-events-none" />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-lg font-bold tracking-tight text-white">
              ANIRUDH<span className="text-accent">.</span>
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-accent hover:text-white transition-all"
              >
                <FileText size={15} /> Resume
              </a>
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-white/10 pt-4">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold"
              >
                <FileText size={15} /> Resume
              </a>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative z-10 pt-24">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white leading-[1.05]">
              Hi, I&apos;m<br />
              <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">Anirudh Narang</span>
            </h1>
            <div className="text-2xl md:text-3xl mb-6 h-10 text-gray-300">
              <span className="text-white font-semibold">{displayText}</span>
              <span className="animate-blink text-accent">|</span>
            </div>
            <p className="text-gray-400 text-lg max-w-lg mb-8 leading-relaxed">
              Building scalable backend systems and full-stack products. Currently an SDE Intern at{' '}
              <span className="text-white font-medium">Docstribe</span>, previously{' '}
              <span className="text-white font-medium">Rimo LLC</span> (Tokyo). B.Tech ECE @ IIITDM Jabalpur.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex px-8 py-3.5 bg-gradient-to-r from-accent to-accent-2 text-white hover:shadow-[0_0_30px_rgba(139,124,246,0.5)] rounded-full font-semibold transition-all items-center gap-2">
                View Projects <ArrowUpRight size={18} />
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-8 py-3.5 border border-white/20 hover:border-accent hover:bg-white/5 rounded-full font-semibold transition-all items-center gap-2"
              >
                <Download size={18} /> Resume
              </a>
            </div>
            <div className="flex gap-4 mt-10">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-accent/20 flex items-center justify-center transition-all transform hover:scale-110 border border-white/10 hover:border-accent/50"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
            <div className="relative w-72 h-72 md:w-96 md:h-96 animate-float">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent to-accent-2 rounded-full blur-2xl opacity-30" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 group shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt="Anirudh Narang"
                  fill
                  priority
                  sizes="(max-width: 768px) 288px, 384px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-2 -left-4 bg-[#0c0c10]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-2xl font-bold text-white leading-none">650+</p>
                <p className="text-xs text-gray-400 mt-1">LeetCode solved</p>
              </div>
              <div className="absolute -top-2 -right-4 bg-[#0c0c10]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-2xl font-bold text-white leading-none">3x</p>
                <p className="text-xs text-gray-400 mt-1">Internships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 md:py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Get to know me" title="About" accentWord="Me" />
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-3 animate-on-scroll opacity-0 -translate-x-10 transition-all duration-1000">
              <h3 className="text-3xl font-bold mb-2 text-white">Software Engineer, Backend-leaning Full-Stack</h3>
              <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                I&apos;m a Software Engineer based in Jabalpur, India, pursuing a B.Tech in Electronics and Communication
                Engineering at IIITDM Jabalpur. I like building distributed systems and product-grade backends as much as
                polished front ends — from a peer-to-peer encrypted file store in Go to production notification pipelines
                serving real patients at Docstribe.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Outside of internships, I&apos;m a core member of my college&apos;s Programming Club mentoring juniors in DSA,
                an active competitive programmer (Codeforces Pupil, CodeChef 3★), and an open-source contributor triaging
                issues for CircuitVerse.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0"><Mail size={18} /></span>
                  <span className="text-sm break-all">aniruddhnaarang@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0"><Phone size={18} /></span>
                  <span className="text-sm">+91 99967 51679</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0"><MapPin size={18} /></span>
                  <span className="text-sm">Jabalpur, India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0"><GraduationCap size={18} /></span>
                  <span className="text-sm">IIITDM Jabalpur, ECE</span>
                </div>
              </div>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="inline-flex mt-8 px-8 py-3 bg-white text-black hover:bg-accent hover:text-white rounded-full font-semibold transition-all items-center gap-2 transform hover:scale-105">
                <Download size={18} /> Download Resume
              </a>
            </div>

            <div className="md:col-span-2 animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000 delay-300 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
                <div className="flex items-center gap-2 text-accent mb-3 text-sm font-semibold uppercase tracking-wider">
                  <Briefcase size={16} /> Currently
                </div>
                <p className="text-white font-semibold">SDE Intern @ Docstribe</p>
                <p className="text-gray-500 text-sm mt-1">Gurgaon, India · Aug 2026 - Present</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
                <div className="flex items-center gap-2 text-accent mb-3 text-sm font-semibold uppercase tracking-wider">
                  <GraduationCap size={16} /> Education
                </div>
                <p className="text-white font-semibold">IIITDM Jabalpur</p>
                <p className="text-gray-500 text-sm mt-1">B.Tech, Electronics & Communication Engineering</p>
                <p className="text-gray-500 text-sm">Aug 2023 - Present</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">1851</p>
                  <p className="text-gray-500 text-xs mt-1">LeetCode (Knight)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1389</p>
                  <p className="text-gray-500 text-xs mt-1">Codeforces (Pupil)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 md:py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Where I've worked" title="Work" accentWord="Experience" />
          <div className="relative pl-8 md:pl-10 space-y-12">
            <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-white/10 to-transparent" />
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative animate-on-scroll opacity-0 translate-y-10 transition-all duration-700" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="absolute -left-8 md:-left-10 top-1.5 w-4 h-4 rounded-full bg-accent shadow-[0_0_12px_rgba(139,124,246,0.8)] border-4 border-[#050505]" />
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 hover:border-accent/40 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-accent font-medium">{exp.company} · <span className="text-gray-500 font-normal">{exp.location}</span></p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap bg-white/5 px-3 py-1 rounded-full border border-white/10">{exp.date}</span>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {exp.points.map((pt, i) => (
                      <li key={i} className="text-gray-400 text-sm leading-relaxed flex gap-3">
                        <span className="text-accent mt-1.5 shrink-0">▹</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.stack.map((s) => (
                      <span key={s} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 md:py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="What I work with" title="Skills &" accentWord="Abilities" subtitle="Technologies and concepts I use to ship reliable software" />

          <div className="space-y-12">
            {SKILL_GROUPS.map((group, catIdx) => (
              <div key={catIdx} className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000" style={{ transitionDelay: `${catIdx * 150}ms` }}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-5">{group.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-accent/40 hover:-translate-y-0.5 transition-all"
                    >
                      {skill.logo ? (
                        <DevIcon slug={skill.logo} className="w-4 h-4 object-contain" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                      <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 md:py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="What I've built" title="Featured" accentWord="Projects" />

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {FEATURED_PROJECTS.map((project, idx) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="relative h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-accent to-accent-2 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500" />
                  <div className="relative bg-[#0a0a0c] rounded-2xl p-7 border border-white/10 group-hover:border-accent/40 transition-all transform group-hover:-translate-y-1.5 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <Github className="text-white" size={28} />
                      <ExternalLink className="text-gray-500 group-hover:text-accent transition-colors" size={18} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-sm text-accent mb-4">{project.subtitle}</p>
                    <ul className="space-y-2 mb-5 flex-grow">
                      {project.points.map((pt, i) => (
                        <li key={i} className="text-gray-400 text-sm leading-relaxed flex gap-2">
                          <span className="text-accent shrink-0">▹</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {project.tags.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-center mb-10 text-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            More on <span className="text-accent">GitHub</span>
          </h3>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : repoError || repos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-6">Couldn&apos;t load repositories right now.</p>
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="inline-flex px-6 py-3 border border-white/20 hover:border-accent rounded-full font-semibold transition-all items-center gap-2">
                Visit GitHub Profile <ArrowUpRight size={16} />
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {repos.map((repo, idx) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <div className="relative h-full">
                    <div className="absolute -inset-0.5 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative bg-white/[0.03] rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all transform group-hover:-translate-y-1 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <Github className="text-white group-hover:text-accent transition-colors" size={24} />
                        <ExternalLink className="text-gray-500 group-hover:text-white transition-colors" size={16} />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white group-hover:text-accent transition-colors">{repo.name}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{repo.description || 'No description available'}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-white/10">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                        <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="achievements" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Beyond the code" title="Achievements &" accentWord="Extras" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((item, idx) => (
              <div
                key={idx}
                className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 text-center hover:border-accent/40 hover:-translate-y-1 transition-all"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                  <item.icon size={22} />
                </div>
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-gray-300 text-sm font-medium mt-1">{item.label}</p>
                <p className="text-gray-500 text-xs mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 md:py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Let's talk" title="Get In" accentWord="Touch" subtitle="Have a role, a project, or just want to say hi? My inbox is open." />

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-4 animate-on-scroll opacity-0 -translate-x-10 transition-all duration-1000">
              <a href="mailto:aniruddhnaarang@gmail.com" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 hover:border-accent/40 transition-all group">
                <span className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0"><Mail size={18} /></span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-white font-medium text-sm truncate group-hover:text-accent transition-colors">aniruddhnaarang@gmail.com</p>
                </div>
              </a>
              <a href="tel:+919996751679" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 hover:border-accent/40 transition-all group">
                <span className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0"><Phone size={18} /></span>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-white font-medium text-sm group-hover:text-accent transition-colors">+91 99967 51679</p>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
                <span className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0"><MapPin size={18} /></span>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-white font-medium text-sm">Jabalpur, India</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-full bg-white/5 hover:bg-accent/20 flex items-center justify-center transition-all transform hover:scale-110 border border-white/10 hover:border-accent/50"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000 delay-200">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative group">
                      <User className="absolute left-4 top-4 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                      <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-all text-white placeholder-gray-500" />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                      <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-all text-white placeholder-gray-500" />
                    </div>
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-4 top-4 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                    <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-all text-white placeholder-gray-500" />
                  </div>

                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                    <textarea placeholder="Message *" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={4} className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-all resize-none text-white placeholder-gray-500" />
                  </div>

                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-accent to-accent-2 text-white hover:shadow-[0_0_30px_rgba(139,124,246,0.5)] rounded-xl font-semibold transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]">
                    {submitted ? 'Opening your email client…' : 'Send Message'} <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Anirudh Narang. All rights reserved.</p>
          <div className="flex gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-accent transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
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
