import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { LoginContext } from "../../shared/context/LoginContext";
import "./Login.css";

const Login = () => {
  const auth = useContext(LoginContext);

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Required"),
        password: Yup.string()
          .min(6, "At least 6 characters")
          .required("Required"),
      }),
      onSubmit: ({ email, password }) => {
        // alert(`Email: ${email}, password: ${password}`);
        if (email === process.env.REACT_APP_ADMIN_EMAIL && password === process.env.REACT_APP_ADMIN_PASSWORD) {
          auth.login();
        } else {
          alert('Wrong account');
        }
      },
    });

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Log in here</h2>
      <input
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        name="email"
        type="email"
        placeholder="Email"
      />
      {touched.email && errors.email ? (
        <div className="login-error">{errors.email}</div>
      ) : (
        <br />
      )}
      <input
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        name="password"
        type="password"
        placeholder="Password"
      />
      {touched.password && errors.password ? (
        <div className="login-error">{errors.password}</div>
      ) : (
        <br />
      )}
      <Link to="/signup" className="signup-link">
        Dont have an account?
      </Link>
      <button type="submit" className="login-btn">
        Log in
      </button>
    </form>
  );
};
export default Login;
