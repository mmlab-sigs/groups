import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';

const newsItems = [
  {
    date: '2025.03.03',
    title: 'COSMIC was accepted by CVPR 2025',
    titleCn: 'COSMIC 被 CVPR 2025 接收',
    venue: 'CVPR 2025',
    rank: 'CCF-A',
    icon: Award,
  },
  {
    date: '2025.03.03',
    title: 'LLM4Band was accepted by ICASSP 2025',
    titleCn: 'LLM4Band 被 ICASSP 2025 接收',
    venue: 'ICASSP 2025',
    rank: 'CCF-B',
    icon: Award,
  },
  {
    date: '2025.03.21',
    title: 'DATTA was accepted by ICME 2025',
    titleCn: 'DATTA 被 ICME 2025 接收',
    venue: 'ICME 2025',
    rank: 'CCF-B',
    icon: Award,
  },
  {
    date: '2025.09.18',
    title: 'FIND was accepted by NIPS 2025',
    titleCn: 'FIND 被 NIPS 2025 接收',
    venue: 'NIPS 2025',
    rank: 'CCF-A',
    icon: Award,
  },
  {
    date: '2025.11.08',
    title: 'MeETTA was accepted by AAAI 2026',
    titleCn: 'MeETTA 被 AAAI 2026 接收',
    venue: 'AAAI 2026',
    rank: 'CCF-A',
    icon: Award,
  },
];

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="news" className="py-24 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004851] mb-4">
            Recent News / 近期动态
          </h2>
          <p className="text-lg text-gray-600">
            Latest updates from our research group
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#004851]"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: 'linear' }}
          />

          {/* News Items */}
          <div className="space-y-8">
            {newsItems.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * index,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative flex items-start ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-[#D3A42F] border-4 border-white shadow-md z-10"
                    style={{ transform: 'translateX(-50%)' }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 * index,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  />

                  {/* Content Card */}
                  <div
                    className={`ml-12 sm:ml-0 sm:w-5/12 ${
                      isLeft ? 'sm:pr-12' : 'sm:pl-12'
                    }`}
                  >
                    <motion.div
                      className="bg-[#F4F4F4] rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group border-l-4 border-transparent hover:border-[#E57F84]"
                      whileHover={{ x: isLeft ? -5 : 5 }}
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#004851] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#004851] group-hover:text-[#D3A42F] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.titleCn}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="px-2 py-0.5 text-xs font-medium bg-[#004851] text-white rounded">
                              {item.venue}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-[#D3A42F] text-white rounded">
                              {item.rank}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
