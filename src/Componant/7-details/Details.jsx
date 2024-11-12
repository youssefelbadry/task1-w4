import { useEffect, useState } from "react";
import "./details.css";
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
import {
  Autorenew,
  Favorite,
  FavoriteBorder,
  Visibility,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, addItem, removeItem } from "../redux/CardSlice";  
import { fetchProducts } from "../redux/ProductsSlice";
import { useNavigate, useParams } from "react-router-dom";  
import StarIcon from "@mui/icons-material/Star";

const Details = () => {
  const Navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [size, setSize] = useState("M"); // Default selected size
  const [quantity, setQuantity] = useState(0); // Default quantity is 0

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const favorites = useSelector((state) => state.cart.favorites);
  const cartItems = useSelector((state) => state.cart.items);

  const { title } = useParams(); 
  const decodedTitle = decodeURIComponent(title); 

  useEffect(() => {
    if (productStatus === "idle" && products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch, products.length]);

  const product = products.find((p) => p.title === decodedTitle);

  useEffect(() => {
    if (product && cartItems.length > 0) {
      const cartProduct = cartItems.find((item) => item.id === product.id);
      if (cartProduct) {
        setQuantity(cartProduct.quantity);
      }
    }
  }, [product, cartItems]);

  if (!product) {
    return (
      <div>
        {" "}
        <TableContainer className="table-container sec-error">
          <Typography variant="h3">
            Product not found. Please check the product title.
          </Typography>
          <Button
            variant="contained"
            className="back-button px-5"
            onClick={() => Navigate(-1)}
          >
            Back
          </Button>
        </TableContainer>
      </div>
    ); 
  }

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
  };

  const handleQuantityChange = (type) => {
    const account = localStorage.getItem('email'); 
  
    if (!account) {
      Navigate('/signup'); 
      return; 
    }
  
    let newQuantity = quantity;
  
    if (type === "increment") {
      newQuantity = quantity + 1;
    } else if (type === "decrement" && quantity > 0) {
      newQuantity = quantity - 1;
    }
  
    setQuantity(newQuantity);
  
    if (newQuantity > 0) {
      dispatch(addItem({ product, quantity: newQuantity }));
    } else {
      dispatch(removeItem(product.id));
    }
  };

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

    // تحديد إذا كان المنتج في المفضلة أو لا
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

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <section className="details container">
      <div className="sec-details mt-5">
        <div className="left-sec-details">
          <div className="double-left-sec-details">
            {product?.images.slice(0, 5).map((image, index) => (
              <div key={index} className="small-image-left-details">
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
          <div className="double-right-sec-details">
            <img src={product?.images[0]} alt="Main Product" />
          </div>
        </div>
        <div className="right-sec-details">
          <div className="top-right-sec-detials">
            <h5 className="mb-3">{product?.title}</h5>
            <Box className="rating-container mb-3">
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
                ( {product.stock} Reviews ) <strong className="mx-4">|</strong>{" "}
                <span style={{ color: "lawngreen" }}>In stock</span>
              </Typography>
            </Box>
            <p>${product?.price}</p>
            <p>{product?.description}</p>
            <p>{product?.details}</p>
          </div>
          <div className="bottom-right-sec-detials">
            <div className="product-options">
              <div className="size-selector">
                <p>
                  <strong> Size : </strong>
                  {["XS", "S", "M", "L", "XL"].map((s) => (
                    <button
                      key={s}
                      className={`mx-1 size-button ${
                        size === s ? "active" : ""
                      }`}
                      onClick={() => handleSizeChange(s)}
                    >
                      {s}
                    </button>
                  ))}
                </p>
              </div>

              <div className="quantity-selector">
                <div className="quntaty">
                  <button onClick={() => handleQuantityChange("decrement")}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange("increment")}>
                    +
                  </button>
                </div>
                <Button
                  className="buy-now-button"
                  onClick={() => {
                    Navigate("/checkout");
                  }}
                >
                  Buy Now
                </Button>
                <IconButton onClick={() => handleToggleFavorite(product)}>
                  {favorites.some((fav) => fav.id === product.id) ? (
                    <Favorite color="error" />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </div>

              <div className="delivery-info">
                <div className="free-delivery">
                  <div>
                    <p className="icon-truck" style={{ fontSize: "35px" }}></p>
                  </div>
                  <div>
                    <p>
                      <strong>Free Delivery</strong>
                    </p>
                    <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>

                <div className="free-delivery">
                  <div>
                    <p>
                      <Autorenew style={{ fontSize: "35px" }} />
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Return Delivery</strong>
                    </p>
                    <p>Free 30 Days Delivery Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 py-5">
        <hr />
      </div>
      <Typography variant="h5" mb={4} className="head-line">
        <span className="icon-panorama_vertical_select"></span>Related Item
      </Typography>

      <Box className="bottom-sec-bestselling">
        <Grid container spacing={2}>
          {relatedProducts.slice(0, 4).map((product) => (
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

export default Details;
