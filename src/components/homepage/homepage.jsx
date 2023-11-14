import React, { useEffect } from "react";
import Landing from "./landing";
import Features from "./features";
import CommunitySlider from "./CommunitySlider";
import Stats from "./stats";
import { useLocation } from "react-router-dom";

function Homepage() {
  const location = useLocation().pathname;
  useEffect(() => {
    console.log(location);
  }, []);
  return (
    <div className=" overflow-hidden bg-cover container">
      <Landing />
      <Features />
      <CommunitySlider />
      <Stats />
    </div>
  );
}

export default Homepage;
