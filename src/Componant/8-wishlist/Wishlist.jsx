import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  Badge,
  CardMedia,
  IconButton,
  Typography,
  TableContainer,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Delete,
  Favorite,
  FavoriteBorder,
  Visibility,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFavorite,
  addItem,
  removeItem,
  toggleFavorite,
} from "../redux/CardSlice";
import "./wishlist.css";
import StarIcon from "@mui/icons-material/Star";
import Snipper from "../snipper/Snipper";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/ProductsSlice";
import { useNavigate } from "react-router";

const Wishlist = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cart.favorites);
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  // دالة لإزالة المنتج من المفضلة
  const handleRemoveFavorite = (product) => {
    dispatch(removeFavorite(product));
  };
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
    <section className="container wishlist mt-5">
      <Box>
        <div className="tob-sec-wish">
          {favorites.length > 0 && (
            <div className="tob-small-sec-wish">
              <div className="left-tob-small-wish">
                <p>Wishlist ({favorites.length})</p>
              </div>
              <div className="right-tob-small-wish">
                <Button
                  variant="outlined"
                  className="button-wish"
                  onClick={() => {
                    Navigate("/allFavorites");
                  }}
                >
                  Move To All Favorites
                </Button>
              </div>
            </div>
          )}

          <div className="bootom-small-sec-wish">
            {favorites.length > 0 ? (
              <Grid container spacing={2}>
                {favorites.slice(0, 4).map((product) => (
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
                                    `/details/${encodeURIComponent(
                                      product.title
                                    )}`
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
                            {cartItems.some((item) => item.id === product.id)
                              ? "Remove from Cart"
                              : "Add to Cart"}
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
        <hr />
        <div className="bottom-sec-wish mt-5">
          <div className="tob-small-sec-wish">
            <div className="left-tob-small-wish">
              <Typography variant="h5" mb={2} className="head-line">
                <span className="icon-panorama_vertical_select"></span> Just For
                You
              </Typography>
            </div>
            <div className="right-tob-small-wish">
              <Button variant="outlined" className="button-wish">
                Move To All Products
              </Button>
            </div>
          </div>
          <div className="bootom-small-sec-wish">
            <Grid container spacing={2}>
              {products.slice(116, 120).map((product) => (
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
                                  `/details/${encodeURIComponent(
                                    product.title
                                  )}`
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
                          {cartItems.some((item) => item.id === product.id)
                            ? "Remove from Cart"
                            : "Add to Cart"}
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
                            ${product.price}
                          </Typography>
                          <Typography variant="body2" className="old-price">
                            $
                            {Math.ceil(
                              parseFloat(product.price / (1 - 0.35)).toFixed(2)
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
          </div>
        </div>
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

export default Wishlist;
