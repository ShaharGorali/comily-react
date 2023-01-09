import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:4000/api/auth", data);
      // if(result.response){
      // alert('Wrong email or password')
      // }
      localStorage.setItem("token", await result.data);
      navigate("/");
    } catch (e) {
      alert(e.response.data);
    }
  };
  return (
    <div className="signInSpace">
      <h2 className="signInHeader">Sign in</h2>
      <div>
        <form className="signInForm" onSubmit={handleSubmit}>
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
            Log in
          </button>
        </form>
        <div className="toSignUp">
          <p>Not a Comly member yet?</p>
          <NavLink to={"/signup"}>
            <button id="submitBtn1">Sign up</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
