import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
// Fixed: Removed unused 'Search' to pass Vercel build
import { Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { ProfileModal } from '../profile/ProfileModal';
import { SettingsModal } from '../profile/SettingsModal';
import { AdminModal } from '../admin/AdminModal';
import { GlobalSearch } from '../search/GlobalSearch';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accentColor = 'blue' } = useTheme();
  const { user, logout } = useUser();
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [ticker, setTicker] = useState("📢 Exam Form Date Extended for Semester 1 (2023-27) | New Syllabus Updated for MJC-2");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Map for dynamic colors to fix Tailwind build issue
  const dotColorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    cyan: 'bg-cyan-500'
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 overflow-hidden font-sans">
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`
        }}
      />
      
      <Sidebar />
      
      <div className="pl-64 flex flex-col min-h-screen relative z-10">
        <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4 flex-1 mr-8">
             <div className="hidden md:block">
               <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Welcome Back</p>
               <h2 className="text-sm font-bold text-white tracking-tight">{user?.name || 'Student'}</h2>
             </div>
             
             <div className="flex-1 overflow-hidden relative group h-6 flex items-center border-l border-white/10 pl-4 ml-4">
               <motion.div 
                 animate={{ x: ["100%", "-100%"] }}
                 transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                 className="whitespace-nowrap text-xs text-white/50 font-medium"
               >
                 {ticker}
               </motion.div>
             </div>
           </div>

           <div className="flex items-center gap-4">
             <GlobalSearch />
             
             <div className="relative">
               <button 
                 onClick={() => setIsNotifOpen(!isNotifOpen)}
                 className={`p-2 rounded-full transition-all duration-300 relative ${isNotifOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
               >
                 <Bell className="w-5 h-5" />
                 {/* Fixed dynamic color dot */}
                 <span className={`absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-[#0a0a0a] ${dotColorMap[accentColor] || 'bg-blue-500'}`} />
               </button>
               
               <AnimatePresence>
                 {isNotifOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute right-0 mt-3 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                   >
                     <div className="p-4 border-b border-white/10 font-bold text-xs uppercase tracking-widest text-white/40">Notifications</div>
                     <div className="max-h-64 overflow-y-auto">
                       <div className="p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 group transition-colors">
                         <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">Exam Form Date Extended</p>
                         <p className="text-xs text-white/40 mt-1">Last date for submission is now 25th May 2024.</p>
                       </div>
                       <div className="p-4 hover:bg-white/5 cursor-pointer group transition-colors">
                         <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">New Syllabus Added</p>
                         <p className="text-xs text-white/40 mt-1">MJC-2 syllabus updated for all Science streams.</p>
                       </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>

             <div className="relative">
               <button 
                 onClick={() => setIsProfileOpen(!isProfileOpen)}
                 className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
               >
                 <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-[11px] font-black border border-white/10 shadow-inner">
                   {user ? user.name.charAt(0).toUpperCase() : 'G'}
                 </div>
                 <span className="text-xs font-bold text-white/80 max-w-[80px] truncate">
                   {user ? user.name.split(' ')[0] : 'Guest'}
                 </span>
                 <ChevronDown className={`w-3 h-3 text-white/30 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
               </button>

               <AnimatePresence>
                 {isProfileOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute right-0 mt-3 w-60 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                   >
                     <div className="p-4 border-b border-white/10 bg-white/[0.02]">
                       <p className="font-black text-white text-sm">{user?.name || 'Guest User'}</p>
                       <p className="text-[10px] text-white/40 truncate mt-0.5">{user?.email || 'Login to sync data'}</p>
                     </div>
                     <div className="p-2">
                       <button onClick={() => { setShowProfileModal(true); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all">
                         <User className="w-4 h-4" /> My Profile
                       </button>
                       <button onClick={() => { setShowSettingsModal(true); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all">
                         <Settings className="w-4 h-4" /> Settings
                       </button>
                       <div className="h-px bg-white/10 my-2 mx-2" />
                       <button 
                         onClick={() => { logout(); setIsProfileOpen(false); window.location.reload(); }}
                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all"
                       >
                         <LogOut className="w-4 h-4" /> Sign Out
                       </button>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
           </div>
        </header>

        <main className="flex-1 p-8 overflow-x-hidden relative">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>

        <footer className="h-14 border-t border-white/10 flex items-center justify-between px-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <div className="flex items-center gap-2">
            <span>© 2024 BRABU FYUGP</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="text-white/40">Founded by Himanshu Kumar (RDS College)</span>
          </div>
          <div className="flex items-center gap-6">
             <a href="tel:9625152210" className="hover:text-white/50 transition-colors">Helpline: 9625152210</a>
             <div 
               className="w-6 h-6 cursor-pointer hover:bg-white/5 rounded-full transition-all flex items-center justify-center group border border-transparent hover:border-white/10" 
               onClick={() => setAdminModalOpen(true)}
             >
               <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0)] group-hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all" />
             </div>
          </div>
        </footer>
      </div>

      <AdminModal isOpen={isAdminModalOpen} onClose={() => setAdminModalOpen(false)} updateTicker={setTicker} />
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
    </div>
  );
};
