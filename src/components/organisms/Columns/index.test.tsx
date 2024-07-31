import { render, screen } from "@testing-library/react";
import Collumns from "./index";

jest.mock("../RegistrationCard", () => ({
  __esModule: true,
  default: jest.fn(),
}));

it("when it renders correct number of columns", () => {
  const registrations = [
    { id: 1, status: "REVIEW" },
    { id: 2, status: "APPROVED" },
  ];

  render(<Collumns registrations={registrations} />);

  const column1 = screen.queryAllByText("Pronto para revisar");
  const column2 = screen.queryAllByText("Aprovado");
  const columnTitles = [...column1, ...column2].filter(
    (element) => element !== undefined
  );
  expect(columnTitles).toHaveLength(2);
});
