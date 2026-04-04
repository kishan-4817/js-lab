import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Zap, ChevronRight, Star } from 'lucide-react';
import CodeRunner from './CodeRunner';
import MemoryVisualizer from './MemoryVisualizer';
import AsyncTimeline from './AsyncTimeline';
import { markLessonComplete, isLessonComplete } from '../../lib/progress';
import { LESSON_NOTES } from '../../content/curriculum/lesson-notes';
import Confetti from 'react-confetti';

function NoteList({ label, items, color }) {
  return (
    <div style={{ flex: '1 1 220px', minWidth: 220 }}>
      <div style={{
        fontSize: 10,
        color,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
        fontWeight: 700,
      }}>
        {label}
      </div>
      <div style={{
        background: '#0d1117',
        border: `1px solid ${color}33`,
        borderRadius: 8,
        padding: '12px 14px',
      }}>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 8 }}>
          {items.map((item) => (
            <li key={item} style={{ color: '#c9d1d9', fontSize: 13, lineHeight: 1.6 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TheoryPanel({ lesson, section }) {
  const lines = lesson.theory.split('\n');
  const notes = LESSON_NOTES[lesson.id];
  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', height: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ 
          fontSize: 10, color: section.color, textTransform: 'uppercase', 
          letterSpacing: 2, marginBottom: 6, fontWeight: 700
        }}>
          {section.title} · {lesson.type}
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
          color: '#e6edf3', lineHeight: 1.2, marginBottom: 8
        }}>
          {lesson.title}
        </h1>
        <p style={{ fontSize: 13, color: '#8b949e' }}>{lesson.subtitle}</p>
      </div>

      {/* XP badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: `${section.color}15`, border: `1px solid ${section.color}44`,
        borderRadius: 20, padding: '4px 12px', marginBottom: 20
      }}>
        <Zap size={12} color={section.color} fill={section.color} />
        <span style={{ fontSize: 12, color: section.color, fontWeight: 600 }}>+{lesson.xp} XP</span>
      </div>

      {notes && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <NoteList label="Focus first" items={notes.focus} color={section.color} />
          <NoteList label="Watch out" items={notes.watchOut} color="#ff6b35" />
          <div style={{ flex: '1 1 220px', minWidth: 220 }}>
            <div style={{
              fontSize: 10,
              color: '#f0c929',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              marginBottom: 8,
              fontWeight: 700,
            }}>
              Try this
            </div>
            <div style={{
              background: 'rgba(240,201,41,0.08)',
              border: '1px solid rgba(240,201,41,0.3)',
              borderRadius: 8,
              padding: '12px 14px',
              color: '#e6edf3',
              fontSize: 13,
              lineHeight: 1.6,
            }}>
              {notes.tryThis}
            </div>
          </div>
        </div>
      )}

      {/* Theory content */}
      <div style={{
        background: '#0d1117', border: '1px solid #30363d',
        borderRadius: 8, padding: '16px 18px', marginBottom: 20
      }}>
        {lines.map((line, i) => {
          if (!line.trim()) return <div key={i} style={{ height: 10 }} />;
          
          // Headers
          if (line.startsWith('- **')) {
            const content = line.slice(2);
            const parts = content.split('**');
            return (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                <span style={{ color: section.color, flexShrink: 0 }}>▸</span>
                <div style={{ fontSize: 13, color: '#e6edf3', lineHeight: 1.6 }}>
                  {parts.map((p, pi) => pi % 2 === 1 
                    ? <strong key={pi} style={{ color: section.color }}>{p}</strong>
                    : p
                  )}
                </div>
              </div>
            );
          }
          
          // Code inline
          const processed = line.replace(/`([^`]+)`/g, (_, code) => 
            `<code style="background:#1c2333;color:#00ff88;padding:1px 5px;border-radius:3px;font-family:'JetBrains Mono',monospace;font-size:12px">${code}</code>`
          ).replace(/\*\*([^*]+)\*\*/g, (_, text) =>
            `<strong style="color:#e6edf3">${text}</strong>`
          );
          
          return (
            <p key={i} style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.7, marginBottom: 4 }}
              dangerouslySetInnerHTML={{ __html: processed }} />
          );
        })}
      </div>
    </div>
  );
}

export default function LessonView({ section, lesson, onComplete, onNext }) {
  const [tab, setTab] = useState('theory');
  const [code, setCode] = useState(lesson.starterCode);
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);

  useEffect(() => {
    setCode(lesson.starterCode);
    setTab('theory');
    setShowChallenge(false);
    setCompleted(isLessonComplete(section.id, lesson.id));
  }, [lesson.id, lesson.starterCode, section.id]);

  const handleSuccess = () => {
    if (!completed) {
      const newProgress = markLessonComplete(section.id, lesson.id, lesson.xp);
      setCompleted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      onComplete(newProgress);
    }
  };

  const tabs = [
    { id: 'theory', label: 'Theory', icon: <BookOpen size={13} /> },
    { id: 'code', label: 'Code Lab', icon: <Code size={13} /> },
    ...(lesson.type === 'timeline' ? [{ id: 'timeline', label: 'Event Loop', icon: '⏳' }] : []),
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} colors={['#00ff88', '#00d4ff', '#ff6b35', '#bf5af2', '#f0c929']} />}

      {/* Tab bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '0 20px', background: '#0d1117',
        borderBottom: '1px solid #30363d', flexShrink: 0,
        minHeight: 44
      }}>
        {tabs.map(t => (
          <motion.button
            key={t.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setTab(t.id)}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: tab === t.id ? `2px solid ${section.color}` : '2px solid transparent',
              color: tab === t.id ? section.color : '#6e7681',
              padding: '12px 14px 10px',
              fontSize: 12, fontWeight: tab === t.id ? 600 : 400,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.15s'
            }}>
            {t.icon}
            {t.label}
          </motion.button>
        ))}

        {/* Complete button */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {completed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#00ff88' }}>
              <Star size={13} fill="#00ff88" /> +{lesson.xp} XP earned
            </div>
          )}
          {!completed && (
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={handleSuccess}
              style={{
                background: `${section.color}22`, border: `1px solid ${section.color}66`,
                color: section.color, padding: '6px 14px', borderRadius: 4,
                fontSize: 11, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-sans)'
              }}>
              Mark Complete ✓
            </motion.button>
          )}
          {onNext && (
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={onNext}
              style={{
                background: section.color, border: 'none',
                color: '#080b0f', padding: '6px 14px', borderRadius: 4,
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                display: 'flex', alignItems: 'center', gap: 4
              }}>
              Next <ChevronRight size={13} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ flex: 1, overflow: 'hidden', display: 'flex' }}
        >
          {tab === 'theory' && (
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ overflowY: 'auto', flex: 1 }}>
                <TheoryPanel lesson={lesson} section={section} />
              </div>
              <div style={{ padding: '12px 24px', borderTop: '1px solid #30363d', background: '#0d1117' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setTab('code')}
                  style={{
                    background: `${section.color}22`, border: `1px solid ${section.color}66`,
                    color: section.color, padding: '8px 16px', borderRadius: 6,
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    display: 'flex', alignItems: 'center', gap: 6
                  }}>
                  <Code size={13} /> Open Code Lab →
                </motion.button>
              </div>
            </div>
          )}

          {tab === 'code' && (
            <div style={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden' }}>
              {/* Editor + Output */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid #30363d' }}>
                <CodeRunner
                  code={code}
                  onSuccess={handleSuccess}
                  showChallenge={showChallenge}
                  challenge={lesson.challenge}
                />
              </div>

              {/* Right panel: visualizer + challenge toggle */}
              <div style={{ width: 280, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#080b0f' }}>
                <div style={{ padding: '10px 12px', borderBottom: '1px solid #30363d' }}>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setShowChallenge(v => !v)}
                    style={{
                      width: '100%', background: showChallenge ? 'rgba(255,107,53,0.15)' : '#161b22',
                      border: `1px solid ${showChallenge ? '#ff6b35' : '#30363d'}`,
                      color: showChallenge ? '#ff6b35' : '#8b949e', padding: '6px 12px', borderRadius: 4,
                      fontSize: 11, fontWeight: 600, cursor: 'pointer',
                      fontFamily: 'var(--font-sans)'
                    }}>
                    🎯 {showChallenge ? 'Hide' : 'Show'} Challenge
                  </motion.button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
                  {lesson.type === 'visualizer' || lesson.type === 'explorer' ? (
                    <MemoryVisualizer code={code} />
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {tab === 'timeline' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
              <AsyncTimeline code={code} />
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, color: '#8b949e', marginBottom: 12 }}>
                  The Event Loop is what makes JS non-blocking. It watches the call stack — when it's empty, 
                  it moves jobs from the queues. Microtasks (Promises) always run before macrotasks (setTimeout).
                </div>
                <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: 11, color: '#6e7681', marginBottom: 8 }}>PROMISE STATES:</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[
                      { label: 'Pending', color: '#f0c929', desc: 'Waiting for result' },
                      { label: 'Fulfilled', color: '#00ff88', desc: 'Success! Has value' },
                      { label: 'Rejected', color: '#ff4757', desc: 'Failed. Has reason' },
                    ].map(s => (
                      <div key={s.label} style={{
                        flex: 1, background: `${s.color}10`, border: `1px solid ${s.color}44`,
                        borderRadius: 6, padding: '8px 10px'
                      }}>
                        <div style={{ fontSize: 11, color: s.color, fontWeight: 700 }}>{s.label}</div>
                        <div style={{ fontSize: 10, color: '#6e7681', marginTop: 2 }}>{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
