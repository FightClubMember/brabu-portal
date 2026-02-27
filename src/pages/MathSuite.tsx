import { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useTheme } from '../context/ThemeContext';
import { Sigma, BarChart3 } from 'lucide-react';

export const MathSuite = () => {
  const { accentColor } = useTheme();
  const [expression, setExpression] = useState('\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}');
  const katexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (katexRef.current) {
      try {
        katex.render(expression, katexRef.current, {
          throwOnError: false,
          displayMode: true
        });
      } catch (e) {
        // Handle error gracefully
      }
    }
  }, [expression]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Math & Logic Suite</h1>
          <p className="text-white/50">High-performance tools for Science & Commerce students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* KaTeX Renderer */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg bg-${accentColor}-500/10 text-${accentColor}-400`}>
              <Sigma className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Live LaTeX Renderer</h2>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-black/30 rounded-xl p-8 flex items-center justify-center min-h-[160px] border border-white/5">
              <div ref={katexRef} className="text-2xl text-white" />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">LaTeX Input</label>
              <textarea
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-white/20 resize-none"
                placeholder="Enter LaTeX formula..."
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {['\\frac{a}{b}', '\\sqrt{x}', '\\sum_{i=1}^{n}', '\\int_{a}^{b}'].map((sym) => (
                <button
                  key={sym}
                  onClick={() => setExpression(prev => prev + ' ' + sym)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 font-mono text-xs transition-colors"
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desmos Embed Placeholder */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg bg-${accentColor}-500/10 text-${accentColor}-400`}>
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Graphing Visualizer</h2>
          </div>

          <div className="flex-1 bg-white rounded-xl overflow-hidden relative">
            {/* Using an iframe to simulate Desmos or similar tool */}
            <iframe 
              src="https://www.desmos.com/calculator?embed" 
              className="w-full h-full border-0"
              title="Desmos Graphing Calculator"
            />
            
            {/* Overlay for aesthetic consistency if needed, or just let it be */}
          </div>
        </div>
      </div>
    </div>
  );
};
