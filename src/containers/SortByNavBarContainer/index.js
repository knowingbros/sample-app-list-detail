import React from "react";
import {connect} from "react-redux";

import SortByNavBar from "../../components/SortByNavBar";
import {getCurrentSortOption} from "../../reducers/sortBy";
import {updateSortByOption} from "../../actions/SortBy";

const SortByNavBarContainer = props => {
  const { currentSortOption, handleSortUpdate } = props;
  return <SortByNavBar {...{ currentSortOption, handleSortUpdate }} />;
};

const mapStateToProps = state => ({
  currentSortOption: getCurrentSortOption(state)
});

const mapDispatchToProps = dispatch => ({
  handleSortUpdate: option => dispatch(updateSortByOption(option))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortByNavBarContainer);
