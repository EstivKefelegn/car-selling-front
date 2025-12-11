import useData from "./useData";
import useManufacturer from "./useManufacturers";


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

export interface CarQuery {
    manufacturer_name?: string;
    category?: string;
    model_year?: number;
    featured?: boolean;
    search?: string;
}

 const useEVCars = (
    
    carQuery: CarQuery
 
    ) => useData<Car>(
        "/electric-cars",
        {
            params: {
                manufacturer: carQuery.manufacturer_name,
                category: carQuery.category,
                model_year: carQuery.model_year,
                search: carQuery.search    
            }
        },
        [
            carQuery.manufacturer_name,
            carQuery.category,
            carQuery.model_year,
            carQuery.search
        ]
    )   

    export default useEVCars






// const useEVCars = ()
