import React, { useState } from "react";
import SignUp from "./SignUp";
import "../styles/Auth.css";

function Login({ onLogin }) {
  const [activeForm, setActiveForm] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let url;
    let requestData;

    if (activeForm === "login") {
      url = "/login";
      requestData = { username, password };
    } else if (activeForm === "signup") {
      url = "/signup";
      requestData = { username, password };
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => onLogin(user));
        } else {
          response.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

 

export default Login;
