import "../../styles/profile/bookmark.css";

import React, { useEffect, useState } from "react";
import "../../styles/community/comRes.css";
import { motion } from "framer-motion";

import {
  AiOutlinePlus as Plus,
  AiOutlineSearch as SearchIcon,
  AiTwotoneDelete as DeleteIcon,
} from "react-icons/ai";

import {
  HiSortAscending as Ascending,
  HiSortDescending as Descending,
} from "react-icons/hi";

import { BsFillBookmarkCheckFill as BookmarkIcon } from "react-icons/bs";
import { IoOptionsOutline as Options } from "react-icons/io5";

import axios from "axios";
import { toast } from "react-toastify";
import { getTextFormattedTime } from "../utility/time";
import { useNavigate, useParams } from "react-router-dom";

function Bookmark() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("bookmarkDate");
  const [sortOrder, setSortOrder] = useState(-1);
  const user_id = JSON.parse(
    window.localStorage.getItem("currentUser")
  ).student_id;
  const [bookmarkList, setBookmarkList] = useState([]);

  const getBookmarks = async () => {
    let API_URL = `http://localhost:3002/getBookmarks/${user_id}/${sortOption}/${sortOrder}`;
    if (searchQuery.length > 0) API_URL += `?title=${searchQuery}`;

    const res = await axios.get(API_URL).catch((err) => {
      if (err.response?.status === 500) {
        toast.error("Internal server error");
      }
    });

    setBookmarkList(res.data);
  };

  useEffect(() => {
    getBookmarks();
  }, [sortOption, sortOrder]);

  return (
    <div className="bookmark-container">
      <div className="search-tab">
        <div className="res-title">My Bookmarks</div>
        <div className="search-objects">
          <div className="search-input">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <input
              type="search"
              className="search-input-holder"
              placeholder="Search bookmarks by title"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
              whileTap={{ scale: 0.9 }}
              className="search-community-button"
              onClick={getBookmarks}
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

      <div className="bookmark-list">
        {bookmarkList.map((bookmark, index) => (
          <BookmarkRow key={index} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}

export const BookmarkRow = ({ bookmark }) => {
  const navigate = useNavigate();
  const user_id = JSON.parse(
    window.localStorage.getItem("currentUser")
  ).student_id;
  const currentTag = bookmark.comTag;

  const handleBookmarkClick = async () => {
    window.localStorage.setItem("profileOption", "My Communities");

    const response = await axios.get(
      `http://localhost:3002/getAdmin/${currentTag}`
    );
    const admin = response.data;

    const content = await axios.get(
      `http://localhost:3002/get_uploadByTitle/${bookmark.title}/${bookmark.uploadDate}`
    );

    const activeContent = content.data;

    const categoryData = {
      activeContent: activeContent,
      comAdmin: admin,
      userId: user_id,
      access: activeContent.access,
      keywords: activeContent.keywords,
    };

    window.sessionStorage.setItem("catData", JSON.stringify(categoryData));
    navigate(
      `/profile/com-holder/${bookmark.comTag}/resource/${bookmark.title}/res-item`
    );
    window.location.reload(true);
  };

  const handleDeleteBookmark = async () => {
    
    const response = await axios.delete(
      `http://localhost:3002/deleteBookmark/${user_id}/${bookmark.title}`
    );

    if (response.data.acknowledged) {
      toast.success("Bookmark deleted");
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    } else {
      toast.error("Unable to delete bookmark");
    }
  };

  return (
    <div className="bookmark-item">
      <div className="bookmark-item-icon">
        <BookmarkIcon />
      </div>
      <div className="bookmark-info">
        <div className="bookmark-item-title">{bookmark.title}</div>
        <div className="bookmark-item-date">
          {getTextFormattedTime(new Date(bookmark.bookmarkDate))}
        </div>
      </div>
      <div className="bookmark-dropdown">
        <div className="bookmark-dropdown-icon">
          <Options />
        </div>
        <div className="bookmark-dropdown-content">
          <div className="bookmark-dropdown-item" onClick={handleBookmarkClick}>
            Go to content
          </div>
          <div
            className="bookmark-dropdown-item"
            onClick={handleDeleteBookmark}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bookmark;
