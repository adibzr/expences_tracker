import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";
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

  const handleOpenNavMenu = () => {
    setOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCloseNavMenu = () => {
    setOpen(false);
  };

  const handleClickProfile = () => {
    null;
  };

  return (
    <>
      <AppBar className={style.header}>
        <Container className={style.container} maxWidth={false}>
          <Box
            className={style.logo}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          ></Box>
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
          <DrawerComponent open={open} setOpen={setOpen} pages={pages} />

          <Box
            className={style.logo}
            sx={{ display: { xs: "flex", md: "none" } }}
          ></Box>
          {/* navbar */}
          <nav className={style.nav_container}>
            <ul className={style.nav_list}>
              {pages.map((page) => (
                <li>
                  <NavLink
                    key={page.name}
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
                </Box>
              </li>
            </ul>
          </nav>
        </Container>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default NavBar;
