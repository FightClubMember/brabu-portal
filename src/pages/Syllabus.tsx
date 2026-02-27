import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { ChevronRight, Download, FileText, Search } from 'lucide-react';

const semesters = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, label: `Semester ${i + 1}` }));

export const SyllabusPage = () => {
  const { accentColor } = useTheme();
  const { user } = useUser();
  const [selectedSem, setSelectedSem] = useState(Number(user?.semester) || 1);
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = [
    { code: 'MJC-1', title: `${user?.mjcSubject || 'Major Core'} Course`, units: 5 },
    { code: 'MIC-1', title: 'Minor Course 1', units: 4 },
    { code: 'MDC-1', title: 'Multidisciplinary Course', units: 3 },
    { code: 'AEC-1', title: 'Ability Enhancement', units: 2 },
    { code: 'SEC-1', title: 'Skill Enhancement', units: 3 },
    { code: 'VAC-1', title: 'Value Added Course', units: 2 },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Syllabus & Resources</h1>
          <p className="text-white/50">Browse curriculum for all 4 years (FYUGP).</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input 
            type="text" 
            placeholder="Search topics..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/20"
          />
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Semester Nav */}
        <div className="w-48 flex flex-col gap-2 overflow-y-auto pr-2">
          {semesters.map((sem) => (
            <button
              key={sem.id}
              onClick={() => setSelectedSem(sem.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                selectedSem === sem.id 
                  ? `bg-${accentColor}-500 text-white shadow-lg shadow-${accentColor}-500/20` 
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-sm font-medium">{sem.label}</span>
              {selectedSem === sem.id && <ChevronRight className="w-4 h-4 opacity-50" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
            <h2 className="font-semibold text-white">Semester {selectedSem} Subjects</h2>
            <div className="flex gap-2">
               <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors">
                 Download All PDF
               </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence mode="popLayout">
              {subjects.map((sub, idx) => (
                <motion.div
                  key={sub.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative p-5 rounded-xl border border-white/5 bg-black/20 hover:bg-white/[0.02] hover:border-white/10 transition-all"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-${accentColor}-500/50 opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-${accentColor}-500/20 text-${accentColor}-300`}>
                          {sub.code}
                        </span>
                        <span className="text-xs text-white/40">{sub.units} Units</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{sub.title}</h3>
                      <div className="flex gap-4 text-xs text-white/50">
                        <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                          <FileText className="w-3 h-3" /> View Topics
                        </span>
                        <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                          <Download className="w-3 h-3" /> Syllabus PDF
                        </span>
                      </div>
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className={`p-2 rounded-lg bg-${accentColor}-500/10 text-${accentColor}-400 hover:bg-${accentColor}-500 hover:text-white transition-all`}>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
