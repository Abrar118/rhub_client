import React, { useEffect, useState, useRef } from "react";
import "../../styles/community/comRes.css";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import AddCategory from "./AddCategory";
import PortalPopup from "../PortalPopup";

import {
  AiOutlinePlus as Plus,
  AiOutlineSearch as SearchIcon,
} from "react-icons/ai";
import {
  HiSortAscending as Ascending,
  HiSortDescending as Descending,
} from "react-icons/hi";
import {
  BsCloudUploadFill as UploadIcon,
  BsFillCloudDownloadFill as DownloadIcon,
  BsFillBookmarkPlusFill as Bookmark,
} from "react-icons/bs";
import { FaBook as BookIcon, FaPenFancy as PenIcon } from "react-icons/fa";
import { VscSymbolMisc as MiscIcon } from "react-icons/vsc";
import { getTextFormattedTime } from "../utility/time";
import { useParams } from "react-router-dom";
import { convertBase64 } from "../utility/fileLoad";
import LoadingIcon from "../utility/Loader/LoadingIcon";

function ComRes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploads, setuploads] = useState([]);
  const [uploadContent, setuploadContent] = useState(false);
  const [sortOption, setSortOption] = useState("date");
  const [sortOrder, setSortOrder] = useState(-1);
  const [isActive, setIsActive] = useState(false);
  const currentTag = useParams().tag;
  const [index, setIndex] = useState(0);

  const toggleUpload = () => {
    setuploadContent(!uploadContent);
  };

  const fetch_uploads = async (option, order) => {
    let URL = `http://localhost:3002/get_uploads/${option}/${order}/${currentTag}`;
    if (searchQuery.length > 0) URL += `?key=${searchQuery.toUpperCase()}`;

    const response = await axios.get(URL);
    const data = response.data;
    setuploads(data);
  };

  useEffect(() => {
    fetch_uploads(sortOption, sortOrder);
  }, [sortOption, sortOrder]);

  return (
    <div className="com-res">
      <div className="search-tab">
        <div className="res-title">Resources</div>
        <div className="search-objects">
          <div className="search-input">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <input
              disabled={isActive ? true : false}
              type="search"
              className="search-input-holder"
              placeholder="Search resources by keyword"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
              whileTap={{ scale: 0.9 }}
              className="search-community-button"
              onClick={() => {
                fetch_uploads(sortOption, sortOrder);
              }}
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
              <option value="date" className="sort-dropdown-item">
                Date Created
              </option>
              <option value="resource" className="sort-dropdown-item">
                Available Resources
              </option>
              <option value="category_name" className="sort-dropdown-item">
                Name
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

          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="add-community"
            onClick={toggleUpload}
          >
            <Plus />
            Add Category
          </motion.button>
        </div>
      </div>
      <div className={"resource-list"}>
        <div className={isActive ? "resource-list-ver" : "resource-list-hor"}>
          {uploads.map((upload, index) => (
            <ResourceRow
              onClick={() => {
                setIsActive(!isActive);
                setIndex(index);
              }}
              access={upload.access}
              name={upload.category_name}
              date={upload.date}
              desc={upload.description}
              academicLen={upload.academic.length}
              studentLen={upload.student.length}
              miscLen={upload.misc.length}
              keywords={upload.keywords}
              index={index}
              key={index}
            />
          ))}
        </div>

        {isActive && <ActiveResource activeConent={uploads[index]} />}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {uploadContent && (
          <PortalPopup
            overlayColor="rgba(0,0,0, 0.5)"
            placement="Centered"
            onOutsideClick={toggleUpload}
          >
            <AddCategory closePopUp={toggleUpload} />
          </PortalPopup>
        )}
      </AnimatePresence>
    </div>
  );
}

