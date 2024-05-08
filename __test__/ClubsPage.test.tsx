import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClubsPage from "@/app/clubs/page";
import { getAllClubs } from "@/services/clubServices";

jest.mock("@/services/clubServices", () => ({
  getAllClubs: jest.fn(),
}));

const mockData = [
  {
    id: "test",
    name: "WDCC",
    description: "A club for cows",
    membership_fee: "0.00",
    category: "Academic and specialist",
    logo: "test",
  },
  {
    id: "meh",
    name: "ASPA",
    description: "A club for pool players",
    membership_fee: "10.00",
    category: "Sports",
    logo: "test",
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  //Arrange
  render(<ClubsPage />);
});

test("it renders input field", () => {
  // Act
  const inputFields = screen.getByPlaceholderText("Search");

  // Assert
  expect(inputFields).toBeInTheDocument();
});

test("it renders all the filter buttons", async () => {
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

test("it finds club based on input field", async () => {
  (getAllClubs as jest.Mock).mockResolvedValue(mockData);
  const inputField = screen.getByPlaceholderText("Search");
  fireEvent.change(inputField, { target: { value: "WDCC" } });

  expect(inputField).toHaveValue("WDCC");

  const displayedData = await screen.findByText("A club for cows");
  expect(displayedData).toBeInTheDocument();
});

test("it finds club based on category button", async () => {
  (getAllClubs as jest.Mock).mockResolvedValue(mockData);

  const buttons = await screen.findAllByRole("button");
  const sportButton = buttons.find((button) => button.textContent === "Sport");
  if (sportButton) {
    fireEvent.click(sportButton);
  }

  const displayedData = await screen.findByText("A club for pool players");
  expect(displayedData).toBeInTheDocument();
});
