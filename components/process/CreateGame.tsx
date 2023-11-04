import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useModal } from "../hooks/useConfirmation";
import { axiosHander } from "@/lib/handlers";
import { game } from "@/lib/network";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { reactQueryCacheControllers } from "@/lib/contants";

type CreateGameProps = {
  gametype: string;
  name: string;
  cover?: string;
};

const createGame = async (data: CreateGameProps) => {
  const { data: response } = await axiosHander(game.create, "POST", data, true);
  return response;
};

const CreateGame = () => {
  const { setVisible, getModalContent } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createGame, {
    onSuccess: () => {
      toast.success("Game created successfully");
      setVisible(false);
      return queryClient.invalidateQueries(reactQueryCacheControllers.game);
    },
    onError: () => {
      toast.error("An error occured");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: CreateGameProps = {
      gametype: e.currentTarget.gametype.value,
      name: e.currentTarget.gamename.value,
    };

    if (e.currentTarget.cover.value) {
      data.cover = e.currentTarget.cover.value;
    }

    mutate(data);
  };

  return (
    <>
      <Button className="bg-secondary text-xs" onClick={() => setVisible(true)}>
        + Create Game
      </Button>
      {getModalContent(
        <div className="w-full">
          <h3 className="text-xl mb-8">Create Game</h3>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div>
              <Label className="block mb-2">Game Type *</Label>
              <Select name="gametype" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose game type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Raffle">Raffle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-5">
              <Label htmlFor="name" className="block mb-2">
                Name *
              </Label>
              <Input id="name" name="gamename" required />
            </div>
            <div className="mt-5">
              <Label htmlFor="cover" className="block mb-2">
                CoverLink
              </Label>
              <Input id="cover" name="name" />
            </div>
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

export default CreateGame;
