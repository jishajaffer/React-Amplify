import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

const admin = "admin";
const regular = "user";

test("renders create new article if admin", () => {
  const user = {
    permissionLevel: admin
  };
  const { getByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user}/>
    </Router>
  );
  const newArticleButton = getByRole("link", {name: "Create New Article"});
  expect(newArticleButton).toBeInTheDocument();
});

test("doesn't render create new article if not an admin", () => {
  const user = {
    permissionLevel: regular
  };
  const { queryByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user}/>
    </Router>
  );
  const newArticleButton = queryByRole("link", {name: "Create New Article"});
  expect(newArticleButton).not.toBeInTheDocument();
});

test("renders edit article button on article card if admin", () => {
  const user = {
    permissionLevel: admin
  };
  const { getAllByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user}/>
    </Router>
  );
  const editArticle = getAllByRole("link", {name: "Edit"});
  expect(editArticle).toHaveLength(4);
});

test("doesn't renders edit article button on article card if not an admin", () => {
  const user = {
    permissionLevel: regular
  };
  const { queryAllByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user}/>
    </Router>
  );
  const editArticle = queryAllByRole("link", {name: "Edit"});
  expect(editArticle).toHaveLength(0);
});

test("when filtered to all, it should display all article cards", () => {
  const user = {
    permissionLevel: regular
  };
  const { getAllByText } = render(
    <Router>
      <Home location={{ search: "?filterCategory=All" }} user={user}/>
    </Router>
  );
  // all article cards will have a heading with Sample Title written in it
  const articleCards = getAllByText("Sample Title", { exact: false });
  expect(articleCards).toHaveLength(4);
});

test("when filtered to summercamp, it should display 1 article card with category tag summercamp", () => {
  const user = {
    permissionLevel: regular
  };
  const { getAllByText } = render(
    <Router>
      <Home location={{ search: "?filterCategory=Summercamp" }} user={user}/>
    </Router>
  );
  // all article cards will have a heading with Sample Title written in it
  const articleCard = getAllByText("Sample Title", { exact: false });
  expect(articleCard).toHaveLength(1);
});

test("when filtered to COVID-19, it should display 2 article cards with category tag COVID-19", () => {
  const user = {
    permissionLevel: regular
  };
  const { getAllByText } = render(
    <Router>
      <Home location={{ search: "?filterCategory=COVID-19" }} user={user}/>
    </Router>
  );
  // all article cards will have a heading with Sample Title written in it
  const articleCard = getAllByText("Sample Title", { exact: false });
  expect(articleCard).toHaveLength(2);
});

test("when filtered to Business Update, it should display 0 article cards", () => {
  const user = {
    permissionLevel: regular
  };
  const { queryAllByText } = render(
    <Router>
      <Home location={{ search: "?filterCategory=Business Update" }} user={user}/>
    </Router>
  );
  // all article cards will have a heading with Sample Title written in it
  const articleCard = queryAllByText("Sample Title", { exact: false });
  expect(articleCard).toHaveLength(0);
});