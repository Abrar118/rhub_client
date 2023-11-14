import { useEffect, useState } from "react";
import React from "react";
import "../../styles/homepage/CommunityCardHolder.css";
import mem_image from "../../assets/mem-img.png";
import star_image from "../../assets/img-star.svg";
import req_image from "../../assets/req-img.png";
import res_image from "../../assets/res-img.png";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

const CommunityCardHolder = ({
  communityTag,
  communityBio,
  communityRating,
  communityName,
  resourceCount,
  memberCount,
  communityImage,
  hideShowRequest,
}) => {
  const [showRequest, setShowRequest] = useState(false);

  useEffect(() => {
    setShowRequest(!hideShowRequest);
  }, []);

  const handleRequest = async () => {
    const status = window.localStorage.getItem("logInStatus");
    if (status === "true") {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const body = {
        name: user.name,
        email: user.email,
        tag: communityTag,
        id: user.student_id,
        date: new Date().toISOString(),
        avatar: user.avatar,
      };

      let terminate = false;
      const response = await axios
        .post("http://localhost:3002/insertRequest", body)
        .catch((err) => {
          if (err.response?.status === 500) {
            terminate = true;
            toast.error("Request already sent!");
          }
        });

      if (terminate) return;

      if (response.status === 201) {
        toast.warning("Already a member if this community!");
        return;
      }

      const data = response.data;
      if (data.acknowledged) toast.success("Request sent successfully!");
    } else toast.error("Log in to join a community");
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className="scroll-item"
    >
      <div className="com-card">
        <div className="com-card-overlap-group">
          <div className="com-img">
            <img className="course-jpg" src={communityImage} />
          </div>
          {showRequest && (
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
              whileTap={{ scale: 0.9 }}
              className="request-now"
              onClick={handleRequest}
            >
              <img className="res-img" alt="Res img" src={req_image} />
              <div className="req-wrapper">
                <div className="req-text-wrapper">Join</div>
              </div>
            </motion.button>
          )}
        </div>
        <div className="com-card-desc">
          <div className="com-tag">
            <div className="com-tag-div">#{communityTag}</div>
          </div>
          <div className="com-bio">
            <p className="com-bio-p">{communityBio}</p>
          </div>
          <div className="rating-wrapper">
            {Array(communityRating)
              .fill(null)
              .map((elem, index) => (
                <img
                  className="rating-stars"
                  alt="Rating stars"
                  src={star_image}
                  key={index}
                />
              ))}
            <div className="rating-text-wrapper">
              ({communityRating}.0/5 Rating)
            </div>
          </div>
          <div className="card-com-name">
            <div className="card-com-name-text">{communityName}</div>
          </div>
          <div className="com-stats">
            <div className="res-count">
              <img className="res-img-1" alt="Res img" src={res_image} />
              <div className="res-text">{resourceCount} Resources</div>
              <div className="card-divider">
                <div className="stats-divider">|</div>
              </div>
            </div>
            <div className="res-count-2">
              <img className="res-img" alt="Res img" src={mem_image} />
              <div className="res-text">{memberCount} Members</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCardHolder;
