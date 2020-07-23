import React from "react";
import { Link } from "react-router-dom";
import highlightedIcon from "./highlighted.png";
import "./ArticleCard.css";

function ArticleCard(props) {
  const { articleId, articleImage, articleTitle, articleContent, articleCategory, highlighted } = props;
  return (
    <div className="card h-100 shadow-sm">
      {articleImage && (
        <img className="card-img-top img-responsive" alt="Thumbnail [100%x225]" src={articleImage} />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{articleTitle}</h5>
        <p className="card-text">
          {articleImage ? (
            articleContent.length > 200 ? `${articleContent.substring(0, 200)}...` : articleContent.substring(0, 200)
          ) : (
            articleContent.length > 600 ? `${articleContent.substring(0, 600)}...` : articleContent.substring(0, 600)
          )}
        </p>
        <Link className="stretched-link" to={`/article/${articleId}`} />
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Link className="btn btn-sm btn-secondary" to={`/home/?sortByCategory=${articleCategory}`}>{articleCategory}</Link>
          <div className="edit-article">
            <Link className={`btn btn-sm btn-outline-secondary ${highlighted && "mr-2"}`} to="/article/1" >Edit</Link>
            {highlighted && (
              <img height="32" width="32" src={highlightedIcon} alt="Highlighted"/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;