import { useState } from 'react';
import './signup.css';
import { TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from 'react-router';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const handleLogin = (response) => {
    console.log('Google login response:', response);
    // Process the data from Google after login
  };

  const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google Client ID from Google Developer Console

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = formData;

    if (!firstname || !lastname || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div>
      <section className="sec-signup">
        <div className="left-sec-signup"></div>
        <div className="right-sec-signup">
          <div>
            <Typography variant="h4" color="initial">
              Create an account
            </Typography>
            <Typography variant="body1" color="initial">
              Enter your details below
            </Typography>
          </div>
          <TextField id="standard-basic" name="firstname" label="First Name" variant="standard" onChange={handleChange} value={formData.firstname} />
          <TextField id="standard-basic" name="lastname" label="Last Name" variant="standard" onChange={handleChange} value={formData.lastname} />
          <TextField id="standard-basic" name="email" label="Email" variant="standard" onChange={handleChange} value={formData.email} />
          <TextField id="standard-basic" name="password" label="Password" variant="standard" onChange={handleChange} value={formData.password} />
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "center" }}>
            <Button variant="contained" color="error" onClick={handleSubmit}>
              Sign up
            </Button>

            <GoogleOAuthProvider clientId={clientId}>
              <div>
                <GoogleLogin
                  onSuccess={handleLogin}
                  onError={() => console.log('Login Failed')}
                  useOneTap
                >
                  <Button
                    variant="outlined"
                    startIcon={<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" style={{ width: "20px", height: "20px" }} />}
                  >
                    Sign up with Google
                  </Button>
                </GoogleLogin>
              </div>
            </GoogleOAuthProvider>

            <Link mt={"10px"} href="" color="error">
              {"Already have an account?"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
