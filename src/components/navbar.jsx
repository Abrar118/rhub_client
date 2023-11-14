import "../styles/navbar.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import PortalPopup from "./PortalPopup";
import LogInHolder from "./loginholder";
import ProfileDropdown from "./profile/ProfileDropdown";

import logo from "../assets/logo-black.svg";

const menusRoutes = [
  {
    name: "Home",
    route: "hero",
  },
  {
    name: "Features",
    route: "features",
  },
  {
    name: "Communities",
    route: "communities",
  },
  {
    name: "Stats",
    route: "stats",
  },
  {
    name: "About",
    route: "about",
  },
];

const Navbar = () => {
  const [log_in, set_log_in] = useState(false);
  const isAuthenticated = useRef(false);
  const [dropdown, setdropdown] = useState(false);
  const [avatarPath, setavatarPath] = useState("");
  const location = useLocation().pathname;
  const showMenu = location === "/" ? true : false;
  const navigate = useNavigate();

  const open_log_in = useCallback(() => {
    set_log_in(true);
  });

  const close_log_in = useCallback(() => {
    set_log_in(false);
  });

  const toggleDropDown = () => {
    setdropdown(!dropdown);
  };

  const fetch_avatar = () => {
    // console.log(isAuthenticated.current)
    if (isAuthenticated.current) {
      const data = JSON.parse(window.localStorage.getItem("currentUser"));
      setavatarPath(data.avatar);
    }
  };
  
  useLayoutEffect(() => {
    const status = window.localStorage.getItem("logInStatus");
    isAuthenticated.current = status === "true";
    fetch_avatar();
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-frame">
        <Link to="/">
          <img alt="logo" src={logo} className="navbar-logo" />
        </Link>
        <div className="navbar-buttons">
          {menusRoutes.map((menuItem, index) => (
            <ScrollLink
              disabled={!showMenu}
              className="navbar-label-wrapper"
              to={menuItem.route}
              key={index}
              spy={true}
              smooth={true}
              offset={-130}
              duration={500}
              activeClass="avtive-navbar-link"
            >
              {menuItem.name}
            </ScrollLink>
          ))}
        </div>
      </div>
      <div className="login-wrapper">
        {isAuthenticated.current ? (
          <>
            <img
              src={avatarPath}
              alt="avatar"
              onClick={toggleDropDown}
              className="profile-avatar"
            />
            <div
              className={`dropdown-menu ${dropdown ? "active" : "inactive"}`}
            >
              {dropdown && <ProfileDropdown />}
            </div>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="log-in-button"
            onClick={open_log_in}
          >
            Log in
          </motion.button>
        )}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {log_in && (
          <PortalPopup
            overlayColor="rgba(0,0,0, 0.5)"
            placement="Centered"
            onOutsideClick={close_log_in}
          >
            <LogInHolder
              closePopUp={close_log_in}
              showLogin={true}
              authentication={isAuthenticated.current}
            />
          </PortalPopup>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
