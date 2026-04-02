import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRACKS = [
  { id: 'call-stack', label: 'Call Stack', color: '#00ff88' },
  { id: 'web-apis', label: 'Web APIs / Timers', color: '#00d4ff' },
  { id: 'microtasks', label: 'Microtask Queue', color: '#bf5af2' },
  { id: 'macrotasks', label: 'Macrotask Queue', color: '#ff6b35' },
  { id: 'output', label: 'Console Output', color: '#f0c929' },
];

const EVENT_LOOP_STEPS = [
  {
    title: "1. Sync Code Runs",
    description: "All synchronous code runs immediately on the Call Stack",
    items: [
      { track: 'call-stack', text: 'console.log("start")', note: '→ runs immediately' },
      { track: 'output', text: '"start"', note: 'logged' },
    ]
  },
  {
    title: "2. Async Tasks Get Registered",
    description: "setTimeout, fetch etc. are handed off to Web APIs",
    items: [
      { track: 'call-stack', text: 'setTimeout(fn, 0)', note: '→ handed to Web API' },
      { track: 'web-apis', text: 'Timer (0ms)', note: 'waiting...' },
      { track: 'call-stack', text: 'Promise.resolve()', note: '→ microtask queued' },
      { track: 'microtasks', text: '.then callback', note: 'queued' },
    ]
  },
  {
    title: "3. Microtasks Run First",
    description: "When call stack empties, ALL microtasks run before macrotasks",
    items: [
      { track: 'microtasks', text: 'Promise .then', note: '→ moves to call stack' },
      { track: 'call-stack', text: 'promise callback', note: 'runs!' },
      { track: 'output', text: '"promise"', note: 'logged 2nd' },
    ]
  },
  {
    title: "4. Macrotasks Run",
    description: "Finally, the setTimeout callback runs",
    items: [
      { track: 'macrotasks', text: 'setTimeout callback', note: '→ call stack' },
      { track: 'call-stack', text: 'timer callback', note: 'runs!' },
      { track: 'output', text: '"timeout"', note: 'logged 3rd (even with 0ms!)' },
    ]
  }
];

export default function AsyncTimeline({ code }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    setPlaying(true);
    setStep(0);
    for (let i = 0; i <= EVENT_LOOP_STEPS.length - 1; i++) {
      await new Promise(r => setTimeout(r, 1200));
      setStep(i);
    }
    setPlaying(false);
  };

  const current = EVENT_LOOP_STEPS[step];

  return (
    <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: '#6e7681', textTransform: 'uppercase', letterSpacing: 1 }}>
          <span style={{ color: '#ff6b35' }}>◉</span> EVENT LOOP VISUALIZER
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={play} disabled={playing}
          style={{
            background: '#ff6b35', border: 'none', color: '#fff',
            padding: '4px 12px', borderRadius: 4, fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace", cursor: 'pointer'
          }}>
          {playing ? '⏳ Playing...' : '▶ Animate'}
        </motion.button>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {EVENT_LOOP_STEPS.map((s, i) => (
          <motion.div
            key={i}
            onClick={() => setStep(i)}
            animate={{ background: i === step ? '#ff6b35' : i < step ? '#ff6b3566' : '#30363d' }}
            style={{ flex: 1, height: 3, borderRadius: 2, cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Current step info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          style={{ marginBottom: 14 }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: '#ff6b35', marginBottom: 4 }}>
            {current.title}
          </div>
          <div style={{ fontSize: 11, color: '#8b949e' }}>{current.description}</div>
        </motion.div>
      </AnimatePresence>

      {/* Tracks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {TRACKS.map(track => {
          const activeItems = current.items.filter(item => item.track === track.id);
          return (
            <div key={track.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{
                fontSize: 10, color: track.color, width: 120, flexShrink: 0,
                paddingTop: 6, textAlign: 'right',
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                {track.label}
              </div>
              <div style={{
                flex: 1, minHeight: 32, background: '#161b22',
                border: `1px solid ${activeItems.length > 0 ? track.color : '#21262d'}`,
                borderRadius: 4, padding: '4px 8px',
                display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center',
                transition: 'border-color 0.3s'
              }}>
                <AnimatePresence>
                  {activeItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.7, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      style={{
                        background: `${track.color}22`,
                        border: `1px solid ${track.color}66`,
                        borderRadius: 3, padding: '2px 6px',
                        fontSize: 10, color: track.color,
                        fontFamily: "'JetBrains Mono', monospace"
                      }}>
                      {item.text}
                      {item.note && <span style={{ color: '#6e7681', marginLeft: 4 }}>{item.note}</span>}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Code preview for context */}
      <div style={{ marginTop: 12, padding: 10, background: '#080b0f', borderRadius: 4 }}>
        <div style={{ fontSize: 10, color: '#6e7681', marginBottom: 6 }}>CLASSIC EVENT LOOP EXAMPLE:</div>
        <pre style={{ fontSize: 10, color: '#e6edf3', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6, margin: 0 }}>
{`console.log("start");       // sync
setTimeout(() => {
  console.log("timeout");   // macrotask
}, 0);
Promise.resolve().then(() => {
  console.log("promise");   // microtask
});
console.log("end");         // sync

// Output order: start → end → promise → timeout`}
        </pre>
      </div>
    </div>
  );
}
