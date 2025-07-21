// types.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  imageUrl: string;
  description: string;
}

export interface Movie {
  id: string;
  title: string;
  director: string;
  genre: string;
  imageUrl: string;
  description: string;
}

export interface TVSeries {
  id: string;
  title: string;
  seasons: number;
  genre: string;
  imageUrl: string;
  description: string;
}

export interface RecommendationResponse {
  books: Book[];
  movies: Movie[];
  tvSeries: TVSeries[];
}
