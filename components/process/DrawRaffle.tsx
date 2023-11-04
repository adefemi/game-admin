import React from "react";
import { Button } from "../ui/button";
import { axiosHander } from "@/lib/handlers";
import { raffle } from "@/lib/network";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useModal } from "../hooks/useConfirmation";

type DrawRaffleProps = {
  raffle_id: string;
  winning_key?: string;
};

const drawRaffle = async (data: DrawRaffleProps) => {
  const { data: response } = await axiosHander(raffle.draw, "POST", data, true);
  return response;
};

const DrawRaffle = ({ raffleID }: { raffleID: string }) => {
  const { setVisible, getModalContent } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(drawRaffle, {
    onSuccess: () => {
      toast.success("Raffle drawn successfully");
      setVisible(false);
      return queryClient.invalidateQueries([
        `raffle_tickets_${raffleID}`,
        `raffle_${raffleID}`,
        `raffle_winner_${raffleID}`,
        `raffle_results_${raffleID}`,
      ]);
    },
    onError: (e:any) => {
      toast.error(e.response?.data.error as string || e.message);
    },
  });

  const handleSubmit = () => {
    if (isLoading) return;
    mutate({ raffle_id: raffleID });
  };

  return (
    <>
      <Button className="bg-secondary text-xs" onClick={() => setVisible(true)}>
        + Draw
      </Button>
      {getModalContent(
        <div>
          <h3 className="font-medium text-lg mb-3">Confirm Raffle Draw?</h3>
          <p className="text-base text-slate-700">
            You are about to draw a raffle, this action cannot be undone. Are
            you sure you want to continue?
          </p>
          <div className="action mt-7 flex item-center justify-end">
            <Button
              variant="outline"
              className="mr-3"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary"
              onClick={handleSubmit}
              loading={isLoading}
            >
              Continue
            </Button>
          </div>
        </div>,
        "w-full max-w-lg px-6 py-5 shadow-xl"
      )}
    </>
  );
};

export default DrawRaffle;
