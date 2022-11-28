import React from "react";
import {connect} from "react-redux";

import UserProfileCommentPanel from "../../components/UserProfile/UserProfileCommentPanel";
import {
    getUserProfileCommentPostById,
    getUserProfileCommentsByPostId,
    getUserProfileUsername
} from "../../reducers/userProfile";
import {getAuthUsername} from "../../redux/auth/reducer";

const UserProfileCommentPanelContainer = props => {
    const {commentList, postInfo, username, authUsername} = props;
    return <UserProfileCommentPanel {...{commentList, postInfo, username, authUsername}} />;
};

const mapStateToProps = (state, ownProps) => ({
    commentList: getUserProfileCommentsByPostId(state, ownProps.postPk),
    postInfo: getUserProfileCommentPostById(state, ownProps.postPk),
    username: getUserProfileUsername(state),
    authUsername: getAuthUsername(state),

});

export default connect(mapStateToProps)(UserProfileCommentPanelContainer);
