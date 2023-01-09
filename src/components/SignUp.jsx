import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:4000/api/users", data);
      if ((await result.response.status) !== 200) {
      }
      localStorage.setItem("token", result.headers["x-auth-token"]);
      navigate("/main");
    } catch (e) {
      alert("email already exist");
    }
  };
  return (
    <div className="signinSpace">
      <h2 className="signInHeader">Join us</h2>
      <form className="signInForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input
          className="signInp"
          type="text"
          name="name"
          placeholder="Insert username"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          className="signInp"
          type="email"
          name="email"
          placeholder="Insert email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          className="signInp"
          type="password"
          name="password"
          placeholder="Insert password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button className="submitBtn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
