// store actions

// fetch products

import axios from "axios";
// import { db } from "../db/actions";


export const fetchProducts = async () => {
    try {

        const products = await axios.get("/api/product");
        console.log("Products:", products.data.data);
        return products.data.data;

    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
}   

export const addReviewToDatabase = async (review) => {
    try {
        // console.log("Review:", review);
        const result = await axios.post("/api/review", review);
        return result;
    } catch (error) {
        return error;
    }
}