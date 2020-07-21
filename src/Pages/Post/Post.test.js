import React from "react";
import { render } from "@testing-library/react";
import Post from "./Post";

test("renders learn react link", () => {
  console.log(render(<Post match={{params:{id: 1}}}/>));
  // const titleElement = getByText("Sample Title 1");
  // expect(titleElement).toBeInTheDocument();
  // debug();
});