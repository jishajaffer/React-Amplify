import React, { useState, useEffect } from "react";
import Joi from "@hapi/joi";
import Form from "../../components/Form/Form";
import * as categoryService from "../../services/categoryService";
import * as articleService from "../../services/articleService";

const Create = (props) => {
  const { id: articleId } = props.match.params;

  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({
    id: "",
    title: "",
    content: "",
    categoryId: "",
    highlighted: false,
    imageUrl: "",
  });
  const [categories, setCategories] = useState([]);

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
        initialValidationState = {};
        setLoading(false);
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
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    initState();
  }, []);

  let initialValidationState = {
    title: null,
    content: null,
    categoryId: null,
  };

  /*const articleToFormData = (article) => {
    let formData = {
      id: "",
      title: "",
      content: "",
      categoryId: "",
      highlighted: false,
      imageUrl: "",
    };

    if (article) {
      formData = {
        id: article.articleID,
        title: article.title,
        content: article.content,
        categoryId: article.articleCategories[0].category.categoryID,
        imageUrl: article.picture,
        highlighted: article.highlighted,
      };

      initialValidationState = {};
    }

    return formData;
  };*/

  /*let formData = {};*/

  // const handleImageChange = (image) => {
  //   // var fileName = e.target;
  //   console.log(image);
  // };

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

  const doSubmit = (article) => {
    console.log("Submitted");
    console.log("Article: ", article);
    // call create article api
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
        {!loading ? <Form
          inputs={inputs}
          submitButton={submitButton}
          cancelButton={cancelButton}
          doCancel={doCancel}
          doSubmit={doSubmit}
          initialData={article}
          validationSchema={schema}
          initialValidationState={initialValidationState}
        ></Form> : <h2>Loading...</h2>}
      </div>
    </div>
  );
};

export default Create;
