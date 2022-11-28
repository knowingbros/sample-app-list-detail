import React, {Component} from 'react';
import {connect} from 'react-redux';

import DummyLusi from '../../components/DummyLusi';
import {makeDummyLusiRequest} from '../../actions/Subreddit';
import {getDummyLusiError, getDummyLusiLoading,} from '../../reducers/dummyLusi';


class DummyLusiContainer extends Component {
  
  render() {
    const {
      errorMessage,
      loading,
      handleDummyLusi,
    } = this.props;
    
    return (
      <DummyLusi {...{
        errorMessage,
        loading,
        handleDummyLusi,
      }}/>
    )
  }
}

const mapStateToProps = (state) => ({
  errorMessage: getDummyLusiError(state),
  loading: getDummyLusiLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleDummyLusi: (subredditData) =>
    dispatch(makeDummyLusiRequest(subredditData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DummyLusiContainer);
