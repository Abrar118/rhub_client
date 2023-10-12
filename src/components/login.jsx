import React, { useCallback, useState } from "react";
import "../styles/login.css";
import email_icon from "../assets/email-icon.png";
import google_icon from "../assets/google-icon.svg";
import apple_icon from "../assets/apple-icon.svg";
import lock_icon from "../assets/lock-icon.png";
import welcome from "../assets/welcome.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

export const Login = ({ closePopUp }) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const authenticateUser = async (e) => {

    e.preventDefault();

    let terminate = false;

    const response = await axios.get(`http://localhost:3002/getStudentByEmail/${email}/${password}`)
      .catch(error => {
        if (error.response?.status === 500) {
          toast.error(error.response.data.error);
          terminate = true;
        }
      });

    if (terminate) return;

    const data = response.data;

    if (response.status === 201) {
      toast.error("Username or Password doesn't match!");
      return;
    }

    if(response.status === 202){
      toast.error("User is not verified!");
      return;
    }

    window.localStorage.setItem("logInStatus", true);
    window.localStorage.setItem("currentUser", JSON.stringify(data));
    // console.log(window.localStorage.getItem("currentUser"));

    toast.success("Successfully Logged In");
    
    setTimeout(() => {
      navigate("/");
      closePopUp();
      window.location.reload(true);
    }, 500);
  };

  const toggleShow = () => {
    setShowPass(!showPass);
  }

  return (
    <motion.div
      className="login"
    >
      <div className="secondary-wrapper">
        <form className="log-in-form" onSubmit={authenticateUser}>
          <div className="log-in-field">
            <div className="field-holder-log">
              <input
                required
                type="email"
                name="email"
                placeholder="email address"
                className="log-in-email-holder"
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <img className="email-icon" alt="Email icon" src={email_icon} />
            </div>
            <div className="field-holder-log">
              <input
                required
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="password"
                className="log-in-email-holder"
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <img className="lock-icon" alt="Lock icon" src={lock_icon} />
              <div className="toggle-show" onClick={toggleShow}>
                {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </div>
          <div className="remember-section">
            <div className="remember-checkbox">
              <input type="checkbox" className="checkbox-icon" name="remember" />
              <label htmlFor="remember" className="check-box-text">Remember me</label>
            </div>
            <a href="/" target="_self" className="forgot-pass">Forgot Password?</a>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.9 }}
            className="log-in-button"
          >
            Log in
          </motion.button>
          <div className="log-in-divider">
            <div className="divider" />
            <div className="continue">or continue with</div>
            <div className="divider" />
          </div>
          <div className="social-buttons">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.9 }}
              className="social-login-button"
            >
              <img className="google-icon" alt="Google icon" src={google_icon} />
              <div className="log-in-alt">Google Account</div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.9 }}
              className="social-login-button"
            >
              <div className="apple-icon">
                <BsGithub />
              </div>
              <div className="log-in-alt">Github Account</div>
            </motion.button>
          </div>
        </form>
        <div className="welcome-back">
          <img className="welcome-back-2" alt="Welcome back" src={welcome} />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;