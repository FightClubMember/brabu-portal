import { motion } from 'framer-motion';
import { X, Moon, Bell, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
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
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">Appearance</h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white">Dark Mode</span>
              </div>
              <div className={`w-10 h-6 rounded-full bg-${accentColor}-600 relative`}>
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">Notifications</h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white">Push Notifications</span>
              </div>
              <div className={`w-10 h-6 rounded-full bg-white/10 relative`}>
                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white/50" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">Privacy</h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white">Public Profile</span>
              </div>
              <div className={`w-10 h-6 rounded-full bg-${accentColor}-600 relative`}>
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
