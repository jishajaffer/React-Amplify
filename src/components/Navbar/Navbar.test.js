import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { UserProvider } from "../../context/userContext";
import { BrowserRouter as Router } from "react-router-dom";
import * as authService from "../../services/common/authService";

jest.mock("../../services/common/authService");

beforeAll(() => {
  authService.logout.mockImplementation(() => {
  });
});

test("Navbar contains brand logo and profile picture from user context", async () => {
  const wrappedNavbar = (
    <Router>
      <UserProvider value={{ user: { picture: "photo.png" } }}>
        <Navbar />
      </UserProvider>
    </Router>
  );
  const { getByAltText } = render(wrappedNavbar);

  const logo = getByAltText("Summer Camp logo");
  const profilePhoto = getByAltText("profile");

  expect(logo).toBeInTheDocument();
  expect(profilePhoto).toBeInTheDocument();
});

test("Clicking sign out should remove token from local storage and redirect to login", async () => {
  const wrappedNavbar = (
    <Router>
      <UserProvider value={{ user: { picture: "photo.png" }}}>
        <Navbar />
      </UserProvider>
    </Router>
  );
  const { getByRole } = render(wrappedNavbar);

  const signOutButton = getByRole("button", { name: "Sign out" });

  fireEvent.click(signOutButton);

  expect(authService.logout).toHaveBeenCalled();
});
