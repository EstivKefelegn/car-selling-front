// hooks/useColors.ts
import { useMemo } from "react";
import useData from "./useData";

export interface Color {
  id: number;
  name: string;
  hex_code: string;
  color_type: 'exterior' | 'interior';
}

export interface ColorQuery {
  color_type?: 'exterior' | 'interior' | '';
  search?: string;
}

const useColors = (colorQuery?: ColorQuery) => {
  // Build query params
  const params = useMemo(() => {
    const result: Record<string, any> = {};

    if (colorQuery?.color_type) result.color_type = colorQuery.color_type;
    if (colorQuery?.search?.trim()) result.search = colorQuery.search;

    return result;
  }, [colorQuery?.color_type, colorQuery?.search]);

  const { data: colors, loading, error } = useData<Color>(
    "/cars/colors/", // Your colors endpoint
    { params },
    [params]
  );

  // Filter colors by type
  const exteriorColors = useMemo(() => 
    colors?.filter(color => color.color_type === 'exterior') || [], 
    [colors]
  );
  
  const interiorColors = useMemo(() => 
    colors?.filter(color => color.color_type === 'interior') || [], 
    [colors]
  );

  return {
    data: colors,
    exteriorColors,
    interiorColors,
    loading,
    error,
    colorsCount: colors?.length || 0,
  };
};

export default useColors;