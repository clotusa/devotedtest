import React from 'react';
import { 
  Cpu, 
  Youtube, 
  Mic, 
  Bot, 
  Layers, 
  FileSpreadsheet, 
  CheckCircle2, 
  Zap, 
  ExternalLink,
  Plus,
  Repeat
} from 'lucide-react';
import { VideoSource } from '../data/contentData';

interface AutomationEngineViewProps {
  currentVideo: VideoSource;
  onOpenIngestModal: () => void;
}

export const AutomationEngineView: React.FC<AutomationEngineViewProps> = ({
  currentVideo,
  onOpenIngestModal
}) => {
  const workflowSteps = [
    {
      step: 1,
      title: "YouTube Source Trigger",
      icon: Youtube,
      color: "text-red-600 bg-red-50 border-red-200",
      description: "Triggered on YouTube upload or URL paste.",
      payload: `Active Video: ${currentVideo.title}\nSpeaker: ${currentVideo.speaker}\nID: ${currentVideo.youtubeId}`
    },
    {
      step: 2,
      title: "Audio Transcription & Diarization",
      icon: Mic,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      description: "Whisper speech-to-text with precise timestamps.",
      payload: "Model: Whisper-Large-v3\nTimestamp Resolution: Word-level\nSpeaker ID: " + currentVideo.speaker
    },
    {
      step: 3,
      title: "LLM Strategic Extraction",
      icon: Bot,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      description: "Extracts key insights, quotes, & rates opportunity score.",
      payload: `Pillars Found: ${currentVideo.pillarsCount} Themes\nAvg Score: ${currentVideo.avgScore}/10`
    },
    {
      step: 4,
      title: "Multi-Channel Asset Generation",
      icon: Layers,
      color: "text-pink-600 bg-pink-50 border-pink-200",
      description: "Generates 5 distinct content formats per pillar.",
      payload: `Total Assets: ${currentVideo.totalAssetsCount} Outputs\nFormatting: Social + Markdown`
    },
    {
      step: 5,
      title: "Google Sheet Matrix Sync",
      icon: FileSpreadsheet,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      description: "Appends rows to Google Sheet and emits dashboard webhook.",
      payload: "Spreadsheet ID: 10vVXTcb...\nStatus: Live Synced\nLatency: 42s"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-purple-600" /> n8n Automation Engine Blueprint
            </span>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Replicable Pipeline
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            How to Replicate This Engine for Multiple YouTube Videos
          </h2>
          <p className="text-xs text-slate-600">
            This modular n8n workflow can be run indefinitely across any YouTube interview or podcast URL.
          </p>
        </div>

        <button
          onClick={onOpenIngestModal}
          className="devoted-btn-primary px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Repeat className="w-4 h-4" />
          Replicate for New Video
        </button>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          n8n Workflow Execution Diagram (5 Nodes)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {workflowSteps.map((step) => {
            const IconComponent = step.icon;

            return (
              <div
                key={step.step}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 relative group hover:border-purple-300 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      Node 0{step.step}
                    </span>
                    <div className={`p-2 rounded-lg border ${step.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {step.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 leading-normal">
                    {step.description}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-700 whitespace-pre-line leading-tight">
                  {step.payload}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workflow Impact */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">Scale Effortlessly</h4>
            <p className="text-xs text-slate-600 mt-1">
              Run 1 or 100 YouTube interviews through n8n with zero added headcount.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Layers className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">Omnichannel Output</h4>
            <p className="text-xs text-slate-600 mt-1">
              Automatically formats content for LinkedIn, Newsletters, SEO Blogs, Reels, and Quote graphics.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">Google Sheet Matrix</h4>
            <p className="text-xs text-slate-600 mt-1">
              Maintains an organized central repository of all extracted campaign assets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
