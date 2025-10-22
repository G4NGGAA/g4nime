
import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { getHomeData } from '../services/api';
import type { HomeData } from '../types';
import AnimeCard from '../components/AnimeCard';
import { SkeletonCard } from '../components/Skeleton';
import { Link } from 'react-router-dom';

/**
 * Converts an episode URL (e.g., .../naruto-shippuden-episode-1/) 
 * into an anime detail URL (e.g., .../anime/naruto-shippuden/).
 * This allows users to navigate to the detail page from the homepage.
 * @param episodeUrl The original URL from the API.
 * @returns The transformed detail URL or the original URL if transformation fails.
 */
const getDetailUrlFromEpisodeUrl = (episodeUrl: string): string => {
  try {
    // URLs from search/recommendations are already detail URLs. They contain /anime/.
    if (episodeUrl.includes('/anime/')) {
      return episodeUrl;
    }

    const url = new URL(episodeUrl);
    // e.g. /gintama-episode-1-subtitle-indonesia/
    const slugWithEpisode = url.pathname.replace(/^\/|\/$/g, '');
    
    // Use a regex to find and remove the episode part of the slug
    // e.g., "-episode-1", "-episode-1-subtitle-indonesia"
    const slug = slugWithEpisode.replace(/-episode-[\s\S]*$/, '');

    // If the slug is unchanged, it means the URL didn't match the episode pattern.
    // In this case, we shouldn't modify it to avoid creating a wrong URL.
    if (slug === slugWithEpisode) {
        return episodeUrl;
    }

    // Reconstruct the URL in the detail page format.
    return `${url.origin}/anime/${slug}/`;
  } catch (e) {
    console.error(`Could not parse or convert URL: ${episodeUrl}`, e);
    // Return original URL if anything goes wrong.
    return episodeUrl;
  }
};


const HomeSlider: React.FC<{ slides: HomeData['slide'] }> = ({ slides }) => {
  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
      {slides.slice(0, 1).map((slide, index) => (
        <Link to={`/anime/${btoa(slide.url)}`} key={index} className="block w-full h-full">
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">{slide.title}</h2>
            <p className="text-slate-200 mt-2 text-sm md:text-base line-clamp-2 drop-shadow-md">{slide.ringkasan}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const HomePage: React.FC = () => {
    // FIX: Removed trailing comma from generic type argument.
    const { data: homeData, error, isLoading } = useFetch<HomeData>(getHomeData);

    if (error) return <div className="text-center text-red-500">Failed to load data. Please try again later.</div>;

    return (
        <div className="space-y-12">
            <section>
                {isLoading ? <div className="h-56 sm:h-72 md:h-96 bg-slate-300 dark:bg-slate-700 rounded-2xl animate-pulse"></div> : <HomeSlider slides={homeData!.slide} />}
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Rilisan Terbaru</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {isLoading ? 
                        [...Array(10)].map((_, i) => <SkeletonCard key={i} />) :
                        homeData?.rilisanTerbaru.map((anime) => (
                            <AnimeCard 
                                key={anime.url} 
                                title={anime.title}
                                image={anime.image}
                                url={getDetailUrlFromEpisodeUrl(anime.url)}
                                episode={anime.episode}
                            />
                        ))
                    }
                </div>
            </section>
            
            {isLoading ? (
              <div className="space-y-12">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <div className="h-8 w-48 bg-slate-300 dark:bg-slate-700 rounded-lg animate-pulse mb-4"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {[...Array(5)].map((_, j) => <SkeletonCard key={j} />)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                homeData?.rekomendasiGenre.map((genreSection) => (
                    <section key={genreSection.genre}>
                        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">{genreSection.genre}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {genreSection.animeList.map((anime) => (
                                <AnimeCard 
                                    key={anime.url} 
                                    title={anime.title} 
                                    image={anime.image} 
                                    url={getDetailUrlFromEpisodeUrl(anime.url)} 
                                    episode={anime.episode} 
                                />
                            ))}
                        </div>
                    </section>
                ))
            )}
        </div>
    );
};

export default HomePage;
