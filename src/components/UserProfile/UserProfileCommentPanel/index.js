import React from "react";
import PropTypes from "prop-types";
import {FaComment, FaRegCommentAlt} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";

import {POST_DETAIL_URL, SUBREDDIT_URL, USER_PROFILE_URL} from "../../../urls";
import "./styles.css";
import {htmlDecode} from "../../../utilities/htmlUtils";
import {Button, Dropdown} from "react-bootstrap";
import {withMaybe} from "../../../utilities/HOC";
import EllipsisButton from "../../EllipsisButton";

const UserProfileCommentPanel = props => {
    const {commentList, postInfo, username, authUsername} = props;
    let navigate = useNavigate();

    const onPostPanelClick = e => {

        const {
            postInfo: {subreddit_title, pk},
        } = props;

        if (e.target instanceof HTMLDivElement) {
            navigate(POST_DETAIL_URL(subreddit_title, pk));
        }
    };


    const AuthEllipsis = withMaybe(
        props => props.authUsername === props.username
    )(EllipsisButton);

    const comments = commentList.map(comment => (
        <div className="up-comment-panel" key={comment.pk}>
            <div className="up-comment-title-line">
                <Link className="up-ctl-username" to={USER_PROFILE_URL(username)}>
                    {username}
                </Link>
                <span className="up-ctl-points">points: {comment.upvotes}</span>
                <span className="up-dot">{"\u00b7"}</span>
                <span className="up-ctl-created">{comment.created}</span>
            </div>
            <div
                className="up-comment-body"
                dangerouslySetInnerHTML={{__html: comment.body}}
            />

        </div>
    ));

    return (
        <div className="up-comment-post-panel">
            <div className="up-post-panel" onClick={onPostPanelClick}>
                <FaRegCommentAlt className="up-comment-icon"/>
                <div className="up-post-panel-text">
                    <span className="up-postline-username">{username}</span>
                    <span className="up-commented-on">commented on</span>
                    {postInfo.title}
                    <span className="up-dot">{"\u00b7"}</span>
                    <Link
                        className="up-postline-subreddit-link"
                        to={SUBREDDIT_URL(postInfo.subreddit_title)}
                    >
                        r/{postInfo.subreddit_title}
                    </Link>
                    <span className="up-dot">{"\u00b7"}</span>
                    <span className="up-postline-posted-by">
            Posted by:
            <Link
                className="up-postline-username-link"
                to={USER_PROFILE_URL(postInfo.poster_username)}
            >
              u/{postInfo.poster_username}
            </Link>
          </span>
                </div>
            </div>
            {comments}
        </div>
    );
};

UserProfileCommentPanel.propTypes = {
    commentList: PropTypes.arrayOf(
        PropTypes.shape({
            post: PropTypes.number,
            poster: PropTypes.number,
            parent: PropTypes.number,
            body: PropTypes.string,
            upvotes: PropTypes.number,
            pk: PropTypes.number,
            vote_state: PropTypes.number,
            deleted: PropTypes.bool,
            created: PropTypes.string
        })
    ),
    postInfo: PropTypes.shape({
        poster: PropTypes.number,
        created: PropTypes.string,
        updated: PropTypes.string,
        parent: PropTypes.number,
        body: PropTypes.string,
        title: PropTypes.string,
        upvotes: PropTypes.number,
        subreddit: PropTypes.number,
        subreddit_title: PropTypes.string,
        poster_username: PropTypes.string,
        pk: PropTypes.number,
        vote_state: PropTypes.number
    }),
    username: PropTypes.string
};
export default UserProfileCommentPanel;
