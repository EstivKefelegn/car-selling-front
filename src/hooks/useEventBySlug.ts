// hooks/useEventBySlug.ts
import useData from "./useData";
import { type Event } from "./useEvents";

const useEventBySlug = (slug: string) => 
  useData<Event>(
    `/company/events/${slug}/`,
    {},
    [slug] // Only re-fetch when slug changes
  );

export default useEventBySlug;