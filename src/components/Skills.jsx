import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SiPython, SiMysql } from 'react-icons/si';
import { FiBarChart2, FiDatabase, FiTrendingUp, FiPieChart, FiGrid, FiLayers } from 'react-icons/fi';

const Skills = () => {
    const ref = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.15 });

    // Scroll progress for the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax for header
    const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

    // Directional reveals
    const fromLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const fromRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const fromBottom = {
        hidden: { opacity: 0, y: 30 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" }
        })
    };

    const skillCategories = [
        {
            title: "Programming",
            icon: <SiPython />,
            skills: [
                { name: "Python", icon: <SiPython />, level: 85 },
                { name: "Pandas", icon: <FiGrid />, level: 80 },
                { name: "NumPy", icon: <FiLayers />, level: 75 },
                { name: "Matplotlib", icon: <FiBarChart2 />, level: 80 },
                { name: "Seaborn", icon: <FiPieChart />, level: 75 }
            ]
        },
        {
            title: "Databases",
            icon: <FiDatabase />,
            skills: [
                { name: "MySQL", icon: <SiMysql />, level: 85 },
                { name: "SQL Queries", icon: <FiDatabase />, level: 90 },
                { name: "Joins & CTEs", icon: <FiDatabase />, level: 80 },
                { name: "Window Functions", icon: <FiTrendingUp />, level: 75 }
            ]
        },
        {
            title: "Analytics Tools",
            icon: <FiPieChart />,
            skills: [
                { name: "Power BI", icon: <FiPieChart />, level: 90 },
                { name: "DAX", icon: <FiBarChart2 />, level: 85 },
                { name: "Data Modelling", icon: <FiDatabase />, level: 80 },
                { name: "ETL", icon: <FiTrendingUp />, level: 80 },
                { name: "Dashboards", icon: <FiBarChart2 />, level: 90 }
            ]
        },
        {
            title: "Excel",
            icon: <FiGrid />,
            skills: [
                { name: "Pivot Tables", icon: <FiGrid />, level: 90 },
                { name: "Lookups", icon: <FiGrid />, level: 85 },
                { name: "Conditional Formatting", icon: <FiGrid />, level: 85 },
                { name: "Data Cleaning", icon: <FiGrid />, level: 90 }
            ]
        }
    ];

    return (
        <section id="skills" className="skills" ref={sectionRef}>
            <div className="container" ref={ref}>
                {/* Section Header */}
                <motion.div style={{ y: headerY }}>
                    <motion.span
                        className="section-label"
                        variants={fromLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        Technical Expertise
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        variants={fromLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        Skills & Tools
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        variants={fromRight}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        Technologies I use to transform data into actionable insights
                    </motion.p>
                </motion.div>

                {/* Skills Grid */}
                <div className="skills-grid">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            className="skill-category glass-card"
                            custom={catIndex}
                            variants={fromBottom}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        >
                            <div className="category-header">
                                <motion.div
                                    className="category-icon"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                                    transition={{ delay: 0.3 + catIndex * 0.1, type: "spring", stiffness: 200 }}
                                >
                                    {category.icon}
                                </motion.div>
                                <h3>{category.title}</h3>
                            </div>

                            <div className="skills-list">
                                {category.skills.map((skill, skillIndex) => (
                                    <SkillBar
                                        key={skillIndex}
                                        skill={skill}
                                        isInView={isInView}
                                        delay={0.4 + skillIndex * 0.1 + catIndex * 0.15}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Individual skill bar with scroll-triggered fill
const SkillBar = ({ skill, isInView, delay }) => {
    const barRef = useRef(null);

    // Track individual bar visibility for more precise animation
    const barInView = useInView(barRef, { once: true, amount: 0.5 });

    return (
        <div className="skill-item" ref={barRef}>
            <div className="skill-info">
                <motion.span
                    className="skill-icon"
                    initial={{ scale: 0 }}
                    animate={barInView ? { scale: 1 } : {}}
                    transition={{ delay: delay * 0.5, type: "spring" }}
                >
                    {skill.icon}
                </motion.span>
                <span className="skill-name">{skill.name}</span>
                <motion.span
                    className="skill-percent"
                    initial={{ opacity: 0 }}
                    animate={barInView ? { opacity: 1 } : {}}
                    transition={{ delay: delay + 0.5 }}
                >
                    {skill.level}%
                </motion.span>
            </div>
            <div className="skill-bar-container">
                <motion.div
                    className="skill-bar"
                    initial={{ width: 0, opacity: 0 }}
                    animate={barInView ? {
                        width: `${skill.level}%`,
                        opacity: 1
                    } : {}}
                    transition={{
                        duration: 1.2,
                        delay: delay,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                />
                {/* Shimmer effect on bar */}
                <motion.div
                    className="skill-bar-shimmer"
                    initial={{ x: '-100%' }}
                    animate={barInView ? { x: '200%' } : {}}
                    transition={{ delay: delay + 0.8, duration: 0.8 }}
                />
            </div>
        </div>
    );
};

export default Skills;
