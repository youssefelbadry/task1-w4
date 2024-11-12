import { useSelector, useDispatch } from "react-redux";
import {
  updateItemQuantity,
  removeItem,
  setCartItems,
} from "../redux/CardSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import "./cart.css";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const Cart = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch(setCartItems(savedCart));
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      alert("An error occurred while loading the cart. Please check the console");
    }
  }, [dispatch]);

  const handleQuantityChange = (id, newQuantity) => {
    try {
      if (newQuantity < 1) {
        dispatch(updateItemQuantity({ id, quantity: 1 }));
        return;
      }
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    } catch (error) {
      console.error(`Error updating quantity for product ${id}:`, error);
      alert(
        `An error occurred while updating the quantity for product number ${id}. Check the console for more details`
      );
    }
  };

  const handleRemoveItem = (id) => {
    try {
      dispatch(removeItem(id)); // حذف العنصر
      const updatedCart = cartItems.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    } catch (error) {
      console.error(`Error removing item with id ${id}:`, error);
      alert(`حدث خطأ أثناء حذف المنتج. راجع الكونسول للمزيد.`);
    }
  };

  const shippingCost = 100;

  const calculateSubtotal = () => {
    try {
      return cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    } catch (error) {
      console.error("Error calculating subtotal:", error);
      alert("حدث خطأ أثناء حساب المجموع الفرعي. راجع الكونسول للمزيد.");
      return "0.00";
    }
  };

  const subtotal = calculateSubtotal();
  const total = Math.ceil(parseFloat(subtotal) + shippingCost);

  return (
    <div>
      <section className="cart-section">
        <Container maxWidth="lg" className="mt-5">
          {cartItems.length === 0 ? (
            <TableContainer className="table-container sec-error">
              <Typography variant="h3">Your cart is empty.</Typography>
              <Button
                variant="contained"
                className="back-button px-5"
                onClick={() => Navigate(-1)}
              >
                Back
              </Button>
            </TableContainer>
          ) : (
            <>
              <Table className="responsive-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id} className="tb-content">
                      <TableCell>
                        <div className="product-info">
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="product-image"
                            />
                          ) : (
                            <span>No Image Available</span>
                          )}
                          <span>{item.title}</span>
                        </div>
                      </TableCell>

                      <TableCell>${Math.ceil(item.price)}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          variant="outlined"
                          value={item.quantity}
                          size="small"
                          className="quantity-input"
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        ${Math.ceil(item.price * item.quantity)}
                      </TableCell>
                      <TableCell>
                        {showDeleteIcon && (
                          <DeleteIcon
                            onClick={() => handleRemoveItem(item.id)}
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box className="buttons-cart mt-4">
                <div>
                  <Button
                    variant="outlined"
                    className="button-card"
                    onClick={() => Navigate(-1)}
                  >
                    Return To Shop
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    className="button-card"
                    onClick={() => setShowDeleteIcon(!showDeleteIcon)}
                  >
                    Update Cart
                  </Button>
                </div>
              </Box>
              <Box className="container details-card">
                <div className="coupon-section">
                  <TextField
                    label="Coupon Code"
                    variant="outlined"
                    className="input-coupon-section"
                  />
                  <Button variant="contained" className="button-coupon-section">
                    Apply Coupon
                  </Button>
                </div>
                <div className="cart-total">
                  <Typography variant="h6" gutterBottom>
                    Cart Total
                  </Typography>
                  <div className="sub-cart-total">
                    <Typography>Subtotal: </Typography>
                    <Typography>${Math.ceil(subtotal)}</Typography>
                  </div>
                  <div className="sub-cart-total">
                    <Typography>Shipping: </Typography>
                    <Typography>${shippingCost}</Typography>
                  </div>
                  <div className="sub-cart-total">
                    <Typography>
                      <strong>Total: </strong>
                    </Typography>
                    <Typography>
                      <strong>${total}</strong>
                    </Typography>
                  </div>
                  <Box className="checkout-button-cart">
                    <Button
                      variant="contained"
                      className="checkout-button"
                      onClick={() => {
                        Navigate("/checkout");
                      }}
                    >
                      Proceed to checkout
                    </Button>
                  </Box>
                </div>
              </Box>
            </>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Cart;
