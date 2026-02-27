import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

interface SearchResult {
  id: string;
  title: string;
  type: 'syllabus' | 'resource' | 'tool';
  path: string;
}

export const GlobalSearch = () => {
  // Use a fallback color if accentColor is undefined
  const { accentColor = 'blue' } = useTheme(); 
  const { user } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mapping colors for Tailwind (Fixes the dynamic class bug)
  const colorMap: Record<string, string> = {
    blue: 'text-blue-400 bg-blue-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
  };

  const currentColorClass = colorMap[accentColor] || colorMap.blue;

  const searchData: SearchResult[] = [
    { id: '1', title: `${user?.mjcSubject || 'MJC'} Syllabus`, type: 'syllabus', path: '/syllabus' },
    { id: '2', title: 'CGPA Calculator', type: 'tool', path: '/calculator' },
    { id: '3', title: 'Attendance Tracker', type: 'tool', path: '/attendance' },
    { id: '4', title: 'Physics Notes Unit 1', type: 'resource', path: '/resources' },
    { id: '5', title: 'Chemistry Lab Manual', type: 'resource', path: '/resources' },
    { id: '6', title: 'History Timeline', type: 'resource', path: '/resources' },
    { id: '7', title: 'Accountancy Basics', type: 'resource', path: '/resources' },
  ];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    
    if (query.trim()) {
      const filtered = searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }

    return () => window.removeEventListener('keydown', handleEsc);
  }, [query]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-colors relative z-50"
        aria-label="Open Search"
      >
        <Search className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4 border-b border-white/10">
                <Search className="w-5 h-5 text-white/40" />
                <input 
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search syllabus, tools, or resources..."
                  className="flex-1 bg-transparent text-lg text-white placeholder:text-white/30 focus:outline-none"
                />
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          navigate(result.path);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${currentColorClass}`}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-white/90">{result.title}</p>
                            <p className="text-xs text-white/40 capitalize">{result.type}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50" />
                      </button>
                    ))}
                  </div>
                ) : query ? (
                  <div className="p-8 text-center text-white/30 text-sm">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="p-8 text-center text-white/30 text-sm">
                    Type to start searching...
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t border-white/10 bg-white/5 text-[10px] text-white/30 flex justify-between">
                <span>Press ESC to close</span>
                <span>RDS Scholar Search • Himanshu Kumar</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
