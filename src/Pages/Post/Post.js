import React from "react";
import * as postsApi from "../../services/FakePostService";

const Post = (props) => {
  const isAdmin = true;
  const postId = props.match.params.id;
  let post = postsApi.getPostsById(postId);

  const handleEdit = (id) => {
    //update path to relevant page (edit) and pass ID
    window.location = "/";
  };

  const handleCancel = () => {
    //update path to relevant page (home)
    window.location = "/";
  };

  const handleDelete = (id) => {
    //Call api delete article
    //Update path to relevant page (home)
    window.location = "/";
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" data-testid="titleId">
              {post.title}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p className="text-justify" data-testid="contentId">
                {post.content}
              </p>
            </td>
            <td>
              {post.image ? (
                <img
                  data-testid="imageId"
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
                  <button
                    type="button"
                    onClick={()=>handleEdit(postId)}
                    className="btn float-right btn-success mr-2"
                    data-testid="buttonEdit"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn float-right btn-success mr-2"
                    data-testid="buttonCancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={()=>handleDelete(postId)}
                    className="btn float-right btn-success mr-2"
                    data-testid="buttonDelete"
                  >
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
