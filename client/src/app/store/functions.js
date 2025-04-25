'use client';

// buy now and add to cart functions here
// [errMessage, setErrorMessage]

import React, { useState, useEffect, useRef } from "react";

// navigator router
import { useRouter } from "next/navigation";
import axios from "axios";

import { toast } from "react-hot-toast";

export const buyNow = (product) => {};

export const addToCart = (userId, productId) => {
  try {
    axios.post("/api/cart", {
        userId,
        productId
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = (userId, productId) => {};

export const clearCart = (userId) => {};

export const getCartSize = async (userId) => {
  try {
    const response = await axios.post("/api/cart/size", { userId });
    return response.data.data;
  } catch (error) {
    return 0;
  }
};
