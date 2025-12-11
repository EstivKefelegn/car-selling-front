// hooks/useColors.ts
import useData from "./useData";

export interface CarColor {
    id: number;
    name: string;
    hex_code: string;
    color_type: string;
    color_type_display: string;
    image: string | null;
    image_url: string | null;
    description: string;
}

export interface ColorQuery {
    name?: string;
    color_type?: 'exterior' | 'interior' | '';
}

const useColors = (colorQuery?: ColorQuery) => 
    useData<CarColor>(
        "/car-colors/",
        {
            params: {
                name: colorQuery?.name,
                color_type: colorQuery?.color_type
            }
        },
        [colorQuery?.name, colorQuery?.color_type]
    );

export default useColors;