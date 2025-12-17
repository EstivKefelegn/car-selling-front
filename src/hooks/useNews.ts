// hooks/useNews.ts
import useData from "./useData";

export interface News {
  id: number;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  image: string;
  is_featured: boolean;
  author: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  formatted_published_date: string;
}

export interface NewsQuery {
  is_featured?: boolean;
  search?: string;
  ordering?: string;
  limit?: number;
}

// Since useData returns T[], and we want News[], we need to pass News as T
// This makes useData<News> return News[]
const useNews = (newsQuery?: NewsQuery) => 
  useData<News>(
    "/company/news/",
    {
      params: {
        is_featured: newsQuery?.is_featured,
        search: newsQuery?.search,
        ordering: newsQuery?.ordering || '-published_at',
        limit: newsQuery?.limit || 10
      }
    },
    [newsQuery?.is_featured, newsQuery?.search, newsQuery?.ordering, newsQuery?.limit]
  );

export default useNews;

// For featured news
export const useFeaturedNews = (limit: number = 3) => 
  useNews({
    is_featured: true,
    ordering: '-published_at',
    limit
  });

// For latest news
export const useLatestNews = (limit: number = 10) => 
  useNews({
    ordering: '-published_at',
    limit
  });