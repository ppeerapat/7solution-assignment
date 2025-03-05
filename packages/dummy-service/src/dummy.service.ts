import { IDepartment, IUser } from "@repo/types/Dummy.type";
import { DUMMY_ROUTES, dummyClient, DummyUserResponse } from "./dummy.instance";

export async function getDummyUsers() {
  const dummyResponse = await dummyClient.get<DummyUserResponse>(
    DUMMY_ROUTES.USERS
  );

  return dummyResponse.data.users;
}

export function getUsernNameKey(user: IUser) {
  return `${user.firstName}${user.lastName}`;
}

export function groupUsersByDepartment(users: IUser[]) {
  const departments = users.reduce(
    (acc, user) => {
      const userDepartment = user.company.department;

      //Initiate at the first user of the department
      if (typeof acc[userDepartment] === "undefined") {
        acc[userDepartment] = {
          male: 0,
          female: 0,
          ageRange: "XX-XX",
          hair: {},
          addressUser: {},
        };
      }

      //Gender Counter
      if (user.gender === "male") {
        acc[userDepartment].male += 1;
      }
      if (user.gender === "female") {
        acc[userDepartment].female += 1;
      }

      //Age range calculator
      const [minAge, maxAge] = acc[userDepartment].ageRange.split("-");
      if (minAge === "XX" || maxAge === "XX") {
        acc[userDepartment].ageRange = `${user.age}-${user.age}`;
      } else {
        if (Number(minAge) > Number(user.age)) {
          acc[userDepartment].ageRange = `${user.age}-${maxAge}`;
        } else if (Number(maxAge) < Number(user.age)) {
          acc[userDepartment].ageRange = `${minAge}-${user.age}`;
        }
      }

      //Hair counter
      if (typeof acc[userDepartment].hair[user.hair.color] === "undefined") {
        acc[userDepartment].hair[user.hair.color] = 1;
      } else {
        acc[userDepartment].hair[user.hair.color]! += 1;
      }

      //User address accumulator
      acc[userDepartment].addressUser[getUsernNameKey(user)] =
        user.address.postalCode;

      return acc;
    },
    {} as Record<string, IDepartment>
  );

  return departments;
}
