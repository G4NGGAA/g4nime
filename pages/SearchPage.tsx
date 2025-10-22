
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { searchAnime } from '../services/api';
import type { SearchResultItem } from '../types';
import AnimeCard from '../components/AnimeCard';
import { SkeletonCard } from '../components/Skeleton';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchPage: React.FC = () => {
    const { query } = useParams<{ query: string }>();
    const decodedQuery = query ? decodeURIComponent(query) : '';
    // FIX: Removed trailing comma from generic type argument.
    const { data, error, isLoading } = useFetch<SearchResultItem[]>(() => searchAnime(decodedQuery), [decodedQuery]);

    if (isLoading) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Searching for "{decodedQuery}"...</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </div>
        );
    }

    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Results for: <span className="text-secondary-500">"{decodedQuery}"</span>
            </h1>
            {data && data.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {data.map((item) => (
                        <AnimeCard
                            key={item.link}
                            title={item.title}
                            image={item.image}
                            url={item.link}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-slate-500">No results found for "{decodedQuery}".</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
