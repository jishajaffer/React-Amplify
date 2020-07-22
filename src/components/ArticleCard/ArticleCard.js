import React from "react";

/**
 * <div className="row no-gutters">
        <div className="col-md-4 pl-4 pt-4 pb-4">
          <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{articleTitle}</h5>
            <p className="card-text">{articleContent.length > 200 ? `${articleContent.substring(0, 200)}...` : articleContent.substring(0, 200)}</p>
            <div className="btn-group float-right">
              <button type="button" className="btn btn-sm btn-outline-secondary">Read More</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
          </div>
        </div>
        <span className="border border-secondary rounded p-1 ml-4 mt-3 mb-4">{`Category: ${articleCategory}`}</span>
      </div>




    <div className="row no-gutters">
        <div className="col-4 p-4">
          <img className="img-responsive" src="https://via.placeholder.com/150.png"/>
        </div>
        <div className="col-8 p-4">
          <div className="card-body">
            <h5 className="card-title">{articleTitle}</h5>
            <p className="card-text">{articleContent.length > 200 ? `${articleContent.substring(0, 200)}...` : articleContent.substring(0, 200)}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 ba">
          <span className="border border-secondary rounded p-1 ml-4 mt-3 mb-4">{`Category: ${articleCategory}`}</span>
        </div>
        <div className="col-6">
          <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary">Read More</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
        </div>
      </div>

 */

function ArticleCard(props) {
  const { articleTitle, articleContent, articleCategory, highlighted } = props;
  return (
    <div className={`card mb-3 shadow-sm ${highlighted && "border-danger"}`} >
      <div className="row no-gutters">
        <div className="col-md-4 p-4">
          <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{articleTitle}</h5>
            <p className="card-text">{articleContent.length > 200 ? `${articleContent.substring(0, 200)}...` : articleContent.substring(0, 200)}</p>
            <div className="btn-group float-right">
              <button type="button" className="btn btn-sm btn-outline-secondary">Read More</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
          </div>
        </div>
        <span className="border border-secondary rounded p-1 ml-4 mt-3 mb-4">{`Category: ${articleCategory}`}</span>
      </div>
    </div>
  );
}

export default ArticleCard;
