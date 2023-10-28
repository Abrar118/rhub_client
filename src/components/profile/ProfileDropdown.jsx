import React, { useEffect, useState, useRef } from 'react';
import "../../styles/profile/ProfileDropdown.css";
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import EditProfile from './EditProfile';
import { FiSettings } from "react-icons/fi";
import { BsChevronRight, BsBookmarkStar, BsChevronLeft, BsCloudUploadFill, BsInfoCircle } from "react-icons/bs";
import { BiUserCircle, BiLogOut, BiSolidMessageCheck, BiHelpCircle } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { motion } from 'framer-motion';
import { AiOutlineEdit } from "react-icons/ai"
import { IoIosNotificationsOutline } from "react-icons/io";
import { toast } from 'react-toastify';


function ProfileDropdown() {

   const navigate = useNavigate();
   const [optionState, setOpton] = useState("menu");
   const [menuHeight, setMenuHeight] = useState(null);
   const dropdownRef = useRef(null);

   const toggleState = () => {
      setOpton("menu");
   }

   const handleLogout = () => {
      window.localStorage.setItem("logInStatus", false);
      toast.success("Logged Out Successfully");
      setTimeout(() => {
         navigate("/");
         window.location.reload(true);
      }, 1000);
   }

   const calcHeight = (domElement) => {
      const height = domElement.offsetHeight;
      setMenuHeight(height);
   }

   function DropdownItem({ DropIcon, dropText, goToMenu, RightIcon, linkTo }) {
      return (
         <li className='dropdownItem' onClick={() => {
            if (goToMenu) {
               if (linkTo) {
                  navigate(goToMenu);
                  window.localStorage.setItem("profileOption", dropText);
                  window.scrollTo(0, 0);
               }
               else setOpton(goToMenu);
            }

         }}>
            <DropIcon />
            <div> {dropText} </div>
            {RightIcon && <RightIcon />}
         </li>
      );
   };

   const DropDownMenu = () => {

      return (
         <ul>
            <DropdownItem DropIcon={BiUserCircle} dropText={"My Profile"} goToMenu="prof" RightIcon={BsChevronRight} />
            <div onClick={handleLogout}>
               <DropdownItem DropIcon={BiLogOut} dropText={"Logout"} />
            </div>
         </ul>
      )
   };

   const Profileoptions = () => {
      return (
         <ul>
            <motion.div
               onClick={toggleState}
               whileHover={{ cursor: "pointer", color: "#ee4962" }}
            >
               <BsChevronLeft />
            </motion.div>
            <DropdownItem DropIcon={BsInfoCircle} dropText={"General"} linkTo={true} goToMenu={"/profile/info"} />
            <DropdownItem DropIcon={AiOutlineEdit} dropText={"Edit Profile"} linkTo={true} goToMenu={"/profile/edit"} />
            <DropdownItem DropIcon={BsBookmarkStar} dropText={"Bookmarks"} linkTo={true} goToMenu={"/profile/bookmark"} />
            <DropdownItem DropIcon={FaUsers} dropText={"My Communities"} linkTo={true} goToMenu={"/profile/my-commnunities"} />
            <DropdownItem DropIcon={BsCloudUploadFill} dropText={"My Uploads"} linkTo={true} goToMenu={"/profile/my-uploads"} />
            <DropdownItem DropIcon={IoIosNotificationsOutline} dropText={"Notifications"} linkTo={true} goToMenu={"/profile/notification"} />
            <DropdownItem DropIcon={BiSolidMessageCheck} dropText={"Inbox"} linkTo={true} goToMenu={"/profile/inbox"} />
            <DropdownItem DropIcon={FiSettings} dropText={"Change Password"} linkTo={true} goToMenu={"/profile/change-pass"} />
            <DropdownItem DropIcon={BiHelpCircle} dropText={"Help"} linkTo={true} goToMenu={"/profile/help"} />
         </ul>
      )
   }

   useEffect(() => {
      setOpton("menu");
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
   }, []);

   return (
      <div
         className="dropdown-container"
         style={{ height: menuHeight }}
         ref={dropdownRef}
      >
         <CSSTransition
            in={optionState === "menu"}
            unmountOnExit
            timeout={500}
            classNames="option-primary"
            onEnter={calcHeight}
         >
            <div className='option'>
               <DropDownMenu />
            </div>
         </CSSTransition>

         <CSSTransition
            in={optionState === "prof"}
            unmountOnExit
            timeout={500}
            classNames="option-secondary"
            onEnter={calcHeight}
         >
            <div className='option'>
               <Profileoptions />
            </div>
         </CSSTransition>
      </div>
   );
}


export default ProfileDropdown;