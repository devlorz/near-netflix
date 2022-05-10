import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./styles.css";

function Header({ black, subscription, logout, pause }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img
            alt="Netflix"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
          />
        </a>
      </div>
      <div className="header--user">
        <a onClick={handleClick}>
          <img
            alt="ีuser"
            src="https://learning.royalbcmuseum.bc.ca/wp-content/uploads/2014/07/netflix-face.jpg"
          />
        </a>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {pause && <MenuItem onClick={pause}>Pause Subscription</MenuItem>}
        {subscription && (
          <MenuItem onClick={subscription}>Cancel Subscription</MenuItem>
        )}
        <MenuItem onClick={logout}>Sign Out</MenuItem>
      </Menu>
    </header>
  );
}

export default Header;
