import {
  render,
  screen,
  fireEvent,
  getByTestId,
  waitFor,
  toBeDisabled,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
//import user from '@testing-library/user-event'
//import { render, screen, waitFor } from '@redwoodjs/testing'

import SimpleCard from "./login";
import { ChakraProvider } from "@chakra-ui/react";

describe("<SimpleCard />", () => {
  test("render login card", () => {
    render(
      <BrowserRouter>
        <SimpleCard />
      </BrowserRouter>
    );

    const inputEl = screen.getByTestId("email-input");
    const inputPw = screen.getByTestId("password-input")
    const button = screen.getByRole("button", { name: /Sign in/ });

    expect(inputEl).toBeInTheDocument();
    expect(inputPw).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "email");
    expect(inputPw).toHaveAttribute("type", "password");
  });

  test("pass email and password to test input fields", async () => {
    const handleSubmit = jest.fn();
    render(
      <BrowserRouter>
        <SimpleCard>
          <form onSubmit={handleSubmit} />
        </SimpleCard>
      </BrowserRouter>
    );

    const inputEl = screen.getByTestId("email-input");
    const inputPw = screen.getByTestId("password-input");

    userEvent.type(inputEl, "hawkertowntest@outlook.com");
    userEvent.type(inputPw, "MengXiang080721");
    const button = screen.getByRole("button", { name: /Sign in/ });
    fireEvent.click(button);

    expect(screen.getByTestId("email-input")).toHaveValue(
      "hawkertowntest@outlook.com"
    );
    expect(screen.getByTestId("password-input")).toHaveValue("MengXiang080721");
  });

  test("pass invalid account details to test log-in page", async () => {
    const email = "hawkertowntest";
    const password = "MengXiang080721";
    const handleSubmit = jest.fn();

    render(
      <ChakraProvider>
        <BrowserRouter>
          <SimpleCard onSubmit={handleSubmit} />
        </BrowserRouter>
      </ChakraProvider>
    );

    const emailField = screen.getByLabelText("Email address");
    const passwordField = screen.getByLabelText("Password");
    const submitButton = screen.getByTestId("form");

    userEvent.type(emailField, email);
    userEvent.type(passwordField, password);
    fireEvent.submit(submitButton);

    expect(
      await screen.findByText("our invoice, order managing system", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("pass valid account details to test log-in page", async () => {
    const email = "hawkertowntest@outlook.com";
    const password = "MengXiang080721";
    const handleSubmit = jest.fn();

    render(
      <ChakraProvider>
        <BrowserRouter>
          <SimpleCard onSubmit={handleSubmit} />
        </BrowserRouter>
      </ChakraProvider>
    );

    const emailField = screen.getByLabelText("Email address");
    const passwordField = screen.getByLabelText("Password");
    const submitButton = screen.getByTestId("form");

    userEvent.type(emailField, email);
    userEvent.type(passwordField, password);
    fireEvent.submit(submitButton);

    await waitFor(() =>
      expect(
        screen.queryByText("to enjoy all our cool features", { exact: false })
      ).not.toBeInTheDocument()
    );
  });
});
