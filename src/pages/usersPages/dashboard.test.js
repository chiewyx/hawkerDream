import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./dashboard";
import { ChakraProvider } from "@chakra-ui/react";

describe("<Dashboard />", () => {
  test("render dashboard widgets", async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </ChakraProvider>
    );
    expect(screen.getByTestId("incomplete orders")).toBeInTheDocument();
    expect(screen.getByTestId("completed orders")).toBeInTheDocument();
    expect(screen.getByTestId("invoice")).toBeInTheDocument();
  });
});
