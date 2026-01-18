import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (href) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="navbar-container">
                <motion.a
                    href="#hero"
                    className="navbar-logo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    <span className="logo-icon">RB</span>
                    <span className="logo-text">Radhika</span>
                </motion.a>

                <div className="navbar-links">
                    {navItems.map((item, index) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            className="nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.href);
                            }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.4 }}
                            whileHover={{ y: -2 }}
                        >
                            {item.label}
                        </motion.a>
                    ))}
                </div>

                <motion.a
                    href="/Radhika_Bhagare_Resume.pdf"
                    className="btn btn-primary navbar-cta"
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiDownload size={16} />
                    Resume
                </motion.a>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                className="mobile-nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * index }}
                            >
                                {item.label}
                            </motion.a>
                        ))}
                        <a
                            href="/Radhika_Bhagare_Resume.pdf"
                            className="btn btn-primary mobile-resume-btn"
                            download
                        >
                            <FiDownload size={16} />
                            Download Resume
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
