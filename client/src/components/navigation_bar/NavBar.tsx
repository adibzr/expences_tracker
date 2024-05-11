import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/expences_logo.png";
import { ButtonComponentSmall } from "../ButtonComponent";
import { LogIn } from "../authentication/Login";
import { Register } from "../authentication/Register";
import DrawerComponent from "./Drawer";
import style from "./navBarStyles.module.css";

const pages = [
  { path: "/expenses", name: "Expenses" },
  { path: "/income", name: "Income" },
  { path: "/transfer", name: "Transfer" },
  { path: "/fiancial-report", name: "Fiancial Report" },
  { path: "/budget", name: "Budget" },
];

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const [logInHide, setLoginHide] = React.useState(true);
  const [RegisterHide, setRegisterHide] = React.useState(true);
  const loggedIn = false;

  const handleOpenNavMenu = () => {
    setOpen(true);
  };

  const handleCloseNavMenu = () => {
    setOpen(false);
  };

  const handleClickProfile = () => {
    null;
  };
  const handleLogin = () => {
    setLoginHide(!logInHide);
  };

  const pagesSidebar: Array<{ path: string; name: string }> = [
    { path: "/", name: "Home" },
    ...pages,
    { path: "/profile", name: "Profile" },
  ];

  return (
    <>
      <AppBar className={style.header}>
        <Container className={style.container} maxWidth={false}>
          <Link to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </Link>
          {/* sidebar */}
          <Box className={style.sidebar}>
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
          </Box>
          <DrawerComponent open={open} setOpen={setOpen} pages={pagesSidebar} />
          <img className={style.logoResponsive} src={logo} alt="logo" />
          {/* navbar */}
          <nav className={style.nav_container}>
            <ul className={style.nav_list}>
              {pages.map((page) => (
                <li key={page.name}>
                  <NavLink
                    className={({ isActive }) => (isActive ? style.active : "")}
                    onClick={handleCloseNavMenu}
                    to={page.path}
                  >
                    {page.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <Box>
                  {loggedIn ? (
                    <Tooltip title="Profile">
                      <IconButton
                        className={style.profile}
                        onClick={handleClickProfile}
                        sx={{ p: 0 }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <ButtonComponentSmall
                      text="LOGIN"
                      handleClick={handleLogin}
                    />
                  )}
                </Box>
              </li>
            </ul>
          </nav>
        </Container>
      </AppBar>
      <LogIn
        logInHide={logInHide}
        setLoginHide={setLoginHide}
        setRegisterHide={setRegisterHide}
      />
      <Register
        RegisterHide={RegisterHide}
        setLoginHide={setLoginHide}
        setRegisterHide={setRegisterHide}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default NavBar;
