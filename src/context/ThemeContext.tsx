import React, { createContext, useContext, useState, useEffect } from 'react';

type Branch = 'science' | 'arts' | 'commerce';

interface ThemeContextType {
  branch: Branch;
  setBranch: (branch: Branch) => void;
  accentColor: string;
  accentGlow: string;
  campusImage: string;
  setCampusImage: (url: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branch, setBranch] = useState<Branch>('science');
  const [campusImage, setCampusImageState] = useState<string>('/images/campus-hero-v2.png');

  useEffect(() => {
    const savedImage = localStorage.getItem('brabu-campus-image');
    if (savedImage) setCampusImageState(savedImage);
  }, []);

  const setCampusImage = (url: string) => {
    setCampusImageState(url);
    localStorage.setItem('brabu-campus-image', url);
  };

  const getAccentColor = (b: Branch) => {
    switch (b) {
      case 'science': return 'cyan'; 
      case 'arts': return 'amber';
      case 'commerce': return 'emerald';
      default: return 'cyan';
    }
  };

  const accentColor = getAccentColor(branch);
  const accentGlow = `shadow-${accentColor}-500/50`;

  return (
    <ThemeContext.Provider value={{ branch, setBranch, accentColor, accentGlow, campusImage, setCampusImage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
