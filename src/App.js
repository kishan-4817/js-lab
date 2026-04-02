import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import Dashboard from './components/Dashboard';
import XPBar from './components/XPBar';
import { CURRICULUM } from './data/curriculum';
import { getProgress, resetProgress } from './utils/progress';
import './index.css';

export default function App() {
  const [progress, setProgress] = useState(getProgress);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleSelect = (section, lesson) => {
    setSelectedSection(section);
    setSelectedLesson(lesson);
  };

  const handleComplete = (newProgress) => {
    setProgress(newProgress);
  };

  const handleReset = () => {
    if (window.confirm('Reset ALL progress? This cannot be undone.')) {
      resetProgress();
      setProgress(getProgress());
      setSelectedSection(null);
      setSelectedLesson(null);
    }
  };

  const handleNext = () => {
    if (!selectedSection || !selectedLesson) return;
    const sectionIdx = CURRICULUM.findIndex(s => s.id === selectedSection.id);
    const lessonIdx = selectedSection.lessons.findIndex(l => l.id === selectedLesson.id);
    
    if (lessonIdx < selectedSection.lessons.length - 1) {
      handleSelect(selectedSection, selectedSection.lessons[lessonIdx + 1]);
    } else if (sectionIdx < CURRICULUM.length - 1) {
      const nextSection = CURRICULUM[sectionIdx + 1];
      handleSelect(nextSection, nextSection.lessons[0]);
    }
  };

  const hasNext = () => {
    if (!selectedSection || !selectedLesson) return false;
    const sectionIdx = CURRICULUM.findIndex(s => s.id === selectedSection.id);
    const lessonIdx = selectedSection.lessons.findIndex(l => l.id === selectedLesson.id);
    return lessonIdx < selectedSection.lessons.length - 1 || sectionIdx < CURRICULUM.length - 1;
  };

  return (
    <div className="grid-bg" style={{ 
      height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' 
    }}>
      {/* Top XP bar */}
      <XPBar progress={progress} onReset={handleReset} />

      {/* Main layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        {/* Sidebar */}
        <Sidebar
          curriculum={CURRICULUM}
          selectedSection={selectedSection}
          selectedLesson={selectedLesson}
          onSelect={handleSelect}
          progress={progress}
        />

        {/* Main content */}
        <AnimatePresence mode="wait">
          {selectedLesson ? (
            <motion.div
              key={selectedLesson.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ flex: 1, display: 'flex', overflow: 'hidden' }}
            >
              <LessonView
                section={selectedSection}
                lesson={selectedLesson}
                onComplete={handleComplete}
                onNext={hasNext() ? handleNext : null}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ flex: 1, overflow: 'hidden' }}
            >
              <Dashboard
                progress={progress}
                onSelectLesson={handleSelect}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
