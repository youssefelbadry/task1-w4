import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  styled,
  alpha,
  IconButton,
  Button,
  Typography,
  Tooltip,
  Avatar,
  Container,
  Menu,
  MenuItem,
  Badge,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./header.css";
import {
  Clear,
  Logout,
  PermIdentity,
  Reviews,
  Wallet,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteCount = useSelector((state) => state.cart.favorites.length);
  const uniqueItemsCount = cartItems.length;
  const Navigate = useNavigate();
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const pages = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  const handlelogout = () => {
    localStorage.clear();
  };

  const settings = [
    { name: "Manage My Account", path: "/account", icon: <PermIdentity /> },
    { name: "My Order", path: "/cart", icon: <Wallet /> },
    { name: "My Concellations", path: "/wishlist", icon: <Clear /> },
    { name: "My Reviews", path: "/details/:title", icon: <Reviews /> },
    {
      name: "Logout",
      path: "/signup",
      icon: <Logout />,
      onClick: handlelogout,
    },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (path) => {
    handleCloseUserMenu();
    navigate(path);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isAuthenticated =
    localStorage.getItem("username") || localStorage.getItem("email");

  return (
    <AppBar position="sticky" className="custom-app-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="/image/logo3.png"
            width={80}
            height={60}
            style={{
              cursor: "pointer",
              marginRight: "8px",
            }}
            className="show-md"
          />

          <Typography
            variant="h6"
            component="p"
            onClick={() => Navigate("/")}
            sx={{
              marginRight: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            OneStopMarket
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "#db4444",
            }}
          >
            <IconButton
              size="large"
              aria-label="open menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#db4444"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  className="menu-items-header"
                  key={page.name}
                  onClick={() => navigate(page.path)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <img
            src="/image/logo3.png"
            width={80}
            height={60}
            style={{
              display: "none",
              "@media (min-width: 600px)": {
                display: "flex",
                cursor: "pointer",
              },
              marginRight: "8px",
            }}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              marginRight: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OneStopMarket
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: { md: "100px", xs: 0 },
              gap: { md: "1.5rem", xs: "0.5rem" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}

            {!isAuthenticated && (
              <Button
                key="Sign Up"
                onClick={() => navigate("/signup")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Sign Up
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Search className="search">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", gap: "1rem" }}>
            <IconButton aria-label="favorites">
              <Badge
                badgeContent={favoriteCount > 0 ? favoriteCount : null}
                color="error"
              >
                <span
                  className="icon-heart"
                  onClick={() => {
                    navigate("/wishlist");
                  }}
                ></span>
              </Badge>
            </IconButton>

            <IconButton aria-label="cart">
              <Badge
                badgeContent={uniqueItemsCount > 0 ? uniqueItemsCount : null}
                color="error"
              >
                <span
                  className="icon-local_grocery_store"
                  onClick={() => {
                    navigate("/cart");
                  }}
                ></span>
              </Badge>
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" sx={{ backgroundColor: "#DB4444" }}>
                  {(localStorage
                    .getItem("firstname")
                    ?.charAt(0)
                    .toUpperCase() || "U") +
                    (localStorage
                      .getItem("lastname")
                      ?.charAt(0)
                      .toUpperCase() || "")}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              className="menu"
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={
                    setting.onClick
                      ? setting.onClick
                      : () => handleMenuItemClick(setting.path)
                  }
                  className="menu-items-header"
                >
                  <ListItemIcon>{setting.icon}</ListItemIcon>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