export const ResourceRow = ({
  onClick,
  access,
  name,
  date,
  desc,
  academicLen,
  studentLen,
  miscLen,
  keywords,
  index,
}) => {
  return (
    <div
      className="row-wrapper"
      onClick={() => {
        onClick(index);
      }}
    >
      <div
        className="access"
        style={{
          backgroundColor: access === "Restricted" ? "#ee4962" : "#1a194d",
        }}
      >
        {access}
      </div>
      <div className="category-title-date">
        <div className="category-title">{name}</div>
        <div className="category-date">
          {getTextFormattedTime(new Date(date))}
        </div>
      </div>
      <div className="short-desc">{desc}</div>
      <div className="resource-count">
        <div className="academic-res">
          <BookIcon />
          {academicLen}
        </div>
        <div className="academic-res">
          <PenIcon />
          {studentLen}
        </div>
        <div className="academic-res">
          <MiscIcon />
          {miscLen}
        </div>
      </div>
      <div className="keyword-title">Keywords</div>
      <div className="keywords">
        {keywords.map((keyword, index) => (
          <div className="keyword" key={index}>
            {keyword}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ActiveResource = ({ activeConent }) => {
  const [activeOption, setActiveOption] = useState("academic");
  const [mainList, setMainList] = useState(activeConent.academic);
  const [openUpload, setOpenUpload] = useState(false);
  const uploadContent = useRef(null);

  const toggleOpenUpload = () => {
    setOpenUpload(!openUpload);
  };

  return (
    <div className="active-resource">
      <div className="res-title-wrapper">
        <div className="title">
          <div className="actual-title">{activeConent.category_name}</div>
          <div className="subtitle">{activeConent.description}</div>
        </div>
        <div className="icons">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#000000" }}
            whileTap={{ scale: 0.9 }}
            className="bookmark"
          >
            <Bookmark /> Bookmark this
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#000000" }}
            whileTap={{ scale: 0.9 }}
            className="bookmark"
            onClick={toggleOpenUpload}
          >
            <UploadIcon /> Upload content
          </motion.button>
          <input
            ref={uploadContent}
            type="file"
            name="contentUpload"
            id="content-up"
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="options">
        <div
          className={
            activeOption === "academic" ? "academic-res-active" : "academic-res"
          }
          onClick={() => {
            setActiveOption("academic");
            setMainList(activeConent.academic);
          }}
        >
          <BookIcon />
          Academic
        </div>
        <div
          className={
            activeOption === "student" ? "academic-res-active" : "academic-res"
          }
          onClick={() => {
            setActiveOption("student");
            setMainList(activeConent.student);
          }}
        >
          <PenIcon />
          Student Content
        </div>
        <div
          className={
            activeOption === "misc" ? "academic-res-active" : "academic-res"
          }
          onClick={() => {
            setActiveOption("misc");
            setMainList(activeConent.misc);
          }}
        >
          <MiscIcon />
          Miscellanious
        </div>
      </div>

      <div className="main-list">
        {mainList.map((row, index) => (
          <MainListRow
            key={index}
            rowTitle={row.name}
            uploadTime={getTextFormattedTime(new Date(row.date))}
            contentLink={row.content}
            uploader={row.uploader}
          />
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {openUpload && (
          <PortalPopup
            overlayColor="rgba(0,0,0, 0.5)"
            placement="Centered"
            onOutsideClick={toggleOpenUpload}
          >
            <UploadPopUp keywords={activeConent.keywords} />
          </PortalPopup>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MainListRow = ({
  rowTitle,
  uploadTime,
  uploader,
  contentLink,
}) => {
  return (
    <div className="row-container">
      <div className="row-title-date">
        <div className="title">{rowTitle}</div>
        <div className="upload-time">
          Uploaded on {uploadTime} by ID {uploader}
        </div>
      </div>

      <motion.button
        whileHover={{
          scale: 1.05,
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        className="download-button"
        onClick={() => {
          window.open(contentLink, "_blank");
        }}
      >
        <DownloadIcon /> Download
      </motion.button>
    </div>
  );
};

export const UploadPopUp = ({ keywords }) => {
  const uploadContent = useRef(null);
  const [name, setName] = useState("");
  const [contentType, setContentType] = useState("academic");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (selectedFile.size > 20971520) {
      toast.error("Image size should be less than 20MB");
      return;
    }

    const base64File = await convertBase64(selectedFile);
    const student = JSON.parse(window.localStorage.getItem("currentUser"));

    let terminate = false;
    setIsUploading(true);
    const response = await axios
      .post(
        `http://localhost:3002/uploadContent/${contentType}/${JSON.stringify(
          keywords
        )}/${selectedFile.name}/${student.student_id}`,
        {
          file: base64File,
        }
      )
      .catch((error) => {
        if (error.response?.status === 413) {
          toast.error(error.response.statusText);
        } else if (error.response?.status === 500) {
          toast.error("Could not upload avatar");
        }

        terminate = true;
      });

    if (terminate) return;
    setIsUploading(false);

    setName(selectedFile.name);
    toast.success("File uploaded successfully");

    setTimeout(() => {
      window.location.reload(true);
    }, 500);

    //  console.log(data);
  };

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setName(e.target.files[0].name);
  };

  return (
    <motion.form
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ ease: "easeIn", duration: 0.3 }}
      exit={{ scale: 0.8, transition: { ease: "easeIn", duration: 0.3 } }}
      className="upload-container"
      onSubmit={handleUpload}
    >
      <div className="name-input">
        <label htmlFor="content" className="name-label">
          Content Name
        </label>
        <input
          placeholder="Upload a file"
          value={name}
          required
          type="text"
          className="name-field"
          id="content"
          name="content"
        />
      </div>
      <input
        ref={uploadContent}
        type="file"
        name="contentUpload"
        id="content-up"
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <select
        required
        name="contentType"
        id="type"
        className="select-content-type"
        onChange={(e) => {
          setContentType(e.target.value);
        }}
      >
        <option value="academic" className="type-item">
          Academic
        </option>
        <option value="student" className="type-item">
          Student
        </option>
        <option value="misc" className="type-item">
          MISC
        </option>
      </select>

      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          className="upload-button"
          onClick={() => {
            uploadContent.current.click();
          }}
          type="button"
        >
          <UploadIcon /> Select file
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          className="upload-button"
          type="submit"
        >
          Upload
        </motion.button>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isUploading && (
          <PortalPopup
            overlayColor="rgba(0,0,0, 0.5)"
            placement="Centered"
          >
            <LoadingIcon iconSize={"10vw"} iconWidth={"10vw"} />
          </PortalPopup>
        )}
      </AnimatePresence>
    </motion.form>
  );
};
export default ComRes;
