import React, { useEffect, useState } from "react";
import "../../styles/profile/generalInfo.css";
import avatar from "../../assets/Avatar.png";
import axios from "axios";
import { backIn, motion } from "framer-motion";
import { getTextFormattedTime } from "../utility/time";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3002");

function GeneralInfo() {
  const [name, setName] = useState();
  const [student_id, setStudent_id] = useState();
  const [department, setDepartment] = useState();
  const [bio, setBio] = useState();
  const [level, setLevel] = useState(1);
  const [uploads, setUploads] = useState(34);
  const [email, setemail] = useState([]);
  const [phone, setPhone] = useState();
  const [joinDate, setjoinDate] = useState(new Date());
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("currentUser"));

    // console.log(data)

    setName(data.name);
    setStudent_id(data.student_id);
    setDepartment(data.department);
    setBio(data.bio);
    setLevel(data.batch);
    setemail(data.email);
    setPhone(data.phone);
    setjoinDate(new Date(data.join_date));
  }, []);

  useEffect(() => {
    socket.emit("addOnlineUser", {
      student_id: user.student_id,
    });
  }, [socket]);

  const DetailsRow = ({ title, desc }) => {
    return (
      <div className="details-row">
        <div className="details-title">{title} :</div>
        <div className="details-desc">{desc}</div>
      </div>
    );
  };

  const gotoUploads = () => {
    window.localStorage.setItem("profileOption", "My Uploads");
    navigate("/profile/my-uploads");
    window.location.reload(true);
  };

  return (
    <div className="general-info">
      <div className="prof-username">{name}</div>

      <div className="bio-wrapper">
        <div className="bio-text">Bio</div>
        <p className="bio-text-2">{bio}</p>
      </div>
      <div className="member-since-wrapper">
        <div className="join-date">{getTextFormattedTime(joinDate)}</div>
        <div className="join-date-2">Member since</div>
        <p className="join-date-3">You have joined RHUB on</p>
      </div>
      <div className="details-wrapper">
        <DetailsRow title={"Name"} desc={name} />
        <DetailsRow title={"Email"} desc={email} />
        <DetailsRow title={"Student ID"} desc={student_id} />
        <DetailsRow title={"Department"} desc={department} />
        <DetailsRow title={"Batch"} desc={level} />
        <DetailsRow title={"Phone"} desc={phone} />
      </div>
      <div className="up-count-wrapper">
        <div className="upload-1">My Uploads</div>
        <div className="upload-content">{uploads}</div>
        <div className="last-on-nov">Last on&nbsp;&nbsp;Nov. 2021</div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
          className="see-all-uploads"
          onClick={gotoUploads}
        >
          <div className="upload-1">See all uploads</div>
        </motion.button>
      </div>
    </div>
  );
}

export default GeneralInfo;
