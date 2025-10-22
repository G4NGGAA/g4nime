import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useFetch<T>(fetcher: () => Promise<T>, deps: any[] = []): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, error: null, isLoading: true });
      try {
        const data = await fetcher();
        setState({ data, error: null, isLoading: false });
      } catch (error) {
        setState({ data: null, error: error as Error, isLoading: false });
      }
    };
    
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}