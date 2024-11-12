import {
  Box,
  Card,
  Grid,
  CardContent,
  Badge,
  CardMedia,
  IconButton,
  Typography,
  TableContainer,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Delete, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, addItem, removeItem } from "../redux/CardSlice"; 
import Snipper from "../snipper/Snipper";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/ProductsSlice";
import { useNavigate } from "react-router";

const AllFavorites = () => {
  const Navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar color
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cart.favorites); // Favorites state from Redux
  const productStatus = useSelector((state) => state.products.status);

  const handleRemoveFavorite = (product) => {
    dispatch(removeFavorite(product)); // Remove product from favorites
  };

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts()); // Fetch products if status is idle
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return <Snipper />; // Display loading spinner if products are being fetched
  } else if (productStatus === "failed") {
    return <div>Error fetching products.</div>; // Display error message if fetching failed
  }

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    // Close Snackbar if it's open
    if (openSnackbar) {
      setOpenSnackbar(false);
    }

    if (existingProduct) {
      // Remove product from cart if it already exists
      dispatch(removeItem(product.id));
      setSnackbarMessage(`Product ${product.title} removed successfully`);
      setSnackbarSeverity("error"); // Set Snackbar color to red
    } else {
      // Check if user is logged in (email in localStorage)
      const email = localStorage.getItem("email");
      if (!email) {
        Navigate("/signup"); // Redirect to signup if not logged in
        return;
      }
      dispatch(addItem({ product, quantity: 1 }));
      setSnackbarMessage(`Product ${product.title} added successfully`);
      setSnackbarSeverity("success"); // Set Snackbar color to green
    }

    // Reopen Snackbar with updated message
    setTimeout(() => {
      setOpenSnackbar(true);
    }, 200); // Delay for closing and reopening Snackbar
  };

  return (
    <section className="container wishlist mt-5">
      <Box>
        <div className="tob-sec-wish">
          {favorites.length > 0 && (
            <div className="tob-small-sec-wish">
              <div className="left-tob-small-wish">
                <p>Wishlist ({favorites.length})</p>
              </div>
              <div className="right-tob-small-wish">
                {/* Optional: add elements if needed */}
              </div>
            </div>
          )}

          <div className="bootom-small-sec-wish">
            {favorites.length > 0 ? (
              <Grid container spacing={2}>
                {favorites.map((product) => (
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
                            image={product.images[0]} // Product image
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
                                size="small"
                                className="icon-button"
                                onClick={() => handleRemoveFavorite(product)}
                              >
                                <Delete />
                              </IconButton>
                            </li>
                          </ul>
                          <a
                            className="add-to-cart"
                            onClick={() => handleAddToCart(product)}
                          >
                            {cartItems.some(item => item.id === product.id) ? "Remove from Cart" : "Add to Cart"}
                          </a>
                        </div>
                        <CardContent className="product-details">
                          <Typography
                            variant="subtitle1"
                            className="product-name"
                          >
                            {product.title}
                          </Typography>
                          <Box className="price-container">
                            <Typography variant="h6" className="current-price">
                              ${Math.ceil(product.price)}
                            </Typography>
                            <Typography variant="p" className="old-price">
                              $
                              {Math.ceil(
                                parseFloat(product.price / (1 - 0.35)).toFixed(
                                  2
                                )
                              )}
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
            ) : (
              <TableContainer className="table-container sec-error">
                <Typography variant="h3">Your Favorites is empty.</Typography>
                <Button
                  variant="contained"
                  className="back-button px-5"
                  onClick={() => Navigate(-1)}
                >
                  Back
                </Button>
              </TableContainer>
            )}
          </div>
        </div>
      </Box>
      {/* Snackbar for cart and favorite actions */}
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

export default AllFavorites;
