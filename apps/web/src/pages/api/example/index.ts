import {
  getDummyUsers,
  groupUsersByDepartment,
} from "@repo/dummy-service/dummy.service";
import { IDepartment } from "@repo/types/Dummy.type";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, IDepartment>>
) {
  const users = await getDummyUsers();

  const departments = groupUsersByDepartment(users);

  res.status(200).json(departments);
}
