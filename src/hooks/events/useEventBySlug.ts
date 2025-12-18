// hooks/useEventBySlug.ts
import useData from "../data/useData";
import { type Event } from "./useEvents";

const useEventBySlug = (slug: string) => 
  useData<Event>(
    `/company/events/${slug}/`,
    {},
    [slug] 
  );

export default useEventBySlug;