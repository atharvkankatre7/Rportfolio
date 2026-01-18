import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiDatabase, FiBarChart2, FiCode, FiTarget } from 'react-icons/fi';

const About = () => {
    const ref = useRef(null);
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.15 });
    const cardsInView = useInView(cardsRef, { once: true, margin: "-100px", amount: 0.2 });

    // Section scroll progress for overlay/masking effects
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax and mask effects
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
    const contentY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
    const maskReveal = useTransform(scrollYProgress, [0.1, 0.3], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);

    // Paragraph lines with alternating directions + tilt
    const paragraphLines = [
        {
            text: "I'm a Data Analyst skilled in ",
            highlight: "Python, SQL, Power BI, and Excel",
            suffix: ", dedicated to transforming raw data into meaningful insights and intuitive dashboards.",
            direction: "up",
            tilt: 3
        },
        {
            text: "With experience at ",
            highlight: "Spordia Softech",
            suffix: ", I've developed interactive dashboards that monitor business KPIs, automated reporting processes improving delivery time by ",
            highlight2: "40%",
            suffix2: ", and collaborated with teams to provide actionable insights.",
            direction: "left",
            tilt: -2
        },
        {
            text: "I hold an ",
            highlight: "MCA from VP Institute Sangli",
            suffix: " and have completed certifications in Data Analytics using Python and Power BI Dashboard Design.",
            direction: "right",
            tilt: 2
        }
    ];

    // Direction-based variants with tilt
    const getLineVariant = (direction, tilt, index) => ({
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
            y: direction === 'up' ? 30 : direction === 'scale' ? 0 : 0,
            rotateX: tilt,
            scale: direction === 'scale' ? 0.95 : 1
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    });

    // Sticky stacked card animation
    const cardStackVariants = {
        hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    };

    // Header variants
    const headerFromLeft = {
        hidden: { opacity: 0, x: -40, rotateY: -5 },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const headerFromRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

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
                ref={ref}
                style={{ opacity: sectionOpacity, y: contentY }}
            >
                {/* Section Header */}
                <motion.span
                    className="section-label"
                    variants={headerFromLeft}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    About Me
                </motion.span>
                <motion.h2
                    className="section-title"
                    variants={headerFromLeft}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    Transforming Data into Decisions
                </motion.h2>
                <motion.p
                    className="section-subtitle"
                    variants={headerFromRight}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    Data Analyst with a passion for uncovering insights and telling compelling data stories
                </motion.p>

                {/* About Content with scroll-driven text reveal */}
                <div className="about-content">
                    <div className="about-text" style={{ perspective: '1000px' }}>
                        {paragraphLines.map((line, index) => (
                            <motion.p
                                key={index}
                                className="about-line"
                                custom={index}
                                variants={getLineVariant(line.direction, line.tilt, index)}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {line.text}
                                <strong>{line.highlight}</strong>
                                {line.suffix}
                                {line.highlight2 && <strong>{line.highlight2}</strong>}
                                {line.suffix2}
                            </motion.p>
                        ))}
                    </div>
                </div>

                {/* Sticky Stacked Cards */}
                <motion.div
                    className="about-highlights"
                    ref={cardsRef}
                    style={{ perspective: '1200px' }}
                >
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            className="highlight-card glass-card"
                            custom={index}
                            variants={cardStackVariants}
                            initial="hidden"
                            animate={cardsInView ? "visible" : "hidden"}
                            whileHover={{
                                y: -10,
                                scale: 1.03,
                                rotateY: 5,
                                boxShadow: "0 20px 50px rgba(236, 72, 153, 0.2)",
                                transition: { duration: 0.3 }
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <motion.div
                                className="highlight-icon"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={cardsInView ? { scale: 1, rotate: 0 } : {}}
                                transition={{
                                    delay: 0.3 + index * 0.15,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 12
                                }}
                            >
                                {item.icon}
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + index * 0.15 }}
                            >
                                {item.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={cardsInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.5 + index * 0.15 }}
                            >
                                {item.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
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
