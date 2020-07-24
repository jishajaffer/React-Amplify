import React from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import queryString from "query-string";
import * as fakeCategoryService from "../../services/fakeCategoryService";
import * as fakeArticleService from "../../services/fakeArticleService";
import "./Home.css";

function Home(props) {
  const { sortByCategory = "All" } = queryString.parse(props.location.search);

  const rawArticles = sortByCategory === "All" ? fakeArticleService.getArticles() : fakeArticleService.getArticlesByCategory(sortByCategory);
  const sortedArticlesByDate = rawArticles.sort((a, b) => a.timestamp - b.timestamp);
  // Sorting by subtracting a boolean works because true - false === 1, false - true === -1 and true - true === 0
  const sortedArticles = sortedArticlesByDate.sort((a, b) => b.highlighted - a.highlighted);

  const handleFilterCategory = ({ currentTarget: { value } }) => {
    props.history.push(`/home/?sortByCategory=${value}`);
  };

  const chunkArticles = (articles, size) => {
    let index = 0;
    let results = [];

    while (index < articles.length) {
      results.push(articles.slice(index, size + index));
      index += size;
    }

    return results;
  };

  return (
    <>
      <div className="container">
        <div className="row py-4">
          <div className="col-12">
            <div className="d-flex rounded p-2 text-dark bg-white shadow-sm justify-content-between">
              <Link className="btn btn-secondary" to="/article/create">Create New Article</Link>
              <select className="custom-select align-self-center ml-2" onChange={handleFilterCategory} value={sortByCategory}>
                <option value="All">All</option>
                {fakeCategoryService.getCategories().map((category, index) => (
                  <option key={`category-${index}`} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <section className="article-section bg-white p-2 rounded shadow-sm">
          {chunkArticles(sortedArticles, 2).map((articleGroup, groupIndex) => {
            return (
              <div className="row" key={groupIndex}>
                {articleGroup.map((article, articleIndex) => {
                  const { id: articleId, image: articleImage, title: articleTitle, content: articleContent, category: articleCategory, highlighted } = article;
                  return (
                    <div className="col-md-6 mb-4" key={articleIndex}>
                      <ArticleCard
                        articleId={articleId}
                        articleImage={articleImage}
                        articleTitle={articleTitle}
                        articleContent={articleContent}
                        articleCategory={articleCategory}
                        highlighted={highlighted}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default Home;
