import React, { useState } from "react";
import { addScaleCorrector, motion } from "framer-motion";
import "../../styles/community/addcat.css";
import axios from "axios";
import { toast } from "react-toastify";
import { checkAllCaps, getCurrentTime } from "../utility/time";
import { useParams } from "react-router-dom";

function AddCategory({closePopUp}) {
  const [name, setName] = useState();
  const [keywords, setkeywords] = useState([]);
  const [desc, setDesc] = useState();
  const [privacy, setPrivacy] = useState("Open");
  const currentTag = useParams().tag;

  const handle_create = async (e) => {
    e.preventDefault();

    const current = JSON.parse(window.localStorage.getItem("currentUser"));
    const current_id = current.student_id;

    const requestBody = {
      access: privacy,
      category_name: name,
      date: getCurrentTime(),
      description: desc,
      keywords: keywords,
      community: currentTag,
      academic: [],
      student: [],
      misc: []
    };

    let terminate = false;

    const response = await axios
      .post("http://localhost:3002/createCategory", requestBody)
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error(error.response.data);
          terminate = true;
        }
      });

    if (terminate) return;

    const data = response.data;

    if (!data.acknowledged) {
      toast.error("Could not create category!");
      return;
    }

    toast.success("Successfully Created Category!!");
    
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
      className="cat-create-container"
    >
      <div className="crt-header">Create a New Category</div>

      <form className="create-com-form" onSubmit={handle_create}>
        <div className="privacy-holder">
          <div className="privacy-header">
            Select a privacy type for the category
          </div>
          <div className="privacy-radio">
            <div>
              <input
                checked={privacy === "Restricted"}
                type="radio"
                id="private"
                className="privacy-radio-button"
                name="privacy"
                value="Restricted"
                onChange={(e) => {
                  setPrivacy(e.target.value);
                }}
              />
              <label htmlFor="private" className="radio-text">
                Restricted
              </label>
            </div>
            <div>
              <input
                checked={privacy === "Open"}
                type="radio"
                id="open"
                className="privacy-radio-button"
                name="privacy"
                value="Open"
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
            <label htmlFor="key" className="filed-label">
              Keywords*
            </label>
            <input
              required
              placeholder="Space separated words in all caps"
              id="key"
              type="text"
              className="name-tag-filed name-tag-only"
              onChange={(e) => {
                setkeywords(e.target.value.split(" "));
              }}
            />
          </div>

          <div className="create-field-2">
            <label htmlFor="desc" className="filed-label">
              Description*
            </label>
            <textarea
              spellCheck
              required
              id="desc"
              type="textarea"
              className="name-tag-filed desc-only"
              onChange={(e) => {
                setDesc(e.target.value);
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

export default AddCategory;
