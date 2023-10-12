import React, { useEffect } from "react";
import "../../styles/homepage/CategoryCard.css";

const CategoryCard = ({
  bgColor,
  topImage,
  firstLine,
  secondLine,
  description,
  featNo,
  textColor
}) => {

  return (
    <div style={{ backgroundColor: `${bgColor}` }} className="div-category-card">
      <div className="icon-bg-circle" style={{ backgroundColor: `${bgColor}` }} />
      <img className="div-card-icon" alt="Div card icon" src={topImage} />
      <div className="heading-link">
        <div className="AI-chat-assistance">
          {firstLine}
          <br />
          {secondLine}
        </div>
      </div>
      <div className="p-card-text">
        <p className="cat-desc">{description}</p>
      </div>
      <div className="span-card-badge" style={{backgroundColor: `${bgColor}`, color: `${textColor}`}}>
        <div className="feat-no">{featNo}</div>
      </div>
    </div>
  );
};

export default CategoryCard;