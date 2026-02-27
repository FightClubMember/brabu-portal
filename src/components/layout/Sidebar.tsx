import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calculator, 
  Calendar, 
  GraduationCap, 
  Home, 
  Library, 
  Sigma,
  Info
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

import { useUser } from '../../context/UserContext';

const navItems = [
  { title: 'Dashboard', href: '/', icon: Home },
  { title: 'Syllabus', href: '/syllabus', icon: BookOpen },
  { title: 'CGPA Calc', href: '/calculator', icon: Calculator },
  { title: 'Attendance', href: '/attendance', icon: Calendar },
  { title: 'Resources', href: '/resources', icon: Library },
  { title: 'Math Suite', href: '/math', icon: Sigma },
  { title: 'About', href: '/about', icon: Info },
];

export const Sidebar = () => {
  const { branch, setBranch, accentColor } = useTheme();
  const { user } = useUser();
  const location = useLocation();

  const activeColorClass = {
    science: 'text-cyan-400 border-cyan-400 bg-cyan-400/10',
    arts: 'text-amber-400 border-amber-400 bg-amber-400/10',
    commerce: 'text-emerald-400 border-emerald-400 bg-emerald-400/10',
  };

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col fixed left-0 top-0 z-50"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg bg-${accentColor}-500/20`}>
            <GraduationCap className={`w-6 h-6 text-${accentColor}-400`} />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight text-lg">BRABU Portal</h1>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">{user?.stream || 'FYUGP'} System</p>
          </div>
        </div>

        {/* Branch Switcher */}
        <div className="flex p-1 bg-white/5 rounded-lg">
          {(['science', 'arts', 'commerce'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBranch(b)}
              className={cn(
                "flex-1 text-[10px] font-medium py-1.5 rounded-md transition-all uppercase",
                branch === b 
                  ? `bg-${activeColorClass[b].split(' ')[0].replace('text-', 'bg-').replace('-400', '-500')} text-white shadow-lg` 
                  : "text-white/40 hover:text-white/70"
              )}
            >
              {b.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative overflow-hidden",
                isActive 
                  ? activeColorClass[branch]
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "" : "opacity-70")} />
              <span>{item.title}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-${accentColor}-400`}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="text-xs text-white/40 text-center">
          <p>Founded by</p>
          <p className="font-medium text-white/80 mt-0.5">Himanshu Kumar</p>
          <p className="text-[10px] opacity-60">RDS College</p>
        </div>
      </div>
    </motion.div>
  );
};
