import useData from "../data/useData";

export interface Manufacturer {
    highest_price: any;
    average_price: any;
    id: number;
    name: string;
    country: string;
    founded_year: number;
    logo: string;
    is_ev_only: boolean;
    description: string;
    website: string;
    headquarters: string;
    created_at: string;
    featured?: boolean; // Add this
    electric_cars?: number[]; // Add this
    logo_url?: string; // Add this
}

export interface ManufacturerQuery {
    name: string,
    is_ev_only?: boolean;
    country?: string;
    founded_year?: number;
}

const useManufacturer = (
    manufacturerQuery: ManufacturerQuery
) => useData<Manufacturer>(
    "/cars/car-manufacturer/",
    {
        params: {
            name: manufacturerQuery.name,
            is_ev_only: manufacturerQuery.is_ev_only,
            country: manufacturerQuery.country,
            founded_year: manufacturerQuery.founded_year    
        }
    },
    [
        manufacturerQuery.name,
        manufacturerQuery.is_ev_only,
        manufacturerQuery.country,
        manufacturerQuery.founded_year
    ]
)

export default useManufacturer