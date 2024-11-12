import { Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import '../4-about/about.css'

import './home.css'
import { useSelector } from "react-redux";

const Arrival = () => {
  const products = useSelector((state) => state.products.items);

  return (
    <section className="arrival mt-5">
      <Grid container spacing={2} className="grid-container-arrival">
        {/* Left Section (Product 93) */}
        <Grid item xs={12} md={6} className="left-arrival">
          <div className={products[93]?.className}>
            <div className="image-container">
              <img
                src="/image/Watch.jpeg"
                alt={products[93]?.title}
                className="arrival-image"
              />
              <div className="overlay h-100">
                <Typography variant="h5">{products[93]?.title}</Typography>
                <Typography variant="p">Timeless elegance awaits with our classic watch collection</Typography>
                <Link to={`/details/${products[93]?.title}`} className="link-arrival">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6} className="right-arrival">
          {/* Top-right Section (Product 6) */}
          <div className="top-right-arrival">
            <div className="image-container">
              <img
                src="/image/perfume.jpeg"
                alt={products[6]?.title}
                className="arrival-image"
              />
              <div className="overlay">
                <Typography variant="h5">{products[6]?.title}</Typography>
                <Typography variant="p">Experience elegance in every scent with our exclusive perfume collection</Typography>
                <Link to={`/details/${products[6]?.title}`} className="link-arrival">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom-right Sections */}
          <Grid container spacing={2} className="bottom-right-arrival">
            {/* Bottom-left Section (Product 109) */}
            <Grid item xs={6} className={products[109]?.className}>
              <div className="image-container">
                <img
                  src="/image/light.jpeg"
                  alt={products[109]?.title}
                  className="arrival-image"
                />
                <div className="overlay">
                  <Typography variant="h5">{products[109]?.title}</Typography>
                  <Typography variant="p">Perfect lighting for every selfie with our iPhone lamp.</Typography>
                  <Link to={`/details/${products[109]?.title}`} className="link-arrival">
                    Shop Now
                  </Link>
                </div>
              </div>
            </Grid>

            {/* Bottom-right Section (Product 113) */}
            <Grid item xs={6} className={products[98]?.className}>
              <div className="image-container">
                <img
                  src="/image/speaker.jpeg"
                  alt={products[98]?.title}
                  className="arrival-image"
                />
                <div className="overlay">
                  <Typography variant="h5">{products[98]?.title}</Typography>
                  <Typography variant="p"></Typography>
                  <Link to={`/details/${products[98]?.title}`} className="link-arrival">
                    Shop Now
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Arrival Additional Information Section */}
      <div className="arrival-about">
        <Grid container spacing={2}>
          {[{
            icon: "icon-truck",
            label: "FREE AND FAST DELIVERY",
            sub: "Free delivery for all orders over 140$",
          }, {
            icon: "icon-headset_mic",
            label: "24/7 CUSTOMER SERVICE",
            sub: "Friendly 24/7 customer support",
          }, {
            icon: "icon-verified_user",
            label: "MONEY BACK GUARANTEE",
            sub: "We return money within 30 days",
          }].map((item) => (
            <Grid item xs={12} sm={4} md={4} key={item.label}>
              <Paper
                variant="elevation"
                className="paper-dlivary"
                style={{ textAlign: "center" }}
              >
                <div className="father-icon-dlivary">
                  <h1 className={item.icon}></h1>
                </div>
                <Typography pt={2} style={{ fontWeight: "bold" }}>
                  {item.label}
                </Typography>
                <Typography pt={2}>{item.sub}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default Arrival;
