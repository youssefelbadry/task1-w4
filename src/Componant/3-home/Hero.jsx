import { useEffect, useState } from "react"; // Combined React import
import {
  Box,
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItem,
} from "@mui/material"; // Grouped Material-UI imports
import { ExpandLess, ExpandMore } from "@mui/icons-material"; // Grouped icons
import Carousel from "react-bootstrap/Carousel"; // Importing Carousel
import { useDispatch, useSelector } from "react-redux"; // Redux imports
import { fetchProducts } from "../redux/ProductsSlice"; // Importing action to fetch products
import { useNavigate } from "react-router"; // React Router

import "./home.css"; // Importing CSS file for styling

const Hero = () => {
  const Navigate = useNavigate();
  const drawerWidth = 240;
  const [index, setIndex] = useState(0);
  const [openItem, setOpenItem] = useState(null);

  // Handle item click for collapsing and expanding
  const handleClick = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  // Carousel auto-switching every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle carousel index selection
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Redux dispatch and selectors
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);

  // Fetch products on idle state
  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const carouselItems = [products[77], products[78], products[79]];

  return (
    <section
      className="hero"
      style={{ minHeight: "80vh", display: "flex", flexDirection: "row" }}
    >
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <CssBaseline />
        {/* Drawer for the left sidebar */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              height: "auto",
              position: "static",
            },
          }}
          className="drawer"
          variant="permanent"
          anchor="left"
        >
          <Divider />
          {/* Categories List */}
          <List>
            {["Womans Fashion", "Mens Fashion"].map((text, index) => (
              <div key={text}>
                <ListItemButton disablePadding onClick={() => handleClick(index)}>
                  <ListItemText primary={text} />
                  {openItem === index ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openItem === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Clothes" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
          {/* Other categories list */}
          <List>
            {[
              "Electronics",
              "Medicine",
              "Sports & Outdoor",
              "Babys & Toys",
              "Groceries & Pets",
              "Healthy & Beauty",
            ].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        {/* Main Content Area */}
        <Box
          component="section"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Carousel Component */}
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            controls={false}
            indicators={false}
            className="carousel"
          >
            {carouselItems.map((product, idx) => (
              <Carousel.Item key={idx} className="carousell">
                <div>
                  <Carousel.Caption className="caption-center">
                    <h3>{product?.title}</h3>
                    <h2>Up to 10% off voucher</h2>
                    <a
                      className="button-show"
                      onClick={() => Navigate(`/details/${product.title}`)}
                    >
                      Shop Now <span className="icon-arrow-right"></span>
                    </a>
                  </Carousel.Caption>
                </div>
                <div className="sec-photo-ca-corsal">
                  <img
                    className="d-block w-100"
                    src={product?.images[0]}
                    alt={`Slide ${idx + 1}`}
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                </div>
              </Carousel.Item>
            ))}
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {carouselItems.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`me-2 ${index === idx ? "active" : ""}`}
                  style={{
                    backgroundColor: index === idx ? "red" : "gray",
                    borderRadius: "50%",
                    width: "10px",
                    height: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect(idx)}
                />
              ))}
            </div>
          </Carousel>
        </Box>
      </Box>
    </section>
  );
};

export default Hero;
