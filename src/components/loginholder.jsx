import React, { useState } from 'react';
import "../styles/loginholder.css";
import { motion } from 'framer-motion';
import Login from "./login";
import Signup from './Signup';

function Loginholder({closePopUp, showLogin, authentication})
{

  const [logsign, setLogsign] = useState(showLogin);

  const openLogin = () => {
    setLogsign(true);
  }

  const openSignUp = () => {
    setLogsign(false);
  }

  return (
    <motion.div
      initial={{scale: 0.8}}
      animate={{ scale: 1 }}
      transition={{ ease: "easeIn", duration: 0.3 }}
      exit={{ x: 1500, transition: {ease: "easeIn", duration: 0.3} }}
      className="log-in-holder"
    >
      <div className="holder-2">
        <div className="lower-holder" >
          {logsign? <Login closePopUp={closePopUp} />:<Signup closePopUp={closePopUp} />}
        </div>
        <div className="upper-holder">
          <div className="left-divider" alt="Left divider" src="left-divider.svg" />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.9 }}
            className="sign-up-green"
            onClick={openSignUp}
          >
            Sign Up
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.9 }}
            className="text-wrapper99"
            onClick={openLogin}
          >
            Log In
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default Loginholder;