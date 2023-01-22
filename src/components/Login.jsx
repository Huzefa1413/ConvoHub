import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import "./styles/login.css";
import register from "./assets/register.png";
import aviator from "./assets/aviator.png";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      loginHandler(values);
    },
  });

  const loginHandler = (e) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, e.email, e.password)
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setIsLoading(false);
        swal("Invalid Email or Password", "", "error");
        console.error(error);
      });
  };
  return (
    <div className="main-container">
      <div className="left-div">
        <div
          style={{ backgroundColor: "rgba(255, 255, 255, 0.18)" }}
          className="left-loginbtn"
          value="login Page"
          onClick={() => navigate("/")}
        >
          <div className="left-imgDiv">
            <img src={aviator} alt="login" />
          </div>
          <h2>Login</h2>
        </div>
        <div
          className="left-signupbtn"
          value="Signup Page"
          onClick={() => navigate("/signup")}
        >
          <div className="left-imgDiv">
            <img src={register} alt="signup" />
          </div>
          <h2>SignUp</h2>
        </div>
      </div>
      <div className="right-div">
        <form className="loginform" onSubmit={formik.handleSubmit}>
          <h3 className="title">Login</h3>
          <div className="input-field-login">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
          <div className="input-field-login">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>
          {!isLoading ? (
            <input value="Login" type="submit" className="btnlogin" />
          ) : (
            <div className="loader"></div>
          )}
          <div className="already">
            <h4>Dont have an Account?</h4>
            <button onClick={() => navigate("/signup")}>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
