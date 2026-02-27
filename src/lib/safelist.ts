// This file ensures Tailwind generates classes that are constructed dynamically in the code
// Colors: cyan (Science), amber (Arts), emerald (Commerce)

export const safelist = [
  // Text colors
  'text-cyan-200', 'text-cyan-300', 'text-cyan-400', 'text-cyan-500', 'text-cyan-600',
  'text-amber-200', 'text-amber-300', 'text-amber-400', 'text-amber-500', 'text-amber-600',
  'text-emerald-200', 'text-emerald-300', 'text-emerald-400', 'text-emerald-500', 'text-emerald-600',

  // Background colors
  'bg-cyan-400', 'bg-cyan-500', 'bg-cyan-600', 'bg-cyan-900',
  'bg-amber-400', 'bg-amber-500', 'bg-amber-600', 'bg-amber-900',
  'bg-emerald-400', 'bg-emerald-500', 'bg-emerald-600', 'bg-emerald-900',

  // Border colors
  'border-cyan-400', 'border-cyan-500', 'border-cyan-600',
  'border-amber-400', 'border-amber-500', 'border-amber-600',
  'border-emerald-400', 'border-emerald-500', 'border-emerald-600',

  // Background with opacity (arbitrary values often used)
  'bg-cyan-500/10', 'bg-cyan-500/20', 'bg-cyan-500/30', 'bg-cyan-500/50', 'bg-cyan-600/20', 'bg-cyan-600/30',
  'bg-amber-500/10', 'bg-amber-500/20', 'bg-amber-500/30', 'bg-amber-500/50', 'bg-amber-600/20', 'bg-amber-600/30',
  'bg-emerald-500/10', 'bg-emerald-500/20', 'bg-emerald-500/30', 'bg-emerald-500/50', 'bg-emerald-600/20', 'bg-emerald-600/30',

  // Border with opacity
  'border-cyan-500/20', 'border-cyan-500/30', 'border-cyan-500/50',
  'border-amber-500/20', 'border-amber-500/30', 'border-amber-500/50',
  'border-emerald-500/20', 'border-emerald-500/30', 'border-emerald-500/50',

  // Shadows
  'shadow-cyan-500/20', 'shadow-cyan-500/50',
  'shadow-amber-500/20', 'shadow-amber-500/50',
  'shadow-emerald-500/20', 'shadow-emerald-500/50',
  
  // Accents for inputs/ranges
  'accent-cyan-500',
  'accent-amber-500',
  'accent-emerald-500',
];
