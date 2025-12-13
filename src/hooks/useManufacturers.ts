import useData from "./useData";

export interface Manufacturer {
    id: number;
    name: string;
    country: string;
    founded_year: number;
    logo: string;
    is_ev_only: boolean;
    description: string;
    website: string;
    headquarters: string;
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