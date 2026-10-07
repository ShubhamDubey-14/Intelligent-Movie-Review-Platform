import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Layers, 
  Scale, 
  MessageSquare, 
  Flame, 
  ThumbsUp, 
  ThumbsDown,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { api } from '../services/api';

const COLORS = {
  emerald: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
  indigo: '#6366f1',
  cyan: '#06b6d4',
  purple: '#a855f7'
};

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAnalytics = async () => {
      try {
        const data = await api.getAnalytics();
        if (isMounted) setAnalytics(data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAnalytics();
    return () => { isMounted = false; };
  }, []);

  if (loading || !analytics) {
    return (
      <section id="analytics" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  const { kpis, sentiment_distribution, sentiment_trends, aspect_breakdown, critic_vs_audience, top_positive_keywords, top_negative_keywords, rating_distribution } = analytics;

  return (
    <section id="analytics" className="py-12 sm:py-20 border-b"
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
              <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
              <span>MACRO DATASET ANALYTICS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Cinematic Sentiment Dynamics
            </h2>
            <p className="text-sm sm:text-base mt-2 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              Statistical aggregation over {kpis.total_reviews_analyzed.toLocaleString()} reviews.
              Explore temporal polarity trends, critic-audience divergence, and aspect drivers.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Telemetry: Live Synthetic Corpus</span>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          
          <div className="p-5 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Total Analyzed
              </span>
              <MessageSquare className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {kpis.total_reviews_analyzed.toLocaleString()}
            </div>
            <div className="text-[11px] font-mono mt-1 text-emerald-500">
              Verified Cinema Corpus
            </div>
          </div>

          <div className="p-5 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Avg Polarity
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-emerald-500">
              +{kpis.avg_sentiment_polarity}
            </div>
            <div className="text-[11px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
              Normalized [-1.0, +1.0]
            </div>
          </div>

          <div className="p-5 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Positivity Rate
              </span>
              <ThumbsUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {kpis.overall_positive_rate}%
            </div>
            <div className="text-[11px] font-mono mt-1 text-emerald-500">
              Supervised Target
            </div>
          </div>

          <div className="p-5 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Concordance
              </span>
              <Scale className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-indigo-400">
              {kpis.critic_audience_concordance}%
            </div>
            <div className="text-[11px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
              Critic vs Audience Alignment
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-5 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Leading Driver
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-lg sm:text-xl font-bold tracking-tight truncate" style={{ color: 'var(--text-primary)' }}>
              {kpis.dominant_aspect}
            </div>
            <div className="text-[11px] font-mono mt-1 text-amber-500">
              Highest Polarity Weight
            </div>
          </div>

        </div>

        {/* Charts Grid Row 1: Sentiment Trends & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Sentiment Trends Over Time (Area Chart) */}
          <div className="lg:col-span-2 p-6 rounded-2xl flex flex-col justify-between shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Sentiment Trends Over Time
                </h3>
                <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  12-Month Historical Polarity Dynamics & Review Volumes
                </p>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sentiment_trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="neuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.amber} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.amber} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="negGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.rose} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.rose} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(115, 115, 115, 0.15)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-strong)',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                      color: 'var(--text-primary)'
                    }} 
                  />
                  <Area type="monotone" dataKey="positive" name="Positive %" stroke={COLORS.emerald} strokeWidth={2} fillOpacity={1} fill="url(#posGrad)" />
                  <Area type="monotone" dataKey="neutral" name="Neutral %" stroke={COLORS.amber} strokeWidth={1.5} fillOpacity={1} fill="url(#neuGrad)" />
                  <Area type="monotone" dataKey="negative" name="Negative %" stroke={COLORS.rose} strokeWidth={1.5} fillOpacity={1} fill="url(#negGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sentiment Distribution (Donut Chart) */}
          <div className="p-6 rounded-2xl flex flex-col justify-between shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="mb-4">
              <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Sentiment Distribution
              </h3>
              <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Aggregate Class Proportions
              </p>
            </div>

            <div className="h-52 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentiment_distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentiment_distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-strong)',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                      color: 'var(--text-primary)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <span className="text-xs font-mono uppercase block" style={{ color: 'var(--text-muted)' }}>Positive</span>
                <span className="text-xl font-bold font-mono text-emerald-500">73.5%</span>
              </div>
            </div>

            <div className="space-y-2 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              {sentiment_distribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                  </div>
                  <span className="font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {item.percentage}% ({item.value.toLocaleString()})
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Charts Grid Row 2: Aspect Benchmark & Critic vs Audience Divergence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Aspect Benchmark Bar Chart */}
          <div className="p-6 rounded-2xl flex flex-col justify-between shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Aspect Sentiment vs Industry Benchmark
                </h3>
                <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Evaluated Aspect Scores compared to Historical Baselines
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aspect_breakdown} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(115, 115, 115, 0.15)" />
                  <XAxis dataKey="aspect" stroke="var(--text-muted)" fontSize={10} angle={-15} textAnchor="end" tickLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} domain={[50, 100]} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-strong)',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                      color: 'var(--text-primary)'
                    }} 
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="score" name="Dataset Average" fill={COLORS.emerald} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="benchmark" name="Benchmark" fill="rgba(115, 115, 115, 0.35)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Critic vs Audience Divergence */}
          <div className="p-6 rounded-2xl flex flex-col justify-between shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Critic vs. Audience Sentiment Divergence
                </h3>
                <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Comparative Ratings across Sample Catalog
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={critic_vs_audience.slice(0, 8)} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(115, 115, 115, 0.15)" />
                  <XAxis dataKey="movie" stroke="var(--text-muted)" fontSize={10} angle={-15} textAnchor="end" tickLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} domain={[60, 100]} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-strong)',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                      color: 'var(--text-primary)'
                    }} 
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="critic" name="Critic Score %" fill={COLORS.indigo} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="audience" name="Audience Score %" fill={COLORS.emerald} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Row 3: Frequent Sentiment Lexicon Keywords & Star Ratings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Positive Keywords */}
          <div className="p-6 rounded-2xl shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <ThumbsUp className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-emerald-500">
                Most Frequent Praise Terms
              </h3>
            </div>

            <div className="space-y-2.5">
              {top_positive_keywords.map((kw, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      "{kw.word}"
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 font-mono">
                    <span style={{ color: 'var(--text-muted)' }}>{kw.count.toLocaleString()} hits</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 font-bold">
                      +{kw.weight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Negative Keywords */}
          <div className="p-6 rounded-2xl shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <ThumbsDown className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-rose-500">
                Most Frequent Critique Terms
              </h3>
            </div>

            <div className="space-y-2.5">
              {top_negative_keywords.map((kw, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      "{kw.word}"
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 font-mono">
                    <span style={{ color: 'var(--text-muted)' }}>{kw.count.toLocaleString()} hits</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-500 font-bold">
                      {kw.weight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Histogram (1-10) */}
          <div className="p-6 rounded-2xl shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Flame className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono" style={{ color: 'var(--text-primary)' }}>
                Rating Distribution (1-10)
              </h3>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rating_distribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(115, 115, 115, 0.15)" />
                  <XAxis dataKey="rating" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-strong)',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                      color: 'var(--text-primary)'
                    }} 
                  />
                  <Bar dataKey="count" name="Review Volume" fill={COLORS.emerald} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
