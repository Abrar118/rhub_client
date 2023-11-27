import React, { useState, useEffect } from "react";
import "../../styles/profile/notification.css";
import { motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";
import { CiFilter } from "react-icons/ci";
import Invitation from "./NotificationCards/Invitation";
import axios from "axios";
import { toast } from "react-toastify";
import PortalPopup from "../PortalPopup";
import { io } from "socket.io-client";

const socket = io("http://localhost:3002");

function ProfileNotification() {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const fetchNotifications = async () => {
    setLoading(true);
    const response = await axios
      .get(`http://localhost:3002/getNotifications/${user.student_id}`)
      .catch((err) => {
        if (err.response?.status === 500) {
          toast.error("Server Error");
        }
      });

    const data = response.data;
    setNotifications(data);

    const unreadCount = data.filter((noti) => noti.status === "unread").length;
    setUnread(unreadCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notification">
      <div className="upper-part">
        <div className="noti-count">
          <div className="count-notif">
            You have{" "}
            <span style={{ color: "rgb(26, 183, 157)" }}>{unread} new</span>{" "}
            notification(s){" "}
          </div>
          <div className="notif-title">Notifications</div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          className="filters"
        >
          <CiFilter />
          Filter
        </motion.button>
      </div>

      <div className="notification-list">
        {loading ? (
          <PortalPopup overlayColor="rgba(0,0,0, 0.5)" placement="Centered">
            <ScaleLoader color="#36d7b7" height={35} width={5} />
          </PortalPopup>
        ) : (
          notifications.map((noti, index) => (
            <Invitation
              key={index}
              invitation={noti}
              fetchNotifications={fetchNotifications}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProfileNotification;
