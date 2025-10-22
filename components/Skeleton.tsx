
import React from 'react';

export const SkeletonCard: React.FC = () => {
    return (
        <div className="rounded-lg overflow-hidden bg-white/30 dark:bg-slate-800/50 shadow-lg animate-pulse">
            <div className="w-full h-48 sm:h-64 bg-slate-300 dark:bg-slate-700"></div>
            <div className="p-3">
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mt-2"></div>
            </div>
        </div>
    );
};

export const DetailPageSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse">
            <div className="relative h-48 md:h-64 lg:h-80 w-full bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
            <div className="flex flex-col md:flex-row gap-8 mt-[-60px] px-4 md:px-8 relative">
                <div className="w-32 h-48 md:w-48 md:h-64 flex-shrink-0 bg-slate-400 dark:bg-slate-600 rounded-lg shadow-lg border-4 border-white/20 dark:border-slate-800/50"></div>
                <div className="flex-grow pt-4 md:pt-24">
                    <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <div className="h-6 w-20 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                        <div className="h-6 w-24 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                        <div className="h-6 w-16 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                    </div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6 mb-2"></div>
                </div>
            </div>
            <div className="mt-8 px-4 md:px-8">
                <div className="h-7 w-48 bg-slate-300 dark:bg-slate-700 rounded mb-4"></div>
                <div className="space-y-2">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="h-12 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
