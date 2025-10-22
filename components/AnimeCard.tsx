
import React from 'react';
import { Link } from 'react-router-dom';

interface AnimeCardProps {
  title: string;
  image: string;
  url: string;
  episode?: string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ title, image, url, episode }) => {
    const encodedUrl = btoa(url);

    return (
        <Link to={`/anime/${encodedUrl}`} className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/30 dark:bg-slate-800/50 backdrop-blur-sm transform hover:-translate-y-1">
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                {episode && (
                    <span className="absolute top-2 right-2 bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {episode}
                    </span>
                )}
                <div className="absolute bottom-0 left-0 p-3">
                    <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight">
                        {title}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default AnimeCard;
