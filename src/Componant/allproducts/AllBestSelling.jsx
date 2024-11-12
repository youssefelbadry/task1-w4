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

const AllBestSelling = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const favorites = useSelector((state) => state.cart.favorites);
  const cartItems = useSelector((state) => state.cart.items);
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 
  
  // Fetch products if the status is "idle"
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
  
  // Handle adding/removing a product from the cart
  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (openSnackbar) {
      setOpenSnackbar(false); // Close Snackbar if already open
    }

    if (existingProduct) {
      // Remove product if it's already in the cart
      dispatch(removeItem(product.id));
      setSnackbarMessage(`Product ${product.title} removed successfully`);
      setSnackbarSeverity('error'); // Set Snackbar to red for removal
    } else {
      const email = localStorage.getItem("email"); // Check for registered user
      if (!email) {
        Navigate("/signup");
        return;
      }
      dispatch(addItem({ product, quantity: 1 }));
      setSnackbarMessage(`Product ${product.title} added successfully`);
      setSnackbarSeverity('success'); // Set Snackbar to green for addition
    }

    setTimeout(() => {
      setOpenSnackbar(true); // Open Snackbar with new message
    }, 200);
  };

  // Toggle a product's favorite status
  const handleToggleFavorite = (product) => {
    const email = localStorage.getItem("email"); // Check for registered user
    if (!email) {
      Navigate("/signup");
      return;
    }

    if (openSnackbar) {
      setOpenSnackbar(false); // Close Snackbar if already open
    }

    dispatch(toggleFavorite(product));

    const isFavorite = favorites.some((fav) => fav.id === product.id);
    setSnackbarMessage(
      isFavorite
        ? `Product ${product.title} removed from favorites successfully` 
        : `Product ${product.title} added to favorites successfully`
    );
    setSnackbarSeverity(isFavorite ? "error" : "success"); // Set color based on favorite status

    setTimeout(() => {
      setOpenSnackbar(true); // Open Snackbar with updated message
    }, 200);
  };

  return (
    <section className="bestselling container">
      <Typography variant="h5" mb={2} className="head-line">
        <span className="icon-panorama_vertical_select"></span>This Month
      </Typography>
      <Box
        className="top-sec-bestselling"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" mb={4}>
          Best Selling Products
        </Typography>
        <Box className="arrow-bestselling" display="flex" gap={1} mb={4}>
          <Button className="button-sales" onClick={() => Navigate("/")}>
            Back Home
          </Button>
        </Box>
      </Box>
      <Box className="bottom-sec-bestselling">
        <Grid container spacing={2}>
          {products.slice(0, 40).map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card className="product-card">
                <Box position="relative">
                  <div className="product-image2">
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
                      {/* Change text based on cart status */}
                      {cartItems.some((item) => item.id === product.id)
                        ? "Remove from Cart"
                        : "Add to Cart"}
                    </a>
                  </div>
                  <CardContent>
                    <Typography variant="subtitle1">{product.title}</Typography>
                    <Box>
                      <Typography variant="h6" className="current-price">
                        ${product.price}
                      </Typography>
                    </Box>
                    <Box>
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
                      <Typography variant="p" ml={1}>
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
       {/* Snackbar for notifications */}
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

export default AllBestSelling;
