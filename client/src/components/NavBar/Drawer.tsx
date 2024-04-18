import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Dispatch, SetStateAction } from "react";
import style from "./drawer.module.css";

interface DrawerProps {
  pages: { path: string; name: string }[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DrawerComponent: React.FC<DrawerProps> = ({ open, setOpen, pages }) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      className={style.sidebar_paper}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box className={style.avatar}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </Box>
      <List className={style.sidebar_items}>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton className={style.sidebar_link} disableRipple>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer className={style.wrapper} open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default DrawerComponent;
