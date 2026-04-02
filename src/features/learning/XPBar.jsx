import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Flame } from 'lucide-react';
import { TOTAL_XP } from '../../content/curriculum';

export default function XPBar({ progress, onReset }) {
  const pct = Math.min(100, (progress.xp / TOTAL_XP) * 100);
  const level = Math.floor(progress.xp / 50) + 1;
  const xpToNext = (level * 50) - progress.xp;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
      padding: '10px 20px', background: '#0d1117',
      borderBottom: '1px solid #30363d',
    }}>
      {/* Logo */}
      <div style={{ 
        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16,
        color: '#00ff88', letterSpacing: -0.5, flexShrink: 0
      }}>
        JS<span style={{ color: '#00d4ff' }}>LAB</span>
        <span style={{ color: '#30363d', margin: '0 6px' }}>·</span>
        <span style={{ fontSize: 11, color: '#6e7681', fontWeight: 400 }}>INTERACTIVE</span>
      </div>

      {/* Level badge */}
      <div style={{
        background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)',
        borderRadius: 20, padding: '3px 10px',
        display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0
      }}>
        <Zap size={12} color="#00ff88" fill="#00ff88" />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#00ff88' }}>Lv.{level}</span>
      </div>

      {/* XP bar */}
      <div style={{ flex: 1, minWidth: 100 }}>
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', 
          fontSize: 10, color: '#6e7681', marginBottom: 3 
        }}>
          <span>{progress.xp} XP</span>
          <span>{xpToNext} to Lv.{level + 1}</span>
        </div>
        <div style={{ height: 4, background: '#21262d', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            style={{
              height: '100%', borderRadius: 2,
              background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
              boxShadow: '0 0 8px rgba(0,255,136,0.5)'
            }}
          />
        </div>
      </div>

      {/* Streak */}
      {progress.streak > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0
        }}>
          <Flame size={14} color="#ff6b35" />
          <span style={{ fontSize: 12, color: '#ff6b35', fontWeight: 600 }}>{progress.streak}d</span>
        </div>
      )}

      {/* Total progress */}
      <div style={{ fontSize: 11, color: '#6e7681', flexShrink: 0 }}>
        <span style={{ color: '#e6edf3' }}>{progress.completedLessons.length}</span> lessons done
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        style={{
          background: 'transparent', border: '1px solid #30363d',
          color: '#6e7681', padding: '3px 8px', borderRadius: 4,
          fontSize: 10, cursor: 'pointer', flexShrink: 0,
          fontFamily: "'JetBrains Mono', monospace"
        }}
        title="Reset all progress">
        Reset
      </button>
    </div>
  );
}
