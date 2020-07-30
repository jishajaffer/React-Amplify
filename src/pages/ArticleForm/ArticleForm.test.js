import React from "react";
import {
  fireEvent,
  render
} from "@testing-library/react";
import ArticleForm from "./ArticleForm";

test("renders an empty article form and disabled Publish button if in create mode", async () => {
  const user = {
    permissionLevel: "admin",
  };

  const { getByTestId, getByText } = render(<ArticleForm user={user} />);
  const titleInput = getByTestId("title");
  const contentInput = getByTestId("content");
  const categorySelect = getByTestId("categoryId");
  const imageInput = getByTestId("imageUrl");
  const submitButton = getByText("Publish");

  expect(titleInput).toBeInTheDocument();
  expect(contentInput).toBeInTheDocument();
  expect(categorySelect).toBeInTheDocument();
  expect(imageInput).toBeInTheDocument();
  expect(submitButton).toHaveAttribute("disabled");
});

test("renders a populated article form if in edit mode", async () => {
  const user = {
    permissionLevel: "admin",
  };

  const { getByTestId, getByText } = render(
    <ArticleForm user={user} match={{ params: { id: 1 } }} />
  );
  const titleInput = getByTestId("title");
  const contentInput = getByTestId("content");
  const categorySelect = getByTestId("categoryId");
  const imageInput = getByTestId("imageUrl");
  const submitButton = getByText("Publish");

  expect(titleInput).toBeInTheDocument();
  expect(contentInput).toBeInTheDocument();
  expect(categorySelect).toBeInTheDocument();
  expect(imageInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("cancel takes the user back", async () => {
  const user = {
    permissionLevel: "admin",
  };

  const goBack = jest.fn();
  const { getByText } = render(
    <ArticleForm user={user} history={{ goBack: goBack }} />
  );
  const cancelButton = getByText("Cancel");

  fireEvent.click(cancelButton);

  expect(goBack).toHaveBeenCalled();
});

test("submiting takes the user to the homepage", async () => {
  const user = {
    permissionLevel: "admin",
  };

  const replace = jest.fn();
  const { getByText } = render(
    <ArticleForm
      user={user}
      history={{ replace: replace }}
      match={{ params: { id: 1 } }}
    />
  );
  const submitButton = getByText("Publish");

  expect(submitButton).not.toHaveAttribute("disabled");
  fireEvent.click(submitButton);
  expect(replace).toHaveBeenCalled();
});
