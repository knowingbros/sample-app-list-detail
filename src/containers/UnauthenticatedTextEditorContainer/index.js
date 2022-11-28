import React from "react";
import {connect} from "react-redux";

import UnauthenticatedTextEditor from "../../components/TextEditor/UnauthenticatedTextEditor";

const UnauthenticatedTextEditorContainer = props => {

  return <UnauthenticatedTextEditor {...{  }} />;
};

export default connect(
  null,
  null
)(UnauthenticatedTextEditorContainer);
