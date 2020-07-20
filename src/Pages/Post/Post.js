import React from "react";


import * as postsApi from "../../services/FakePostService";
let post = postsApi.getPostsById();

const Post = () => {
  // const title = "Sample Title"; //Need to be from service
  // const image = "https://picsum.photos/seed/picsum/200/300";
  // const content =
  //   "AND has amassed a wide variety of client experiences, resulting in lots of good project assets being generated - but not easy to find and browse";

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">{post.title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p className="text-justify">{post.content}</p>
            </td>
            <td>
              {post.image ? (
                <img src={post.image} className="rounded mx-auto d-block" alt={post.image} />
              ) : (
                <></>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Post;
