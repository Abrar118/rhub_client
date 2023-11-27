import React, { useState } from "react";
import "./invitation.css";
import { AnimatePresence, motion } from "framer-motion";
import { SlOptionsVertical } from "react-icons/sl";
import { FcInvite } from "react-icons/fc";
import { getFormattedDateWithTime } from "../../utility/time";
import axios from "axios";
import { toast } from "react-toastify";

function Invitation({ invitation, fetchNotifications }) {
  const [unread, setUnread] = useState(invitation.status === "unread");
  const [dropdown, setDropdown] = useState(false);
  const [responded, setResponded] = useState(invitation.responded);
  const title = invitation.title;
  const message = invitation.messageBody;
  const tag = invitation.comTag;
  const date = getFormattedDateWithTime(new Date(invitation.date));
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const updateStatus = async () => {
    const response = await axios
      .patch(
        `http://localhost:3002/updateNotificationStatus/${user.student_id}`,
        invitation
      )
      .catch((err) => {
        if (err.response?.status === 500) {
          toast.error("Server Error");
        }
      });

    if (response.status === 200) {
      toast.success("Status Updated");
      setUnread(false);
      fetchNotifications();
    } else {
      toast.error("Server Error");
    }
  };

  const deleteNotification = async () => {
    const response = await axios
      .patch(
        `http://localhost:3002/deleteNotification/${user.student_id}`,
        invitation
      )
      .catch((err) => {
        if (err.response?.status === 500) {
          toast.error("Server Error");
        }
      });

    if (response.status === 200) {
      toast.success("Notification Deleted");
      fetchNotifications();
    } else {
      toast.error("Server Error");
    }
  };

  const acceptInvitation = async () => {
    const response = await axios
      .patch(
        `http://localhost:3002/acceptInvitation/${user.student_id}`,
        invitation
      )
      .catch((err) => {
        if (err.response?.status === 500) {
          toast.error("Server Error");
        }
      });

    if (response.status === 200) {
      toast.success("Invitation Accepted");
      setResponded(true);
      user.community.push(tag);
      window.localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      toast.error("Server Error");
    }
  };

  return (
    <div className="invitation">
      <div className="inv-details">
        <div className="subtitle">
          Community Invitation{" "}
          {unread && (
            <motion.span
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              className="unread"
            >
              unread
            </motion.span>
          )}
        </div>
        <div className="community-name">{title}</div>
        <div className="description">{message}</div>
        <div className="inv-btns">
          <div className="com-tag">{tag}</div>
          {!responded ? (
            <div className="inv-btns">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  backgroundColor: "#f6c90e",
                  color: "#000",
                }}
                whileTap={{ scale: 0.9 }}
                className="accept-btn"
                onClick={acceptInvitation}
              >
                Accept
              </motion.button>
            </div>
          ) : (
            <div className="responded">Responded</div>
          )}
        </div>

        <div className="noti-date">{date}</div>
      </div>

      <div className="image-holder">
        <SlOptionsVertical
          style={{ cursor: "pointer" }}
          onClick={toggleDropdown}
        />

        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {dropdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "20%", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="dropdown"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.9 }}
                className="dropdown-item"
                onClick={deleteNotification}
              >
                Delete
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.9 }}
                className="dropdown-item"
                onClick={updateStatus}
              >
                Mark as read
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <FcInvite className="type-image" />
      </div>
    </div>
  );
}

export default Invitation;
