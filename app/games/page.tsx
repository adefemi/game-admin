"use client";

import mainLayout from "@/components/layouts/mainLayout";
import CreateGame from "@/components/process/CreateGame";
import { Input } from "@/components/ui/input";
import { useQuery } from "react-query";
import { game } from "@/lib/network";
import { Game } from "@/lib/types";
import GameCard, { GameCardSkeleton } from "@/components/contents/GameCard";
import { axiosHander } from "@/lib/handlers";
import { reactQueryCacheControllers } from "@/lib/contants";

async function fetchGames() {
  const res = await axiosHander<Game[]>(game.list, "GET", null, true);

  return res.data;
}

function Home() {
  const { data, isLoading } = useQuery(
    reactQueryCacheControllers.game,
    fetchGames
  );

  return (
    <div>
      <div className="px-5 mt-4 flex items-center justify-between max-w-7xl">
        <Input
          placeholder="Search games"
          className="max-w-sm rounded-full text-sm"
        />
        <CreateGame />
      </div>

      <div className="px-5 mt-10 max-w-7xl">
        <div className="grid grid-cols-3 w-full gap-5">
          {isLoading && <GameCardSkeleton />}
          {data && data.length < 1 ? (
            <p>No games defined yet</p>
          ) : (
            data?.map((game, id) => <GameCard key={id} data={game} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default mainLayout(Home);
