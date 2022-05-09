import React from "react";
import "./HeaderStyles.css";

function SigninButton({ children, href, ...restProps }) {
  return (
    <div>
      <a className="signin-button" href={href} {...restProps}>
        {children}
      </a>
    </div>
  );
}

export default SigninButton;
