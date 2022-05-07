import React from "react";
import OptFormWrapper from "./OptFormWrapper";
import OptFormText from "./OptFormText";
import OptFormEmail from "./OptFormEmail";
import OptFormButton from "./OptFormButton";

function OptFormCompound() {
  return (
    <>
      <OptFormText>
        Ready to watch? Enter your email to create or restart your membership.
      </OptFormText>
      <OptFormWrapper>
        <OptFormEmail placeholder="Email Address" />
        <OptFormButton>Get Started</OptFormButton>
      </OptFormWrapper>
    </>
  );
}

export default OptFormCompound;
