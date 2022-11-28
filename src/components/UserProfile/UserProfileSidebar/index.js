import React from "react";
import PropTypes from "prop-types";

import "./styles.css";
import {Link} from "react-router-dom";
import {USER_PROFILE_URL} from "../../../urls";
import {MdCake} from "react-icons/md";
import {UPINFOMATIONSIDEBAR} from "../../UserButton/UserButton.styles";

const UserProfileSidebar = props => {
    const {username, cakeDay, karma} = props;

    return (
        <div >
            <UPINFOMATIONSIDEBAR  >
                {/*<div id="top-color" />*/}
                <div>
                    <h2>User Profile</h2>
                    <Link to={USER_PROFILE_URL(username)}>{`u/${username}`}</Link>
                    <div >
                        {/*<div id="up-karma">*/}
                        {/*  <p>Karma</p>*/}
                        {/*  <p>*/}
                        {/*    <MdStars id="up-info-icon" />*/}
                        {/*    {karma}*/}
                        {/*  </p>*/}
                        {/*</div>*/}
                        <div >
                            <p>Cake Day</p>
                            <p>
                                <MdCake id="up-info-icon"/>
                                {cakeDay}
                            </p>
                        </div>
                    </div>
                </div>
            </UPINFOMATIONSIDEBAR>
        </div>
    );
};

UserProfileSidebar.propTypes = {
    username: PropTypes.string,
    cakeDay: PropTypes.string,
    karma: PropTypes.number
};

export default UserProfileSidebar;
