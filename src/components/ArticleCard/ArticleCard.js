import React from "react";
import { Link } from "react-router-dom";
import highlightedIcon from "./highlighted.png";
import "./ArticleCard.css";

function ArticleCard(props) {
  const article = props.article;
  const { articleID, title, content, highlighted, picture, articleCategories } = article;
  const category = articleCategories[0].category.categoryName; // As the UI/UX design only shows 1 category per card, we'll display the first category only
  const showEdit = props.showEdit; // Show edit depends on the user's permissionLevel where if they're an admin this will be true
  
  // Fires if an image fails to load for whatever reason, whether if its an invalid link or unavailable
  const onImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22538%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20538%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1737720013b%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A27pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1737720013b%22%3E%3Crect%20width%3D%22538%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22178%22%20y%3D%22124.5%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
  };
  
  return (
    <div className="card bg-white h-100 shadow-sm">
      {picture && (
        <img className="card-img-top rounded" alt="" src={picture} onError={onImgError} />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {picture ? (
            content.length > 200 ? `${content.substring(0, 200)}...` : content
          ) : (
            content.length > 600 ? `${content.substring(0, 600)}...` : content
          )}
        </p>
        <Link className="stretched-link" to={`/articles/${articleID}`} />
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="badge badge-primary p-2">{category}</span>
          <div className="edit-article">
            {showEdit && (
              <Link className={`btn btn-sm btn-outline-secondary ${highlighted && "mr-2"}`} to={`/articles/${articleID}/edit`} >Edit</Link>
            )}
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