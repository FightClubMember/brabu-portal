import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Highlighter, ZoomIn, ZoomOut } from 'lucide-react';
import { CheatSheet } from '../components/tools/CheatSheet';

export const ResourcesPage = () => {
  // const { accentColor } = useTheme();
  const [activeTab, setActiveTab] = useState<'pdf' | 'cheatsheet'>('pdf');
  const [zoom, setZoom] = useState(100);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Smart Library</h1>
          <p className="text-white/50">Access readings and generate bilingual summaries.</p>
        </div>
        <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'pdf' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            PDF Viewer
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'cheatsheet' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            Bilingual Cheat Sheet
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === 'pdf' ? (
          <div className="h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            {/* Toolbar */}
            <div className="h-14 border-b border-white/10 bg-black/20 flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white/70">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">MJC-1_Unit-3_Notes.pdf</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-white/10 rounded text-white/60 hover:text-white">
                    <Highlighter className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-white/10 rounded text-white/60 hover:text-white">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1.5 hover:bg-white/10 rounded text-white/60">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs text-white/50 w-12 text-center">{zoom}%</span>
                <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-1.5 hover:bg-white/10 rounded text-white/60">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewer Content (Mock) */}
            <div className="flex-1 overflow-auto bg-[#1a1a1a] p-8 flex justify-center">
              <motion.div 
                animate={{ scale: zoom / 100 }}
                className="w-[595px] min-h-[842px] bg-white text-black p-12 shadow-2xl origin-top"
              >
                <h1 className="text-3xl font-bold mb-6 text-black">Unit 3: Wave Optics</h1>
                <p className="text-sm leading-relaxed mb-4 text-justify">
                  <span className="bg-yellow-200">Wave optics, also known as physical optics, is the study of light as a wave.</span> Unlike geometric optics, which treats light as a collection of rays traveling in straight lines, wave optics considers the wave nature of light to explain phenomena such as interference, diffraction, and polarization.
                </p>
                <h2 className="text-xl font-bold mt-6 mb-3">3.1 Interference of Light</h2>
                <p className="text-sm leading-relaxed mb-4 text-justify">
                  Interference is the phenomenon in which two waves superpose to form a resultant wave of greater, lower, or the same amplitude. Constructive and destructive interference result from the interaction of waves that are correlated or coherent with each other.
                </p>
                <div className="my-6 h-40 bg-gray-100 rounded border border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                  [Diagram: Young's Double Slit Experiment]
                </div>
                <p className="text-sm leading-relaxed mb-4 text-justify">
                  The most famous demonstration of light interference is Young's Double Slit Experiment, performed by Thomas Young in 1801. It demonstrates the wave nature of light and allows the calculation of wavelength.
                </p>
              </motion.div>
            </div>
          </div>
        ) : (
          <CheatSheet />
        )}
      </div>
    </div>
  );
};
