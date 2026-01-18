import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const [lineDrawn, setLineDrawn] = useState(false);

    // Parallax scroll effect - different speeds for depth
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax transforms - background moves slower, content faster
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const contentScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
    const dataLineX = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

    useEffect(() => {
        const timer = setTimeout(() => setLineDrawn(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // Staggered reveal with directional flow
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3
            }
        }
    };

    // Different directions for text reveal
    const titleFromLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const subtitleFromRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const fromBottom = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    // Floating animation
    const floatVariants = {
        animate: {
            y: [-6, 6, -6],
            rotate: [-1, 1, -1],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // CTA glow pulse
    const glowPulse = {
        initial: { boxShadow: "0 4px 20px rgba(236, 72, 153, 0.4)" },
        animate: {
            boxShadow: [
                "0 4px 20px rgba(236, 72, 153, 0.4)",
                "0 4px 40px rgba(236, 72, 153, 0.6)",
                "0 4px 20px rgba(236, 72, 153, 0.4)"
            ],
            transition: { duration: 2, delay: 1.5, times: [0, 0.5, 1] }
        }
    };

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="hero" ref={containerRef}>
            {/* Parallax Background Layer - moves slower */}
            <motion.div
                className="hero-parallax-bg"
                style={{ y: backgroundY }}
            >
                <div className="parallax-shape shape-1" />
                <div className="parallax-shape shape-2" />
                <div className="parallax-shape shape-3" />
            </motion.div>

            {/* Animated Data Line with horizontal parallax */}
            <motion.svg
                className="hero-data-line"
                viewBox="0 0 1000 120"
                preserveAspectRatio="none"
                style={{ x: dataLineX }}
            >
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                        <stop offset="30%" stopColor="#ec4899" stopOpacity="0.6" />
                        <stop offset="70%" stopColor="#f472b6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Primary line */}
                <motion.path
                    d="M0,60 Q125,30 250,70 T500,50 T750,65 T1000,40"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: lineDrawn ? 1 : 0,
                        opacity: lineDrawn ? 1 : 0
                    }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                />
                {/* Secondary line */}
                <motion.path
                    d="M0,80 Q200,50 400,85 T800,55 T1000,75"
                    fill="none"
                    stroke="url(#lineGradient2)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: lineDrawn ? 1 : 0,
                        opacity: lineDrawn ? 0.5 : 0
                    }}
                    transition={{ duration: 3, delay: 0.3, ease: "easeOut" }}
                />
                {/* Data points */}
                {[250, 500, 750].map((cx, i) => (
                    <motion.circle
                        key={i}
                        cx={cx}
                        cy={i === 1 ? 50 : 65}
                        r="4"
                        fill="#ec4899"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: lineDrawn ? 1 : 0,
                            opacity: lineDrawn ? 0.8 : 0
                        }}
                        transition={{ delay: 1.5 + i * 0.2, duration: 0.4, type: "spring" }}
                    />
                ))}
            </motion.svg>

            {/* Main Content with parallax foreground */}
            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    y: foregroundY,
                    opacity: contentOpacity,
                    scale: contentScale
                }}
                ref={ref}
            >
                {/* Profile Image */}
                <motion.div className="hero-image-container" variants={fromBottom}>
                    <motion.div
                        className="hero-image-wrapper"
                        variants={floatVariants}
                        animate="animate"
                    >
                        <motion.img
                            src="/radhika-photo.jpeg"
                            alt="Radhika Bhagare"
                            className="hero-image"
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className="hero-image-ring"></div>
                        <div className="hero-image-ring ring-2"></div>
                    </motion.div>
                    <motion.div
                        className="hero-badge"
                        initial={{ scale: 0, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <span>👋</span> Hello!
                    </motion.div>
                </motion.div>

                {/* Title slides from LEFT */}
                <motion.h1 className="hero-title" variants={titleFromLeft}>
                    I'm <span className="highlight">Radhika Bhagare</span>,
                    <br />
                    <motion.span
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                    >
                        turning data into decisions.
                    </motion.span>
                </motion.h1>

                {/* Subtitle slides from RIGHT */}
                <motion.p className="hero-subtitle" variants={subtitleFromRight}>
                    Data Analyst crafting meaningful insights through
                    <motion.span
                        className="tech-highlight"
                        whileHover={{ scale: 1.1, color: "#ec4899" }}
                        style={{ display: 'inline-block' }}
                    > Python</motion.span>,
                    <motion.span
                        className="tech-highlight"
                        whileHover={{ scale: 1.1, color: "#ec4899" }}
                        style={{ display: 'inline-block' }}
                    > SQL</motion.span>, and
                    <motion.span
                        className="tech-highlight"
                        whileHover={{ scale: 1.1, color: "#ec4899" }}
                        style={{ display: 'inline-block' }}
                    > Power BI</motion.span>
                </motion.p>

                {/* CTAs rise from BOTTOM */}
                <motion.div className="hero-cta" variants={fromBottom}>
                    <motion.button
                        className="btn btn-primary"
                        onClick={scrollToProjects}
                        initial="initial"
                        animate="animate"
                        variants={glowPulse}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <motion.span
                            animate={{ y: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <FiArrowDown />
                        </motion.span>
                        View Projects
                    </motion.button>
                    <motion.a
                        href="/Radhika_Bhagare_Resume.pdf"
                        className="btn btn-secondary"
                        download
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <FiDownload />
                        Download Resume
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div className="hero-social" variants={fromBottom}>
                    {[
                        { href: "https://www.linkedin.com/in/radhikabhagare", icon: <FiLinkedin /> },
                        { href: "https://github.com/radhikabhagare", icon: <FiGithub /> }
                    ].map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            whileHover={{ y: -4, scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                style={{ opacity: contentOpacity }}
            >
                <motion.div
                    className="scroll-mouse"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <motion.div
                        className="scroll-wheel"
                        animate={{ opacity: [1, 0.3, 1], y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
                <motion.span
                    className="scroll-text"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Scroll down
                </motion.span>
            </motion.div>
        </section>
    );
};

export default Hero;
