import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Send, 
  Sparkles, 
  Layers, 
  User, 
  Calendar, 
  Clock, 
  Award,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

export const MovieModal = ({ movie, onClose, onTestInSandbox }) => {
  const [reviews, setReviews] = useState(movie.recent_reviews || []);
  const [newReviewText, setNewReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState(null);

  if (!movie) return null;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReviewText.trim() || newReviewText.length < 5) return;

    setSubmitting(true);
    setSubmissionFeedback(null);

    try {
      const res = await api.submitMovieReview(movie.id, newReviewText);
      const newReview = {
        id: res.analysis.id,
        author: "Verified Viewer (You)",
        publication: null,
        is_critic: false,
        rating: res.analysis.overall_rating,
        date: "Just now",
        text: newReviewText,
        sentiment: res.analysis.sentiment,
        aspect_highlights: Object.fromEntries(
          res.analysis.aspects.map(a => [a.aspect, a.evidence.slice(0, 50)])
        )
      };

      setReviews([newReview, ...reviews]);
      setSubmissionFeedback({
        sentiment: res.analysis.sentiment,
        rating: res.analysis.overall_rating,
        summary: res.analysis.summary
      });
      setNewReviewText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl transition-all border my-8"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-900">
          <img 
            src={movie.backdrop_url || movie.poster_url} 
            alt={movie.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {movie.genres.map((g, i) => (
                  <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/60 text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
                    {g}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                {movie.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 flex items-center space-x-3 font-mono">
                <span>{movie.year}</span>
                <span>•</span>
                <span>Dir. {movie.director}</span>
                <span>•</span>
                <span>{movie.runtime}</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  onTestInSandbox(movie.title, movie.recent_reviews[0]?.text || `A masterclass in direction and storytelling: ${movie.title} is an absolute triumph.`);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all font-sans shadow-lg shadow-emerald-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Test in ML Sandbox</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Synopsis & Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Synopsis
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {movie.synopsis}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Key Ensemble Cast
                </h4>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Gauges */}
            <div className="p-5 rounded-2xl flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <h4 className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                Consensus Metrics
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>Critic Score</span>
                    <span className="font-bold text-indigo-400">{movie.critic_score}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-neutral-300 dark:bg-neutral-800">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${movie.critic_score}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>Audience Score</span>
                    <span className="font-bold text-emerald-400">{movie.audience_score}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-neutral-300 dark:bg-neutral-800">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${movie.audience_score}%` }} />
                  </div>
                </div>

                <div className="pt-2 border-t flex justify-between items-center text-xs font-mono"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>Sentiment Class:</span>
                  <span className="text-emerald-500 font-bold uppercase">{movie.overall_sentiment}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Aspect-Based Scores Breakdown */}
          <div className="p-6 rounded-2xl"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <h4 className="text-sm font-bold tracking-tight mb-4 flex items-center space-x-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Aspect Polarity Breakdown (ABSA)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(movie.aspect_scores).map(([asp, val], idx) => (
                <div key={idx} className="p-3 rounded-xl"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span style={{ color: 'var(--text-primary)' }}>{asp}</span>
                    <span className="font-mono font-bold text-emerald-500">
                      {Math.round(val * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    <div 
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${Math.round(val * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Submission Form */}
          <div className="p-6 rounded-2xl"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <h4 className="text-sm font-bold tracking-tight mb-2 flex items-center space-x-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Submit Your Review (Instant ML Analysis)</span>
            </h4>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              Submit your thoughts to run real-time sentiment extraction and add your evaluation to this film.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <textarea
                rows={3}
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="Write your review for this film..."
                className="w-full p-3 rounded-xl text-xs sm:text-sm outline-none resize-none transition-colors"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                  {newReviewText.length} characters
                </span>

                <button
                  type="submit"
                  disabled={submitting || newReviewText.trim().length < 5}
                  className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-sans shadow-md disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Analyzing...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Post & Classify</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {submissionFeedback && (
              <div className="mt-4 p-3 rounded-xl flex items-center space-x-3 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <div>
                  <span className="font-bold">Analysis Complete:</span> Classified as {submissionFeedback.sentiment} ({submissionFeedback.rating}/10). {submissionFeedback.summary}
                </div>
              </div>
            )}
          </div>

          {/* Pre-analyzed Reviews List */}
          <div>
            <h4 className="text-sm font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              Analyzed Review Catalogue ({reviews.length})
            </h4>

            <div className="space-y-3">
              {reviews.map((rev, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl transition-all"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                        {rev.author}
                      </span>
                      {rev.is_critic && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {rev.publication || 'Verified Critic'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        rev.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        rev.sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                        'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}>
                        {rev.sentiment} ({rev.rating}/10)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                    "{rev.text}"
                  </p>

                  {/* Aspect highlights chips */}
                  {rev.aspect_highlights && Object.keys(rev.aspect_highlights).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                      {Object.entries(rev.aspect_highlights).map(([asp, phrase], hIdx) => (
                        <span 
                          key={hIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        >
                          <strong className="text-emerald-500">{asp}:</strong> "{phrase}"
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
