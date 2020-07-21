import React from "react";
import { render } from "@testing-library/react";
import Post from "./Post";

test("renders post title", async () => {
  const isAdmin = true;

  const { findByTestId } = render(
    <Post match={{ params: { id: 1 } }} />
  );
  const title = await findByTestId("titleId");
  const image = await findByTestId("imageId");
  const content = await findByTestId("contentId");

  expect(title).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(content).toBeInTheDocument();

  //If Admin
  if (isAdmin) {
    const editButton = await findByTestId("buttonEdit");
    const cancelButton = await findByTestId("buttonCancel");
    const deleteButton = await findByTestId("buttonDelete");
    expect(editButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  }
});
