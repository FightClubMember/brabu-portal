import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const AboutPage = () => {
  const { accentColor } = useTheme();

  return (
    <div className="max-w-4xl mx-auto py-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-white mb-4">About The Project</h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          The BRABU FYUGP Student Portal is a comprehensive academic management system designed to simplify the 4-year undergraduate journey for students of Babasaheb Bhimrao Ambedkar Bihar University.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative group">
          <div className={`absolute inset-0 bg-${accentColor}-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity`} />
          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 border border-white/10 overflow-hidden">
                {/* Placeholder for Himanshu's photo */}
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/20">HK</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Himanshu Kumar</h3>
                <p className={`text-${accentColor}-400 text-sm font-medium`}>Lead Developer & Founder</p>
                <p className="text-white/40 text-xs">RDS College, Muzaffarpur</p>
              </div>
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              "I built this platform to solve the chaos of the new FYUGP system. Students needed a single place to track credits, find syllabus, and calculate SGPA without manual errors. This is my contribution to the BRABU student community."
            </p>

            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className={`w-5 h-5 text-${accentColor}-400`} />
              Campus Roots
            </h3>
            <p className="text-white/60 text-sm">
              Proudly developed at Ram Dayalu Singh College (RDS), Muzaffarpur. 
              Designed with inputs from faculty and student unions to ensure accuracy with BRABU regulations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Phone className={`w-5 h-5 text-${accentColor}-400`} />
              Student Support
            </h3>
            <p className="text-white/60 text-sm mb-2">
              Facing issues with the portal or found a syllabus error?
            </p>
            <a href="tel:9625152210" className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors border border-white/10">
              Helpline: 9625152210
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 text-center">
        <p className="text-white/30 text-xs">
          © 2024 BRABU Student Portal. Not officially affiliated with the University Administration.
          <br />Built for the students, by a student.
        </p>
      </div>
    </div>
  );
};
