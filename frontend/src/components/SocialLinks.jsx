import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, ExternalLink } from 'lucide-react';

const SocialLinks = () => {
  const links = [
    {
      name: 'GitHub',
      url: 'https://github.com/Anees-al',
      icon: <Github size={20} />,
      color: 'hover:text-[#2f81f7]',
      label: 'anees-al'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/anees-al',
      icon: <Linkedin size={20} />,
      color: 'hover:text-[#0a66c2]',
      label: 'anees-al'
    },
    {
      name: 'Portfolio',
      url: 'https://anees-al.github.io/MyPortfolio/',
      icon: <Globe size={20} />,
      color: 'hover:text-[#3fb950]',
      label: 'MyPortfolio'
    }
  ];

  return (
    <section className="py-12 px-4 bg-[#0d1117] border-t border-[#30363d]">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-[#e6edf3] text-xl font-bold mb-2 font-mono flex items-center justify-center gap-2">
            <span className="text-[#3fb950]">$</span> connections.query()
          </h2>
          <p className="text-[#8b949e] text-sm font-mono italic">
            // find paths to developer nodes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group p-6 bg-[#161b22] border border-[#30363d] rounded-xl hover:border-[#8b949e]/50 transition-all flex flex-col items-center gap-4 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3fb950]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`p-4 rounded-full bg-[#0d1117] border border-[#30363d] text-[#7d8590] group-hover:bg-[#30363d] ${link.color} transition-all duration-300`}>
                {link.icon}
              </div>
              
              <div className="text-center z-10">
                <h3 className="text-[#e6edf3] font-bold font-mono text-sm mb-1">{link.name}</h3>
                <p className="text-[#7d8590] text-xs font-mono group-hover:text-[#e6edf3] transition-colors">
                  {link.label}
                </p>
              </div>

              <div className="absolute top-4 right-4 text-[#7d8590] opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
