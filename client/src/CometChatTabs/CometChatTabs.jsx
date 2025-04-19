import { useState } from "react";
import "./CometChatTabs.css";

// Define icon paths for tabs
const chatsIcon = "/assets/chats.svg";
const callsIcon = "/assets/calls.svg";
const usersIcon = "/assets/users.svg";
const groupsIcon = "/assets/groups.svg";

// CometChatTabs component to display different tab options
export const CometChatTabs = (props) => {
  const {
    onTabClicked = () => {}, // Default function if no prop is provided
    activeTab,
  } = props;

  // State to track the currently hovered tab
  const [hoverTab, setHoverTab] = useState("");

  // Array of tab items with their respective names and icons
  const tabItems = [
    {
      name: "CHATS",
      icon: chatsIcon, // Icon for Chats tab
    },
    {
      name: "CALLS",
      icon: callsIcon, // Icon for Calls tab
    },
    {
      name: "USERS",
      icon: usersIcon, // Icon for Users tab
    },
    {
      name: "GROUPS",
      icon: groupsIcon, // Icon for Groups tab
    },
  ];

  return (
    <div className="cometchat-tab-component">
      {
        // Loop through tab items and render each tab
        tabItems.map((tabItem) => (
          <div
            key={tabItem.name}
            className="cometchat-tab-component__tab"
            onClick={() => onTabClicked(tabItem)} // Handle tab click event
          >
            {/* Tab Icon */}
            <div
              className={
                activeTab === tabItem.name.toLowerCase() ||
                hoverTab === tabItem.name.toLowerCase()
                  ? "cometchat-tab-component__tab-icon cometchat-tab-component__tab-icon-active"
                  : "cometchat-tab-component__tab-icon"
              }
              style={{
                WebkitMaskImage: `url(${tabItem.icon})`, // Apply mask for Webkit browsers
                maskImage: `url(${tabItem.icon})`, // Standard mask image
              }}
              onMouseEnter={() => setHoverTab(tabItem.name.toLowerCase())} // Track mouse hover
              onMouseLeave={() => setHoverTab("")}
            />
            {/* Tab Text */}
            <div
              className={
                activeTab === tabItem.name.toLowerCase() ||
                hoverTab === tabItem.name.toLowerCase()
                  ? "cometchat-tab-component__tab-text cometchat-tab-component__tab-text-active"
                  : "cometchat-tab-component__tab-text"
              }
              onMouseEnter={() => setHoverTab(tabItem.name.toLowerCase())}
              onMouseLeave={() => setHoverTab("")}>
              {tabItem.name} {/* Display tab name */}
            </div>
          </div>
        ))
      }
    </div>
  );
};
