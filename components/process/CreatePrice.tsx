import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useModal } from "../hooks/useConfirmation";
import { axiosHander } from "@/lib/handlers";
import { raffle } from "@/lib/network";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CreatePriceProps = {
  game_id: string;
  draw_type: string;
  graphics: string;
  price_name: string;
  ticket_price: string;
  max_ticket: string;
  draw_date_time?: string;
};

const createPrice = async (data: any) => {
  const { data: response } = await axiosHander(
    raffle.create,
    "POST",
    data,
    true
  );
  return response;
};

const CreateRaffleTickets = ({ gameID }: { gameID: string }) => {
  const { setVisible, getModalContent } = useModal();
  const queryClient = useQueryClient();
  const [data, setData] = useState<CreatePriceProps>({
    game_id: gameID,
    draw_type: "",
    graphics: "",
    price_name: "",
    ticket_price: "",
    max_ticket: "",
  });

  const { mutate, isLoading } = useMutation(createPrice, {
    onSuccess: () => {
      toast.success("Raffle price created successfully");
      setVisible(false);
      return queryClient.invalidateQueries(`raffles_${gameID}`);
    },
    onError: () => {
      toast.error("An error occured");
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newData = {
      ...data,
      ticket_price: Number(data.ticket_price),
      max_ticket: Number(data.max_ticket),
      game_id: parseInt(gameID),
    };

    mutate(newData);
  };

  return (
    <>
      <Button className="bg-secondary text-xs" onClick={() => setVisible(true)}>
        + Create Raffle
      </Button>
      {getModalContent(
        <div className="w-full">
          <h3 className="text-xl mb-8">Create Raffle Price</h3>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="mt-5">
              <Label htmlFor="name" className="block mb-2">
                Name *
              </Label>
              <Input
                id="name"
                name="price_name"
                value={data.price_name}
                onChange={onChange}
                placeholder="e.g: Win for all"
                required
              />
            </div>
            <div>
              <Label className="block mb-2 mt-5">Draw Type *</Label>
              <Select
                name="draw_type"
                required
                value={data.draw_type}
                onValueChange={(val) =>
                  setData({
                    ...data,
                    draw_type: val,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose how raffle is drawn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="auto">
                      Auto (Automatically Draws ticket on draw time)
                    </SelectItem>
                    <SelectItem value="manual">
                      Manual (Manually Draws ticket when you which)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-5">
              <Label htmlFor="graphics" className="block mb-2">
                Graphics *
              </Label>
              <Input
                id="graphics"
                name="graphics"
                value={data.graphics}
                onChange={onChange}
                placeholder="something to display to users"
                required
              />
            </div>
            <div className="mt-5">
              <Label htmlFor="ticket_price" className="block mb-2">
                Ticket Price
              </Label>
              <Input
                id="ticket_price"
                name="ticket_price"
                type="number"
                value={data.ticket_price}
                onChange={onChange}
                placeholder="price of ticket"
              />
            </div>
            <div className="mt-5">
              <Label htmlFor="max_ticket" className="block mb-2">
                Max Ticket
              </Label>
              <Input
                id="max_ticket"
                name="max_ticket"
                type="number"
                value={data.max_ticket}
                onChange={onChange}
                placeholder="maximum ticket that can be purchased"
              />
            </div>

            {data.draw_type === "auto" && (
              <div className="mt-5">
                <Label htmlFor="name" className="block mb-2">
                  Draw Date and Time *
                </Label>
                <DatePicker
                  showIcon
                  selected={new Date(data.draw_date_time || Date.now())}
                  onChange={(date) =>
                    setData({
                      ...data,
                      draw_date_time: date?.toISOString(),
                    })
                  }
                  showTimeSelect
                  timeFormat="p"
                  timeIntervals={15}
                  dateFormat="Pp"
                  placeholderText="Select draw date and time"
                  className="w-full block border border-slate-200 rounded-md px-4 py-2 text-sm text-slate-700"
                />
              </div>
            )}
            <Button
              type="submit"
              className="mt-8 bg-secondary block w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              Create
            </Button>
          </form>
        </div>,
        "w-full max-w-md px-6 py-5 shadow-xl"
      )}
    </>
  );
};

export default CreateRaffleTickets;
