import React, { useState } from 'react';
import { Activity, Server, Layout, Copy, Check, Terminal, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

export const ArchitectureSection = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const curlSnippets = [
    {
      title: "Analyze Single Review (POST /api/analyze)",
      code: `curl -X POST "http://localhost:8000/api/analyze" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "An absolute cinematic masterpiece with breathtaking visuals and flawless performances.",
    "movie_title": "Oppenheimer"
  }'`
    },
    {
      title: "Batch Reviews Analysis (POST /api/analyze/batch)",
      code: `curl -X POST "http://localhost:8000/api/analyze/batch" \\
  -H "Content-Type: application/json" \\
  -d '{
    "reviews": [
      { "text": "Exceptional screenplay and acting." },
      { "text": "Disjointed narrative and poor pacing." }
    ]
  }'`
    },
    {
      title: "Query Curated Films (GET /api/movies)",
      code: `curl -X GET "http://localhost:8000/api/movies?genre=Sci-Fi&sort_by=audience_desc"`
    },
    {
      title: "Retrieve Dataset Analytics (GET /api/analytics)",
      code: `curl -X GET "http://localhost:8000/api/analytics"`
    }
  ];

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="architecture" className="py-12 sm:py-20 border-b"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)'
            }}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>FULL-STACK SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Engineering & API Integration
          </h2>
          <p className="text-sm sm:text-base mt-2" style={{ color: 'var(--text-secondary)' }}>
            Designed for modularity, sub-25ms inference latency, and effortless deployment to Render (Backend) and Vercel (Frontend).
          </p>
        </div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Backend Stack Card */}
          <div className="p-6 rounded-2xl flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                    Backend ML Engine
                  </h3>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    Python 3.11+ • FastAPI • Scikit-Learn
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Hybrid Polarity Pipeline:</strong> TF-IDF n-gram vectorizer combined with calibrated logistic regression and cinematic valence lexicon.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Aspect-Based Sentiment Analysis (ABSA):</strong> Sub-clause window segmentation covering Story, Acting, Direction, Visuals, and Sound.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Production Readiness:</strong> Pydantic v2 validation, CORS security, OpenAPI/Swagger docs at <code>/docs</code>, and automated unit tests.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
            >
              <span>Deploy Target: Render Web Service</span>
              <span className="text-emerald-500 font-semibold">Port 8000</span>
            </div>
          </div>

          {/* Frontend Stack Card */}
          <div className="p-6 rounded-2xl flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                    Frontend Client
                  </h3>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    React 19 • Vite • Tailwind CSS • Recharts
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>Cinematic Editorial Design:</strong> Inspired by Linear and Letterboxd. 3-mode theme system (Light, Dark, Midnight) persisted in <code>localStorage</code>.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>Network Resilience:</strong> Seamless client-side simulation fallback whenever the remote backend server is warming up.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Activity className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>High-Performance Visuals:</strong> Interactive Recharts telemetry, token explainability highlighter, and responsive grid layouts.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
            >
              <span>Deploy Target: Vercel / Netlify</span>
              <span className="text-indigo-400 font-semibold">Port 5173</span>
            </div>
          </div>

        </div>

        {/* REST API Endpoints & Curl Snippets */}
        <div className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Terminal className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Developer API Quickstart
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {curlSnippets.map((snippet, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                    {snippet.title}
                  </span>
                  <button
                    onClick={() => handleCopy(snippet.code, idx)}
                    className="p-1.5 rounded-lg hover:opacity-80 transition-opacity text-neutral-400 hover:text-neutral-200"
                    title="Copy snippet"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <pre className="text-[11px] font-mono p-3 rounded-lg overflow-x-auto bg-neutral-950 text-neutral-300 border border-neutral-800 leading-relaxed">
                  {snippet.code}
                </pre>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
