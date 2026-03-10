import { motion } from 'framer-motion';
import { Github, Mail, MapPin, ExternalLink } from 'lucide-react';

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Mission', href: '#mission' },
      { label: 'Research', href: '#research' },
      { label: 'Publications', href: '#publications' },
      { label: 'Team', href: '#team' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'GitHub', href: 'https://github.com/mmlab-sigs' },
      { label: 'Google Scholar', href: '#' },
      { label: 'Lab Website', href: '#' },
    ],
  },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#004851] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SEA</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Self-Evolving Agents</h3>
                  <p className="text-white/60 text-sm">自进化具身智能体小组</p>
                </div>
              </div>

              <p className="text-white/70 leading-relaxed mb-6 max-w-md">
                A research group at Shanghai Jiao Tong University focusing on embodied AI, 
                3D vision, and self-evolving intelligent systems.
              </p>

              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com/mmlab-sigs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:wangzhi@sjtu.edu.cn"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (sectionIndex + 1) }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        className="text-white/70 hover:text-[#D3A42F] transition-colors flex items-center gap-1"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-[#D3A42F] transition-colors flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4" />
              <span>上海交通大学计算机科学与工程系</span>
            </div>
            <div className="text-white/60 text-sm">
              <a href="mailto:wangzhi@sjtu.edu.cn" className="hover:text-[#D3A42F] transition-colors">
                wangzhi@sjtu.edu.cn
              </a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-white/50 text-sm">
            © 2025 Self-Evolving Embodied Agents Group. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-2">
            MMLab@SJTU | 上海交通大学媒体实验室
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
