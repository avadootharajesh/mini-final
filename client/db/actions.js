import { connectToDatabase } from "./dbConfig";

import User from "./schema/user.schema";
import Chat from "./schema/chat.schema";

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
};
