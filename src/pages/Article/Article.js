import React from "react";
import * as articleApi from "../../services/fakeArticleService";

const Article = (props) => {

  const { permissionLevel } = props.user;
  const isAdmin = permissionLevel === "admin";

  const articleId = props.match.params.id;
  
  const article = articleApi.getArticlesById(articleId);

  const articleDate = new Date(article.timestamp * 1000);
  const backgroundImg = {
    backgroundImage: `url(${ article.image })`,
    backgroundRepeat  : "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  const handleEdit = () => {
    //update path to relevant page (edit)
    window.location = "/";
  };

  const handleDelete = () => {
    //Call api delete article
    //Update path to relevant page (home)
    window.location = "/";
  };

  return (
    <div className="container">
      <div className="bg-white mt-4 p-2 rounded shadow-sm">
        {article && (
          <>
            {article.image && (
              <div className="jumbotron article-image" style={backgroundImg}>
              </div>
            )}
            <div className="row">
              <div className="col-md-2">
                <span className="badge badge-primary p-2">
                  {article.category}
                </span>
                <div>
                  <div className="font-weight-bold">Published:</div>
                  <div>{articleDate.toLocaleDateString()}</div>
                </div>
              </div>

              <div className="col-md-10">
                <h1 data-testid="titleId" className="font-weight-bold">
                  {article.title}
                </h1>
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
    </div>
  );
};

export default Article;
