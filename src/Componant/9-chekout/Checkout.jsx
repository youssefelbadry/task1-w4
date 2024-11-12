import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  OutlinedInput,
  Radio,
  RadioGroup,
  TableContainer,
  Typography,
} from "@mui/material";
import "./checkout.css";
import { useSelector, } from "react-redux";
import { useNavigate } from "react-router";
const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
const Navigatr = useNavigate()
  const shippingCost = 100;

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const subtotal = calculateSubtotal();
  const total = Math.ceil(parseFloat(subtotal) + shippingCost);

  return (
    <section className="checkout-section container">
      {cartItems.length === 0 ? (
        <TableContainer className="table-container sec-error">
              <Typography variant="h3">Your cart is empty.</Typography>
              <Button
                variant="contained"
                className="back-button px-5"
                onClick={() => Navigatr(-1)}
              >
                Back
              </Button>
            </TableContainer>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Box className="left-sec-checkout">
              <form noValidate autoComplete="off">
                <label htmlFor="firstName">
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <FormControl fullWidth>
                  <OutlinedInput id="firstName" />
                </FormControl>
              </form>

              <form noValidate autoComplete="off">
                <label htmlFor="companyName">Company Name</label>
                <FormControl fullWidth>
                  <OutlinedInput id="companyName" />
                </FormControl>
              </form>

              <form noValidate autoComplete="off">
                <label htmlFor="streetAddress">
                  Street Address <span style={{ color: "red" }}>*</span>
                </label>
                <FormControl fullWidth>
                  <OutlinedInput id="streetAddress" />
                </FormControl>
              </form>

              <form noValidate autoComplete="off">
                <label htmlFor="apartment">
                  Apartment, floor, etc, (optional)
                </label>
                <FormControl fullWidth>
                  <OutlinedInput id="apartment" />
                </FormControl>
              </form>

              <form noValidate autoComplete="off">
                <label htmlFor="townCity">
                  Town/City <span style={{ color: "red" }}>*</span>
                </label>
                <FormControl fullWidth>
                  <OutlinedInput id="townCity" />
                </FormControl>
              </form>

              <form noValidate autoComplete="off">
                <label htmlFor="phoneNumber">
                  Phone Number <span style={{ color: "red" }}>*</span>
                </label>
                <FormControl fullWidth>
                  <OutlinedInput id="phoneNumber" />
                </FormControl>
              </form>

              <form noValidate autoComplete="off">
                <label htmlFor="emailAddress">
                  Email Address <span style={{ color: "red" }}>*</span>
                </label>
                <FormControl fullWidth>
                  <OutlinedInput id="emailAddress" />
                </FormControl>
              </form>

              <FormControlLabel
                control={<Checkbox defaultChecked className="checkbox" />}
                label="Save this information for faster check-out next time"
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={5} margin="35px auto">
            <Box className="right-sec-checkout" style={{ margin: "auto" }}>
              {cartItems.map((item) => (
                <div className="content-checkout-product" key={item.id}>
                  <div className="product-info-checkout">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="product-image-checkout"
                    />
                    <span>{item.title}</span>
                  </div>
                  <div className="align-content-center">
                    <span> ${Math.ceil(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}

              <div className="checkout-total">
                <div className="sub-checkout-total">
                  <Typography>Subtotal : </Typography>
                  <Typography>${Math.ceil(subtotal)}</Typography>
                </div>
                <div className="sub-checkout-total">
                  <Typography>Shipping : </Typography>
                  <Typography>${shippingCost}</Typography>
                </div>
                <div className="sub-checkout-total">
                  <Typography>
                    <strong>Total : </strong>
                  </Typography>
                  <Typography>
                    <strong>${total}</strong>
                  </Typography>
                </div>
              </div>

              <Box className="visa-check">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <div>
                        <FormControlLabel
                          value="bank"
                          control={<Radio />}
                          label="Bank"
                        />
                      </div>
                      <div style={{ marginLeft: "100px" }}>
                        <img
                          src="https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg"
                          alt="bKash"
                          style={{ height: "30px", marginRight: "15px" }}
                        />
                        <img
                          src="https://logodownload.org/wp-content/uploads/2016/10/visa-logo-1.png"
                          alt="Visa"
                          style={{ height: "15px", marginRight: "15px" }}
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                          alt="MasterCard"
                          style={{ height: "20px", marginRight: "15px" }}
                        />
                        <img
                          src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                          alt="PayPal"
                          style={{ height: "25px", marginRight: "15px" }}
                        />
                      </div>
                    </Box>

                    <FormControlLabel
                      value="Cash on delivery"
                      control={<Radio />}
                      label="Cash on delivery"
                    />
                  </RadioGroup>
                </FormControl>

                <Box mt={3}>
                  <form noValidate autoComplete="off" className="form-coupon">
                    <FormControl className="fild">
                      <OutlinedInput
                        id="couponCode"
                        placeholder="Coupon Code"
                      />
                    </FormControl>
                    <Button variant="contained" className="button-coupon">
                      Apply Coupon
                    </Button>
                  </form>
                </Box>
                <Box mt={4}>
                  <Button variant="contained" className="button-2-coupon">
                    Checkout
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </section>
  );
};

export default Checkout;
