import React, { useEffect, useState } from "react";
import "../../styles/profile/myup.css";
import { motion } from "framer-motion";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import {
  HiSortAscending as Ascending,
  HiSortDescending as Descending,
} from "react-icons/hi";
import { getTextFormattedTime } from "../utility/time";
import axios from "axios";
import { toast } from "react-toastify";

function MyUploads() {
  const [academic, setAcademic] = useState([]);
  const [student, setStudent] = useState([]);
  const [misc, setMisc] = useState([]);

  const getUploads = async () => {
    const user = JSON.parse(window.localStorage.getItem("currentUser"));
    const user_id = user.student_id;
    const tags = user.community;

    const response = await axios.get(
      import.meta.env.VITE_CURRENT_PATH +
        `/getMyUploads/${user_id}/${JSON.stringify(tags)}`
    );

    let data = response.data;

    let temp1 = [];
    let temp2 = [];
    let temp3 = [];

    if (data[0] !== null) temp1 = data[0].sort((a, b) => a.date - b.date);
    if (data[1] !== null) temp2 = data[1].sort((a, b) => a.date - b.date);
    if (data[2] !== null) temp3 = data[2].sort((a, b) => a.date - b.date);

    setAcademic(temp1);
    setStudent(temp2);
    setMisc(temp3);
  };

  useEffect(() => {
    getUploads();
  }, []);

  return (
    <div className="myup">
      <div className="search-tab">
        <div className="res-title">My Uploads</div>
        <div className="search-objects">
          <div className="search-input">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <input
              type="search"
              className="search-input-holder"
              placeholder="Search uploads by title"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
              whileTap={{ scale: 0.9 }}
              className="search-community-button"
            >
              Search
            </motion.button>
          </div>

          <div className="sort-by">
            <div className="sort-by-text">Sort by</div>
            <select
              name="sort"
              id="sort"
              className="sort-dropdown"
              onChange={(e) => {
                setSortOption(e.target.value);
              }}
            >
              <option value="bookmarkDate" className="sort-dropdown-item">
                Date added
              </option>
              <option value="title" className="sort-dropdown-item">
                Title
              </option>
            </select>
          </div>

          <div className="show-as">
            <div
              className="show-as-block"
              onClick={() => {
                setSortOrder(1);
              }}
            >
              <Ascending />
            </div>
            <div
              className="show-as-block"
              onClick={() => {
                setSortOrder(-1);
              }}
            >
              <Descending />
            </div>
          </div>
        </div>
      </div>

      <div className="myup-list">
        {academic.map((item) => (
          <UploadItem item={item} />
        ))}
      </div>

      <div className="myup-list">
        {student.map((item) => (
          <UploadItem item={item} />
        ))}
      </div>

      <div className="myup-list">
        {misc.map((item) => (
          <UploadItem item={item} />
        ))}
      </div>
    </div>
  );
}

const UploadItem = ({ item }) => {
  return (
    <div className="uploadRow">
      <div className="upload-item">
        <div className="upload-item-title">{item.name}</div>
        <div className="upload-item-desc">{item.resourceType}</div>
        <div className="upload-item-date">
          {getTextFormattedTime(new Date(item.date))}
        </div>
      </div>

      <div className="buttons">
        <div className="upload-item-button">
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="upload-item-button"
          >
            Download
          </motion.button>
        </div>
        <div className="upload-item-button">
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="upload-item-button"
          >
            Delete
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MyUploads;
