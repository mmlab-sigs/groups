import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Globe, GraduationCap } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Zhi Wang',
    nameCn: '王智',
    role: 'Associate Professor',
    roleCn: '副教授',
    email: 'wangzhi@sjtu.edu.cn',
    website: 'https://www.wangzhi.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
    description: 'Leading research in embodied AI and computer vision',
  },
  {
    id: 2,
    name: 'Jingyan Jiang',
    nameCn: '姜婧妍',
    role: 'PhD Student',
    roleCn: '博士生',
    email: 'jiangjingyan@sjtu.edu.cn',
    website: 'https://www.jiangjingyan.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face',
    description: 'Focusing on multimodal perception and VLA models',
  },
];

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="py-24 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004851] mb-4">
            Team / 团队
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our group is led by Professor Zhi Wang from Shanghai Jiao Tong University.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto mt-2">
            我们的小组由上海交通大学王智教授领导。
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="group"
            >
              <motion.div
                className="bg-[#F4F4F4] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004851]/60 to-transparent" />
                  
                  {/* Role Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-[#004851]" />
                    </div>
                    <div className="bg-white/90 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-[#004851]">{member.role}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#004851] group-hover:text-[#D3A42F] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[#D3A42F] font-medium mb-2">{member.nameCn}</p>
                  <p className="text-sm text-gray-500 mb-4">{member.roleCn}</p>
                  
                  <p className="text-gray-600 text-sm mb-4">{member.description}</p>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <motion.a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 rounded-xl bg-[#004851] flex items-center justify-center text-white hover:bg-[#003840] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border-2 border-[#004851] flex items-center justify-center text-[#004851] hover:bg-[#004851] hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Globe className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <div className="bg-[#004851] rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">联系我们 / Contact Information</h3>
            <p className="text-white/80 mb-2">
              <span className="font-medium">联系方式：</span>
              <a href="mailto:wangzhi@sjtu.edu.cn" className="underline hover:text-[#D3A42F] transition-colors">
                wangzhi@sjtu.edu.cn
              </a>
            </p>
            <p className="text-white/80">
              <span className="font-medium">实验室：</span>上海交通大学计算机科学与工程系
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
