import React from "react";
import "./Home.css";
import * as fakeCategoryService from "../../services/fakeCategoryService";
import * as fakeArticleService from "../../services/fakeArticleService";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

const chunkArticles = (articles, size) => {
  let index = 0;
  let results = [];

  while (index < articles.length) {
    results.push(articles.slice(index, size + index));
    index += size;
  }

  return results;
};

const articles = fakeArticleService.getArticles();
const highlightedArticles = fakeArticleService.getHighlightedArticles(articles);
const nonhighlightedArticles = fakeArticleService.getNonHighlightedArticles(articles);

function Home() {
  return (
    <>
      <h1>Home - imagine a nav bar above</h1>
      <div className="d-flex p-2 text-white bg-dark shadow-sm justify-content-end">
        <span className="align-self-center">Filter by Categories:</span>
        <select className="custom-select align-self-center ml-2">
          <option>All Categories</option>
          {fakeCategoryService.getCategories().map((category, index) => (
            <option key={`category-${index}`}>{category}</option>
          ))}
        </select>
      </div>

      {highlightedArticles.length > 0 &&
        (
          <section className="highlighted d-block pb-4 mb-5">
            <h6 className="p-3 pb-4">Highlighted</h6>
            {chunkArticles(highlightedArticles, 2).map((articleGroup, groupIndex) => {
              return (
                <div className="row ml-3 mr-3" key={groupIndex}>
                  {articleGroup.map((article, articleIndex) => {
                    const { title: articleTitle, content: articleContent, category: articleCategory } = article;
                    return (
                      <div className="col-lg-6" key={articleIndex}>
                        <ArticleCard
                          articleTitle={articleTitle}
                          articleContent={articleContent}
                          articleCategory={articleCategory}
                          highlighted={true}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </section>
        )
      }

      <section className="non-highlighted d-block pb-4">
        {chunkArticles(nonhighlightedArticles, 2).map((articleGroup, groupIndex) => {
          return (
            <div className="row ml-3 mr-3" key={groupIndex}>
              {articleGroup.map((article, articleIndex) => {
                const { title: articleTitle, content: articleContent, category: articleCategory } = article;
                return (
                  <div className="col-md-6" key={articleIndex}>
                    <ArticleCard
                      articleTitle={articleTitle}
                      articleContent={articleContent}
                      articleCategory={articleCategory}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>

      
    </>
  );
}

export default Home;
