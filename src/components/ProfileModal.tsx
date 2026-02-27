import { motion } from 'framer-motion';
import { X, Mail, Phone, BookOpen } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user } = useUser();
  const { accentColor } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="relative h-32 bg-white/5">
          <div className={`absolute inset-0 bg-gradient-to-r from-${accentColor}-500/20 to-transparent`} />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white/70 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <div className="w-24 h-24 rounded-full bg-[#111] p-1.5 inline-block">
              <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold text-white/50 border border-white/10">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">{user?.name || 'Guest User'}</h2>
          <p className="text-white/50 text-sm mb-6">{user?.stream?.toUpperCase()} Student • Semester {user?.semester}</p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-white/5 text-white/70">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-medium text-white">{user?.email || 'Not provided'}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-white/5 text-white/70">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">Major Subject (MJC)</p>
                <p className="text-sm font-medium text-white">{user?.mjcSubject || 'Not selected'}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-white/5 text-white/70">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">Mobile</p>
                <p className="text-sm font-medium text-white">{user?.mobile || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
