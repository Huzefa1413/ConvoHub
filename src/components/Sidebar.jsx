import React from "react";
import { useState, useEffect } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

import "./styles/sidebar.css";
import profilepic from "./assets/profile.png";

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let unsubscribe = null;
    const getRealtimeData = async () => {
      const q = query(collection(db, "users"), orderBy("username"));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data() });
        });

        setUsers(users);
      });
    };

    getRealtimeData();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <ul>
        {users.map((eachUser, i) => (
          <li>
            <img src={profilepic} alt="" />
            <span>{eachUser.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
