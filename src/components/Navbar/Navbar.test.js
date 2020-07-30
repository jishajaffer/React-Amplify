import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { UserProvider } from "../../context/userContext";
import { BrowserRouter as Router } from "react-router-dom";

test("Navbar contains brand logo and profile picture from user context", async () => {
  const wrappedNavbar = (
    <Router>
    <UserProvider value={{ user: { profilePhoto: "photo.png" } }}>
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
