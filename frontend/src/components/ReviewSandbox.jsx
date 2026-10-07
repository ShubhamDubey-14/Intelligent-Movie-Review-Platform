import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MinusCircle, 
  BookOpen, 
  User, 
  Compass, 
  Camera, 
  Music, 
  Layers,
  ArrowRight,
  Info,
  Film,
  Search,
  PenTool,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';

const POPULAR_FILM_SUGGESTIONS = [
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "Titanic",
  "The Matrix",
  "Pulp Fiction",
  "Parasite",
  "Whiplash",
  "Gladiator",
  "La La Land",
  "Spirited Away",
  "Dune: Part Two"
];

const SAMPLE_MANUAL_PRESETS = [
  {
    title: "Masterpiece Praise",
    label: "Oppenheimer",
    text: "An absolute cinematic masterpiece. Cillian Murphy delivers a devastating, career-defining performance, while Ludwig Göransson's pulse-pounding musical score and the visceral cinematography elevate the tension into pure cinematic transcendence."
  },
  {
    title: "Contrastive Nuance",
    label: "Dune: Part Two",
    text: "Although the cinematography and visual effects were breathtaking with mind-boggling spectacle, the script's pacing dragged considerably in the middle and the dialogue felt somewhat flat."
  },
  {
    title: "Severe Critique",
    label: "Franchise Flop",
    text: "A disjointed, tedious slog devoid of heart or coherence. Terrible dialogue, laughable CGI, and lifeless performances make this an unwatchable disaster from start to finish."
  },
  {
    title: "Balanced Mixed",
    label: "Past Lives",
    text: "A delicate, quiet film with heartfelt performances from the lead cast, though the slow pacing and ambiguous ending may divide viewers expecting conventional dramatic fireworks."
  }
];

const ASPECT_ICONS = {
  "Story & Screenplay": BookOpen,
  "Acting & Cast": User,
  "Directing & Vision": Compass,
  "Cinematography & Visuals": Camera,
  "Music & Sound Design": Music
};

