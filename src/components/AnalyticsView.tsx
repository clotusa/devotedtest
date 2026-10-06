import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { ContentPillar, VideoSource } from '../data/contentData';
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Lightbulb } from 'lucide-react';

interface AnalyticsViewProps {
  currentVideo: VideoSource;
  pillars: ContentPillar[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ currentVideo, pillars }) => {
  const chartData = pillars.map((p) => ({
    name: `Pillar 0${p.pillarNumber}`,
    fullTitle: p.title,
    opportunity: p.opportunityRating,
    qualityScore: p.score
  }));

  const channelDistributionData = [
    { name: 'LinkedIn Posts', count: pillars.length, color: '#2563eb' },
    { name: 'Newsletter Drafts', count: pillars.length, color: '#059669' },
    { name: 'Blog Outlines', count: pillars.length, color: '#725bff' },
    { name: 'Reel Hooks', count: pillars.length, color: '#db2777' },
    { name: 'Quote Cards', count: pillars.length, color: '#d97706' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Content Intelligence & Analytics
          </h2>
          <p className="text-xs text-slate-500">
            Performance analytics for interview: <strong className="text-slate-900">{currentVideo.title}</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Opportunity vs Quality Score */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Strategic Opportunity vs Content Quality Score
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">n8n Matrix Evaluation</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[0, 10]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '0.75rem', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="opportunity" name="Market Opportunity (1-10)" fill="#725bff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="qualityScore" name="Content Quality Score" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Channel Yield Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-purple-600" />
              Multi-Channel Asset Yield ({pillars.length * 5} Total)
            </h3>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
              100% Balanced
            </span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {channelDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '0.75rem', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            {channelDistributionData.map((channel, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }}></span>
                <span className="text-slate-600 font-medium">{channel.name}:</span>
                <span className="text-slate-900 font-bold">{channel.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Head of Marketing Key Takeaways
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-2xl font-extrabold text-purple-700">70–75%</span>
            <h4 className="text-xs font-bold text-slate-900">Job Market Concentration</h4>
            <p className="text-[11px] text-slate-600">
              70–75% of open roles sit in 4 functions: Production, Engineering, Game Design, and Art.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-2xl font-extrabold text-pink-600">22x</span>
            <h4 className="text-xs font-bold text-slate-900">Narrative Skill Scarcity</h4>
            <p className="text-[11px] text-slate-600">
              Narrative writing roles are 22x harder to land than engineering/tech roles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-2xl font-extrabold text-emerald-600">12–15%</span>
            <h4 className="text-xs font-bold text-slate-900">Remote Work Availability</h4>
            <p className="text-[11px] text-slate-600">
              Fully remote game dev jobs dropped from 25–30% down to 12–15%, with 75% of jobs outside NA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
