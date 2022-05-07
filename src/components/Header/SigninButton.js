import React from "react";
import "./HeaderStyles.css";

function SigninButton({ children, ...restProps }) {
  return (
    <div>
      <a className="signin-button" href="/browse" {...restProps}>
        {children}
      </a>
    </div>
  );
}

export default SigninButton;
