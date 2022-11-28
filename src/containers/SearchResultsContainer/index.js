import React, {Component} from "react";
import {connect} from "react-redux";

import SearchResults from "../../components/SearchResults";
import {makeSearchRequest, setSearchResultsView} from "../../actions/Search";
import {getAllPosts} from "../../reducers/postList";
import {
    getSearchAllSubreddits,
    getSearchAllUsers,
    getSearchError,
    getSearchLoading,
    getSearchQuery,
    getSearchResultsView
} from "../../reducers/search";

class SearchResultsContainer extends Component {
  componentDidMount() {
    this.props.searchRequest(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.props.searchRequest(this.props.query);
    }
  }

  render() {
    const {
      allPosts,
      allSubreddits,
      allUsers,
      error,
      loading,
      query,
      resultsView,
      changeResultsView
    } = this.props;

    return (
      <SearchResults
        {...{
          allPosts,
          allSubreddits,
          allUsers,
          loading,
          error,
          query,
          resultsView,
          changeResultsView
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  query: getSearchQuery(state),
  allPosts: getAllPosts(state),
  allSubreddits: getSearchAllSubreddits(state),
  allUsers: getSearchAllUsers(state),
  error: getSearchError(state),
  loading: getSearchLoading(state),
  resultsView: getSearchResultsView(state)
});

const mapDispatchToProps = dispatch => ({
  searchRequest: q => dispatch(makeSearchRequest(q)),
  changeResultsView: view => dispatch(setSearchResultsView(view))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsContainer);
