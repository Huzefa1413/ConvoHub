import React from 'react';
import { useState, useEffect } from 'react';

import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import Posts from './Posts.jsx';
import './styles/profile.css';
import profilepic from './assets/profile.png';
import coverpic from './assets/bg.jpg';

const Profile = () => {
  const auth = getAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let unsubscribe = null;
    const getRealtimeData = async () => {
      const q = query(collection(db, 'posts'), orderBy('createdOn', 'desc'));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          if (
            doc._document.data.value.mapValue.fields.userId.stringValue ===
            auth.currentUser.uid
          ) {
            posts.push({ id: doc.id, ...doc.data() });
          }
        });

        setPosts(posts);
      });
    };

    getRealtimeData();

    return () => {
      unsubscribe();
    };
  }, [auth.currentUser.uid]);
  return (
    <>
      <div className="maindiv">
        <div className="coverPicture">
          <img src={coverpic} alt="" />
        </div>
        <div className="profilePicture">
          <img src={profilepic} id="profpic" alt="" />
        </div>
        <div className="userName">{auth?.currentUser?.displayName}</div>
      </div>
      {posts.map((eachPost, i) => (
        <Posts key={i} post={eachPost} />
      ))}
    </>
  );
};

export default Profile;
