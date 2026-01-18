import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';

const Experience = () => {
    const ref = useRef(null);
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.15 });

    // Scroll progress for the entire section
    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Timeline scroll progress - line grows with scroll
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });

    // Timeline line height linked to scroll
    const timelineHeight = useTransform(timelineProgress, [0, 1], ['0%', '100%']);

    // Parallax for header
    const headerY = useTransform(sectionProgress, [0, 0.3], [40, 0]);

    // Directional animations
    const fromLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const fromRight = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const slideFromTimeline = {
        hidden: { opacity: 0, x: -30, scale: 0.95 },
        visible: (index) => ({
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    };

    const experiences = [
        {
            company: "Spordia Softech",
            role: "Data Analyst",
            location: "Pune",
            duration: "6 Months",
            highlights: [
                "Performed data cleaning, preprocessing, and EDA using Python and SQL",
                "Developed Power BI dashboards to monitor business KPIs, trends, and performance metrics",
                "Automated weekly and monthly reporting processes, improving report delivery time by 40%",
                "Collaborated with internal teams to identify data gaps and provide actionable insights"
            ]
        }
    ];

    const education = [
        {
            degree: "Master of Computer Applications (MCA)",
            institution: "VP Institute Sangli",
            type: "Masters"
        },
        {
            degree: "Bachelor's Degree",
            institution: "KWC Sangli",
            type: "Bachelors"
        }
    ];

    const certifications = [
        "Data Analytics using Python – Udemy",
        "Power BI Dashboard Design – Udemy"
    ];

    return (
        <section id="experience" className="experience" ref={sectionRef}>
            <div className="container" ref={ref}>
                {/* Section Header with parallax */}
                <motion.div style={{ y: headerY }}>
                    <motion.span
                        className="section-label"
                        variants={fromLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        Background
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        variants={fromLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        Experience & Education
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        variants={fromRight}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        My professional journey and academic background
                    </motion.p>
                </motion.div>

                <div className="experience-grid">
                    {/* Work Experience Column */}
                    <div className="experience-column" ref={timelineRef}>
                        <motion.h3
                            className="column-title"
                            variants={fromLeft}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            <FiBriefcase /> Work Experience
                        </motion.h3>

                        {/* Timeline with scroll-linked line */}
                        <div className="timeline-container">
                            {/* Scroll-driven timeline line */}
                            <div className="timeline-track">
                                <motion.div
                                    className="timeline-line"
                                    style={{ height: timelineHeight }}
                                />
                            </div>

                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    className="experience-card glass-card"
                                    custom={index}
                                    variants={slideFromTimeline}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                >
                                    {/* Timeline dot */}
                                    <motion.div
                                        className="timeline-dot"
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                                    />

                                    <div className="exp-header">
                                        <motion.h4
                                            className="exp-company"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ delay: 0.6 + index * 0.2 }}
                                        >
                                            {exp.company}
                                        </motion.h4>
                                        <motion.span
                                            className="exp-role"
                                            initial={{ opacity: 0 }}
                                            animate={isInView ? { opacity: 1 } : {}}
                                            transition={{ delay: 0.7 + index * 0.2 }}
                                        >
                                            {exp.role}
                                        </motion.span>
                                    </div>

                                    <div className="exp-meta">
                                        <span><FiMapPin size={14} /> {exp.location}</span>
                                        <span><FiCalendar size={14} /> {exp.duration}</span>
                                    </div>

                                    <ul className="exp-highlights">
                                        {exp.highlights.map((highlight, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                                            >
                                                {highlight}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div className="education-column">
                        <motion.h3
                            className="column-title"
                            variants={fromRight}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            🎓 Education
                        </motion.h3>

                        <div className="education-cards">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    className="education-card glass-card"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + index * 0.15 }}
                                    whileHover={{ x: -5, transition: { duration: 0.2 } }}
                                >
                                    <motion.span
                                        className="edu-type"
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : {}}
                                        transition={{ delay: 0.5 + index * 0.15 }}
                                    >
                                        {edu.type}
                                    </motion.span>
                                    <h4 className="edu-degree">{edu.degree}</h4>
                                    <p className="edu-institution">{edu.institution}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.h3
                            className="column-title"
                            style={{ marginTop: '2rem' }}
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.7 }}
                        >
                            📜 Certifications
                        </motion.h3>

                        <div className="certifications">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="cert-badge"
                                    initial={{ opacity: 0, x: 30, scale: 0.9 }}
                                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    whileHover={{ x: -5, scale: 1.02, transition: { duration: 0.2 } }}
                                >
                                    ✓ {cert}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
