import React, { useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getStreamData } from '../services/api';
import type { StreamData, Episode } from '../types';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const EpisodeNavigation: React.FC<{ episodes: Episode[]; currentUrl: string; animeUrl: string }> = ({ episodes, currentUrl, animeUrl }) => {
    const navigate = useNavigate();
    // API returns episodes in descending order, so reverse for natural navigation (Ep 1, Ep 2, ...)
    const orderedEpisodes = [...episodes].reverse();
    const currentIndex = orderedEpisodes.findIndex(ep => ep.url === currentUrl);

    if (currentIndex === -1) {
        return null; // Should not happen if data is passed correctly from detail page
    }

    const prevEpisode = currentIndex > 0 ? orderedEpisodes[currentIndex - 1] : null;
    const nextEpisode = currentIndex < orderedEpisodes.length - 1 ? orderedEpisodes[currentIndex + 1] : null;

    const handleNavigation = (episodeUrl: string) => {
        // Pass the original episodes array in state so the next page can perform the same logic
        navigate(`/watch/${btoa(episodeUrl)}`, { 
            state: { episodes, animeUrl }, 
            replace: true 
        });
    };
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUrl = event.target.value;
        if (selectedUrl) {
            handleNavigation(selectedUrl);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-4 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-md">
            <button
                onClick={() => prevEpisode && handleNavigation(prevEpisode.url)}
                disabled={!prevEpisode}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-white dark:bg-slate-700 hover:bg-secondary-100 dark:hover:bg-secondary-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous episode"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Previous
            </button>

            <div className="relative flex-grow w-full sm:w-auto">
                 <select
                    value={currentUrl}
                    onChange={handleSelectChange}
                    className="w-full px-4 py-2 text-center font-medium rounded-md transition-colors bg-white dark:bg-slate-700 hover:bg-secondary-100 dark:hover:bg-secondary-900/50 focus:outline-none focus:ring-2 focus:ring-secondary-500 appearance-none"
                    aria-label="Select Episode"
                 >
                    {orderedEpisodes.map(ep => (
                        <option key={ep.url} value={ep.url}>
                            Episode {ep.number}
                        </option>
                    ))}
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            
            <button
                onClick={() => nextEpisode && handleNavigation(nextEpisode.url)}
                disabled={!nextEpisode}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-white dark:bg-slate-700 hover:bg-secondary-100 dark:hover:bg-secondary-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next episode"
            >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </button>
        </div>
    );
};


const WatchPage: React.FC = () => {
    const { url } = useParams<{ url: string }>();
    const location = useLocation();
    
    const { state } = location;
    const episodes = state?.episodes as Episode[];
    const animeUrl = state?.animeUrl as string;

    const decodedUrl = url ? atob(url) : '';
    // FIX: Removed trailing comma from generic type argument.
    const { data: stream, error, isLoading } = useFetch<StreamData>(() => getStreamData(decodedUrl), [decodedUrl]);
    const [activeServer, setActiveServer] = useState<string | null>(null);

    React.useEffect(() => {
        if (stream?.streamingServers && stream.streamingServers.length > 0) {
            const validServers = stream.streamingServers.filter(s => s.link && !s.link.includes('Video Not Available'));
            if (validServers.length > 0) {
              setActiveServer(validServers[0].link);
            } else {
              setActiveServer(null);
            }
        }
    }, [stream]);

    if (isLoading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
    if (error) return <div className="text-center text-red-500">Error loading stream: {error.message}</div>;
    if (!stream) return <div className="text-center text-slate-500">Stream not found.</div>;

    const validServers = stream.streamingServers.filter(s => s.link && !s.link.includes('Video Not Available'));

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{stream.title}</h1>
                 {animeUrl && (
                    <Link to={`/anime/${animeUrl}`} className="text-sm flex items-center gap-1 text-secondary-500 hover:underline whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Back to Details
                    </Link>
                )}
            </div>
            
            <div className="lg:flex lg:gap-8">
                <div className="lg:w-3/4">
                    {/* Video Player */}
                    <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                        {activeServer ? (
                            <iframe
                                src={activeServer}
                                frameBorder="0"
                                allowFullScreen
                                className="w-full h-full"
                                title="Anime Player"
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-300 p-4 text-center">
                                No video server available for this episode.
                            </div>
                        )}
                    </div>
                    
                    {episodes && animeUrl && <EpisodeNavigation episodes={episodes} currentUrl={decodedUrl} animeUrl={animeUrl} />}

                    {/* Server List */}
                    <div className="my-4">
                        <h3 className="text-lg font-semibold mb-2">Streaming Servers</h3>
                        <div className="flex flex-wrap gap-2">
                            {validServers.length > 0 ? validServers.map((server) => (
                                <button
                                    key={server.server}
                                    onClick={() => setActiveServer(server.link)}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                        activeServer === server.link
                                            ? 'bg-secondary-500 text-white'
                                            : 'bg-white dark:bg-slate-700 hover:bg-secondary-100 dark:hover:bg-secondary-900/50'
                                    }`}
                                >
                                    {server.server}
                                </button>
                            )) : <p className="text-sm text-slate-500">No servers available.</p>}
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/4">
                    {/* Download Links */}
                    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-3 border-b border-slate-300 dark:border-slate-600 pb-2">Download Links</h3>
                        <div className="space-y-3">
                            {stream.downloadLinks.map(dl => (
                                <div key={dl.quality}>
                                    <h4 className="font-bold text-sm uppercase text-slate-500 dark:text-slate-400">{dl.quality}</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {dl.links.map(link => (
                                            <a
                                                key={link.name + link.url}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 transition"
                                            >
                                                {link.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Anime */}
            {stream.relatedAnime && stream.relatedAnime.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Related Anime</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {stream.relatedAnime.map(rec => (
                            // FIX: The 'Recommendation' type has a 'url' property, not 'link'.
                            <AnimeCard key={rec.url} title={rec.title} image={rec.image} url={rec.url} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WatchPage;