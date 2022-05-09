import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";

import HeaderCompound from "../components/Header";
import OptFormCompound from "../components/OptForm";

function HomePage() {
  let history = useHistory();
  const isSignedIn = window.walletConnection.isSignedIn();

  useEffect(() => {
    if (isSignedIn && history) {
      history.push("/subscription");
    }
  }, []);
  return (
    <>
      <HeaderCompound>
        <OptFormCompound />
      </HeaderCompound>
      {/* <Seperator />
      <JumboCompound />
      <AccordionCompound />
      <OptFormCompound />
      <Seperator />
      <FooterCompound /> */}
    </>
  );
}

export default withRouter(HomePage);
