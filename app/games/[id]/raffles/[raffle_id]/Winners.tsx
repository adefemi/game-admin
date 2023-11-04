import RaffleTicketCard from "@/components/contents/RaffleTicketCard";
import RaffleWinnerCard from "@/components/contents/RaffleWinnerCard";
import { axiosHander } from "@/lib/handlers";
import { raffle } from "@/lib/network";
import {  RaffleWinner } from "@/lib/types";
import React from "react";
import { useQuery } from "react-query";

async function fetchRaffleWinners(id: string) {
  const res = await axiosHander<RaffleWinner[]>(
    raffle.getWinners + `?raffle_id=${id}`,
    "GET",
    null,
    true
  );

  return res.data;
}

const Winners = ({ raffleID }: { raffleID: string }) => {
  const { data, isLoading } = useQuery(`raffle_winner_${raffleID}`, () =>
  fetchRaffleWinners(raffleID)
  );

  return (
    <div className="mt-4">

      <div className="grid grid-cols-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : data && data.length < 1 ? (
          <p>No winners yet</p>
        ) : (
          data?.map((ticket, id) => <RaffleWinnerCard key={id} data={ticket} />)
        )}
      </div>
    </div>
  );
};

export default Winners;
