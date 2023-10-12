import { useState } from 'react';
import React, { useEffect } from "react";
import CommunityCardHolder from "./CommunityCardHolder";
import "../../styles/homepage/CommunitySlider.css";
import arrow_img from "../../assets/arrow.svg";
import { motion } from "framer-motion";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommunitySlider = () => {

  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3002/get_top_communities")
      .then(response => {
        const data = response.data;
        setCommunities(data);
        //console.log(communities[0].com_image);
      }).catch(error => {
        console.log(error);
      })
    
  }, [])

  return (
    <div className="com-scroll" id="communities">
      <div className="scroll-container">
        <div className="com-section-subtitle">
          <div className="popular-courses">POPULAR COMMUNITIES</div>
        </div>
        <div className="com-section-title">
          <p className="pick-community">Pick A Community To Get Started</p>
        </div>
        <div className="scroll-list">
          {
            communities.map((com, index) =>
              <CommunityCardHolder
                key={index}
                className="scroll-item-instance"
                communityTag={com.tag}
                communityBio={com.description}
                communityRating={com.rating}
                communityName={com.name}
                resourceCount={com.resource}
                memberCount={com.members}
                communityImage={`${com.com_image}`}
              />
            )
          }
        </div>
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          className="discover-more"
          onClick={()=> {navigate("/allCommunities"); window.scrollTo(0,0)}}
        >
          <div className="browse-more">Browse more communities</div>
          <img className="arrow-icon" alt="Arrow icon" src={arrow_img} />
        </motion.button>
      </div>
    </div>
  );
};

export default CommunitySlider;