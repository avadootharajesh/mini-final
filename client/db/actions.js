import { database } from "./dbConfig";
import { auth } from "./dbConfig";

import {
  addDoc,
  doc,
  setDoc,
  documentId,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

export const db = {
  getAuth: () => auth,
  getDatabase: () => database,
  database: database,
  auth: auth,

  addUser: async (user) => {
    try {
      const docRef = doc(database, "users", user.uid);
      const collectionRef = collection(database, "users");

      await addDoc(collectionRef, user);
    } catch (error) {
      throw error;
    }
  },

  addUserWithUID: async (user) => {
    try {
      let { uid, ...userData } = user;

      if (typeof uid === "number") {
        uid = uid.toString();
      }

      const docRef = doc(database, "users", uid);

      await setDoc(docRef, userData);
    } catch (error) {
      throw error;
    }
  },

  getUser: async (uid) => {
    try {
      if (typeof uid === "number") {
        uid = uid.toString();
      }

      const docRef = doc(database, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (error) {
      throw error;
    }
  },

  getusers: async () => {
    try {
      const collectionRef = collection(database, "users");
      const querySnapshot = await getDocs(collectionRef);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      return users;
    } catch (error) {
      throw error;
    }
  },

  addDataToCollection: async (collectionName, data) => {
    try {
      const collectionRef = collection(database, collectionName);
      await addDoc(collectionRef, data);
    } catch (error) {
      throw error;
    }
  },


};
