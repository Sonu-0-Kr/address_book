import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewBook = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [contact_no, setContact] = useState("");
  const [address, setAddress] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/books/create";

    if (
      name.length === 0 ||
      gender.length === 0 ||
      age.length === 0 ||
      contact_no.length === 0 ||
      address.length === 0
    )
      return;

    const body = {
      name,
      gender,
      age,
      contact_no,
      address,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate("/books"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5 card" style={{ backgroundColor: "lightblue" }}>
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new user to our DataBase collection.
          </h1>
          <form>
            <div className="form-group">
              <label htmlFor="bookName">Enter Your Name</label>
              <input
                type="text"
                name="name"
                id="bookName"
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookgender">Enter Your Gender</label>
              <input
                type="text"
                name="gender"
                id="bookgender"
                className="form-control"
                required
                onChange={(event) => onChange(event, setGender)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookage">Enter Your Age</label>
              <input
                type="text"
                name="age"
                id="bookage"
                className="form-control"
                required
                onChange={(event) => onChange(event, setAge)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookcontact">Enter Your Contact-No</label>
              <input
                type="text"
                name="contact"
                id="bookcontact"
                className="form-control"
                required
                onChange={(event) => onChange(event, setContact)}
              />
            </div>
            <label htmlFor="bookaddress">Enter Your Address</label>
            <textarea
              className="form-control"
              id="bookaddress"
              name="address"
              required
              onChange={(event) => onChange(event, setAddress)}
            />
            <button type="submit" onClick={onSubmit} className="btn custom-button mt-3">
              Create User
            </button>
            <Link to="/books" className="btn btn-link mt-3">
              Back to Users Details
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
