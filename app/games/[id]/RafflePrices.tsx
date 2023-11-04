import RafflePriceCard, {
  RafflePriceCardSkeleton,
} from "@/components/contents/RafflePriceCard";
import { axiosHander } from "@/lib/handlers";
import { raffle } from "@/lib/network";
import { Raffle } from "@/lib/types";
import React from "react";
import { useQuery } from "react-query";

const RafflePrices = ({ id }: { id: string }) => {
  async function fetchRafflePrices(id: string) {
    const res = await axiosHander<Raffle[]>(
      raffle.list + `?game_id=${id}`,
      "GET",
      null,
      true
    );

    return res.data;
  }

  const { data, isLoading } = useQuery(`raffles_${id}`, () =>
    fetchRafflePrices(id)
  );
  return (
    <div className="grid grid-cols-2 mt-5 gap-8">
      {isLoading ? (
        <RafflePriceCardSkeleton />
      ) : data && data.length < 1 ? (
        <p>No raffle prize created yet</p>
      ) : (
        data?.map((price, id) => <RafflePriceCard key={id} data={price} />)
      )}
    </div>
  );
};

export default RafflePrices;
