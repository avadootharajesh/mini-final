import { connectToDatabase } from "./dbConfig";

import User from "./schema/user.schema";
// import Chat from "./schema/chat";
import Seller from "./schema/seller.schema";
import Product from "./schema/product.schema";

export const db = {
  addUser: async (data) => {
    try {
      await connectToDatabase();
      const result = await User.create(data);
      // new User({...}) + save = create
      return result;
    } catch (error) {
      throw error;
    }
  },

  addSeller: async (data) => {
    try {
      await connectToDatabase();
      const result = await Seller.create(data);
      // new User({...}) + save = create
      return result;
    } catch (error) {
      throw error;
    }
  },

  sendChat: async (data) => {
    try {
      await connectToDatabase();
      const result = await Chat.create(data);
      // new User({...}) + save = create
      return result;
    } catch (error) {
      throw error;
    }
  },

  // add product
  addProduct: async (data) => {
    try {
      await connectToDatabase();
      const result = await Product.create(data);
      // new User({...}) + save = create
      return result;
    } catch (error) {
      throw error;
    }
  },

  getProducts: async () => {
    try {
      await connectToDatabase();
      const result = await Product.find({}).populate("owner");
      // new User({...}) + save = create
      return result;
    } catch (error) {
      throw error;
    }
  }

};
