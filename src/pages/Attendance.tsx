import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Plus, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Assessment {
  id: string;
  subject: string;
  type: 'Assignment' | 'Project' | 'Presentation';
  dueDate: string;
  completed: boolean;
}

export const AttendancePage = () => {
  const { accentColor } = useTheme();
  
  // Attendance State
  const [totalClasses, setTotalClasses] = useState(60);
  const [attendedClasses, setAttendedClasses] = useState(48);
  
  // Assessments State
  const [assessments, setAssessments] = useState<Assessment[]>([
    { id: '1', subject: 'MJC-1', type: 'Assignment', dueDate: '2024-05-15', completed: false },
    { id: '2', subject: 'SEC-1', type: 'Project', dueDate: '2024-05-20', completed: true },
  ]);

  const percentage = Math.round((attendedClasses / totalClasses) * 100) || 0;
  const isSafe = percentage >= 75;

  // Persist to LocalStorage (Effect simulation)
  useEffect(() => {
    const saved = localStorage.getItem('attendance-data');
    if (saved) {
      const data = JSON.parse(saved);
      setTotalClasses(data.total);
      setAttendedClasses(data.attended);
    }
  }, []);

  const updateAttendance = (attended: number, total: number) => {
    setAttendedClasses(attended);
    setTotalClasses(total);
    localStorage.setItem('attendance-data', JSON.stringify({ attended, total }));
  };

  const toggleAssessment = (id: string) => {
    setAssessments(assessments.map(a => 
      a.id === id ? { ...a, completed: !a.completed } : a
    ));
  };

  const deleteAssessment = (id: string) => {
    setAssessments(assessments.filter(a => a.id !== id));
  };

  const addAssessment = () => {
    const newAssessment: Assessment = {
      id: Date.now().toString(),
      subject: 'New Subject',
      type: 'Assignment',
      dueDate: new Date().toISOString().split('T')[0],
      completed: false
    };
    setAssessments([...assessments, newAssessment]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Personal Dashboard</h1>
          <p className="text-white/50">Track your 75% attendance criteria and internal deadlines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Attendance Tracker */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className={`w-5 h-5 text-${accentColor}-400`} />
            Attendance Tracker
          </h2>

          <div className="flex items-center justify-center mb-8 relative">
            {/* Circular Progress (Simplified with SVG) */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#333" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke={isSafe ? (accentColor === 'cyan' ? '#06b6d4' : accentColor === 'amber' ? '#f59e0b' : '#10b981') : '#ef4444'} 
                  strokeWidth="8" 
                  strokeDasharray={`${percentage * 2.83} 283`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{percentage}%</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-2 ${isSafe ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isSafe ? 'Safe Zone' : 'Critical Low'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/60">
                <span>Attended Classes</span>
                <span className="text-white">{attendedClasses}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max={totalClasses} 
                value={attendedClasses}
                onChange={(e) => updateAttendance(Number(e.target.value), totalClasses)}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10 accent-${accentColor}-500`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/60">
                <span>Total Classes Conducted</span>
                <span className="text-white">{totalClasses}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="120" 
                value={totalClasses}
                onChange={(e) => updateAttendance(attendedClasses, Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10 accent-${accentColor}-500`}
              />
            </div>

            {!isSafe && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-sm text-red-200">
                  <p className="font-bold mb-1">Warning: Low Attendance</p>
                  <p className="opacity-80">You need to attend <strong>{Math.ceil((0.75 * totalClasses - attendedClasses) / 0.25)}</strong> more consecutive classes to reach 75%.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Internal Assessments */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertCircle className={`w-5 h-5 text-${accentColor}-400`} />
              Deadlines
            </h2>
            <button 
              onClick={addAssessment}
              className={`p-2 rounded-lg bg-${accentColor}-500/10 text-${accentColor}-400 hover:bg-${accentColor}-500 hover:text-white transition-colors`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {assessments.length === 0 ? (
              <div className="text-center py-10 text-white/30 text-sm">No pending assignments.</div>
            ) : (
              assessments.map((assessment) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={assessment.id}
                  className={`p-4 rounded-xl border transition-all group ${
                    assessment.completed 
                      ? 'bg-green-500/5 border-green-500/20 opacity-60' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => toggleAssessment(assessment.id)}
                      className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        assessment.completed 
                          ? 'bg-green-500 border-green-500 text-black' 
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      {assessment.completed && <Check className="w-3 h-3" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${assessment.completed ? 'line-through text-white/50' : 'text-white'}`}>
                          {assessment.subject}
                        </h3>
                        <button 
                          onClick={() => deleteAssessment(assessment.id)}
                          className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/50">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                          {assessment.type}
                        </span>
                        <span>Due: {assessment.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for check icon
const Check = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
