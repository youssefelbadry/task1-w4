import { useState, useEffect } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, Visibility } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductsSlice";
import { useNavigate } from "react-router";
import { addItem, removeItem, toggleFavorite } from '../redux/CardSlice';

const AllSaling = () => {
  const Navigate = useNavigate();

  const initialSeconds = 4 * 24 * 60 * 60; // Set initial countdown to 4 days
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval); // Stop countdown when it reaches 0
      alert("الوقت انتهى!"); // Alert when time is over
    }

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [seconds]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const displaySeconds = seconds % 60;
    return (
      <div className="timer-container">
        <div className="time-unit">
          <span className="time-value">{days}</span>
          <span className="time-label">Days</span>
        </div>
        <span className="separator">:</span>
        <div className="time-unit">
          <span className="time-value">
            {hours < 10 ? "0" : ""}
            {hours}
          </span>
          <span className="time-label">Hours</span>
        </div>
        <span className="separator">:</span>
        <div className="time-unit">
          <span className="time-value">
            {minutes < 10 ? "0" : ""}
            {minutes}
          </span>
          <span className="time-label">Minutes</span>
        </div>
        <span className="separator">:</span>
        <div className="time-unit">
          <span className="time-value">
            {displaySeconds < 10 ? "0" : ""}
            {displaySeconds}
          </span>
          <span className="time-label">Seconds</span>
        </div>
      </div>
    );
  };

  // Fetching products from Redux store
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity (success/error)
  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.cart.favorites);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts()); // Fetch products if the status is idle
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return <div>Error fetching products.</div>;
  }

  // Add or remove product from cart
  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (openSnackbar) {
      setOpenSnackbar(false); // Close Snackbar if open
    }

    if (existingProduct) {
      dispatch(removeItem(product.id)); // Remove from cart if already in cart
      setSnackbarMessage(`Product ${product.title} removed successfully`);
      setSnackbarSeverity('error'); // Error message
    } else {
      const email = localStorage.getItem("email");
      if (!email) {
        Navigate("/signup");
        return;
      }
      dispatch(addItem({ product, quantity: 1 })); // Add to cart if not already in cart
      setSnackbarMessage(`Product ${product.title} added successfully`);
      setSnackbarSeverity('success'); // Success message
    }

    setTimeout(() => {
      setOpenSnackbar(true); // Open Snackbar after short delay
    }, 200); // Delay to ensure Snackbar closes before reopening
  };

  // Add or remove product from favorites
  const handleToggleFavorite = (product) => {
    const email = localStorage.getItem("email");
    if (!email) {
      Navigate("/signup");
      return;
    }

    if (openSnackbar) {
      setOpenSnackbar(false); // Close Snackbar if open
    }

    dispatch(toggleFavorite(product)); // Toggle favorite state

    const isFavorite = favorites.some((fav) => fav.id === product.id);
    setSnackbarMessage(
      isFavorite
        ? `Product ${product.title} removed from favorites successfully`
        : `Product ${product.title} added to favorites successfully`
    );
    setSnackbarSeverity(isFavorite ? "error" : "success"); // Error or success message based on state

    setTimeout(() => {
      setOpenSnackbar(true); // Open Snackbar after short delay
    }, 200); // Delay to ensure Snackbar closes before reopening
  };

  return (
    <section className="sales container">
      <Typography variant="h5" mb={2} className="head-line">
        <span className="icon-panorama_vertical_select"></span>Saling
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={15}
        >
          <Typography variant="h4">Flash Sales</Typography>
        </Box>
        <div>{formatTime(seconds)}</div>
      </Box>

      <Grid container spacing={2}>
        {products.slice(40, 120).map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card className="product-card">
              <Box position="relative">
                <div className="product-image2">
                  <Badge
                    badgeContent="-35%"
                    color="error"
                    className="discount-badge"
                  />
                  <CardMedia
                    component="img"
                    image={product.images[0]}
                    alt={product.title}
                    className="pic-1"
                  />
                  <ul className="social">
                    <li>
                      <IconButton
                        size="small"
                        className="icon-button"
                        onClick={() =>
                          Navigate(
                            `/details/${encodeURIComponent(product.title)}`
                          )
                        }
                      >
                        <Visibility />
                      </IconButton>
                    </li>
                    <li>
                      <IconButton
                        onClick={() => handleToggleFavorite(product)}
                      >
                        {favorites.some((fav) => fav.id === product.id) ? (
                          <Favorite color="error" />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </IconButton>
                    </li>
                  </ul>
                  <a
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    {cartItems.some(item => item.id === product.id)
                      ? "Remove from Cart"
                      : "Add to Cart"}
                  </a>
                </div>
                <CardContent className="product-details">
                  <Typography variant="subtitle1" className="product-name">
                    {product.title}
                  </Typography>
                  <Box className="price-container">
                    <Typography variant="h6" className="current-price">
                      ${product.price}
                    </Typography>
                    <Typography variant="p" className="old-price">
                      ${parseFloat(product.price / (1 - 0.35)).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box className="rating-container">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        fontSize="small"
                        className={
                          index < Math.floor(product.rating)
                            ? "star-icon"
                            : "star-icon gray-star"
                        }
                      />
                    ))}
                    <Typography variant="body2" color="text.secondary" ml={1}>
                      ({product.rating})
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box className="box-button-sales">
        <Button className="button-sales" onClick={() => Navigate("/")}>
          back home
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="snack"
      >
        <Alert
          className="snack"
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default AllSaling;
