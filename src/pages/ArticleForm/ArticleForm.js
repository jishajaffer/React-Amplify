import React, { useState, useEffect } from "react";
import Joi from "@hapi/joi";
import Form from "../../components/Form/Form";
import * as categoryService from "../../services/categoryService";
import * as articleService from "../../services/articleService";

const ArticleForm = (props) => {
  const { id: articleId } = props.match ? props.match.params : {id: null};
  
  const [categories, setCategories] = useState([]);
  const [initialValidation, setInitialValidation] = useState({
    title: null,
    content: null,
    categoryId: null,
  });
  const [article, setArticle] = useState({
    title: "",
    content: "",
    categoryId: 0,
    highlighted: false,
    picture: "",
  });

  const initState = () => {
    categoryService.getCategories().then(response => {
      let { data: categories } = response;
      categories = categories.map(category => {
        return {
          id: category.categoryID,
          name: category.categoryName
        };
      });
      setCategories(categories);
      console.log(categories);
    });

    if (articleId) {
      articleService.getArticleById(articleId).then(response => {
        let { data } = response;
        setInitialValidation({});
        
        // Using only the first category within the array, editting an article will overwrite the articles category with only 1 if it had multiple prior
        setArticle({
          articleID: data.articleID,
          title: data.title,
          content: data.content,
          dateCreated: data.dateCreated,
          dateLastUpdated: data.dateLastUpdated,
          user: data.user,
          categoryId: (data.articleCategories[0].category.categoryID).toString(),
          picture: data.picture,
          highlighted: data.highlighted,
        });
        console.log(article);
      });
    }
  };

  useEffect(() => {
    initState();
    // eslint-disable-next-line 
  }, []);

  const inputs = [
    { name: "title", label: "Title" },
    {
      name: "content",
      label: "Content",
      type: "textarea",
    },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      options: categories,
    },
    {
      name: "picture",
      label: "Image Url",
    },
    {
      name: "highlighted",
      label: "Highlight",
      type: "checkbox",
    },
  ];

  const schema = {
    title: Joi.string().required().label("Title"),
    content: Joi.string().required().label("Content"),
    picture: Joi.string().allow("").label("Image Url"),
    categoryId: Joi.string().required().label("Category"),
    highlighted: Joi.bool().required().label("Highlight"),
  };

  const doSubmit = async (article) => {
    article.categoryId = parseInt(article.categoryId);
    const articleCategories = categories.filter(category => category.id === article.categoryId);
    article.articleCategories = [];
    for (let i = 0; i < articleCategories.length; i++) {
      article.articleCategories.push({
        category: {
          categoryID: articleCategories[i].id,
          categoryName: articleCategories[i].name
        }
      });
    }
    delete article.categoryId;

    if (articleId) {
      try {
        await articleService.updateArticle(article);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await articleService.postNewArticle(article);
      } catch (err) {
        console.log(err);
      }
    }
    props.history.replace("/");
  };

  const doCancel = () => {
    props.history.goBack();
  };

  const submitButton = {
    submitLabel: articleId ? "Republish" : "Publish",
  };

  const cancelButton = {
    cancelLabel: "Cancel",
  };

  return (
    <div className="container">
      <div className="my-4 bg-white p-2 rounded shadow-sm">
        <Form
          inputs={inputs}
          submitButton={submitButton}
          cancelButton={cancelButton}
          doCancel={doCancel}
          doSubmit={doSubmit}
          initialData={article}
          validationSchema={schema}
          initialValidationState={initialValidation}
        />
      </div>
    </div>
  );
};

export default ArticleForm;
