import React from "react";
import PropTypes from "prop-types";

import PostPanelContainer from "../../containers/PostPanelContainer";
import { ErrorAlert } from "../AlertMessage";
import { PanelListLoader } from "../Loaders";
import NextPageLoaderContainer from "../../containers/NextPageLoaderContainer";
import EmptyPostList from "./EmptyPostList";
import "./styles.css";
import { GenericBtn } from "../UserButton/UserButton.styles";
import { useNavigate } from "react-router-dom";

const PostList = (props) => {
  console.log(`XXXPST PostList: ${props}`);
  console.log(`XXXPST PostList stringify: ${JSON.stringify(props)}`);
  const {
    loading,
    error,
    allPosts,
    emptyListMessage = undefined,
    showNextPageLoader = true,
    subredditTitle,
  } = props;

  let navigate = useNavigate();
  if (error) {
    return <ErrorAlert>{error}</ErrorAlert>;
  }
  let allButton;
  let createPostButton;
  let postList;
  if (loading) {
    postList = <PanelListLoader panelNumber={12} />;
  } else if (allPosts.length === 0) {
    if (subredditTitle) {
      if (
        subredditTitle.toLowerCase() === "home" ||
        subredditTitle.toLowerCase() === "popular"
      ) {
        allButton = (
          <GenericBtn
            onClick={() => {
              return navigate(`/r/all`);
            }}
          >
            🖱️ Go to /r/all to check out all the posts!
          </GenericBtn>
        );
      } else if (subredditTitle.toLowerCase() === "all") {
        allButton = (
          <GenericBtn
            onClick={() => {
              return navigate(`/create-topic`);
            }}
          >
            🖱️ No posts here! Create a topic to start posting!
          </GenericBtn>
        );
      } else {
        allButton = (
          <GenericBtn
            onClick={() => {
              return navigate(`/r/all`);
            }}
          >
            🖱️ Go to /r/all to check out all the posts!
          </GenericBtn>
        );
        createPostButton = (
          <GenericBtn
            onClick={() => {
              return navigate(`/r/${subredditTitle}/create-post`);
            }}
          >
            📝️ Create a post in this topic!
          </GenericBtn>
        );
      }
    }

    postList = <EmptyPostList message={emptyListMessage} />;
  } else {
    const postPanels = allPosts.map((postPk) => {
      return <PostPanelContainer postPk={postPk} key={postPk} />;
    });

    postList = (
      <ul>
        {postPanels}
        {showNextPageLoader ? (
          <NextPageLoaderContainer usage="postList" />
        ) : null}
      </ul>
    );
  }

  return (
    <div>
      {allButton}
      {createPostButton}
      {postList}
    </div>
  );
};

PostList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  allPosts: PropTypes.arrayOf(PropTypes.number),
  emptyListMessage: PropTypes.string,
  showNextPageLoader: PropTypes.bool,
};

export default PostList;
