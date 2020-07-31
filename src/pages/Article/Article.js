import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import * as articleService from "../../services/articleService";
import "./Article.css";

const Article = (props) => {
  const { permissionLevel } = props.user;
  const isAdmin = permissionLevel === "admin";

  const articleId = props.match.params.id;
  
  const [article, setArticle] = useState();

  const initState = () => {
    articleService.getArticleById(articleId).then(response => {
      let { data: article } = response;
      setArticle(article);
    });
  };

  useEffect(() => {
    initState();
  });

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
              src={article.picture !== "string" ? article.picture : "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22538%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20538%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1737720013b%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A27pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1737720013b%22%3E%3Crect%20width%3D%22538%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22178%22%20y%3D%22124.5%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"}
              className="article-banner rounded mb-3"
              alt="Article Banner"
              data-testid="imageId"
            />
          )}
          <div className="row">
            <div className="col-md-2">
              <div className="badge badge-primary p-2 mb-3" data-testid="categoryId">
                {article.articleCategories[0].category.categoryName}
              </div>
              <h4>Published:</h4>
              <div className="mb-3">{new Date(article.dateCreated).toLocaleDateString()}</div>
              {article.dateLastUpdated && (
                <>
                  <h4>Last Updated:</h4>
                  <div className="mb-3">{new Date(article.dateLastUpdated).toLocaleDateString()}</div>
                </>
              )}
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
