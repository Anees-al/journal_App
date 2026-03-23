import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, ExternalLink } from 'lucide-react';

const SocialLinks = () => {
  const links = [
    {
      name: 'GitHub',
      url: 'https://github.com/Anees-al',
      icon: <Github size={26} />,
      iconColor: 'text-[#c9d1d9]',
      iconBg: 'bg-[#c9d1d9]/10',
      borderHover: 'hover:border-[#c9d1d9]/50',
      glow: 'from-[#c9d1d9]/8',
      label: '@anees-al',
      badge: 'code',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/anees-al',
      icon: <Linkedin size={26} />,
      iconColor: 'text-[#0a8fd8]',
      iconBg: 'bg-[#0a8fd8]/15',
      borderHover: 'hover:border-[#0a8fd8]/50',
      glow: 'from-[#0a8fd8]/10',
      label: '@anees-al',
      badge: 'network',
    },
    {
      name: 'Portfolio',
      url: 'https://anees-al.github.io/MyPortfolio/',
      icon: <Globe size={26} />,
      iconColor: 'text-[#3fb950]',
      iconBg: 'bg-[#3fb950]/15',
      borderHover: 'hover:border-[#3fb950]/50',
      glow: 'from-[#3fb950]/10',
      label: 'MyPortfolio',
      badge: 'deploy',
    },
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
              whileHover={{ scale: 1.03 }}
              className={`group p-6 bg-[#161b22] border border-[#30363d] ${link.borderHover} rounded-xl transition-all duration-300 flex flex-col items-center gap-4 relative overflow-hidden`}
            >
              {/* Colored background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.glow} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Colored Icon */}
              <div className={`p-4 rounded-full ${link.iconBg} border border-[#30363d] ${link.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                {link.icon}
              </div>

              <div className="text-center z-10">
                <h3 className="text-[#e6edf3] font-bold font-mono text-sm mb-1">{link.name}</h3>
                <p className={`${link.iconColor} text-xs font-mono opacity-75 group-hover:opacity-100 transition-opacity`}>
                  {link.label}
                </p>
              </div>

              {/* Platform badge */}
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-current ${link.iconColor} opacity-50 group-hover:opacity-100 font-mono transition-opacity`}>
                {link.badge}
              </span>

              {/* External link icon */}
              <div className="absolute top-4 right-4 text-[#7d8590] opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={13} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
