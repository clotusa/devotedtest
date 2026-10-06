import React, { useState } from 'react';
import { 
  Linkedin, 
  Mail, 
  FileText, 
  Video, 
  Quote as QuoteIcon, 
  Target, 
  Copy, 
  Check, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Play,
  ExternalLink,
  Film
} from 'lucide-react';
import { ContentPillar } from '../data/contentData';
import { QuoteCardGenerator } from './QuoteCardGenerator';

interface ContentOperatorHubProps {
  pillars: ContentPillar[];
  selectedPillarId: string;
  onSelectPillar: (pillarId: string) => void;
  onUpdateStatus: (pillarId: string, status: ContentPillar['status']) => void;
}

type FormatTab = 'linkedin' | 'newsletter' | 'blog' | 'video' | 'quote' | 'cta';

export const ContentOperatorHub: React.FC<ContentOperatorHubProps> = ({
  pillars,
  selectedPillarId,
  onSelectPillar,
  onUpdateStatus
}) => {
  const [activeFormat, setActiveFormat] = useState<FormatTab>('linkedin');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  const pillar = pillars.find((p) => p.id === selectedPillarId) || pillars[0];

  const handleCopy = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const getStatusBadge = (status: ContentPillar['status']) => {
    switch (status) {
      case 'APPROVED':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Approved</span>;
      case 'SCHEDULED':
        return <span className="bg-blue-100 text-blue-800 border border-blue-300 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-600" /> Scheduled</span>;
      case 'PUBLISHED':
        return <span className="bg-purple-100 text-purple-800 border border-purple-300 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-purple-600" /> Published</span>;
      case 'NEEDS REVIEW':
      default:
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-600" /> Needs Review</span>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Column: Pillar Selector (4 cols) */}
      <div className="lg:col-span-4 space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Campaign Content Pillars ({pillars.length})
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">n8n Output</span>
        </div>

        <div className="space-y-2.5">
          {pillars.map((item) => {
            const isSelected = item.id === pillar.id;
            const hasVideoAsset = Boolean(item.shortVideoHook?.videoAssetEmbedUrl);

            return (
              <button
                key={item.id}
                onClick={() => onSelectPillar(item.id)}
                className={`w-full text-left p-4 rounded-xl transition cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-purple-600 shadow-md ring-2 ring-purple-100'
                    : 'bg-white border-slate-200/90 hover:border-purple-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Pillar 0{item.pillarNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {hasVideoAsset && (
                      <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Film className="w-3 h-3 text-pink-600" /> Video
                      </span>
                    )}
                    <span className="text-xs font-bold text-purple-700">
                      {item.score}/10
                    </span>
                  </div>
                </div>

                <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                  isSelected ? 'text-purple-950' : 'text-slate-900'
                }`}>
                  {item.title}
                </h4>

                <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-normal">
                  {item.insight}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Opp: {item.opportunityRating}/10</span>
                  {getStatusBadge(item.status)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Asset Format Preview Workspace (8 cols) */}
      <div className="lg:col-span-8 space-y-4">
        
        {/* Selected Pillar Header */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                Pillar 0{pillar.pillarNumber} Overview
              </span>
              <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {pillar.opportunityLabel}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {pillar.title}
            </h2>
          </div>

          {/* Quick Status Control Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {getStatusBadge(pillar.status)}
            
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl">
              <button
                onClick={() => onUpdateStatus(pillar.id, 'APPROVED')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  pillar.status === 'APPROVED' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Approve
              </button>
              <button
                onClick={() => onUpdateStatus(pillar.id, 'SCHEDULED')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  pillar.status === 'SCHEDULED' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Insight & Quote Highlight Box */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block mb-0.5">
                Core Marketing Insight
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {pillar.insight}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-start gap-3">
            <QuoteIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <blockquote className="text-xs text-slate-600 italic">
              “{pillar.quote}” — <span className="text-slate-900 font-bold not-italic">{pillar.quoteAuthor}</span> [{pillar.quoteTimestamp}]
            </blockquote>
          </div>
        </div>

        {/* Format Preview Tabs */}
        <div className="bg-white p-1.5 rounded-xl border border-slate-200 flex flex-wrap gap-1 shadow-xs">
          <button
            onClick={() => setActiveFormat('linkedin')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeFormat === 'linkedin'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-600" />
            LinkedIn Post
          </button>

          <button
            onClick={() => setActiveFormat('newsletter')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeFormat === 'newsletter'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            Newsletter Draft
          </button>

          <button
            onClick={() => setActiveFormat('blog')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeFormat === 'blog'
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            Blog & SEO Outline
          </button>

          <button
            onClick={() => setActiveFormat('video')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeFormat === 'video'
                ? 'bg-pink-50 text-pink-700 border border-pink-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-pink-600" />
            Short Video & Reel Asset
            {pillar.shortVideoHook?.videoAssetEmbedUrl && (
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveFormat('quote')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeFormat === 'quote'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <QuoteIcon className="w-3.5 h-3.5 text-amber-600" />
            Visual Quote Card
          </button>

          <button
            onClick={() => setActiveFormat('cta')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeFormat === 'cta'
                ? 'bg-violet-50 text-violet-700 border border-violet-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-purple-600" />
            Lead Gen & CTA
          </button>
        </div>

        {/* Tab 1: LinkedIn Card */}
        {activeFormat === 'linkedin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-slate-500 font-medium">
                LinkedIn Feed Format • {pillar.linkedinPost.length} characters
              </span>
              <button
                onClick={() => handleCopy(pillar.linkedinPost, 'linkedin')}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                {copiedFormat === 'linkedin' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedFormat === 'linkedin' ? 'Copied Post' : 'Copy LinkedIn Post'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 max-w-xl mx-auto space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  D
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    Devoted Studios
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-normal border border-slate-200">Page</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Game Development Services & Co-Dev • 1d • 🌐
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans border-t border-b border-slate-100 py-4">
                {pillar.linkedinPost}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {pillar.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] text-blue-600 hover:underline font-semibold">
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Newsletter Draft */}
        {activeFormat === 'newsletter' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-slate-500 font-medium">
                Email Newsletter Edition
              </span>
              <button
                onClick={() => handleCopy(`${pillar.newsletterHeadline}\n\n${pillar.newsletterContent}`, 'newsletter')}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                {copiedFormat === 'newsletter' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedFormat === 'newsletter' ? 'Copied' : 'Copy Newsletter Text'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5 shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block mb-1">
                  Subject Line
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {pillar.newsletterHeadline}
                </h3>
              </div>

              <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                {pillar.newsletterContent}
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-800 block mb-1">
                  Newsletter CTA Banner
                </span>
                <p className="text-slate-700">{pillar.cta}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Blog & SEO */}
        {activeFormat === 'blog' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-slate-500 font-medium">
                Long-form Blog Strategy & Outline
              </span>
              <button
                onClick={() => handleCopy(`${pillar.blogHeadline}\n\nOutline:\n` + pillar.blogOutline.map((o, i) => `${i + 1}. ${o}`).join('\n'), 'blog')}
                className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                {copiedFormat === 'blog' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedFormat === 'blog' ? 'Copied' : 'Copy Blog Outline'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider block mb-1">
                  Article Target Title
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {pillar.blogHeadline}
                </h3>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Outline Sections
                </h4>
                <div className="space-y-2">
                  {pillar.blogOutline.map((section, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-800 font-medium pt-0.5">
                        {section}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Reel Script & Video Asset Preview Window */}
        {activeFormat === 'video' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-slate-500 font-medium">
                Short Video Teleprompter Script ({pillar.shortVideoHook.estimatedDuration})
              </span>
              <button
                onClick={() => handleCopy(`Hook: ${pillar.shortVideoHook.hook}\n\nScript:\n${pillar.shortVideoHook.script}`, 'video')}
                className="flex items-center gap-1.5 text-xs font-bold text-pink-700 bg-pink-50 border border-pink-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                {copiedFormat === 'video' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedFormat === 'video' ? 'Copied' : 'Copy Video Script'}
              </button>
            </div>

            {/* Embedded Google Drive Video Asset Preview Window (If available) */}
            {pillar.shortVideoHook?.videoAssetEmbedUrl && (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                    <h3 className="text-sm font-extrabold tracking-tight flex items-center gap-2">
                      🎬 Video Asset Preview Window
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-950 text-pink-400 border border-pink-800 px-2 py-0.5 rounded">
                      Google Drive Source
                    </span>
                  </div>

                  {pillar.shortVideoHook.videoAssetDriveUrl && (
                    <a
                      href={pillar.shortVideoHook.videoAssetDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 bg-pink-950/60 border border-pink-800 px-3 py-1 rounded-lg transition"
                    >
                      Open Video in Google Drive
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Video Player Iframe Frame */}
                <div className="relative rounded-xl overflow-hidden bg-black border border-slate-800 aspect-video shadow-2xl flex items-center justify-center">
                  <iframe
                    src={pillar.shortVideoHook.videoAssetEmbedUrl}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={`Video Asset Preview - Pillar ${pillar.pillarNumber}`}
                  ></iframe>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Video Title: {pillar.title}</span>
                  <span className="font-mono text-emerald-400">Status: Rendered & Ready for Publishing</span>
                </div>
              </div>
            )}

            {/* Teleprompter Script Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
              <div className="p-4 rounded-xl bg-pink-50 border border-pink-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-pink-700 tracking-wider block">
                  ⚡ First 3-Second Spoken Hook
                </span>
                <p className="text-sm font-extrabold text-slate-900">
                  “{pillar.shortVideoHook.hook}”
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Full Teleprompter Script
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono">
                  {pillar.shortVideoHook.script}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Video className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block mb-0.5">
                    Visual & Editing Directions:
                  </span>
                  <p className="text-xs text-slate-600">
                    {pillar.shortVideoHook.visualNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Visual Quote Card */}
        {activeFormat === 'quote' && (
          <QuoteCardGenerator pillar={pillar} />
        )}

        {/* Tab 6: Lead Gen & CTA */}
        {activeFormat === 'cta' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-slate-500 font-medium">
                Lead Generation Alignment
              </span>
              <button
                onClick={() => handleCopy(pillar.cta, 'cta')}
                className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                {copiedFormat === 'cta' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedFormat === 'cta' ? 'Copied' : 'Copy CTA Text'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5 shadow-sm">
              <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 border border-purple-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider block mb-0.5">
                    Conversion Offer
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {pillar.ctaTarget}
                  </h4>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full">
                  Devoted Fusion Aligned
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Copywriting CTA Text:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed p-4 rounded-xl bg-slate-50 border border-slate-200">
                  {pillar.cta}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
