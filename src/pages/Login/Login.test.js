import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

test("renders sign in with google button and Logo", () => {
  const { getByText, getByAltText } = render(<Login location={{state: null}}/>);
  const loginButton = getByText("Sign in with Google");
  const summerCampLogo = getByAltText("Logo");
  expect(loginButton).toBeInTheDocument();
  expect(summerCampLogo).toBeInTheDocument();
});
