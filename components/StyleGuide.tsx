import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Download, ExternalLink, ArrowLeft, Type, Palette, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const StyleGuide: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    // Prevent indexing
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.getElementsByTagName('head')[0].appendChild(meta);
    document.title = "Styleguide | Magic Pop Studio";

    return () => {
      document.getElementsByTagName('head')[0].removeChild(meta);
    };
  }, []);

  const colors = [
    { 
      name: 'Magic Black', 
      hex: '#000000', 
      rgb: '0, 0, 0', 
      cmyk: '0, 0, 0, 100', 
      pantone: 'Black 6 C',
      text: 'text-off-white' 
    },
    { 
      name: 'Off White', 
      hex: '#F9F7F2', 
      rgb: '249, 247, 242', 
      cmyk: '0, 1, 3, 2', 
      pantone: '7527 C',
      text: 'text-magic-black' 
    },
    { 
      name: 'Magic Orange', 
      hex: '#FF4D00', 
      rgb: '255, 77, 0', 
      cmyk: '0, 80, 100, 0', 
      pantone: '172 C',
      text: 'text-off-white' 
    },
    { 
      name: 'Magic Blue', 
      hex: '#0038FF', 
      rgb: '0, 56, 255', 
      cmyk: '90, 70, 0, 0', 
      pantone: '2728 C',
      text: 'text-off-white' 
    },
    { 
      name: 'Magic Pink', 
      hex: '#FFB7D5', 
      rgb: '255, 183, 213', 
      cmyk: '0, 35, 5, 0', 
      pantone: '707 C',
      text: 'text-magic-black' 
    },
    { 
      name: 'Magic Yellow', 
      hex: '#FACC15', 
      rgb: '250, 204, 21', 
      cmyk: '0, 15, 95, 0', 
      pantone: '116 C',
      text: 'text-magic-black' 
    },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-off-white text-magic-black font-inter selection:bg-magic-blue selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <Link to="/" className="group flex items-center gap-2 text-off-white hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-archivo uppercase text-sm tracking-widest">Back to site</span>
        </Link>
        <div className="font-archivo uppercase text-xl text-off-white tracking-tighter">
          Magic Pop<span className="font-editorial lowercase text-2xl ml-2">styleguide</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <h1 className="font-archivo text-[12vw] md:text-[8vw] leading-[0.8] uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-magic-black to-magic-blue">
            The Visual<br />Identity
          </h1>
          <p className="font-editorial text-2xl md:text-4xl italic max-w-3xl opacity-60">
            A system of craft and curiosity. This guide defines the aesthetic core of Magic Pop Studio.
          </p>
        </motion.section>

        {/* Logos */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-magic-black rounded-full flex items-center justify-center text-off-white">
              <ImageIcon size={24} />
            </div>
            <h2 className="font-archivo text-4xl uppercase tracking-tighter">Logos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-12 rounded-2xl border border-magic-black/5 flex flex-col items-center justify-center relative group"
            >
              <div className="font-archivo text-5xl uppercase tracking-tighter text-magic-black mb-4">
                Magic Pop<span className="font-editorial lowercase text-4xl ml-2">studio</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest opacity-40">Primary Vertical</span>
              <button className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-magic-black text-white p-3 rounded-full hover:scale-110 active:scale-95 duration-200">
                <Download size={18} />
              </button>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-magic-black p-12 rounded-2xl flex flex-col items-center justify-center relative group"
            >
              <div className="font-archivo text-5xl uppercase tracking-tighter text-off-white mb-4">
                Magic Pop<span className="font-editorial lowercase text-4xl ml-2 text-magic-blue">studio</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest opacity-40 text-off-white">Dark Inverse</span>
              <button className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-magic-blue text-white p-3 rounded-full hover:scale-110 active:scale-95 duration-200">
                <Download size={18} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-magic-blue rounded-full flex items-center justify-center text-off-white">
              <Palette size={24} />
            </div>
            <h2 className="font-archivo text-4xl uppercase tracking-tighter">Palette</h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {colors.map((color) => (
              <motion.div
                key={color.hex}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                onClick={() => handleCopy(color.hex)}
                className={`group cursor-pointer aspect-[4/5] rounded-2xl p-5 flex flex-col justify-end transition-all duration-500 hover:shadow-2xl relative overflow-hidden ${color.text}`}
                style={{ backgroundColor: color.hex }}
              >
                <div className="relative z-10 w-full">
                  <p className="font-archivo uppercase text-[10px] tracking-widest mb-3 opacity-60 border-b border-current/20 pb-1">{color.name}</p>
                  
                  <div className="space-y-1.5 font-mono text-[10px] uppercase leading-tight">
                    <div className="flex justify-between items-center group/item">
                      <span className="opacity-40 text-[9px]">HEX</span>
                      <span className="font-bold flex items-center gap-1">
                        {color.hex}
                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                          {copiedColor === color.hex ? <Check size={10} /> : <Copy size={10} />}
                        </div>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-40 text-[9px]">RGB</span>
                      <span>{color.rgb}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-40 text-[9px]">CMYK</span>
                      <span>{color.cmyk}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-40 text-[9px]">PANTONE</span>
                      <span>{color.pantone}</span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Spacing & Grid */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-magic-pink rounded-full flex items-center justify-center text-magic-black">
              <div className="w-6 h-6 border-2 border-current opacity-50" />
            </div>
            <h2 className="font-archivo text-4xl uppercase tracking-tighter">Geometry</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-magic-black/40 font-archivo uppercase text-[10px] tracking-widest">
            <div className="space-y-4">
              <p>Corner Radius</p>
              <div className="h-20 bg-white rounded-sm border border-magic-black/5 flex items-center justify-center">2px (Logo/Buttons)</div>
              <div className="h-20 bg-white rounded-2xl border border-magic-black/5 flex items-center justify-center">16px (Cards)</div>
              <div className="h-20 bg-white rounded-full border border-magic-black/5 flex items-center justify-center">Full (Pills)</div>
            </div>
            <div className="space-y-4">
              <p>Section Spacing</p>
              <div className="h-16 bg-magic-blue/5 border-y border-magic-blue/10 flex items-center justify-center">64px (Mobile Gap)</div>
              <div className="h-32 bg-magic-blue/5 border-y border-magic-blue/10 flex items-center justify-center">128px (Desktop Gap)</div>
            </div>
            <div className="space-y-4">
              <p>Interactive</p>
              <div className="h-12 bg-magic-blue text-white flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">Hover State</div>
              <div className="h-12 border border-magic-black/10 flex items-center justify-center cursor-not-allowed">Disabled</div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-magic-orange rounded-full flex items-center justify-center text-off-white">
              <Type size={24} />
            </div>
            <h2 className="font-archivo text-4xl uppercase tracking-tighter">Typography</h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Archivo Black */}
            <div className="p-8 md:p-12 rounded-3xl bg-white border border-magic-black/5">
              <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                <div>
                  <h3 className="font-archivo text-[10px] uppercase tracking-widest mb-2 opacity-40">Headline Font</h3>
                  <p className="font-archivo text-5xl md:text-7xl uppercase tracking-tighter leading-none">Archivo Black</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <a 
                    href="https://fonts.google.com/specimen/Archivo+Black" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-4 rounded-full bg-magic-black text-white hover:scale-110 duration-200"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <span className="font-archivo text-[10px] uppercase tracking-widest opacity-40">Weight: 400 (Extra Bold)</span>
                </div>
              </div>
              <p className="font-archivo text-2xl md:text-4xl uppercase tracking-tighter leading-none opacity-10 break-all">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                0123456789!@#$%^&*
              </p>
            </div>

            {/* Instrument Serif */}
            <div className="p-8 md:p-12 rounded-3xl bg-white border border-magic-black/5">
              <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                <div>
                  <h3 className="font-archivo text-[10px] uppercase tracking-widest mb-2 opacity-40">Display Font</h3>
                  <p className="font-editorial text-5xl md:text-6xl italic leading-none">Instrument Serif</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <a 
                    href="https://fonts.google.com/specimen/Instrument+Serif" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-4 rounded-full bg-magic-black text-white hover:scale-110 duration-200"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <span className="font-archivo text-[10px] uppercase tracking-widest opacity-40">Weights: 400, 400 Italic</span>
                </div>
              </div>
              <div className="space-y-4 opacity-10">
                <p className="font-editorial text-3xl md:text-4xl">The quick brown fox jumps over the lazy dog.</p>
                <p className="font-editorial text-3xl md:text-4xl italic">The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>

            {/* Inter */}
            <div className="p-8 md:p-12 rounded-3xl bg-white border border-magic-black/5">
              <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                <div>
                  <h3 className="font-archivo text-[10px] uppercase tracking-widest mb-2 opacity-40">Interface Font</h3>
                  <p className="font-inter text-3xl md:text-4xl font-bold tracking-tight leading-none">Inter</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <a 
                    href="https://fonts.google.com/specimen/Inter" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-4 rounded-full bg-magic-black text-white hover:scale-110 duration-200"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <span className="font-archivo text-[10px] uppercase tracking-widest opacity-40">Weights: 400, 500, 700, 900</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-20">
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-60 mb-1 block">Regular (400)</span>
                    <p className="font-inter text-base">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-60 mb-1 block">Medium (500)</span>
                    <p className="font-inter font-medium text-base">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-60 mb-1 block">Bold (700)</span>
                    <p className="font-inter font-bold text-base">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-60 mb-1 block">Black (900)</span>
                    <p className="font-inter font-black text-base">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Action */}
        <footer className="pt-20 border-t border-magic-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm uppercase tracking-widest opacity-40">© 2026 Magic Pop Design System</p>
          <div className="flex gap-8">
            <a href="#" className="font-archivo uppercase text-xs tracking-widest hover:text-magic-blue">Download Brand Pack</a>
            <a href="#" className="font-archivo uppercase text-xs tracking-widest hover:text-magic-blue">Source Files</a>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {copiedColor && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 bg-magic-blue text-white font-archivo uppercase text-sm tracking-widest rounded-full shadow-2xl"
          >
            Copied: {copiedColor}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StyleGuide;
