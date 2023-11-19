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
  AiFillDelete as Delete,
} from "react-icons/ai";
import {
  HiSortAscending as Ascending,
  HiSortDescending as Descending,
} from "react-icons/hi";
import {
  BsCloudUploadFill as UploadIcon,
  BsFillCloudDownloadFill as DownloadIcon,
  BsFillBookmarkPlusFill as Bookmark,
  BsToggleOn as ToggleOn,
  BsToggleOff as ToggleOff,
} from "react-icons/bs";
import { FaBook as BookIcon, FaPenFancy as PenIcon } from "react-icons/fa";
import { VscSymbolMisc as MiscIcon } from "react-icons/vsc";
import { compareDates, getTextFormattedTime } from "../utility/time";
import { useNavigate, useParams } from "react-router-dom";
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
  const [comAdmin, setComAdmin] = useState(0);
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  const toggleUpload = () => {
    setuploadContent(!uploadContent);ekh
  };

  const fetch_uploads = async (option, order) => {
    let URL = `http://localhost:3002/get_uploads/${option}/${order}/${currentTag}`;
    if (searchQuery.length > 0) URL += `?key=${searchQuery.toUpperCase()}`;

    const response = await axios.get(URL);
    const res = await axios.get(
      `http://localhost:3002/get_communityByTag/${currentTag}`
    );
    const data = response.data;
    const data2 = res.data;
    setuploads(data);
    setComAdmin(data2.admin);

    const user_id = JSON.parse(
      window.localStorage.getItem("currentUser")
    ).student_id;
    setUserId(user_id);
  };

  useEffect(() => {
    fetch_uploads(sortOption, sortOrder);
  }, [sortOption, sortOrder]);

  return (
    <div className="com-res">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        layout
        className="search-tab"
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        layout
        className={"resource-list"}
      >
        <div className={"resource-list-hor"}>
          {uploads.map((upload, index) => (
            <ResourceRow
              onClick={() => {
                if (upload.access === "Open" || userId == comAdmin) {
                  const activeContent = uploads[index];
                  const categoryData = {
                    activeContent: activeContent,
                    comAdmin: comAdmin,
                    userId: userId,
                    access: upload.access,
                    keywords: upload.keywords,
                  };

                  window.sessionStorage.setItem(
                    "catData",
                    JSON.stringify(categoryData)
                  );
                  navigate(
                    `/profile/com-holder/${currentTag}/resource/${upload.category_name}/res-item`
                  );
                } else toast.error("Access prohibited.");
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
              comAdmin={comAdmin}
              userId={userId}
              key={index}
            />
          ))}
        </div>
      </motion.div>

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

export const ActiveResource = () => {
  const location = JSON.parse(window.sessionStorage.getItem("catData"));
  const [activeOption, setActiveOption] = useState("academic");
  const [mainList, setMainList] = useState([]);
  const [mainListType, setMainListType] = useState("academic");
  const [openUpload, setOpenUpload] = useState(false);
  const uploadContent = useRef(null);
  const [showAccess, setShowAccess] = useState(location.access);
  const comAdmin = location.comAdmin;
  const userId = location.userId;
  const keywords = location.keywords;
  const [activeConent, setActiveContent] = useState({});
  const currentTag = useParams().tag;

  const toggleOpenUpload = () => {
    setOpenUpload(!openUpload);
  };

  const compare = (a, b) => {
    return compareDates(new Date(a.date), new Date(b.date)) * -1;
  };

  const getContent = async () => {
    const response = await axios.get(
      `http://localhost:3002/get_upload/${JSON.stringify(
        keywords
      )}/${currentTag}`
    );

    const data = response.data;
    data.academic.sort(compare);
    data.student.sort(compare);
    data.misc.sort(compare);

    setActiveContent(data);
    setMainList(data.academic);
  };

  const changeAccess = async () => {
    const changedAccess = showAccess === "Open" ? "Restricted" : "Open";

    const response = await axios.post("http://localhost:3002/changeAccess", {
      access: changedAccess,
      keywords: keywords,
    });

    const data = response.data;
    if (data.acknowledged) {
      toast.success("Access changed.");
      setShowAccess(changedAccess);
    }
  };

  const insertBookmark = async () => {
    const response = await axios
      .post("http://localhost:3002/insertBookmark", {
        user: userId,
        uploadDate: activeConent.date,
        title: activeConent.category_name,
        bookmarkDate: new Date().toISOString(),
        comTag: currentTag,
      })
      .catch((error) => {
        if (error.response?.status === 500) {
          toast.error("Could not insert bookmark or already added.");
        }
      });

    const data = response.data;
    if (data.acknowledged) {
      toast.success("Bookmark added.");
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className="active-resource">
      <motion.div
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.3 }}
        className="res-title-wrapper"
      >
        <div className="title">
          <div className="actual-title">{activeConent.category_name}</div>
          <div className="subtitle">{activeConent.description}</div>
        </div>
        <div className="icons">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="bookmark"
            onClick={insertBookmark}
          >
            <Bookmark /> Bookmark this
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="bookmark"
            onClick={toggleOpenUpload}
          >
            <UploadIcon /> Upload content
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ee4962" }}
            whileTap={{ scale: 0.9 }}
            className="bookmark"
            onClick={() => {
              if (userId == comAdmin) changeAccess();
              else toast.error("Access prohibited.");
            }}
          >
            {showAccess === "Open" ? <ToggleOn /> : <ToggleOff />} Toggle Access
          </motion.button>
          <input
            ref={uploadContent}
            type="file"
            name="contentUpload"
            id="content-up"
            style={{ display: "none" }}
          />
        </div>
      </motion.div>
      <div className="options">
        <div
          className={
            activeOption === "academic" ? "academic-res-active" : "academic-res"
          }
          onClick={() => {
            setActiveOption("academic");
            setMainList(activeConent.academic);
            setMainListType("academic");
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
            setMainListType("student");
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
            setMainListType("misc");
          }}
        >
          <MiscIcon />
          Miscellanious
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.3 }}
        className="main-list"
      >
        {mainList.map((row, index) => (
          <MainListRow
            key={index}
            rowTitle={row.name}
            uploadTime={getTextFormattedTime(new Date(row.date))}
            contentLink={row.content}
            uploader={row.uploader}
            publicId={row.publicId}
            type={row.type}
            resourceType={row.resourceType}
            time={activeConent.date}
            mainListType={mainListType}
          />
        ))}
      </motion.div>

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
  publicId,
  type,
  resourceType,
  time,
  mainListType,
}) => {
  const currentTag = useParams().tag;
  const [isDeleting, setDeleting] = useState(false);

  const deleteContent = async () => {
    const currentUser = JSON.parse(
      window.localStorage.getItem("currentUser")
    ).student_id;

    if (currentUser !== Number(uploader)) {
      toast.error("You cannot delete this content.");
      return;
    }

    setDeleting(true);
    const response = await axios.delete(
      `http://localhost:3002/deleteContent/${publicId}/${time}/${currentTag}/${type}/${resourceType}/${mainListType}`
    );
    setDeleting(false);

    const data = response.data;
    if (data.acknowledged) {
      toast.success("Content deleted.");
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    }
  };

  return (
    <div className="row-container">
      <div className="row-title-date">
        <div className="title">{rowTitle}</div>
        <div className="upload-time">
          Uploaded on {uploadTime} by ID {uploader}
        </div>
      </div>

      <div className="row-buttons">
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

        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgb(238, 73, 98)",
            color: "#ffffff",
          }}
          whileTap={{ scale: 0.9 }}
          className="download-button"
          onClick={deleteContent}
        >
          <Delete /> Delete
        </motion.button>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isDeleting && (
          <PortalPopup overlayColor="rgba(0,0,0, 0.5)" placement="Centered">
            <LoadingIcon iconSize={"5vw"} iconWidth={"5vw"} />
          </PortalPopup>
        )}
      </AnimatePresence>
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
          <PortalPopup overlayColor="rgba(0,0,0, 0.5)" placement="Centered">
            <LoadingIcon iconSize={"5vw"} iconWidth={"5vw"} />
          </PortalPopup>
        )}
      </AnimatePresence>
    </motion.form>
  );
};
export default ComRes;
