import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClubsPage from "@/app/clubs/page";

test("it renders input field on search clubs screen", () => {
  //Arrange
  render(<ClubsPage />);

  // Act
  const inputFields = screen.getByPlaceholderText("Search");

  // Assert
  expect(inputFields).toBeInTheDocument();
});
