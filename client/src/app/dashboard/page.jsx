"use client";
import React, { useState, useEffect } from "react";
import { getAuthenticatedUser } from "../../../actions/loginActions";
import SellerDashboard from "./sellerDashboard";
import UserDashboard from "./userDashboard";

const page = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const authenticatedUser = await getAuthenticatedUser();
      setUser(authenticatedUser);
    };
    fetchUser();
  }, []);
  return (
    <>
      {!user || user.userType === "seller" ? (
        <SellerDashboard />
      ) : (
        <UserDashboard />
      )}
    </>
  );
};

export default page;
