import axios from "axios";
import { Game } from "./types";
import { game } from "./network";

export function axiosHander<T>(
  url: string,
  method: string,
  data?: any,
  isAuthorized?: boolean
) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const config = {
    headers: isAuthorized ? headers : {},
  };

  return axios<T>({
    method: method,
    url: url,
    data: data,
    ...config,
  });
}

export async function fetchSingleGame(id: string) {
  const res = await axiosHander<Game>(game.detail + id, "GET", null, true);

  return res.data;
}