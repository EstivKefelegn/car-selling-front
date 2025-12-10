import useData from "./useData";


export interface Car {
    id: number;
    slug: string;
    manufacturer_name: string;
    manufacturer_logo: string;
    model_name: string;
    variant: string;
    model_year: number;
    category: string;
    category_display: string;
    status: string;
    status_display: string;
    featured: boolean;
    range_wltp: number;
    acceleration_0_100: string;
    motor_power: number;
    base_price: string;
    main_image_url: string;
    efficiency: number;
    total_configurations: number;
    created_at: string; 
}


// const useEVCars = ()
