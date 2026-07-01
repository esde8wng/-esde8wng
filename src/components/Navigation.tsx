import React, { useState, useEffect } from 'react';
import { 
  School, Menu, X, ChevronDown, Phone, Mail, MapPin, 
  Clock, ArrowRight, Trophy, BookOpen, FileText, UserPlus, 
  Compass, Eye, Landmark, Globe, Sparkles, AlertCircle, Send, CheckCircle, Upload, Shield, MessageSquare, FileCheck,
  Instagram, Youtube, Facebook
} from 'lucide-react';
import { SCHOOL_CONFIG } from '../data/schoolData';
import schoolLogo from '../assets/images/logo_sdn8_wonogiri_1782901758925.jpg';

interface NavigationProps {
  currentPage: string;
}

export const Navbar: React.FC<NavigationProps> = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('school_config');
    return saved ? JSON.parse(saved) : SCHOOL_CONFIG;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handleConfigUpdate = () => {
      const saved = localStorage.getItem('school_config');
      if (saved) {
        setConfig(JSON.parse(saved));
      }
    };
    window.addEventListener('school_config_updated', handleConfigUpdate);
    window.addEventListener('storage', handleConfigUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('school_config_updated', handleConfigUpdate);
      window.removeEventListener('storage', handleConfigUpdate);
    };
  }, []);

  const navItems = [
    { name: 'Beranda', link: '/index.html', key: 'beranda' },
    {
      name: 'Profil',
      key: 'profil',
      dropdown: [
        { name: 'Sambutan Kepala Sekolah', link: '/profil.html#sambutan' },
        { name: 'Sejarah Sekolah', link: '/profil.html#sejarah' },
        { name: 'Visi Misi & Tujuan', link: '/profil.html#visi-misi' },
        { name: 'Guru & Tendik', link: '/profil.html#guru' },
        { name: 'Fasilitas Belajar', link: '/profil.html#fasilitas' },
      ]
    },
    {
      name: 'Kegiatan',
      key: 'kegiatan',
      dropdown: [
        { name: 'Semua Kegiatan', link: '/kegiatan.html' },
        { name: 'Intrakurikuler', link: '/kegiatan.html?cat=Intrakurikuler' },
        { name: 'Kokurikuler', link: '/kegiatan.html?cat=Kokurikuler' },
        { name: 'Ekstrakurikuler', link: '/kegiatan.html?cat=Ekstrakurikuler' },
      ]
    },
    { name: 'Prestasi', link: '/prestasi.html', key: 'prestasi' },
    { name: 'Galeri', link: '/galeri.html', key: 'galeri' },
    {
      name: 'Berita & Inovasi',
      key: 'publik',
      dropdown: [
        { name: 'Kabar Berita & Pengumuman', link: '/berita.html' },
        { name: 'Inovasi GEMARI', link: '/inovasi.html#gemari' },
        { name: 'Inovasi DITALI RAPIA', link: '/inovasi.html#ditali-rapia' },
      ]
    },
    {
      name: 'Transparansi',
      key: 'transparansi',
      dropdown: [
        { name: 'Laporan RKAS & BOS', link: '/transparansi.html' },
        { name: 'Layanan Publik & SIPPN', link: '/layanan-publik.html' },
      ]
    }
  ];

  const handleDropdownToggle = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${scrolled ? 'bg-white shadow-md py-2 text-slate-800' : 'bg-emerald-950/90 text-white backdrop-blur-md py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <a id="nav-brand" href="/index.html" className="flex items-center space-x-2.5 group">
            <div className={`p-0.5 rounded-full overflow-hidden transition-all shrink-0 ${scrolled ? 'bg-emerald-100' : 'bg-white/10'}`}>
              <img 
                src={schoolLogo} 
                alt="Logo SDN 8 Wonogiri" 
                className="w-8 h-8 object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-sans font-extrabold text-base sm:text-lg tracking-tight leading-none group-hover:text-emerald-500 transition-colors">
                SD NEGERI 8
              </h1>
              <p className={`font-mono text-[9px] tracking-widest uppercase mt-0.5 ${scrolled ? 'text-slate-500' : 'text-emerald-300'}`}>
                Wonogiri • Terakreditasi {config.accreditation || '91'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.dropdown) {
                const isDropdownActive = currentPage === item.key;
                return (
                  <div 
                    key={item.key} 
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      id={`nav-dropdown-btn-${item.key}`}
                      className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                        isDropdownActive 
                          ? scrolled ? 'bg-emerald-50 text-emerald-700' : 'bg-white/15 text-white'
                          : scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-100 hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                    </button>
                    
                    {/* Dropdown Box */}
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 overflow-hidden transform opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 origin-top-left">
                      <div className="p-2 space-y-1">
                        {item.dropdown.map((subItem, idx) => (
                          <a
                            key={idx}
                            href={subItem.link}
                            className="block px-4 py-2.5 text-xs font-medium rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              } else {
                const isItemActive = currentPage === item.key;
                return (
                  <a
                    id={`nav-link-${item.key}`}
                    key={item.key}
                    href={item.link}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                      isItemActive 
                        ? scrolled ? 'bg-emerald-50 text-emerald-700' : 'bg-white/15 text-white'
                        : scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-100 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              }
            })}

            {/* SPMB Highlight Button */}
            <a
              id="nav-spmb-cta"
              href="/spmb.html"
              className="ml-4 flex items-center space-x-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>SPMB 2026</span>
            </a>

            {/* Kontak Button */}
            <a
              id="nav-kontak-cta"
              href="/kontak.html"
              className={`ml-2 text-xs font-bold uppercase px-4 py-2.5 rounded-full border transition-all ${
                scrolled 
                  ? 'border-emerald-600 text-emerald-700 hover:bg-emerald-50' 
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              Kontak
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden space-x-2">
            <a
              href="/spmb.html"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full shadow-sm"
            >
              SPMB
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/10 text-white'}`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-100 max-h-[85vh] overflow-y-auto animate-fadeIn">
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.key} className="border-b border-slate-100 pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
                  {item.dropdown ? (
                    <div>
                      <button
                        id={`mobile-dropdown-${item.key}`}
                        onClick={() => handleDropdownToggle(item.key)}
                        className="flex justify-between items-center w-full px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.key ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.key && (
                        <div className="pl-4 mt-1 space-y-1 bg-slate-50/50 p-2 rounded-lg">
                          {item.dropdown.map((subItem, idx) => (
                            <a
                              key={idx}
                              href={subItem.link}
                              onClick={() => setIsOpen(false)}
                              className="block px-3 py-2 text-xs font-semibold text-slate-600 hover:text-emerald-700"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="/spmb.html"
                onClick={() => setIsOpen(false)}
                className="flex justify-center items-center space-x-1 bg-amber-500 text-white font-bold text-xs uppercase py-3 rounded-xl shadow"
              >
                <UserPlus className="w-4 h-4" />
                <span>SPMB 2026</span>
              </a>
              <a
                href="/kontak.html"
                onClick={() => setIsOpen(false)}
                className="flex justify-center items-center space-x-1 border border-emerald-600 text-emerald-700 font-bold text-xs uppercase py-3 rounded-xl"
              >
                <span>Kontak</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

interface LocalReport {
  id: string;
  name: string;
  contact: string;
  category: string;
  subject: string;
  message: string;
  date: string;
  status: string;
  attachmentName?: string;
}

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isOpenLapor, setIsOpenLapor] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [myReports, setMyReports] = useState<LocalReport[]>([]);
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('school_config');
    return saved ? JSON.parse(saved) : SCHOOL_CONFIG;
  });
  
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    category: 'Pengaduan',
    subject: '',
    message: '',
    isAnonymous: false,
    agreeTerms: false
  });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  useEffect(() => {
    // Load previously submitted reports for simulation persistence
    const saved = localStorage.getItem('sdn8_lapor_reports');
    if (saved) {
      try {
        setMyReports(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    const handleConfigUpdate = () => {
      const savedConfig = localStorage.getItem('school_config');
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      }
    };
    window.addEventListener('school_config_updated', handleConfigUpdate);
    window.addEventListener('storage', handleConfigUpdate);

    return () => {
      window.removeEventListener('school_config_updated', handleConfigUpdate);
      window.removeEventListener('storage', handleConfigUpdate);
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.agreeTerms) {
      alert('Anda harus menyetujui syarat pelaporan terlebih dahulu.');
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `LPR-SDN8-${randomNum}`;
    
    const newReport: LocalReport = {
      id: generatedId,
      name: formState.isAnonymous ? 'Rahasia/Anonim' : (formState.name || 'Umum'),
      contact: formState.isAnonymous ? 'Rahasia' : formState.contact,
      category: formState.category,
      subject: formState.subject,
      message: formState.message,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'Verifikasi Tim SP4N',
      attachmentName: attachedFile ? attachedFile.name : undefined
    };

    const updatedReports = [newReport, ...myReports];
    setMyReports(updatedReports);
    localStorage.setItem('sdn8_lapor_reports', JSON.stringify(updatedReports));

    setTrackingId(generatedId);
    setSubmissionSuccess(true);

    // Reset Form fields
    setFormState({
      name: '',
      contact: '',
      category: 'Pengaduan',
      subject: '',
      message: '',
      isAnonymous: false,
      agreeTerms: false
    });
    setAttachedFile(null);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900 print:hidden">
      
      {/* Upper Info Bar - REDESIGNED to be ultra compact */}
      <div className="bg-emerald-950/80 py-5 text-white border-b border-emerald-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left text-xs">
            <div className="flex flex-row items-center justify-center md:justify-start space-x-3">
              <div className="p-2 rounded-full bg-emerald-900 text-amber-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">Surel Resmi</p>
                <p className="text-sm font-bold">{SCHOOL_CONFIG.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <a href="https://www.lapor.go.id/" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Logo_SP4N_LAPOR.png" 
                  alt="Logo SP4N-LAPOR!" 
                  className="h-12 w-auto bg-white p-2 rounded-lg shadow-sm border border-slate-200 object-contain"
                />
              </a>
            </div>

            <div className="flex flex-row items-start justify-center md:justify-end space-x-3">
              <div className="p-2 rounded-full bg-emerald-900 text-amber-400 shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider mb-1">Jam Pelayanan Kantor</p>
                <div className="text-xs font-bold text-slate-100 space-y-0.5">
                  <p>{SCHOOL_CONFIG.workingHours.seninKamis}</p>
                  <p>{SCHOOL_CONFIG.workingHours.jumat}</p>
                  <p>{SCHOOL_CONFIG.workingHours.sabtu}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - REDESIGNED to be high-density and compact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Column 1: School Identity */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-0.5 rounded-full bg-emerald-950 border border-emerald-900/60 shrink-0">
                <img 
                  src={schoolLogo} 
                  alt="Logo SDN 8 Wonogiri" 
                  className="w-7 h-7 object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm sm:text-base leading-tight">SD NEGERI 8</h3>
                <p className="text-[9px] text-emerald-500 tracking-wider font-mono uppercase">Wonogiri</p>
              </div>
            </div>
            <div className="space-y-1 bg-slate-900/30 p-3 rounded-xl border border-slate-900/60 font-sans">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-0.5">Motto Sekolah</span>
              <p className="text-xs leading-relaxed text-slate-300">
                {config.motto || '"SEHATI" Sehat, Semangat, Bahagia, Berprestasi'}
              </p>
            </div>
            <div className="flex items-center space-x-2 pt-1 font-sans">
              <span className="bg-emerald-950 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-900/50">
                Akreditasi {config.accreditation || '91'}
              </span>
              <span className="bg-slate-900 text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-800">
                Est. {(!config.established || config.established === '1978') ? '1959' : config.established}
              </span>
            </div>
            
            {/* Social Media Links */}
            <div className="pt-2 space-y-1.5">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Media Sosial Resmi</p>
              <div className="flex items-center space-x-2">
                <a 
                  href="https://www.tiktok.com/@sdn.8.wonogiri" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/85 transition-all shadow-sm flex items-center justify-center"
                  title="TikTok Resmi"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.9 4.51-2.43 6.13-1.63 1.73-4.04 2.73-6.44 2.66-2.52-.06-4.93-1.2-6.55-3.05-1.57-1.8-2.31-4.22-2.11-6.66.21-2.36 1.34-4.59 3.12-6.13 1.74-1.51 4.11-2.22 6.42-1.99v4c-1.1-.03-2.2.32-3.09 1.02-.91.73-1.49 1.83-1.58 3.01-.09 1.15.22 2.34.92 3.25.75.97 1.95 1.51 3.19 1.48 1.17-.03 2.28-.53 3.04-1.39.73-.83 1.13-1.95 1.12-3.09-.01-5.61-.01-11.23-.01-16.84z"/>
                  </svg>
                </a>
                <a 
                  href={SCHOOL_CONFIG.socials.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 hover:bg-slate-800 border border-slate-800/85 transition-all shadow-sm flex items-center justify-center"
                  title="Instagram Resmi"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={SCHOOL_CONFIG.socials.youtube} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-red-500 hover:bg-slate-800 border border-slate-800/85 transition-all shadow-sm flex items-center justify-center"
                  title="YouTube Resmi"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href={SCHOOL_CONFIG.socials.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-blue-500 hover:bg-slate-800 border border-slate-800/85 transition-all shadow-sm flex items-center justify-center"
                  title="Facebook Resmi"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Lokasi Kontak */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase border-b border-emerald-900 pb-1.5 mb-2.5">
              Lokasi Utama
            </h4>
            <div className="flex items-start space-x-2 text-xs leading-relaxed">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <a 
                href={SCHOOL_CONFIG.googleMapsLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-amber-400 transition-colors"
                title="Buka di Google Maps"
              >
                {SCHOOL_CONFIG.address}
              </a>
            </div>
            
            <div className="pt-1">
              <a 
                href="/kontak.html"
                className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-emerald-400 hover:text-amber-400 transition-colors bg-emerald-950/40 px-2.5 py-1.5 rounded border border-emerald-900/30 w-full"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Peta Sekolah Interaktif</span>
                <ArrowRight className="w-3 h-3 ml-auto text-emerald-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Lower copyright bar - COMPACT */}
        <div className="border-t border-slate-900 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center text-[10px] space-y-2.5 md:space-y-0 text-slate-500">
          <p>
            &copy; {currentYear} <strong>{SCHOOL_CONFIG.name}</strong>. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex space-x-4">
            <a href="/layanan-publik.html" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
            <a href="/transparansi.html" className="hover:text-slate-300 transition-colors">Informasi Publik</a>
            <span className="text-slate-700">v1.3.0-Dense</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE LAPOR! PUBLIC INTEGRATION MODAL */}
      {isOpenLapor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-xl bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn"
            id="lapor-modal"
          >
            {/* Header Red government style */}
            <div className="bg-gradient-to-r from-red-700 via-red-800 to-rose-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="bg-white text-red-800 font-extrabold text-xs px-2 py-0.5 rounded tracking-wider">
                  SP4N
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-xs sm:text-sm leading-tight">Formulir Laporan & Aspirasi</h3>
                  <p className="text-[9px] text-red-100 uppercase tracking-widest font-semibold font-mono">SD Negeri 8 Wonogiri Portal</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpenLapor(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Section scrollable */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
              {!submissionSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 text-[11px] flex items-start space-x-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Perhatian:</span> Laporan akan ditindaklanjuti secara objektif oleh tim sekolah & Dinas Pendidikan. Harap menyampaikan informasi yang benar, jelas, dan santun.
                    </div>
                  </div>

                  {/* Kategori Laporan Selection */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Klasifikasi Laporan *</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { val: 'Pengaduan', desc: 'Keluhan / Masalah' },
                        { val: 'Aspirasi', desc: 'Usulan / Saran' },
                        { val: 'Permintaan Informasi', desc: 'Tanya Publik' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setFormState({ ...formState, category: item.val })}
                          className={`p-1.5 rounded-lg text-left border transition-all ${
                            formState.category === item.val
                              ? 'border-red-600 bg-red-50 text-red-950 font-bold'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <p className="text-xs">{item.val}</p>
                          <p className="text-[8px] text-slate-400 font-medium leading-none mt-0.5">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input & Anonymous Option */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-0.5">Nama Pelapor *</label>
                      <input
                        type="text"
                        disabled={formState.isAnonymous}
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder={formState.isAnonymous ? "Identitas Dirahasiakan" : "Ketik nama lengkap Anda"}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-red-500 disabled:bg-slate-50 transition-all"
                        required={!formState.isAnonymous}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-0.5">Kontak Pelapor (Email / No. HP) *</label>
                      <input
                        type="text"
                        disabled={formState.isAnonymous}
                        value={formState.contact}
                        onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                        placeholder={formState.isAnonymous ? "Hubungan Terlindungi" : "No. Telepon / Email"}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-red-500 disabled:bg-slate-50 transition-all"
                        required={!formState.isAnonymous}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <input
                      type="checkbox"
                      id="lapor-anon"
                      checked={formState.isAnonymous}
                      onChange={(e) => setFormState({ ...formState, isAnonymous: e.target.checked })}
                      className="rounded text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="lapor-anon" className="text-[11px] font-bold text-slate-600 cursor-pointer">
                      Sembunyikan identitas saya (Lapor secara Anonim)
                    </label>
                  </div>

                  {/* Subject and Message */}
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-0.5">Judul / Hal Laporan *</label>
                      <input
                        type="text"
                        placeholder="Contoh: Kerusakan Meja Kelas, Usulan Pembelajaran Lingkungan"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-red-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-0.5">Isi Laporan / Deskripsi Kejadian *</label>
                      <textarea
                        rows={3}
                        placeholder="Ketik rincian informasi Anda di sini..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-red-500 transition-all resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Public Upload File */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-0.5">Unggah Berkas Bukti (Opsional)</label>
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('lapor-file-input')?.click()}
                      className={`border border-dashed rounded-xl p-3 text-center cursor-pointer transition-all ${
                        isDragOver ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50'
                      }`}
                    >
                      <input
                        type="file"
                        id="lapor-file-input"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="text-[11px] font-bold text-slate-700">Tarik berkas ke sini atau klik untuk memilih file</p>
                      
                      {attachedFile && (
                        <div className="mt-1.5 p-1.5 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-between text-[11px] font-semibold inline-flex border border-emerald-100 max-w-full overflow-hidden">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-600 mr-1 shrink-0" />
                          <span className="truncate max-w-[150px]">{attachedFile.name}</span>
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeAttachment();
                            }}
                            className="ml-2 text-slate-400 hover:text-red-600 font-bold"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="lapor-terms"
                      checked={formState.agreeTerms}
                      onChange={(e) => setFormState({ ...formState, agreeTerms: e.target.checked })}
                      className="rounded text-red-600 focus:ring-red-500 mt-0.5"
                      required
                    />
                    <label htmlFor="lapor-terms" className="text-[10px] text-slate-500 cursor-pointer leading-tight">
                      Saya bertanggung jawab atas kebenaran laporan ini dan setuju dengan kebijakan pengelolaan aduan sekolah.
                    </label>
                  </div>

                  {/* Submission actions */}
                  <div className="pt-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsOpenLapor(false)}
                      className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center space-x-1.5 py-2 text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>KIRIM ADUAN</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3 text-left">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-100">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base leading-snug">Laporan Berhasil Terkirim!</h4>
                    <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                      Laporan Anda telah terdaftar dalam sistem SP4N-LAPOR! internal SD Negeri 8 Wonogiri.
                    </p>
                  </div>

                  {/* Ticket Receipt */}
                  <div className="max-w-sm mx-auto bg-slate-50 rounded-xl p-3 border border-slate-200 text-left space-y-1 text-[11px]">
                    <div className="flex justify-between border-b border-slate-200 pb-1 font-bold">
                      <span className="text-slate-500">KODE TIKET</span>
                      <span className="text-red-700 font-mono tracking-wider">{trackingId}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Klasifikasi</span>
                      <span className="font-semibold">{myReports[0]?.category}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Perihal</span>
                      <span className="font-semibold truncate max-w-[160px]">{myReports[0]?.subject}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tanggal</span>
                      <span className="font-semibold">{myReports[0]?.date}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-slate-200">
                      <span>Status</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">
                        {myReports[0]?.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-[9px] text-slate-400">
                    Simpan Kode Tiket di atas untuk memantau perkembangan aduan. Laporan Anda juga terekam pada peramban ini.
                  </p>

                  <div className="pt-3 flex justify-center space-x-2">
                    <button
                      onClick={() => setSubmissionSuccess(false)}
                      className="px-4 py-1.5 text-xs font-bold text-red-700 border border-red-200 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      Tulis Laporan Lain
                    </button>
                    <button
                      onClick={() => setIsOpenLapor(false)}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              )}

              {/* Saved local reports list inside the modal for reality */}
              {myReports.length > 0 && (
                <div className="pt-4 border-t border-slate-100 text-left">
                  <h4 className="font-bold text-[10px] text-slate-800 uppercase tracking-wider mb-2 flex items-center">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Riwayat Aduan Anda ({myReports.length})
                  </h4>
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                    {myReports.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] flex justify-between items-start gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-mono text-[9px] font-bold text-red-700 bg-red-50 px-1 py-0.2 rounded border border-red-100">
                              {item.id}
                            </span>
                            <span className="text-slate-400">{item.date}</span>
                          </div>
                          <p className="font-bold text-slate-800 truncate max-w-[250px]">{item.subject}</p>
                          <p className="text-slate-500 line-clamp-1 leading-snug">{item.message}</p>
                        </div>
                        <span className="shrink-0 px-1.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 text-[8px] font-black uppercase rounded">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
