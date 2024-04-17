import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import style from "./navBarStyles.module.css";
import { NavLink } from "react-router-dom";
import DrawerComponent from "./Drawer";

const pages = [
  { path: "/expenses", name: "Expenses" },
  { path: "/income", name: "Income" },
  { path: "/transfer", name: "Transfer" },
  { path: "/fiancial-report", name: "Fiancial Report" },
  { path: "/budget", name: "Budget" },
];

const ResponsiveAppBar = () => {
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
    <AppBar className={style.appBar} position="static">
      <Toolbar disableGutters>
        <Box
          className={style.logo}
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        ></Box>
        {/* sidebar */}
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
        </Box>
        <DrawerComponent open={open} setOpen={setOpen} pages={pages} />

        <Box
          className={style.logo}
          sx={{ display: { xs: "flex", md: "none" } }}
        ></Box>
        {/* navbar */}
        <Box
          className={style.items}
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {pages.map((page) => (
            <NavLink
              key={page.name}
              className={({ isActive }) =>
                style.links + " " + (isActive ? style.active : "")
              }
              onClick={handleCloseNavMenu}
              to={page.path}
            >
              {page.name}
            </NavLink>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Profile">
            <IconButton
              className={style.profile}
              onClick={handleClickProfile}
              sx={{ p: 0 }}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;