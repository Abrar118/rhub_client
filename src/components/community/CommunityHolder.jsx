import React, { useEffect, useState } from "react";
import "../../styles/community/com-holder.css";

import { AiOutlineMenuFold as ExpandIcon } from "react-icons/ai";
import { RiExpandRightFill as RetractIcon } from "react-icons/ri";
import { BiSolidDashboard as DashboardIcon } from "react-icons/bi";
import {
  BsChatDots as ChatIcon,
  BsStack as ResourceIcon,
} from "react-icons/bs";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function CommunityHolder() {
  const [expandMenu, setExpandMenu] = useState(false);
  const [comActiveMenu, setComActiveMenu] = useState("dashboard");
  const navigate = useNavigate();
  const urlTag = useParams().tag;

  const active_and_navigate = (activeText, navigatePath) => {
    setComActiveMenu(activeText);
    window.localStorage.setItem("comActiveMenu", activeText);
    navigate(navigatePath);
  };

  useEffect(() => {
    const temoActiveMenu = window.localStorage.getItem("comActiveMenu");
    setComActiveMenu(temoActiveMenu);
  }, []);

  return (
    <div className="com-holder">
      <div
        className="com-menu"
        onMouseEnter={() => setExpandMenu(true)}
        onMouseLeave={() => setExpandMenu(false)}
      >
        <div className="com-menu-icon">
          {expandMenu ? (
            <div className="com-menu-item">
              <RetractIcon />
              <div
                title="Dashoard"
                onClick={() => {
                  active_and_navigate(
                    "dashboard",
                    `/profile/com-holder/${urlTag}/dashboard`
                  );
                }}
                className={
                  comActiveMenu === "dashboard"
                    ? "com-menu-item-icon-active"
                    : "com-menu-item-icon"
                }
              >
                <DashboardIcon />
              </div>
              <div
                title="Chat"
                onClick={() => {
                  active_and_navigate(
                    "chat",
                    `/profile/com-holder/${urlTag}/chat`
                  );
                }}
                className={
                  comActiveMenu === "chat"
                    ? "com-menu-item-icon-active"
                    : "com-menu-item-icon"
                }
              >
                <ChatIcon />
              </div>
              <div
                title="Resources"
                onClick={() => {
                  active_and_navigate(
                    "resource",
                    `/profile/com-holder/${urlTag}/resource/list`
                  );
                }}
                className={
                  comActiveMenu === "resource"
                    ? "com-menu-item-icon-active"
                    : "com-menu-item-icon"
                }
              >
                <ResourceIcon />
              </div>
            </div>
          ) : (
            <ExpandIcon />
          )}
        </div>
      </div>

      <div className="inner-holder">
        <Outlet />
      </div>
    </div>
  );
}

export default CommunityHolder;
