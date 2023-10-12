import React from "react";
import "../../styles/homepage/stats.css";

export const Stats = () => {

   const listItemsData = [
      {
         statNumber: 385,
         description: "Total Members",
         bgColor: "#1ab79d1a",
         statNumberColor: "#1AB79D"
      },
      {
         statNumber: 15,
         description: "Total Communities",
         bgColor: "#EE49621A",
         statNumberColor: "#EE4962"
      },
      {
         statNumber: 1125,
         description: "Total Downloads",
         bgColor: "#8F57FF1A",
         statNumberColor: "#8F57FF"
      },
      {
         statNumber: 564,
         description: "Total Uploads",
         bgColor: "#F8B7201A",
         statNumberColor: "#F8B720"
      }
   ];

   return (
      <div className="section-stats" id="stats">
         <div className="stats-container">
            <div className="stat-list">
               {
                  listItemsData.map((data, index) =>
                     <ListItem
                        bgColor={data.bgColor}
                        statNumberColor={data.statNumberColor}
                        statNumber={data.statNumber}
                        description={data.description}
                        key={index}
                        className="list-item-instance"
                     />
                  )
               }
            </div>
         </div>
         <div className="stats-divider-right" />
         <div className="thanks-for-support">
            Thank You For All your Support
         </div>
         <div className="stats-divider-left" />
      </div>
   );
};

export const ListItem = ({ bgColor, statNumberColor, statNumber, description }) => {
   return (
      <div className="stat-list-item">
         <div className="div-stats-card" style={{ backgroundColor: bgColor }}>
            <div className="stat-number">
               <div className="stat-number-text" style={{ color: statNumberColor }}>{statNumber}</div>
            </div>
            <div className="stat-desc">
               <div className="student-enrolled">{description}</div>
            </div>
         </div>
      </div>
   )

}

export default Stats;