import RaffleResultCard from "@/components/contents/RaffleResultCard";
import RaffleTicketCard from "@/components/contents/RaffleTicketCard";
import { axiosHander } from "@/lib/handlers";
import { raffle } from "@/lib/network";
import { RaffleResult } from "@/lib/types";
import React from "react";
import { useQuery } from "react-query";

async function fetchRaffleResults(id: string) {
  const res = await axiosHander<RaffleResult[]>(
    raffle.getResults + `?raffle_id=${id}`,
    "GET",
    null,
    true
  );

  return res.data;
}

const Results = ({ raffleID }: { raffleID: string }) => {
  const { data, isLoading } = useQuery(`raffle_results_${raffleID}`, () =>
    fetchRaffleResults(raffleID)
  );

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : data && data.length < 1 ? (
          <p>No result drawn yet</p>
        ) : (
          data?.map((result, id) => <RaffleResultCard key={id} data={result} />)
        )}
      </div>
    </div>
  );
};

export default Results;
