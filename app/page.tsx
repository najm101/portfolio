'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import natgasScreenshots from '../public/static/natgas_screenshots.png';
import avatar from '../public/static/avatar.png';
import { image } from 'framer-motion/client';

export default function Page() {
    const [activeTab, setActiveTab] = useState('about');
    const [theme, setTheme] = useState('dark');
    const [view, setView] = useState('main'); // 'main' or 'projects'

    const projects = [
        {
            name: 'Roze Moon',
            date: 'July 2024 - Present',
            image: null,
            description:
                'Roze Moon makes it easy to order fresh flowers with beautiful bouquets, bulk orders, and quick delivery. Browse a variety of designs and enjoy hassle-free gifting for any occasion',
            details: [
                'Used Bloc for state management',
                'Converted designs into pixel-perfect UIs',
                'Integrated REST APIs and managed JWT tokens securely',
                'Developed shopping features with animations',
                'Optimized performance with caching and efficient state management',
                'Led GitHub projects and ensured best practices',
                'Conducted testing and prepared the app for deployment',
                'Integrated Payfort payment gateway with the backend team',
            ],

            links: {
                website: 'https://www.rozemoon.com',
                appStore: 'https://apps.apple.com/us/app/roze-moon/id6739536345',
                playStore: 'https://play.google.com/store/apps/details?id=com.rozemoon.app',
            },
        },
        {
            name: 'NATGAS',
            date: 'December 2023 - January 2024',
            image: natgasScreenshots,
            description:
                'Developed an unofficial iOS NATGAS app using Flutter to provide NATGAS customers with a seamless experience for managing gas services.',
            url: {
                label: 'Apple TestFlight',
                href: 'https://testflight.apple.com/join/6YQ4wEgF',
            },
        },
        {
            name: 'SteamDeck: Game Compatibility',
            date: 'Oct 2022 - Present',
            image: null,
            description:
                'An app for Steam Deck console gamers that provides compatibility details for thousands of Steam games.',
            url: {
                label: 'Play Store',
                href: 'https://play.google.com/store/apps/details?id=com.negm.deck_verfied_checker',
            },
        },
        {
            name: 'University Bus Tracker | FYP',
            date: 'April 2022 - August 2022',
            image: null,
            description:
                'My university final year project. An app that allows university students and staff to track the real-time location of buses.',
        },
    ];

    useEffect(() => {
        // Get initial theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            setTheme(systemTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const renderProjects = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full"
            data-oid="oete588"
        >
            <div className="max-w-6xl mx-auto" data-oid="e027pfh">
                <header className="text-center mb-12" data-oid="0xjzypw">
                    <h1 className="text-4xl font-bold mb-4" data-oid="1v8blcm">
                        My Projects
                    </h1>
                    <button
                        onClick={() => setView('main')}
                        className="text-yellow-500 hover:text-yellow-400 flex items-center gap-2 mx-auto"
                        data-oid="lljybq7"
                    >
                        ← Back to Home
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" data-oid="t9n8asl">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`backdrop-blur-lg rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 grid ${theme === 'dark' ? 'bg-white/10' : 'bg-white/60'}`}
                            data-oid="cmxk7s_"
                        >
                            <div data-oid="km9okqc">
                                <h2 className="text-2xl font-bold mb-2" data-oid="4npf17n">
                                    {project.name}
                                </h2>
                                <p className="text-gray-400 mb-4" data-oid="ebqf.1-">
                                    {project.date}
                                </p>
                                {project.image != null ? (
                                    <Image
                                        src={project.image!}
                                        alt={project.name}
                                        className="rounded-xl pt-1 mb-2"
                                        data-oid="hkdenj2"
                                    />
                                ) : null}
                                <p
                                    className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                                    data-oid="6:zri3c"
                                >
                                    {project.description}
                                </p>
                            </div>

                            <div
                                className="mt-4 flex flex-wrap items-end gap-3 "
                                data-oid="fi8m4b_"
                            >
                                {project.details && (
                                    <ul
                                        className="mt-4 space-y-2 list-disc list-inside"
                                        data-oid="m7.ay2j"
                                    >
                                        {project.details.map((detail, index) => (
                                            <li
                                                key={index}
                                                className={
                                                    theme === 'dark'
                                                        ? 'text-gray-300'
                                                        : 'text-gray-600'
                                                }
                                                data-oid="wlv4pks"
                                            >
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div
                                    className="mt-4 flex flex-wrap items-end gap-3 "
                                    data-oid="ga3.597"
                                >
                                    {project.links?.website && (
                                        <a
                                            href={project.links.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                            data-oid="ow_xaey"
                                        >
                                            <span data-oid="k:q.zc.">Website</span>
                                        </a>
                                    )}
                                    {project.links?.appStore && (
                                        <a
                                            href={project.links.appStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                            data-oid="dm3yf78"
                                        >
                                            <span data-oid="..os9cp">App Store</span>
                                        </a>
                                    )}
                                    {project.links?.playStore && (
                                        <a
                                            href={project.links.playStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                            data-oid="_53e5py"
                                        >
                                            <span data-oid="mxi79:k">Play Store</span>
                                        </a>
                                    )}
                                    {project.url && (
                                        <a
                                            href={project.url.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                            data-oid="6x4u1ux"
                                        >
                                            {project.url.label}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );

    return (
        <AnimatePresence mode="wait" data-oid="_yuxro_">
            {view === 'projects' ? (
                <div
                    key="projects"
                    className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-yellow-900 via-amber-800 to-yellow-700 text-white' : 'bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-100 text-gray-900'} p-4 sm:p-8`}
                    data-oid="vp-.gu9"
                >
                    {renderProjects()}
                </div>
            ) : (
                <div
                    key="main"
                    className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-yellow-900 via-amber-800 to-yellow-700 text-white' : 'bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-100 text-gray-900'} p-8`}
                    data-oid="g9z9kwg"
                >
                    <div className="max-w-6xl mx-auto" data-oid="2:65b.u">
                        <div
                            className="flex flex-col items-center mb-12 sm:mb-20 pt-12 sm:pt-20 relative"
                            data-oid="ok8f0lt"
                        >
                            <div className="relative" data-oid="592-4-w">
                                <div
                                    className="w-40 h-40 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 animate-pulse absolute -z-10 blur-xl"
                                    data-oid="80h4a:m"
                                ></div>
                                <Image
                                    src={avatar}
                                    alt="Profile"
                                    className="w-40 h-40 rounded-full border-4 border-white shadow-xl"
                                    data-oid="xjyhzia"
                                />
                            </div>
                            <div
                                className="absolute top-0 flex flex-row sm:flex-row gap-4 p-4 sm:p-0"
                                data-oid="bry0dl4"
                            >
                                <a
                                    href="https://rxresu.me/negm/flutter"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white transition-all duration-300 flex items-center gap-2"
                                    data-oid="a105_4."
                                >
                                    <span data-oid="6f8xbgs">Resume</span>
                                    <span data-oid="yq5xvrd">📄</span>
                                </a>
                                <a
                                    href="https://wa.me/201023741643"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white transition-all duration-300 flex items-center gap-2"
                                    data-oid="dsc:xl3"
                                >
                                    <span data-oid="vzo89:x">WhatsApp</span>
                                    <span data-oid="4yao0ne">💬</span>
                                </a>
                            </div>
                            <h1
                                className="text-3xl sm:text-4xl md:text-6xl font-bold mt-6 sm:mt-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-500"
                                data-oid="lzfafwd"
                            >
                                Abdelrahman Negm
                            </h1>
                            <p
                                className={`text-xl mt-4 ${theme == `dark` ? `text-gray-300` : `text-gray-600`}`}
                                data-oid="7wg-o2t"
                            >
                                Flutter Developer
                            </p>
                            <div
                                className="flex flex-col items-center mt-3 sm:mt-4 space-y-2"
                                data-oid="0d0y2xg"
                            >
                                <p
                                    className={theme == 'dark' ? 'text-gray-300' : 'text-gray-600'}
                                    data-oid="kd4w8cf"
                                >
                                    📧 bodinegem@gmail.com
                                </p>
                                <p
                                    className={theme == 'dark' ? 'text-gray-300' : 'text-gray-600'}
                                    data-oid="r6r8c4l"
                                >
                                    📱 +20 102 3741643
                                </p>
                                <p
                                    className={theme == 'dark' ? 'text-gray-300' : 'text-gray-600'}
                                    data-oid="_ih196k"
                                >
                                    📍 6th of October, Egypt
                                </p>
                            </div>
                        </div>
                        <nav
                            className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-16 px-4"
                            data-oid="7merfd_"
                        >
                            <button
                                onClick={toggleTheme}
                                className={`p-3 rounded-full transition-all duration-300 ${
                                    theme === 'dark'
                                        ? 'bg-white/10 hover:bg-white/20'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                                aria-label="Toggle theme"
                                data-oid="mptyi1q"
                            >
                                {theme === 'dark' ? '🌙' : '☀️'}
                            </button>
                            {[
                                { id: 'about', label: 'About' },
                                { id: 'projects', label: 'Projects' },
                                { id: 'skills', label: 'Skills' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        const element = document.getElementById(item.id);
                                        if (element) {
                                            element.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'start',
                                            });
                                        }
                                    }}
                                    className={`px-4 sm:px-6 py-2 rounded-full text-base sm:text-lg transition-all duration-300 ${
                                        activeTab === item.id
                                            ? 'bg-white text-yellow-900 shadow-lg transform -translate-y-1'
                                            : `${theme == 'dark' ? 'text-white' : 'text-gray-600'} hover:bg-white/10`
                                    }`}
                                    data-oid="d2jr.-4"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                            data-oid="js2f-9b"
                        >
                            <div
                                id="about"
                                className={`backdrop-blur-lg rounded-3xl p-5 sm:p-8 hover:transform hover:scale-105 transition-all duration-300 col-span-2 ${theme === 'dark' ? 'bg-white/10' : 'bg-white/60'}`}
                                data-oid="dfpkfei"
                            >
                                <h2 className="text-2xl font-bold mb-4" data-oid=".o9lxw_">
                                    About Me
                                </h2>
                                <p
                                    className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                                    data-oid="62:m4nm"
                                >
                                    I&apos;m a motivated Software Developer with a focus on creating
                                    intuitive user interfaces and high-performance applications. I
                                    have a strong foundation in mobile app development and a keen
                                    interest in clean, readable, and testable code. Ready for
                                    full-time, I value collaboration and professional growth. I have
                                    successfully published projects, showcasing my ability to
                                    deliver quality applications.
                                </p>
                            </div>
                            <div
                                id="skills"
                                className={`backdrop-blur-lg rounded-3xl p-5 sm:p-6 md:p-8 hover:transform hover:scale-105 transition-all duration-300 col-span-2 md:col-span-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-white/60'}`}
                                data-oid="4.g2s6x"
                            >
                                <h2 className="text-2xl font-bold mb-4" data-oid="9m0s3n0">
                                    Skills
                                </h2>
                                <div className="flex flex-wrap gap-2" data-oid="o_7dc46">
                                    {[
                                        'Flutter',
                                        'Bloc',
                                        'GetX',
                                        'REST API',
                                        'Clean Architecture',
                                        'AWS',
                                        'Firebase',
                                        'Git',
                                        'CI/CD',
                                        'Figma',
                                        'SQL',
                                        'Python',
                                        'Java',
                                        'Kotlin',
                                    ].map((skill) => (
                                        <span
                                            key={skill}
                                            className={`px-4 py-2 ${theme == 'dark' ? 'bg-white/20' : 'bg-white/80'} rounded-full`}
                                            data-oid="svff2ag"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div
                                id="projects"
                                className={`backdrop-blur-lg rounded-3xl p-6 md:p-8 hover:transform hover:scale-105 transition-all duration-300 col-span-2 md:col-span-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-white/60'}`}
                                data-oid="plppr.6"
                            >
                                <h2 className="text-2xl font-bold mb-4" data-oid="hd.aac8">
                                    Latest Project
                                </h2>
                                <div className="mb-4" data-oid="7bgl-5l">
                                    <Image
                                        sizes="100vw"
                                        // Make the image display full width
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                        }}
                                        src={natgasScreenshots}
                                        alt="Roze Moon"
                                        className="object-cover rounded-xl"
                                        data-oid="hi0bkq:"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold" data-oid="dvhltp-">
                                    NATGAS iOS App
                                </h3>
                                <p
                                    className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                                    data-oid="ha-9-h5"
                                >
                                    An unofficial iOS NATGAS app using Flutter, providing a seamless
                                    experience for managing gas services.
                                </p>
                                <div
                                    className="mt-4 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center"
                                    data-oid="f7iwwb2"
                                >
                                    <a
                                        href="https://testflight.apple.com/join/6YQ4wEgF"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
                                        data-oid="dkn5pgx"
                                    >
                                        Try on TestFlight
                                    </a>
                                    <a
                                        onClick={() => {
                                            setView('projects');
                                            window.scrollTo(0, 0);
                                        }}
                                        className="text-yellow-500 hover:text-yellow-400 flex items-center justify-center gap-2 cursor-pointer"
                                        data-oid="0dm9yh6"
                                    >
                                        More Projects →
                                    </a>
                                </div>
                            </div>

                            <div
                                id="experience"
                                className={`backdrop-blur-lg rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 ${theme === 'dark' ? 'bg-white/10' : 'bg-white/60'} col-span-2`}
                                data-oid="wxlx.7r"
                            >
                                <h2 className="text-2xl font-bold mb-6" data-oid="ix_2u14">
                                    Experience
                                </h2>
                                <div className="space-y-8" data-oid="lhtw9yd">
                                    <div data-oid="c:9yjae">
                                        <div
                                            className="flex justify-between items-start mb-2"
                                            data-oid=":ttz2ut"
                                        >
                                            <div data-oid="ndgesnr">
                                                <h3
                                                    className="text-xl font-semibold"
                                                    data-oid="z2asgq5"
                                                >
                                                    Lead Junior Flutter Developer
                                                </h3>
                                                <p className="text-yellow-500" data-oid="hs2ccr5">
                                                    Tuwaiq
                                                </p>
                                            </div>
                                            <div className="text-right" data-oid="4d6gr8g">
                                                <p
                                                    className={
                                                        theme === 'dark'
                                                            ? 'text-gray-300'
                                                            : 'text-gray-600'
                                                    }
                                                    data-oid="_mnnl_r"
                                                >
                                                    April 2024 - Present
                                                </p>
                                                <p
                                                    className="text-sm text-gray-400"
                                                    data-oid="cuth:nh"
                                                >
                                                    Al Sheikh Zayed, Egypt
                                                </p>
                                            </div>
                                        </div>
                                        <ul
                                            className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                                            data-oid="t1pqhqe"
                                        >
                                            <li data-oid="0tp-71-">
                                                Developed an e-commerce app using Flutter
                                            </li>
                                            <li data-oid="xg7uj_g">
                                                Improved UI/UX through user behaviour analysis
                                            </li>
                                            <li data-oid="n998u00">
                                                Created a CI/CD pipeline to streamline deployment
                                                processes
                                            </li>
                                            <li data-oid="vfanwlb">
                                                Trained fellow developers on Git and CI/CD practices
                                            </li>
                                            <li data-oid="moqi4:l">
                                                Implemented project tracking software in the
                                                development cycle
                                            </li>
                                        </ul>
                                    </div>

                                    <div data-oid="s7efs4.">
                                        <div
                                            className="flex justify-between items-start mb-2"
                                            data-oid="m31cws2"
                                        >
                                            <div data-oid="07m7tht">
                                                <h3
                                                    className="text-xl font-semibold"
                                                    data-oid="_l5hci4"
                                                >
                                                    Intern Flutter Developer
                                                </h3>
                                                <p className="text-yellow-500" data-oid="g-qwo7i">
                                                    Vimigo Technologies
                                                </p>
                                            </div>
                                            <div className="text-right" data-oid="r8qiv8t">
                                                <p
                                                    className={
                                                        theme === 'dark'
                                                            ? 'text-gray-300'
                                                            : 'text-gray-600'
                                                    }
                                                    data-oid="v_ys828"
                                                >
                                                    July 2023 - October 2023
                                                </p>
                                                <p
                                                    className="text-sm text-gray-400"
                                                    data-oid="_g18cjx"
                                                >
                                                    Kuala Lumpur, Malaysia
                                                </p>
                                            </div>
                                        </div>
                                        <p
                                            className={
                                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                            }
                                            data-oid=":in6cen"
                                        >
                                            Enhanced the mobile app with new features using Flutter
                                            and collaborated with the back-end team for
                                            implementation. Collaborated with the back-end team to
                                            design user-friendly interfaces. Analyzed user behavior
                                            for data-driven app improvements and collaborated with
                                            the development team for optimizations using Git and
                                            Source-tree.
                                        </p>
                                    </div>

                                    <div data-oid="2iw1371">
                                        <div
                                            className="flex justify-between items-start mb-2"
                                            data-oid="g59nt2p"
                                        >
                                            <div data-oid="wil2zgq">
                                                <h3
                                                    className="text-xl font-semibold"
                                                    data-oid="cix.qhw"
                                                >
                                                    Intern Flutter Developer
                                                </h3>
                                                <p className="text-yellow-500" data-oid="cz6712j">
                                                    Pioneer4ss
                                                </p>
                                            </div>
                                            <div className="text-right" data-oid="kuxglmw">
                                                <p
                                                    className={
                                                        theme === 'dark'
                                                            ? 'text-gray-300'
                                                            : 'text-gray-600'
                                                    }
                                                    data-oid=".n0:15."
                                                >
                                                    November 2021 - January 2022
                                                </p>
                                                <p
                                                    className="text-sm text-gray-400"
                                                    data-oid="79jc6ui"
                                                >
                                                    Cyberjaya, Malaysia
                                                </p>
                                            </div>
                                        </div>
                                        <p
                                            className={
                                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                            }
                                            data-oid="fc5xbdv"
                                        >
                                            Managed the content of the website and worked on
                                            creating an android app for the company&apos;s website,
                                            that utilized the WordPress API.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer
                            className={`mt-20 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                            data-oid="crp48ye"
                        >
                            <div className="flex justify-center gap-6 mb-4" data-oid="_y7tfq1">
                                <a
                                    href="https://www.linkedin.com/in/abdelrahman-negm-374b20201/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-yellow-500 transition-colors duration-300"
                                    aria-label="LinkedIn"
                                    data-oid="jzcsg7e"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="br5gk2_"
                                    >
                                        <path
                                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                            data-oid="yisgmxr"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://github.com/Najm101"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-yellow-500 transition-colors duration-300"
                                    aria-label="GitHub"
                                    data-oid="nyr2ifi"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="1np-433"
                                    >
                                        <path
                                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                            data-oid="p86ugr-"
                                        />
                                    </svg>
                                </a>
                            </div>
                            <p data-oid="r1fhuxi">© 2024 Abdelrahman Negm. All rights reserved.</p>
                        </footer>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
