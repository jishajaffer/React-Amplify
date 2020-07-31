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
    id: "",
    title: "",
    content: "",
    categoryId: "",
    highlighted: false,
    imageUrl: "",
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
    });

    if (articleId) {
      articleService.getArticleById(articleId).then(response => {
        let { data } = response;
        setInitialValidation({});
        
        setArticle({
          id: data.articleID,
          title: data.title,
          content: data.content,
          categoryId: data.articleCategories[0].category.categoryID,
          imageUrl: data.picture,
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
      name: "imageUrl",
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
    imageUrl: Joi.string().allow("").label("Image Url"),
    categoryId: Joi.string().required().label("Category"),
    highlighted: Joi.bool().required().label("Highlight"),
  };

  const doSubmit = async (article) => {
    console.log("Article: ", article);
    if (articleId) {
      console.log("edit");
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
    submitLabel: "Publish",
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
