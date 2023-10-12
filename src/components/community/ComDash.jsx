import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/community/comDash.css";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { BsThreeDotsVertical as Colon } from "react-icons/bs";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { BiCommentDetail as Comment } from "react-icons/bi";
import { compareDates } from "../utility/time";

function ComDash() {
  const currentTag = useParams();
  const [com, setcom] = useState([]);
  const [past, setpast] = useState([]);
  const [ongoing, setongoing] = useState([]);
  const [upcoming, setupcoming] = useState([]);

  const fetch_com = async () => {
    let terminate = false;

    const response = await axios
      .get(`http://localhost:3002/get_communityByTag/${currentTag.tag}`)
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error("Could not load data");
          terminate = true;
        }
      });

    if (terminate) return;

    const data = response.data;
    setcom(data);
    //  console.log(com);

    terminate = false;
    const response2 = await axios
      .get(`http://localhost:3002/getEvents/${currentTag.tag}`)
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error("Could not load data");
          terminate = true;
        }
      });

    if (terminate) return;
    const data2 = response2.data;

    setpast([]);
    setongoing([]);
    setupcoming([]);

    data2.forEach((event) => {
      if (compareDates(new Date(event.date), new Date()) === -1)
        setpast((prev) => [...prev, event]);
      else if (compareDates(new Date(event.date), new Date()) === 0)
        setongoing((prev) => [...prev, event]);
      else if (compareDates(new Date(event.date), new Date()) === 1)
        setupcoming((prev) => [...prev, event]);
    });
  };

  useEffect(() => {
    fetch_com();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="upper-part">
        <div className="title">
          <div className="com-name">{com.name} Dashboard</div>
          <div className="com-desc">{com.description}</div>
        </div>
        <div className="com-logo">
          <img src={com.com_image} alt="com image" className="com-image" />
          <div className="small-stats">
            <div className="small-name">{com.name}</div>
            <div className="member-count">{com.members} members</div>
          </div>
        </div>
      </div>

      <div className="lower-part">
        <div className="past-event">
          <div className="title-2">
            <div className="title-left">Past events</div>
            <div>
              <Colon />
            </div>
          </div>
          <div className="event-list">
            {past.map((event, index) => (
              <EvnetCard event={event} key={index} />
            ))}
          </div>
        </div>

        <div className="past-event">
          <div className="title-2">
            <div className="title-left">Ongoing events</div>
            <div>
              <Colon />
            </div>
          </div>
          <div className="event-list">
            {ongoing.map((event, index) => (
              <EvnetCard event={event} key={index} />
            ))}
          </div>
        </div>

        <div className="past-event">
          <div className="title-2">
            <div className="title-left">Upcoming events</div>
            <div>
              <Colon />
            </div>
          </div>
          <div className="event-list">
            {upcoming.map((event, index) => (
              <EvnetCard event={event} key={index} />
            ))}
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="add-event"
        >
          <Plus />
        </motion.div>
      </div>
    </div>
  );
}

export const EvnetCard = ({ event }) => {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className="event-card">
      <div className="event-card-title">{event.title}</div>
      <div className="event-card-description">{event.description}</div>
      <div className="divider" />
      <div className="comments">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="comment-stat"
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          <div style={{ color: "#B6F09C" }}>
            <Comment />
          </div>
          <div className="cmnt-count">{event.comments.length}</div>
        </motion.div>

        {showComment && (
          <div className="comment-list">
            {event.comments.map((comment, index) => (
              <div className="comment-row" key={index}>
                <div className="comment-name">{comment.name}:</div>
                <div className="comment-body">{comment.body}</div>
              </div>
            ))}
            <motion.div
              whileHover={{ scale: 1.04, backgroundColor: "#1a1d21" }}
              whileTap={{ scale: 0.9 }}
              className="add-comment"
            >
              <Plus />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComDash;
