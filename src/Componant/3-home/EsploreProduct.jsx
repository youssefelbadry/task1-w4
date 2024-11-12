import {
  ArrowBack,
  ArrowForward,
  Favorite,
  FavoriteBorder,
  Visibility,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { addItem, removeItem } from "../redux/CardSlice";
import { fetchProducts } from "../redux/ProductsSlice";

import "./home.css";
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
import { useDispatch, useSelector } from "react-redux";
import Snipper from "../snipper/Snipper";
import { motion } from "framer-motion";
import { toggleFavorite } from "../redux/CardSlice";

const EsploreProduct = () => {
  const Navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 
  const cartItems = useSelector((state) => state.cart.items);
  // =======================================================
  // DATA PRODUCT API
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return (
      <div>
        <Snipper />
      </div>
    );
  } else if (productStatus === "failed") {
    return <div>Error fetching products.</div>;
  }

  // =======================================================
  // Cart logic
  
  
  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (openSnackbar) {
      setOpenSnackbar(false);
    }

    if (existingProduct) {
      dispatch(removeItem(product.id));
      setSnackbarMessage(`Product ${product.title} removed successfully`);
      setSnackbarSeverity('error'); 
    } else {
      const email = localStorage.getItem("email");
      if (!email) {
        Navigate("/signup");
        return;
      }
      dispatch(addItem({ product, quantity: 1 }));
      setSnackbarMessage(`Product ${product.title} added successfully`);
      setSnackbarSeverity('success'); 
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


  // =======================================================
  // ARROW logic
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentIndex, setCurrentIndex] = useState(125);
  const productsPerPage = 8;
  const totalProductsToShow = 24;
  
  const handleNext = () => {
    if (currentIndex + productsPerPage < 125 + totalProductsToShow) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - productsPerPage >= 125) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  // =======================================================
  // Timer logic
  const initialSeconds = 6 * 24 * 60 * 60;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [seconds, setSeconds] = useState(initialSeconds);

  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const displaySeconds = seconds % 60;
    return (
      <>
        <li>
          <strong>{days}</strong>Days
        </li>
        <li>
          <strong>{hours}</strong>Hours
        </li>
        <li>
          <strong>{minutes}</strong>Minutes
        </li>
        <li>
          <strong>{displaySeconds}</strong>Seconds
        </li>
      </>
    );
  };

  // =======================================================
 


  return (
    <section className="esploreProduct">
      <Box className=" sec-photo-ca">
        <Grid container>
          <Grid item xs={12} md={6} className="left-section-ca">
            <p className="category-label">Music</p>
            <h1 className="main-heading">{products[102]?.title}</h1> 
            <Typography variant="body2" className="product-description">
              {products[102]?.description}
            </Typography>
            <ul className="timer">{formatTime(seconds)}</ul>
            <Button
              variant="contained"
              className="buy-button"
              onClick={() => Navigate(`/details/${products[102]?.title}`)} 
            >
              Buy Now!
            </Button>
          </Grid>

          <Grid item xs={12} md={6} className="sec-photo-ca-grid">
            <img
              src={products[102]?.images[0]} 
              alt={products[102]?.title}
              className="product-image"
            />
          </Grid>
        </Grid>
      </Box>
      
      <Typography variant="h5" mb={2} className="head-line mt-5">
        <span className="icon-panorama_vertical_select"></span>Our Products
      </Typography>
      <Box
        className="top-sec-esploreProduct"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" mb={4}>
          Explore Our Products
        </Typography>
        <Box className="arrow-sales" display="flex" gap={1} mb={4}>
          <IconButton onClick={handlePrev} className="back-button-sales">
            <ArrowBack className="icon-sales" />
          </IconButton>
          <IconButton onClick={handleNext} className="back-button-sales">
            <ArrowForward className="icon-sales" />
          </IconButton>
        </Box>
      </Box>

      <Box className="bottom-sec-esploreProduct">
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
              .slice(125, 125 + totalProductsToShow)
              .slice(currentIndex - 125, currentIndex - 125 + productsPerPage)
              .map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <Card className="product-card">
                    <Box position="relative">
                      <div className="product-image2">
                        <Badge
                          badgeContent="New"
                          color="success"
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
                              {favorites.some(
                                (fav) => fav.id === product.id
                              ) ? (
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
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            ml={1}
                          >
                            ({product.rating})
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </motion.Box>
      </Box>

      <Box className="box-button-sales">
        <Button
          className="button-sales"
          onClick={() => Navigate("/ourProducts")}
        >
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

export default EsploreProduct;
