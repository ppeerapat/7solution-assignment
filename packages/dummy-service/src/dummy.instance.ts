import axios from "axios";

export const DUMMY_ROUTES = {
  USERS: "/users",
};

export const dummyClient = axios.create({
  baseURL: "https://dummyjson.com/",
});
