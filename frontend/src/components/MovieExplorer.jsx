import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  Star, 
  Sparkles, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';
import { api } from '../services/api';
import { MovieModal } from './MovieModal';

const GENRES = ["All", "Sci-Fi", "Drama", "Thriller", "Action", "Animation", "Comedy", "Romance"];
const SENTIMENTS = ["All", "Positive", "Neutral", "Negative"];

export const MovieExplorer = ({ onTestInSandbox }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedSentiment, setSelectedSentiment] = useState('All');
  const [sortBy, setSortBy] = useState('audience_desc');
  const [activeModalMovie, setActiveModalMovie] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await api.getMovies({
          search: search || undefined,
          genre: selectedGenre,
          sentiment: selectedSentiment,
          sort_by: sortBy
        });
        if (isMounted) setMovies(data);
      } catch (err) {
        console.error("Failed to load movies:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(fetchMovies, 250);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [search, selectedGenre, selectedSentiment, sortBy]);

  return (
    <section id="catalog" className="py-12 sm:py-20 border-b"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)'
              }}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>PRE-ANALYZED CATALOG</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Movie Explorer & Review Catalog
            </h2>
            <p className="text-sm sm:text-base mt-2 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              Browse analyzed cinematic titles. Inspect fine-grained aspect breakdowns, critic vs audience consensus, and test reviews in real time.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            Showing {movies.length} Curated Films
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl mb-8 space-y-4 shadow-sm"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div className="flex flex-col md:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, director, or cast..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm outline-none transition-colors font-sans"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs font-sans outline-none cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="audience_desc">Highest Audience Score</option>
                <option value="critic_desc">Highest Critic Score</option>
                <option value="year_desc">Latest Release Year</option>
                <option value="title_asc">Title (A - Z)</option>
              </select>
            </div>

          </div>

          {/* Genre & Sentiment Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            {/* Genres */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider mr-1" style={{ color: 'var(--text-muted)' }}>
                Genre:
              </span>
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                    selectedGenre === g
                      ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: selectedGenre === g ? undefined : 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    color: selectedGenre === g ? undefined : 'var(--text-secondary)'
                  }}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Sentiment */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider mr-1" style={{ color: 'var(--text-muted)' }}>
                Sentiment:
              </span>
              {SENTIMENTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSentiment(s)}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                    selectedSentiment === s
                      ? 'bg-indigo-500 text-white font-bold shadow-sm'
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: selectedSentiment === s ? undefined : 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    color: selectedSentiment === s ? undefined : 'var(--text-secondary)'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-2xl animate-pulse bg-neutral-200 dark:bg-neutral-800" />
            ))}
          </div>
        )}

        {/* Movie Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="group rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={movie.backdrop_url || movie.poster_url}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Genre Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {movie.genres.slice(0, 2).map((g, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-neutral-200 backdrop-blur-md border border-white/10">
                          {g}
                        </span>
                      ))}
                    </div>

                    {/* Overall Sentiment Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                        {movie.overall_sentiment}
                      </span>
                    </div>

                    {/* Title in Image Overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-neutral-300 font-mono mt-0.5">
                        {movie.year} • Dir. {movie.director}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                      {movie.synopsis}
                    </p>

                    {/* Score Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="p-2.5 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>
                          Critic Score
                        </span>
                        <span className="text-base font-bold font-mono text-indigo-400">
                          {movie.critic_score}%
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>
                          Audience Score
                        </span>
                        <span className="text-base font-bold font-mono text-emerald-400">
                          {movie.audience_score}%
                        </span>
                      </div>
                    </div>

                    {/* Mini Aspect Gauges */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                        Top Aspect Strengths:
                      </span>
                      {Object.entries(movie.aspect_scores).slice(0, 3).map(([asp, score], i) => (
                        <div key={i} className="flex items-center justify-between text-[11px] font-mono">
                          <span style={{ color: 'var(--text-secondary)' }}>{asp}</span>
                          <span className="font-semibold text-emerald-500">{Math.round(score * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalMovie(movie)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => {
                      const sample = movie.recent_reviews[0]?.text || `A masterclass in modern cinema: ${movie.title} excels in every aspect.`;
                      onTestInSandbox(movie.title, sample);
                    }}
                    className="py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all font-sans"
                    title="Send sample review to Sandbox"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Test Review</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Empty Search State */}
        {!loading && movies.length === 0 && (
          <div className="p-12 text-center rounded-2xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
              No films matched your search criteria. Try modifying your genre or search query.
            </p>
          </div>
        )}

      </div>

      {/* Movie Details Modal */}
      {activeModalMovie && (
        <MovieModal
          movie={activeModalMovie}
          onClose={() => setActiveModalMovie(null)}
          onTestInSandbox={(title, sample) => {
            setActiveModalMovie(null);
            onTestInSandbox(title, sample);
          }}
        />
      )}
    </section>
  );
};
