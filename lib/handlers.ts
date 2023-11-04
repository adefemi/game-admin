import axios from "axios";

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
