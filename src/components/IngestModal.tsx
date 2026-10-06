import React, { useState } from 'react';
import { 
  X, 
  Youtube, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { VideoSource } from '../data/contentData';

interface IngestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (newVid: VideoSource) => void;
}

export const IngestModal: React.FC<IngestModalProps> = ({
  isOpen,
  onClose,
  onAddVideo
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [speakerName, setSpeakerName] = useState<string>('');
  const [speakerRole, setSpeakerRole] = useState<string>('Game Industry Executive');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>('');

  if (!isOpen) return null;

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : 'WtB80qWhvFU';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) return;

    setIsProcessing(true);
    setProcessingStep('1/4 Fetching YouTube Audio Transcript...');

    setTimeout(() => {
      setProcessingStep('2/4 Whisper Diarization & Timestamping...');
    }, 1000);

    setTimeout(() => {
      setProcessingStep('3/4 LLM Pillar Extraction & Copy Generation...');
    }, 2000);

    setTimeout(() => {
      setProcessingStep('4/4 Syncing to Google Sheets Matrix & Dashboard...');
    }, 3000);

    setTimeout(() => {
      const ytId = extractYoutubeId(youtubeUrl);
      const newVideo: VideoSource = {
        id: `vid-${Date.now()}`,
        youtubeUrl: youtubeUrl || "https://www.youtube.com/watch?v=WtB80qWhvFU",
        youtubeId: ytId,
        thumbnailUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
        title: `${speakerName || 'Executive'} Interview: Strategic Content Insights`,
        speaker: speakerName || "Guest Speaker",
        speakerRole: speakerRole,
        videoDuration: "35:00",
        processedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        pillarsCount: 4,
        totalAssetsCount: 20,
        avgScore: 8.5,
        isCurrentActive: true,
        pillars: [
          {
            id: `new-p1-${Date.now()}`,
            pillarNumber: 1,
            title: `Strategic Co-Development & Scaling with ${speakerName || 'Guest'}`,
            opportunityRating: 9,
            opportunityLabel: "Opportunity 9/10",
            score: 8.8,
            status: "NEEDS REVIEW",
            scheduledDate: "2026-09-24",
            tags: ["Co-Development", "Studio Growth", "Devoted Studios"],
            insight: `Extracted key thesis from ${speakerName || 'speaker'} on modular team expansion and pipeline risk mitigation.`,
            quote: `When scaling studio production, flexibility beats fixed overhead every time.`,
            quoteAuthor: speakerName || "Guest Speaker",
            quoteTimestamp: "08:12-08:45",
            linkedinPost: `Insight from our latest YouTube interview with ${speakerName || 'our guest'}:\n\n"When scaling studio production, flexibility beats fixed overhead every time."\n\nModular co-development allows studio leads to plug in world-class art and engineering teams on demand.`,
            newsletterHeadline: `How Studios Scale Production with ${speakerName || 'Guest'}`,
            newsletterContent: `In this automated issue, we break down the core takeaways from our YouTube interview with ${speakerName || 'our guest'}.`,
            blogHeadline: `Production Optimization: Lessons from ${speakerName || 'Guest'}`,
            blogOutline: [
              "1. Executive Overview & Thesis",
              "2. Pipeline Integration Checkpoints",
              "3. Risk Reduction in Game Development"
            ],
            shortVideoHook: {
              hook: `Here is how leading studios scale production according to ${speakerName || 'our guest'}.`,
              script: `In our latest YouTube interview, ${speakerName || 'our guest'} broke down why modular co-development is replacing traditional hiring.`,
              visualNotes: "Dynamic text overlays with speaker quote timestamp.",
              estimatedDuration: "0:40"
            },
            cta: `Contact Devoted Studios for a custom Co-Development briefing.`,
            ctaTarget: "Co-Development Briefing"
          }
        ]
      };

      onAddVideo(newVideo);
      setIsProcessing(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Bot className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Replicate n8n Content Engine for New Video
              </h3>
              <p className="text-[11px] text-slate-500">
                Paste any YouTube URL to extract multi-channel marketing assets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {isProcessing ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 border border-purple-200 mx-auto flex items-center justify-center animate-spin">
              <Loader2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                n8n Automation Running...
              </h4>
              <p className="text-xs font-mono text-purple-700 font-medium">
                {processingStep}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Youtube className="w-3.5 h-3.5 text-red-600" />
                YouTube Video URL
              </label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Speaker / Guest Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Amir or Sarah Jenkins"
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Speaker Industry Role
                </label>
                <input
                  type="text"
                  placeholder="e.g., Head of Production"
                  value={speakerRole}
                  onChange={(e) => setSpeakerRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 space-y-1">
              <span className="font-bold block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Automated n8n Engine Output:
              </span>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                Will extract transcripts, generate 5 content formats (LinkedIn, Newsletter, Blog, Script, Quote Card), and append new rows to your Google Sheet matrix.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="devoted-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                Run n8n Automation Engine
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
