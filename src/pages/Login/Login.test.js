import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

test("renders learn react link", () => {
  const { getByText, getByAltText } = render(<Login />);
  const loginButton = getByText("Login with Google");
  const summerCampLogo = getByAltText("Logo");
  expect(loginButton).toBeInTheDocument();
  expect(summerCampLogo).toBeInTheDocument();
});
