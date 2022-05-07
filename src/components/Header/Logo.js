import React from "react";
import logo from "../../assets/logo.svg";
import "./HeaderStyles.css";

function Logo({ children, ...restProps }) {
  return (
    <div>
      <a href="/" {...restProps}>
        {children}
        <img className="logo" href="/" src={logo} alt="Netflix logo" />
      </a>
    </div>
  );
}

export default Logo;
