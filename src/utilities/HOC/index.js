import React from 'react';
import alert from "../../redux/alert/actions";
import {CREATE_POST_URL} from "../../urls";

export const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
    conditionalRenderingFn(props)
        ? <EitherComponent {...props}/>
        : <Component {...props}/>

export const withMaybe = (conditionalRenderingFn) => (Component) => (props) =>
    conditionalRenderingFn(props)
        ? <Component {...props} />
        : null

