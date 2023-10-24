import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/emailVerify.css";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { email } from "./utility/Email/email";

function EmailVerify() {
  const send_email = useParams().email;
  const code = useRef();
  const [isVerified, setIsVerified] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const navigate = useNavigate();

  const handleCode = async (e) => {
    e.preventDefault();

    let terminate = false;
    if (inputCode === code.current) {
      const response = await axios
        .patch(`http://localhost:3002/setAuthStatus`, { email: send_email })
        .catch((error) => {
          if (error.response?.status === 500) {
            toast.error("Server Error");
            terminate = true;
          }
        });

      if (terminate) return;

      const data = response.data;

      if (data.acknowledged) {
        toast.success("Account Verified Successfully");
        setTimeout(() => {
          navigate("/");
          window.location.reload(true);
        }, 1000);
      }
      return;
    }

    toast.error("Invalid Verification Code");
  };

  const fetch_status = async () => {
    let terminate = false;
    const response = await axios
      .get(`http://localhost:3002/getAuthStatus/${send_email}`)
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error("Server Error");
          terminate = true;
        }
      });

    if (terminate) return;

    const data = response.data;

    if (data.authenticated === 1) setIsVerified(true);
    else {
      const temp_code = Math.floor(Math.random() * 1000000000) % 100000;
      // console.log(temp_code);

      code.current = temp_code.toString();
      // console.log(code.current)
      email(send_email, code.current);
    }
  };

  return (
    <div className="verify-body">
      {isVerified ? (
        <div className="already-ver">
          Your Account is already verified. Thank you!
        </div>
      ) : (
        <>
          <div className="v-title-wrapper">
            <h1 className="verify-title">Verify You Email</h1>
            <div className="verify-subtitle">
              Please provide the verification code we just sent to
              <span style={{ fontWeight: "bold", color: "#1ab79d" }}>
                {" "}
                &nbsp; {send_email}
              </span>
            </div>
            <div className="verify-subtitle">
              Didn't get a code &nbsp;
              <motion.span
                whileHover={{ textDecoration: "underline" }}
                whileTap={{ color: "#ee4962" }}
                style={{
                  fontWeight: "bold",
                  color: "#1ab79d",
                  cursor: "pointer ",
                }}

                onClick={()=>{fetch_status()}}
              >
                send again
              </motion.span>
            </div>
          </div>

          <form className="verify-form" onSubmit={handleCode}>
            <input
              onChange={(e) => {
                setInputCode(e.target.value);
              }}
              name="code"
              id="code"
              type="text"
              placeholder="Verification Code"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="verify-btn"
            >
              Verify
            </motion.button>
          </form>
        </>
      )}
    </div>
  );
}

export default EmailVerify;
