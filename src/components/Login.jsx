import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import aviator from "./assets/aviator.png";
import register from "./assets/register.png";
import * as yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./styles/login.css";

const Login = () => {
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
      loginHandler(values);
    },
  });

  const loginHandler = (e) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, e.email, e.password)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        alert("Invalid Email or Password");
        console.error(error);
      });
  };
  return (
    <div className="background">
      <div className="main-container">
        <div className="left-div">
          <div
            style={{ backgroundColor: "#00A8F3" }}
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
            <input value="Login" type="submit" className="btnlogin" />
            <div className="already">
              <h4>Dont have an Account?</h4>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
