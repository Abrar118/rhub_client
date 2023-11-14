import React, { useEffect, useState } from "react";
import "./aichat.css";
import { ScaleLoader, SyncLoader } from "react-spinners";
import { motion } from "framer-motion";

import { BiSolidSend as SendIcon } from "react-icons/bi";
import { AiFillCaretLeft as LeftIcon } from "react-icons/ai";
import { GiRobotHelmet as BotIcon } from "react-icons/gi";
import { chatActiveOption } from "./chat";
import { signal } from "@preact/signals-react";
import axios from "axios";

const reply = signal(false);

function AIChat() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");

  const loadModel = async () => {
    setLoading(true);
    const response = await axios
      .get("http://localhost:3002/loadModel")
      .catch((err) => {
        if (err.response?.status === 500) {
          console.log("No FAQs found");
        }
      });
    setLoading(false);
  };

  const getReply = async (e) => {
    reply.value = false;
    setMessages((prev) => [
      ...prev,
      { text: <SyncLoader color="#36d7b7" size={8} />, sender: "bot" },
    ]);
    const response = await axios
      .post("http://localhost:3002/getAnswer", {
        question: typedMessage,
      })
      .catch((err) => {
        if (err.response?.status === 500) {
          console.log("No answer found");
        }
      });

    setMessages((prev) => [...prev.slice(0, prev.length - 1)]);
    const data =
      response.data.length > 0 ? response.data : "Please Rephrase your question";
    setMessages((prev) => [...prev, { text: data, sender: "bot" }]);
    reply.value = true;
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: "0%" }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="aichat"
    >
      <motion.div className="upper-panel">
        <div
          className="back-icon"
          onClick={() => {
            chatActiveOption.value = 0;
          }}
        >
          <LeftIcon />
        </div>
        <div className="bot-icon">
          <BotIcon />
          RHUB Support
        </div>
      </motion.div>

      <div className="chat-window">
        {loading ? (
          <>
            <ScaleLoader
              color="#36d7b7"
              height={40}
              loading
              margin={2}
              radius={5}
            />
            <div className="loading-model">Model is loading ...</div>
          </>
        ) : (
          <div className="bot-chats">
            {messages.map((message, index) => (
              <ChatMessage message={message} key={index} />
            ))}
          </div>
        )}
      </div>

      <form className="type-message">
        <textarea
          required
          type="text"
          placeholder="Type a message..."
          className="message-holder"
          onChange={(e) => {
            setTypedMessage(e.target.value);
          }}
        />
        <motion.button
          type="reset"
          whileHover={{ scale: 1.3, transform: "rotate(-40deg)" }}
          whileTap={{ scale: 0.1 }}
          className="send-icon"
          onClick={() => {
            if (typedMessage !== "") {
              setMessages((prev) => [
                ...prev,
                { text: typedMessage, sender: "user" },
              ]);
              setTypedMessage("");
              getReply();
            }
          }}
        >
          <SendIcon />
        </motion.button>
      </form>
    </motion.div>
  );
}

export const ChatMessage = ({ message }) => {
  const bot = message.sender === "bot";
  return (
    <div
      className="message-container"
      style={{ justifyContent: bot ? "flex-start" : "flex-end" }}
    >
      {bot && (
        <div className="bot-icon">
          <BotIcon />
        </div>
      )}
      <div className={`message ${bot ? "bot" : "user"}`}>{message.text}</div>
    </div>
  );
};

export default AIChat;
