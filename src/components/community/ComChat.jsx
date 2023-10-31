import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import PortalPopup from "../PortalPopup";
import "../../styles/community/comChat.css";

import { getFormattedDateWithTime } from "../utility/time";

import { BiCopy as CopyIcon } from "react-icons/bi";
import { AiFillAudio as AuidoIcon } from "react-icons/ai";
import { ImAttachment as AttachmentIcon } from "react-icons/im";
import {
  BsSend as SendIcon,
  BsFillReplyFill as ReplyIcon,
  BsGlobe as PublicIcon,
} from "react-icons/bs";

function ComChat() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [manageMembers, setManageMembers] = useState(false);

  const toggleManageMembers = () => {
    setManageMembers(!manageMembers);
  };

  return (
    <div className="com-chat">
      <div className="chat-window">
        <div className="title">CSE Department Chatroom</div>
        <div className="chat-holder">
          <ChatRow user={user} />
          <ChatRow user={user} />
          <ChatRow user={user} />
          <ChatRow user={user} />
          <ChatRow user={user} />
        </div>
        <div className="message-field">
          <motion.div
            whileHover={{ scale: 1.1, cursor: "pointer", color: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="audio-icon"
            title="Attach audio file"
          >
            <AuidoIcon />
          </motion.div>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="What do you want to say today"
            className="message-input"
          />
          <motion.div
            whileHover={{ scale: 1.1, cursor: "pointer", color: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="attach-icon"
            title="Attach file"
          >
            <AttachmentIcon />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, cursor: "pointer", color: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="send-icon"
          >
            <SendIcon />
          </motion.div>
        </div>
      </div>
      <div className="members">
        <div className="onoff-list">
          <div className="online">
            <div className="title">Currently Online</div>
            <OnlineOffline user={user} />
            <OnlineOffline user={user} />
            <OnlineOffline user={user} />
          </div>
          <div className="divider" />
          <div className="offline">
            <div className="title">Offline</div>
            <OnlineOffline user={user} />
            <OnlineOffline user={user} />
            <OnlineOffline user={user} />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          className="member-mng"
          onClick={toggleManageMembers}
        >
          Manage Members
        </motion.button>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {manageMembers && (
          <PortalPopup
            overlayColor="rgba(0,0,0, 0.5)"
            placement="Centered"
            onOutsideClick={toggleManageMembers}
          >
            <ManageMembers />
          </PortalPopup>
        )}
      </AnimatePresence>
    </div>
  );
}

export const ChatRow = ({ user }) => {
  return (
    <div className="chat-row">
      <img src={user.avatar} alt="avatar" className="sender-avatar" />
      <div className="message-body">
        <div className="name-date">
          <div className="actual-name-date">
            <div className="name">{user.name}</div>
            <div className="date">
              {getFormattedDateWithTime(new Date("2023-10-30T15:14:44.195Z"))}
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.04, cursor: "pointer", color: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="copy-icon"
          >
            <CopyIcon />
          </motion.div>
        </div>
        <div className="main-text">
          <div className="main-actual-text">
            This is me testing if this css thing actually works or not. This is
            me testing if this css thing actually works or not. This is me
            testing if this css thing actually works or not. This is me testing
            if this css thing actually works or not. This is me testing if this
            css thing actually works or not. This is me testing if this css
            thing actually works or not. This is me testing if this css thing
            actually works or not. This is me testing if this css thing actually
            works or not.
          </div>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="reply-icon"
          >
            <ReplyIcon /> Reply
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export const OnlineOffline = ({ user }) => {
  return (
    <div className="online-offline">
      <div className="image-name">
        <img src={user.avatar} alt="avatar" className="online-image" />
        <div className="online-name">{user.name}</div>
      </div>
    </div>
  );
};

export const ManageMembers = () => {
  const user = JSON.parse(window.localStorage.getItem("currentUser"));

  const RequestRow = ({ user }) => {
    return (
      <div className="request-row">
        <div className="image-name">
          <img src={user.avatar} alt="avatar" className="image" />
          <div className="name">{user.name}</div>
        </div>

        <div className="buttons">
          <motion.button
            whileHover={{
              scale: 1.04,
              backgroundColor: "#f6c90e",
              color: "#000000",
            }}
            whileTap={{ scale: 0.9 }}
            className="confirm"
            style={{ color: "#b6f09c" }}
          >
            Confirm
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.04,
              backgroundColor: "#ee4962",
              color: "#ffffff",
            }}
            whileTap={{ scale: 0.9 }}
            className="confirm"
            style={{ color: "#ee4962" }}
          >
            Decline
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ ease: "easeIn", duration: 0.3 }}
      exit={{ scale: 0.5, transition: { ease: "easeIn", duration: 0.2 } }}
      className="manage-members"
    >
      <div className="title-wrapper">
        <div className="title">Manage members of your community</div>
        <div className="subtitle">
          Review requests to join your community and invite new members
        </div>
      </div>

      <div className="invitation-send">
        <div className="public-icon">
          <PublicIcon />
        </div>
        <input
          type="text"
          className="invitation-field"
          placeholder="Send invitation by student ID"
        />
        <motion.button
          whileHover={{
            scale: 1.04,
            backgroundColor: "#ee4962",
            color: "#ffffff",
          }}
          whileTap={{ scale: 0.9 }}
          className="invitation-button"
        >
          Invite
        </motion.button>
      </div>

      <div className="request-list">
        <RequestRow user={user} />
        <RequestRow user={user} />
        <RequestRow user={user} />
        <RequestRow user={user} />
        <RequestRow user={user} />
        <RequestRow user={user} />
        <RequestRow user={user} />
      </div>
    </motion.div>
  );
};

export default ComChat;
