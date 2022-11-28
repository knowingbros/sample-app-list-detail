import React from "react";
import {connect} from "react-redux";

import TextEditor from "../../components/TextEditor";
import UnauthenticatedTextEditorContainer from "../UnauthenticatedTextEditorContainer";
import {getAuthUsername} from "../../redux/auth/reducer";

const TextEditorContainer = props => {
  const { userAuthName, ...rest } = props;

  return (
      <>
        {userAuthName ? (
            <TextEditor {...rest} />
        ) : (
            <UnauthenticatedTextEditorContainer />
        )}
      </>
  );
};

const mapStateToProps = state => ({
  userAuthName: getAuthUsername(state),
});

export default connect(mapStateToProps)(TextEditorContainer);
