import React from 'react';
import { 
  Sparkles, 
  Youtube, 
  Layers, 
  Kanban, 
  Cpu, 
  BarChart3, 
  Download, 
  CheckCircle2,
  ExternalLink,
  Plus,
  Video
} from 'lucide-react';
import { VideoSource } from '../data/contentData';

interface HeaderProps {
  activeTab: 'operator' | 'kanban' | 'automation' | 'analytics';
  setActiveTab: (tab: 'operator' | 'kanban' | 'analytics' | 'automation') => void;
  currentVideo: VideoSource;
  totalAssets: number;
  approvedCount: number;
  onExportCampaign: () => void;
  onOpenIngestModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentVideo,
  totalAssets,
  approvedCount,
  onExportCampaign,
  onOpenIngestModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner: Devoted Studios Branding & Ingestion Quick Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Client Identifier */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-purple-200">
            D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                Devoted Studios
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                n8n Automation Engine
              </span>
            </div>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Content Engine Operating Dashboard
              <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Head of Marketing Suite
              </span>
            </h1>
          </div>
        </div>

        {/* Source Video & Quick Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={currentVideo.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-purple-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition"
            title="Open YouTube Source Interview"
          >
            <Youtube className="w-4 h-4 text-red-600" />
            <span className="max-w-[160px] truncate">{currentVideo.speaker} Interview</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            onClick={onOpenIngestModal}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-purple-400" />
            Process New Video
          </button>

          <button
            onClick={onExportCampaign}
            className="devoted-btn-primary font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Assets JSON
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 flex items-center justify-between">
        <nav className="flex space-x-1 sm:space-x-2 py-2">
          <button
            onClick={() => setActiveTab('operator')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'operator'
                ? 'bg-purple-100/70 text-purple-800 border border-purple-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-600" />
            Content Operator Workbench
          </button>

          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'kanban'
                ? 'bg-purple-100/70 text-purple-800 border border-purple-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Kanban className="w-4 h-4 text-purple-600" />
            Publishing Board
            <span className="bg-white text-purple-700 font-extrabold px-1.5 py-0.5 rounded border border-purple-200 text-[10px]">
              {approvedCount}/{totalAssets}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-purple-100/70 text-purple-800 border border-purple-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-purple-600" />
            Intelligence & Analytics
          </button>

          <button
            onClick={() => setActiveTab('automation')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'automation'
                ? 'bg-purple-100/70 text-purple-800 border border-purple-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-600" />
            n8n Replication Engine
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-md font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {currentVideo.pillarsCount} Pillars Active
          </span>
        </div>
      </div>
    </header>
  );
};
