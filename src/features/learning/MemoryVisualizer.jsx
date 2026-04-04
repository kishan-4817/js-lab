import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Safely evaluates code and extracts variable values
function extractVars(code) {
  const vars = {};
  try {
    // Extract let/const declarations and their values
    const lines = code.split('\n');
    for (const line of lines) {
      const match = line.match(/(?:let|const|var)\s+(\w+)\s*=\s*(.+?)(?:;|$)/);
      if (match) {
        const [, name, valueStr] = match;
        if (valueStr.startsWith('//') || valueStr.startsWith('/*')) continue;
        try {
          // Try to evaluate the value safely
          // eslint-disable-next-line no-new-func
          const val = new Function(`return (${valueStr.trim()})`)();
          vars[name] = val;
        } catch {
          vars[name] = valueStr.trim().replace(/['"]/g, '');
        }
      }
    }
  } catch {}
  return vars;
}

function getTypeColor(val) {
  if (val === null) return '#6e7681';
  if (val === undefined) return '#6e7681';
  switch (typeof val) {
    case 'string': return '#00ff88';
    case 'number': return '#00d4ff';
    case 'boolean': return '#bf5af2';
    case 'object': return '#ff6b35';
    default: return '#e6edf3';
  }
}

function getTypeLabel(val) {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (Array.isArray(val)) return 'array';
  return typeof val;
}

function formatValue(val) {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'object') return Array.isArray(val) 
    ? `[${val.slice(0,3).join(', ')}${val.length > 3 ? '...' : ''}]`
    : `{${Object.keys(val).slice(0,2).join(', ')}${Object.keys(val).length > 2 ? '...' : ''}}`;
  return String(val);
}

export default function MemoryVisualizer({ code }) {
  const [vars, setVars] = useState({});
  const [changedKeys, setChangedKeys] = useState(new Set());
  const prevVarsRef = useRef({});

  useEffect(() => {
    const newVars = extractVars(code);
    const prevVars = prevVarsRef.current;
    const changed = new Set();
    for (const key of Object.keys(newVars)) {
      if (JSON.stringify(newVars[key]) !== JSON.stringify(prevVars[key])) {
        changed.add(key);
      }
    }
    setChangedKeys(changed);
    prevVarsRef.current = newVars;
    setVars(newVars);
    const timer = setTimeout(() => setChangedKeys(new Set()), 1500);
    return () => clearTimeout(timer);
  }, [code]);

  const entries = Object.entries(vars);

  return (
    <div style={{
      background: '#0d1117', border: '1px solid #21262d',
      borderRadius: 8, padding: '12px',
    }}>
      <div style={{
        fontSize: 10, color: '#8b949e', marginBottom: 10,
        textTransform: 'uppercase', letterSpacing: 1,
        display: 'flex', alignItems: 'center', gap: 6
      }}>
        <span style={{ color: '#00ff88' }}>◉</span> MEMORY VISUALIZER
      </div>

      {entries.length === 0 ? (
        <div style={{ color: '#6e7681', fontSize: 12, textAlign: 'center', padding: '20px 0' }}>
          Declare variables to see them here
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
          <AnimatePresence>
            {entries.map(([key, val]) => {
              const color = getTypeColor(val);
              const isChanged = changedKeys.has(key);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, scale: 1,
                    boxShadow: isChanged ? `0 0 12px ${color}88` : 'none'
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{
                    background: '#11161d',
                    border: `1px solid ${isChanged ? color : '#21262d'}`,
                    borderRadius: 6, padding: '10px',
                    position: 'relative', overflow: 'hidden'
                  }}
                >
                  {/* Type badge */}
                  <div style={{
                    position: 'absolute', top: 4, right: 4,
                    background: `${color}18`, color, fontSize: 8,
                    padding: '1px 4px', borderRadius: 3,
                    textTransform: 'uppercase', fontFamily: 'var(--font-sans)'
                  }}>
                    {getTypeLabel(val)}
                  </div>

                  {/* Variable name */}
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11, color: '#8b949e', marginBottom: 4
                  }}>
                    {key}
                  </div>

                  {/* Value */}
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13, color, fontWeight: 600,
                    wordBreak: 'break-all'
                  }}>
                    {formatValue(val)}
                  </div>

                  {/* Memory address (fake) */}
                  <div style={{
                    fontSize: 9, color: '#6e7681', marginTop: 6,
                    fontFamily: 'var(--font-sans)'
                  }}>
                    0x{(Math.abs(key.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 65535).toString(16).padStart(4, '0')}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Call stack visual */}
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #21262d' }}>
        <div style={{ fontSize: 10, color: '#8b949e', marginBottom: 8 }}>CALL STACK</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['global scope'].map((frame, i) => (
            <div key={i} style={{
              background: '#11161d', border: '1px solid #21262d',
              borderRadius: 4, padding: '5px 10px',
              fontSize: 11, color: '#8b949e',
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              📦 {frame}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
