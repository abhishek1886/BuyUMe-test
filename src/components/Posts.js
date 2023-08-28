import React, { Fragment, useEffect, useState } from "react";
import Card from "../ui/Card";
import classes from "./Posts.module.css";
import PostsData from "./PostsData";

const Posts = () => {
  const [inputData, setInputData] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [postData, setPostData] = useState(null);

  const inputChangeHandler = (e) => {
    setInputData(e.target.value);
  };

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

  const filteredDataHandler = (e) => {
    setShowAll(false);
    const filteredData = posts.filter(
      (post) => post.title.toLowerCase().indexOf(inputData.toLowerCase()) >= 0
    );

    setFilteredPosts(filteredData);
  };
  
  const showDataHandler = (post) => {
    setPostData(post);
  }

  let filteredItemList = <p>No search results.</p>
  if(filteredPosts.length > 0){
    filteredItemList = filteredPosts.map(post => (
      <li key={post.id} className={classes.listItem} onClick={() => showDataHandler(post)} >
        {post.title}
      </li>
    ))
  }
  const filteredPostList = posts.map((post) => (
    <li key={post.id} className={classes.listItem} onClick={() => showDataHandler(post)} >
        {post.title}
      </li>
  ))
  

  return (
    <Fragment>
      <Card>
        <div className={classes.inputQuery}>
          <label htmlFor="searchQuery">Enter Title: </label>
          <input
            id="searchQuery"
            value={inputData}
            onChange={inputChangeHandler}
          />
          <div className={classes.action}>
            <button onClick={filteredDataHandler}>Search</button>
            <button onClick={() => setShowAll(true)}>Show All</button>
          </div>
        </div>
      </Card>
      <Card>
        {!postData && <ul className={classes.list}>
          {!showAll ? filteredItemList : filteredPostList}
        </ul>}
        {postData && <PostsData post={postData} onGoBack={setPostData} />}
      </Card>
    </Fragment>
  );
};

export default Posts;
