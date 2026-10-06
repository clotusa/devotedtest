export interface ContentPillar {
  id: string;
  pillarNumber: number;
  title: string;
  opportunityRating: number;
  opportunityLabel: string;
  score: number;
  insight: string;
  quote: string;
  quoteAuthor: string;
  quoteTimestamp: string;
  linkedinPost: string;
  newsletterHeadline: string;
  newsletterContent: string;
  blogHeadline: string;
  blogOutline: string[];
  shortVideoHook: {
    hook: string;
    script: string;
    visualNotes: string;
    estimatedDuration: string;
    videoAssetEmbedUrl?: string;
    videoAssetDriveUrl?: string;
  };
  cta: string;
  ctaTarget: string;
  status: 'NEEDS REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED';
  scheduledDate?: string;
  tags: string[];
}

export interface VideoSource {
  id: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string;
  title: string;
  speaker: string;
  speakerRole: string;
  videoDuration: string;
  processedAt: string;
  pillarsCount: number;
  totalAssetsCount: number;
  avgScore: number;
  isCurrentActive: boolean;
  pillars: ContentPillar[];
}

export const VIDEO_LIBRARY: VideoSource[] = [
  {
    id: "vid-1",
    youtubeUrl: "https://www.youtube.com/watch?v=WtB80qWhvFU",
    youtubeId: "WtB80qWhvFU",
    thumbnailUrl: "https://img.youtube.com/vi/WtB80qWhvFU/hqdefault.jpg",
    title: "State of Gaming Talent 2026 & Career Strategy Interview",
    speaker: "Amir",
    speakerRole: "Games Industry Talent & Hiring Expert",
    videoDuration: "42:15",
    processedAt: "2026-09-14 17:15",
    pillarsCount: 5,
    totalAssetsCount: 25,
    avgScore: 8.14,
    isCurrentActive: true,
    pillars: [
      {
        id: "pillar-1",
        pillarNumber: 1,
        title: "Discoverability & Personal Brand Before You Need It",
        opportunityRating: 9,
        opportunityLabel: "Opportunity 9/10",
        score: 8.5,
        status: "NEEDS REVIEW",
        scheduledDate: "2026-09-16",
        tags: ["Personal Branding", "Game Dev Jobs", "Networking", "Career Growth"],
        insight: "Hiring often begins with someone asking a trusted peer for candidates. If hiring managers have some familiarity with you, even minimal visibility dramatically increases your odds — so plan a low-effort, sustained visibility strategy (events, posts, Discord, game jams) while you have a job.",
        quote: "Imagine that you are a perfect fit for that opportunity, but the person has never met you, has never heard of you, etc. To me, it's a thought process of saying to yourself, what things would I do so that person can hear of me?",
        quoteAuthor: "Amir",
        quoteTimestamp: "11:16-11:41",
        linkedinPost: `Visibility isn’t vanity — it’s the difference between being considered and being invisible.

Amir puts it plainly: “Imagine that you are a perfect fit for that opportunity, but the person has never met you, has never heard of you… what things would I do so that person can hear of me?” (Amir, 11:16–11:41).

Hiring often starts with a simple ask between peers. If a hiring manager has even a sliver of familiarity with you, your odds jump. The good news: you don’t need a giant PR machine. Start small, sustain effort, and build a discoverability runway while you’re employed.

Three low-effort moves that actually work:
- Show up: one local meetup or industry talk per quarter (or 1–2 online panels). Familiar faces stick.
- Publish 3 low-friction post formats: a short post with a lesson learned, a work-in-progress screenshot, and a resource roundup. Rotate them.
- Plug into communities: one active Discord or Slack and one yearly game jam.

If you build these into a 12-month habit, you’ll be on recruiters’ and peers’ radars before you need to be. Start by scheduling one meetup and drafting your first 150-word lesson post this week.`,
        newsletterHeadline: "The Discoverability Gap — Build Visibility Before You Need It",
        newsletterContent: `The hiring process in games is often a chain of personal recommendations. A recruiter asks a peer, a peer remembers someone they’ve seen at an event or whose work they follow, and a conversation starts. When you’re unknown, even a perfect fit can be skipped. That’s the discoverability gap — and it’s fixable with a low-effort, sustainable plan.

Why this matters to you:
- Studio leaders and producers: more visible professionals mean richer, faster candidate pools.
- Developers and designers: consistent visibility creates long-term career defensibility in a volatile market.

A practical checklist for creators (keep these small and repeatable):
- Events: Attend one in-person or online event per quarter. Speak or ask thoughtful questions to get remembered.
- Featured posts: Keep three post formats ready — a short lesson learned, a WIP screenshot with context, and a resource roundup. Publish them on a cadence you can sustain (monthly or every two weeks).
- Portfolio upkeep: Spend one session per quarter updating your featured project and link to a recent post or talk.
- Communities: Pick one active Discord/Slack and contribute weekly (help threads, short insights, patch notes).
- Game jams: Join at least one jam per year to refresh credits and networks.

Starter plan (next 90 days):
1. Pick one recurring community and introduce yourself.
2. Schedule one meetup or panel in your calendar.
3. Draft and publish your first 150–250 word lesson post.

Sustained discoverability doesn’t need huge effort — it needs consistency. Start small, pick two touchpoints, and protect the time to show up.`,
        blogHeadline: "Personal Brand = Discoverability: Build Visibility Before You Need It",
        blogOutline: [
          "Introduction: Why last-minute job scrambling fails vs low-effort consistency.",
          "The Math of Peer Referrals: How 70%+ of senior hires originate in private networks.",
          "The 3-Format Content Engine: WIP screenshots, lesson roundups, and resource teardowns.",
          "Community Anchors: Choosing 1 Discord/Slack and 1 annual jam for max exposure.",
          "Execution Plan: 90-day discoverability roadmap for game professionals."
        ],
        shortVideoHook: {
          hook: "You can be the most talented developer in games and still be completely invisible to hiring managers.",
          script: "Here's the harsh truth about hiring in 2026: most jobs never hit job boards. They start with a quick message between peers: 'Hey, do you know anyone good?' If nobody knows your name, you're invisible. Amir shared a framework: ask yourself right now — what 3 small things can you do this month so people in your field actually know who you are? Start with 1 monthly lesson post and 1 active Discord.",
          visualNotes: "Split screen: Speaker on top, dynamic text overlays for 'Invisible vs Discoverable', text highlight at 11:16 timestamp.",
          estimatedDuration: "0:45",
          videoAssetEmbedUrl: "https://drive.google.com/file/d/1uiStQwQyTzgWIYWv_AZvPxN7ADUBZFqg/preview",
          videoAssetDriveUrl: "https://drive.google.com/file/d/1uiStQwQyTzgWIYWv_AZvPxN7ADUBZFqg/view?usp=drive_link"
        },
        cta: "Want a fast second opinion on your discoverability? Request a complimentary Profile & Visibility Audit — we’ll review your headline, featured post, and one practical next step you can take this quarter. If you want help executing the plan, ask about Devoted Fusion as a hands-on delivery option.",
        ctaTarget: "Profile & Visibility Audit"
      },
      {
        id: "pillar-2",
        pillarNumber: 2,
        title: "Jobs Concentration & The 22x Narrative Skill Scarcity",
        opportunityRating: 9,
        opportunityLabel: "Opportunity 9/10",
        score: 8.2,
        status: "NEEDS REVIEW",
        scheduledDate: "2026-09-18",
        tags: ["Hiring Data", "Game Studios", "Workforce Strategy", "Talent Funnel"],
        insight: "The jobs landscape is concentrated: 70–75% of roles sit in four broad functions (production, engineering, game design, art/animation/cinematics). Hiring odds vary dramatically by experience and function—overall ~15% of job-seekers find games work in 12 months, but it's only ~5% for early career and ~30–40% for veterans. Certain specialties (e.g., narrative writing) are extremely scarce compared to engineering.",
        quote: "it is 22 times harder to getting a job in writing a narrative than it is in engineering or tech.",
        quoteAuthor: "Amir",
        quoteTimestamp: "8:54-9:01",
        linkedinPost: `Hiring in games isn’t evenly spread — it’s concentrated. Roughly 70–75% of roles live in four big buckets: production, engineering, game design, and art/animation/cinematics. That means if you’re building sourcing and training plans, those are the places that move the needle.

But the details matter: overall, only about 15% of job-seekers land game roles within 12 months. Early-career candidates see that drop to ~5%, while experienced pros convert at ~30–40%. And then there are the truly scarce specialties. As Amir points out (8:54–9:01), “it is 22 times harder to getting a job in writing a narrative than it is in engineering or tech.”`,
        newsletterHeadline: "Which skills to double-down on in 2026 — a practical guide for studios and creators",
        newsletterContent: `The data is blunt and useful: 70–75% of open roles in games cluster in four broad functions — production, engineering, game design, and art/animation/cinematics. That concentration should shape where studios invest recruiting dollars and where individual developers place their bets.`,
        blogHeadline: "Where the Jobs Actually Are: Hard Data to Guide Sourcing and Upskilling in Games",
        blogOutline: [
          "The 70-75% Rule: Breaking down the 4 key functional pillars of game studios.",
          "Conversion Realities: Why 5% junior vs 35% senior conversion redefines talent pipelines.",
          "The 22x Scarcity Anomaly: Narrative & writing roles vs software engineering demand."
        ],
        shortVideoHook: {
          hook: "Did you know it is TWENTY-TWO times harder to get a narrative writing job in games than an engineering role?",
          script: "If you're looking for work in games, you need to look at where 75% of open roles actually sit. Production, engineering, game design, and art.",
          visualNotes: "Animated bar graph showing 22x multiplier graphic.",
          estimatedDuration: "0:50"
        },
        cta: "If your studio wants a concise sourcing map or a pilot upskilling cohort aligned to these findings, we can help design one tailored to your roles and timelines.",
        ctaTarget: "Sourcing Map & Upskilling Template"
      },
      {
        id: "pillar-3",
        pillarNumber: 3,
        title: "Remote Work Shrink & The Global Geographic Shift",
        opportunityRating: 8,
        opportunityLabel: "Opportunity 8/10",
        score: 8.0,
        status: "NEEDS REVIEW",
        scheduledDate: "2026-09-21",
        tags: ["Remote Work", "Global Talent", "Compensation", "Studio Operations"],
        insight: "Remote role availability has fallen (from ~25–30% to ~12–15%). Meanwhile, the majority of jobs are outside North America (Amir cites ~25% in North America, ~75% elsewhere) with Asia — especially China — having the largest share.",
        quote: "remote roles have fallen from 25 to 30% to a range of 12 to 15%.",
        quoteAuthor: "Amir",
        quoteTimestamp: "23:03-23:07; 7:54-8:02",
        linkedinPost: `Remote roles in games have been cut roughly in half — and that changes everything about how we hire. Amir points out that “remote roles have fallen from 25 to 30% to a range of 12 to 15%,” and most new openings are now outside North America.`,
        newsletterHeadline: "Geography & Talent 2026 — What the shrinking remote market means for studios",
        newsletterContent: `Amir’s snapshot is clear: remote role availability in games has fallen from roughly 25–30% to about 12–15%. At the same time, the majority of roles are being posted outside North America.`,
        blogHeadline: "When Remote Shrinks: How Geography Is Rewriting Game Studio Hiring",
        blogOutline: [
          "The Remote Reversal: 25-30% down to 12-15% remote job availability.",
          "The 75/25 Geographic Divide: Why Asia and EU are capturing talent market share.",
          "Regional Comp Benchmarking: Mitigating budgeting gaps with hyper-local pay bands."
        ],
        shortVideoHook: {
          hook: "Remote game dev jobs just dropped by 50%. Where did all the work go?",
          script: "Only 12 to 15% of game dev roles are fully remote today. And 75% of all new openings are outside North America.",
          visualNotes: "Global heat map graphic flashing 75% outside NA vs 25% NA.",
          estimatedDuration: "0:40"
        },
        cta: "If you’re recalibrating hiring or compensation strategy, we can share a concise regional comp checklist and a 90‑day role-triage template.",
        ctaTarget: "Regional Comp Checklist"
      },
      {
        id: "pillar-4",
        pillarNumber: 4,
        title: "The Story Matrix & Interview Preparation Playbook",
        opportunityRating: 8,
        opportunityLabel: "Opportunity 8/10",
        score: 8.2,
        status: "NEEDS REVIEW",
        scheduledDate: "2026-09-23",
        tags: ["Interviewing", "Candidate Prep", "Hiring Frameworks", "Storytelling"],
        insight: "Rigorous interview success comes from deliberate preparation: list likely topics and write at least three concrete stories for each; memorize them until natural.",
        quote: "I challenge myself to write down at least three examples of stories that I have that I can tell for each example...",
        quoteAuthor: "Amir",
        quoteTimestamp: "20:44-21:16; 21:20-21:48",
        linkedinPost: `Interviews aren’t a quiz — they’re a set of repeatable moves you can prepare for. Amir’s approach is simple: write at least three concrete stories for each topic.`,
        newsletterHeadline: "Interview Prep That Works: Build a Story Library, Ask Better Questions",
        newsletterContent: `Rigorous interview prep isn’t about practicing answers — it’s about building a library of stories and questions that prove impact.`,
        blogHeadline: "Interview Prep That Works: Build a Story Library, Ask Better Questions",
        blogOutline: [
          "The Myth of Impromptu Interviews: Why spontaneous answers fail panel reviews.",
          "The 3x3 Story Matrix: Mapping Context, Action, & Quantified Impact."
        ],
        shortVideoHook: {
          hook: "Stop winging your job interviews. Here is the exact 3-story framework Amir uses.",
          script: "Before any interview, pick the 3 biggest competencies for the role. For EACH competency, write down 3 concrete stories.",
          visualNotes: "Graphic of 3x3 grid filling up with checkmarks.",
          estimatedDuration: "0:45"
        },
        cta: "If you want the Story Matrix template or a short workshop to upskill your hiring panels, get in touch with Devoted Studios.",
        ctaTarget: "Story Matrix Template"
      },
      {
        id: "pillar-5",
        pillarNumber: 5,
        title: "Quality Over Quantity: Selective Targeting vs ATS Mass-Apply",
        opportunityRating: 7,
        opportunityLabel: "Opportunity 7/10",
        score: 7.8,
        status: "NEEDS REVIEW",
        scheduledDate: "2026-09-25",
        tags: ["Job Search", "ATS Optimization", "Personal Branding", "Recruiting"],
        insight: "Applying to many jobs indiscriminately is counterproductive. Companies track applications via ATS and mass-applying signals low focus.",
        quote: "you should apply to a lot less roles than you think and spend a lot more time in brand and network development...",
        quoteAuthor: "Amir",
        quoteTimestamp: "34:21-34:42",
        linkedinPost: `Stop spraying resumes. Hit targets. Applying to every open role feels productive, but it can actually hurt your chances.`,
        newsletterHeadline: "From 0→Offer in 90 days (an illustrative playbook)",
        newsletterContent: `This is an illustrative playbook built around Amir's advice: "you should apply to a lot less roles than you think".`,
        blogHeadline: "Quality Over Quantity: Stop Mass-Applying and Start Getting Interviews",
        blogOutline: [
          "The ATS Trap: How modern applicant tracking systems detect scattershot applicants.",
          "The 5-Target Rule: Focus energy on 5 high-alignment studios."
        ],
        shortVideoHook: {
          hook: "Mass applying to 100 job posts on LinkedIn is actually RUINING your chances of getting hired.",
          script: "Modern ATS tracking systems log every single role you apply for at a studio.",
          visualNotes: "ATS database UI animation flagging candidate application history.",
          estimatedDuration: "0:42"
        },
        cta: "Try a focused experiment this week: create one tailored resume variant and send five targeted outreach messages.",
        ctaTarget: "Targeted Application Playbook"
      }
    ]
  }
];
