import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiExternalLink, FiBarChart, FiPieChart, FiMaximize2 } from 'react-icons/fi';
import { SiPython } from 'react-icons/si';

// Smooth stacking project card with realistic physics
const StackingProjectCard = ({ project, index, totalProjects, getToolIcon, loadedFrames, handleFrameLoad }) => {
    const cardRef = useRef(null);

    // Track this card's scroll progress with smoother range
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "start 30%"]
    });

    // Subtle, realistic transforms - reduced values for professional look
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 15, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.3, 0.9, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

    // Very subtle shadow progression (more realistic)
    const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0.05, 0.15]);

    // Subtle horizontal shift for depth perception
    const imageX = useTransform(scrollYProgress, [0, 1], [15, -5]);

    // Z-index increases as cards come into view
    const zIndex = index + 1;

    return (
        <motion.div
            ref={cardRef}
            className="project-showcase glass-card project-stack-card"
            style={{
                y,
                opacity,
                scale,
                zIndex,
                position: 'sticky',
                top: `${100 + index * 30}px`,
                boxShadow: useTransform(
                    shadowOpacity,
                    v => `0 ${10 + index * 5}px ${40 + index * 20}px rgba(0, 0, 0, ${v})`
                )
            }}
            whileHover={{
                y: -4,
                boxShadow: `0 20px 60px rgba(236, 72, 153, 0.18)`,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
        >
            {/* Project Info */}
            <motion.div className="project-info">
                <motion.div
                    className="project-header-badge"
                    style={{
                        background: project.gradient,
                        opacity: useTransform(scrollYProgress, [0.2, 0.5], [0.6, 1])
                    }}
                >
                    <FiPieChart size={16} />
                    <span>Power BI Dashboard</span>
                </motion.div>

                <motion.h3
                    className="project-title"
                    style={{
                        opacity: useTransform(scrollYProgress, [0.15, 0.45], [0, 1])
                    }}
                >
                    {project.title}
                </motion.h3>

                <motion.p
                    className="project-problem"
                    style={{ opacity: useTransform(scrollYProgress, [0.25, 0.55], [0, 1]) }}
                >
                    {project.problem}
                </motion.p>

                <div className="project-tools">
                    {project.tools.map((tool, i) => (
                        <motion.span
                            key={i}
                            className="tool-badge"
                            style={{
                                opacity: useTransform(scrollYProgress, [0.35 + i * 0.05, 0.55 + i * 0.05], [0, 1])
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {getToolIcon(tool)}
                            {tool}
                        </motion.span>
                    ))}
                </div>

                <div className="project-insights">
                    <motion.h4 style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}>
                        Key Insights
                    </motion.h4>
                    <ul>
                        {project.insights.map((insight, i) => (
                            <motion.li
                                key={i}
                                style={{
                                    opacity: useTransform(scrollYProgress, [0.45 + i * 0.05, 0.65 + i * 0.05], [0, 1])
                                }}
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
                    style={{
                        opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1])
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FiMaximize2 />
                    Open Full Dashboard
                </motion.a>
            </motion.div>

            {/* Project Preview with subtle parallax */}
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

const Projects = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const [loadedFrames, setLoadedFrames] = useState({});

    // Section scroll progress
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Smooth header animations
    const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
    const headerY = useTransform(scrollYProgress, [0, 0.12], [30, 0]);

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
            <div className="container" ref={containerRef}>
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    style={{ opacity: headerOpacity, y: headerY }}
                >
                    <span className="section-label">Featured Work</span>
                    <h2 className="section-title">Projects & Dashboards</h2>
                    <p className="section-subtitle">
                        Interactive Power BI dashboards showcasing real-world data analysis
                    </p>
                </motion.div>

                {/* Stacking Project Cards */}
                <div className="projects-stack-container">
                    {projects.map((project, index) => (
                        <StackingProjectCard
                            key={index}
                            project={project}
                            index={index}
                            totalProjects={projects.length}
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

export default Projects;
