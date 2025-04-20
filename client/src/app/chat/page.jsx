"use client";
import React, { useEffect, useState } from "react";
import { getUserByToken, getToken } from "../../../actions/userActions";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

// Dynamically import CometChat component with SSR disabled
const CometChatNoSSR = dynamic(
  () => import("@/components/CometChat/CometChatNoSSR/CometChatNoSSR"),
  { ssr: false }
);

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  let isMounted = true; // Flag to prevent state updates on unmounted component

  useEffect(() => {
    // Check authentication on component mount
    authenticateUser();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const authenticateUser = async () => {
    if (typeof window === "undefined") return;

    try {
      // Get user token from cookies
      const userToken = await getToken("userToken");
      console.log("User token from cookies:", userToken);

      if (!userToken) {
        console.log("No authentication token found");
        if (isMounted) {
          setError("Please log in to access chat");
          setLoading(false);
        }
        return;
      }

      // Get user data using token
      const res = await getUserByToken(userToken, "user");
      console.log("User data:", res.user);

      if (res.success && isMounted) {
        setUser(res.user);
        setLoading(false);
      } else {
        throw new Error(res.message || "Failed to authenticate user");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      if (isMounted) {
        setError("Authentication failed: " + error.message);
        setLoading(false);
      }
    }
  };

  // Render loading state
  if (loading) {
    return <div className="chat-loading">Authenticating user...</div>;
  }

  // Render error state
  if (error) {
    return <div className="chat-error">Error: {error}</div>;
  }

  // Render chat component when user is authenticated
  return (
    <div className="chat-container">
      {user ? (
        <CometChatNoSSR currentUser={user} />
      ) : (
        <div className="chat-unauthorized">
          Please log in to access the chat feature
        </div>
      )}
    </div>
  );
};

export default Page;
