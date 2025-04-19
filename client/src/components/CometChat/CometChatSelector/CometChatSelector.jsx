import { useEffect, useState } from "react";
import {
  CometChatCallLogs,
  CometChatConversations,
  CometChatGroups,
  CometChatUIKit,
  CometChatUIKitLoginListener,
  CometChatUsers,
} from "@cometchat/chat-uikit-react";
import { CometChatTabs } from "@/CometChatTabs/CometChatTabs";
import { CometChat } from "@cometchat/chat-sdk-javascript";

// CometChatSelector component to handle different chat elements
export const CometChatSelector = (props) => {
  const {
    onSelectorItemClicked = () => {}, // Default callback function
  } = props;

  // State to track the logged-in user
  const [loggedInUser, setLoggedInUser] = useState(null);

  // State to store the currently selected item (Conversation, User, Group, or Call)
  const [activeItem, setActiveItem] = useState();

  // State to track the active tab
  const [activeTab, setActiveTab] = useState("chats");

  // Effect to retrieve the logged-in user on component mount
  useEffect(() => {
    let loggedInUsers = CometChatUIKitLoginListener.getLoggedInUser();
    setLoggedInUser(loggedInUsers);
  }, [CometChatUIKitLoginListener?.getLoggedInUser()]);

  // Function to log out the user
  const logOut = () => {
    CometChatUIKit.logout()
      .then(() => {
        setLoggedInUser(null);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      {loggedInUser && (
        <>
          {/* Render different components based on the active tab */}
          {activeTab == "chats" ? (
            <CometChatConversations
              activeConversation={
                activeItem instanceof CometChat.Conversation
                  ? activeItem
                  : undefined
              }
              onItemClick={(e) => {
                setActiveItem(e);
                onSelectorItemClicked(e, "updateSelectedItem");
              }}
            />
          ) : activeTab == "calls" ? (
            <CometChatCallLogs
              activeCall={activeItem}
              onItemClick={(e) => {
                setActiveItem(e);
                onSelectorItemClicked(e, "updateSelectedItemCall");
              }}
            />
          ) : activeTab == "users" ? (
            <CometChatUsers
              activeUser={activeItem}
              onItemClick={(e) => {
                setActiveItem(e);
                onSelectorItemClicked(e, "updateSelectedItemUser");
              }}
            />
          ) : activeTab == "groups" ? (
            <CometChatGroups
              activeGroup={activeItem}
              onItemClick={(e) => {
                setActiveItem(e);
                onSelectorItemClicked(e, "updateSelectedItemGroup");
              }}
            />
          ) : null}
        </>
      )}
      {/* Render the tabs component for navigation */}
      <CometChatTabs
        activeTab={activeTab}
        onTabClicked={(item) => {
          setActiveTab(item.name.toLowerCase());
        }}
      />
    </>
  );
};
