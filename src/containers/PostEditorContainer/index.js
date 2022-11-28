import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import TextEditor from "../../components/TextEditor";
import {makeUpdatePostRequest} from "../../actions/Posts";
import {getEditPostLoading} from "../../reducers/editPost";

const PostEditorContainer = props => {
  const { handleSubmit, body, loading } = props;

  return (
    <TextEditor
      handleSubmit={handleSubmit}
      placeholder={""}
      initialValue={body}
      usage="update"
      loading={loading}
    />
  );
};

PostEditorContainer.propTypes = {
  onEditorSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  body: PropTypes.string
};

const mapStateToProps = state => ({
  loading: getEditPostLoading(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: async body => {
    try {
      await dispatch(makeUpdatePostRequest(ownProps.pk, body));
    } catch {}
    // Callback to effect some change when submission occurs (like hide the editor)
    ownProps.onEditorSubmitSuccess && ownProps.onEditorSubmitSuccess();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostEditorContainer);
