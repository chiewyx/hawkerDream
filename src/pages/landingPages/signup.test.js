import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import SignupCard from "./signup";
import { ChakraProvider } from "@chakra-ui/react";

describe("<SignupCard />", () => {
  test("render signup card", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <SignupCard />
        </BrowserRouter>
      </ChakraProvider>
    );
    const inputEl = screen.getByTestId("email-input");
    expect(inputEl).toBeInTheDocument();
    expect(screen.getByTestId("first name")).toBeInTheDocument();
    expect(screen.getByTestId("last name")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("submit button")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(3);
  });

  test("signup function works with correct input", async() => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <SignupCard />
        </BrowserRouter>
      </ChakraProvider>
    );

    const inputEl = screen.getByTestId("email-input");
    const inputPw = screen.getByTestId("password");
    const inputFirst = screen.getByTestId("first name");
    const inputLast = screen.getByTestId("last name");
    userEvent.type(inputEl, "hawkertowntest@outlook.com");
    userEvent.type(inputPw, "MengXiang080721");
    userEvent.type(inputFirst, "Thomas");
    userEvent.type(inputLast, "Shelby")
    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Hawker" })
    );
    userEvent.click(screen.getByTestId("submit button"))

    expect(await screen.findByText("Sign up successful")).toBeInTheDocument();
  });

  test("signup function works with incorrect input", async() => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <SignupCard />
        </BrowserRouter>
      </ChakraProvider>
    );

    const inputEl = screen.getByTestId("email-input");
    const inputPw = screen.getByTestId("password");
    const inputFirst = screen.getByTestId("first name");
    const inputLast = screen.getByTestId("last name");
    userEvent.type(inputEl, "hawkertowntest");
    userEvent.type(inputPw, "MengXiang080721");
    userEvent.type(inputFirst, "Thomas");
    userEvent.type(inputLast, "Shelby")
    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Hawker" })
    );
    userEvent.click(screen.getByTestId("submit button"))

    await waitFor(() => expect(screen.queryByText("Sign up successful")).not.toBeInTheDocument()); 
  });
});
