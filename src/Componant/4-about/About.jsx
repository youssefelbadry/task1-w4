import "./about.css";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
const About = () => {
  const teamData = [
    {
      name: "Tom Cruise",
      title: "Founder & Chairman",
      image: "/image/owner1.png",
    },
    {
      name: "Emma Watson",
      title: "Managing & Director",
      image: "/image/owner2.png",
    },
    {
      name: "Will Smith",
      title: "Product Designer",
      image: "/image/owner3.png",
    },
  ];

  return (
    <>
    

      <section className="about container">

        <Box className="hero-about">
          <div className="left-hero-about">
            <h2>Our Story</h2>
            <p>
              Lounced in 2015. Exclusive is South Asia premier online shopping
              makterplace with an active presense in llangladesh Supported by
              wide range af tallored marketing, data and service solutions,
              Exclusive has 10,500 sollers and 300 brands and serves 3 millioons
              custorners across the region
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing of a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer
            </p>
          </div>
          <div className="right-hero-about"></div>
        </Box>
        {/* ======================================================================= */}
        <div className="main-paper">
          <Grid container spacing={2}>
            {[
              {
                icon: "icon-shop",
                label: "10.5K",
                sub: "Sallers active our site",
              },
              {
                icon: "icon-coin-dollar",
                label: "33K",
                sub: "Mopnthly Produduct Sale",
              },
              {
                icon: "icon-redeem",
                label: "45.5K",
                sub: "Customer active in our site",
              },
              {
                icon: "icon-moneybag",
                label: "25K",
                sub: "Anual gross sale in our site",
              },
            ].map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.label}>
                <Paper
                  variant="elevation"
                  className="paper-about"
                  style={{ textAlign: "center" }}
                >
                  <div className="father-icon-about">
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
        <div className="owner-about">
  <Grid container spacing={2}>
    {Array(3).fill().map((_, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <Card className="owner" sx={{ maxWidth: 350 }}>
          <CardMedia
            sx={{ height: 250 }}
            image={teamData[i % teamData.length].image} 
            title={teamData[i % teamData.length].name}  
          />
          <CardContent className="owner-card-content">
            <Typography gutterBottom variant="h5" component="div">
              {teamData[i % teamData.length].name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              {teamData[i % teamData.length].title}
            </Typography>
          </CardContent>
          <IconButton>
            <span className="icon-twitter"></span>
            <span className="icon-instagram mx-4"></span>
            <span className="icon-linkedin"></span>
          </IconButton>
        </Card>
      </Grid>
    ))}
  </Grid>
</div>



        <div className="dlivary-about">
          <Grid container spacing={2}>
            {[
              {
                icon: "icon-truck",
                label: "FREE AND FAST DELIVARY",
                sub: "Free delivary for all orders over 140$",
              },
              {
                icon: "icon-headset_mic",
                label: "24/7 CUSTOMER SERVICE",
                sub: "friendly 24/7 customer support",
              },
              {
                icon: "icon-verified_user",
                label: "MONEY BACK GUARANTEE",
                sub: "We reun money within 30 days",
              },
            ].map((item) => (
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
    </>
  );
};

export default About;
