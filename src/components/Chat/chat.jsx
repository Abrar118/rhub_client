import React, { useEffect, useState } from "react";
import { BsRobot as Chatbot } from "react-icons/bs";
import {
  AiOutlineDown as DownIcon,
  AiOutlineCaretRight as RightIcon,
  AiFillCaretLeft as LeftIcon,
} from "react-icons/ai";
import { BiSolidSend as SendIcon } from "react-icons/bi";
import { GiHand as HiIcon } from "react-icons/gi";
import { LuExpand as ExpandIcon } from "react-icons/lu";
import { AnimatePresence, motion, scroll } from "framer-motion";
import "./chat.css";
import { signal } from "@preact/signals-react";
import axios from "axios";
import { logoBlack } from "../../App";
import AIChat from "./AIChat";

const popup = signal(false);
const faqs = signal([]);

function Chat() {
  const toggleChat = () => {
    popup.value = !popup.value;
    chatActiveOption.value = 0;
  };

  const getFaqs = async () => {
    const response = await axios
      .get("http://localhost:3002/get_faqs")
      .catch((err) => {
        if (err.response?.status === 500) {
          console.log("No FAQs found");
        }
      });

    const data = await response.data;
    faqs.value = data;
  };

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <motion.div className="chatbot">
      <div className="chatbot-icon" onClick={toggleChat} title="Chat with us">
        {!popup.value ? <Chatbot /> : <DownIcon />}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {popup.value && <ChatPopUp />}
      </AnimatePresence>
    </motion.div>
  );
}

export const chatActiveOption = signal(0);
const selectedFaq = signal({});
const popwidth = signal("20vw");
const popheight = signal("70vh");

export const ChatPopUp = () => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, width: 0 }}
      animate={{ opacity: 1, height: popheight, width: popwidth }}
      exit={{ opacity: 0, height: 0, width: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="chatbot-popup"
    >
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {chatActiveOption.value === 0 && <InitialContent />}
        {chatActiveOption.value === 1 && <FAQDetails faq={selectedFaq.value} />}
        {chatActiveOption.value === 2 && <AIChat />}
      </AnimatePresence>
    </motion.div>
  );
};

export const InitialContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: "0%" }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="initial-content"
    >
      <div className="hello">
        Hi <HiIcon style={{ color: "#fffb00" }} /> <br /> How can we help?{" "}
      </div>

      <div className="helpoptions">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          className="send-us"
        >
          <div className="help-title">
            Send us a message
            <div>
              <SendIcon />{" "}
            </div>
          </div>
          <div className="help-sub">We usually reach out within ours</div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          className="send-us"
          onClick={() => {
            chatActiveOption.value = 2;
          }}
        >
          <div className="help-title">
            Chat with our AI
            <div>
              <SendIcon />{" "}
            </div>
          </div>
          <div className="help-sub">Get information on our project</div>
        </motion.div>
      </div>

      <div className="faq">
        <div className="faq-title">Frequently asked questions</div>
        <div className="faq-list">
          {faqs.value.map((faq, index) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              className="faq-rows"
              key={index}
              onClick={() => {
                selectedFaq.value = faq;
                chatActiveOption.value = 1;
              }}
            >
              <div className="faq-question">{faq.question}</div>
              <div className="go-icon">
                <RightIcon />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const FAQDetails = ({ faq }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: "0%" }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="faq-details"
    >
      <div className="expand-bar">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            chatActiveOption.value = 0;
          }}
          id="back-icon"
        >
          <LeftIcon />
        </motion.div>

        <div
          id="expand-icon"
          onClick={() => {
            //expand korte hobe
          }}
        >
          <ExpandIcon />
        </div>
      </div>

      <div className="question-part">
        <div className="faq-question">{faq.question}</div>
        <div className="faq-sub">{faq.subtitle}</div>
      </div>

      <div className="written-by">
        <img className="logo" src={logoBlack} />
        <div className="info">
          <div className="name">{faq.written_by}</div>
          <div className="updated">{faq.updated_on}</div>
        </div>
      </div>

      <div className="faq-answer">{faq.description}</div>
    </motion.div>
  );
};

export default Chat;
