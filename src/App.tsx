import React, { useState } from 'react';
import { Header } from './components/Header';
import { VideoSourceIngester } from './components/VideoSourceIngester';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { ContentOperatorHub } from './components/ContentOperatorHub';
import { PublishingKanban } from './components/PublishingKanban';
import { AutomationEngineView } from './components/AutomationEngineView';
import { AnalyticsView } from './components/AnalyticsView';
import { IngestModal } from './components/IngestModal';
import { VIDEO_LIBRARY, VideoSource, ContentPillar } from './data/contentData';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Youtube, 
  Zap, 
  Layers, 
  Video,
  Plus
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'operator' | 'kanban' | 'analytics' | 'automation'>('operator');
  const [videoLibrary, setVideoLibrary] = useState<VideoSource[]>(VIDEO_LIBRARY);
  const [currentVideoId, setCurrentVideoId] = useState<string>(VIDEO_LIBRARY[0].id);
  const [selectedPillarId, setSelectedPillarId] = useState<string>('pillar-1');
  const [isIngestModalOpen, setIsIngestModalOpen] = useState<boolean>(false);
  const [isTopOverviewExpanded, setIsTopOverviewExpanded] = useState<boolean>(false); // Collapsed by default as requested!
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentVideo = videoLibrary.find((v) => v.id === currentVideoId) || videoLibrary[0];
  const pillars = currentVideo.pillars;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectVideo = (videoId: string) => {
    setCurrentVideoId(videoId);
    const targetVideo = videoLibrary.find((v) => v.id === videoId);
    if (targetVideo && targetVideo.pillars.length > 0) {
      setSelectedPillarId(targetVideo.pillars[0].id);
    }
    showToast(`Switched active video: ${targetVideo?.title}`);
  };

  const handleAddVideo = (newVideo: VideoSource) => {
    setVideoLibrary((prev) => [newVideo, ...prev]);
    setCurrentVideoId(newVideo.id);
    if (newVideo.pillars.length > 0) {
      setSelectedPillarId(newVideo.pillars[0].id);
    }
    showToast(`Successfully processed video: "${newVideo.title}"!`);
  };

  const handleUpdateStatus = (pillarId: string, status: ContentPillar['status']) => {
    setVideoLibrary((prevLibrary) =>
      prevLibrary.map((vid) => {
        if (vid.id === currentVideo.id) {
          return {
            ...vid,
            pillars: vid.pillars.map((p) =>
              p.id === pillarId ? { ...p, status } : p
            )
          };
        }
        return vid;
      })
    );
    showToast(`Pillar status updated to "${status}"`);
  };

  const handleExportCampaign = () => {
    const exportData = {
      client: "Devoted Studios",
      campaign: "Automated Content Engine",
      sourceVideo: {
        title: currentVideo.title,
        speaker: currentVideo.speaker,
        youtubeUrl: currentVideo.youtubeUrl
      },
      generatedAt: new Date().toISOString(),
      pillarsCount: pillars.length,
      pillars: pillars.map((p) => ({
        pillarNumber: p.pillarNumber,
        title: p.title,
        opportunityRating: p.opportunityLabel,
        score: p.score,
        status: p.status,
        insight: p.insight,
        quote: p.quote,
        linkedinPost: p.linkedinPost,
        newsletterHeadline: p.newsletterHeadline,
        newsletterContent: p.newsletterContent,
        blogHeadline: p.blogHeadline,
        blogOutline: p.blogOutline,
        shortVideoHook: p.shortVideoHook,
        cta: p.cta
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Devoted-Campaign-Export-${currentVideo.speaker.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Campaign assets exported as JSON!');
  };

  const totalAssetsCount = pillars.length * 5;
  const approvedAssetsCount = pillars.filter((p) => p.status === 'APPROVED' || p.status === 'SCHEDULED' || p.status === 'PUBLISHED').length * 5;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-emerald-300 text-emerald-900 text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {toastMessage}
        </div>
      )}

      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentVideo={currentVideo}
        totalAssets={totalAssetsCount}
        approvedCount={approvedAssetsCount}
        onExportCampaign={handleExportCampaign}
        onOpenIngestModal={() => setIsIngestModalOpen(true)}
      />

      {/* Main Operating Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        
        {/* Collapsible Overview Bar for Source Video & Executive Strategy Blocks */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all">
          
          {/* Compact Top Summary Bar (Visible when collapsed or expanded) */}
          <div className="p-4 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-red-600" />
                Source: {currentVideo.speaker} Interview
              </span>

              <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                {currentVideo.title}
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                  {totalAssetsCount} Assets Generated
                </span>
                <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded font-bold">
                  {currentVideo.pillarsCount} Pillars
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsIngestModalOpen(true)}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Process New Video
              </button>

              <button
                onClick={() => setIsTopOverviewExpanded(!isTopOverviewExpanded)}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-xs transition cursor-pointer"
              >
                {isTopOverviewExpanded ? (
                  <>
                    <span>Collapse Video & Strategy Blocks</span>
                    <ChevronUp className="w-4 h-4 text-purple-400" />
                  </>
                ) : (
                  <>
                    <span>Expand Video & Strategy Blocks</span>
                    <ChevronDown className="w-4 h-4 text-purple-400" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Expanded Content (Blocks 1 & 2) */}
          {isTopOverviewExpanded && (
            <div className="p-6 border-t border-slate-200 space-y-6 bg-white animate-fadeIn">
              {/* Block 1: Source Video Ingestion Card */}
              <VideoSourceIngester
                currentVideo={currentVideo}
                videoLibrary={videoLibrary}
                onSelectVideo={handleSelectVideo}
                onOpenIngestModal={() => setIsIngestModalOpen(true)}
              />

              {/* Block 2: Executive Summary & KPI Metrics */}
              <ExecutiveSummary
                currentVideo={currentVideo}
                pillars={pillars}
                onSelectPillar={(pillarId) => {
                  setSelectedPillarId(pillarId);
                  setActiveTab('operator');
                }}
              />
            </div>
          )}
        </div>

        {/* Primary Content Operating Hub ("The Best Part" - Front and Center!) */}
        {activeTab === 'operator' && (
          <ContentOperatorHub
            pillars={pillars}
            selectedPillarId={selectedPillarId}
            onSelectPillar={setSelectedPillarId}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {/* Tab 2: Publishing Workflow Board */}
        {activeTab === 'kanban' && (
          <PublishingKanban
            pillars={pillars}
            onUpdateStatus={handleUpdateStatus}
            onSelectPillar={(pillarId) => {
              setSelectedPillarId(pillarId);
              setActiveTab('operator');
            }}
          />
        )}

        {/* Tab 3: Intelligence & Analytics */}
        {activeTab === 'analytics' && (
          <AnalyticsView currentVideo={currentVideo} pillars={pillars} />
        )}

        {/* Tab 4: n8n Automation Engine Blueprint */}
        {activeTab === 'automation' && (
          <AutomationEngineView
            currentVideo={currentVideo}
            onOpenIngestModal={() => setIsIngestModalOpen(true)}
          />
        )}

      </main>

      {/* Replicate New Video Modal */}
      <IngestModal
        isOpen={isIngestModalOpen}
        onClose={() => setIsIngestModalOpen(false)}
        onAddVideo={handleAddVideo}
      />

      {/* Footer Branding Bar */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Devoted Studios Content Engine • Head of Marketing Operational Portfolio
          </span>
          <span className="flex items-center gap-2">
            <span>Source Google Sheet: 10vVXTcbcsfJdyYbM0bQKq6odBOd...</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
