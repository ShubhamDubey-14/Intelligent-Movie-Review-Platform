import React from 'react';
import { Film, ExternalLink, Heart } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="py-12 border-t transition-colors"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-secondary)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-sm uppercase font-mono" style={{ color: 'var(--text-primary)' }}>
              CINE·MIND
            </span>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Intelligent Cinema Analytics & ML Review Platform
            </p>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">FastAPI</span>
          <span className="px-2.5 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">Scikit-Learn ABSA</span>
          <span className="px-2.5 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">React 19 + Vite</span>
          <span className="px-2.5 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">Tailwind CSS</span>
          <span className="px-2.5 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">Recharts</span>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4 text-xs font-mono">
          <a
            href="#sandbox"
            className="hover:underline transition-all"
            style={{ color: 'var(--text-secondary)' }}
          >
            Back to Top
          </a>
          <span>•</span>
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noreferrer"
            className="hover:underline flex items-center space-x-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>Swagger API</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </footer>
  );
};
