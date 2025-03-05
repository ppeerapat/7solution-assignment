import { describe, test } from "@jest/globals";
import { getUsernNameKey, groupUsersByDepartment } from "./dummy.service";
import mock from "./dummy-user.mock";
import { countBy, groupBy, maxBy, minBy, uniq } from "lodash";

describe("Dummy Users, groupUsersByDepartment", () => {
  const mockUsers = mock.users;
  const departmentResult = groupUsersByDepartment(mockUsers);
  const userByDepartments = groupBy(mockUsers, "company.department");

  test("has correct set of departments", () => {
    const departments = Object.keys(departmentResult);

    const mockDepartments = uniq(mockUsers.map((u) => u.company.department));

    expect(departments).toEqual(expect.arrayContaining(mockDepartments));
  });

  test("each departments has correct number of male,female", () => {
    Object.entries(departmentResult).forEach(([departmentName, department]) => {
      const usersDepartment = userByDepartments[departmentName];

      expect(usersDepartment).toBeDefined();

      if (usersDepartment) {
        const genderCount = countBy(usersDepartment, "gender");

        expect(genderCount["male"] || 0).toEqual(department.male);
        expect(genderCount["female"] || 0).toEqual(department.female);
      }
    });
  });

  test("each departments has correct age range", () => {
    Object.entries(departmentResult).forEach(([departmentName, department]) => {
      const usersDepartment = userByDepartments[departmentName];

      expect(usersDepartment).toBeDefined();

      if (usersDepartment) {
        const minUser = minBy(usersDepartment, "age");
        const maxUser = maxBy(usersDepartment, "age");

        const range = department.ageRange.split("-");
        expect(minUser?.age).toEqual(Number(range[0]));
        expect(maxUser?.age).toEqual(Number(range[1]));
      }
    });
  });

  test("each departments has correct hair count", () => {
    Object.entries(departmentResult).forEach(([departmentName, department]) => {
      const usersDepartment = userByDepartments[departmentName];

      expect(usersDepartment).toBeDefined();

      if (usersDepartment) {
        const hairCount = countBy(usersDepartment, "hair.color");

        Object.entries(hairCount).forEach(([color, count]) => {
          expect(count).toEqual(department.hair[color]);
        });
      }
    });
  });

  test("each departments has correct user postcode", () => {
    Object.entries(departmentResult).forEach(([departmentName, department]) => {
      const usersDepartment = userByDepartments[departmentName];

      expect(usersDepartment).toBeDefined();

      if (usersDepartment) {
        expect(usersDepartment.length).toEqual(
          Object.keys(department.addressUser).length
        );
        usersDepartment.forEach((user) => {
          const userPostalCode = user.address.postalCode;
          const userNameKey = getUsernNameKey(user);
          expect(userPostalCode).toEqual(department.addressUser[userNameKey]);
        });
      }
    });
  });
});
