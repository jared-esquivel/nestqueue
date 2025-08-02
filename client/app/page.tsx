"use client";

import TicketsTable from "@/components/tickets/table";
import { useTicketsQuery } from "@/lib/hooks/queries/tickets";
import { mockTickets } from "@/lib/tickets.mock";
import Ticket from "@/lib/types/ticket";

export default function Home() {
  const { data: tickets, error: ticketsQueryError } = useTicketsQuery();

  if (ticketsQueryError) {
    return <div> Failed to load tickets.</div>;
  }

  if (!tickets) {
    return <div>Loading tickets...</div>;
  }

  return <TicketsTable tickets={tickets} />;
}
