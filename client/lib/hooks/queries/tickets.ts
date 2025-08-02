import { useQuery } from "@tanstack/react-query"; 
import { getTickets } from "@/lib/api/tickets";

export const useTicketsQuery = () => useQuery({
  queryKey: ["tickets"],
  retry: 0,
  queryFn: () => getTickets()
});