export const ReviewSandbox = ({ onMovieSelected, prefilledText, prefilledMovie }) => {
  // Mode selection: 'by_movie' (Default) vs 'custom_text'
  const [activeTab, setActiveTab] = useState('by_movie');
  
  // Movie Search mode state
  const [targetMovieName, setTargetMovieName] = useState(prefilledMovie || 'Inception');
  const [selectedPerspective, setSelectedPerspective] = useState('consensus');

  // Custom Text mode state
  const [customReviewText, setCustomReviewText] = useState(
    prefilledText || "An absolute cinematic masterpiece with breathtaking visuals, flawless performances, and a hauntingly beautiful musical score that lingers in the soul."
  );
  const [customMovieContext, setCustomMovieContext] = useState(prefilledMovie || "Oppenheimer");

  // Output & Loading states
  const [loading, setLoading] = useState(false);
  const [generatedMovieMeta, setGeneratedMovieMeta] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedReview, setCopiedReview] = useState(false);

  // 1. Generate Intelligent Review by Movie Title
  const handleGenerateByMovie = async (movieTitle = targetMovieName, perspective = selectedPerspective) => {
    if (!movieTitle || !movieTitle.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await api.generateMovieReview(movieTitle.trim(), perspective);
      setGeneratedMovieMeta({
        movie_title: data.movie_title,
        metadata: data.metadata,
        perspective: data.perspective,
        review_text: data.review_text
      });
      setResult(data.analysis);
      // Also sync to custom text so user can tweak it
      setCustomReviewText(data.review_text);
      setCustomMovieContext(data.movie_title);
    } catch (err) {
      console.error(err);
      setError("Failed to generate intelligent review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Analyze Custom Review Text
  const handleAnalyzeCustom = async () => {
    if (!customReviewText || customReviewText.trim().length < 5) {
      setError("Please input at least 5 characters for analysis.");
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedMovieMeta(null);

    try {
      const data = await api.analyzeReview(customReviewText, customMovieContext || null);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (activeTab === 'by_movie') {
        handleGenerateByMovie();
      } else {
        handleAnalyzeCustom();
      }
    }
  };

  const copyGeneratedText = () => {
    if (generatedMovieMeta?.review_text) {
      navigator.clipboard.writeText(generatedMovieMeta.review_text);
      setCopiedReview(true);
      setTimeout(() => setCopiedReview(false), 2000);
    }
  };

  const switchToCustomAndEdit = () => {
    if (generatedMovieMeta) {
      setCustomReviewText(generatedMovieMeta.review_text);
      setCustomMovieContext(generatedMovieMeta.movie_title);
      setActiveTab('custom_text');
    }
  };

  return (
    <section id="sandbox" className="py-12 sm:py-20 border-b"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-4"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)'
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>INTELLIGENT CINEMA REVIEW SYNTHESIS & ABSA ML</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Get an Intelligent Review for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
              Any Movie Title
            </span>
          </h1>

          <p className="text-base sm:text-lg font-normal leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Simply enter any film title to instantly synthesize a multi-dimensional critical review,
            or paste your own review text for real-time neural Aspect-Based Sentiment Analysis.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="p-1 rounded-xl flex items-center space-x-1"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <button
              onClick={() => setActiveTab('by_movie')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'by_movie'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md font-bold'
                  : 'hover:opacity-80'
              }`}
              style={{
                color: activeTab === 'by_movie' ? '#0a0a0a' : 'var(--text-secondary)'
              }}
            >
              <Film className="w-4 h-4" />
              <span>Input Movie Name (Instant Review)</span>
            </button>

            <button
              onClick={() => setActiveTab('custom_text')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'custom_text'
                  ? 'bg-indigo-500 text-white shadow-md font-bold'
                  : 'hover:opacity-80'
              }`}
              style={{
                color: activeTab === 'custom_text' ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              <PenTool className="w-4 h-4" />
              <span>Paste Custom Review Text</span>
            </button>
          </div>
        </div>

        {/* TAB 1: GENERATE BY MOVIE TITLE */}
        {activeTab === 'by_movie' && (
          <div className="rounded-2xl p-6 sm:p-8 mb-10 transition-all shadow-xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="mb-4">
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Movie Title
              </label>

              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={targetMovieName}
                  onChange={(e) => setTargetMovieName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type any movie title (e.g., Inception, The Dark Knight, Interstellar, Titanic, Avatar, Gladiator...)"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm sm:text-base outline-none transition-colors font-sans"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            {/* Critical Perspective Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pt-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider mr-1" style={{ color: 'var(--text-muted)' }}>
                  Tone / Perspective:
                </span>
                {[
                  { id: 'consensus', label: '⚖️ Critical Consensus' },
                  { id: 'acclaim', label: '🌟 Rave Acclaim' },
                  { id: 'mixed', label: '🌗 Nuanced / Mixed' },
                  { id: 'critique', label: '⚡ Critical Pan' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPerspective(p.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                      selectedPerspective === p.id
                        ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                        : 'hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: selectedPerspective === p.id ? undefined : 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      color: selectedPerspective === p.id ? undefined : 'var(--text-secondary)'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                Press <strong>Ctrl/⌘ + Enter</strong> to run
              </span>
            </div>

            {/* Popular Film Quick Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mb-6 pt-3 border-t"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider mr-1" style={{ color: 'var(--text-muted)' }}>
                Try Famous Titles:
              </span>
              {POPULAR_FILM_SUGGESTIONS.map((title, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTargetMovieName(title);
                    handleGenerateByMovie(title, selectedPerspective);
                  }}
                  className="text-xs px-2.5 py-1 rounded-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {title}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg flex items-center space-x-2 text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={() => handleGenerateByMovie()}
                disabled={loading || !targetMovieName.trim()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 transition-all bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-sans shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Synthesizing Review & Running ABSA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Intelligent Review</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MANUAL REVIEW TEXT INPUT */}
        {activeTab === 'custom_text' && (
          <div className="rounded-2xl p-6 sm:p-8 mb-10 transition-all shadow-xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {/* Presets */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider mr-2" style={{ color: 'var(--text-muted)' }}>
                Sample Presets:
              </span>
              {SAMPLE_MANUAL_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCustomReviewText(preset.text);
                    setCustomMovieContext(preset.label);
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <span className="font-medium">{preset.title}</span>
                  <span className="ml-1.5 opacity-60 text-[10px]">({preset.label})</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
              <div className="sm:col-span-3">
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Custom Review Text
                </label>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Movie Title Context
                </label>
                <input
                  type="text"
                  value={customMovieContext}
                  onChange={(e) => setCustomMovieContext(e.target.value)}
                  placeholder="e.g. Oppenheimer"
                  className="w-full px-3 py-1.5 rounded-lg text-xs font-sans outline-none"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            <div className="relative mb-4">
              <textarea
                rows={4}
                value={customReviewText}
                onChange={(e) => setCustomReviewText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type or paste any movie review text here..."
                className="w-full p-4 rounded-xl text-sm sm:text-base outline-none resize-y leading-relaxed font-sans"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
              />
              <div className="absolute right-3 bottom-3 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                {customReviewText.length} characters
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg flex items-center space-x-2 text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                <span>Shortcut:</span>
                <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  Ctrl / ⌘ + Enter
                </kbd>
              </div>

              <button
                onClick={handleAnalyzeCustom}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 bg-indigo-500 hover:bg-indigo-400 text-white font-sans shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Custom Review...</span>
                  </>
                ) : (
                  <>
                    <PenTool className="w-4 h-4" />
                    <span>Analyze Custom Text</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Skeleton Loader during inference */}
        {loading && (
          <div className="rounded-2xl p-6 sm:p-8 animate-pulse space-y-6"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="h-8 w-48 bg-neutral-300 dark:bg-neutral-800 rounded-lg" />
              <div className="h-8 w-24 bg-neutral-300 dark:bg-neutral-800 rounded-lg" />
            </div>
            <div className="h-16 w-full bg-neutral-200 dark:bg-neutral-850 rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="h-28 bg-neutral-200 dark:bg-neutral-850 rounded-xl" />
              <div className="h-28 bg-neutral-200 dark:bg-neutral-850 rounded-xl" />
              <div className="h-28 bg-neutral-200 dark:bg-neutral-850 rounded-xl" />
            </div>
          </div>
        )}

        {/* PREDICTION RESULTS DISPLAY */}
        {result && !loading && (
          <div className="rounded-2xl p-6 sm:p-8 space-y-8 transition-all"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            
            {/* If Generated from Movie Title: Highlight Film Card */}
            {generatedMovieMeta && (
              <div className="p-5 rounded-2xl relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                      <Film className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                          {generatedMovieMeta.movie_title}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
                          {generatedMovieMeta.perspective}
                        </span>
                      </div>
                      <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                        Dir. {generatedMovieMeta.metadata.director} • {generatedMovieMeta.metadata.year} • {generatedMovieMeta.metadata.genres.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={copyGeneratedText}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)'
                      }}
                      title="Copy review text"
                    >
                      {copiedReview ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedReview ? 'Copied' : 'Copy Review'}</span>
                    </button>

                    <button
                      onClick={switchToCustomAndEdit}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all text-indigo-400 hover:text-indigo-300"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)'
                      }}
                      title="Edit this text in Custom Sandbox"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Edit & Re-analyze</span>
                    </button>
                  </div>
                </div>

                {/* The Synthesized Review Quotation */}
                <div className="p-4 rounded-xl mt-3 font-serif text-sm sm:text-base leading-relaxed italic"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                >
                  "{generatedMovieMeta.review_text}"
                </div>
              </div>
            )}

            {/* Top Stat Row: Sentiment Badge, Confidence, Estimated Rating */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${
                  result.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/25' :
                  result.sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/25' :
                  'bg-amber-500/10 text-amber-500 border border-amber-500/25'
                }`}>
                  {result.sentiment === 'Positive' && <CheckCircle2 className="w-8 h-8" />}
                  {result.sentiment === 'Negative' && <AlertCircle className="w-8 h-8" />}
                  {result.sentiment === 'Neutral' && <MinusCircle className="w-8 h-8" />}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      ML Polarity Classification
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-800"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {result.processing_time_ms}ms latency
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {result.sentiment} Sentiment
                  </h3>
                </div>
              </div>

              {/* KPI Badges */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Confidence Badge */}
                <div className="px-4 py-2.5 rounded-xl flex flex-col"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Confidence Score
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-500">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>

                {/* Scaled Rating Badge */}
                <div className="px-4 py-2.5 rounded-xl flex flex-col"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Predicted Rating
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-lg font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                      {result.overall_rating.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      / 10
                    </span>
                  </div>
                </div>

                {/* Compound Valence Badge */}
                <div className="px-4 py-2.5 rounded-xl flex flex-col"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Compound Polarity
                  </span>
                  <span className={`text-lg font-bold font-mono ${
                    result.compound_score > 0 ? 'text-emerald-500' :
                    result.compound_score < 0 ? 'text-rose-500' : 'text-amber-500'
                  }`}>
                    {result.compound_score > 0 ? `+${result.compound_score}` : result.compound_score}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Summary Highlight */}
            <div className="p-4 rounded-xl flex items-start space-x-3"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider block mb-0.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  AI Takeaway Consensus
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {result.summary}
                </p>
              </div>
            </div>

            {/* 3-Way Probability Bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span>Probability Density Distribution</span>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Positive: {(result.probabilities.positive * 100).toFixed(1)}%</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Neutral: {(result.probabilities.neutral * 100).toFixed(1)}%</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Negative: {(result.probabilities.negative * 100).toFixed(1)}%</span>
                  </span>
                </div>
              </div>

              <div className="h-3 w-full rounded-full overflow-hidden flex bg-neutral-200 dark:bg-neutral-800">
                <div 
                  style={{ width: `${result.probabilities.positive * 100}%` }}
                  className="bg-emerald-500 transition-all duration-500"
                />
                <div 
                  style={{ width: `${result.probabilities.neutral * 100}%` }}
                  className="bg-amber-500 transition-all duration-500"
                />
                <div 
                  style={{ width: `${result.probabilities.negative * 100}%` }}
                  className="bg-rose-500 transition-all duration-500"
                />
              </div>
            </div>

            {/* Aspect-Based Sentiment Analysis Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Aspect-Based Sentiment Breakdown (ABSA)
                  </h4>
                </div>
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  {result.aspects.length} Cinematic Dimensions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.aspects.map((asp, idx) => {
                  const Icon = ASPECT_ICONS[asp.aspect] || BookOpen;
                  const isPos = asp.sentiment === 'Positive';
                  const isNeg = asp.sentiment === 'Negative';

                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl flex flex-col justify-between transition-all hover:scale-[1.01]"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {asp.aspect}
                            </span>
                          </div>
                          
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                            isPos ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                            isNeg ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                            'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          }`}>
                            {asp.sentiment}
                          </span>
                        </div>

                        {/* Aspect Meter */}
                        <div className="flex items-center space-x-2 my-2">
                          <div className="h-1.5 flex-1 rounded-full overflow-hidden bg-neutral-300 dark:bg-neutral-800">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isPos ? 'bg-emerald-500' : isNeg ? 'bg-rose-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${Math.round(asp.score * 100)}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
                            {Math.round(asp.score * 100)}%
                          </span>
                        </div>

                        {/* Evidence Quote Excerpt */}
                        <div className="mt-2 text-xs italic font-serif leading-relaxed opacity-85"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          "{asp.evidence}"
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t flex items-center justify-between text-[10px] font-mono"
                        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                      >
                        <span>Confidence: {(asp.confidence * 100).toFixed(0)}%</span>
                        <span>ABSA Clause Signal</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explainable Token Highlighter */}
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Neural Explainability Highlighter
                </span>
                <div className="flex items-center space-x-3 text-[11px] font-mono">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded bg-emerald-500/40 border border-emerald-500" />
                    <span style={{ color: 'var(--text-muted)' }}>Praise Token</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded bg-rose-500/40 border border-rose-500" />
                    <span style={{ color: 'var(--text-muted)' }}>Critique Token</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded bg-indigo-500/40 border border-indigo-500" />
                    <span style={{ color: 'var(--text-muted)' }}>Aspect Target</span>
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl leading-relaxed text-sm font-sans flex flex-wrap gap-1.5"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)'
                }}
              >
                {result.highlighted_tokens.map((tok, idx) => {
                  if (tok.tag === 'positive') {
                    return (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30 cursor-help"
                        title={`Positive sentiment signal (Weight: +${tok.weight})`}
                      >
                        {tok.text}
                      </span>
                    );
                  }
                  if (tok.tag === 'negative') {
                    return (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-400 font-semibold border border-rose-500/30 cursor-help"
                        title={`Negative sentiment signal (Weight: ${tok.weight})`}
                      >
                        {tok.text}
                      </span>
                    );
                  }
                  if (tok.tag === 'aspect') {
                    return (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 font-semibold border border-indigo-500/30 cursor-help"
                        title="Aspect target token"
                      >
                        {tok.text}
                      </span>
                    );
                  }
                  return <span key={idx}>{tok.text}</span>;
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
