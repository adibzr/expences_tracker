import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MouseEvent, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ButtonComponentLarge } from "./ButtonComponent";
import style from "./navBarStyles.module.css";

const navPages = [
  { title: "Expences", path: "/expences" },
  { title: "Income", path: "/income" },
  { title: "Tranfer", path: "/tranfer" },
  { title: "Financial Report", path: "/financial-report" },
  { title: "Budget", path: "/budget" },
];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [logInHide, setLoginHide] = useState(true);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogin = () => {
    setLoginHide(!logInHide);
  };
  const navigate = useNavigate();
  const logo =
    "https://res.cloudinary.com/dfgfylbvn/image/upload/v1713317341/expences_logo_s0abtf.png";
  const loggedIn = false;
  // const LoginButton = styled(Button)<ButtonProps>(() => ({
  //   color: "white",
  //   backgroundColor: purple[500],
  //   "&:hover": {
  //     backgroundColor: purple[700],
  //   },
  // }));

  return (
    <div>
      <AppBar position="fixed">
        <Container className={style.container} disableGutters>
          {/* sidebar start */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              PaperProps={{
                sx: {
                  backgroundColor: "black",
                  color: "white",
                  width: 1,
                  maxWidth: 250,
                },
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <Box role="presentation" onClick={handleCloseNavMenu}>
                <div className={style.logo}>
                  <img src={logo} alt="logo" />
                </div>

                <hr />
                <List>
                  {navPages.map((page) => (
                    <ListItem className="" key={page.title} disablePadding>
                      <ListItemButton
                        component="a"
                        onClick={() => navigate(page.path)}
                      >
                        <ListItemText primary={page.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
          {/* sidebar end */}
          {/* main navbar */}
          <Box
            className={style.items}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Link className={style.logo} to="/">
              {/* <img src={logo} alt="logo" /> */}
              <div></div>
            </Link>
            {navPages.map((page) => (
              <NavLink
                onClick={handleCloseNavMenu}
                key={page.title}
                className=""
                to={page.path}
              >
                <ButtonComponentLarge text={page.title} />

                {/* {page.title} */}
              </NavLink>
            ))}
          </Box>
          {/* log in || avatar */}
          <Box sx={{ flexGrow: 0 }}>
            {loggedIn ? (
              <Tooltip title="Open profile menu" className="md:mx-6 m-0">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </Tooltip>
            ) : (
              <Button
                onClick={handleLogin}
                disableRipple
                variant="contained"
                disableElevation
                className=""
              >
                Log in
              </Button>
            )}
          </Box>
        </Container>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NavBar;
