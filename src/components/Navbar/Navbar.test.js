import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { UserProvider } from "../../context/userContext";

test("Navbar contains brand logo and profile picture from user context", async () => {
  const wrappedNavbar = (
    <UserProvider value={{ user: { profilePhoto: "photo.png" } }}>
      <Navbar />
    </UserProvider>
  );
  const { getByAltText } = render(wrappedNavbar);

  const logo = getByAltText("Summer Camp logo");
  const profilePhoto = getByAltText("profile");

  expect(logo).toBeInTheDocument();
  expect(profilePhoto).toBeInTheDocument();
});
