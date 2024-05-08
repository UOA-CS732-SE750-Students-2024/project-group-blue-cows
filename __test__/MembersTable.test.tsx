import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MembersTable from "@/components/members/MembersTable";
import { MemberPageContextProvider } from "@/components/members/MemberPageContext";

const membersData = [
  {
    name: "Tristan Mona",
    email: "tmon261@aucklanduni.ac.nz",
    upi: "ghi",
    year_of_study: 4,
    student_id: "ghi",
    paid: false,
    isAdmin: true,
  },
  {
    name: "Alex Hope",
    email: "ahop089@aucklanduni.ac.nz",
    upi: "ahop089",
    year_of_study: 4,
    student_id: "why",
    paid: false,
    isAdmin: true,
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  render(
    <MemberPageContextProvider initialMembers={membersData}>
      <MembersTable />
    </MemberPageContextProvider>
  );
});

test("it renders input fields", () => {
  const nameInputFields = screen.getByPlaceholderText("Filter by name...");
  expect(nameInputFields).toBeInTheDocument();

  const upiInputFields = screen.getByPlaceholderText("Filter by UPI...");
  expect(upiInputFields).toBeInTheDocument();
});
