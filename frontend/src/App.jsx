import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { ReviewSandbox } from './components/ReviewSandbox';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { MovieExplorer } from './components/MovieExplorer';
import { ArchitectureSection } from './components/ArchitectureSection';
import { Footer } from './components/Footer';

export function AppContent() {
  const [activeSection, setActiveSection] = useState('sandbox');
  const [prefilledText, setPrefilledText] = useState('');
  const [prefilledMovie, setPrefilledMovie] = useState('');

  const handleTestInSandbox = (title, sampleText) => {
    setPrefilledMovie(title);
    setPrefilledText(sampleText);
    setActiveSection('sandbox');

    const sandboxElem = document.getElementById('sandbox');
    if (sandboxElem) {
      sandboxElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1">
        <ReviewSandbox 
          key={`${prefilledMovie}-${prefilledText}`}
          prefilledText={prefilledText}
          prefilledMovie={prefilledMovie}
        />
        <AnalyticsDashboard />
        <MovieExplorer onTestInSandbox={handleTestInSandbox} />
        <ArchitectureSection />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
