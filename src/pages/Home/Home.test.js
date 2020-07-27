import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

test("renders create new article if admin", () => {
  const user = {
    permissionLevel: true
  }
  const { getByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user}/>
    </Router>
  );
  const newArticleButton = getByRole('link', {name: "Create New Article"})
  expect(newArticleButton).toBeInTheDocument();
});

test("doesn't render create new article if not an admin", () => {
  const user = {
    permissionLevel: false
  }
  const { queryByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user}/>
    </Router>
  );
  const newArticleButton = queryByRole('link', {name: "Create New Article"})
  expect(newArticleButton).not.toBeInTheDocument()
});

test("renders edit article button on article card if admin", () => {
  const user = {
    permissionLevel: true
  }
  const { getAllByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user}/>
    </Router>
  );
  const editArticle = getAllByRole('link', {name: "Edit"})
  expect(editArticle).toHaveLength(4);
});

test("doesn't renders edit article button on article card if not an admin", () => {
  const user = {
    permissionLevel: false
  }
  const { queryAllByRole } = render(
    <Router>
      <Home location={{ search: null }} user={user}/>
    </Router>
  );
  const editArticle = queryAllByRole('link', {name: "Edit"})
  expect(editArticle).toHaveLength(0);
});