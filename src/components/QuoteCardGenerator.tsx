import React, { useState, useRef } from 'react';
import { 
  Quote, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Palette, 
  Clock, 
  User,
  Share2
} from 'lucide-react';
import { ContentPillar } from '../data/contentData';

interface QuoteCardGeneratorProps {
  pillar: ContentPillar;
}

type ColorTheme = 'studio-dark' | 'electric-neon' | 'cyber-sunset' | 'executive-navy';

export const QuoteCardGenerator: React.FC<QuoteCardGeneratorProps> = ({ pillar }) => {
  const [theme, setTheme] = useState<ColorTheme>('studio-dark');
  const [author, setAuthor] = useState<string>(pillar.quoteAuthor || "Amir");
  const [timestamp, setTimestamp] = useState<string>(pillar.quoteTimestamp || "11:16 - 11:41");
  const [quoteText, setQuoteText] = useState<string>(pillar.quote);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyText = () => {
    navigator.clipboard.writeText(`"${quoteText}" — ${author} [${timestamp}]`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      // Dynamic import html-to-image or fallback canvas approach
      const htmlToImage = await import('html-to-image');
      const dataUrl = await htmlToImage.toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      
      const link = document.createElement('a');
      link.download = `Devoted-QuoteCard-Pillar${pillar.pillarNumber}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export PNG image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Theme styling definitions
  const getThemeStyles = () => {
    switch (theme) {
      case 'electric-neon':
        return {
          bg: "bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950",
          border: "border-emerald-500/30",
          accentText: "text-emerald-400",
          badgeBg: "bg-emerald-950/80 border-emerald-700/50 text-emerald-300",
          quoteSymbol: "text-emerald-500/20",
          highlightGradient: "from-emerald-400 to-cyan-400",
          avatarBg: "bg-emerald-600"
        };
      case 'cyber-sunset':
        return {
          bg: "bg-gradient-to-br from-slate-950 via-rose-950/40 to-amber-950/50",
          border: "border-rose-500/30",
          accentText: "text-amber-400",
          badgeBg: "bg-rose-950/80 border-rose-700/50 text-rose-300",
          quoteSymbol: "text-rose-500/20",
          highlightGradient: "from-rose-400 via-pink-400 to-amber-400",
          avatarBg: "bg-rose-600"
        };
      case 'executive-navy':
        return {
          bg: "bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950",
          border: "border-blue-500/30",
          accentText: "text-cyan-400",
          badgeBg: "bg-blue-950/80 border-blue-700/50 text-cyan-300",
          quoteSymbol: "text-blue-500/20",
          highlightGradient: "from-blue-400 to-cyan-400",
          avatarBg: "bg-blue-600"
        };
      case 'studio-dark':
      default:
        return {
          bg: "bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/60",
          border: "border-violet-500/30",
          accentText: "text-violet-400",
          badgeBg: "bg-violet-950/80 border-violet-700/50 text-violet-300",
          quoteSymbol: "text-violet-500/20",
          highlightGradient: "from-violet-400 via-indigo-300 to-purple-400",
          avatarBg: "bg-violet-600"
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Palette className="w-4 h-4 text-violet-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Quote Card Visual Theme:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme('studio-dark')}
              className={`px-2.5 py-1 text-xs rounded-md transition font-medium cursor-pointer ${
                theme === 'studio-dark' ? 'bg-violet-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Studio Dark
            </button>
            <button
              onClick={() => setTheme('electric-neon')}
              className={`px-2.5 py-1 text-xs rounded-md transition font-medium cursor-pointer ${
                theme === 'electric-neon' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Electric Neon
            </button>
            <button
              onClick={() => setTheme('cyber-sunset')}
              className={`px-2.5 py-1 text-xs rounded-md transition font-medium cursor-pointer ${
                theme === 'cyber-sunset' ? 'bg-rose-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Cyber Sunset
            </button>
            <button
              onClick={() => setTheme('executive-navy')}
              className={`px-2.5 py-1 text-xs rounded-md transition font-medium cursor-pointer ${
                theme === 'executive-navy' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Executive Navy
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Quote Text'}
          </button>

          <button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/20 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {isExporting ? 'Exporting...' : 'Download PNG Card'}
          </button>
        </div>
      </div>

      {/* Rendered Quote Card Canvas / Preview Box */}
      <div className="flex justify-center p-2 sm:p-6 bg-slate-950/80 rounded-2xl border border-slate-900">
        <div
          ref={cardRef}
          className={`w-full max-w-2xl rounded-2xl p-8 sm:p-10 relative overflow-hidden border shadow-2xl ${themeStyle.bg} ${themeStyle.border}`}
        >
          {/* Background Decorative Graphic Elements */}
          <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-br ${themeStyle.highlightGradient}`}></div>
          <Quote className={`absolute top-6 right-6 w-28 h-28 pointer-events-none ${themeStyle.quoteSymbol}`} />

          {/* Top Brand Header inside Card */}
          <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center font-black text-xs text-white">
                D
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/90">
                Devoted Studios Insights
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border backdrop-blur ${themeStyle.badgeBg}`}>
                Pillar 0{pillar.pillarNumber}
              </span>
              <span className="text-[10px] font-semibold text-white/70 bg-white/5 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                <Clock className="w-3 h-3 text-white/50" />
                {timestamp}
              </span>
            </div>
          </div>

          {/* Main Quote Text Body */}
          <div className="relative z-10 my-6">
            <blockquote className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-relaxed tracking-tight italic font-serif">
              “{quoteText}”
            </blockquote>
          </div>

          {/* Bottom Author Credentials & Source Timestamp */}
          <div className="relative z-10 pt-6 mt-8 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${themeStyle.avatarBg} flex items-center justify-center font-bold text-white shadow-md text-sm border border-white/20`}>
                {author.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">
                  {author}
                </h4>
                <p className="text-xs text-white/60">
                  Games Industry Leader & Executive Interviewee
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-white/40 uppercase tracking-widest block font-medium">
                Source
              </span>
              <span className="text-xs font-medium text-white/80">
                n8n YouTube Interview
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
