import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Books from "../components/Books";
import NewBook from "../components/NewBook";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/book" element={<NewBook />} />
    </Routes>
  </Router>
);