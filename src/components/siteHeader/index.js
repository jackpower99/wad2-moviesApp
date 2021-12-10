import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useAuth } from "../../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));


const SiteHeader = ( { history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {logout} = useAuth();
  const {currentUser} = useAuth()

 
  var menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Logout", path: "/logedOut" },
    { label: "Login", path: "/login"},
  ];

  function editMenuOptions(){
    if(currentUser){
    var menuOpt = menuOptions.filter(opt=> opt.label !== "Login")
    console.log(menuOpt);
    return menuOpt;
    }
    var menuOptLoggedOut = menuOptions.filter(opt=> opt.label !== "Logout")
    return menuOptLoggedOut
  }

  const handleMenuSelect = (pageURL) => {
    console.log(pageURL);
    if(pageURL !== "/logedOut"){
      history.push(pageURL);
      console.log(1);
    }
    else{
    console.log(pageURL);
    history.push("/login");
    logout();
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" className={classes.title}>
            All you ever wanted to know about Movies!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {editMenuOptions().map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {editMenuOptions().map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default withRouter(SiteHeader);