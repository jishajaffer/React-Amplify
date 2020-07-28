import React from "react";
import * as articleApi from "../../services/fakeArticleService";

const Article = (props) => {

  const { permissionLevel } = props.user;
  const isAdmin = permissionLevel === "admin";

  const articleId = props.match.params.id;
  
  const article = articleApi.getArticlesById(articleId);

  const handleEdit = () => {
    //update path to relevant page (edit)
    window.location = "/";
  };

  const handleDelete = () => {
    //Call api delete article
    //Update path to relevant page (home)
    window.location = "/home";
  };

  return (
    <div className="container">
      {article && (
        <>
          {article.image && (
            <div className="jumbotron">
              <img
                data-testid="imageId"
                src={article.image}
                className="rounded mx-auto d-block"
                alt={article.image}
              />
            </div>
          )}
          <div className="row">
            <div className="col-md-4">
              <h3 data-testid="categoryId">{article.category}</h3>
            </div>
            <div className="col-md-8">
              <h1 data-testid="titleId">{article.title}</h1>
              <p className="text-justify" data-testid="contentId">
                {article.content}
              </p>
            </div>
          </div>{" "}
        </>
      )}

      {article && isAdmin && (
        <div className="row">
          <div className="col-md-12">
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
              onClick={() => handleDelete(articleId)}
              className="btn float-right btn-success mr-2"
              data-testid="buttonDelete"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
