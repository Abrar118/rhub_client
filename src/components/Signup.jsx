import React, { useState } from "react";
import "../styles/signup.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { getCurrentTime } from "./utility/time";

function Signup({ closePopUp }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [studentId, setStudentId] = useState();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password != confirmPass) {
      toast.error("Passwords do not match!");
      return;
    }

    const requestBody = {
      name: firstName + " " + lastName,
      password: password,
      student_id: studentId * 1,
      email: email,
      join_date: getCurrentTime(),
      community: [],
      authenticated: 0,
      avatar: "/src/assets/default.png",
    };

    let terminate = false;
    const response = await axios
      .post("http://localhost:3002/insertUser", requestBody)
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error(error.response.data.err);
          terminate = true;
        }
      });

    if (terminate) return;
    const data = response.data;

    // console.log(data.insertedId);

    if (!data.acknowledged) {
      toast.error("Could not create user!");
      return;
    }

    toast.success("Account created successfully!");
    setTimeout(() => {
      closePopUp();
      navigate(`/verify/${email}/auth`);
    }, 1000);
  };

  return (
    <div className="register">
      <div className="secondary-wrapper">
        <div className="sign-up-form">
          <form className="sign-up-fields" onSubmit={handleSignUp}>
            <div className="div-2">
              <div className="div-3">
                <label htmlFor="first-name" className="text-wrapper100">
                  First name
                </label>
                <input
                  required
                  type="text"
                  name="first-name"
                  className="div-4"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="div-3">
                <label htmlFor="last-name" className="text-wrapper100">
                  Last name
                </label>
                <input
                  required
                  type="text"
                  name="last-name"
                  className="div-4"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="div-2">
              <div className="div-3">
                <label htmlFor="password" className="text-wrapper100">
                  Password
                </label>
                <input
                  required
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="div-4"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="signup-showpass" onClick={toggleShowPass}>
                  {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>
              <div className="div-3">
                <label htmlFor="check-password" className="text-wrapper100">
                  Repeat password
                </label>
                <input
                  required
                  type={showPass ? "text" : "password"}
                  name="check-password"
                  className="div-4"
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="div-2">
              <div className="div-3">
                <label htmlFor="studentId" className="text-wrapper100">
                  Student ID
                </label>
                <input
                  required
                  type="text"
                  name="studentId"
                  className="div-4"
                  onChange={(e) => {
                    setStudentId(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="div-2">
              <div className="div-3">
                <label htmlFor="email" className="text-wrapper100">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  className="div-4"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="sign-up-checkbox">
              <input
                required
                type="checkbox"
                className="checkbox-sign"
                name="remember"
              />
              <label htmlFor="remember">
                I agree with the{" "}
                <Link style={{ color: "#86c232" }}>Terms and conditions</Link>
              </label>
            </div>
            <motion.input
              type="submit"
              whileHover={{
                scale: 1.04,
                backgroundColor: "#ee4962",
                color: "#FFFFFF",
              }}
              whileTap={{ scale: 0.9 }}
              className="create-your-acnt"
              value="Create Your Account"
            />
          </form>
        </div>
        <div className="overlap-group">
          <div className="sing-up-today">
            <p className="sign-up-text">
              Fill out the necessary fields to create an account right away!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
