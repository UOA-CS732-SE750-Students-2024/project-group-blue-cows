import { GetInputsForClubDto } from "@/Dtos/formFieldInput/GetInputsForClubDto";
import { studentDataWithId } from "@/gateway/member/getAllMembersForClub";
import { combineMembersData } from "@/util/memberUtil";

it("combines student data with form field inputs correctly", () => {
  const studentDataList: studentDataWithId[] = [
    {
      id: "user1",
      name: "John",
      email: "john@example.com",
      upi: null,
      year_of_study: 2,
      student_id: "12345",
      paid: true,
      isAdmin: false,
    },
  ];

  const inputsList: GetInputsForClubDto[] = [
    {
      userId: "user1",
      formFieldInputs: [
        { fieldName: "input1", value: "value1" },
        { fieldName: "input2", value: "value2" },
      ],
    },
  ];

  // Expected output
  const expectedCombinedData = [
    {
      id: "user1",
      name: "John",
      email: "john@example.com",
      upi: null,
      year_of_study: 2,
      student_id: "12345",
      paid: true,
      isAdmin: false,
      formFieldInputs: [
        { fieldName: "input1", value: "value1" },
        { fieldName: "input2", value: "value2" },
      ],
    },
  ];

  // Call the function
  const combinedData = combineMembersData(studentDataList, inputsList);

  // Assertion
  expect(combinedData).toEqual(expectedCombinedData);
});
