import React, { useEffect, useState } from 'react'
import "../../styles/homepage/landing.css";
import Illustration from "../../assets/Illustration.svg";
import { motion, AnimatePresence } from "framer-motion";
import PortalPopup from '../PortalPopup';
import dot_shape from "../../assets/blog-shape.png";
import Loginholder from '../loginholder';
import { useNavigate } from 'react-router-dom';

function Landing() {

   const [joinnow, setJoinnow] = useState(false);
   const [showJoin, setShowJoin] = useState(true);
   const navigate = useNavigate();

   const openJoinNow = () => {
      setJoinnow(true);
   }

   const closeJoinNow = () => {
      setJoinnow(false);
   }

   useEffect(() => {
      const status = window.localStorage.getItem("logInStatus");
      setShowJoin(status === "false");
   }, [])

   return (
      <div className="section-hero" id='hero'>
         <div className="overlap-hero-group">
            <div className="hero-container">
               <div className="div-hero-content">
                  <div className="hero-heading">
                     <div className="upper-title">MIST</div>
                     <div className="central-wrapper"> CENTRAL</div>
                     <div className="lower-title">RESOURCE HUB</div>
                     <div className="subtitle">Share your knowledge through</div>
                  </div>
                  <div className="button-wrapper">
                     <motion.button
                        whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
                        whileTap={{ scale: 0.9 }}
                        className="com-button"
                        onClick={()=> {navigate("/allCommunities")}}
                     >
                        <div className="com-button-text">Our communities</div>
                     </motion.button>
                     {
                        showJoin && (
                           <motion.button
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.9 }}
                              className="join-button"
                              onClick={openJoinNow}
                           >
                              <div className="join-button-text">Join now</div>
                           </motion.button>
                        )
                     }
                  </div>
               </div>
               <div className="hero-img">
                  <img className="illustration" alt="Illustration" src={Illustration} />
                  <img className="dot-shape" alt="Dot shape" src={dot_shape} />
               </div>
            </div>
         </div>
         {
            <AnimatePresence
               initial={false}
               mode="wait"
               onExitComplete={() => null}
            >
               {
                  joinnow && (
                     <PortalPopup
                        overlayColor="rgba(0,0,0, 0.5)"
                        placement="Centered"
                        onOutsideClick={closeJoinNow}
                     >
                        <Loginholder closePopUp={closeJoinNow} showLogin={false} />
                     </PortalPopup>
                  )
               }
            </AnimatePresence>
         }
      </div>
   )
}

export default Landing;