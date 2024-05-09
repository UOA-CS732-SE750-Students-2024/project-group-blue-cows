import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MembersTable from "@/components/members/MembersTable";
import { MemberPageContextProvider } from "@/components/members/MemberPageContext";
import { membersData } from "./mockData";

beforeEach(() => {
  render(
    <MemberPageContextProvider initialMembers={membersData}>
      <MembersTable headers={["name", "upi"]} />
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
