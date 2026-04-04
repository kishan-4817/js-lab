import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { isLessonComplete } from '../../lib/progress';

export default function Sidebar({ curriculum, selectedSection, selectedLesson, onSelect, progress }) {
  return (
    <div style={{
      width: 260, flexShrink: 0, overflowY: 'auto',
      borderRight: '1px solid #21262d', background: '#080b0f',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #1c2333' }}>
        <div style={{ fontSize: 10, color: '#6e7681', textTransform: 'uppercase', letterSpacing: 1 }}>
          Curriculum
        </div>
      </div>

      {curriculum.map((section, si) => {
        const completedInSection = section.lessons.filter(l => 
          isLessonComplete(section.id, l.id)
        ).length;
        return (
          <div key={section.id}>
            {/* Section header */}
            <div style={{
              padding: '10px 14px 8px',
              borderBottom: '1px solid #1c2333',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{section.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700,
                    color: section.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}>
                    {section.title}
                  </div>
                  <div style={{ fontSize: 10, color: '#6e7681' }}>
                    {completedInSection}/{section.lessons.length} · {section.xp} XP
                  </div>
                </div>
              </div>
              {/* Section progress bar */}
              <div style={{ height: 2, background: '#21262d', borderRadius: 1, marginTop: 6 }}>
                <motion.div
                  animate={{ width: `${(completedInSection / section.lessons.length) * 100}%` }}
                  style={{ height: '100%', background: section.color, borderRadius: 1 }}
                />
              </div>
            </div>

            {/* Lessons */}
            {section.lessons.map((lesson, li) => {
              const complete = isLessonComplete(section.id, lesson.id);
              const isActive = selectedSection?.id === section.id && selectedLesson?.id === lesson.id;

              return (
                <motion.div
                  key={lesson.id}
                  whileHover={{ backgroundColor: '#11161d' }}
                  onClick={() => onSelect(section, lesson)}
                  style={{
                    padding: '7px 14px 7px 18px',
                    cursor: 'pointer',
                    background: isActive ? '#11161d' : 'transparent',
                    borderLeft: isActive ? `2px solid ${section.color}` : '2px solid transparent',
                    transition: 'background-color 0.15s, border-color 0.15s, color 0.15s',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ flexShrink: 0, marginTop: 1 }}>
                      {complete ? (
                        <CheckCircle size={13} color={section.color} fill={section.color} />
                      ) : (
                        <div style={{
                          width: 13, height: 13, borderRadius: '50%',
                          border: `1px solid ${isActive ? section.color : '#30363d'}`,
                          background: isActive ? `${section.color}22` : 'transparent'
                        }} />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 12, color: isActive ? '#e6edf3' : '#aab3bd',
                        fontWeight: isActive ? 600 : 400,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {lesson.title}
                      </div>
                      <div style={{ fontSize: 10, color: '#8b949e', marginTop: 1 }}>
                        +{lesson.xp} XP · {lesson.type}
                      </div>
                    </div>
                    {isActive && <ChevronRight size={12} color={section.color} style={{ flexShrink: 0, marginTop: 2 }} />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        );
      })}

      {/* Bottom padding */}
      <div style={{ height: 40 }} />
    </div>
  );
}

