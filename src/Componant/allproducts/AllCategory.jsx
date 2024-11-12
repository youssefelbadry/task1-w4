import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductsSlice";
import { useParams } from "react-router-dom";
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
  TableContainer,
  Typography,
} from "@mui/material";
import { addItem, removeItem, toggleFavorite } from "../redux/CardSlice";
import { Badge } from "react-bootstrap";

const AllCategory = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.cart.favorites);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch products if idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts()); // Fetch products if the status is "idle"
    }
  }, [dispatch, status]);

  // Filter products based on the selected category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase() // Match the category
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // Add to cart handler
  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (openSnackbar) {
      setOpenSnackbar(false);
    }

    if (existingProduct) {
      dispatch(removeItem(product.id));
      setSnackbarMessage(`Product ${product.title} removed successfully`);
      setSnackbarSeverity("error"); // Red color for remove
    } else {
      const email = localStorage.getItem("email");
      if (!email) {
        Navigate("/signup");
        return;
      }
      dispatch(addItem({ product, quantity: 1 }));
      setSnackbarMessage(`Product ${product.title} added successfully`);
      setSnackbarSeverity("success"); // Green color for add
    }

    setTimeout(() => {
      setOpenSnackbar(true);
    }, 200);
  };

  // Toggle favorite handler
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
    <section className="bestselling container">
      {filteredProducts.length === 0 ? (
        <TableContainer className="table-container sec-error">
          <Typography variant="h3">
            No products found in this category.
          </Typography>
          <Button
            variant="contained"
            className="back-button px-5"
            onClick={() => Navigate(-1)}
          >
            Back
          </Button>
        </TableContainer>
      ) : (
        <Grid container spacing={2}>
          {/* Display 4 different products in each row */}
          {filteredProducts.map((product) => (
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
      )}
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

export default AllCategory;
