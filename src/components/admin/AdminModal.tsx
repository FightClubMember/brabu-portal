import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, ShieldAlert, Save, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateTicker: (text: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, updateTicker }) => {
  const { campusImage, setCampusImage } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [tickerInput, setTickerInput] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'syllabus' | 'upload' | 'theme'>('dashboard');
  const [imageUrlInput, setImageUrlInput] = useState(campusImage);

  // Mock Syllabus Data for Editing
  const [syllabusData, setSyllabusData] = useState([
    { id: 1, code: 'MJC-1', title: 'Major Core Course 1' },
    { id: 2, code: 'MIC-1', title: 'Minor Course 1' },
    { id: 3, code: 'MDC-1', title: 'Multidisciplinary Course' },
  ]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setPassword('');
      setError(false);
      setIsAuthenticated(false);
      setActiveTab('dashboard');
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Himanshu@01') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const handleUpdateTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (tickerInput.trim()) {
      updateTicker(tickerInput);
      setTickerInput('');
      alert('Ticker Updated!');
    }
  };

  const handleUpdateImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrlInput.trim()) {
      setCampusImage(imageUrlInput);
      alert('Campus Image Updated!');
    }
  };

  const handleSyllabusChange = (id: number, field: string, value: string) => {
    setSyllabusData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-red-500/20 text-red-400`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">System Override</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto py-10">
              <div className="space-y-2">
                <label className="text-sm text-white/60">Enter Bypass Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-red-500/50 transition-colors"
                    placeholder="••••••••••••"
                    autoFocus
                  />
                </div>
                {error && <p className="text-xs text-red-400">Access Denied: Invalid Key</p>}
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Authenticate
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Admin Nav */}
              <div className="flex border-b border-white/10 pb-4 gap-4 overflow-x-auto">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'dashboard' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('syllabus')}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'syllabus' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                >
                  Live-Edit Syllabus
                </button>
                <button 
                  onClick={() => setActiveTab('upload')}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'upload' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                >
                  Resource Uploader
                </button>
                <button 
                  onClick={() => setActiveTab('theme')}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'theme' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                >
                  Appearance
                </button>
              </div>

              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-xs text-green-400 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Admin Access Granted: Himanshu@01
                  </div>

                  <form onSubmit={handleUpdateTicker} className="space-y-2">
                    <label className="text-xs text-white/50">Update Notification Ticker</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={tickerInput}
                        onChange={(e) => setTickerInput(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-white/20"
                        placeholder="Enter new alert message..."
                      />
                      <button type="submit" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
                        Push
                      </button>
                    </div>
                  </form>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setActiveTab('syllabus')} className="p-3 bg-white/5 border border-white/10 rounded-lg text-left hover:bg-white/10 transition-colors group">
                      <div className="text-xs text-white/40 mb-1">Database</div>
                      <div className="text-sm font-medium text-white group-hover:text-blue-400">Edit Syllabus JSON</div>
                    </button>
                    <button onClick={() => setActiveTab('theme')} className="p-3 bg-white/5 border border-white/10 rounded-lg text-left hover:bg-white/10 transition-colors group">
                      <div className="text-xs text-white/40 mb-1">Theme</div>
                      <div className="text-sm font-medium text-white group-hover:text-blue-400">Change Campus Image</div>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'syllabus' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white">Master Syllabus Data</h3>
                    <button className="text-xs flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                      <Save className="w-3 h-3" /> Save Changes
                    </button>
                  </div>
                  <div className="border border-white/10 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-white/5 text-white/50 font-medium">
                        <tr>
                          <th className="p-3">Code</th>
                          <th className="p-3">Title</th>
                          <th className="p-3 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {syllabusData.map((item) => (
                          <tr key={item.id} className="group hover:bg-white/5">
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.code} 
                                onChange={(e) => handleSyllabusChange(item.id, 'code', e.target.value)}
                                className="bg-transparent text-white font-mono w-full focus:outline-none focus:text-blue-400"
                              />
                            </td>
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.title} 
                                onChange={(e) => handleSyllabusChange(item.id, 'title', e.target.value)}
                                className="bg-transparent text-white w-full focus:outline-none focus:text-blue-400"
                              />
                            </td>
                            <td className="p-3 text-right">
                              <button className="text-white/20 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'upload' && (
                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-white">Resource Uploader</h3>
                   <div className="border-2 border-dashed border-white/10 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                       <Upload className="w-6 h-6 text-white/50" />
                     </div>
                     <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                     <p className="text-xs text-white/40">PDF, DOCX up to 10MB</p>
                   </div>
                </div>
              )}

              {activeTab === 'theme' && (
                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-white">Site Appearance</h3>
                   
                   <form onSubmit={handleUpdateImage} className="space-y-4">
                     <div className="space-y-2">
                       <label className="text-xs text-white/50">Campus Hero Image URL</label>
                       <div className="flex gap-2">
                         <div className="relative flex-1">
                           <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                           <input 
                             type="text"
                             value={imageUrlInput}
                             onChange={(e) => setImageUrlInput(e.target.value)}
                             className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/20"
                             placeholder="https://example.com/image.jpg"
                           />
                         </div>
                         <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors font-medium">
                           Update
                         </button>
                       </div>
                       <p className="text-[10px] text-white/30">Paste a direct link to an image (JPG/PNG). Recommended size: 1920x1080.</p>
                     </div>

                     <div className="space-y-2">
                       <label className="text-xs text-white/50">Preview</label>
                       <div className="w-full h-40 rounded-xl overflow-hidden border border-white/10 bg-black/20 relative">
                         <img 
                           src={imageUrlInput} 
                           alt="Preview" 
                           className="w-full h-full object-cover opacity-80"
                           onError={(e) => {(e.target as HTMLImageElement).src = '/images/campus-hero-v2.png'}} 
                         />
                       </div>
                     </div>
                   </form>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


