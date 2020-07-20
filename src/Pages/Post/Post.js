import React from "react";
import * as postsApi from "../../services/FakePostService";

const Post = (props) => {
  const isAdmin = false;
  const postId = props.match.params.id;
  let post = postsApi.getPostsById(postId);

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
                <img
                  src={post.image}
                  className="rounded mx-auto d-block"
                  alt={post.image}
                />
              ) : (
                <></>
              )}
            </td>
          </tr>
          <tr>
            <td>{post.category}</td>
          </tr>
          {isAdmin ? (
            <>
              <tr>
                <td>
                  <button type="button" className="btn float-right btn-success mr-2">
                    Edit
                  </button>
                  <button type="button" className="btn float-right btn-success mr-2">
                    Cancel
                  </button>
                  <button type="button" className="btn float-right btn-success mr-2">
                    Delete
                  </button>
                </td>
              </tr>
            </>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Post;
