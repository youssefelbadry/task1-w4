import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./home.css";
import { addItem, removeItem, toggleFavorite } from "../redux/CardSlice";
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  Favorite,
  FavoriteBorder,
  Visibility,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductsSlice";
import Snipper from "../snipper/Snipper";
import { motion } from "framer-motion";

const Sales = () => {
  const Navigate = useNavigate();
  const initialSeconds = 4 * 24 * 60 * 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [currentIndex, setCurrentIndex] = useState(77);
  const productsPerPage = 4;
  const totalProductsToShow = 16;
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
      alert("الوقت انتهى!");
    }

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return <Snipper />;
  } else if (productStatus === "failed") {
    return <div>Error fetching products.</div>;
  }

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const displaySeconds = seconds % 60;
    return (
      <div className="timer-container">
        <div className="time-unit">
          <span className="time-value">{days}</span>{" "}
          <span className="time-label">Days</span>
        </div>
        <span className="separator">:</span>
        <div className="time-unit">
          <span className="time-value">
            {hours < 10 ? "0" : ""}
            {hours}
          </span>{" "}
          <span className="time-label">Hours</span>
        </div>
        <span className="separator">:</span>
        <div className="time-unit">
          <span className="time-value">
            {minutes < 10 ? "0" : ""}
            {minutes}
          </span>{" "}
          <span className="time-label">Minutes</span>
        </div>
        <span className="separator">:</span>
        <div className="time-unit">
          <span className="time-value">
            {displaySeconds < 10 ? "0" : ""}
            {displaySeconds}
          </span>{" "}
          <span className="time-label">Seconds</span>
        </div>
      </div>
    );
  };

  const handleNext = () => {
    if (currentIndex + productsPerPage < 77 + totalProductsToShow) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - productsPerPage >= 77) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  // Cart Items

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (openSnackbar) {
      setOpenSnackbar(false);
    }

    if (existingProduct) {
      dispatch(removeItem(product.id));
      setSnackbarMessage(`Product ${product.title} removed successfully`);
      setSnackbarSeverity("error"); 
    } else {
      const email = localStorage.getItem("email");
      if (!email) {
        Navigate("/signup");
        return;
      }
      dispatch(addItem({ product, quantity: 1 }));
      setSnackbarMessage(`Product ${product.title} added successfully`);
      setSnackbarSeverity("success"); 
    }

    setTimeout(() => {
      setOpenSnackbar(true);
    }, 200); 
  };

  // Favorites
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const favorites = useSelector((state) => state.cart.favorites);
  const handleToggleFavorite = (product) => {
    const email = localStorage.getItem("email");
    if (!email) {
      Navigate("/signup");
      return;
    }

    if (openSnackbar) {
      setOpenSnackbar(false);
    }

    dispatch(toggleFavorite(product));

    const isFavorite = favorites.some((fav) => fav.id === product.id);
    setSnackbarMessage(
      isFavorite
        ? `Product ${product.title} removed from favorites successfully`
        : `Product ${product.title} added to favorites successfully`
    );
    setSnackbarSeverity(isFavorite ? "error" : "success");

    setTimeout(() => {
      setOpenSnackbar(true);
    }, 200);
  };

  return (
    <section className="sales">
      <Typography variant="h5" mb={2} className="head-line">
        <span className="icon-panorama_vertical_select"></span>Today
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        {/* Flash Sales section */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={3}
          flexDirection={{ xs: "column", sm: "row" }}
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Typography variant="h4">Flash Sales</Typography>
          <div>{formatTime(seconds)}</div>
        </Box>

        {/* Arrow Buttons */}
        <Box
          className="arrow-sales"
          display="flex"
          gap={2}
          mb={{ xs: 3, sm: 4 }}
          justifyContent="center"
        >
          <IconButton onClick={handlePrev} className="back-button-sales">
            <ArrowBack className="icon-sales" />
          </IconButton>
          <IconButton onClick={handleNext} className="back-button-sales">
            <ArrowForward className="icon-sales" />
          </IconButton>
        </Box>
      </Box>

      <motion.Box
        className="bottom-sec-sales"
        key={currentIndex}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <Grid container spacing={2}>
          {products
            .slice(77, 77 + totalProductsToShow)
            .slice(currentIndex - 77, currentIndex - 77 + productsPerPage)
            .map((product) => (
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
                              Navigate(`/details/${product.title}`)
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
                        {cartItems.some((item) => item.id === product.id)
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
                          ${Math.ceil(product.price)}
                        </Typography>
                        <Typography variant="p" className="old-price">
                          ${Math.ceil(product.price + product.price * 0.35)}
                        </Typography>
                      </Box>
                    </CardContent>
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
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </motion.Box>
      <Box className="box-button-sales">
        <Button className="button-sales" onClick={() => Navigate("/sales")}>
          View All Products
        </Button>
      </Box>
      {/* Snackbar */}
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
          sx={{ width: "100%", scale: "1.1" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Sales;
