import clientFetcher from "@/fetcher/client.fetcher";
import {
  TicketCreateInputs,
  TicketUpdateInputs,
  Ticket,
} from "@/schemas/ticketsSchema";

export const fetchTickets = async (): Promise<Ticket[]> => {
  return clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tickets/`,
  );
};

export const fetchTicketById = async (id: number): Promise<Ticket> => {
  return clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tickets/${id}`,
  );
};

export const createTicket = async (
  data: TicketCreateInputs,
): Promise<Ticket> => {
  return clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tickets/`,
    {
      method: "POST",
      body: data,
    },
  );
};

export const updateTicket = async ({
  id,
  data,
}: {
  id: number;
  data: TicketUpdateInputs;
}): Promise<Ticket> => {
  return clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tickets/${id}`,
    {
      method: "PATCH",
      body: data,
    },
  );
};

export const deleteTicket = async (id: number): Promise<void> => {
  return clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tickets/${id}`,
    {
      method: "DELETE",
    },
  );
};
