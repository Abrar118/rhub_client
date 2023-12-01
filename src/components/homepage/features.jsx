import React from "react";
import CategoryCard from "./CategoryCard";
import "../../styles/homepage/features.css";
import feat1 from "../../assets/feat1.svg";
import feat2 from "../../assets/feat2.svg";
import feat3 from "../../assets/feat3.svg";
import feat4 from "../../assets/feat4.svg";

function Features() {
  return (
    <div className="section-features" id="features">
      <div className="feature-container">
        <div className="feat-overlap-group">
          <div className="feature-upper-title">
            <div className="features">FEATURES</div>
          </div>
          <div className="feature-heading">
            <div className="feat-left-text">Share</div>
            <div className="feat-green">Resources</div>
            <div className="feat-right-text">online and interact with AI</div>
          </div>
          <div className="feature-subtile">
            <div className="subsub">
              Our platform offers the following features to its users
            </div>
          </div>
        </div>
        <div className="feature-list">
          <CategoryCard
            bgColor="rgb(26,183,157,10%)"
            topImage={feat1}
            firstLine="AI Chat"
            secondLine="Assistance"
            description="Get help and suggestions from your very own AI chat assistant."
            featNo="FEAT 1"
            textColor="rgb(26,183,157)"
          />
          <CategoryCard
            bgColor="rgb(238,73,98,10%)"
            topImage={feat2}
            firstLine="Resource Sharing"
            secondLine="with peers"
            description="Share different kinds of content with your community."
            featNo="FEAT 2"
            textColor="rgb(238,73,98)"
          />
          <CategoryCard
            bgColor="rgb(68,97,228,10%)"
            topImage={feat3}
            firstLine="Interactive"
            secondLine="Communities"
            description="Connect with your own peer groups to share knowledge."
            featNo="FEAT 3"
            textColor="rgb(68,97,228)"
          />
          <CategoryCard
            bgColor="rgb(248,183,32,10%)"
            topImage={feat4}
            firstLine="Personalized"
            secondLine="Profiles"
            description="Customize your profile and bookmark the materials as per your need."
            featNo="FEAT 4"
            textColor="rgb(248,183,32)"
          />
        </div>
      </div>
    </div>
  );
}

export default Features;
