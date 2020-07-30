import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import queryString from "query-string";
import * as articleService from "../../services/articleService";
import * as categoryService from "../../services/categoryService";
import "./Home.css";

function Home(props) {
  const { permissionLevel } = props.user;
  const { filterCategory = "All" } = queryString.parse(props.location.search);
  const isAdmin = permissionLevel === "admin";

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const sortArticles = (articles) => {
    articles.sort((a, b) => (a.dateCreated > b.dateCreated) ? -1 : ((a.dateCreated < b.dateCreated) ? 1 : 0));
    // Sorting by subtracting a boolean works because true - false === 1, false - true === -1 and true - true === 0
    articles.sort((a, b) => b.highlighted - a.highlighted);
  };

  const filterArticlesByCategory = (articles, category) => {
    return articles.filter((article) => article.articleCategories[0].category.categoryName === category);
  };

  const initArticles = () => {
    if (filterCategory === "All") {
      articleService.getArticles().then(response => {
        const { data: articles } = response;
        sortArticles(articles);
        setArticles(articles);
      });
    } else {
      articleService.getArticlesByCategory(filterCategory).then(response => {
        let { data: articles } = response;
        articles = filterArticlesByCategory(articles, filterCategory);
        sortArticles(articles);
        setArticles(articles);
      });
    }
  };

  const initState = () => {
    initArticles();
    categoryService.getCategories().then(response => {
      const { data: categories } = response;
      setCategories(categories);
    });
  };

  useEffect(() => {
    initState();
  }, [filterCategory]);

  const handleFilterCategory = ({ currentTarget: { value } }) => {
    props.history.push(`?filterCategory=${value}`);
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
        <div className="row mt-4">
          <div className="col-12">
            <div className={`d-flex rounded p-2 text-dark bg-white shadow-sm ${!isAdmin ? "justify-content-end" : "justify-content-between"}`}>
              {isAdmin &&
                <Link className="btn btn-secondary" to="/articles/new">Create New Article</Link>
              }
              <select className="custom-select align-self-center ml-2" onChange={handleFilterCategory} value={filterCategory}>
                <option value="All">All</option>
                {
                  categories.map((category) => {
                    return <option key={`category-${category.categoryID}`} value={category.categoryName}>{category.categoryName}</option>;
                  })
                }
              </select>
            </div>
          </div>
        </div>
        <section className="article-section my-4 bg-white p-2 rounded shadow-sm">
          {articles.length > 0 ?
            (chunkArticles(articles, 2).map((articleGroup, groupIndex) => {
              return (
                <div className="row" key={groupIndex}>
                  {articleGroup.map((article, articleIndex) => {
                    const { articleID: articleId, picture: articleImage, title: articleTitle, content: articleContent, articleCategories, highlighted } = article;
                    const articleCategory = articleCategories[0].category.categoryName;
                    return (
                      <div className="col-md-6 mb-4" key={articleIndex}>
                        <ArticleCard
                          articleId={articleId}
                          articleImage={articleImage}
                          articleTitle={articleTitle}
                          articleContent={articleContent}
                          articleCategory={articleCategory}
                          highlighted={highlighted}
                          showEdit={isAdmin}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })) : (
              <div className="d-flex flex-column my-5">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="text-center">Uh oh we couldn&apos;t find any articles...<br /> go back to viewing all articles?</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="text-center">
                      <Link className="btn btn-secondary m-1" to="/?filterCategory=All">Yes</Link>
                      <button className="btn btn-secondary m-1">No... I want to stare at this screen</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </section>
      </div>
    </>
  );
}

export default Home;
