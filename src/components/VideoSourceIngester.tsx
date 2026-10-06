import React from 'react';
import { 
  Youtube, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Play,
  RotateCcw,
  Bot,
  Video
} from 'lucide-react';
import { VideoSource } from '../data/contentData';

interface VideoSourceIngesterProps {
  currentVideo: VideoSource;
  videoLibrary: VideoSource[];
  onSelectVideo: (videoId: string) => void;
  onOpenIngestModal: () => void;
}

export const VideoSourceIngester: React.FC<VideoSourceIngesterProps> = ({
  currentVideo,
  videoLibrary,
  onSelectVideo,
  onOpenIngestModal
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner: Single Source Visual Explanation */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-red-600" />
                Source Ingestion Engine
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                n8n Webhook Active
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              YouTube Interview ➔ Multi-Channel Content Automation
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              This system ingests <strong className="text-slate-900 font-semibold">1 YouTube video interview</strong> and uses n8n AI workflows to extract core insights, quotes, and timestamps — automatically generating LinkedIn posts, Newsletter articles, Blog outlines, Short Video scripts, and Visual Quote cards.
            </p>
          </div>

          {/* Replicate for Multiple Videos Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onOpenIngestModal}
              className="devoted-btn-primary px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Ingest & Process New YouTube Video
            </button>
          </div>
        </div>

        {/* Visual Pipeline Image Explanation Diagram */}
        <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Step 1: YouTube Video Visual Card */}
          <div className="md:col-span-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="relative rounded-lg overflow-hidden group border border-slate-200">
              <img
                src={currentVideo.thumbnailUrl}
                alt={currentVideo.title}
                className="w-full h-36 object-cover group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  // Fallback YouTube thumbnail placeholder
                  (e.target as HTMLImageElement).src = "https://img.youtube.com/vi/WtB80qWhvFU/hqdefault.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition">
                <a
                  href={currentVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                  title="Watch YouTube Interview"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </a>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                {currentVideo.videoDuration}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-red-600 flex items-center gap-1">
                  <Youtube className="w-3 h-3" /> Source Video
                </span>
                <span>Speaker: {currentVideo.speaker}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                {currentVideo.title}
              </h4>
            </div>
          </div>

          {/* Step 2: n8n Automation Node Diagram */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-white rounded-xl border border-purple-200/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                n8n Automation Core
              </span>
              <h4 className="text-xs font-bold text-slate-900">
                Speech-to-Text & LLM Extractor
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Whisper Audio Transcription ➔ Prompt Matrix ➔ Structured Google Sheet
              </p>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
              Run Time: 42 seconds
            </span>
          </div>

          {/* Step 3: Multi-Channel Output Yield */}
          <div className="md:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
                <Layers className="w-3 h-3" /> Output Campaign Assets
              </span>
              <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                25 Assets
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-slate-50 p-2 rounded border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600">LinkedIn Posts</span>
                <span className="font-bold text-blue-600">5</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600">Newsletters</span>
                <span className="font-bold text-emerald-600">5</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600">Blog Outlines</span>
                <span className="font-bold text-purple-600">5</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600">Quote Cards</span>
                <span className="font-bold text-amber-600">5</span>
              </div>
            </div>
          </div>

        </div>

        {/* Multi-Video Selection Library Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Replicate Across Multiple YouTube Videos:
            </span>
          </div>

          <div className="flex items-center gap-2">
            {videoLibrary.map((vid) => {
              const isActive = vid.id === currentVideo.id;
              return (
                <button
                  key={vid.id}
                  onClick={() => onSelectVideo(vid.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Youtube className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-red-500'}`} />
                  <span className="max-w-[150px] truncate">{vid.speaker}: {vid.title}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
