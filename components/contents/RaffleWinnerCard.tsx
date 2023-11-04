import { RaffleWinner } from "@/lib/types";
import React from "react";
import ContextInfo from "../common/ContextInfo";
import { formatDateTime } from "@/lib/utils";

const RaffleWinnerCard = ({ data }: { data: RaffleWinner }) => {
  return (
    <div className="border border-slate-200 rounded-2xl p-4 relative">
      <ContextInfo title="User Email" value={data.email} spacer="mb-2" />
      <ContextInfo title="Prize" value={data.prize} spacer="mb-2" />
      <ContextInfo
        title="Ticket"
        value=""
        customValue={
          <div className="text-xs font-bold">{data.winning_key}</div>
        }
        spacer="mb-2"
      />
      <ContextInfo
        title="Date Drawn"
        value={formatDateTime(data.drawn_at)}
        isLast
      />
    </div>
  );
};

export default RaffleWinnerCard;
