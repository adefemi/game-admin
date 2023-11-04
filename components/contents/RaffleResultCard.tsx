import { RaffleResult } from "@/lib/types";
import React from "react";
import ContextInfo from "../common/ContextInfo";
import { formatDateTime } from "@/lib/utils";

const RaffleResultCard = ({ data }: { data: RaffleResult }) => {
  return (
    <div className="border border-slate-200 rounded-2xl p-4 relative">
      <ContextInfo
        title="Winning Key"
        value=""
        customValue={
          <div className="text-xs font-bold">{data.winning_key}</div>
        }
        spacer="mb-2"
      />
      <ContextInfo
        title="Drawn At"
        value={formatDateTime(data.drawn_at)}
        isLast
      />
    </div>
  );
};

export default RaffleResultCard;
