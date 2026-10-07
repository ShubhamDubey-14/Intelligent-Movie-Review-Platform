import React, { useState, useEffect } from 'react';
import { Film, Sun, Moon, Sparkles, Activity, Layers, BarChart3, Search, Sparkle } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { api } from '../services/api';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Navbar = ({ activeSection, setActiveSection }) => {
  const { theme, setTheme } = useTheme();
  const [apiOnline, setApiOnline] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      const res = await api.checkHealth();
      if (isMounted) setApiOnline(res.online);
    };
    check();
    const interval = setInterval(check, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: 'sandbox', label: 'ML Sandbox', icon: Sparkle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'catalog', label: 'Film Catalog', icon: Layers },
    { id: 'architecture', label: 'API & Arch', icon: Activity },
  ];

  const scrollTo = (id) => {
    if (setActiveSection) setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => scrollTo('sandbox')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-strong)',
            }}
          >
            <Film className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-tight text-base uppercase font-mono"
                style={{ color: 'var(--text-primary)' }}
              >
                CINE·MIND
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                ABSA ML
              </span>
            </div>
            <p className="text-[11px] leading-tight font-medium" style={{ color: 'var(--text-muted)' }}>
              Intelligent Cinema Analytics
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 p-1 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive 
                    ? 'shadow-sm' 
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--border-subtle)' : '1px solid transparent'
                }}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-500' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: API Status & Theme Toggle */}
        <div className="flex items-center space-x-3">
          
          {/* Health Status Indicator */}
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)'
            }}
            title={apiOnline ? 'FastAPI Backend Connected & Healthy' : 'Backend Initializing / Fallback Mode Active'}
          >
            <span className={`w-2 h-2 rounded-full ${apiOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-[11px]">
              {apiOnline ? 'API 8000 LIVE' : 'CLIENT RESILIENT'}
            </span>
          </div>

          {/* Three-Way Theme Switcher */}
          <div className="flex items-center p-1 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <button
              onClick={() => setTheme(THEMES.LIGHT)}
              className={`p-1.5 rounded-md transition-colors ${
                theme === THEMES.LIGHT ? 'shadow-sm text-amber-500' : 'text-neutral-400 hover:text-neutral-600'
              }`}
              style={{
                backgroundColor: theme === THEMES.LIGHT ? 'var(--bg-card)' : 'transparent',
              }}
              title="Editorial Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme(THEMES.DARK)}
              className={`p-1.5 rounded-md transition-colors ${
                theme === THEMES.DARK ? 'shadow-sm text-indigo-400' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              style={{
                backgroundColor: theme === THEMES.DARK ? 'var(--bg-card)' : 'transparent',
              }}
              title="Graphite Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme(THEMES.MIDNIGHT)}
              className={`p-1.5 rounded-md transition-colors ${
                theme === THEMES.MIDNIGHT ? 'shadow-sm text-emerald-400' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              style={{
                backgroundColor: theme === THEMES.MIDNIGHT ? 'var(--bg-card)' : 'transparent',
              }}
              title="Cinematic Midnight (OLED Glow)"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* GitHub Project Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)'
            }}
            title="View Source on GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
