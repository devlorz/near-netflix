import React from "react";
import "./styles.css";

function Header({ black, onClick }) {
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
        <a onClick={onClick}>
          <img
            alt="ีuser"
            src="https://learning.royalbcmuseum.bc.ca/wp-content/uploads/2014/07/netflix-face.jpg"
          />
        </a>
      </div>
    </header>
  );
}

export default Header;