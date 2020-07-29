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
      categoryId: "",
      imageUrl: "",
    };

    if (article) {
      formData = {
        id: article.id,
        title: article.title,
        content: article.content,
        category: article.category.id,
        imageUrl: article.picture,
      };
    }

    return formData;
  };

  const formData = articleToFormData(article);

  // const handleImageChange = (image) => {
  //   // var fileName = e.target;
  //   console.log(image);
  // };

  const initialValidationState = {
    title: null,
    content: null,
    imageUrl: null,
    categoryId: null,
  };

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
      options: categoryApi.getCategoriesForSelect(),
    },
    {
      name: "imageUrl",
      label: "Image Url",
    },
  ];

  const schema = {
    title: Joi.string().required().label("Title"),
    content: Joi.string().required().label("Content"),
    imageUrl: Joi.string().label("Image Url"),
    categoryId: Joi.string().required().label("Category"),
  };

  const doSubmit = (article) => {
    console.log("Submitted");
    console.log("Article: ", article);
    // call create article api
    props.history.replace("/");
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
