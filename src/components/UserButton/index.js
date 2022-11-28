import React from "react";
import {Button} from "react-bootstrap";

import "./styles.css";
import {GenericBtn, LoginSignUpGotCommentBtn, SearchNavBarBtn, UserBtn} from "./UserButton.styles";

const UserButton = ({children, onClick, inverted}) => {
    const userButtonId = inverted
        ? "user-button-inverted"
        : "user-button-default";
    return (
        <LoginSignUpGotCommentBtn onClick={onClick} id={userButtonId} className="user-button">
            {children}
        </LoginSignUpGotCommentBtn>
    );
};

export default UserButton;
