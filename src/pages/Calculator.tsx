import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Plus, RotateCcw, Save } from 'lucide-react';

interface CourseInput {
  id: string;
  name: string;
  credit: number;
  internal: number;
  external: number;
}

export const CalculatorPage = () => {
  const { accentColor } = useTheme();
  
  const [courses, setCourses] = useState<CourseInput[]>([
    { id: '1', name: 'MJC-1', credit: 6, internal: 25, external: 60 },
    { id: '2', name: 'MIC-1', credit: 3, internal: 22, external: 55 },
    { id: '3', name: 'MDC-1', credit: 3, internal: 20, external: 50 },
    { id: '4', name: 'AEC-1', credit: 2, internal: 18, external: 45 },
    { id: '5', name: 'SEC-1', credit: 3, internal: 24, external: 58 },
    { id: '6', name: 'VAC-1', credit: 2, internal: 19, external: 48 },
  ]);

  const updateCourse = (id: string, field: keyof CourseInput, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach(course => {
      const totalMarks = Number(course.internal) + Number(course.external);
      let gradePoint = 0;
      
      // Basic BRABU Grading Logic (Approximate)
      if (totalMarks >= 91) gradePoint = 10;
      else if (totalMarks >= 81) gradePoint = 9;
      else if (totalMarks >= 71) gradePoint = 8;
      else if (totalMarks >= 61) gradePoint = 7;
      else if (totalMarks >= 51) gradePoint = 6;
      else if (totalMarks >= 45) gradePoint = 5;
      else gradePoint = 0; // Fail

      totalPoints += gradePoint * course.credit;
      totalCredits += course.credit;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">CBCS CGPA Calculator</h1>
          <p className="text-white/50">Calculate your Semester GPA based on BRABU credit weights.</p>
        </div>
        <div className={`text-4xl font-bold text-${accentColor}-400 bg-white/5 px-6 py-3 rounded-2xl border border-white/10`}>
          {calculateSGPA()} <span className="text-sm text-white/30 font-normal">SGPA</span>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-xs font-semibold text-white/60 uppercase tracking-wider">
          <div className="col-span-4">Subject Name</div>
          <div className="col-span-2 text-center">Credit</div>
          <div className="col-span-3 text-center">Internal (30)</div>
          <div className="col-span-3 text-center">External (70)</div>
        </div>

        <div className="divide-y divide-white/5">
          {courses.map((course) => (
            <motion.div 
              layout
              key={course.id} 
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors"
            >
              <div className="col-span-4">
                <input 
                  type="text" 
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  className="w-full bg-transparent text-white font-medium focus:outline-none border-b border-transparent focus:border-white/20 transition-colors"
                />
              </div>
              <div className="col-span-2">
                <input 
                  type="number" 
                  value={course.credit}
                  onChange={(e) => updateCourse(course.id, 'credit', Number(e.target.value))}
                  className="w-full bg-white/5 rounded px-2 py-1 text-center text-white focus:outline-none focus:ring-1 ring-white/20"
                />
              </div>
              <div className="col-span-3">
                <input 
                  type="number" 
                  max="30"
                  value={course.internal}
                  onChange={(e) => updateCourse(course.id, 'internal', Number(e.target.value))}
                  className="w-full bg-white/5 rounded px-2 py-1 text-center text-white focus:outline-none focus:ring-1 ring-white/20"
                />
              </div>
              <div className="col-span-3">
                <input 
                  type="number" 
                  max="70"
                  value={course.external}
                  onChange={(e) => updateCourse(course.id, 'external', Number(e.target.value))}
                  className="w-full bg-white/5 rounded px-2 py-1 text-center text-white focus:outline-none focus:ring-1 ring-white/20"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setCourses([...courses, { id: Date.now().toString(), name: 'New Subject', credit: 3, internal: 0, external: 0 }])}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Subject
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <div className="flex-1" />
        <button 
          className={`flex items-center gap-2 px-6 py-2 rounded-lg bg-${accentColor}-600 hover:bg-${accentColor}-500 text-white transition-colors font-medium`}
        >
          <Save className="w-4 h-4" /> Save Score
        </button>
      </div>
    </div>
  );
};
