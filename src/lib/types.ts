import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface Subject {
  code: string;
  name: string;
  credits: number;
  type: 'MJC' | 'MIC' | 'MDC' | 'AEC' | 'SEC' | 'VAC';
}

export interface SemesterData {
  id: number;
  name: string;
  subjects: Subject[];
}
