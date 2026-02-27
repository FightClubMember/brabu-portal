import { useTheme } from '../../context/ThemeContext';
import { Languages, Printer } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  hindi: string;
  english: string;
}

export const CheatSheet = () => {
  const { accentColor } = useTheme();
  // const [activeUnit, setActiveUnit] = useState(1);

  const topics: Topic[] = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      hindi: 'न्यूटन के गति के नियम: 1. जड़त्व का नियम (Law of Inertia) - कोई वस्तु तब तक स्थिर या गतिमान रहती है जब तक उस पर बाहरी बल न लगाया जाए। 2. F=ma - बल द्रव्यमान और त्वरण का गुणनफल है। 3. क्रिया-प्रतिक्रिया (Action-Reaction) - हर क्रिया की समान और विपरीत प्रतिक्रिया होती है।',
      english: 'Newton\'s Laws: 1. Law of Inertia - An object remains at rest or in motion unless acted upon by an external force. 2. F=ma - Force equals mass times acceleration. 3. Action-Reaction - For every action, there is an equal and opposite reaction.'
    },
    {
      id: '2',
      title: 'Thermodynamics (ऊष्मप्रवैगिकी)',
      hindi: 'ऊष्मप्रवैगिकी का प्रथम नियम: ऊर्जा को न तो बनाया जा सकता है और न ही नष्ट किया जा सकता है, केवल एक रूप से दूसरे रूप में बदला जा सकता है (ΔQ = ΔU + ΔW)।',
      english: 'First Law of Thermodynamics: Energy cannot be created or destroyed, only transformed from one form to another (ΔQ = ΔU + ΔW). Conservation of energy principle applied to heat and work.'
    }
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className={`w-5 h-5 text-${accentColor}-400`} />
          <h3 className="font-bold text-white">Exam-Night Cheat Sheet</h3>
        </div>
        <button className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors">
          <Printer className="w-3 h-3" /> Print PDF
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {topics.map((topic, idx) => (
          <div key={topic.id} className="space-y-3">
            <h4 className="text-lg font-bold text-white/90 border-l-4 border-white/20 pl-3">
              {idx + 1}. {topic.title}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#1a1a1a] border border-white/5 relative group">
                <div className="absolute top-2 right-2 text-[10px] font-bold text-white/20 uppercase">Hindi</div>
                <p className="text-sm text-white/80 leading-relaxed font-hindi">
                  {topic.hindi}
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-[#1a1a1a] border border-white/5 relative group">
                <div className="absolute top-2 right-2 text-[10px] font-bold text-white/20 uppercase">English</div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {topic.english}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-200/80 text-xs text-center">
          ⚠️ Note: These summaries are for quick revision only. Please refer to standard textbooks for full details.
        </div>
      </div>
    </div>
  );
};
