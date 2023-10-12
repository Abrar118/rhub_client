import React, { useState, useEffect } from 'react';
import "../../styles/profile/my-com.css";
import { AiOutlineSearch } from 'react-icons/ai';
import { HiSortAscending as Ascending, HiSortDescending as Descending } from 'react-icons/hi';
import { motion } from 'framer-motion';
import axios from 'axios';
import CommunityCardHolder from '../homepage/CommunityCardHolder';
import { toast } from 'react-toastify';
import LoadingIcon from "../utility/Loader/LoadingIcon";
import { useNavigate } from 'react-router-dom';

function MyCommunities() {

   const [communities, setCommunities] = useState([]);
   const [sortOption, setSortOption] = useState("rating");
   const [sortOrder, setSortOrder] = useState(-1);
   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate();

   const fetch_coms = async (criteria, order) => {
      const myComTags = JSON.parse(window.localStorage.getItem("currentUser")).community;
      let URL = `http://localhost:3002/get_my_communities/${criteria}/${order}/${JSON.stringify(myComTags)}`;
      if (searchQuery.length > 0) URL += `?tag=${searchQuery}`;

      const response = await axios.get(URL);
      const data = response.data;

      setCommunities(data);
   };

   const showSelectedCom = (selectedTag) => {
      toast.success("Redirecting to selected community...");
      setTimeout(() => {
         navigate(`/profile/com-holder/${selectedTag}/dashboard`);
      }, 500);
   }

   useEffect(() => {
      fetch_coms(sortOption, sortOrder);
   }, [sortOption, sortOrder])

   return (
      <div className='my-community-container'>
         <div className='community-header'>
            Our Communities
         </div>

         <div className='search-bar'>
            <div className="search-input">
               <div className="search-icon"><AiOutlineSearch /></div>
               <input
                  type="text"
                  className="search-input-holder"
                  placeholder='Search communities by tag'
                  onChange={(e) => { setSearchQuery(e.target.value) }}
               />
               <motion.button
                  whileHover={{ scale: 1.04, backgroundColor: "#ee4962" }}
                  whileTap={{ scale: 0.9 }}
                  className="search-community-button"
                  onClick={() => { fetch_coms(sortOption, sortOrder) }}
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
                  onChange={(e) => { setSortOption(e.target.value) }}
               >
                  <option value="rating" className="sort-dropdown-item" >Rating</option>
                  <option value="members" className="sort-dropdown-item" >Member Count</option>
                  <option value="resource" className="sort-dropdown-item" >Available Resources</option>
                  <option value="name" className="sort-dropdown-item" >Name</option>
               </select>
            </div>

            <div className="show-as">
               <div className="show-as-block" onClick={() => { setSortOrder(1) }}><Ascending /></div>
               <div className="show-as-block" onClick={() => { setSortOrder(-1) }}><Descending /></div>
            </div>
         </div>

         <div className="cards-holder">
            {
               communities.length === 0 ? (
                  <LoadingIcon iconSize={"100px"} iconWidth={"83vw"} />
               ) : (communities.map((com, index) =>
                  <motion.div
                     whileHover={{ scale: 1.04, cursor: "pointer" }}
                     whileTap={{ scale: 0.9 }}
                     title={`Go to ${com.name}.`}
                     key={index}
                     onClick={() => { showSelectedCom(com.tag) }}
                  >
                     <CommunityCardHolder
                        communityTag={com.tag}
                        communityBio={com.description}
                        communityRating={com.rating}
                        communityName={com.name}
                        resourceCount={com.resource}
                        memberCount={com.members}
                        communityImage={`${com.com_image}`}
                        hideShowRequest={true}
                     />
                  </motion.div>
               ))
            }
         </div>
      </div>
   )
}

export default MyCommunities;