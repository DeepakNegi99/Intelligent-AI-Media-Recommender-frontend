import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/polls">Polls</Link>
      <Link to="/questionnaire">Questionnaire</Link>
      <Link to="/recommendations">Recommendations</Link>
      <Link to="/admin">Admin</Link>
    </div>
  );
};

export default Navbar;
