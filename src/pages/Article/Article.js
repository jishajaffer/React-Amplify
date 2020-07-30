import React from "react";
import * as articleApi from "../../services/fakeArticleService";
import "./Article.css";
import { Link } from "react-router-dom";

const Article = (props) => {
  const { permissionLevel } = props.user;
  const isAdmin = permissionLevel === "admin";

  const articleId = props.match.params.id;
  const article = articleApi.getArticlesById(articleId);
  const articleDate = new Date(article.date);

  return (
    <div className="container">
      {isAdmin && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="d-flex rounded p-2 text-dark bg-white shadow-sm justify-content-end">
              <button
                className="btn float-right btn-secondary mr-2"
                type="button"
                data-testid="buttonDelete"
              >
                Delete Article
              </button>
              <Link to={`/articles/${articleId}/edit`}>
                <button
                  className="btn float-right btn-secondary mr-2"
                  type="button"
                  data-testid="buttonEdit"
                >
                  Edit Article
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {article && (
        <section className="article my-4 bg-white p-3 rounded shadow-sm">
          {article.picture && (
            <img
              src={article.picture}
              className="article-banner rounded mb-3"
              alt="Article Banner"
            />
          )}
          <div className="row">
            <div className="col-md-2">
              <div className="badge badge-primary p-2 mb-3">
                {article.categories[0].categoryName}
              </div>
              <h4>Published:</h4>
              <div className="mb-3">{articleDate.toLocaleDateString()}</div>
            </div>
            <div className="col-md-10">
              <h1 className="font-weight-bold" data-testid="titleId">
                {article.title}
              </h1>
              <p data-testid="contentId">{article.content}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Article;
