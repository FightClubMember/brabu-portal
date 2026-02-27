import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { ArrowRight, BookOpen, Calculator, Calendar, Download, FileText, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { branch, accentColor, campusImage } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="relative rounded-3xl overflow-hidden h-64 border border-white/10 group">
        <img 
          src={campusImage} 
          alt="Campus" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="relative z-10 p-8 h-full flex flex-col justify-center max-w-2xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${accentColor}-500/20 border border-${accentColor}-500/30 w-fit mb-4`}>
            <Sparkles className={`w-3 h-3 text-${accentColor}-400`} />
            <span className={`text-xs font-medium text-${accentColor}-300 uppercase tracking-wider`}>
              Welcome Back, {user ? user.name.split(' ')[0] : 'Student'}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Academic <span className={`text-${accentColor}-400`}>Command Center</span>
          </h1>
          <p className="text-white/80 mb-6 max-w-lg font-medium shadow-black drop-shadow-md">
            Access your {branch.charAt(0).toUpperCase() + branch.slice(1)} ({user?.mjcSubject || 'Core'}) syllabus, calculate CGPA, and track your progress across all 8 semesters.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/syllabus')}
              className={`px-6 py-2.5 bg-${accentColor}-600 hover:bg-${accentColor}-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2`}
            >
              View Syllabus <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/calculator')}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors backdrop-blur-md"
            >
              CGPA Tool
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Current Semester', value: `Sem ${user?.semester || 1}`, icon: BookOpen, sub: '2023-27 Batch' },
          { title: 'Attendance', value: '82%', icon: Calendar, sub: 'Above 75% Threshold' },
          { title: 'Last SGPA', value: '8.4', icon: Calculator, sub: 'Excellent Progress' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={item}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07] group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${accentColor}-500/10 group-hover:bg-${accentColor}-500/20 transition-colors`}>
                <stat.icon className={`w-6 h-6 text-${accentColor}-400`} />
              </div>
              <span className="text-xs font-medium text-white/40 bg-white/5 px-2 py-1 rounded-full">{stat.sub}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-white/50">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Resources */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-white/60" />
            Recent Materials ({user?.mjcSubject || 'General'})
          </h3>
          <div className="space-y-3">
            {[
              { name: `${user?.mjcSubject || 'MJC'} Unit 1 Notes`, type: 'PDF', size: '2.4 MB' },
              { name: `${user?.mjcSubject || 'MJC'} Previous Year Qs`, type: 'PDF', size: '4.1 MB' },
              { name: `VAC-1 Environmental Science`, type: 'PDF', size: '1.8 MB' },
            ].map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs">
                    {file.type}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-white/90">{file.name}</p>
                    <p className="text-xs text-white/40">{file.size}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
             <img 
               src="/images/student-study.jpg" 
               alt="Study" 
               className="absolute inset-0 w-full h-full object-cover opacity-20"
             />
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Exam Preparation</h3>
                  <p className="text-sm text-white/60">Mid-semester exams start in 14 days. Check out the bilingual cheat sheets.</p>
                </div>
                <button 
                  onClick={() => navigate('/study')}
                  className={`mt-6 w-full py-3 bg-${accentColor}-600/20 hover:bg-${accentColor}-600/30 border border-${accentColor}-500/30 text-${accentColor}-200 font-medium rounded-xl transition-all backdrop-blur-md flex items-center justify-center gap-2`}
                >
                  <Sparkles className="w-4 h-4" /> Enter Zen Mode
                </button>
             </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
