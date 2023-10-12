import React from 'react';
import Landing from "./landing";
import Features from "./features";
import CommunitySlider from './CommunitySlider';
import Stats from "./stats";

function Homepage() {
  return (
    <div className=' overflow-hidden bg-cover container'>
      <Landing/>
      <Features/>
      <CommunitySlider/>
      <Stats/>
    </div>
  )
}

export default Homepage;