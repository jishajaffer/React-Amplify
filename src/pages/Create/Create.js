import React from "react";
import * as categoryApi from "../../services/fakeCategoryService";
import Joi from "@hapi/joi";
import Form from "../../components/Form/Form";
import * as articleApi from "../../services/fakeArticleService";

const Create = (props) => {
  const { id: articleId } = props.match.params;
  let article;

  if (articleId) {
    article = articleApi.getArticlesById(articleId);
  }

  const articleToFormData = (article) => {
    let formData = {
      id: "",
      title: "",
      content: "",
      category: "",
    };

    if (article) {
      formData = {
        id: article.id,
        title: article.title,
        content: article.content,
        category: article.category.id,
      };
    }

    return formData;
  };

  const formData = articleToFormData(article);

  const handleImageChange = event => {
    const file = event.target.files;
    alert(file);
  };

  const initialValidationState = {
    title: null,
    content: null,
    image: null,
    categoryId: null,
  };

  const inputs = [
    { name: "title", label: "Title" },
    { name: "content", label: "Content" },
    { name: "image", label: "Image", type: "file", onChange:{handleImageChange}},
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      options: categoryApi.getCategoriesForSelect(),
    },
  ];

  const schema = {
    title: Joi.string().required().label("Title"),
    content: Joi.string().required().label("Content"),
    image: Joi.string().label("Image"),
    categoryId: Joi.string().required().label("Category"),
  };

  const doSubmit = (article) => {
    console.log("Submitted");
    console.log("Article: ", article);
    // call create article api
    props.history.replace("/home");
  };

  const submitButton = {
    label: "Save",
  };

  return (
    <div className="container">
      <div>
        <Form
          inputs={inputs}
          submitButton={submitButton}
          doSubmit={doSubmit}
          initialData={formData}
          validationSchema={schema}
          initialValidationState={initialValidationState}
        ></Form>
      </div>
    </div>
  );
};

export default Create;
