import React, { useState } from "react";
import Axios from "./request";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    Axios.post("/api/auth/register", { email, password })
      .then(({ data }) => {
        console.log(data);
        alert(data.message);
        window.location = "/login";
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        alert(err?.response?.data?.message|| err.response.data.error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignUp;
