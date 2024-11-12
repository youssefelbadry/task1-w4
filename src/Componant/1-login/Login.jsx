import { useState } from "react";
import "./login.css";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (credentials.email === "" || credentials.password === "") {
      alert("Please fill in all fields");
      return;
    }

    console.log("Stored Email:", storedEmail);
    console.log("Stored Password:", storedPassword);

    if (
      credentials.email === storedEmail &&
      credentials.password === storedPassword
    ) {
      // Redirect to home or any other page
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <section className="sec-login">
        <div className="left-sec-login"></div>
        <div className="right-sec-login">
          <div>
            <Typography variant="h4" color="initial">
              Log in to Exclusive
            </Typography>
            <Typography variant="body1" color="initial">
              Enter your details below
            </Typography>
          </div>

          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            name="email"
            onChange={handleChange}
            value={credentials.email}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            name="password"
            type="password"
            onChange={handleChange}
            value={credentials.password}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="error" onClick={handleSubmit}>
              Login
            </Button>
            <Link
              mt={"10px"}
              sx={{ cursor: "pointer" }}
              underline="none"
              color="error"
              onClick={() => {
                navigate("/signup");
              }}
            >
              {"Forget Password?"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
