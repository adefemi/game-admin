import RaffleTicketCard from "@/components/contents/RaffleTicketCard";
import { axiosHander } from "@/lib/handlers";
import { raffle } from "@/lib/network";
import { RaffleTicket } from "@/lib/types";
import React from "react";
import { useQuery } from "react-query";

async function fetchRaffleTickets(id: string) {
  const res = await axiosHander<RaffleTicket[]>(
    raffle.getTickets + `?raffle_id=${id}`,
    "GET",
    null,
    true
  );

  return res.data;
}

const Tickets = ({ raffleID }: { raffleID: string }) => {
  const { data, isLoading } = useQuery(`raffle_tickets_${raffleID}`, () =>
    fetchRaffleTickets(raffleID)
  );

  return (
    <div className="mt-4">

      <div className="grid grid-cols-3 gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : data && data.length < 1 ? (
          <p>No tickets purchased yet</p>
        ) : (
          data?.map((ticket, id) => <RaffleTicketCard key={id} data={ticket} />)
        )}
      </div>
    </div>
  );
};

export default Tickets;
