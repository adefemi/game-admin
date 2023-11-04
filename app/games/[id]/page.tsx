"use client";

import {
  SingleGameCard,
  SingleGameCardSkeleton,
} from "@/components/contents/GameCard";
import mainLayout from "@/components/layouts/mainLayout";
import CreateRaffleTickets from "@/components/process/CreatePrice";
import { axiosHander } from "@/lib/handlers";
import { game } from "@/lib/network";
import { Game } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import RafflePrices from "@/app/games/[id]/RafflePrices";

export async function fetchSingleGame(id: string) {
  const res = await axiosHander<Game>(game.detail + id, "GET", null, true);

  return res.data;
}

const gameHeadings: { [key: string]: string } = {
  raffle: "Prizes",
};

const GameHome: NextPage = ({ params }: any) => {
  // get the id from next js dynamic route
  const { id } = params;

  const { data, isLoading } = useQuery(
    ["game", id],
    () => fetchSingleGame(id as string),
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
          {data && <li>{data.name}</li>}
        </ul>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <SingleGameCardSkeleton />
        ) : (
          data && <SingleGameCard data={data} />
        )}
      </div>

      {data && (
        <div className="mt-14 ">
          <div className="flex items-center justify-between">
            <h1 className="text-xl">
              {gameHeadings[data.gametype.toLowerCase()]}
            </h1>
            <CreateRaffleTickets gameID={id} />
          </div>
          <RafflePrices id={id} />
        </div>
      )}
    </div>
  );
};

export default mainLayout(GameHome);
