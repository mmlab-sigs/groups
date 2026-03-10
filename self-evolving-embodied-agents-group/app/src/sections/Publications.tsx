import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, FileText, Github } from 'lucide-react';

const publications = [
  {
    id: 1,
    title: 'Enhancing Implicit Neural Representations via Symmetric Power Transformation',
    venue: 'AAAI 2025',
    rank: 'CCF-A',
    authors: 'Zhi Wang, et al.',
    description: 'A novel approach to enhance implicit neural representations using symmetric power transformation, achieving state-of-the-art results in 3D reconstruction tasks.',
    links: {
      paper: '#',
      code: '#',
      project: '#',
    },
    color: '#004851',
  },
  {
    id: 2,
    title: 'EVOS: Efficient Implicit Neural Training via EVolutionary Selector',
    venue: 'CVPR 2025',
    rank: 'CCF-A',
    authors: 'Yuan Meng, et al.',
    description: 'An evolutionary selection approach for efficient training of implicit neural representations, significantly reducing training time while maintaining quality.',
    links: {
      paper: '#',
      code: '#',
      project: '#',
    },
    color: '#D3A42F',
  },
  {
    id: 3,
    title: 'SD-GS: Structured Deformable 3D Gaussians for Efficient Dynamic Scene Reconstruction',
    venue: 'ArXiv 2025',
    rank: 'Preprint',
    authors: 'Kangye Ji, et al.',
    description: 'A structured deformable 3D Gaussian splatting method for efficient reconstruction of dynamic scenes with complex motions.',
    links: {
      paper: '#',
      code: '#',
      project: '#',
    },
    color: '#E57F84',
  },
  {
    id: 4,
    title: 'MesonGS: Post-training Compression of 3D Gaussians via Efficient Attribute Transformation',
    venue: 'ECCV 2024',
    rank: 'CCF-B',
    authors: 'Chen Tang, et al.',
    description: 'A post-training compression method for 3D Gaussian splatting that reduces storage requirements while preserving visual quality.',
    links: {
      paper: '#',
      code: '#',
      project: '#',
    },
    color: '#004851',
  },
  {
    id: 5,
    title: 'SizeGS: Size-aware Compression of 3D Gaussian Splatting via Mixed Integer Programming',
    venue: 'ACM MM 2025',
    rank: 'CCF-A',
    authors: 'Ye Li, et al.',
    description: 'A size-aware compression approach using mixed integer programming to optimize 3D Gaussian splatting representations.',
    links: {
      paper: '#',
      code: '#',
      project: '#',
    },
    color: '#D3A42F',
  },
];

export default function Publications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="publications" className="py-24 sm:py-32 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004851] mb-4">
            Selected Publications / 代表性成果
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our latest research contributions to the field of embodied AI and computer vision
          </p>
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {publications.map((pub, index) => {
            const isHovered = hoveredId === pub.id;

            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredId(pub.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 cursor-pointer"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Left: Title & Meta */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="px-3 py-1 text-xs font-bold text-white rounded-full"
                          style={{ backgroundColor: pub.color }}
                        >
                          {pub.venue}
                        </span>
                        <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
                          {pub.rank}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#004851] mb-2 group-hover:text-[#D3A42F] transition-colors">
                        {pub.title}
                      </h3>

                      <p className="text-sm text-gray-500 mb-4">{pub.authors}</p>

                      <motion.p
                        className="text-gray-600 leading-relaxed"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: isHovered ? 1 : 0.7 }}
                        transition={{ duration: 0.3 }}
                      >
                        {pub.description}
                      </motion.p>
                    </div>

                    {/* Right: Links */}
                    <div className="flex lg:flex-col gap-3">
                      <motion.a
                        href={pub.links.paper}
                        className="flex items-center gap-2 px-4 py-2 bg-[#004851] text-white rounded-lg text-sm font-medium hover:bg-[#003840] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FileText className="w-4 h-4" />
                        <span>Paper</span>
                      </motion.a>

                      <motion.a
                        href={pub.links.code}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-[#004851] text-[#004851] rounded-lg text-sm font-medium hover:bg-[#004851] hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </motion.a>

                      <motion.a
                        href={pub.links.project}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:border-[#D3A42F] hover:text-[#D3A42F] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Project</span>
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-[#004851] to-[#D3A42F]"
                  initial={{ width: '0%' }}
                  animate={{ width: isHovered ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#004851] text-white rounded-full font-medium hover:bg-[#003840] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>查看全部论文</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
