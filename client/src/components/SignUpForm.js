import React, { useState } from "react";
import { TextField } from "@material-ui/core";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="SignUpForm">
      <form onSubit={handleSubmit}>
        <div>
          <TextField
            variant="standard"
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            type="text"
            name="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
