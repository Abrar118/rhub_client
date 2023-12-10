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
import { ScaleLoader, SyncLoader } from "react-spinners";
import PortalPopup from "../PortalPopup";

function MyUploads() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUploads = async () => {
    const user = JSON.parse(window.localStorage.getItem("currentUser"));
    const user_id = user.student_id;
    const tags = user.community;

    setLoading(true);
    const response = await axios
      .get(
        import.meta.env.VITE_CURRENT_PATH +
          `/getMyUploads/${user_id}/${JSON.stringify(tags)}`
      )
      .catch((err) => {
        if (err.response.status === 500) toast.error("Error fetching uploads");
      });

    setLoading(false);

    const data = response.data;
    console.log(data);
    setUploads(data);
  };

  useEffect(() => {
    getUploads();
  }, []);

  return (
    <div className="myup">
      {loading && (
        <PortalPopup overlayColor="rgba(0,0,0, 0.5)" placement="Centered">
          <ScaleLoader color="#36d7b7" height={35} width={5} />
        </PortalPopup>
      )}
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
              onChange={(e) => {}}
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
              onChange={(e) => {}}
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
            <div className="show-as-block" onClick={() => {}}>
              <Ascending />
            </div>
            <div className="show-as-block" onClick={() => {}}>
              <Descending />
            </div>
          </div>
        </div>
      </div>

      <div className="myup-list">
        {uploads[0] &&
          uploads[0].map((item) => (
            <>
              {" "}
              <div
                style={{
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                }}
              >
                Academic Materials
              </div>{" "}
              <UploadItem item={item} />{" "}
            </>
          ))}
      </div>

      <div className="myup-list">
        {uploads[0] &&
          uploads[0].map((item) => (
            <>
              {" "}
              <div
                style={{
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                }}
              >
                Student Materials
              </div>{" "}
              <UploadItem item={item} />{" "}
            </>
          ))}
      </div>

      <div className="myup-list">
        {uploads[0] &&
          uploads[0].map((item) => (
            <>
              {" "}
              <div
                style={{
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                }}
              >
                Miscellaneous Materials
              </div>{" "}
              <UploadItem item={item} />{" "}
            </>
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
        <div className="upload-item-date">
          {getTextFormattedTime(new Date(item.date))}
        </div>
      </div>

      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          style={{ backgroundColor: "#000000" }}
          className="upload-item-button"
          onClick={() => {
            window.open(item.content, "_blank");
          }}
        >
          Download
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          style={{ backgroundColor: "#ee4962" }}
          className="upload-item-button"
        >
          Delete
        </motion.button>
      </div>
    </div>
  );
};

export default MyUploads;
