import React from "react";
import classes from "./PostsData.module.css";
import { Button } from "../ui";

const PostsData = (props) => {
  const { post } = props;

  return (
    <>
      <Button onClick={() => props.onGoBack(null)}>Go Back</Button>
      <div className={classes.postData}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </>
  );
};

export default PostsData;
