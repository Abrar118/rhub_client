import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/community/comDash.css";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import { BsThreeDotsVertical as Colon } from "react-icons/bs";
import {
  AiOutlinePlus as Plus,
  AiFillDelete as DeleteIcon,
  AiFillStar as StarIcon,
} from "react-icons/ai";
import { BiCommentDetail as Comment } from "react-icons/bi";
import {
  checkAllCaps,
  compareDates,
  getTextFormattedTime,
} from "../utility/time";
import { ScaleLoader } from "react-spinners";
import PortalPopup from "../PortalPopup";
import { convertBase64 } from "../utility/fileLoad";
import { signal } from "@preact/signals-react";

const com = signal({});

function ComDash() {
  const currentTag = useParams();
  const [past, setpast] = useState([]);
  const [ongoing, setongoing] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [addEvent, setAddEvent] = useState(false);
  const [giveRating, setGiveRating] = useState(false);
  const [loading, setLoading] = useState(false);

  const comImage = useRef(null);

  const toggleAddEvent = () => {
    setAddEvent(!addEvent);
  };

  const compare = (a, b) => {
    return compareDates(new Date(a.date), new Date(b.date)) * -1;
  };

  const fetch_com = async () => {
    let terminate = false;

    const response = await axios
      .get(
        import.meta.env.VITE_CURRENT_PATH +
          `/get_communityByTag/${currentTag.tag}`
      )
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error("Could not load data");
          terminate = true;
        }
      });

    if (terminate) return;

    const data = response.data;
    com.value = data;
    //  console.log(com);

    terminate = false;
    const response2 = await axios
      .get(import.meta.env.VITE_CURRENT_PATH + `/getEvents/${currentTag.tag}`)
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error("Could not load data");
          terminate = true;
        }
      });

    if (terminate) return;
    const data2 = response2.data;

    data2.sort(compare);

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
    setLoading(true);
    const response = await axios
      .post(import.meta.env.VITE_CURRENT_PATH + "/uploadComImage", {
        image: base64Image,
        tag: com.value.tag,
        publicId: com.value.imagePublicId,
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
    com.value.com_image = data.secure_url;
    com.value.imagePublicId = data.public_id;
    setLoading(false);
    toast.success("Image updated successfully.");

    //  console.log(data);
  };

  useEffect(() => {
    fetch_com();
  }, []);

  return (
    <div className="dashboard-wrapper">
      {loading && (
        <PortalPopup overlayColor="rgba(0,0,0, 0.5)" placement="Centered">
          <ScaleLoader color="#36d7b7" height={35} width={5} />
        </PortalPopup>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.3 }}
        className="upper-part"
      >
        <div className="title">
          <div className="com-name">{com.value.name} Dashboard </div>
          <div className="com-desc">{com.value.description}</div>
          <div className="com-desc">
            <b>Admin:</b> {com.value.admin}
          </div>
        </div>
        <div className="com-logo">
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.5 }}
            src={com.value.com_image}
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
            <div className="small-name">{com.value.name}</div>
            <div className="member-count">{com.value.members} members</div>
            <motion.div
              style={{ color: "#000000" }}
              whileHover={{ scale: 1.05, color: "#ee4962" }}
              whileTap={{ scale: 0.9 }}
              className="rate-us"
              onClick={() => {
                setGiveRating(!giveRating);
              }}
            >
              rate community
            </motion.div>

            <AnimatePresence
              initial={false}
              mode="wait"
              onExitComplete={() => null}
            >
              {giveRating && (
                <PortalPopup
                  overlayColor="rgba(0,0,0, 0.5)"
                  placement="Centered"
                  onOutsideClick={() => {
                    setGiveRating(false);
                  }}
                >
                  <GiveRating
                    com={com.value}
                    colsePopUp={() => {
                      setGiveRating(!giveRating);
                    }}
                  />
                </PortalPopup>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.3 }}
        className="lower-part"
      >
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
      </motion.div>

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
            borderRadius: "50%",
          }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "#000000" }}
        >
          <Colon />
        </motion.div>
      </div>
      <div className="event-list">
        {eventArray.length === 0 ? (
          <div className="empty-list">No events</div>
        ) : (
          eventArray.map((event, index) => (
            <EvnetCard event={event} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export const EvnetCard = ({ event }) => {
  const [showComment, setShowComment] = useState(false);
  const [showDelete, setShowDelete] = useState(-1);
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
          <div style={{ color: "#000000", fontSize: "1.1rem" }}>
            <Comment />
          </div>
          <div className="cmnt-count">{event.comments.length}</div>
        </motion.div>

        {showComment && (
          <div className="comment-list">
            {event.comments.map((comment, index) => (
              <div className="comment-row" key={index} onMouseEnter={() => {}}>
                <div className="comment-name">{comment.name}</div>
                <div className="comment-body">{comment.body}</div>
                {showDelete === index && (
                  <motion.div
                    whileHover={{ scale: 1.3, color: "#F6C90E" }}
                    whileTap={{ scale: 0.9 }}
                    className="delete-comment"
                  >
                    <DeleteIcon />
                  </motion.div>
                )}
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
        import.meta.env.VITE_CURRENT_PATH +
          `/addComment/${JSON.stringify(tag)}/${date}`,
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
      import.meta.env.VITE_CURRENT_PATH + "/addEvent",
      requestBody
    );
    toast.success("Event created successfully");
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

export const GiveRating = ({ com, colsePopUp }) => {
  const [rating, setRating] = useState(0);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const user = JSON.parse(window.localStorage.getItem("currentUser"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: user.name,
      student_id: user.student_id,
      rating: rating,
      date: new Date().toISOString(),
      feedback: comment,
    };

    const response = await axios
      .patch(
        import.meta.env.VITE_CURRENT_PATH + `/rateCom/${com.tag}`,
        requestBody
      )
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error("Could not rate community");
        }
      });

    const data = response.data;

    if (response.status === 200) {
      toast.success("Community rated successfully");
    } else if (response.status === 201) {
      toast.warning("You have already rated this community");
    }

    setTimeout(() => {
      colsePopUp();
    }, 500);
  };

  return (
    <motion.div
      initial={{ width: "15vw" }}
      animate={{ width: "30vw" }}
      exit={{ width: "15vw" }}
      transition={{ ease: "easeIn", duration: 0.2 }}
      className="rating-holder"
    >
      <div className="title">Your opinion matters to us</div>
      <div className="rating-stars">
        {[...Array(5)].map((star, index) => {
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={index + 1}
                style={{ display: "none" }}
              />
              <StarIcon
                style={{ cursor: "pointer" }}
                color={
                  index + 1 <= (hoverPosition || rating) ? "#f6c90e" : "#ffffff"
                }
                onClick={() => {
                  setRating(index + 1);
                  console.log(rating);
                }}
                onMouseEnter={() => {
                  setHoverPosition(index + 1);
                }}
                onMouseLeave={() => {
                  setHoverPosition(0);
                }}
              />
            </label>
          );
        })}
      </div>

      <div className="rating-buttons">
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          className="show-comment"
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          Give a feedback
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          className="show-comment"
          onClick={handleSubmit}
        >
          Submit
        </motion.button>
      </div>

      {showComment && (
        <motion.textarea
          initial={{ opacity: 0, width: 0, height: 0 }}
          animate={{ opacity: 1, width: "90%", height: "100%" }}
          exit={{ opacity: 0, width: 0, height: 0 }}
          transition={{ ease: "easeIn", duration: 0.3 }}
          className="comment-field"
          placeholder="Write your feedback here"
          name="feedback"
          id="feedback"
          cols="30"
          rows="10"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      )}
    </motion.div>
  );
};

export default ComDash;
