import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import Article from "./Article";
import { BrowserRouter as Router } from "react-router-dom";
import * as axios from "axios";

import * as mockArticleService from "../../services/fakeArticleService";

jest.mock("axios");

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
    case "testing/Articles/1":
      return Promise.resolve({
        data: mockArticleService.getMockedArticlesById(1),
      });
    case "testing/Articles/0":
      return Promise.resolve({
        data: mockArticleService.getMockedArticlesById(0),
      });
    }
  });

  axios.delete.mockImplementation(() => {
    return Promise.resolve({
      status: 200
    });
  });
});

test("renders article title if admin", async () => {
  const user = {
    permissionLevel: "admin",
  };

  const { findByTestId } = render(
    <Router>
      <Article match={{ params: { id: 1 } }} user={user} />
    </Router>
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
  const user = {
    permissionLevel: "user",
  };

  const { findByTestId, queryByText } = render(
    <Router>
      <Article match={{ params: { id: 1 } }} user={user} />
    </Router>
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
  const user = {
    permissionLevel: "admin",
  };

  const { queryByText } = render(
    <Router>
      <Article match={{ params: { id: 0 } }} user={user} />
    </Router>
  );

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
  const user = {
    permissionLevel: "admin",
  };

  const { findByTestId } = render(
    <Router>
      <Article match={{ params: { id: 1 } }} user={user} />
    </Router>
  );

  const deleteButton = await findByTestId("buttonDelete");
  fireEvent.click(deleteButton);
  expect(window.location.pathname).toBe("/");
});

test("Button capture test for edit", async () => {
  const user = {
    permissionLevel: "admin",
  };

  const { findByTestId } = render(
    <Router>
      <Article match={{ params: { id: 1 } }} user={user} />
    </Router>
  );
  const editButton = await findByTestId("buttonEdit");
  fireEvent.click(editButton);
  expect(window.location.pathname).toBe("/articles/1/edit");
});

afterEach(cleanup);
