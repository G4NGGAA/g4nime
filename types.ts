
export interface Slide {
  title: string;
  url: string;
  image: string;
  ringkasan: string;
  status: string;
  tipe: string;
}

export interface RilisanTerbaru {
  title: string;
  url: string;
  image: string;
  episode: string;
}

export interface AnimeListItem {
  title: string;
  url: string;
  image: string;
  episode: string;
}

export interface RekomendasiGenre {
  genre: string;
  animeList: AnimeListItem[];
}

export interface HomeData {
  slide: Slide[];
  rilisanTerbaru: RilisanTerbaru[];
  rekomendasiGenre: RekomendasiGenre[];
}

export interface SearchResultItem {
  title: string;
  link: string;
  image: string;
}

export interface AnimeDetail {
  title: string;
  alternativeTitle: string;
  status: string;
  studio: string;
  releaseDate: string;
  duration: string;
  season: string;
  type: string;
  fansub: string;
  genres: string[];
  description: string;
  imageUrl: {
    bigCover: string;
    cover: string;
  }[];
  episodes: Episode[];
  recommendations: Recommendation[];
}

export interface Episode {
  number: string;
  title: string;
  url: string;
  date: string;
}

export interface Recommendation {
  title: string;
  url: string;
  image: string;
}

export interface StreamingServer {
  server: string;
  link: string;
}

export interface DownloadLinkItem {
  name: string;
  url: string;
}

export interface DownloadLink {
  quality: string;
  links: DownloadLinkItem[];
}

export interface StreamData {
  title: string;
  image: string;
  episodeNumber: string;
  description: string;
  rating: string;
  genre: string[];
  streamingServers: StreamingServer[];
  downloadLinks: DownloadLink[];
  relatedAnime: Recommendation[];
}
