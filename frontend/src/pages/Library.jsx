import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowLeft, BookOpen, Clock, Pencil, Terminal, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import playSound from '../utils/audio';
import Footer from '../components/Footer';

const Library = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await axios.get('https://journal-app-k0ab.onrender.com/api/journals');
        setJournals(res.data.data || []);
      } catch (error) {
        console.error('Error fetching journals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  const deleteEntry = async (id) => {
    try {
      playSound('delete');
      await axios.delete(`https://journal-app-k0ab.onrender.com/api/journals/${id}`);
      setJournals(journals.filter(j => j._id !== id));
    } catch (error) {
      console.error('Error deleting journal:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-mono flex flex-col items-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl flex-1 flex flex-col pt-12"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#7d8590] hover:text-[#3fb950] transition-colors cursor-pointer font-bold text-sm tracking-widest uppercase"
          >
            <ArrowLeft size={16} />
            ./cd_back
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded text-[#3fb950] font-black text-xs tracking-widest uppercase">
            <Activity size={16} className="text-indigo-400" />
            ReflectionHistory.log
          </div>
        </div>

        {/* Journal List / Table-like Grid */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-2 border-[#30363d] border-t-[#3fb950] rounded-full"
              />
              <span className="text-[#7d8590] animate-pulse uppercase tracking-[0.3em] font-bold">fetch journals...</span>
            </div>
          </div>
        ) : journals.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-[#7d8590] gap-4 bg-[#161b22]/50 border-2 border-dashed border-[#30363d] rounded-2xl mb-12">
            <BookOpen size={64} className="opacity-10" />
            <p className="text-xl font-black uppercase tracking-widest">No commit records found.</p>
            <button 
              onClick={() => navigate('/journal')}
              className="mt-4 px-6 py-2 bg-[#238636] text-white rounded font-bold hover:bg-[#2ea043] transition-all cursor-pointer text-xs"
            >
              RUN ./init_journal.sh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <AnimatePresence>
              {journals.map((journal) => (
                <motion.div
                  key={journal._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -5 }}
                  className="group bg-[#0d1117] border border-[#30363d] rounded-xl p-6 shadow-2xl hover:border-[#3fb950]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#30363d]">
                      <div className="flex items-center gap-2 text-[#7d8590] text-xs font-bold uppercase tracking-widest">
                        <Clock size={14} />
                        {new Date(journal.date).toLocaleDateString()}
                      </div>
                      <span className="text-xl" title="Mood Profile">
                        {journal.mood}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-[#e6edf3] mb-4 truncate text-emerald-400">
                      <span className="text-[#7d8590] font-normal mr-2">#</span>{journal.title}
                    </h3>
                    <p className="text-[#8b949e] line-clamp-4 font-mono leading-relaxed text-sm bg-[#161b22] p-4 rounded-lg border border-[#30363d]/50">
                      {journal.content}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-[#30363d] flex justify-end gap-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button 
                      onClick={() => navigate(`/journal?edit=${journal._id}`)}
                      className="p-2.5 text-[#7d8590] hover:text-[#3fb950] hover:bg-[#3fb950]/10 rounded border border-transparent hover:border-[#3fb950]/30 transition-all cursor-pointer"
                      title="Edit commit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => deleteEntry(journal._id)}
                      className="p-2.5 text-[#7d8590] hover:text-[#ff5f56] hover:bg-[#ff5f56]/10 rounded border border-transparent hover:border-[#ff5f56]/30 transition-all cursor-pointer"
                      title="Discard record"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Library;
