import { useState } from "react";
import "./account.css";
import {
  Grid,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Account = () => {
  const [formData, setFormData] = useState({
    firstname: localStorage.getItem("firstname") || "",
    lastname: localStorage.getItem("lastname") || "",
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const storedPassword = localStorage.getItem("password");

    if (currentPassword !== storedPassword) {
      alert("The current password is incorrect.");
      return;
    }

    localStorage.setItem("firstname", formData.firstname);
    localStorage.setItem("lastname", formData.lastname);
    localStorage.setItem("email", formData.email);

    if (newPassword) {
      localStorage.setItem("password", newPassword);
      setFormData((prevData) => ({
        ...prevData,
        password: newPassword,
      }));
    }

    alert("Changes have been saved successfully!");
  };

  const handleCancel = () => {
    setFormData({
      firstname: localStorage.getItem("firstname") || "",
      lastname: localStorage.getItem("lastname") || "",
      email: localStorage.getItem("email") || "",
      password: localStorage.getItem("password") || "",
    });
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <section className="account">
      <div className="gridContainer">
        {/* Sidebar Section */}
        <div className="sidebar-container">
          <Typography variant="h6" gutterBottom>
            Manage My Account
          </Typography>
          <List component="nav">
            <ListItem>
              <ListItemText primary="My Profile" className="active-item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Address Book" className="inactive-item" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="My Payment Options"
                className="inactive-item"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom>
            My Orders
          </Typography>
          <List component="nav">
            <ListItem>
              <ListItemText primary="My Returns" className="inactive-item" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="My Cancellations"
                className="inactive-item"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom>
            My Wishlist
          </Typography>
        </div>

        {/* Form Section */}
        <div className="formContainer">
          <Typography variant="h6" className="formTitle">
            Edit Your Profile
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography className="inputLabel">First Name</Typography>
              <TextField
                name="firstname"
                className="text-feild-tmp"
                fullWidth
                value={formData.firstname}
                variant="outlined"
                onChange={handleChange}
                InputProps={{ style: { color: "#000" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography className="inputLabel">Last Name</Typography>
              <TextField
                name="lastname"
                className="text-feild-tmp"
                fullWidth
                value={formData.lastname}
                variant="outlined"
                onChange={handleChange}
                InputProps={{ style: { color: "#000" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography className="inputLabel">Email</Typography>
              <TextField
                name="email"
                className="text-feild-tmp"
                fullWidth
                value={formData.email}
                variant="outlined"
                onChange={handleChange}
                InputProps={{ style: { color: "#000" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography className="inputLabel">Address</Typography>
              <TextField
                className="text-feild-tmp"
                fullWidth
                defaultValue="Egypt , Cairo"
                variant="outlined"
                InputProps={{ style: { color: "#000" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography className="inputLabel" pb={1}>
                Password Changes
              </Typography>
              <TextField
                type="password"
                className="text-feild-tmp"
                fullWidth
                variant="outlined"
                label="Current Password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                className="text-feild-tmp"
                fullWidth
                variant="outlined"
                label="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                className="text-feild-tmp"
                fullWidth
                variant="outlined"
                label="Confirm New Password"
              />
            </Grid>

            <Grid item xs={12}>
              <div className="buttonContainer">
                <Button
                  variant="outlined"
                  className="cancelButton"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="saveButton"
                  variant="contained"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Account;
