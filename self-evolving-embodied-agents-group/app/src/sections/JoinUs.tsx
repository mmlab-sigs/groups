import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, GraduationCap, Briefcase, Building2 } from 'lucide-react';

const opportunities = [
  {
    id: 1,
    title: 'Undergraduate Students',
    titleCn: '本科生',
    description: 'We welcome undergraduate researchers at all class levels from Tsinghua, HIT-SZ, SUSTech, and other universities.',
    descriptionCn: '我们欢迎来自清华、哈工深、南科大等高校各年级的本科生研究者。',
    icon: Users,
    requirements: [
      'Strong programming skills (Python, C++)',
      'Background in AI, CV, or Robotics',
      'Excellent academic performance',
      'Self-motivated and passionate',
    ],
    color: '#004851',
  },
  {
    id: 2,
    title: 'Masters and PhD Students',
    titleCn: '硕士和博士生',
    description: 'Prospective PhD students or Post-docs should reach out to Professor Zhi Wang directly.',
    descriptionCn: '有意申请博士和博士后的同学请直接与王智教授联系。',
    icon: GraduationCap,
    requirements: [
      'Strong research background',
      'Published papers preferred',
      'Clear research interests',
      'Commitment to excellence',
    ],
    color: '#D3A42F',
  },
  {
    id: 3,
    title: 'Interns and Visiting Scholars',
    titleCn: '实习生和访问学者',
    description: 'Prospective interns can contact Jingyan Jiang. Please email with your CV and research statement.',
    descriptionCn: '有意申请实习的同学请联系姜婧妍。请在邮件中附上简历和研究陈述。',
    icon: Briefcase,
    requirements: [
      'Minimum 3-month commitment',
      'Relevant project experience',
      'Strong technical skills',
      'Good communication ability',
    ],
    color: '#E57F84',
  },
  {
    id: 4,
    title: 'Corporate Collaboration',
    titleCn: '企业合作',
    description: 'Prospective business partners should contact Professor Zhi Wang directly for research collaboration.',
    descriptionCn: '有意合作的商业机构请直接与王智教授联系。',
    icon: Building2,
    requirements: [
      'Aligned research interests',
      'Mutual benefits',
      'Long-term partnership',
      'Resource sharing',
    ],
    color: '#004851',
  },
];

export default function JoinUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="join" className="py-24 sm:py-32 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Title & Description */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004851] mb-6">
              Join Us / 加入我们
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-[#004851] to-[#D3A42F] mb-6" />
            
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              We are always looking for passionate and talented students to join our team. 
              If you are interested in shaping the future of embodied AI, we encourage you to apply.
            </p>
            
            <p className="text-base text-gray-600 leading-relaxed">
              我们一直在寻找有激情和才华的学生加入我们的团队。如果您对塑造具身人工智能的未来感兴趣，我们鼓励您申请。
            </p>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 p-6 bg-white rounded-2xl shadow-lg"
            >
              <h3 className="text-lg font-bold text-[#004851] mb-3">
                如何申请 / How to Apply
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                请发送邮件至相应联系人，附上您的简历、成绩单和代表您研究兴趣的论文链接。
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:wangzhi@sjtu.edu.cn"
                  className="px-4 py-2 bg-[#004851] text-white rounded-lg text-sm font-medium hover:bg-[#003840] transition-colors"
                >
                  联系教授
                </a>
                <a
                  href="mailto:jiangjingyan@sjtu.edu.cn"
                  className="px-4 py-2 border-2 border-[#004851] text-[#004851] rounded-lg text-sm font-medium hover:bg-[#004851] hover:text-white transition-colors"
                >
                  联系博士生
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Opportunities List */}
          <div className="space-y-6">
            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon;

              return (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group"
                >
                  <motion.div
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-transparent hover:border-[#E57F84]"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${opportunity.color}15` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: opportunity.color }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#004851] group-hover:text-[#D3A42F] transition-colors">
                          {opportunity.title}
                        </h3>
                        <p className="text-[#D3A42F] font-medium mb-2">
                          {opportunity.titleCn}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          {opportunity.description}
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                          {opportunity.descriptionCn}
                        </p>

                        {/* Requirements */}
                        <div className="flex flex-wrap gap-2">
                          {opportunity.requirements.map((req, reqIndex) => (
                            <span
                              key={reqIndex}
                              className="px-2 py-1 text-xs bg-[#F4F4F4] text-gray-600 rounded"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="w-8 h-8 rounded-full bg-[#F4F4F4] flex items-center justify-center flex-shrink-0 group-hover:bg-[#004851] transition-colors"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
