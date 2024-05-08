import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom";
import MembersTable from "@/components/members/MembersTable";
import { MemberPageContextProvider } from "@/components/members/MemberPageContext";

const membersData = [
  {
    name: "Tristan Mona",
    email: "tmon261@aucklanduni.ac.nz",
    upi: "tmon261",
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
  render(
    <MemberPageContextProvider initialMembers={membersData}>
      <MembersTable />
    </MemberPageContextProvider>
  );
});

test("it renders input fields and typed values", () => {
  const nameInputField = screen.getByPlaceholderText("Filter by name...");
  expect(nameInputField).toBeInTheDocument();
  act(() => {
    fireEvent.change(nameInputField, { target: { value: "Alex" } });
  });

  expect(nameInputField).toHaveValue("Alex");

  const upiInputField = screen.getByPlaceholderText("Filter by UPI...");
  expect(upiInputField).toBeInTheDocument();
  act(() => {
    fireEvent.change(upiInputField, { target: { value: "tmon261" } });
  });

  expect(upiInputField).toHaveValue("tmon261");
});

test("data table shows correct value when searched by name", () => {
  const nameInputField = screen.getByPlaceholderText("Filter by name...");

  act(() => {
    fireEvent.change(nameInputField, { target: { value: "Alex" } });
  });

  const name = screen.getByText("Alex Hope");
  expect(name).toBeInTheDocument();

  const notName = screen.queryByText("Tristan Mona");
  expect(notName).toBeNull();
});

test("data table shows correct value when searched by upi", () => {
  const nameInputField = screen.getByPlaceholderText("Filter by UPI...");
  act(() => {
    fireEvent.change(nameInputField, { target: { value: "tmon261" } });
  });

  const name = screen.getByText("Tristan Mona");
  expect(name).toBeInTheDocument();

  const notName = screen.queryByText("Alex Hope");
  expect(notName).toBeNull();
});
