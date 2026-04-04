import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCw, CheckCircle, Terminal } from 'lucide-react';

export default function CodeRunner({ code: initialCode, onSuccess, showChallenge, challenge }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(null);
  const [challengePassed, setChallengePassed] = useState(false);
  const runCode = useCallback(async () => {
    setRunning(true);
    setError(null);
    const logs = [];

    // Safe console capture
    const fakeConsole = {
      log: (...args) => logs.push({ type: 'log', text: args.map(a => {
        try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
        catch { return '[Circular]'; }
      }).join(' ') }),
      error: (...args) => logs.push({ type: 'error', text: args.join(' ') }),
      warn: (...args) => logs.push({ type: 'warn', text: args.join(' ') }),
      time: (label) => logs.push({ type: 'time', text: `⏱ ${label} started` }),
      timeEnd: (label) => logs.push({ type: 'time', text: `⏱ ${label} ended` }),
      table: (data) => logs.push({ type: 'table', text: JSON.stringify(data, null, 2) }),
    };

    try {
      // Wrap in async function to allow await
      // eslint-disable-next-line no-new-func
      const fn = new Function('console', `
        "use strict";
        return (async function() {
          ${code}
        })();
      `);
      await fn(fakeConsole);
    } catch (e) {
      setError(e.message);
      logs.push({ type: 'error', text: `❌ ${e.message}` });
    }

    setOutput(logs);
    setRunning(false);

    // Check challenge
    if (showChallenge && challenge) {
      const allPassed = challenge.tests.every(t => {
        try { return t.check(code); }
        catch { return false; }
      });
      if (allPassed) setChallengePassed(true);
      if (allPassed && onSuccess) onSuccess();
    }
  }, [code, challenge, showChallenge, onSuccess]);

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
    setChallengePassed(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      {/* Editor toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', background: '#161b22', borderBottom: '1px solid #30363d',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8b949e', fontSize: 12 }}>
          <Terminal size={12} />
          <span>script.js</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={resetCode}
            style={{
              background: 'transparent', border: '1px solid #30363d',
              color: '#8b949e', padding: '4px 10px', borderRadius: 4,
              fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer'
            }}>
            <RefreshCw size={11} /> Reset
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#00cc6e' }}
            whileTap={{ scale: 0.95 }}
            onClick={runCode}
            disabled={running}
            style={{
              background: '#00ff88', border: 'none',
              color: '#080b0f', padding: '4px 14px', borderRadius: 4,
              fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center',
              gap: 4, cursor: 'pointer', fontFamily: 'var(--font-sans)'
            }}>
            <Play size={11} fill="currentColor" />
            {running ? 'Running...' : 'Run ▶'}
          </motion.button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          spellCheck={false}
          style={{
            width: '100%', height: '100%', resize: 'none',
            background: '#0d1117', color: '#e6edf3',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
            lineHeight: 1.6, padding: '12px 16px', border: 'none',
            outline: 'none', tabSize: 2,
          }}
        />
      </div>

      {/* Output */}
      <div style={{
        minHeight: 100, maxHeight: 180, overflowY: 'auto',
        background: '#080b0f', borderTop: '1px solid #30363d',
        padding: '10px 14px', flexShrink: 0
      }}>
        <div style={{ fontSize: 11, color: '#6e7681', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Terminal size={10} /> OUTPUT
        </div>
        {output.length === 0 && !error ? (
          <div style={{ color: '#6e7681', fontSize: 12 }}>Click Run ▶ to execute your code</div>
        ) : (
          output.map((line, i) => (
            <div key={i} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.5,
              color: line.type === 'error' ? '#ff4757' : line.type === 'warn' ? '#f0c929' : '#e6edf3',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word'
            }}>
              {line.type !== 'log' && line.type !== 'table' && line.type !== 'time' && 
                <span style={{ color: '#6e7681' }}>[{line.type}] </span>}
              {line.text}
            </div>
          ))
        )}
      </div>

      {/* Challenge status */}
      {showChallenge && challenge && (
        <div style={{
          padding: '10px 14px', background: '#0d1117',
          borderTop: '1px solid #30363d', flexShrink: 0
        }}>
          <div style={{ fontSize: 12, color: '#8b949e', marginBottom: 6 }}>
            🎯 CHALLENGE
          </div>
          <div style={{ fontSize: 12, color: '#e6edf3', marginBottom: 8 }}>{challenge.prompt}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {challenge.tests.map((test, i) => {
              let passed = false;
              try { passed = test.check(code); } catch {}
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                  <span style={{ color: passed ? '#00ff88' : '#30363d' }}>
                    {passed ? '✅' : '○'}
                  </span>
                  <span style={{ color: passed ? '#00ff88' : '#6e7681' }}>{test.msg}</span>
                </div>
              );
            })}
          </div>
          <AnimatePresence>
            {challengePassed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: 10, padding: '8px 12px', background: 'rgba(0,255,136,0.1)',
                  border: '1px solid #00ff88', borderRadius: 6,
                  color: '#00ff88', fontSize: 12, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                <CheckCircle size={14} /> Challenge Complete! Great work! 🎉
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
