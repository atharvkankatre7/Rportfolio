import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiExternalLink, FiBarChart, FiPieChart, FiMaximize2 } from 'react-icons/fi';
import { SiPython } from 'react-icons/si';

const Projects = () => {
    const ref = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px", amount: 0.15 });
    const [loadedFrames, setLoadedFrames] = useState({});

    // Scroll progress for the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax for section header
    const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    // Directional reveals
    const titleFromLeft = {
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

    // Staggered card reveal with overlap effect
    const cardVariants = {
        hidden: { opacity: 0, y: 80, scale: 0.95 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    };

    const projects = [
        {
            title: "Uber Car Data Analysis Dashboard",
            problem: "Analyze booking trends and operational efficiency to optimize ride services",
            tools: ["Python", "Pandas", "Power BI"],
            insights: [
                "Identified peak demand hours and high-traffic zones",
                "Analyzed customer behaviour patterns and ride frequency",
                "Built interactive dashboard with KPIs, slicers, and filters"
            ],
            embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiZDY5NzZlMDQtYjRmMS00ZDQxLThkZWQtY2E4OWEyMTUzMDEyIiwidCI6IjkxNjc4NzAxLWNmODQtNDg4MC05YmU5LTJiOGM3YTU5NzY0ZCJ9",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            title: "Stock Market Analytics Dashboard",
            problem: "Identify market trends and volatility patterns for informed trading decisions",
            tools: ["Python", "Power BI", "DAX"],
            insights: [
                "Conducted time-series analysis to identify trends",
                "Calculated moving averages, RSI, and trend indicators",
                "Designed multi-page dashboard comparing bullish/bearish movements"
            ],
            embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiMTMyMzYwOWQtNzhkZi00OWUxLWEyNWEtN2E5MjBkNjBkNWJlIiwidCI6IjkxNjc4NzAxLWNmODQtNDg4MC05YmU5LTJiOGM3YTU5NzY0ZCJ9",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        }
    ];

    const getToolIcon = (tool) => {
        switch (tool.toLowerCase()) {
            case 'python':
            case 'pandas':
                return <SiPython />;
            case 'power bi':
            case 'dax':
                return <FiPieChart />;
            default:
                return <FiBarChart />;
        }
    };

    const handleFrameLoad = (index) => {
        setLoadedFrames(prev => ({ ...prev, [index]: true }));
    };

    return (
        <section id="projects" className="projects" ref={sectionRef}>
            <div className="container" ref={ref}>
                {/* Section Header with parallax */}
                <motion.div
                    className="section-header"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <motion.span
                        className="section-label"
                        variants={titleFromLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        Featured Work
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        variants={titleFromLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        Projects & Dashboards
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        variants={fromRight}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        Interactive Power BI dashboards showcasing real-world data analysis
                    </motion.p>
                </motion.div>

                {/* Project Cards with stacking effect */}
                <div className="projects-list">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            isInView={isInView}
                            cardVariants={cardVariants}
                            getToolIcon={getToolIcon}
                            loadedFrames={loadedFrames}
                            handleFrameLoad={handleFrameLoad}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Separate component for better scroll tracking
const ProjectCard = ({ project, index, isInView, cardVariants, getToolIcon, loadedFrames, handleFrameLoad }) => {
    const cardRef = useRef(null);

    // Individual card scroll progress for horizontal parallax
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Horizontal parallax - image moves opposite to scroll
    const imageX = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const contentX = useTransform(scrollYProgress, [0, 1], [-10, 10]);

    return (
        <motion.div
            ref={cardRef}
            className="project-showcase glass-card"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
                y: -8,
                boxShadow: "0 25px 80px rgba(236, 72, 153, 0.2)",
                transition: { duration: 0.3, ease: "easeOut" }
            }}
        >
            {/* Project Info with subtle horizontal motion */}
            <motion.div className="project-info" style={{ x: contentX }}>
                <motion.div
                    className="project-header-badge"
                    style={{ background: project.gradient }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                >
                    <FiPieChart size={16} />
                    <span>Power BI Dashboard</span>
                </motion.div>

                <motion.h3
                    className="project-title"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.2 }}
                >
                    {project.title}
                </motion.h3>

                <motion.p
                    className="project-problem"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.2 }}
                >
                    {project.problem}
                </motion.p>

                <div className="project-tools">
                    {project.tools.map((tool, i) => (
                        <motion.span
                            key={i}
                            className="tool-badge"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                            transition={{ delay: 0.7 + i * 0.1 + index * 0.2 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                        >
                            {getToolIcon(tool)}
                            {tool}
                        </motion.span>
                    ))}
                </div>

                <div className="project-insights">
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 + index * 0.2 }}
                    >
                        Key Insights
                    </motion.h4>
                    <ul>
                        {project.insights.map((insight, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -15 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.9 + i * 0.1 + index * 0.2 }}
                            >
                                {insight}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <motion.a
                    href={project.embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 + index * 0.2 }}
                >
                    <FiMaximize2 />
                    Open Full Dashboard
                </motion.a>
            </motion.div>

            {/* Project Preview with horizontal parallax */}
            <motion.div
                className="project-preview"
                style={{ x: imageX }}
            >
                <div className="iframe-container">
                    {!loadedFrames[index] && (
                        <div className="iframe-loader">
                            <div className="loader-spinner"></div>
                            <span>Loading Dashboard...</span>
                        </div>
                    )}
                    <iframe
                        title={project.title}
                        src={project.embedUrl}
                        frameBorder="0"
                        allowFullScreen={true}
                        onLoad={() => handleFrameLoad(index)}
                        style={{ opacity: loadedFrames[index] ? 1 : 0 }}
                    />
                </div>
                <motion.a
                    href={project.embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                >
                    <FiExternalLink size={24} />
                    <span>Click to interact</span>
                </motion.a>
            </motion.div>
        </motion.div>
    );
};

export default Projects;
