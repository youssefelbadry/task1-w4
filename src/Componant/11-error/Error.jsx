import { useNavigate } from "react-router";
import "./error.css";
import { Box, Typography, Button } from "@mui/material";
const Error = () => {
  const navigate = useNavigate()
  return (
    <> 
    <Box className="sec-error">
    <Typography variant="h1">404 Not Found</Typography>
    <Typography variant="body1">
      Your visited page not found. You may go to the home page.
    </Typography>
    <Button
      variant="contained"
      className="back-button" 
      onClick={() => navigate("/")}
    >
      Back to Home Page
    </Button>
  </Box>
  </>
  )
};

export default Error;
