// hooks/useAbout.ts
import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';
import type { AboutUsData, TeamMember, DealershipPhoto } from '../components/about/types/about';

interface AboutResult<T> {
  data: T | null;
  error: string;
  loading: boolean;
  refetch: () => void;
}

export const useAbout = (): AboutResult<AboutUsData> => {
  const [data, setData] = useState<AboutUsData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAbout = async () => {
    const controller = new AbortController();
    setLoading(true);

    try {
      const response = await apiClient.get<AboutUsData>('/cars/about-us/', {
        signal: controller.signal,
      });
      setData(response.data);
      setError('');
    } catch (err) {
      if (err instanceof CanceledError) return;
      setError(err instanceof Error ? err.message : 'Failed to fetch about data');
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return { data, error, loading, refetch: fetchAbout };
};

export const useTeamMembers = (): { data: TeamMember[]; error: string; loading: boolean; refetch: () => void } => {
  const [data, setData] = useState<TeamMember[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTeam = async () => {
    const controller = new AbortController();
    setLoading(true);

    try {
      const response = await apiClient.get<TeamMember[]>('/cars/about-us/team/', {
        signal: controller.signal,
      });
      setData(response.data);
      setError('');
    } catch (err) {
      if (err instanceof CanceledError) return;
      setError(err instanceof Error ? err.message : 'Failed to fetch team data');
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return { data, error, loading, refetch: fetchTeam };
};

export const useDealershipGallery = (): { data: DealershipPhoto[]; error: string; loading: boolean; refetch: () => void } => {
  const [data, setData] = useState<DealershipPhoto[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGallery = async () => {
    const controller = new AbortController();
    setLoading(true);

    try {
      const response = await apiClient.get<DealershipPhoto[]>('/cars/about-us/gallery/', {
        signal: controller.signal,
      });
      setData(response.data);
      setError('');
    } catch (err) {
      if (err instanceof CanceledError) return;
      setError(err instanceof Error ? err.message : 'Failed to fetch gallery data');
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return { data, error, loading, refetch: fetchGallery };
};

// Combined hook for all about data
export const useAllAboutData = () => {
  const about = useAbout();
  const team = useTeamMembers();
  const gallery = useDealershipGallery();

  const loading = about.loading || team.loading || gallery.loading;
  const error = about.error || team.error || gallery.error;

  const refetchAll = () => {
    about.refetch();
    team.refetch();
    gallery.refetch();
  };

  return {
    about: about.data,
    team: team.data,
    gallery: gallery.data,
    loading,
    error,
    refetch: refetchAll,
  };
};