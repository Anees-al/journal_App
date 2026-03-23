import { motion } from 'framer-motion';
import { Save, ArrowLeft, Terminal, Cpu } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import playSound from '../utils/audio';
import Footer from '../components/Footer';

const Journal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('😊');

  useEffect(() => {
    if (editId) {
      const fetchJournal = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/journals`);
          const journal = res.data.data.find(j => j._id === editId);
          if (journal) {
            setTitle(journal.title);
            setContent(journal.content);
            setSelectedMood(journal.mood);
          }
        } catch (error) {
          console.error('Error fetching journal for edit:', error);
        }
      };
      fetchJournal();
    }
  }, [editId]);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '🤩', label: 'Excited' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😤', label: 'Angry' }
  ];

  const saveEntry = async () => {
    if (!title.trim() || !content.trim()) return;
    playSound('save');

    try {
      const entryData = {
        title,
        content,
        mood: selectedMood,
      };

      if (editId) {
        await axios.put(`http://localhost:5000/api/journals/${editId}`, entryData);
      } else {
        await axios.post('http://localhost:5000/api/journals', entryData);
      }
      navigate('/library');
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('Failed to save journal. Is the backend running?');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-mono flex flex-col items-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl flex-1 flex flex-col pt-12"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#7d8590] hover:text-[#3fb950] transition-colors cursor-pointer font-bold text-sm tracking-widest"
          >
            <ArrowLeft size={16} />
            ./cd_home
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded text-[#3fb950] text-[10px] font-bold tracking-widest uppercase">
            <Terminal size={12} />
            Status: Editing_Buffer
          </div>
        </div>

        {/* Content Area / Editor Window */}
        <div className="bg-[#010409] rounded-2xl border border-[#30363d] flex-1 flex flex-col mb-12 shadow-2xl overflow-hidden">
          {/* Top Bar of Editor */}
          <div className="bg-[#161b22] border-b border-[#30363d] px-4 md:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex gap-1.5 grayscale opacity-50">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[#7d8590] text-[9px] md:text-[10px] tracking-widest uppercase font-bold">journalEntry.reflect</span>
            </div>
            {/* Mood Selector (Technical Style) */}
            <div className="flex items-center gap-3 text-[#7d8590] w-full md:w-auto justify-between md:justify-end">
              <span className="text-[9px] md:text-[10px] uppercase tracking-tighter hidden sm:inline">Set_mood:</span>
              <div className="flex gap-1 p-1 bg-[#010409] border border-[#30363d] rounded-lg overflow-x-auto no-scrollbar">
                {moods.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setSelectedMood(m.emoji)}
                    className={`text-base md:text-lg p-1 md:p-1.5 rounded-md transition-all cursor-pointer hover:bg-[#161b22] flex-shrink-0 ${
                      selectedMood === m.emoji ? 'bg-[#238636] text-white opacity-100' : 'opacity-40 grayscale hover:grayscale-0'
                    }`}
                    title={m.label}
                  >
                    {m.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6 md:p-12 flex flex-col font-mono">
            <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4 mb-6 md:mb-8">
              <span className="text-indigo-400 font-bold text-xs md:text-sm uppercase tracking-widest pt-1 md:pt-4">title:</span>
              <input 
                type="text" 
                placeholder="Declare reflection..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl md:text-5xl font-black bg-transparent border-none outline-none placeholder:text-[#21262d] text-[#e6edf3] flex-1 tracking-tight"
              />
            </div>
            
            <div className="flex flex-col md:flex-row flex-1 items-start gap-2 md:gap-4">
              <span className="text-rose-400 font-bold text-xs md:text-sm uppercase tracking-widest pt-1">content:</span>
              <textarea 
                placeholder="Input deep thoughts here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full bg-transparent border-none outline-none text-base md:text-xl text-[#8b949e] placeholder:text-[#21262d] resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="bg-[#161b22] border-t border-[#30363d] px-6 py-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveEntry}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#238636] hover:bg-[#2ea043] text-white rounded font-bold text-xs md:text-sm tracking-widest transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed uppercase"
              disabled={!title.trim() || !content.trim()}
            >
              <Save size={16} />
              COMMIT_ENTRY
            </motion.button>
          </div>
        </div>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Journal;
