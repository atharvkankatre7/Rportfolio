import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiDownload, FiHeart, FiCheck } from 'react-icons/fi';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px", amount: 0.2 });
    const [downloadState, setDownloadState] = useState('idle'); // idle, downloading, done

    // Section reveal - 20px → 0, 500-700ms
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const handleDownload = () => {
        setDownloadState('downloading');
        // Simulate download and show feedback
        setTimeout(() => {
            setDownloadState('done');
            // Reset after showing success
            setTimeout(() => setDownloadState('idle'), 2000);
        }, 500);
    };

    const contactInfo = [
        {
            icon: <FiMail />,
            label: "Email",
            value: "radhikabhagare2337@gmail.com",
            href: "mailto:radhikabhagare2337@gmail.com"
        },
        {
            icon: <FiPhone />,
            label: "Phone",
            value: "+91 9373903707",
            href: "tel:+919373903707"
        },
        {
            icon: <FiMapPin />,
            label: "Location",
            value: "India",
            href: null
        }
    ];

    const socialLinks = [
        {
            icon: <FiLinkedin />,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/radhikabhagare"
        },
        {
            icon: <FiGithub />,
            label: "GitHub",
            href: "https://github.com/radhikabhagare"
        }
    ];

    return (
        <section id="contact" className="contact" ref={ref}>
            <motion.div
                className="container"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.span className="section-label" variants={sectionVariants}>
                    Get In Touch
                </motion.span>
                <motion.h2 className="section-title" variants={sectionVariants}>
                    Let's Connect
                </motion.h2>
                <motion.p className="section-subtitle" variants={sectionVariants}>
                    I'm always open to discussing data analytics opportunities and collaborations
                </motion.p>

                <div className="contact-content">
                    <motion.div
                        className="contact-info-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={index}
                                className="contact-card glass-card"
                                variants={cardVariants}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <motion.div
                                    className="contact-icon"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                    transition={{ delay: 0.15 * index + 0.3, duration: 0.4 }}
                                >
                                    {item.icon}
                                </motion.div>
                                <span className="contact-label">{item.label}</span>
                                {item.href ? (
                                    <a href={item.href} className="contact-value">
                                        {item.value}
                                    </a>
                                ) : (
                                    <span className="contact-value">{item.value}</span>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="contact-actions"
                        variants={sectionVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {/* Resume download with feedback animation */}
                        <motion.a
                            href="/Radhika_Bhagare_Resume.pdf"
                            className={`btn btn-primary btn-lg download-btn ${downloadState}`}
                            download
                            onClick={handleDownload}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.span
                                className="download-icon"
                                animate={{
                                    rotate: downloadState === 'downloading' ? 360 : 0,
                                    scale: downloadState === 'done' ? [1, 1.2, 1] : 1
                                }}
                                transition={{
                                    duration: downloadState === 'downloading' ? 0.6 : 0.3,
                                    repeat: downloadState === 'downloading' ? Infinity : 0
                                }}
                            >
                                {downloadState === 'done' ? <FiCheck /> : <FiDownload />}
                            </motion.span>
                            <span className="download-text">
                                {downloadState === 'done' ? 'Resume Downloaded!' : 'Download Resume'}
                            </span>
                        </motion.a>

                        <div className="social-links">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn"
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    title={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.1 * index + 0.5 }}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.footer
                className="footer"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
            >
                <p>
                    Designed & Built with <FiHeart className="heart-icon" /> by Radhika Bhagare
                </p>
                <p className="footer-year">© {new Date().getFullYear()} All Rights Reserved</p>
            </motion.footer>
        </section>
    );
};

export default Contact;
