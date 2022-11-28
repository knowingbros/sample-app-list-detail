import React from 'react';
import {Button} from 'react-bootstrap';
import {CircleLoader} from 'react-spinners';

import './styles.css'
import {GenericAccountBtn, GenericBtn} from "../../UserButton/UserButton.styles";

const FormButton = (props) => {
  
  const {
    bsStyle,
    handleClick,
    loading,
    children,
    type,
  } = props;
  
  const spinnerStyle = 'display: inline-block;'
  
  const spinner = loading ?
    <CircleLoader
      size={20}
      className={spinnerStyle}
    /> :
    null;

  return (
    <div id='single-button'>
      <GenericAccountBtn
        onClick={() => handleClick()}
        disabled={loading}
        type={type || 'button'}
      >
        {spinner ? spinner : children}
      </GenericAccountBtn>
    </div>
  );
}

export default FormButton;
