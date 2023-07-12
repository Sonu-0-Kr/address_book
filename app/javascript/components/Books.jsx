import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterOption, setFilterOption] = useState("name");

  useEffect(() => {
    const url = "/api/v1/books/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setUsers(res);
        setFilteredUsers(res);
      })
      .catch(() => navigate("/"));
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      if (filterOption === "name") {
        return user.name.toLowerCase().includes(filter.toLowerCase());
      } else if (filterOption === "age") {
        return user.age === parseInt(filter);
      } else if (filterOption === "gender") {
        return user.gender.toLowerCase().includes(filter.toLowerCase());
      }
      return false;
    });
    setFilteredUsers(filtered);
  }, [filter, filterOption, users]);

  const deleteAddressbook = (id) => {
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => window.location.reload())
      .catch((error) => console.log(error.message));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  };

  const allBooks = filteredUsers.map((book, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Name: {book.name}</h5>
          <h5 className="card-title">Gender: {book.gender}</h5>
          <h5 className="card-title">Age: {book.age}</h5>
          <h5 className="card-title">Contact No: {book.contact_no}</h5>
          <h5 className="card-title">Address: {book.address}</h5>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteAddressbook(book.id)}
          >
            Delete List
          </button>
        </div>
      </div>
    </div>
  ));

  const noBook = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        <Link to="/new_book">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section
        className="jumbotron jumbotron-fluid text-center card"
        style={{ backgroundColor: "lightblue" }} // Replace "lightblue" with your desired color
      >
        <div className="container py-5">
          <h1 className="display-4">Data of Current Users</h1>
          <p className="lead text-muted">
            All data of user which contains Name, Gender, Age, Contact, and Addresses
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/book" className="btn custom-button">
              Create New User
            </Link>
          </div>
          <div className="row">
            <div className="mb-3">
              <label htmlFor="filterOption" className="form-label">
                Filter by:
              </label>
              <select
                id="filterOption"
                className="form-select"
                value={filterOption}
                onChange={handleFilterOptionChange}
              >
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="gender">Gender</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={filter}
                onChange={handleFilterChange}
                placeholder={`Filter by ${filterOption}`}
              />
            </div>
            {filteredUsers.length > 0 ? allBooks : noBook}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Books;
