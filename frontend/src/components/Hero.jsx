import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal, BookOpen, Star, Cpu, Code, Bug, Hash, History } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Hero = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get('https://journal-app-k0ab.onrender.com/api/journals');
        const journalDates = res.data.data.map(j => new Date(j.date).toLocaleDateString());
        
        const last14Days = [];
        for (let i = 13; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toLocaleDateString();
          last14Days.push({
            date: dateStr,
            hasJournal: journalDates.includes(dateStr),
            dayName: d.toLocaleDateString('en-US', { weekday: 'narrow' })
          });
        }
        setActivities(last14Days);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-10 overflow-hidden relative min-h-screen bg-[#0d1117] text-[#e6edf3] font-mono">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3fb950 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Decorative Floating Code Symbols (Hidden on mobile) */}
      <motion.div className="hidden md:block absolute top-20 left-[10%] text-[#3fb950]/20" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
        <Code size={100} />
      </motion.div>
      <motion.div className="hidden md:block absolute bottom-20 right-[15%] text-[#7d8590]/10" animate={{ x: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity }}>
        <Bug size={80} />
      </motion.div>

      <motion.main
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-full max-w-4xl text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-[#7d8590] mb-4 text-[10px] md:text-xs tracking-[0.3em] uppercase">
          {`// system.date("${today}")`}
        </motion.div>

        {/* Activity Bar - Scrollable on mobile */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-8 md:mb-12">
          <div className="w-full max-w-sm md:max-w-none overflow-x-auto no-scrollbar pb-2">
            <div className="inline-flex gap-1.5 p-3 bg-[#161b22] border border-[#30363d] rounded-lg">
              {activities.map((day, idx) => (
                <div key={idx} className={`w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0 rounded-sm ${day.hasJournal ? 'bg-[#238636]' : 'bg-[#21262d]'}`} title={day.date} />
              ))}
            </div>
          </div>
          <span className="text-[9px] md:text-[10px] text-[#7d8590] font-bold tracking-widest uppercase flex items-center gap-2">
            <History size={12} className="text-[#3fb950]" /> git_commit_history --last-14-days
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#238636]/50 text-[#3fb950] font-bold text-[9px] md:text-[10px] mb-6 md:mb-8 uppercase tracking-[0.2em] bg-[#238636]/5"
        >
          <Terminal size={12} />
          <span>v22.0.0-stable_reflection</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-4xl md:text-8xl font-black mb-6 md:mb-8 leading-[1] flex items-center justify-center gap-4"
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block">
            <path d="M4 17L10 11L4 5" stroke="#3fb950" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="12" y="19" width="8" height="3" fill="#3fb950"/>
          </svg>
          DevJournal<span className="animate-pulse font-light text-[#3fb950]">_</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-sm md:text-xl text-[#8b949e] mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed px-4">
          The ultimate reflection environment for engineers. Document your sprints, bug-squashing sessions, and personal growth in a high-performance workspace.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/journal')}
            className="w-full sm:w-auto px-8 py-3 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md font-bold text-xs md:text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            ./start_reflection.sh
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/library')}
            className="w-full sm:w-auto px-8 py-3 bg-transparent border border-[#30363d] text-[#e6edf3] hover:bg-[#161b22] rounded-md font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            git log --all
          </motion.button>
        </motion.div>
      </motion.main>

      {/* Side Decorative Terminal Card */}
      <motion.div
        variants={itemVariants}
        className="hidden xl:block absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl p-6 overflow-hidden transform rotate-[-2deg]"
      >
        <div className="flex gap-1.5 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[10px] text-[#3fb950] leading-tight flex flex-col gap-1">
          <p>$ npm info journaling-app</p>
          <p className="text-white">... loading assets</p>
          <p className="text-indigo-400">[info] connected to mongodb_cluster_0</p>
          <p className="text-[#7d8590]"># Journal entry count: 254</p>
          <p className="text-[#3fb950]">READY</p>
          <div className="mt-4 flex gap-2">
            <Hash size={12} /> <span className="text-[#7d8590]">#mental-health #productivity</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
