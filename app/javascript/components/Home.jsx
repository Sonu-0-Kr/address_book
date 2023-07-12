import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center" style={{ backgroundColor: "lightblue" }}>
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Address Book</h1>
        <p className="lead">
          An address book is a database that stores names, addresses, and other contact information for a user
        </p>
        <hr className="my-4" />
        <Link
          to="/books"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Users
        </Link>
      </div>
    </div>
  </div>
);
