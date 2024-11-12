import { useState } from "react";
import { Box, Paper, Typography, Grid, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "./home.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const BrowserCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 6; // Number of products per page
  const totalProducts = 11; // Total number of products

  // Next navigation handler
  const handleNext = () => {
    if (currentIndex + productsPerPage < totalProducts) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  // Previous navigation handler
  const handlePrev = () => {
    if (currentIndex - productsPerPage >= 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  const categories = [
    { icon: "icon-phone", label: "smartphones", category: "smartphones" },
    { icon: "icon-display", label: "laptops", category: "laptops" },
    { icon: "icon-watch", label: "SmartWatch", category: "mens-watches" },
    {
      icon: "icon-headphones",
      label: "Speahers",
      category: "mobile-accessories",
    },
    {
      icon: "icon-sports_esports",
      label: "Sports",
      category: "sports-accessories",
    },
    { icon: "icon-office", label: "Decoration", category: "home-decoration" },
    { icon: "icon-wheelchair-alt", label: "Furniture", category: "furniture" },
    { icon: "icon-drink", label: "Groceries", category: "groceries" },
    {
      icon: "icon-spoon-knife",
      label: "Kitchen",
      category: "kitchen-accessories",
    },
    { icon: "icon-t-shirt", label: "Shirts", category: "mens-shirts" },
    { icon: "icon-motorcycle", label: "Motorcycle", category: "motorcycle" },
  ];

  return (
    <section className="category">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        {/* Category Section Header */}
        <Typography variant="h5" mb={2} className="head-line">
          <span className="icon-panorama_vertical_select"></span> Category
        </Typography>

        {/* Arrow Buttons for Navigation */}
        <Box
          className="arrow-sales"
          display="flex"
          gap={2}
          mb={{ xs: 3, sm: 4 }}
          justifyContent="center"
        >
          <IconButton onClick={handlePrev} className="back-button-sales">
            <ArrowBack className="icon-sales" />
          </IconButton>
          <IconButton onClick={handleNext} className="back-button-sales">
            <ArrowForward className="icon-sales" />
          </IconButton>
        </Box>
      </Box>

      <Box className="bottom-sec-category">
        <motion.div
          className="bottom-sec-sales"
          key={currentIndex}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          <Grid container spacing={2} justifyContent="center">
            {categories
              .slice(currentIndex, currentIndex + productsPerPage) // Slice the array based on current index
              .map((item) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={2}
                  key={item.category}
                  onClick={() => handleCategoryClick(item.category)}
                >
                  <Paper
                    variant="elevation"
                    className="paper-category"
                    style={{ padding: "16px", textAlign: "center" }}
                  >
                    <h1 className={item.icon}></h1>
                    <Typography pt={2}>{item.label}</Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </motion.div>
      </Box>
    </section>
  );
};

export default BrowserCategory;
