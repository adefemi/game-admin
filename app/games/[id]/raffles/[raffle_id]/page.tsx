"use client";

import { SingleGameCardSkeleton } from "@/components/contents/GameCard";
import mainLayout from "@/components/layouts/mainLayout";
import { axiosHander } from "@/lib/handlers";
import { raffle } from "@/lib/network";
import { Raffle } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import { fetchSingleGame } from "../../page";
import { SingleRaffleCard } from "@/components/contents/RafflePriceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tickets from "./Tickets";
import Results from "./Results";
import Winners from "./Winners";

async function fetchSingleRaffle(id: string) {
  const res = await axiosHander<Raffle>(raffle.detail + id, "GET", null, true);

  return res.data;
}

async function fetchDetails(id: string, raffle_id: string) {
  const [raffle, game] = await Promise.all([
    fetchSingleRaffle(raffle_id),
    fetchSingleGame(id),
  ]);
  return {
    raffle,
    game,
  };
}

const RaffleHome: NextPage = ({ params }: any) => {
  // get the id from next js dynamic route
  const { raffle_id, id } = params;

  const { data, isLoading } = useQuery(
    `raffle_${raffle_id}`,
    () => fetchDetails(id as string, raffle_id as string),
    {
      enabled: !!id, // Only run the query if id is defined
    }
  );

  return (
    <div className="px-5 mt-5 max-w-7xl">
      <div className="breadcrumb">
        <ul className="flex items-center text-slate-500 text-xs">
          <li>
            <a href="/games">Games</a>
          </li>
          <li className="text-slate-800 scale-75">
            <ChevronRight />
          </li>
          {data && data.game && (
            <li>
              <a href={`/games/${data.game.id}`}>{data.game.name}</a>
            </li>
          )}
          <li className="text-slate-800 scale-75">
            <ChevronRight />
          </li>
          {data && data.raffle && <li>{data.raffle.price_name}</li>}
        </ul>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <SingleGameCardSkeleton />
        ) : (
          data && data.raffle && <SingleRaffleCard data={data.raffle} />
        )}
      </div>

      {data && (
        <div className="mt-14 ">
          <Tabs defaultValue="ticket" className="w-full">
            <TabsList>
              <TabsTrigger value="ticket">Tickets</TabsTrigger>
              <TabsTrigger value="draw">Drawn Result</TabsTrigger>
              <TabsTrigger value="winner">Winners</TabsTrigger>
            </TabsList>
            <TabsContent value="ticket">
              <Tickets raffleID={data.raffle.id} />
            </TabsContent>
            <TabsContent value="draw">
              <Results raffleID={data.raffle.id} />
            </TabsContent>
            <TabsContent value="winner">
              <Winners raffleID={data.raffle.id} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default mainLayout(RaffleHome);
