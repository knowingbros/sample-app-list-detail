import React from "react";
import PropTypes from "prop-types";

import PostList from "../PostList";
import SubredditList from "../SubredditList";
import NavSelectorButton from "../Buttons/NavSelectorButton";
import {withEither} from "../../utilities/HOC";
import "./styles.css";

const SearchResults = props => {
    const {
        allPosts,
        allSubreddits,
        allUsers,
        loading,
        error,
        query,
        resultsView,
        changeResultsView
    } = props;

    const emptyListMessage = "Sorry! No results found.";

    const c1 = withEither(props => props.view === "users", () => null);

    const c2 = withEither(props => props.view === "subreddits", SubredditList);

    const ConditionalResultsList = c1(c2(PostList));

    // const ConditionalResultsList = compose(
    //     withEither(props => props.view === "users", () => null),
    //     withEither(props => props.view === "subreddits", SubredditList)
    // )(PostList);

    return (
        <div className="search-results-container">
            <div className="search-navbar">
                <div className="search-query-name">
                    <h2>Search results for: "{query}"</h2>
                </div>

                <div className="search-view-selector">
                    <NavSelectorButton
                        active={resultsView === "posts"}
                        onClick={() => changeResultsView("posts")}
                    >
                        Posts
                    </NavSelectorButton>

                    <NavSelectorButton
                        active={resultsView === "subreddits"}
                        onClick={() => changeResultsView("subreddits")}
                    >
                        Topics
                    </NavSelectorButton>

                    {/*
          <NavSelectorButton
            active={resultsView === "users"}
            onClick={() => changeResultsView("users")}
          >

            Users
          </NavSelectorButton>
          */}
                </div>
            </div>

            <div className="results-list-container">
                <ConditionalResultsList
                    {...{
                        allPosts,
                        allSubreddits,
                        allUsers,
                        error,
                        loading,
                        emptyListMessage
                    }}
                    view={resultsView}
                />
            </div>
        </div>
    );
};

SearchResults.propTypes = {
    allPosts: PropTypes.arrayOf(PropTypes.number),
    allSubreddits: PropTypes.arrayOf(PropTypes.number),
    allUsers: PropTypes.arrayOf(PropTypes.number),
    loading: PropTypes.bool,
    error: PropTypes.string,
    query: PropTypes.string,
    resultsView: PropTypes.string,
    changeResultsView: PropTypes.func
};

export default SearchResults;
