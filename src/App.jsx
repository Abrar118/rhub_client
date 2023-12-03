import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signal } from "@preact/signals-react";
import "./index.css";

import Homepage from "./components/homepage/homepage";
import MyProfile from "./components/profile/Myprofile";
import Navbar from "./components/navbar";
import About from "./components/about";
import GeneralInfo from "./components/profile/GeneralInfo";
import EditProfile from "./components/profile/EditProfile";
import AllCommunity from "./components/community/AllCommunity";
import MyCommunities from "./components/profile/MyCommunities";
import CommunityHolder from "./components/community/CommunityHolder";
import ComDash from "./components/community/ComDash";
import ComChat from "./components/community/ComChat";
import ComRes, { ActiveResource } from "./components/community/ComRes";
import EmailVerify from "./components/EmailVerify";
import Bookmark from "./components/profile/Bookmark";
import Chat from "./components/Chat/chat";
import ProfileNotification from "./components/profile/ProfileNotification";
import ChangePass from "./components/profile/ChangePass";
import MyPersonalUploads from "./components/profile/MyUploads";

export const logoBlack = signal(
  "https://res.cloudinary.com/da8v9ysli/image/upload/v1697061060/msthqidxbbfavh8lpczp.svg"
);

const App = () => {
  const mainStyle = {
    width: "98.98vw",
    overflow: "hidden",
    position: "relative",
  };

  const [headerStyle, setHeaderStyle] = useState({
    position: "relative",
    zIndex: 4,
  });

  return (
    <div className="bg-cover overflow-hidden bg-no-repeat">
      <div style={headerStyle}>
        <Navbar />
      </div>
      <div style={mainStyle}>
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route path="/allCommunities" element={<AllCommunity />} />
          <Route path="/profile" element={<MyProfile />}>
            <Route path="info" element={<GeneralInfo />} />
            <Route path="change-pass" element={<ChangePass />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="my-commnunities" element={<MyCommunities />} />
            <Route path="my-uploads" element={<MyPersonalUploads />} />
            <Route path="notification" element={<ProfileNotification />} />
            <Route path="inbox" element={<MyProfile />} />
            <Route path="help" element={<MyProfile />} />
            <Route path="com-holder" element={<CommunityHolder />}>
              <Route path=":tag/dashboard" element={<ComDash />} />
              <Route path=":tag/chat" element={<ComChat />} />
              <Route path=":tag/resource">
                <Route path="list" element={<ComRes />} />
                <Route path=":name/res-item" element={<ActiveResource />} />
              </Route>
            </Route>
          </Route>
          <Route path="/verify">
            <Route path=":email/auth" element={<EmailVerify />} />
          </Route>
        </Routes>
      </div>

      <About />

      <Chat />

      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
