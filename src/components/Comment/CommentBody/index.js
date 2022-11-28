import React, {Component, Fragment} from "react";
import {FaComment, FaCommentAlt} from "react-icons/fa";
import {Button, Dropdown} from "react-bootstrap";
import PropTypes from "prop-types";

import EllipsisButton from "../../EllipsisButton";
import {withMaybe} from "../../../utilities/HOC";
import "./styles.css";
import {htmlDecode} from "../../../utilities/htmlUtils";

function CommentBody(props) {
        const {
            body,
            posterUsername,
            authUsername,
            handleDeleteComment,
            handleToggleReplyEditor,
            handleToggleUpdateEditor
        } = props;


        console.log(`XXXCB CommentBody props body: ${body}`);
        const AuthEllipsis = withMaybe(
            props => props.authUsername === props.posterUsername
        )(EllipsisButton);

        return (
            <Fragment>
                <div
                    className="comment-body-container"
                    dangerouslySetInnerHTML={{__html: body}}
                />
                <div className="comment-links">
                    <div className="comment-icon-and-button">
                        <div className="comment-icon">
                            <FaCommentAlt/>
                        </div>
                        <Button
                            size="sm"
                            className="comment-buttons"
                            onClick={handleToggleReplyEditor}
                        >
                            Reply
                        </Button>
                    </div>
                    <AuthEllipsis
                        {...{
                            authUsername,
                            posterUsername
                        }}
                    >
                        <Dropdown.Item eventKey={1} onClick={handleToggleUpdateEditor}>
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={2} onClick={handleDeleteComment}>
                            Delete
                        </Dropdown.Item>
                    </AuthEllipsis>
                </div>
            </Fragment>
        );
}

CommentBody.propTypes = {
    body: PropTypes.string,
    posterUsername: PropTypes.string,
    authUsername: PropTypes.string,
    handleDeleteComment: PropTypes.func,
    handleToggleReplyEditor: PropTypes.func,
    handleToggleUpdateEditor: PropTypes.func
};

export default CommentBody;
