import React from "react";
import {FormControl, FormGroup, FormLabel, FormText} from "react-bootstrap";

const FieldGroup = props => {
  const { id, label, help, ...rest } = props;
  return (
    <FormGroup controlId={id}>
      <FormLabel>{label}</FormLabel>
      <FormControl {...rest}>
        {help && <FormText>{help}</FormText>}
      </FormControl>
    </FormGroup>
  );
};

export default FieldGroup;
