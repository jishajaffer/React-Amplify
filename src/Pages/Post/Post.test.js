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

test("No rendering if its invalid id", () => {
  const isAdmin = true;

  const { queryByText, debug } = render(
    <Post match={{ params: { id: 0 } }} />
  );

  debug();
  const title =  queryByText("titleId");
  const image =  queryByText("imageId");
  const content =  queryByText("contentId");
  const editButton =  queryByText("buttonEdit");
  const cancelButton =  queryByText("buttonCancel");
  const deleteButton =  queryByText("buttonDelete");

  expect(title).not.toBeInTheDocument();
  expect(image).not.toBeInTheDocument();
  expect(content).not.toBeInTheDocument();
  expect(editButton).not.toBeInTheDocument();
  expect(cancelButton).not.toBeInTheDocument();
  expect(deleteButton).not.toBeInTheDocument();

});
