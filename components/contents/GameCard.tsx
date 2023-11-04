import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Game } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import ContextInfo from "../common/ContextInfo";
import { formatDateTime } from "@/lib/utils";

const coverKey: { [key: string]: string } = {
  raffle:
    "https://res.cloudinary.com/adefemigreat/image/upload/v1698912172/Game_Engine/Frame_90_xabdos.png",
};

const GameCard = ({ data }: { data: Game }) => {
  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-md shadow-slate-100">
      <div className="cover h-48 relative">
        <Image
          src={data.cover || coverKey[data.gametype.toLowerCase()]}
          fill
          alt="cover"
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="info px-4 py-4">
        <h3 className="text-xl font-medium mb-2">{data.name}</h3>
        <div className="context flex items-center justify-between">
          <ContextInfo title="Game Type" value={data.gametype} isLast />
        </div>

        <Link
          href={`/games/${data.id}`}
          className="mt-6 block rounded-lg text-center w-full bg-transparent text-secondary border border-secondary py-2 text-sm font-medium"
        >
          View Game
        </Link>
      </div>
    </div>
  );
};

export const GameCardSkeleton = () => {
  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-md shadow-slate-100">
      <div className="cover h-56 relative">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="info px-4 py-4">
        <div className="context mt-2 flex items-center justify-between">
          <div className="context-item">
            <Skeleton className="w-32 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SingleGameCard = ({ data }: { data: Game }) => {
  return (
    <div className="flex gap-x-4">
      <div className="cover h-32 w-40 relative">
        <Image
          src={data.cover || coverKey[data.gametype.toLowerCase()]}
          fill
          alt="cover"
          sizes="100%"
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
      <div className="info ">
        <h3 className="text-xl font-medium">{data.name}</h3>
        <div className="mt-3">
          <ContextInfo title="Game Type" value={data.gametype} spacer="mb-2" />
          <ContextInfo
            title="Date Created"
            value={formatDateTime(data.created_at)}
            isLast
          />
        </div>
      </div>
    </div>
  );
};

export const SingleGameCardSkeleton = () => {
  return (
    <div className="flex gap-x-4">
      <div className="cover h-42 w-56 relative">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="info px-4 py-4">
        <div className="context mt-2 flex items-center justify-between">
          <div className="context-item">
            <Skeleton className="w-32 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
