import { RaffleTicket } from "@/lib/types";
import React from "react";
import ContextInfo from "../common/ContextInfo";
import { formatDateTime } from "@/lib/utils";

const RaffleTicketCard = ({ data }: { data: RaffleTicket }) => {
  return (
    <div className="border border-slate-200 rounded-2xl p-4 relative">
      <ContextInfo title="User Email" value={data.email} spacer="mb-2" />
      <ContextInfo title="Ticket" value="" customValue={<div className="text-xs font-bold">{data.t_key}</div>} spacer="mb-2" />
      <ContextInfo title="Date Purchased" value={formatDateTime(data.purchased_at)} isLast />
    </div>
  );
};

export default RaffleTicketCard;
