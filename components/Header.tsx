
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search/${encodeURIComponent(query.trim())}`);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-xs">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anime..."
                className="w-full pl-4 pr-10 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-500 dark:text-slate-400 hover:text-secondary-500 dark:hover:text-secondary-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </button>
        </form>
    );
};


const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-md dark:shadow-slate-800">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                    Gemini Anime
                </Link>
                <div className="flex items-center gap-4">
                    <SearchBar />
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
