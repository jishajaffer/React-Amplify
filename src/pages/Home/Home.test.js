import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import * as mockArticleService from "../../services/fakeArticleService";
import * as mockCategoryService from "../../services/fakeCategoryService";

const admin = "admin";
const regular = "user";

import * as axios from "axios";

// Mock out all top level functions, such as get, put, delete and post:

jest.mock("axios");

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
    case "testing/Articles":
      return Promise.resolve({
        data: mockArticleService.getMockedArticles(),
      });
    case "testing/Categories":
      return Promise.resolve({
        data: mockCategoryService.getMockedCategories(),
      });
    case "testing/Articles/Summercamp":
      return Promise.resolve({
        data: mockArticleService.getMockedArticlesByCategory("Summercamp"),
      });
    case "testing/Articles/COVID-19":
      return Promise.resolve({
        data: mockArticleService.getMockedArticlesByCategory("COVID-19"),
      });
    case "testing/Articles/New Joiners":
      return Promise.resolve({
        data: mockArticleService.getMockedArticlesByCategory("New Joiners"),
      });
    case "testing/Articles/Business Update":
      return Promise.resolve({
        data: mockArticleService.getMockedArticlesByCategory(
          "Business Update"
        ),
      });
    }
  });
});

test("renders create new article if admin", () => {
  const user = {
    permissionLevel: admin,
  };
  const { getByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user} />
    </Router>
  );
  const newArticleButton = getByRole("link", { name: "Create New Article" });
  expect(newArticleButton).toBeInTheDocument();
});

test("doesn't render create new article if not an admin", () => {
  const user = {
    permissionLevel: regular,
  };
  const { queryByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user} />
    </Router>
  );
  const newArticleButton = queryByRole("link", { name: "Create New Article" });
  expect(newArticleButton).not.toBeInTheDocument();
});

test("renders edit article button on article card if admin", async () => {
  const user = {
    permissionLevel: admin,
  };
  const { getAllByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user} />
    </Router>
  );
  await waitForElement(() => getAllByRole("link", { name: "Edit" }));
  const editArticle = getAllByRole("link", { name: "Edit" });
  expect(editArticle).toHaveLength(4);
});

test("doesn't render edit article button on article card if not an admin", () => {
  const user = {
    permissionLevel: regular,
  };
  const { queryAllByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user} />
    </Router>
  );
  const editArticle = queryAllByRole("link", { name: "Edit" });
  expect(editArticle).toHaveLength(0);
});

test("when filtered to all, it should display all article cards", async () => {
  const user = {
    permissionLevel: regular,
  };
  const { getAllByText } = render(
    <Router>
      <Home location={{ search: "?filterCategory=All" }} user={user} />
    </Router>
  );
  // all article cards will have a heading with Sample Title written in it
  await waitForElement(() => getAllByText("Sample Title", { exact: false }));
  const articleCards = getAllByText("Sample Title", { exact: false });
  expect(articleCards).toHaveLength(4);
});

test("when filtered to summercamp, it should display 1 article card with category tag summercamp", async () => {
  const user = {
    permissionLevel: regular,
  };
  const { getAllByText } = render(
    <Router>
      <Home location={{ search: "?filterCategory=Summercamp" }} user={user} />
    </Router>
  );
  // all article cards will have a heading with Sample Title written in it
  await waitForElement(() => getAllByText("Sample Title", { exact: false }));
  const articleCards = getAllByText("Sample Title", { exact: false });
  expect(articleCards).toHaveLength(1);
});

test("when filtered to COVID-19, it should display 2 article cards with category tag COVID-19", async () => {
  const user = {
    permissionLevel: regular,
  };
  const { getAllByText } = render(
    <Router>
      <Home location={{ search: "?filterCategory=COVID-19" }} user={user} />
    </Router>
  );
  // all article cards will have a heading with Sample Title written in it
  await waitForElement(() => getAllByText("Sample Title", { exact: false }));
  const articleCards = getAllByText("Sample Title", { exact: false });
  expect(articleCards).toHaveLength(2);
});

test("when filtered to Business Update, it should display 0 article cards", async () => {
  const user = {
    permissionLevel: regular,
  };
  const { queryAllByText } = render(
    <Router>
      <Home
        location={{ search: "?filterCategory=Business Update" }}
        user={user}
      />
    </Router>
  );
  // all article cards will have a heading with Sample Title written in it
  await waitForElement(() => queryAllByText("Sample Title", { exact: false }));
  const articleCards = queryAllByText("Sample Title", { exact: false });
  expect(articleCards).toHaveLength(0);
});
