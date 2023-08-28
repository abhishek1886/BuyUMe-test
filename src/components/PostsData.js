import React from "react";
import classes from "./PostsData.module.css";

const PostsData = (props) => {
  const { post } = props;

  return (
    <div className={classes.postData}>
      <button onClick={() => props.onGoBack(null)}>Go Back</button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostsData;
