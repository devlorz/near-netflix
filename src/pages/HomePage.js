import React from "react";
import HeaderCompound from "../components/Header";
import OptFormCompound from "../components/OptForm";

function HomePage() {
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

export default HomePage;
