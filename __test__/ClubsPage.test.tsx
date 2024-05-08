import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClubsPage from "@/app/clubs/page";

beforeEach(() => {
  // Arrange
  render(<ClubsPage />);
});

test("it renders input field on search clubs screen", () => {
  // Act
  const inputFields = screen.getByPlaceholderText("Search");

  // Assert
  expect(inputFields).toBeInTheDocument();
});

test("it renders all the filter buttons on search club screen", async () => {
  const buttons = await screen.findAllByRole("button");

  const allButton = buttons.find((button) => button.textContent === "All");
  expect(allButton).toBeInTheDocument();

  const academicButton = buttons.find(
    (button) => button.textContent === "Academic and specialist"
  );
  expect(academicButton).toBeInTheDocument();

  const sportButton = buttons.find((button) => button.textContent === "Sport");
  expect(sportButton).toBeInTheDocument();

  const specialButton = buttons.find(
    (button) => button.textContent === "Special Interest"
  );
  expect(specialButton).toBeInTheDocument();

  const religiousButton = buttons.find(
    (button) => button.textContent === "Religious and spiritual"
  );
  expect(religiousButton).toBeInTheDocument();

  const causesButton = buttons.find(
    (button) => button.textContent === "Causes"
  );
  expect(causesButton).toBeInTheDocument();

  const culturalButton = buttons.find(
    (button) => button.textContent === "Cultural"
  );
  expect(culturalButton).toBeInTheDocument();
});
