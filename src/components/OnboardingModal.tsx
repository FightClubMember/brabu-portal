import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import type { Stream } from '../../context/UserContext';
import { GraduationCap, ArrowRight } from 'lucide-react';

const SUBJECT_OPTIONS = {
  science: ['Physics', 'Chemistry', 'Botany', 'Zoology', 'Mathematics'],
  arts: ['Hindi', 'English', 'Urdu', 'Sanskrit', 'Maithili', 'Bengali', 'Persian', 'Bhojpuri'],
  commerce: ['Accountancy', 'Accounting & Finance']
};

export const OnboardingModal = () => {
  const { setBranch } = useTheme();
  const { setUser, isAuthenticated } = useUser();
  const [isOpen, setIsOpen] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    stream: 'science' as Stream,
    semester: '1',
    mjcSubject: 'Physics' // Default
  });

  // Update default subject when stream changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      mjcSubject: SUBJECT_OPTIONS[prev.stream][0]
    }));
  }, [formData.stream]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBranch(formData.stream);
    setUser(formData);
    setIsOpen(false);
  };

  if (isAuthenticated || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <div className={`absolute inset-0 bg-gradient-to-br from-${formData.stream === 'science' ? 'cyan' : formData.stream === 'arts' ? 'amber' : 'emerald'}-500/10 via-transparent to-transparent pointer-events-none transition-colors duration-500`} />
        
        <div className="relative z-10 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-inner">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Setup Your Profile</h2>
            <p className="text-white/50 text-sm">Personalize your BRABU academic dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              {/* Personal Details */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Personal Info</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  placeholder="Full Name"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all"
                    placeholder="Email Address"
                  />
                  <input 
                    required
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all"
                    placeholder="Mobile No."
                  />
                </div>
              </div>

              {/* Academic Details */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Academic Stream</label>
                
                {/* Stream Switcher */}
                <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 rounded-xl">
                  {(['science', 'arts', 'commerce'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({...formData, stream: s})}
                      className={`relative py-2.5 rounded-lg text-sm font-medium transition-all overflow-hidden ${
                        formData.stream === s 
                          ? 'text-white shadow-lg' 
                          : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {formData.stream === s && (
                        <motion.div 
                          layoutId="activeStream"
                          className={`absolute inset-0 ${
                            s === 'science' ? 'bg-cyan-600' : s === 'arts' ? 'bg-amber-600' : 'bg-emerald-600'
                          }`} 
                        />
                      )}
                      <span className="relative z-10">{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                    </button>
                  ))}
                </div>

                {/* Subject & Semester */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-medium text-white/50 ml-1">MJC Subject</label>
                    <div className="relative">
                      <select 
                        value={formData.mjcSubject}
                        onChange={(e) => setFormData({...formData, mjcSubject: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 appearance-none cursor-pointer"
                      >
                        {SUBJECT_OPTIONS[formData.stream].map(sub => (
                          <option key={sub} value={sub} className="bg-[#111]">{sub}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <ArrowRight className="w-3 h-3 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-medium text-white/50 ml-1">Semester</label>
                    <div className="relative">
                      <select 
                        value={formData.semester}
                        onChange={(e) => setFormData({...formData, semester: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                          <option key={sem} value={sem} className="bg-[#111]">Semester {sem}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <ArrowRight className="w-3 h-3 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className={`w-full py-4 mt-2 font-bold rounded-xl text-white shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                formData.stream === 'science' ? 'bg-cyan-600 hover:bg-cyan-500' : 
                formData.stream === 'arts' ? 'bg-amber-600 hover:bg-amber-500' : 
                'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              Enter Dashboard <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

