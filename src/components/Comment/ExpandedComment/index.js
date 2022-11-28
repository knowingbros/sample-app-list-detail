import React, {useState} from "react";

import "./styles.css";
import CommentEditorContainer from "../../../containers/CommentEditorContainer";
import CommentInfoLine from "../CommentInfoLine";
import CommentBody from "../CommentBody";
import VoterContainer from "../../../containers/VoterContainer";
import {withEither, withMaybe} from "../../../utilities/HOC";

function ExpandedComment(props) {

    const [showReplyEditor, setshowReplyEditor] = useState(false);
    const [showUpdateEditor, setShowUpdateEditor] = useState(false);


    function handleToggleReplyEditor() {
        setshowReplyEditor(!showReplyEditor);
    }

    function handleToggleUpdateEditor() {
        setShowUpdateEditor(!showUpdateEditor);
    }

    const {
        childrenList,
        body,
        posterUsername,
        authUsername,
        upvotes,
        created,
        pk,
        voteDisplayState,
        deleted,
        handleToggleCollapse: handleCollapse,
        handleDeleteComment
    } = props;

    const ReplyEditorWithHide = withMaybe(props => props.showEditor)(
        CommentEditorContainer
    );

    const c1 = withMaybe(props => !props.deleted);
    const c2 = withEither(props => props.showUpdateEditor, CommentEditorContainer);

    const CommentBodyWithDeleteAndUpdateEditor = c1(c2(CommentBody));
    //
    // const CommentBodyWithDeleteAndUpdateEditor = compose(
    //   withMaybe(props => !props.deleted),
    //   withEither(props => props.showUpdateEditor, CommentEditorContainer)
    // )(CommentBody);

    return (
        <div className="comment-tree-content">
            <div className="comment-voter-collapser">
                {deleted || (
                    <VoterContainer
                        voteDisplayState={voteDisplayState}
                        itemType={"comment"}
                        itemPk={pk}
                    />
                )}
                <span
                    onClick={() => handleCollapse()}
                    className="thread-line-container"
                >
            <div className="thread-line"/>
          </span>
            </div>
            <div className="comment-panel">
                <div className="comment-info-line-container">
                    <CommentInfoLine
                        {...{posterUsername, upvotes, created, deleted}}
                    />
                </div>

                <CommentBodyWithDeleteAndUpdateEditor
                    {...{
                        body,
                        posterUsername,
                        authUsername,
                        pk,
                        deleted,
                        handleDeleteComment
                    }}
                    usage="update"
                    initialValue={body}
                    onEditorSubmit={handleToggleUpdateEditor}
                    showUpdateEditor={showUpdateEditor}
                    handleToggleReplyEditor={handleToggleReplyEditor}
                    handleToggleUpdateEditor={handleToggleUpdateEditor}
                />

                <div className="reply-text-editor-container">
                    <ReplyEditorWithHide
                        showEditor={showReplyEditor}
                        rootComment={false}
                        parentPk={pk}
                        usage="create"
                    />
                </div>
                <div className="children-container">{childrenList}</div>
            </div>
        </div>
    );
}

export default ExpandedComment;
