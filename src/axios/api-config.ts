import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
});

api.interceptors.request.use((requestConfig: any) => {
  const token = localStorage.getItem("token");
  if (token && token.length) {
    requestConfig.headers.common["x-auth"] = token;
  }

  return requestConfig;
});

const EndPoints = {
  players: "players",
};

export { api, EndPoints };
