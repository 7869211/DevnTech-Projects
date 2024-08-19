import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import TodoItems from "./Components/TodoItems";
import Button from "./Components/Button";
import "./styles.css"; 
import HomePage from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import ContactUs from "./Pages/ContactUs";
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage homeContent="Welcome to our website!" />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<ContactUs Name="Ali Asim" Email="me@devntech.com" Phone="03498848468"/>} />
      </Routes>
      <div className="todo-container">
        <Header title="Todo App"/>
        <TodoItems content="Ruby"/>
        <TodoItems done="true" content="MERN"/>
        <TodoItems content="MEAN"/>
        <TodoItems content=".NET"/>
        <TodoItems content="UNITY"/>
        <Button/>
      </div>
    </Router>
  );
};

export default App;
