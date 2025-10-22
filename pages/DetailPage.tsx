import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getAnimeDetail } from '../services/api';
import type { AnimeDetail } from '../types';
import AnimeCard from '../components/AnimeCard';
import { DetailPageSkeleton } from '../components/Skeleton';

const DetailPage: React.FC = () => {
  const { url } = useParams<{ url: string }>();
  const decodedUrl = url ? atob(url) : '';
  const navigate = useNavigate();

  // FIX: Removed trailing comma from generic type argument.
  const { data: anime, error, isLoading } = useFetch<AnimeDetail>(() => getAnimeDetail(decodedUrl), [decodedUrl]);

  if (isLoading) return <DetailPageSkeleton />;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!anime) return <div className="text-center text-slate-500">Anime not found.</div>;

  const handleEpisodeClick = (episodeUrl: string) => {
    // Pass episode list and anime URL to WatchPage
    navigate(`/watch/${btoa(episodeUrl)}`, { state: { episodes: anime.episodes, animeUrl: url } });
  };

  return (
    <div className="space-y-8">
      {/* Banner and Info */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <img src={anime.imageUrl[0].bigCover} alt={`${anime.title} backdrop`} className="w-full h-48 md:h-64 lg:h-80 object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-slate-900 via-slate-100/50 dark:via-slate-900/50 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-8 p-4 sm:p-8 mt-[-80px] sm:mt-[-120px] relative">
          <img src={anime.imageUrl[0].cover} alt={anime.title} className="w-32 h-48 md:w-48 md:h-64 object-cover rounded-lg shadow-lg flex-shrink-0 border-4 border-white/50 dark:border-slate-800/50" />
          <div className="flex-grow pt-4 md:pt-16">
            <h1 className="text-3xl md:text-4xl font-bold">{anime.title}</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{anime.alternativeTitle}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {anime.genres.map(genre => (
                <span key={genre} className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/50 text-secondary-800 dark:text-secondary-300 text-xs font-semibold rounded-full">{genre}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-8 pt-0">
          <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{anime.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm">
              <div><strong className="block text-slate-500 dark:text-slate-400">Status</strong> {anime.status}</div>
              <div><strong className="block text-slate-500 dark:text-slate-400">Studio</strong> {anime.studio}</div>
              <div><strong className="block text-slate-500 dark:text-slate-400">Season</strong> {anime.season}</div>
              <div><strong className="block text-slate-500 dark:text-slate-400">Type</strong> {anime.type}</div>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto pr-2">
          {anime.episodes.map(ep => (
            <button
              key={ep.url}
              onClick={() => handleEpisodeClick(ep.url)}
              className="w-full text-left p-3 bg-white dark:bg-slate-800 rounded-lg shadow hover:bg-secondary-100 dark:hover:bg-secondary-900/50 hover:text-secondary-800 dark:hover:text-secondary-200 transition-colors"
            >
              <span className="font-semibold block truncate">Episode {ep.number}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{ep.date}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Recommendations */}
      {anime.recommendations && anime.recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {anime.recommendations.map(rec => (
              <AnimeCard key={rec.url} title={rec.title} image={rec.image} url={rec.url} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;