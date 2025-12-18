// hooks/useLatestEvent.ts
import useData from "../data/useData";
import { type Event } from "./useEvents";

const useLatestEvent = () => 
  useData<Event>(
    "/company/events/",
    {
      params: {
        status: 'upcoming',  // Get upcoming events
        ordering: 'start_date', // Order by closest date
        limit: 1, // Get only the latest one
        is_featured: true // Optional: get featured event first
      }
    },
    [] // Empty array = fetch once on mount
  );

export default useLatestEvent;