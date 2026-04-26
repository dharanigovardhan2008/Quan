"use client";

import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Code2, 
  Globe2, 
  Layers, 
  LayoutDashboard, 
  Lock, 
  Menu,
  MessageSquare,
  Rocket, 
  ShieldCheck, 
  Sparkles,
  X,
  ChevronDown,
  Zap,
  Smartphone,
  ShoppingCart,
  TrendingUp,
  Cloud,
  Shield,
  Cpu
} from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      amount: formData.get('amount') as string,
      date: formData.get('date') as string,
      phone: formData.get('phone') as string,
      details: formData.get('details') as string,
    };
    
    // Save to Firebase Firestore
    try {
      await addDoc(collection(db, 'project_bookings'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setSubmitStatus('success');
    } catch (err) {
      console.error('Firebase write error:', err);
      setSubmitStatus('error');
    }

    // Also send via WhatsApp
    const text = `*New Project Request*\n\n*Name:* ${data.name}\n*Project Type:* ${data.type}\n*Estimated Budget:* ${data.amount}\n*Estimated Completion Date:* ${data.date}\n*Phone:* ${data.phone}\n*More Details:* ${data.details}`;
    window.open(`https://wa.me/919494777869?text=${encodeURIComponent(text)}`, '_blank');
    
    setIsSubmitting(false);
    setTimeout(() => {
      setProjectModalOpen(false);
      setSubmitStatus('idle');
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Our Work", href: "#works" },
    { name: "Achievements", href: "#achievements" },
    { name: "FAQs", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden font-[family-name:var(--font-geist-sans)]">
      
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300 pointer-events-none">
        <header className={`w-full max-w-[55rem] mx-auto rounded-full transition-all duration-500 pointer-events-auto relative flex items-center ${isScrolled ? 'bg-white/95 backdrop-blur-xl py-2 border border-border/50 shadow-lg shadow-black/5' : 'bg-white py-2 border border-border/20 shadow-md'}`}>
          <div className="w-full px-4 md:px-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="QuantumX Technologies"
                  width={160}
                  height={44}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-7">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-[13px] font-medium text-zinc-500 hover:text-zinc-950 transition-colors">
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="flex items-center">
                <button onClick={() => window.open('https://wa.me/919494777869', '_blank')} className="px-4 py-2 rounded-full bg-[#09090b] text-white text-[13px] font-medium hover:bg-zinc-800 transition-all shadow-sm active:scale-95 flex items-center gap-1.5">
                  Book a Call <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#fafafa]">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 -left-4 w-72 md:w-[500px] h-72 md:h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 md:w-[500px] h-72 md:h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 md:w-[500px] h-72 md:h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

          {/* Background Grid & Blur */}
          <div className="absolute inset-0 z-0 bg-grid-pattern opacity-60"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white border border-border/50 text-foreground text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-gradient-primary">QuantumX 2.0 is now live</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              </div>

              <h1 className="text-[3rem] sm:text-6xl md:text-[5.5rem] leading-[1.1] md:leading-[1.05] font-black tracking-tighter mb-6 sm:mb-8 text-balance text-zinc-900">
                The intelligent platform for <span className="text-gradient-primary">modern enterprise</span>
              </h1>

              <p className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-10 sm:mb-12 max-w-3xl mx-auto text-balance font-medium leading-relaxed px-4 sm:px-0">
                Accelerate your team's workflow with our next-generation suite of tools. Built for speed, designed for scale, and engineered for perfection.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-4">
                <button onClick={() => setProjectModalOpen(true)} className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 rounded-full bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition-all shadow-[0_8px_30px_rgb(37,99,235,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 group text-base md:text-lg">
                  Book a Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => window.open('https://wa.me/919494777869', '_blank')} className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 rounded-full bg-zinc-100 border-2 border-zinc-200 text-zinc-900 font-extrabold hover:border-zinc-300 hover:bg-zinc-200 transition-all shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group text-base md:text-lg">
                  Book a Call
                </button>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Free Consultation</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Fast Delivery</div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="mt-20 relative mx-auto max-w-5xl rounded-2xl md:rounded-[2rem] border border-border/50 bg-white shadow-2xl p-2 md:p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none rounded-2xl md:rounded-[2rem]"></div>
              <div className="bg-muted rounded-xl md:rounded-2xl overflow-hidden aspect-[16/9] relative flex items-center justify-center border border-border/50 group">
                <Image src="/hero_dashboard.png" alt="QuantumX Dashboard Preview" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" priority />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-[#f5f5f7] relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Everything you need to scale</h2>
              <p className="text-lg text-muted-foreground font-medium">
                We've obsessed over every detail to give you a platform that feels incredibly fast and intuitively simple.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  label: 'Performance',
                  labelColor: 'text-indigo-600 bg-indigo-50',
                  title: 'Lightning Fast',
                  desc: 'Built on a modern tech stack ensuring your operations run at the speed of thought.',
                  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop'
                },
                {
                  label: 'Solution',
                  labelColor: 'text-emerald-600 bg-emerald-50',
                  title: 'Enterprise Security',
                  desc: 'Bank-grade encryption and strict compliance protocols keep your data perfectly secure.',
                  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
                },
                {
                  label: 'Insights',
                  labelColor: 'text-violet-600 bg-violet-50',
                  title: 'Advanced Analytics',
                  desc: 'Deep insights into your workflows with beautiful, interactive visualizations.',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
                },
                {
                  label: 'Infrastructure',
                  labelColor: 'text-sky-600 bg-sky-50',
                  title: 'Global Infrastructure',
                  desc: 'Deploy anywhere in the world with our edge-optimized, low-latency network.',
                  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
                },
                {
                  label: 'Security',
                  labelColor: 'text-orange-600 bg-orange-50',
                  title: 'Role-based Access',
                  desc: 'Granular control over who sees what with our powerful permissions system.',
                  image: 'https://images.unsplash.com/photo-1614064641913-6b20ceb4f278?q=80&w=800&auto=format&fit=crop'
                },
                {
                  label: 'Developer',
                  labelColor: 'text-pink-600 bg-pink-50',
                  title: 'Developer API',
                  desc: 'Extend and integrate with your existing tools using our comprehensive GraphQL API.',
                  image: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?q=80&w=800&auto=format&fit=crop'
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-[1.75rem] border border-zinc-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col overflow-hidden p-3.5">
                  {/* Top visual box */}
                  <div className="bg-zinc-100 rounded-2xl overflow-hidden aspect-[16/9] mb-4 relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Content */}
                  <div className="px-1.5 pb-2 flex flex-col">
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 w-fit ${feature.labelColor}`}>
                      {feature.label}
                    </span>
                    <h3 className="text-[1.15rem] font-bold mb-1.5 text-zinc-900 leading-snug">{feature.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white relative z-20">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-6">Our Services</h2>
              <p className="text-xl text-muted-foreground font-medium">
                Comprehensive solutions tailored to elevate your digital presence and operational efficiency.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Web Development', 
                  desc: 'Custom-built websites and web applications that are fast, scalable, and beautifully crafted.',
                  label: 'Development',
                  labelColor: 'text-indigo-600 bg-indigo-50',
                  image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=800&auto=format&fit=crop',
                  tags: ['Next.js', 'React', 'Three.js']
                },
                { 
                  title: 'UI/UX Design', 
                  desc: 'Beautiful interfaces that users love — intuitive, accessible, and visually stunning.',
                  label: 'Design',
                  labelColor: 'text-pink-600 bg-pink-50',
                  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
                  tags: ['Figma', 'Prototyping', 'Research']
                },
                { 
                  title: 'Mobile Apps', 
                  desc: 'Native and cross-platform apps for iOS & Android, built smooth and ready for scale.',
                  label: 'Mobile',
                  labelColor: 'text-emerald-600 bg-emerald-50',
                  image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
                  tags: ['React Native', 'Flutter', 'iOS/Android']
                },
                { 
                  title: 'E-Commerce', 
                  desc: 'Full-featured online stores with seamless checkout, inventory, and payment integrations.',
                  label: 'Commerce',
                  labelColor: 'text-orange-600 bg-orange-50',
                  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
                  tags: ['Shopify', 'Stripe', 'Next.js']
                },
                { 
                  title: 'AI Integration', 
                  desc: 'Cutting-edge AI — chatbots, automation, and intelligent platforms tailored to your needs.',
                  label: 'AI & ML',
                  labelColor: 'text-violet-600 bg-violet-50',
                  image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop',
                  tags: ['OpenAI', 'ML', 'Automation']
                },
                { 
                  title: 'SEO & Marketing', 
                  desc: 'Data-driven SEO and performance marketing to maximize your digital reach and growth.',
                  label: 'Marketing',
                  labelColor: 'text-sky-600 bg-sky-50',
                  image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop',
                  tags: ['SEO', 'Google Ads', 'Analytics']
                },
                { 
                  title: 'Cloud & DevOps', 
                  desc: 'Cloud architecture and CI/CD pipelines for reliable, scalable, and automated deployments.',
                  label: 'DevOps',
                  labelColor: 'text-blue-600 bg-blue-50',
                  image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
                  tags: ['AWS', 'Docker', 'CI/CD']
                },
                { 
                  title: 'Cybersecurity', 
                  desc: 'Penetration testing, security audits, and infrastructure hardening to protect your assets.',
                  label: 'Security',
                  labelColor: 'text-red-600 bg-red-50',
                  image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=800&auto=format&fit=crop',
                  tags: ['Pen Testing', 'Audit', 'Compliance']
                }
              ].map((service, i) => (
                <div key={i} className="bg-white rounded-[2rem] border border-border/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full overflow-hidden">
                  {/* Cover Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 w-fit ${service.labelColor}`}>
                      {service.label}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-zinc-900">{service.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed flex-grow">{service.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {service.tags.map((tag, j) => (
                        <span key={j} className="px-2.5 py-1 bg-zinc-100 text-zinc-500 rounded-full text-xs font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50/40 via-purple-50/20 to-pink-50/40 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-border/50 text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 shadow-sm">
                Achievements
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Recognized excellence</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium text-balance">
                Numbers that speak for our commitment to quality and innovation.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { number: '150+', label: 'Projects Delivered' },
                { number: '50+', label: 'Global Clients' },
                { number: '25+', label: 'Awards Won' },
                { number: '98%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] border border-border/50 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center min-h-[200px]">
                  <div className="text-5xl md:text-7xl font-black text-indigo-500 mb-4 tracking-tighter">{stat.number}</div>
                  <div className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Works Section */}
        <section id="works" className="py-24 bg-white relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Our Selected Works</h2>
              <p className="text-xl text-muted-foreground font-medium">
                A showcase of digital experiences we've crafted for ambitious brands.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'AcadeMe', url: 'https://acade-me.vercel.app/', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop', desc: 'Modern Learning Management System' },
                { name: 'Simats Seat Sync', url: 'https://simats-seat-sync.vercel.app/', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop', desc: 'Real-time Event & Seat Booking Platform' },
                { name: 'Expensa', url: 'https://expensa-five.vercel.app/', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop', desc: 'Smart Financial Tracking Dashboard' },
                { name: 'Safethelock', url: 'https://safethelock.vercel.app/', img: 'https://images.unsplash.com/photo-1614064641913-6b20ceb4f278?q=80&w=800&auto=format&fit=crop', desc: 'Enterprise Security & Access Control' },
                { name: 'Elvera', url: 'https://elvera-beta.vercel.app/', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop', desc: 'Premium Fashion E-Commerce Platform' },
                { name: 'Go Rail India', url: 'https://go-rail-india.vercel.app/', img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop', desc: 'National Railway Logistics Interface' },
                { name: 'Astra', url: 'https://astra-self.vercel.app/', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', desc: 'Advanced Data Analytics & AI System' },
                { name: 'FieldOps', url: 'https://fieldops-2008.vercel.app/', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', desc: 'Comprehensive Operations Management' },
              ].map((work, i) => (
                <a key={i} href={work.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <div className="bg-white p-4 rounded-[2rem] border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                    <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-5 bg-zinc-100">
                      <img src={work.img} alt={work.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="px-3 flex-grow flex flex-col pb-3 text-left">
                      <h3 className="text-xl font-bold mb-1.5 text-zinc-900 group-hover:text-blue-600 transition-colors">{work.name}</h3>
                      <p className="text-sm font-medium text-muted-foreground mb-4">{work.desc}</p>
                      <p className="text-sm font-bold text-blue-600 mt-auto flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">View Project <ArrowRight className="w-3.5 h-3.5 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" /></p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-[#fafafa] relative z-20">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-6 text-balance">Simple, transparent pricing</h2>
              <p className="text-xl text-muted-foreground font-medium">
                No hidden fees. No surprise charges. Just pay for what you use.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: 'Landing Page', price: '₹15k+', desc: 'Perfect for marketing and lead generation.', features: ['Custom Design', 'Responsive Layout', 'SEO Optimization', 'Contact Form'] },
                { name: 'Web Application', price: '₹45k+', desc: 'For businesses needing custom software and dashboards.', features: ['Full-stack Development', 'Authentication', 'Database Integration', 'Admin Panel'], popular: true },
                { name: 'Enterprise Software', price: 'Custom', desc: 'For large organizations with complex needs.', features: ['Microservices', 'Advanced Security', 'Dedicated Support', 'Cloud Infrastructure'] }
              ].map((plan, i) => (
                <div key={i} className={`p-8 md:p-10 rounded-[2.5rem] border ${plan.popular ? 'border-primary/30 premium-shadow relative scale-105 z-10 bg-white/80 backdrop-blur-xl' : 'border-border shadow-sm hover:shadow-xl hover:-translate-y-2'} transition-all duration-500 flex flex-col bg-white group`}>
                  {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">Most Popular</div>}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6"><span className="text-5xl font-black tracking-tight">{plan.price}</span></div>
                  <p className="text-muted-foreground mb-8 flex-grow text-lg">{plan.desc}</p>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-primary shrink-0" /> <span className="font-medium">{feature}</span></li>
                    ))}
                  </ul>
                  <button onClick={() => { plan.price === 'Custom' ? window.open('https://wa.me/919494777869', '_blank') : setProjectModalOpen(true); }} className={`w-full py-5 rounded-full font-extrabold transition-all text-lg ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-[0_10px_40px_rgb(37,99,235,0.4)] hover:-translate-y-1' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-2 border-zinc-200 hover:border-zinc-300 hover:-translate-y-1'}`}>
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Book a Project'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Section */}
        <section id="company" className="py-24 bg-muted/30 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">About QuantumX</h2>
              <p className="text-lg text-muted-foreground">
                We're a team of passionate engineers and designers on a mission to simplify the way you build software.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] bg-white border border-border/50 rounded-[2rem] shadow-xl flex items-center justify-center p-3 overflow-hidden relative group hover:shadow-2xl transition-all duration-500">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                  <Image src="/company_graphic.png" alt="QuantumX Company Graphic" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">To democratize access to enterprise-grade tools, enabling developers of all backgrounds to build scalable, secure, and beautiful applications without the boilerplate.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span className="text-muted-foreground"><strong className="text-foreground">Innovation:</strong> We constantly push the boundaries of what's possible on the web.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span className="text-muted-foreground"><strong className="text-foreground">Simplicity:</strong> Complex problems deserve elegant, intuitive solutions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span className="text-muted-foreground"><strong className="text-foreground">Reliability:</strong> Your trust is our most valuable asset. We build for scale and security.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white relative z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "How long does a typical project take?", a: "Most landing pages take 1-2 weeks, while full web applications can take 4-8 weeks depending on complexity. We will provide a specific timeline during our discovery call." },
                { q: "Do you provide ongoing support?", a: "Yes, we offer monthly maintenance and support packages to ensure your application runs smoothly, stays secure, and remains up-to-date post-launch." },
                { q: "What technologies do you use?", a: "We specialize in modern web technologies including React, Next.js, Tailwind CSS, Node.js, and various secure database solutions to guarantee speed and scalability." },
                { q: "How does the payment process work?", a: "We typically require a 50% deposit upfront to begin work, with the remaining 50% due upon project completion and deployment to your domain." }
              ].map((faq, i) => (
                <div key={i} className="p-8 rounded-[2rem] border border-border/50 bg-zinc-50 hover:bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-[#fafafa]">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-[#111322] rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl border border-[#1e2238]">
              {/* Decorative background elements */}
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full translate-y-1/2 pointer-events-none"></div>
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-4xl sm:text-5xl md:text-[4rem] leading-[1.1] font-black tracking-tighter text-white mb-6 text-balance">
                  Ready to build something extraordinary?
                </h2>
                <p className="text-lg md:text-2xl text-zinc-300 mb-10 md:mb-12 max-w-2xl mx-auto font-medium px-4 sm:px-0">
                  Let's craft a powerful digital presence for your business.
                </p>
                <div className="flex items-center justify-center">
                  <button onClick={() => setProjectModalOpen(true)} className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-6 rounded-full bg-white text-zinc-950 font-black hover:bg-slate-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:-translate-y-1 text-lg md:text-xl flex items-center justify-center gap-3 group">
                    Book a Discovery Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">QuantumX</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Empowering teams to build better, faster, and more beautiful software.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-foreground">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Integrations', 'Pricing', 'Changelog'].map(item => (
                  <li key={item}><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Blog', 'Contact'].map(item => (
                  <li key={item}><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                  <li key={item}><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} QuantumX Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <Globe2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setAuthModalOpen(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{authType === 'signin' ? 'Welcome Back' : 'Create an Account'}</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {authType === 'signin' ? 'Enter your details to access your dashboard.' : 'Sign up to start building with QuantumX.'}
              </p>
            </div>
            <form className="space-y-5" onSubmit={(e) => { 
              e.preventDefault(); 
              alert('Authentication demo! In a real app, this connects to Firebase.'); 
              setAuthModalOpen(false); 
            }}>
              {authType === 'signup' && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-background" placeholder="John Doe" required />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1.5">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-background" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <input type="password" className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-background" placeholder="••••••••" required />
              </div>
              <button type="submit" className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-blue-700 transition-all shadow-[0_8px_30px_rgb(37,99,235,0.4)] mt-4 active:scale-[0.98] text-lg">
                {authType === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {authType === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setAuthType(authType === 'signin' ? 'signup' : 'signin')} className="text-primary font-medium hover:underline transition-all">
                {authType === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setProjectModalOpen(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <button onClick={() => setProjectModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-3xl font-bold mb-2">Book a Project</h3>
              <p className="text-muted-foreground mb-8">Fill out the details below and we'll contact you shortly.</p>
              
              <form className="space-y-5" onSubmit={handleProjectSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-900">Full Name</label>
                  <input name="name" type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-zinc-50 text-zinc-900 placeholder:text-zinc-400" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-900">Phone Number</label>
                  <input name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-zinc-50 text-zinc-900 placeholder:text-zinc-400" placeholder="+91 9876543210" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-900">Type of Project</label>
                  <select name="type" className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-zinc-50 text-zinc-900" required>
                    <option value="">Select a project type</option>
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                    <option value="E-Commerce Store">E-Commerce Store</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="SEO & Digital Marketing">SEO & Digital Marketing</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Cybersecurity Audit">Cybersecurity Audit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-zinc-900">Estimated Budget</label>
                    <input name="amount" type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-zinc-50 text-zinc-900 placeholder:text-zinc-400" placeholder="e.g. ₹50k" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-zinc-900">Target Date</label>
                    <input name="date" type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-zinc-50 text-zinc-900 placeholder:text-zinc-400" placeholder="e.g. 1 Month" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-900">Project Details</label>
                  <textarea name="details" rows={3} className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 resize-none" placeholder="Tell us more about what you want to build..." required></textarea>
                </div>
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" /> Saved to database & redirecting to WhatsApp!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium text-sm">
                    Could not save to database, but your WhatsApp message was sent.
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-[0_8px_30px_rgb(37,99,235,0.4)] mt-4 active:scale-[0.98] text-lg flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span> Submitting...</>
                  ) : (
                    <>Send via WhatsApp &amp; Save</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

