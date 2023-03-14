import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import UpdateInvoice from "./newInvoice";
import { ChakraProvider } from "@chakra-ui/react";
import UploadImage from "../../components/uploadImg";

describe("<UpdateInvoice />", () => {
  test("render update/insert invoice card", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <UpdateInvoice />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getAllByRole("option").length).toBe(13);
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Supplier")).toBeInTheDocument();
    expect(screen.getByText("Cost")).toBeInTheDocument();
    expect(screen.getByText("Items purchased")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update/ })).toBeInTheDocument();
  });

  test("render upload image card", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <UpdateInvoice>
            <UploadImage />
          </UpdateInvoice>
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("or click to upload")).toBeInTheDocument();
  });

  test("insert of invoice with valid field inputs", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <UpdateInvoice />
        </BrowserRouter>
      </ChakraProvider>
    );

    const inputY = screen.getByText("Year");
    const inputS = screen.getByText("Supplier");
    const inputC = screen.getByText("Cost");
    const inputItems = screen.getByText("Items purchased");
    const inputSubmit = screen.getByRole("button", { name: /Update/ });

    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "July" })
    );
    userEvent.type(inputY, "2022");
    userEvent.type(inputS, "D.A. food");
    userEvent.type(inputC, "1988.88");
    userEvent.type(inputItems, "Eggs, Chicken, Pork Belly");
    userEvent.click(inputSubmit);

    expect(screen.getByText("Invoice uploaded")).toBeInTheDocument();
  });

  test("insert of invoice with unfilled field inputs", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <UpdateInvoice />
        </BrowserRouter>
      </ChakraProvider>
    );

    const inputY = screen.getByText("Year");
    const inputItems = screen.getByText("Items purchased");
    const inputSubmit = screen.getByRole("button", { name: /Update/ });

    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "July" })
    );
    userEvent.type(inputY, "2022");
    userEvent.type(inputItems, "Eggs, Chicken, Pork Belly");
    userEvent.click(inputSubmit);

    expect(screen.getByText("Invoice uploaded")).not.toBeVisible();
  });
});
