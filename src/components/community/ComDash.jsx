import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/community/comDash.css";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import { BsThreeDotsVertical as Colon } from "react-icons/bs";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { BiCommentDetail as Comment } from "react-icons/bi";
import {
  checkAllCaps,
  compareDates,
  getTextFormattedTime,
} from "../utility/time";

import PortalPopup from "../PortalPopup";
import { convertBase64 } from "../utility/fileLoad";

function ComDash() {
  const currentTag = useParams();
  const [com, setcom] = useState([]);
  const [past, setpast] = useState([]);
  const [ongoing, setongoing] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [addEvent, setAddEvent] = useState(false);
  const comImage = useRef(null);

  const toggleAddEvent = () => {
    setAddEvent(!addEvent);
  };

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

  const handleUpload = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage.size > 2097152) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const base64Image = await convertBase64(selectedImage);

    let terminate = false;
    const response = await axios
      .post("http://localhost:3002/uploadComImage", {
        image: base64Image,
        tag: com.tag,
      })
      .catch((error) => {
        if (error.response?.status === 413) {
          toast.error(error.response.statusText);
        } else if (error.response?.status === 500) {
          toast.error("Could not upload avatar");
        }

        terminate = true;
      });

    if (terminate) return;

    const data = response.data;
    toast.success("Image updated successfully.");

    //  console.log(data);
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
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.5 }}
            src={com.com_image}
            alt="com image"
            className="com-image"
            onClick={() => {
              comImage.current.click();
            }}
          />
          <input
            onChange={handleUpload}
            ref={comImage}
            type="file"
            accept="image/*"
            name="avatarUpload"
            id="avatar-up"
            style={{ display: "none" }}
          />
          <div className="small-stats">
            <div className="small-name">{com.name}</div>
            <div className="member-count">{com.members} members</div>
          </div>
        </div>
      </div>

      <div className="lower-part">
        <EventList eventArray={past} listTitle={"Past"} />
        <EventList eventArray={ongoing} listTitle={"Ongoing"} />
        <EventList eventArray={upcoming} listTitle={"Upcoming"} />

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="add-event"
          onClick={toggleAddEvent}
        >
          <Plus />
        </motion.div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {addEvent && (
          <PortalPopup
            overlayColor="rgba(0,0,0, 0.5)"
            placement="Centered"
            onOutsideClick={toggleAddEvent}
          >
            <AddEventPopUp />
          </PortalPopup>
        )}
      </AnimatePresence>
    </div>
  );
}

export const EventList = ({ eventArray, listTitle }) => {
  return (
    <div className="past-event">
      <div className="title-2">
        <div className="title-left">{listTitle} events</div>
        <motion.div
          whileHover={{
            scale: 1.05,
            cursor: "pointer",
            backgroundColor: "#9b9c9e50",
            borderRadius: "50%",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Colon />
        </motion.div>
      </div>
      <div className="event-list">
        {eventArray.map((event, index) => (
          <EvnetCard event={event} key={index} />
        ))}
      </div>
    </div>
  );
};

export const EvnetCard = ({ event }) => {
  const [showComment, setShowComment] = useState(false);
  const [addComment, setAddComment] = useState(false);

  const toggleAddComment = () => {
    setAddComment(!addComment);
  };

  return (
    <div className="event-card">
      <div className="event-card-title">{event.title}</div>
      <div className="event-card-description">{event.description}</div>
      <div className="event-card-description">
        {getTextFormattedTime(new Date(event.date))}
      </div>
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
                <div className="comment-name">{comment.name}</div>
                <div className="comment-body">{comment.body}</div>
              </div>
            ))}
            <motion.div
              whileHover={{ scale: 1.04, backgroundColor: "#1a1d21" }}
              whileTap={{ scale: 0.9 }}
              className="add-comment"
              onClick={toggleAddComment}
            >
              <Plus />
            </motion.div>
            {
              <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
              >
                {addComment && (
                  <PortalPopup
                    overlayColor="rgba(0,0,0, 0.5)"
                    placement="Centered"
                    onOutsideClick={toggleAddComment}
                  >
                    <AddCommentPopUp tag={event.tag} date={event.date} />
                  </PortalPopup>
                )}
              </AnimatePresence>
            }
          </div>
        )}
      </div>
    </div>
  );
};

const AddCommentPopUp = ({ tag, date }) => {
  const [comment, setComment] = useState("");
  const user = JSON.parse(window.localStorage.getItem("currentUser")).name;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      body: comment,
      name: user,
    };

    const response = await axios
      .patch(
        `http://localhost:3002/addComment/${JSON.stringify(tag)}/${date}`,
        requestBody
      )
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error("Could not add comment");
        }
      });

    const data = response.data;

    if (data.acknowledged) {
      toast.success("Comment added successfully");
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ ease: "easeIn", duration: 0.3 }}
      exit={{ scale: 0.8, transition: { ease: "easeIn", duration: 0.3 } }}
      className="addEvent-wrapper"
    >
      <div className="title">Add a comment</div>
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="field-container">
          <label htmlFor="comment" className="field-label">
            Comment
          </label>
          <textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
            required
            type="text"
            className="main-field"
            style={{
              backgroundColor: "transparent",
              border: "solid 1px #0d0f10",
            }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="addEvent-button"
        >
          Add comment
        </motion.button>
      </form>
    </motion.div>
  );
};

export const AddEventPopUp = () => {
  const [tags, setTags] = useState([]);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [date, setdate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduler = JSON.parse(
      window.localStorage.getItem("currentUser")
    ).student_id;

    let terminate = false;

    for (let i = 0; i < tags.length; ++i) {
      if (!checkAllCaps(tags[i])) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      toast.error("Tags should be all caps");
      return;
    }

    const requestBody = {
      tag: tags,
      title: title,
      description: desc,
      date: date + "T00:00:00.0Z",
      scheduler: scheduler,
      comments: [],
    };

    // console.log(requestBody);

    const response = await axios.post(
      "http://localhost:3002/addEvent",
      requestBody
    );
    toast.success("Event created successfully");
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  };

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ ease: "easeIn", duration: 0.3 }}
      exit={{ scale: 0.8, transition: { ease: "easeIn", duration: 0.3 } }}
      className="addEvent-wrapper"
    >
      <div className="title">Create an event</div>
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="field-container">
          <label htmlFor="tag" className="field-label">
            Tag
          </label>
          <input
            onChange={(e) => {
              setTags(e.target.value.split(" "));
            }}
            placeholder="Space separated tags"
            id="tag"
            required
            type="text"
            className="main-field"
            style={{
              backgroundColor: "transparent",
              border: "solid 1px #0d0f10",
            }}
          />
        </div>

        <div className="field-container">
          <label htmlFor="title" className="field-label">
            Title
          </label>
          <input
            onChange={(e) => {
              settitle(e.target.value);
            }}
            required
            type="text"
            className="main-field"
            style={{
              backgroundColor: "transparent",
              border: "solid 1px #0d0f10",
            }}
          />
        </div>

        <div className="field-container">
          <label htmlFor="desc" className="field-label">
            Description
          </label>
          <input
            onChange={(e) => {
              setdesc(e.target.value);
            }}
            required
            type="text"
            className="main-field"
            style={{
              backgroundColor: "transparent",
              border: "solid 1px #0d0f10",
            }}
          />
        </div>

        <div className="field-container">
          <label htmlFor="date" className="field-label">
            Date
          </label>
          <input
            onChange={(e) => {
              setdate(e.target.value);
            }}
            required
            type="date"
            className="main-field"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="addEvent-button"
        >
          Create event
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ComDash;
