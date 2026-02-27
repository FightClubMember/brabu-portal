import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { ProfileModal } from '../profile/ProfileModal';
import { SettingsModal } from '../profile/SettingsModal';
import { AdminModal } from '../admin/AdminModal';
import { GlobalSearch } from '../search/GlobalSearch';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accentColor } = useTheme();
  const { user, logout } = useUser();
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [ticker, setTicker] = useState("📢 Exam Form Date Extended for Semester 1 (2023-27) | New Syllabus Updated for MJC-2");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 overflow-hidden">
      {/* Dynamic Spotlight Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`
        }}
      />
      
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${accentColor === 'cyan' ? '#06b6d4' : accentColor === 'amber' ? '#f59e0b' : '#10b981'}20 0%, transparent 50%)`
        }}
      />
      
      <Sidebar />
      
      <div className="pl-64 flex flex-col min-h-screen relative z-10">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
           {/* Greeting - Left Aligned */}
           <div className="flex items-center gap-4 flex-1 mr-8">
             <div className="hidden md:block">
               <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Welcome Back</p>
               <h2 className="text-sm font-bold text-white">{user?.name || 'Student'}</h2>
             </div>
             
             {/* Marquee Ticker */}
             <div className="flex-1 overflow-hidden relative group h-6 flex items-center border-l border-white/10 pl-4 ml-4">
               <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0a]/0 to-transparent z-10" />
               <motion.div 
                 animate={{ x: ["100%", "-100%"] }}
                 transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                 className="whitespace-nowrap text-xs text-white/60"
               >
                 {ticker}
               </motion.div>
             </div>
           </div>

           <div className="flex items-center gap-4">
             <GlobalSearch />
             
             {/* Notifications */}
             <div className="relative">
               <button 
                 onClick={() => setIsNotifOpen(!isNotifOpen)}
                 className={`p-2 rounded-full transition-colors relative ${isNotifOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
               >
                 <Bell className="w-5 h-5" />
                 <span className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-${accentColor}-500`} />
               </button>
               
               <AnimatePresence>
                 {isNotifOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     className="absolute right-0 mt-2 w-80 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                   >
                     <div className="p-3 border-b border-white/10 font-medium text-sm">Notifications</div>
                     <div className="max-h-64 overflow-y-auto">
                       <div className="p-4 hover:bg-white/5 cursor-pointer border-b border-white/5">
                         <p className="text-sm font-medium text-white">Exam Form Date Extended</p>
                         <p className="text-xs text-white/50 mt-1">Last date is now 25th May 2024.</p>
                       </div>
                       <div className="p-4 hover:bg-white/5 cursor-pointer">
                         <p className="text-sm font-medium text-white">New Syllabus Added</p>
                         <p className="text-xs text-white/50 mt-1">MJC-2 syllabus updated for Science stream.</p>
                       </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>

             {/* Profile Dropdown */}
             <div className="relative">
               <button 
                 onClick={() => setIsProfileOpen(!isProfileOpen)}
                 className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
               >
                 <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-white/10 to-white/5 flex items-center justify-center text-[10px] font-bold">
                   {user ? user.name.charAt(0).toUpperCase() : <User className="w-3 h-3 text-white/70" />}
                 </div>
                 <span className="text-xs font-medium text-white/80 max-w-[80px] truncate">
                   {user ? user.name.split(' ')[0] : 'Guest'}
                 </span>
                 <ChevronDown className="w-3 h-3 text-white/50" />
               </button>

               <AnimatePresence>
                 {isProfileOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     className="absolute right-0 mt-2 w-56 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                   >
                     <div className="p-4 border-b border-white/10">
                       <p className="font-bold text-white">{user?.name || 'Guest User'}</p>
                       <p className="text-xs text-white/50 truncate">{user?.email || 'Sign in to access features'}</p>
                     </div>
                     <div className="p-2">
                       <button 
                         onClick={() => { setShowProfileModal(true); setIsProfileOpen(false); }}
                         className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                       >
                         <User className="w-4 h-4" /> My Profile
                       </button>
                       <button 
                         onClick={() => { setShowSettingsModal(true); setIsProfileOpen(false); }}
                         className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                       >
                         <Settings className="w-4 h-4" /> Settings
                       </button>
                       <div className="h-px bg-white/10 my-1" />
                       <button 
                         onClick={() => {
                           logout();
                           setIsProfileOpen(false);
                           window.location.reload(); // Force reload to show onboarding
                         }}
                         className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
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

        <main className="flex-1 p-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>

        {/* Footer with Secret Admin Trigger */}
        <footer className="h-12 border-t border-white/10 flex items-center justify-between px-8 text-xs text-white/30">
          <div>© 2024 BRABU FYUGP Portal. All rights reserved.</div>
          <div className="flex items-center gap-4">
             <a href="#" className="hover:text-white/60">Help Desk: 9625152210</a>
             {/* Secret Trigger - Bottom Right */}
             <div 
               className="w-5 h-5 cursor-pointer hover:bg-white/5 rounded-full transition-colors flex items-center justify-center group" 
               onClick={() => setAdminModalOpen(true)}
               title="Admin Access"
             >
               <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-red-500/50 transition-colors" />
             </div>
          </div>
        </footer>
      </div>

      <AdminModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setAdminModalOpen(false)} 
        updateTicker={setTicker}
      />
      
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
    </div>
  );
};

