// store actions

// fetch products

import axios from "axios";


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