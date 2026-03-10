import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="mission" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Floating Background Circles */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#D3A42F] opacity-10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#004851] opacity-5 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl border border-gray-100"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004851] mb-8 text-center"
          >
            Our Mission / 我们的使命
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Our mission is to establish a complete pipeline for creating self-evolving embodied agents, 
              from efficient data preparation and multimodal perception to spatiotemporal decision-making 
              and continuous learning. We aim to solve the fundamental challenges of embodied intelligence 
              and enable robots to learn and operate robustly in the real world. By integrating cutting-edge 
              research in 3D vision, world models, and large language models, we are building the foundation 
              for the next generation of intelligent systems.
            </p>

            <div className="w-24 h-1 bg-gradient-to-r from-[#004851] to-[#D3A42F] mx-auto my-8" />

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              我们的使命是建立一个完整的自进化具身智能体研究框架，从高效数据制备和多模态感知到时空决策和持续学习。
              我们旨在解决具身智能的根本挑战，使机器人能够在现实世界中稳健地学习和操作。
              通过整合三维视觉、世界模型和大语言模型领域的尖端研究，我们正在为下一代智能系统奠定基础。
            </p>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200"
          >
            {[
              { number: '4', label: '研究方向', labelEn: 'Research Directions' },
              { number: '20+', label: '发表论文', labelEn: 'Publications' },
              { number: '10+', label: '顶级会议', labelEn: 'Top Venues' },
              { number: '5+', label: '合作企业', labelEn: 'Partners' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#004851]">{stat.number}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.labelEn}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
