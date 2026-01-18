import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { FiDatabase, FiBarChart2, FiCode, FiTarget } from 'react-icons/fi';

// Individual paragraph line with scroll-linked animation
const ScrollRevealLine = ({ line, index, containerRef }) => {
    const lineRef = useRef(null);

    // Track this line's scroll progress
    const { scrollYProgress } = useScroll({
        target: lineRef,
        offset: ["start 90%", "start 50%"]
    });

    // Transform values based on scroll - REVERSES when scrolling back
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const blur = useTransform(scrollYProgress, [0, 1], [4, 0]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [line.tilt, 0]);

    // Direction-based transforms
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [line.direction === 'left' ? -80 : line.direction === 'right' ? 80 : 0, 0]
    );
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [line.direction === 'up' ? 50 : 0, 0]
    );

    return (
        <motion.p
            ref={lineRef}
            className={`about-line about-line-${line.direction}`}
            style={{
                opacity,
                x,
                y,
                rotateX,
                filter: useTransform(blur, v => `blur(${v}px)`),
                transformStyle: 'preserve-3d'
            }}
        >
            {line.text}
            <strong>{line.highlight}</strong>
            {line.suffix}
            {line.highlight2 && <strong>{line.highlight2}</strong>}
            {line.suffix2}
        </motion.p>
    );
};

// Individual card with scroll-linked stacking effect
const ScrollStackCard = ({ item, index, containerRef }) => {
    const cardRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start 95%", "start 60%"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);

    return (
        <motion.div
            ref={cardRef}
            className="highlight-card glass-card"
            style={{
                opacity,
                y,
                scale,
                rotateX,
                transformStyle: 'preserve-3d'
            }}
            whileHover={{
                y: -10,
                scale: 1.03,
                rotateY: 5,
                boxShadow: "0 20px 50px rgba(236, 72, 153, 0.2)",
                transition: { duration: 0.3 }
            }}
        >
            <motion.div
                className="highlight-icon"
                style={{
                    scale: useTransform(scrollYProgress, [0.3, 1], [0, 1]),
                    rotate: useTransform(scrollYProgress, [0.3, 1], [-180, 0])
                }}
            >
                {item.icon}
            </motion.div>
            <motion.h3 style={{ opacity: useTransform(scrollYProgress, [0.5, 1], [0, 1]) }}>
                {item.title}
            </motion.h3>
            <motion.p style={{ opacity: useTransform(scrollYProgress, [0.6, 1], [0, 1]) }}>
                {item.description}
            </motion.p>
        </motion.div>
    );
};

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const cardsRef = useRef(null);

    // Section scroll progress for overlay/masking effects
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax and mask effects
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.3]);
    const contentY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);
    const maskReveal = useTransform(scrollYProgress, [0.05, 0.2], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);

    // Header scroll-linked animations
    const headerOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
    const headerX = useTransform(scrollYProgress, [0.05, 0.15], [-40, 0]);
    const subtitleX = useTransform(scrollYProgress, [0.08, 0.18], [40, 0]);

    // Paragraph lines with alternating directions + tilt
    const paragraphLines = [
        {
            text: "I'm a Data Analyst skilled in ",
            highlight: "Python, SQL, Power BI, and Excel",
            suffix: ", dedicated to transforming raw data into meaningful insights and intuitive dashboards.",
            direction: "up",
            tilt: 10
        },
        {
            text: "With experience at ",
            highlight: "Spordia Softech",
            suffix: ", I've developed interactive dashboards that monitor business KPIs, automated reporting processes improving delivery time by ",
            highlight2: "40%",
            suffix2: ", and collaborated with teams to provide actionable insights.",
            direction: "left",
            tilt: -8
        },
        {
            text: "I hold an ",
            highlight: "MCA from VP Institute Sangli",
            suffix: " and have completed certifications in Data Analytics using Python and Power BI Dashboard Design.",
            direction: "right",
            tilt: 8
        }
    ];

    const highlights = [
        {
            icon: <FiDatabase />,
            title: "Data Engineering",
            description: "Cleaning, preprocessing, and transforming raw data using Python and SQL"
        },
        {
            icon: <FiBarChart2 />,
            title: "Visualization",
            description: "Building interactive Power BI dashboards to monitor KPIs and trends"
        },
        {
            icon: <FiCode />,
            title: "Analytics",
            description: "Performing EDA and statistical analysis to uncover actionable insights"
        },
        {
            icon: <FiTarget />,
            title: "Problem Solving",
            description: "Translating business questions into data-driven solutions"
        }
    ];

    return (
        <section id="about" className="about" ref={sectionRef}>
            {/* Overlay mask effect */}
            <motion.div
                className="section-mask"
                style={{ clipPath: maskReveal }}
            />

            <motion.div
                className="container"
                style={{ opacity: sectionOpacity, y: contentY }}
            >
                {/* Section Header - scroll linked */}
                <motion.span
                    className="section-label"
                    style={{ opacity: headerOpacity, x: headerX }}
                >
                    About Me
                </motion.span>
                <motion.h2
                    className="section-title"
                    style={{ opacity: headerOpacity, x: headerX }}
                >
                    Transforming Data into Decisions
                </motion.h2>
                <motion.p
                    className="section-subtitle"
                    style={{ opacity: headerOpacity, x: subtitleX }}
                >
                    Data Analyst with a passion for uncovering insights and telling compelling data stories
                </motion.p>

                {/* About Content with scroll-driven text reveal */}
                <div className="about-content" ref={textRef}>
                    <div className="about-text" style={{ perspective: '1000px' }}>
                        {paragraphLines.map((line, index) => (
                            <ScrollRevealLine
                                key={index}
                                line={line}
                                index={index}
                                containerRef={textRef}
                            />
                        ))}
                    </div>
                </div>

                {/* Sticky Stacked Cards - scroll linked */}
                <div
                    className="about-highlights"
                    ref={cardsRef}
                    style={{ perspective: '1200px' }}
                >
                    {highlights.map((item, index) => (
                        <ScrollStackCard
                            key={index}
                            item={item}
                            index={index}
                            containerRef={cardsRef}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Bottom overlay for next section transition */}
            <motion.div
                className="section-overlay-bottom"
                style={{
                    opacity: useTransform(scrollYProgress, [0.7, 1], [0, 0.8])
                }}
            />
        </section>
    );
};

export default About;
