import React, { useState } from "react";
import { addScaleCorrector, motion } from "framer-motion";
import "../../styles/community/createCommunity.css";
import axios from "axios";
import { toast } from "react-toastify";
import { checkAllCaps } from "../utility/time";

function CreateCommunity({ closePopUp }) {
  const [name, setName] = useState();
  const [tag, setTag] = useState();
  const [desc, setDesc] = useState();
  const [privacy, setPrivacy] = useState("open");
  const [characterCount, setCharacterCount] = useState(0);

  const handle_create = async (e) => {
    e.preventDefault();

    const admin = JSON.parse(window.localStorage.getItem("currentUser"));
    const admin_id = admin.student_id;

    if (!checkAllCaps(tag)) {
      toast.error("Tag must be in all caps");
      return;
    }

    const requestBody = {
      name: name,
      tag: tag,
      description: desc,
      privacy: privacy,
      members: 1,
      resource: 0,
      rating: 0,
      admin: admin_id,
      com_image: "/src/assets/default-com.jpg",
      imagePublicId: "",
    };

    let terminate = false;

    const response = await axios
      .post("http://localhost:3002/insertCommunity", requestBody)
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error(error.response.data.err);
          terminate = true;
        }
      });

    if (terminate) return;

    const data = response.data;

    if (!data.acknowledged) {
      toast.error("Could not create community!");
      return;
    }

    toast.success("Successfully Created Community!!");

    const requestBody2 = {
      userId: admin_id,
      tag: tag,
    };

    terminate = false;
    const response2 = await axios
      .patch("http://localhost:3002/addComToUser", requestBody2)
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error(error.response.data.err);
          terminate = true;
        }
      });

    admin.community.push(tag);
    window.localStorage.setItem("currentUser", JSON.stringify(admin));

    if (terminate) return;

    setTimeout(() => {
      closePopUp();
      window.location.reload(true);
    }, 500);
  };

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ ease: "easeIn", duration: 0.3 }}
      exit={{ scale: 0.8, transition: { ease: "easeIn", duration: 0.3 } }}
      className="com-create-container"
    >
      <div className="crt-header">Create a New Community</div>

      <form className="create-com-form" onSubmit={handle_create}>
        <div className="privacy-holder">
          <div className="privacy-header">
            Select a privacy type for your community
          </div>
          <div className="privacy-radio">
            <div>
              <input
                checked={privacy === "private"}
                type="radio"
                id="private"
                className="privacy-radio-button"
                name="privacy"
                value="private"
                onChange={(e) => {
                  setPrivacy(e.target.value);
                }}
              />
              <label htmlFor="private" className="radio-text">
                Private
              </label>
            </div>
            <div>
              <input
                checked={privacy === "open"}
                type="radio"
                id="open"
                className="privacy-radio-button"
                name="privacy"
                value="open"
                onChange={(e) => {
                  setPrivacy(e.target.value);
                }}
              />
              <label htmlFor="open" className="radio-text">
                Open
              </label>
            </div>
          </div>
        </div>

        <div className="create-fields">
          <div className="create-field-2">
            <label htmlFor="name" className="filed-label">
              Name*
            </label>
            <input
              required
              id="name"
              type="text"
              className="name-tag-filed name-tag-only"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="create-field-2">
            <label htmlFor="tag" className="filed-label">
              Tag*
            </label>
            <input
              required
              id="tag"
              type="text"
              placeholder="ALL CAPS and no spaces"
              className="name-tag-filed name-tag-only"
              onChange={(e) => {
                setTag(e.target.value);
              }}
            />
          </div>

          <div className="create-field-2">
            <label htmlFor="desc" className="filed-label">
              <div className="ashol">Description*</div>
              <div className="word-count">{characterCount}/60</div>
            </label>
            <textarea
              spellCheck={true}
              maxLength={60}
              rows={2}
              required
              id="desc"
              type="textarea"
              className="name-tag-filed desc-only"
              onChange={(e) => {
                setDesc(e.target.value);
                setCharacterCount(e.target.value.length);
              }}
            />
          </div>
        </div>

        <div className="create-buttons">
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="create-button"
            onClick={() => {
              closePopUp();
            }}
            type="button"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="create-button"
          >
            Create
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default CreateCommunity;
