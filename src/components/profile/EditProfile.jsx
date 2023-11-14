import React, { useState, useEffect, useRef } from "react";
import "../../styles/profile/editProfile.css";
import { AiOutlineEdit as EditIcon } from "react-icons/ai";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { convertBase64 } from "../utility/fileLoad";

export const EditProfile = () => {
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [department, setdepartment] = useState();
  const [batch, setbatch] = useState();
  const [bio, setbio] = useState();
  const [avatarPath, setavatarPath] = useState();
  const [phone, setPhone] = useState();
  const uploadAvatar = useRef(null);

  const handleEdit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: name,
      department: department,
      bio: bio,
      batch: batch * 1,
      email: email,
      phone: phone,
      avatar: avatarPath,
    };

    const student = JSON.parse(window.localStorage.getItem("currentUser"));
    const response = await axios.patch(
      `http://localhost:3002/updateUser/${student.student_id}`,
      requestBody
    );
    const data = response.data;

    if (!data.acknowledged) {
      toast.error("Could not update user!");
      return;
    }

    student.name = name;
    student.department = department;
    student.bio = bio;
    student.batch = batch;
    student.email = email;
    student.phone = phone;

    window.localStorage.setItem("currentUser", JSON.stringify(student));
    toast.success("Profile updated successfully.");
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
      .post("http://localhost:3002/uploadAvatar", {
        image: base64Image,
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
    setavatarPath(data.secure_url);
    toast.success("Avatar updated successfully. Click SAVE to proceed.");

    //  console.log(data);
  };

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("currentUser"));

    setName(data.name);
    setdepartment(data.department);
    setbio(data.bio);
    setbatch(data.batch);
    setemail(data.email);
    setPhone(data.phone);
    setavatarPath(data.avatar);
  }, []);

  return (
    <div className="edit-container">
      <div className="title-container">
        <div className="edit-title">Edit Profile</div>
      </div>

      <div className="profile-pic-container">
        <img src={avatarPath} alt="avatar" className="prof-avatar" />
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
          className="edit-pic-icon"
          onClick={() => {
            uploadAvatar.current.click();
          }}
        >
          <EditIcon />
        </motion.div>
        <input
          onChange={handleUpload}
          ref={uploadAvatar}
          type="file"
          accept="image/*"
          name="avatarUpload"
          id="avatar-up"
          style={{ display: "none" }}
        />
      </div>

      <form className="form-container" onSubmit={handleEdit}>
        <div className="edit-row">
          <div className="edit-input-holder">
            <label className="edit-input-label" htmlFor="name">
              Name
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="edit-input"
              type="text"
              name="name"
              value={name}
            />
          </div>
          <div className="edit-input-holder">
            <label className="edit-input-label" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="edit-input"
              type="email"
              name="email"
              value={email}
            />
          </div>
        </div>

        <div className="edit-row">
          <div className="edit-input-holder">
            <label className="edit-input-label" htmlFor="department">
              Department
            </label>
            <input
              onChange={(e) => {
                setdepartment(e.target.value);
              }}
              className="edit-input"
              type="text"
              name="department"
              value={department}
            />
          </div>
          <div className="edit-input-holder">
            <label className="edit-input-label" htmlFor="batch">
              Batch
            </label>
            <input
              onChange={(e) => {
                setbatch(e.target.value);
              }}
              className="edit-input"
              type="text"
              name="batch"
              value={batch}
              placeholder="e.g. 2020"
            />
          </div>
        </div>

        <div className="edit-row">
          <div className="edit-input-holder">
            <label className="edit-input-label" htmlFor="bio">
              Bio
            </label>
            <input
              onChange={(e) => {
                setbio(e.target.value);
              }}
              className="edit-input"
              type="text"
              name="bio"
              value={bio}
            />
          </div>
          <div className="edit-input-holder">
            <label className="edit-input-label" htmlFor="phone">
              Phone
            </label>
            <input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="edit-input"
              type="text"
              name="phone"
              value={phone}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="save-edit"
        >
          Save
        </motion.button>
      </form>
    </div>
  );
};

export default EditProfile;
