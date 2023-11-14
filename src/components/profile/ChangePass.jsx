import React, { useEffect, useState } from "react";
import "../../styles/profile/changepass.css";

import { IoMdMailUnread as MailIcon } from "react-icons/io";
import {
  AiOutlineLock as LockIcon,
  AiOutlineEyeInvisible as EyeIconInvisible,
  AiOutlineEye as EyeIcon,
} from "react-icons/ai";

import { signal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";
import { email } from "../utility/Email/email";
import { toast } from "react-toastify";
import axios from "axios";

const verification_code = signal(0);
const showCreatePass = signal(false);

function ChangePass() {
  useEffect(() => {
    showCreatePass.value = false;
  }, []);

  return (
    <motion.div className="change-pass">
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showCreatePass.value ? <CreateNewPass /> : <SendCode />}
      </AnimatePresence>
    </motion.div>
  );
}

export const SendCode = () => {
  const [inputCode, setInputCode] = useState(0);
  const send_email = JSON.parse(
    window.localStorage.getItem("currentUser")
  ).email;

  const handleCodeSend = async () => {
    const temp_code = Math.floor(Math.random() * 10000000000000) % 100000;
    verification_code.value = temp_code;
    email(send_email, temp_code);
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (Number(inputCode) === verification_code.value) {
      showCreatePass.value = true;
      toast.success("Code verified");
    } else {
      toast.error("Provide a valid code");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="verify-body"
    >
      <div className="v-title-wrapper">
        <h1 className="verify-title">Send verification code</h1>
        <div className="verify-subtitle">
          A confirmation email will be sent to your email address
          <span style={{ fontWeight: "bold", color: "#1ab79d" }}>
            {" "}
            &nbsp; {send_email}
          </span>
        </div>
        <div className="verify-subtitle">
          Click to send code &nbsp;
          <motion.span
            whileHover={{ textDecoration: "underline" }}
            whileTap={{ color: "#ee4962" }}
            style={{
              fontWeight: "bold",
              color: "#1ab79d",
              cursor: "pointer ",
            }}
            onClick={() => {
              handleCodeSend();
            }}
          >
            SEND
          </motion.span>
        </div>
      </div>

      <form className="verify-form" onSubmit={handleVerify}>
        <input
          required
          onChange={(e) => {
            setInputCode(e.target.value);
          }}
          name="code"
          id="code"
          type="text"
          placeholder="Verification Code"
        />
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="verify-btn"
        >
          Verify
        </motion.button>
      </form>
    </motion.div>
  );
};

export const CreateNewPass = () => {
  const [inputType, setInputType] = useState("password");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const send_id = JSON.parse(
    window.localStorage.getItem("currentUser")
  ).student_id;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (pass.length < 4) {
      toast.error("Password must be at least 4 characters long");
      return;
    }
    if (pass !== confirmPass) {
      toast.error("Passwords must match");
      return;
    }

    const reqBody = {
      password: pass,
    };

    const response = await axios
      .patch(`http://localhost:3002/updatePassword/${send_id}`, reqBody)
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error(error.response.data);
        }
      });

    const data = response.data;

    if (response.status === 200) {
      toast.success("Password changed successfully");
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    } else if (response.status === 201) {
      toast.error("Password must be different from the previous password");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="create-pass"
    >
      <div className="create-title">
        <div className="create-new-pass">Create New Password</div>
        <div className="create-subtitle">
          Your new password must be different from your previous password
        </div>
      </div>

      <form className="pass-fields" onSubmit={handleCreate}>
        <div className="set-pass">
          <label htmlFor="set-pass" className="passlabel">
            Password
          </label>
          <input
            type={inputType}
            id="set-pass"
            className="set-pass-input"
            placeholder="create new password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <div className="pass-hint">Must be at least 4 characters long</div>
          <div
            className="show-pass"
            onClick={() => {
              setInputType(inputType === "password" ? "text" : "password");
            }}
          >
            {inputType !== "password" ? <EyeIcon /> : <EyeIconInvisible />}
          </div>
        </div>

        <div className="set-pass">
          <label htmlFor="set-pass" className="passlabel">
            Confirm Password
          </label>
          <input
            type={inputType}
            id="set-pass"
            className="set-pass-input"
            placeholder="create new password"
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
          />
          <div className="pass-hint">Passwords must match</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="submit-create-pass"
        >
          Create New Pass
        </motion.button>
      </form>
    </motion.div>
  );
};
export default ChangePass;
