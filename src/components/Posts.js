import React, { Fragment, useEffect, useRef, useState } from "react";

import { Button, Card } from "../ui";
import classes from "./Posts.module.css";
import PostsData from "./PostsData";

const Posts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();
      setPosts(data);
    };
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const searchHandler = (e) => {
    setShowAll(false);
    setPostData(null);
    const filteredData = posts.filter(
      (post) => post.title.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
    );

    setFilteredPosts(filteredData);
  };

  let filteredPostList = <p>No search results.</p>;
  if (filteredPosts.length > 0) {
    filteredPostList = filteredPosts.map((post) => (
      <li
        key={post.id}
        className={classes.listItem}
        onClick={() => setPostData(post)}
      >
        {post.title}
      </li>
    ));
  }

  const postList = posts.map((post) => (
    <li
      key={post.id}
      className={classes.listItem}
      onClick={() => setPostData(post)}
    >
      {post.title}
    </li>
  ));

  return (
    <Fragment>
      <Card>
        <div className={classes.inputQuery}>
          <label htmlFor="searchQuery">Enter Title: </label>
          <input
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={classes.action}>
            <Button onClick={searchHandler}>Search</Button>
          </div>
        </div>
      </Card>
      <Card>
        {!postData && (
          <ul className={classes.list}>
            {!showAll ? filteredPostList : postList}
          </ul>
        )}
        {postData && <PostsData post={postData} onGoBack={setPostData} />}
      </Card>
    </Fragment>
  );
};

export default Posts;
