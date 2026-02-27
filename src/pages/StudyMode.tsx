import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, Brain, 
  ChevronRight, 
  Music, Volume2, 
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface StudyModeProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useNavigate } from 'react-router-dom';

export const StudyMode = ({ isOpen, onClose }: StudyModeProps) => {
  const { accentColor } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  // Use onClose to avoid unused variable warning if needed, or remove it from props if not used
  useEffect(() => {
    if (!isOpen) onClose();
  }, [isOpen, onClose]);

  // Use onClose to avoid unused variable warning if needed, or remove it from props if not used
  useEffect(() => {
    if (!isOpen) onClose();
  }, [isOpen, onClose]);
  const [isActive, setIsActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);

  // Dynamic Content based on User Subject
  const getSubjectContent = () => {
    const subject = user?.mjcSubject || 'General';
    return {
      title: `Unit 1: ${subject} Fundamentals`,
      text: `
        <h2>Introduction to ${subject}</h2>
        <p>This is a generated study module for <strong>${subject}</strong>. In the full version, this would contain specific chapters from the BRABU syllabus for Semester ${user?.semester || 1}.</p>
        
        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Concept A:</strong> Fundamental principle of ${subject}.</li>
          <li><strong>Concept B:</strong> Application in real-world scenarios.</li>
          <li><strong>Concept C:</strong> Advanced theory and derivation.</li>
        </ul>

        <h3>Sample Formula / Data</h3>
        <div class="math-block">E = mc^2 + \\int_{a}^{b} x^2 dx</div>
      `
    };
  };

  const content = getSubjectContent();

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
        // Trigger quiz every 15 mins (mock logic)
        // if (timeLeft % 900 === 0 && timeLeft !== 25 * 60) setShowQuiz(true);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play alarm sound
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Scroll Progress
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  // Render Math
  useEffect(() => {
    if (isOpen) {
      document.querySelectorAll('.math-block').forEach((el) => {
        katex.render(el.textContent || '', el as HTMLElement, { throwOnError: false });
      });
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] text-white overflow-hidden flex flex-col font-sans">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      <div className={`absolute inset-0 bg-gradient-to-b from-${accentColor}-900/10 to-black pointer-events-none`} />

      {/* Progress Bar */}
      <div className="h-1 w-full bg-white/5">
        <motion.div 
          className={`h-full bg-${accentColor}-500 shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-black/40 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-4 text-sm text-white/50">
          <span className="hover:text-white cursor-pointer">Sem 3</span>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-white cursor-pointer">MJC-3</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">Unit 2: Matrices</span>
        </div>

        <div className="flex items-center gap-6">
          {/* Audio Controls */}
          <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 pr-3">
            <button 
              onClick={() => setAudioPlaying(audioPlaying ? null : 'lofi')}
              className={`p-1.5 rounded-full ${audioPlaying ? `bg-${accentColor}-500 text-white` : 'text-white/50 hover:text-white'}`}
            >
              {audioPlaying ? <Volume2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
            </button>
            <span className="text-xs font-medium text-white/70">Lofi Beats</span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3">
            <div className={`text-2xl font-mono font-bold tracking-wider ${isActive ? `text-${accentColor}-400` : 'text-white/70'}`}>
              {formatTime(timeLeft)}
            </div>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`p-2 rounded-full border transition-all ${
                isActive 
                  ? `bg-${accentColor}-500/20 border-${accentColor}-500 text-${accentColor}-400` 
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="px-4 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-medium transition-colors"
          >
            End Session
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left: Content Reader */}
        <div 
          className="flex-1 overflow-y-auto p-12 custom-scrollbar"
          ref={contentRef}
          onScroll={handleScroll}
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-white/90">{content.title}</h1>
            <div 
              className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.text }} 
            />
            
            {/* Interactive Knowledge Check */}
            <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Brain className={`w-5 h-5 text-${accentColor}-400`} />
                Quick Check
              </h3>
              <p className="text-sm text-white/70 mb-4">What is the condition for matrix addition?</p>
              <div className="grid grid-cols-1 gap-2">
                {['Same number of rows only', 'Same number of columns only', 'Same dimensions', 'Square matrices only'].map((opt, i) => (
                  <button key={i} className="text-left px-4 py-3 rounded-lg bg-black/20 hover:bg-white/10 border border-white/5 transition-colors text-sm text-white/80">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tools & Scratchpad */}
        <div className="w-[400px] border-l border-white/10 bg-black/20 backdrop-blur-sm flex flex-col">
          <div className="flex border-b border-white/10">
            {['Notes', 'Tutor', 'Tools'].map((tab) => (
              <button key={tab} className="flex-1 py-3 text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex-1 p-6">
            <div className="h-full flex flex-col">
              <textarea 
                className="flex-1 bg-transparent resize-none focus:outline-none text-white/80 font-mono text-sm leading-relaxed placeholder:text-white/20"
                placeholder="// Digital Scratchpad&#10;Type notes, derivations, or quick thoughts here..."
              />
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Socratic Tutor</p>
                <div className="bg-white/5 rounded-xl p-3 mb-2">
                  <p className="text-xs text-white/70 italic">"How does the concept of dimensions relate to matrix addition?"</p>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ask a question..." 
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:border-white/30 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="h-8 border-t border-white/5 bg-black/60 flex items-center justify-center text-[10px] text-white/30 uppercase tracking-widest">
        "Keep pushing, RDSian! - Himanshu Kumar"
      </div>
    </div>
  );
};
