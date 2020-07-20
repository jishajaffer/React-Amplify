import React from "react";
import "./Home.css";
import * as fakeCategoryService from "../../services/fakeCategoryService";

/**
 * <div className="form-group text-right p-2 text-white-50 bg-primary shadow-sm">
                <span class="align-middle">Filter by Categories:</span>
                <select className="custom-select ml-2">
                    <option value="" />

                </select>
            </div>


            <ul className="nav bg-primary p-2 justify-content-end">
                <li className="nav-item">
                    <a className="nav-link text-white">Active</a>
                </li>
                <li className="nav-item">
                    <select className="custom-select">
                        <option selected>Open this select</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </li>
            </ul>
*/

function Home() {
  return (
    <>
      <h1>Home - imagine a nav bar above</h1>
      <div className="d-flex p-2 text-white bg-dark shadow-sm justify-content-end">
        <span className="align-self-center">Filter by Categories:</span>
        <select className="custom-select align-self-center ml-2">
          <option selected>All Categories</option>
          {fakeCategoryService.getCategories().map((category, index) => (
            <option key={`category-${index}`}>{category}</option>
          ))}
        </select>
      </div>

      <div className="row mb-2">
        <div className="col-md-6">

          <div className="card flex-row flex-wrap">
            <div className="card-header border-0">
              <img src="//placehold.it/200" alt="" />
            </div>
            <div className="card-block px-2">
              <h4 className="card-title">Title</h4>
              <p className="card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <a href="#" className="btn btn-primary">
                BUTTON
              </a>
            </div>
            <div className="w-100"></div>
            <div className="card-footer w-100 text-muted">FOOTER</div>
          </div>

        </div>

        <div className="col-md-6">

          <div className="card flex-row flex-wrap">
            <div className="card-header border-0">
              <img src="//placehold.it/200" alt="" />
            </div>
            <div className="card-block px-2">
              <h4 className="card-title">Title</h4>
              <p className="card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <a href="#" className="btn btn-primary">
                BUTTON
              </a>
            </div>
            <div className="w-100"></div>
            <div className="card-footer w-100 text-muted">FOOTER</div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Home;
