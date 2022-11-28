import React from 'react';
import {Alert} from 'react-bootstrap';
import {FaCheck, FaInfo, FaTimes} from 'react-icons/fa';

import {withMaybe} from '../../utilities/HOC';
import './styles.css';

export const SuccessAlert = (props) => (
  <Alert bsStyle='success' className='alert-message'>
    <FaCheck color='green' size='3em' />
    <p className="alert-text" id='success-text' align='center'>
      {props.children}
    </p>
  </Alert>
)

export const InfoAlert = (props) => (
    <Alert bsStyle='info' className='alert-message'>
        <FaInfo color='#4d4d4d' size='3em' />
        <p className="alert-text" id='info-text' align='center'>
            {props.children}
        </p>
    </Alert>
)


export const ErrorAlert = (props) => (
  <Alert bsStyle='danger' className='alert-message'>
    <FaTimes color='red' size='3em' />
    <p className="alert-text" id='error-text' align='center'>
      {props.children}
    </p>
  </Alert>
)

export const ErrorAlertWithError = withMaybe(
    (props) => props.children
  )(ErrorAlert);
