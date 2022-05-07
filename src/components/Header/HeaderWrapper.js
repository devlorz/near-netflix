import React from "react";
import "./HeaderStyles.css";

function HeaderWrapper({ children, ...restProps }) {
  return <div {...restProps}>{children}</div>;
}

export default HeaderWrapper;
