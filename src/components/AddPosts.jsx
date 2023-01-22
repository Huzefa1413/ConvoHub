import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

import Posts from "./Posts.jsx";
import "./styles/addpost.css";
import profile from "./assets/profile.png";
import photos from "./assets/photos.png";
import post from "./assets/post.png";

const AddPosts = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const savePost = async (e) => {
    e.preventDefault();
    if (postText === "" && image === null) {
      swal(
        "Incomplete Data",
        "Please Write Something to Post OR Add Image to upload",
        "warning"
      );
    } else {
      setIsLoading(true);
      if (image === null) {
        document.getElementById("postinput").value = "";
        try {
          await addDoc(collection(db, "posts"), {
            text: postText,
            createdOn: serverTimestamp(),
            userId: auth.currentUser.uid,
            userName: auth.currentUser.displayName,
          });
          setIsLoading(false);
        } catch (e) {
          console.error("Error adding document: ", e);
          setIsLoading(false);
        }
        setPostText("");
      } else {
        if (image.type.slice(0, 5) === "image") {
          document.getElementById("postinput").value = "";
          document.getElementById("image").value = "";
          const cloudinaryData = new FormData();
          cloudinaryData.append("file", image);
          cloudinaryData.append("upload_preset", "myFacebookPictures");
          cloudinaryData.append("cloud_name", "huzefa");
          axios
            .post(
              `https://api.cloudinary.com/v1_1/huzefa/image/upload`,
              cloudinaryData,
              { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then(async (res) => {
              try {
                await addDoc(collection(db, "posts"), {
                  text: postText,
                  createdOn: serverTimestamp(),
                  img: res?.data?.url,
                  userId: auth.currentUser.uid,
                  userName: auth.currentUser.displayName,
                });
                setIsLoading(false);
              } catch (e) {
                console.error("Error adding document: ", e);
                setIsLoading(false);
              }
            });
          setImage(null);
          setPostText("");
        } else {
          swal(
            "Invalid Image",
            "Only Images are allowed to upload!",
            "warning"
          );
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    let unsubscribe = null;
    const getRealtimeData = async () => {
      const q = query(collection(db, "posts"), orderBy("createdOn", "desc"));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });

        setPosts(posts);
      });
    };

    getRealtimeData();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="rightbar">
      <div className="addpost">
        <div className="top">
          <img src={profile} alt="" />
          <input
            id="postinput"
            type="text"
            placeholder="What's on your mind?"
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
        </div>
        <hr />

        <div className="bottom">
          <div className="button">
            <img src={photos} alt="" />
            <input
              type="file"
              id="image"
              onChange={(e) => {
                setImage(e.currentTarget.files[0]);
              }}
            />
          </div>
          {!isLoading ? (
            <div className="button" onClick={savePost}>
              <img src={post} alt="" />
              <p>Post</p>
            </div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      </div>
      {posts.map((eachPost, i) => (
        <Posts key={i} post={eachPost} />
      ))}
    </div>
  );
};

export default AddPosts;
