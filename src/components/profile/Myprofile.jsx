import React, { useEffect, useState } from 'react';
import "../../styles/profile/myprofile.css";
import { Link, Outlet} from 'react-router-dom';

import { BsCloudUploadFill as Upload, BsInfoCircle as Info, BsBookmarkStar as Bookmark } from "react-icons/bs";
import { BiSolidMessageCheck as Inbox, BiHelpCircle as Help, BiLockAlt as Lock } from "react-icons/bi";
import { AiOutlineEdit as Edit } from "react-icons/ai"
import { IoIosNotificationsOutline as Notification } from "react-icons/io";
import { FaUsers as MyCommunities } from "react-icons/fa";


export const Myprofile = () => {

  const [activeLink, setActiveLink] = useState();

  useEffect(() => {
    const activeOption = localStorage.getItem("profileOption");
    setActiveLink(activeOption);
  }, []);

  const MenuBar = () => {

    const MenuItem = ({ MenuIcon, menutext, linkTo }) => {
      return (
        <Link
          className={(activeLink === menutext) ? "menu-item-active" : "menu-item"}
          to={linkTo}
          onClick={() => {
            setActiveLink(menutext);
            window.localStorage.setItem("profileOption", menutext)
          }}
        >
          <div className='menu-icon' >
            <MenuIcon />
          </div>
          <div className="menu-text">{menutext}</div>
        </Link>
      )
    };


    return (
      <div className="menu-wrapper">
        <MenuItem MenuIcon={Info} menutext={"General"} linkTo={"/profile/info"} />
        <MenuItem MenuIcon={Lock} menutext={"Change Password"} linkTo={"/profile/change-pass"} />
        <MenuItem MenuIcon={Edit} menutext={"Edit Profile"} linkTo={"/profile/edit"} />
        <MenuItem MenuIcon={Bookmark} menutext={"Bookmarks"} linkTo={"/profile/bookmark"}  />
        <MenuItem MenuIcon={MyCommunities} menutext={"My Communities"} linkTo={"/profile/my-commnunities"} />
        <MenuItem MenuIcon={Upload} menutext={"My Uploads"} linkTo={"/profile/my-uploads"} />
        <MenuItem MenuIcon={Notification} menutext={"Notifications"} linkTo={"/profile/notification"} />
        <MenuItem MenuIcon={Inbox} menutext={"Inbox"} linkTo={"/profile/inbox"} />
        <MenuItem MenuIcon={Help} menutext={"Help and Privacy Policy"} linkTo={"/profile/help"} />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="menu-holder">
        <MenuBar />
      </div>
      <div className=' content-container '>
        <Outlet />
      </div>
    </div>
  );
}

export default Myprofile;