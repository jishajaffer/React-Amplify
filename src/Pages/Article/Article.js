import React from "react";
import * as articleApi from "../../services/fakeArticleService";

const Article = (props) => {
  const isAdmin = true;
  const articleId = props.match.params.id;
  let article = articleApi.getArticlesById(articleId);

  const handleEdit = () => {
    //update path to relevant page (edit)
    window.location = "/";
  };

  const handleCancel = () => {
    //update path to relevant page (home)
    window.location = "/";
  };

  const handleDelete = () => {
    //Call api delete article
    //Update path to relevant page (home)
    window.location = "/";
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            {article && (
              <th scope="col" data-testid="titleId">
                {article.title}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {article && (
                <p className="text-justify" data-testid="contentId">
                  {article.content}
                </p>
              )}
            </td>
            {article && (
              <td>
                {article.image ? (
                  <img
                    data-testid="imageId"
                    src={article.image}
                    className="rounded mx-auto d-block"
                    alt={article.image}
                  />
                ) : (
                  <></>
                )}
              </td>
            )}
          </tr>
          <tr>{article && <td>{article.category}</td>}</tr>
          {isAdmin ? (
            <>
              <tr>
                {article && (
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEdit(articleId)}
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
                      onClick={() => handleDelete(articleId)}
                      className="btn float-right btn-success mr-2"
                      data-testid="buttonDelete"
                    >
                      Delete
                    </button>
                  </td>
                )}
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

export default Article;
