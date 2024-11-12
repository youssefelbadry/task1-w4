import { Grid, Typography, TextField, Box, Link, IconButton } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import "./footer.css";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router";
const Footer = () => {
  const Navigate = useNavigate()
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#000", color: "#fff", p: 5 , mt:"50px" }}
    >
      <Grid container spacing={4}>
        {/* Exclusive Section */}
    

        <Grid  item xs={12} md={3}>
          <Typography variant="h6">Exclusive</Typography>
          <Typography variant="body1">Subscribe</Typography>
          <Typography variant="body2">Get 10% off your first order</Typography>
          <Box component="form" sx={{ mt: 6 }}>
      <TextField
        label="Enter your email"
        variant="outlined"
        fullWidth
        InputLabelProps={{ style: { color: "#fff" } }}
        sx={{ input: { color: "#fff" }, mb: 2 }}
        InputProps={{
          endAdornment: (
            <IconButton
              
              sx={{ color: "#fff", cursor: "pointer" }}
            >
              <SendIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
        </Grid>

        {/* Support Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6">Support</Typography>
          <Typography variant="body2">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh
          </Typography>
          <Link
            href="mailto:exclusive@gmail.com"
            sx={{
              color: "red",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            exclusive@gmail.com
          </Link>
          <Typography variant="body2">
            <Link
              href="tel:+8801588889999"
              sx={{
                color: "red",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              +88015-88888-9999
            </Link>
          </Typography>
        </Grid>

        {/* Account Section */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6">Account</Typography>
          <Link
            href="#"
            onClick={() =>{Navigate("/account")}}
            sx={{
              color: "red",
              textDecoration: "none",
              display: "block",
              mb: 1,
            }}
          >
            My Account
          </Link>
          <Link
            onClick={() =>{Navigate("/login")}}

            href="#"
            sx={{
              color: "red",
              textDecoration: "none",
              display: "block",
              mb: 1,
            }}
          >
            Login / Register
          </Link>
          <Link
            onClick={() =>{Navigate("/cart")}}
            href="#"
            sx={{
              color: "red",
              textDecoration: "none",
              display: "block",
              mb: 1,
            }}
          >
            Cart
          </Link>
            <Link
            onClick={() =>{Navigate("/wishlist")}}
            href="#"
            sx={{
              color: "red",
              textDecoration: "none",
              display: "block",
              mb: 1,
            }}
          >
            Wishlist
          </Link>
          <Link
            onClick={() =>{Navigate("/")}}

            href="#"
            sx={{
              color: "red",
              textDecoration: "none",
              display: "block",
              mb: 1,
            }}
          >
            Shop
          </Link>
        </Grid>

        {/* Quick Link Section */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6">Quick Link</Typography>
          <Link
            href="#"
            sx={{
              color: "red",
              textDecoration: "none",
              display: "block",
              mb: 1,
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            sx={{
              color: "red",
              textDecoration: "none",
              display: "block",
              mb: 1,
            }}
          >
            Terms Of Use
          </Link>
          <Link
            onClick={() =>{Navigate("/about")}}
            href="#"
            sx={{
              color: "red",
              textDecoration: "none",
              display: "block",
              mb: 1,
            }}
          >
            FAQ
          </Link>
          <Link
            onClick={() =>{Navigate("/contact")}}
            href="#"
            sx={{
              color: "red",
              textDecoration: "none",
              display: "block",
              mb: 1,
            }}
          >
            Contact
          </Link>
        </Grid>

        {/* Download App Section */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6">Download App</Typography>
          <Typography variant="body2">
            Save $3 with App New User Only
          </Typography>
          {/* QR Code */}
          <div  style={{display:"flex" ,margin:"auto"}}>
          <Box>
          <QRCodeSVG
            value="https://example.com/app-download"
            size={80}
            bgColor="#000"
            fgColor="#fff"
          />
          </Box>
          
          {/* App Icons */}
          <Box  sx={{ display: "flex",flexDirection:"column",gap: "10px",ml:1  }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              style={{ width: "110px" }}
            />
            <img
              src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
              alt="App Store"
              style={{ width: "110px" }}
            />
                    
          </Box>
          
          </div>
          <Box className="icons flex">
          <a href="https://www.linkedin.com/in/elbadry-dev" target="_blank">
            <div className="icon icon-twitter"></div>
          </a>
          <a href="https://github.com/youssefelbadry" target="_blank">
            <div className="icon icon-github"></div>
          </a>
          <a href="https://wa.me/message/JF74NH4QET4HG1" target="_blank">
            {" "}
            <div className="icon icon-whatsapp"></div>
          </a>
          <a
            href="mailto:youssefelbadry10@gmail.com"
            style={{ cursor: "pointer" }}
          >
            {" "}
            <div className="icon icon-envelope"></div>
          </a>

         
        </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Footer;
