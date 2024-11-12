import { Favorite, FavoriteBorder, Visibility } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  Alert,
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
import { addItem, removeItem, toggleFavorite } from "../redux/CardSlice";
import { fetchProducts } from "../redux/ProductsSlice";
import Snipper from "../snipper/Snipper";
import { Badge } from "react-bootstrap";

const AllProducts = () => {
  const Navigate = useNavigate();

  // Fetch product data from API
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 
  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.cart.favorites);

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

  // Handle adding/removing product to/from cart
  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    // Close snackbar first if already open
    if (openSnackbar) {
      setOpenSnackbar(false);
    }

    if (existingProduct) {
      // Remove product from cart
      dispatch(removeItem(product.id));
      setSnackbarMessage(`Product ${product.title} removed successfully`);
      setSnackbarSeverity('error'); // Set color to red
    } else {
      // Check if user is logged in (in localStorage)
      const email = localStorage.getItem("email");
      if (!email) {
        Navigate("/signup");
        return;
      }
      dispatch(addItem({ product, quantity: 1 }));
      setSnackbarMessage(`Product ${product.title} added successfully`);
      setSnackbarSeverity('success'); // Set color to green
    }

    // Open snackbar with updated message
    setTimeout(() => {
      setOpenSnackbar(true);
    }, 200); // Delay for 200 ms
  };

  // Handle adding/removing product from favorites
  const handleToggleFavorite = (product) => {
    const email = localStorage.getItem("email");
    if (!email) {
      Navigate("/signup");
      return;
    }
  
    // Close snackbar first if already open
    if (openSnackbar) {
      setOpenSnackbar(false);
    }
  
    dispatch(toggleFavorite(product));
  
    // Determine if product is in favorites
    const isFavorite = favorites.some((fav) => fav.id === product.id);
    setSnackbarMessage(
      isFavorite
        ? `Product ${product.title} removed from favorites successfully` 
        : `Product ${product.title} added to favorites successfully`
    );
    setSnackbarSeverity(isFavorite ? "error" : "success"); // Set color based on status
  
    // Open snackbar with new message
    setTimeout(() => {
      setOpenSnackbar(true);
    }, 200); // Delay for 200 ms
  };

  return (
    <section className="bestselling container">
      <Typography variant="h5" mb={2} className="head-line">
        <span className="icon-panorama_vertical_select"></span>Our Products
      </Typography>
      <Box
        className="top-sec-bestselling"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" mb={4}>
          Explore Our Products
        </Typography>
        <Box className="arrow-bestselling" display="flex" gap={1} mb={4}>
          <Button className="button-sales" onClick={() => Navigate(-1)}>
            back home{" "}
          </Button>
        </Box>
      </Box>
      <Box className="bottom-sec-bestselling">
        <Grid container spacing={2}>
          {products.slice(120, 152).map((product) => (
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
                      {/* Toggle text based on whether product is in cart */}
                      {cartItems.some(item => item.id === product.id) ? "Remove from Cart" : "Add to Cart"}
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
          sx={{ width: "100%", scale: "1.1" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default AllProducts;
