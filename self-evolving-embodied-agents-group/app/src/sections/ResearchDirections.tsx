import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Eye, Brain, RefreshCw } from 'lucide-react';

const researchAreas = [
  {
    id: 1,
    title: 'Efficient Embodied Data Preparation',
    titleCn: '高效具身数据制备',
    description: 'Developing advanced techniques for reconstructing 3D scenes from various sensory inputs, including implicit neural representations and 3D Gaussian splatting.',
    descriptionCn: '开发从各种感官输入重建三维场景的高级技术，包括隐式神经表示和3D高斯 splatting。',
    icon: Database,
    color: '#004851',
    topics: [
      '3D Reconstruction',
      'World Models',
      'Human Motion Generation',
      'Interactive Scene Generation',
      'Trajectory Data Synthesis',
    ],
  },
  {
    id: 2,
    title: 'Multimodal Fine-grained Perception',
    titleCn: '多模态细粒度大模型感知',
    description: 'Building perception systems that can understand the world at a fine-grained level through vision-language models and fine-grained visual understanding.',
    descriptionCn: '构建能够在细粒度水平上理解世界的感知系统，通过视觉语言模型和细粒度视觉理解。',
    icon: Eye,
    color: '#D3A42F',
    topics: [
      'Vision-Language Models',
      'Fine-grained Visual Understanding',
      'Multimodal Fusion',
      'Semantic Segmentation',
      'Object Detection',
    ],
  },
  {
    id: 3,
    title: 'Spatiotemporal Decision-Making',
    titleCn: '时空大模型决策规划',
    description: 'Developing intelligent decision-making systems for embodied agents in complex spatiotemporal environments.',
    descriptionCn: '为具身智能体开发复杂的时空环境中的智能决策系统。',
    icon: Brain,
    color: '#E57F84',
    topics: [
      'Robot Policy Learning',
      'Sim-to-Real Transfer',
      'Motion Planning',
      'Task Planning',
      'Reinforcement Learning',
    ],
  },
  {
    id: 4,
    title: 'Agent Continuous Learning',
    titleCn: '智能体持续学习',
    description: 'Enabling agents to continuously learn and adapt through test-time adaptation, continuous learning, and LLM generalization.',
    descriptionCn: '使智能体能够通过测试时适应、持续学习和大语言模型泛化来持续学习和适应。',
    icon: RefreshCw,
    color: '#004851',
    topics: [
      'Test-time Adaptation',
      'Continuous Learning',
      'LLM Generalization',
      'Fine-tuning',
      'Domain Adaptation',
    ],
  },
];

export default function ResearchDirections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="research" className="py-24 sm:py-32 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004851] mb-4">
            Research Directions / 研究方向
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our research is organized around four interconnected pillars that form a closed loop of data, perception, decision, and learning.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto mt-2">
            我们的研究围绕四个相互关联的支柱展开，形成一个数据、感知、决策和学习的闭环。
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ perspective: 1000 }}
        >
          {researchAreas.map((area, index) => {
            const Icon = area.icon;
            const isHovered = hoveredId === area.id;

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, rotateX: 45, z: -500 }}
                animate={isInView ? { opacity: 1, rotateX: 0, z: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredId(area.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative bg-white rounded-3xl p-8 shadow-lg cursor-pointer overflow-hidden group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isHovered
                    ? 'translateZ(50px) scale(1.02)'
                    : 'translateZ(0) scale(1)',
                  transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    boxShadow: `inset 0 0 0 2px ${area.color}30`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${area.color}15` }}
                  animate={{ rotate: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8" style={{ color: area.color }} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#004851] mb-2">
                  {area.title}
                </h3>
                <h4 className="text-lg font-medium text-[#D3A42F] mb-4">
                  {area.titleCn}
                </h4>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {area.description}
                </p>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {area.descriptionCn}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2">
                  {area.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: isHovered
                          ? `${area.color}20`
                          : '#F4F4F4',
                        color: area.color,
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: area.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
