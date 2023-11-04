import { Raffle } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import ContextInfo from "../common/ContextInfo";
import { formatDateTime } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";
import DrawRaffle from "../process/DrawRaffle";
import { Badge } from "../ui/badge";

const RafflePriceCard = ({ data }: { data: Raffle }) => {
  return (
    <div className="border border-slate-200 rounded-2xl p-5 flex relative">
      <div className="w-32 h-full relative mr-4">
        <Image
          src={data.graphics}
          style={{ objectFit: "cover" }}
          alt={data.price_name}
          fill
          sizes="100%"
          className="rounded-lg"
        />
      </div>
      <div>
        <ContextInfo title="Price Name" value={data.price_name} />
        <ContextInfo
          title="Status"
          value=""
          customValue={
            data.drawn_at ? (
              <Badge className="bg-slate-200 text-black text-opacity-50">
                Inactive
              </Badge>
            ) : (
              <Badge className="bg-success text-black text-opacity-50">
                Active
              </Badge>
            )
          }
        />
        <ContextInfo
          title="Ticket Price"
          value={data.ticket_price.toString()}
        />
        <ContextInfo
          title="Total Purchased"
          value={data.created_count.toString()}
        />
        <ContextInfo
          title="Date Created"
          value={formatDateTime(data.created_at)}
          isLast
        />
      </div>

      <div className="absolute top-2 right-2">
        <Link
          href={`/games/${data.game_id}/raffles/${data.id}`}
          className="bg-transparent text-secondary border border-secondary text-xs py-1 px-2 rounded-md"
        >
          View Info
        </Link>
      </div>
    </div>
  );
};

export const RafflePriceCardSkeleton = () => {
  return (
    <div className="border border-slate-200 rounded-2xl p-8 flex ">
      <div className="w-32 h-full relative mr-4">
        <Skeleton className="w-full h-full" />
      </div>
      <div>
        <div className="grid grid-cols-2 gap-x-5 mb-4">
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="grid grid-cols-2 gap-x-5 mb-4">
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="grid grid-cols-2 gap-x-5 mb-4">
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="grid grid-cols-2 gap-x-5 mb-4">
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
    </div>
  );
};

export const SingleRaffleCard = ({ data }: { data: Raffle }) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-x-4">
        <div className="cover h-100 w-52 relative">
          <Image
            src={data.graphics}
            fill
            alt="cover"
            sizes="100%"
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
        <div className="info ">
          <h3 className="text-xl font-medium">{data.price_name}</h3>
          <div className="mt-3">
            <ContextInfo
              title="Price"
              value={data.ticket_price.toString()}
              spacer="mb-2"
            />
            <ContextInfo
              title="Draw Type"
              value={data.draw_type}
              spacer="mb-2"
            />
            {data.draw_type === "auto" && (
              <ContextInfo
                title="Draw Date Time"
                value={data.draw_date_time}
                spacer="mb-2"
              />
            )}
            <ContextInfo
              title="Ticket Bought"
              value={data.created_count.toString()}
              spacer="mb-2"
            />
            <ContextInfo
              title="Status"
              value=""
              customValue={
                data.drawn_at ? (
                  <Badge className="bg-slate-200 text-black text-opacity-50">
                    Inactive
                  </Badge>
                ) : (
                  <Badge className="bg-success text-black text-opacity-50">
                    Active
                  </Badge>
                )
              }
              spacer="mb-2"
            />
            <ContextInfo
              title="Date Created"
              value={formatDateTime(data.created_at)}
              spacer="mb-2"
            />
            <ContextInfo
              title="Last Updated"
              value={formatDateTime(data.updated_at)}
              isLast
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <Button className="bg-transparent border border-secondary text-secondary mr-3 text-xs">
          <Edit size={12} className="mr-1" /> Edit
        </Button>
        <DrawRaffle raffleID={data.id} />
      </div>
    </div>
  );
};

export default RafflePriceCard;
