import React from "react";
import Header from "../Header";

const Login = ({message}) => {
  return (
    <button className="btn btn-outline-warning my-2 my-sm-0 mr-2" type="submit">
      <a id="lienLogin" href="login.html">Log in</a>
    </button>
  );
};

export default Login;