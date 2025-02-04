'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectsPage() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const projects = [
        {
            name: 'NATGAS',
            date: 'December 2023 - January 2024',
            description:
                'Developed an unofficial iOS NATGAS app using Flutter to provide NATGAS customers with a seamless and user-friendly experience for managing their gas services.',
            url: {
                label: 'Apple TestFlight',
                href: 'https://testflight.apple.com/join/6YQ4wEgF',
            },
        },
        {
            name: 'SteamDeck: Game Compatibility',
            date: 'Oct 2022 - Present',
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
            description:
                'My university final year project. An app that allows university students and staff to track the real-time location of buses.',
        },
    ];

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen transition-colors duration-300 ${
                theme === 'dark'
                    ? 'bg-gradient-to-br from-yellow-900 via-amber-800 to-yellow-700 text-white'
                    : 'bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-100 text-gray-900'
            } p-8`}
            data-oid="-nm6s0u"
        >
            <div className="max-w-6xl mx-auto" data-oid="ng:k-6.">
                <header className="text-center mb-12" data-oid=".2r3rcl">
                    <h1 className="text-4xl font-bold mb-4" data-oid="aacmotm">
                        My Projects
                    </h1>
                    <Link
                        href="/"
                        className="text-yellow-500 hover:text-yellow-400"
                        data-oid="cb1:evw"
                    >
                        ← Back to Home
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-oid="uoq1dr3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`backdrop-blur-lg rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 ${
                                theme === 'dark' ? 'bg-white/10' : 'bg-white/60'
                            }`}
                            data-oid="2ovnhn2"
                        >
                            <h2 className="text-2xl font-bold mb-2" data-oid="cu2zo4l">
                                {project.name}
                            </h2>
                            <p className="text-gray-400 mb-4" data-oid="ho4n9a6">
                                {project.date}
                            </p>
                            <p
                                className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                                data-oid="fi9-22j"
                            >
                                {project.description}
                            </p>
                            {project.url && (
                                <a
                                    href={project.url.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                    data-oid="sf2oayq"
                                >
                                    {project.url.label}
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
