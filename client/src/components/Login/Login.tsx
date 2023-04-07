import React from "react";

function Login() {
  return (
    <form className="login-form">
      <label>
        Username:
        <input type="text" placeholder="Enter username" />
      </label>
      <label>
        Password:
        <input type="password" placeholder="Enter password" />
      </label>
    </form>
  );
}

export default Login;
