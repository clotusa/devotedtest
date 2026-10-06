import React from 'react';
import { 
  Kanban as KanbanIcon, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Linkedin,
  Mail,
  FileText
} from 'lucide-react';
import { ContentPillar } from '../data/contentData';

interface PublishingKanbanProps {
  pillars: ContentPillar[];
  onUpdateStatus: (pillarId: string, status: ContentPillar['status']) => void;
  onSelectPillar: (pillarId: string) => void;
}

export const PublishingKanban: React.FC<PublishingKanbanProps> = ({
  pillars,
  onUpdateStatus,
  onSelectPillar
}) => {
  const columns: { status: ContentPillar['status']; title: string; color: string; badge: string }[] = [
    { status: 'NEEDS REVIEW', title: 'Needs Review', color: 'border-amber-200 bg-amber-50/40', badge: 'bg-amber-100 text-amber-900 border-amber-300' },
    { status: 'APPROVED', title: 'Approved', color: 'border-emerald-200 bg-emerald-50/40', badge: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { status: 'SCHEDULED', title: 'Scheduled', color: 'border-blue-200 bg-blue-50/40', badge: 'bg-blue-100 text-blue-900 border-blue-300' },
    { status: 'PUBLISHED', title: 'Published', color: 'border-purple-200 bg-purple-50/40', badge: 'bg-purple-100 text-purple-900 border-purple-300' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <KanbanIcon className="w-4 h-4 text-purple-600" />
            Content Campaign Publishing Workflow
          </h2>
          <p className="text-xs text-slate-500">
            Head of Marketing Stage Control • Advance content from review to live publishing
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 font-semibold">
            Total Content Blocks: <strong className="text-purple-700">{pillars.length}</strong>
          </span>
        </div>
      </div>

      {/* 4-Column Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colPillars = pillars.filter((p) => p.status === col.status);

          return (
            <div
              key={col.status}
              className={`rounded-2xl border p-4 flex flex-col space-y-3 min-h-[450px] ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${col.badge}`}>
                  {col.title}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {colPillars.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 space-y-3">
                {colPillars.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 rounded-xl">
                    <span className="text-xs text-slate-400 font-medium">No assets in this stage</span>
                  </div>
                ) : (
                  colPillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                          Pillar 0{pillar.pillarNumber}
                        </span>
                        <span className="text-xs font-bold text-amber-700">
                          {pillar.score}/10
                        </span>
                      </div>

                      <h4
                        onClick={() => onSelectPillar(pillar.id)}
                        className="text-xs font-bold text-slate-900 hover:text-purple-700 transition cursor-pointer line-clamp-2 leading-snug"
                      >
                        {pillar.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-600">
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-medium">
                          <Linkedin className="w-3 h-3 text-blue-600" /> Post
                        </span>
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-medium">
                          <Mail className="w-3.5 h-3.5 text-emerald-600" /> Email
                        </span>
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-medium">
                          <FileText className="w-3 h-3 text-purple-600" /> Blog
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <Calendar className="w-3 h-3 text-purple-600" />
                        <span>Target: {pillar.scheduledDate || '2026-09-18'}</span>
                      </div>

                      {/* Controls */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px]">
                        {col.status !== 'NEEDS REVIEW' && (
                          <button
                            onClick={() => {
                              const prevStatus = col.status === 'PUBLISHED' ? 'SCHEDULED' : col.status === 'SCHEDULED' ? 'APPROVED' : 'NEEDS REVIEW';
                              onUpdateStatus(pillar.id, prevStatus);
                            }}
                            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                            title="Move back"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => onSelectPillar(pillar.id)}
                          className="text-purple-700 hover:underline text-[11px] font-bold cursor-pointer"
                        >
                          View Assets
                        </button>

                        {col.status !== 'PUBLISHED' && (
                          <button
                            onClick={() => {
                              const nextStatus = col.status === 'NEEDS REVIEW' ? 'APPROVED' : col.status === 'APPROVED' ? 'SCHEDULED' : 'PUBLISHED';
                              onUpdateStatus(pillar.id, nextStatus);
                            }}
                            className="p-1.5 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold transition cursor-pointer flex items-center gap-0.5"
                            title="Advance stage"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
