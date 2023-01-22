import React from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";

import "./styles/navbar.css";
import logout from "./assets/logout.png";
import logo from "./assets/gathering.png";
import profilepic from "./assets/profile.png";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="navbar">
      <div className="leftnav">
        <div className="logoimage" onClick={() => navigate("/home")}>
          <img src={logo} alt="" />
        </div>
        <div className="logoname" onClick={() => navigate("/home")}>
          ConvoHub
        </div>
      </div>
      <div className="rightnav">
        <img
          src={profilepic}
          alt="profile"
          onClick={() => navigate("/profile")}
        />
        <img src={logout} alt="logout" onClick={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;
