import React from 'react';
import { Terminal, Hash } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full max-w-6xl mt-auto py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#30363d] font-mono">
      <div className="flex items-center gap-2 text-[#7d8590] text-[10px] font-black uppercase tracking-widest">
        <Terminal size={14} />
        Deployed_at: v22.0.0-stable
      </div>
      
      <p className="text-[#8b949e] text-sm text-center md:text-left font-bold lowercase tracking-tight italic opacity-60">
        // Crafted with &lt;heart&gt; for your most cherished memories.
      </p>

      <div className="flex items-center gap-4">
        {[ 'mental-health', 'journaling', 'dev-life' ].map(tag => (
          <span key={tag} className="text-[#7d8590] text-[10px] uppercase font-bold flex items-center gap-1 hover:text-[#3fb950] transition-colors cursor-default">
            <Hash size={10} /> {tag}
          </span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
