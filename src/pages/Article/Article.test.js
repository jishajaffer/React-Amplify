import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import Article from "./Article";

test("renders article title if admin", async () => {
  const { findByTestId } = render(
    <Article match={{ params: { id: 1, isAdmin: true } }} />
  );
  const title = await findByTestId("titleId");
  const image = await findByTestId("imageId");
  const content = await findByTestId("contentId");
  const category = await findByTestId("categoryId");

  expect(title).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(content).toBeInTheDocument();
  expect(category).toBeInTheDocument();

  const editButton = await findByTestId("buttonEdit");
  const deleteButton = await findByTestId("buttonDelete");
  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

test("renders article title for non-admin user", async () => {
  const { findByTestId, queryByText } = render(
    <Article match={{ params: { id: 1, isAdmin: false } }} />
  );
  const title = await findByTestId("titleId");
  const image = await findByTestId("imageId");
  const content = await findByTestId("contentId");
  const category = await findByTestId("categoryId");

  expect(title).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(content).toBeInTheDocument();
  expect(category).toBeInTheDocument();

  const editButton = queryByText("buttonEdit");
  const deleteButton = queryByText("buttonDelete");
  expect(editButton).not.toBeInTheDocument();
  expect(deleteButton).not.toBeInTheDocument();
});

test("No rendering if its invalid id", () => {
  const { queryByText, debug } = render(
    <Article match={{ params: { id: 0, isAdmin: true } }} />
  );

  debug();
  const title = queryByText("titleId");
  const image = queryByText("imageId");
  const content = queryByText("contentId");
  const category = queryByText("categoryId");

  const editButton = queryByText("buttonEdit");
  const deleteButton = queryByText("buttonDelete");

  expect(title).not.toBeInTheDocument();
  expect(image).not.toBeInTheDocument();
  expect(content).not.toBeInTheDocument();
  expect(category).not.toBeInTheDocument();
  expect(editButton).not.toBeInTheDocument();
  expect(deleteButton).not.toBeInTheDocument();
});

test("Button capture test for delete", async () => {
  function handleDelete() {}

  const { findByTestId } = render(
    <Article
      onClick={handleDelete}
      match={{ params: { id: 1, isAdmin: true } }}
    />
  );

  const deleteButton = await findByTestId("buttonDelete");
  fireEvent.click(deleteButton);
});

test("Button capture test for edit", async () => {
  function handleEdit() {}

  const { findByTestId } = render(
    <Article
      onClick={handleEdit}
      match={{ params: { id: 1, isAdmin: true } }}
    />
  );

  const editButton = await findByTestId("buttonEdit");
  fireEvent.click(editButton);
});

afterEach(cleanup);
