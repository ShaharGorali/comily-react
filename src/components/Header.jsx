import React from "react";
import { NavLink } from "react-router-dom";
import { useContext,useEffect } from "react";
import { NameContext } from "../NameContext";

const Header = () => {
    const {name,setName} = useContext(NameContext);
    useEffect(()=>{
        console.log(name);
    },[])
  return (
    <div className="headerSpace">
      <div className="navSpace">
        <NavLink id="logo" to={"/"}>
          Comly
        </NavLink>
        <NavLink className="headerItem" to={"/signin"}>
            <p>Sign In</p>
        </NavLink>
        <NavLink className="headerItem" to={"/contactus"}>
          Contact
        </NavLink>
      </div>
      <div className="profile">
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Header;
