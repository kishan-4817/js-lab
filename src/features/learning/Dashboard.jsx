import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BookOpen, Target } from 'lucide-react';
import { CURRICULUM } from '../../content/curriculum';
import { isLessonComplete } from '../../lib/progress';

export default function Dashboard({ progress, onSelectLesson }) {
  const totalLessons = CURRICULUM.reduce((sum, s) => sum + s.lessons.length, 0);
  const completedCount = progress.completedLessons.length;

  // Find next incomplete lesson
  let nextLesson = null, nextSection = null;
  outer: for (const section of CURRICULUM) {
    for (const lesson of section.lessons) {
      if (!isLessonComplete(section.id, lesson.id)) {
        nextLesson = lesson;
        nextSection = section;
        break outer;
      }
    }
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px 36px' }}>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 32 }}
      >
        <div style={{ fontSize: 10, color: '#8b949e', letterSpacing: 2, marginBottom: 6 }}>
          WELCOME TO
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800,
          color: '#e6edf3', lineHeight: 1.1, marginBottom: 8
        }}>
          JavaScript<br /><span style={{ color: '#00ff88' }}>Lab</span>
          <span style={{ color: '#00d4ff' }}>.</span>
        </h1>
        <p style={{ fontSize: 14, color: '#8b949e', maxWidth: 500, lineHeight: 1.8 }}>
          Not another boring tutorial. Build real intuition through interactive code labs,
          memory visualizers, and mini-projects. <span style={{ color: '#e6edf3' }}>Learn by doing.</span>
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ display: 'flex', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}
      >
        {[
          { label: 'Total XP', value: progress.xp, icon: <Zap size={16} />, color: '#00ff88' },
          { label: 'Lessons Done', value: `${completedCount}/${totalLessons}`, icon: <BookOpen size={16} />, color: '#00d4ff' },
          { label: 'Day Streak', value: progress.streak || 0, icon: '🔥', color: '#ff6b35' },
          { label: 'Level', value: Math.floor(progress.xp / 50) + 1, icon: <Target size={16} />, color: '#bf5af2' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            style={{
              background: '#0b0f14',
              border: '1px solid #21262d',
              borderRadius: 10,
              padding: '12px 16px',
              minWidth: 120,
              flex: '1 1 120px',
              maxWidth: 160
            }}
          >
            <div style={{ color: stat.color, marginBottom: 6, display: 'flex', alignItems: 'center' }}>
              {stat.icon}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#e6edf3' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 11, color: '#8b949e' }}>{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Continue / Start button */}
      {nextLesson && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ marginBottom: 32 }}
        >
          <div style={{ fontSize: 11, color: '#6e7681', marginBottom: 8 }}>
            {completedCount === 0 ? '🚀 START LEARNING' : '▶ CONTINUE'}
          </div>
          <motion.div
            whileHover={{ scale: 1.01, borderColor: nextSection.color }}
            onClick={() => onSelectLesson(nextSection, nextLesson)}
            style={{
              background: '#0b0f14',
              border: '1px solid #21262d',
              borderRadius: 10, padding: '16px 20px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 16,
              maxWidth: 500
            }}
          >
            <div style={{
              width: 40, height: 40, background: `${nextSection.color}22`,
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0
            }}>
              {nextSection.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: nextSection.color, marginBottom: 2 }}>
                {nextSection.title}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3' }}>
                {nextLesson.title}
              </div>
              <div style={{ fontSize: 11, color: '#8b949e' }}>
                {nextLesson.subtitle} · +{nextLesson.xp} XP
              </div>
            </div>
            <div style={{ color: nextSection.color, fontWeight: 700, fontSize: 18 }}>→</div>
          </motion.div>
        </motion.div>
      )}

      {/* All sections overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div style={{ fontSize: 11, color: '#6e7681', marginBottom: 12, letterSpacing: 1.2, textTransform: 'uppercase' }}>ALL MODULES</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {CURRICULUM.map((section, i) => {
            const done = section.lessons.filter(l => isLessonComplete(section.id, l.id)).length;
            const pct = done / section.lessons.length;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                whileHover={{ scale: 1.02, borderColor: section.color }}
                onClick={() => {
                  const firstIncomplete = section.lessons.find(l => !isLessonComplete(section.id, l.id)) || section.lessons[0];
                  onSelectLesson(section, firstIncomplete);
                }}
                style={{
                  background: '#0b0f14', border: '1px solid #21262d',
                  borderRadius: 8, padding: '14px 16px', cursor: 'pointer',
                  transition: 'border-color 0.2s, transform 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 20 }}>{section.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#e6edf3' }}>
                      {section.title}
                    </div>
                    <div style={{ fontSize: 10, color: '#8b949e' }}>
                      {done}/{section.lessons.length} lessons · {section.xp} XP
                    </div>
                  </div>
                </div>
                <div style={{ height: 3, background: '#21262d', borderRadius: 2, overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${pct * 100}%` }}
                    style={{ height: '100%', background: section.color, borderRadius: 2 }}
                  />
                </div>
                {pct === 1 && (
                  <div style={{ fontSize: 10, color: section.color, marginTop: 6 }}>✅ Complete!</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #21262d' }}
      >
        <div style={{ fontSize: 11, color: '#6e7681', marginBottom: 12, letterSpacing: 1.2, textTransform: 'uppercase' }}>HOW IT WORKS</div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {[
            { icon: '📖', title: 'Read the Theory', desc: 'Short, focused explanations with examples' },
            { icon: '⚡', title: 'Run Live Code', desc: 'Edit and execute JS right in the browser' },
            { icon: '🔬', title: 'See It Happen', desc: 'Memory visualizer shows variables in real time' },
            { icon: '🎯', title: 'Crack the Challenge', desc: 'Apply what you learned, earn XP' },
          ].map(item => (
            <div key={item.title} style={{ flex: '1 1 180px', minWidth: 160 }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3', marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: '#8b949e', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

