
import type { HomeData, SearchResultItem, AnimeDetail, StreamData } from '../types';

const API_BASE_URL = 'https://fathurweb.qzz.io/api/anime/kompi';

async function fetcher<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  if (!data.status) {
    throw new Error(data.message || 'API request failed');
  }
  return data.result as T;
}

export const getHomeData = (page: number = 1): Promise<HomeData> => {
  // FIX: Removed trailing comma from generic type argument.
  return fetcher<HomeData>(`/home?page=${page}`);
};

export const searchAnime = (query: string): Promise<SearchResultItem[]> => {
  // FIX: Removed trailing comma from generic type argument.
  return fetcher<SearchResultItem[]>(`/search?q=${encodeURIComponent(query)}`);
};

export const getAnimeDetail = (url: string): Promise<AnimeDetail> => {
  // FIX: Removed trailing comma from generic type argument.
  return fetcher<AnimeDetail>(`/detail?url=${encodeURIComponent(url)}`);
};

export const getStreamData = (url: string): Promise<StreamData> => {
  // FIX: Removed trailing comma from generic type argument.
  return fetcher<StreamData>(`/stream?url=${encodeURIComponent(url)}`);
};
