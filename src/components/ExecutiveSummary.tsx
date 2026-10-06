import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Clock, 
  Target, 
  Linkedin, 
  Mail, 
  Video, 
  Quote,
  CheckCircle2,
  Zap,
  Award
} from 'lucide-react';
import { ContentPillar, VideoSource } from '../data/contentData';

interface ExecutiveSummaryProps {
  currentVideo: VideoSource;
  pillars: ContentPillar[];
  onSelectPillar: (pillarId: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  currentVideo,
  pillars,
  onSelectPillar
}) => {
  const totalAssets = pillars.length * 5;
  const avgScore = (pillars.reduce((acc, p) => acc + p.score, 0) / pillars.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Executive Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Automated Campaign Output • Source: {currentVideo.speaker}
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Devoted Thought Leadership Content Engine
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Extracted from <span className="font-semibold text-slate-900">1 YouTube interview source</span> with <span className="font-bold text-purple-700">{currentVideo.speaker}</span> ({currentVideo.speakerRole}). Generates <span className="font-bold text-slate-900">{totalAssets} multi-channel assets</span> across LinkedIn, Newsletters, Blogs, Short Video scripts, and Visual Quote cards.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg font-medium">
                <Linkedin className="w-3.5 h-3.5 text-blue-600" /> {pillars.length} LinkedIn Posts
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg font-medium">
                <Mail className="w-3.5 h-3.5 text-emerald-600" /> {pillars.length} Newsletters
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg font-medium">
                <FileText className="w-3.5 h-3.5 text-purple-600" /> {pillars.length} Blog Outlines
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg font-medium">
                <Video className="w-3.5 h-3.5 text-pink-600" /> {pillars.length} Reel Scripts
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg font-medium">
                <Quote className="w-3.5 h-3.5 text-amber-600" /> {pillars.length} Quote Cards
              </span>
            </div>
          </div>

          {/* Metric Cards Group */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto min-w-[280px]">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Generated Assets</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-slate-900">{totalAssets}</span>
                <span className="text-xs text-emerald-600 font-bold">+25 Ready</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Quality Rating Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-purple-700">{avgScore}</span>
                <span className="text-xs text-slate-500 font-medium">/ 10.0</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">n8n Run Time</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-emerald-600">42s</span>
                <span className="text-xs text-slate-500">vs 12 hrs</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Conversion Partner</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-extrabold text-slate-900">Devoted</span>
                <span className="text-xs text-purple-600 font-bold">Fusion</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Extracted Content Pillars Selection Row */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" />
            Extracted Strategic Pillars ({pillars.length})
          </h3>
          <span className="text-xs text-slate-500">Click any pillar to load asset workbench</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => onSelectPillar(pillar.id)}
              className="devoted-card p-4 rounded-xl text-left hover:border-purple-300 cursor-pointer group flex flex-col justify-between h-full space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                    Pillar 0{pillar.pillarNumber}
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Opp: {pillar.opportunityRating}/10
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition line-clamp-2 leading-snug">
                  {pillar.title}
                </h4>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Score {pillar.score}
                </span>
                <span className="text-purple-600 font-bold group-hover:translate-x-0.5 transition">
                  Inspect &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
