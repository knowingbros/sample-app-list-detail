import React from "react";
import PropTypes from "prop-types";
import {Button, Dropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

import VoterContainer from "../../containers/VoterContainer";
import EllipsisButton from "../EllipsisButton";
import ShareButton from "../ShareButton";
import {withMaybe} from "../../utilities/HOC";
import {POST_DETAIL_URL, USER_PROFILE_URL} from "../../urls";
import "./styles.css";
import alert from "../../redux/alert/actions";
import {useDispatch} from "react-redux";

function PostPanel(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const handlePanelClick = e => {
        const {subredditTitle, pk, history} = props;

        if (e.target instanceof HTMLDivElement) {
            navigate(POST_DETAIL_URL(subredditTitle, pk));
        }
    };

    const handleDelete = async () => {

        let value = prompt(
            'Please enter "DELETE" to confirm deletion.'
        );

        if (value === "DELETE") {
            // Make sure the post is actually deleted before rerouting which
            // causes the list to reload
            dispatch(alert('Post is deleted', 'success'))
            handleDeletePost();
        } else {
            dispatch(alert('Delete operation is cancelled.', 'info'))
        }
    }


    const handleShowEditPost = e => {
        // show the post editor and then switch to the post detail page
        const {
            subredditTitle,
            pk,
            togglePostEditor,
            showPostEditor,
            history
        } = props;

        if (!showPostEditor) {
            togglePostEditor();
        }

        navigate(POST_DETAIL_URL(subredditTitle, pk));
    };

    const {
        upvotes,
        engtitletranslation,
        pk,
        title,
        subredditTitle,
        posterUsername,
        authUsername,
        created,
        voteDisplayState,
        handleDeletePost
    } = props;

    const AuthEllipsis = withMaybe(props => props.showEllipsis)(EllipsisButton);

    return (
        <div className="post-segment-panel" onClick={handlePanelClick}>
            <div className="voter-container">
                <VoterContainer
                    upvotes={upvotes}
                    voteDisplayState={voteDisplayState || 0}
                    itemType={"post"}
                    itemPk={pk}
                />
            </div>

            <div className="post-segment-text-container">
                <div className="post-segment-title">
                    <Link
                        className="post-title"
                        to={"/r/" + subredditTitle + "/post-detail/" + pk}
                    >
                        {title}
                    </Link>
                </div>
                {/*<div className="post-segment-engtitletranslation">*/}
                {/*    Translation: {engtitletranslation}*/}
                {/*</div>*/}

                <div className="post-segment-info">
                    <Link className="pp-subreddit-link" to={`/r/${subredditTitle}`}>
                        r/{subredditTitle}
                    </Link>
                    - posted by:
                    <Link
                        className="pp-user-profile-link"
                        to={USER_PROFILE_URL(posterUsername)}
                    >
                        u/{posterUsername}
                    </Link>
                    {created}
                </div>

                <div className="post-segment-links">
                    <Link to={`/r/${subredditTitle}/post-detail/${pk}/comments`}>
                        <Button size="sm" className="post-buttons">
                            Comments
                        </Button>
                    </Link>

                    <ShareButton shareUrl={`${window.location}r/${subredditTitle}/post-detail/${pk}`}/>

                    <div className="post-segment-ellipsis-container">
                        <AuthEllipsis showEllipsis={authUsername === posterUsername}>

                            <Dropdown.Item eventKey={1} onClick={handleShowEditPost}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item eventKey={2} onClick={handleDelete}>
                                Delete
                            </Dropdown.Item>
                        </AuthEllipsis>
                    </div>
                </div>
            </div>
        </div>
    );
}

PostPanel.propTypes = {
    upvotes: PropTypes.number,
    engtitletranslation: PropTypes.string,
    pk: PropTypes.number,
    title: PropTypes.string,
    subredditTitle: PropTypes.string,
    posterUsername: PropTypes.string,
    authUsername: PropTypes.string,
    created: PropTypes.string,
    voteDisplayState: PropTypes.number,
    handleDeletePost: PropTypes.func
};

export default PostPanel;
