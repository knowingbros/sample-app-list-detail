import React from "react";
import "./styles.css";
import {UserBtn, UserBtnSignUp} from "../UserButton/UserButton.styles";

const UnauthenticatedUser = props => {
    const {
        redirectToDummyLusi,
        redirectToSignup,
        redirectToLogin,
    } = props;


    return (
        <div className="unauthenticated-user-links">
            <UserBtn onClick={redirectToLogin} inverted>Login
            </UserBtn>
            {/*<UserButton onClick={redirectToDummyLusi}>Dummy Lusi unauthenticated</UserButton>*/}
            <UserBtnSignUp onClick={redirectToSignup}>Signup</UserBtnSignUp>
        </div>
    );
};

export default UnauthenticatedUser;
