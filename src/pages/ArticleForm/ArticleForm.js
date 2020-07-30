import React from "react";
import * as categoryApi from "../../services/fakeCategoryService";
import Joi from "@hapi/joi";
import Form from "../../components/Form/Form";
import * as articleApi from "../../services/fakeArticleService";

const ArticleForm = (props) => {
  const { id: articleId } = props.match ? props.match.params : {id: null};
  let article;

  if (articleId) {
    article = articleApi.getArticlesById(articleId);
  }

  let initialValidationState = {
    title: null,
    content: null,
    categoryId: null,
  };

  const articleToFormData = (article) => {
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
        categoryId: article.categories[0].categoryID,
        imageUrl: article.picture,
        highlighted: article.highlighted,
      };

      initialValidationState = {};
    }

    return formData;
  };

  const formData = articleToFormData(article);

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
      options: categoryApi.getCategoriesForSelect(),
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
        <Form
          inputs={inputs}
          submitButton={submitButton}
          cancelButton={cancelButton}
          doCancel={doCancel}
          doSubmit={doSubmit}
          initialData={formData}
          validationSchema={schema}
          initialValidationState={initialValidationState}
        ></Form>
      </div>
    </div>
  );
};

export default ArticleForm;
