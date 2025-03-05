import { IUser } from "@repo/types/Dummy.type";
import axios from "axios";

export interface DummyUserResponse {
  users: IUser[];
}

export const DUMMY_ROUTES = {
  USERS: "/users",
};

export const dummyClient = axios.create({
  baseURL: "https://dummyjson.com/",
});
