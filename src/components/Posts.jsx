import React from "react";
import { useState } from "react";
import moment from "moment";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

import "./styles/posts.css";
import profile from "./assets/profile.png";
import like from "./assets/like.png";
import comment from "./assets/comment.png";
import share from "./assets/share.png";
import edits from "./assets/edit.png";
import bin from "./assets/bin.png";
import updateicon from "./assets/changes.png";

const Posts = (props) => {
  const auth = getAuth();
  const [editText, setEditText] = useState("");
  const [edit, setEdit] = useState(false);
  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  const updatePost = async (postId, editedText) => {
    await updateDoc(doc(db, "posts", postId), {
      text: editedText,
    });
  };

  return (
    <div className="post">
      <div className="posthead">
        <div className="picname">
          <img src={profile} alt="" />
          <div>
            <b>{props.post.userName}</b>
            <p>
              {moment(
                props.post.createdOn?.seconds
                  ? props.post.createdOn?.seconds * 1000
                  : undefined
              ).format("Do MMMM, h:mm a")}
            </p>
          </div>
        </div>
      </div>
      <hr />
      {props.post.text ? (
        <>
          <div className={"postcontent"}>
            {!edit ? (
              <p>{props.post.text}</p>
            ) : (
              <input
                autoFocus
                type="text"
                value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                }}
              />
            )}
          </div>
          <hr />
        </>
      ) : (
        ""
      )}
      {props.post.img ? (
        <>
          <div className="image">
            <img src={props.post.img} alt="" />
          </div>
          <hr />
        </>
      ) : (
        ""
      )}
      {props.post.userId === auth.currentUser.uid ? (
        <div className="buttonbox">
          <button
            onClick={() => {
              deletePost(props.post.id);
            }}
          >
            <img src={bin} alt="delete" />
            Delete
          </button>
          <button
            style={edit ? { display: "none" } : { display: "flex" }}
            onClick={() => {
              setEdit(true);
              setEditText(props.post.text);
            }}
          >
            <img src={edits} alt="edit" />
            Edit
          </button>
          <button
            style={edit ? { display: "flex" } : { display: "none" }}
            onClick={() => {
              setEdit(false);
              props.post.text = editText;
              updatePost(props.post.id, props.post.text);
            }}
          >
            <img src={updateicon} alt="update" />
            Update
          </button>
        </div>
      ) : (
        <div className="buttonbox">
          <button>
            <img src={like} alt="like" />
            Like
          </button>
          <button>
            <img src={comment} alt="comment" />
            Comment
          </button>
          <button>
            <img src={share} alt="share" />
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
