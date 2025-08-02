import client from "./client";
import Ticket from "../types/ticket";

export async function getTickets() {
  interface response {
    count: number;
    tickets: Ticket[];
  }
  const { data } = await client.get<response>("/tickets");
  return data.tickets;
}
