import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {Dropdown} from "react-bootstrap";

import "./styles.css";
import {BlockLoader} from "../Loaders";
import VoterContainer from "../../containers/VoterContainer";
import PostInfoLine from "./PostInfoLine";
import PostEditorContainer from "../../containers/PostEditorContainer";
import CommentTreeListContainer from "../../containers/CommentTreeListContainer";
import EllipsisButton from "../EllipsisButton";
import ShareButton from "../ShareButton";
import {withMaybe} from "../../utilities/HOC";
import {useComponentDidMountOrUpdate} from "../../containers/UserProfileContainer/useComponentDidMountOrUpdate";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import alert from "../../redux/alert/actions";

function PostDetail(props) {
    let navigate = useNavigate();

    let commentListNode = React.createRef();
    const dispatch = useDispatch()


    let {postId} = useParams();

    const scrollToCommentList = () => {
        window.scrollTo({
            top: commentListNode.current.offsetTop,
            behavior: "smooth"
        });
    };

    const handleDelete = async () => {

        let value = prompt(
            'Please enter "DELETE" to confirm deletion.'
        );

        if (value === "DELETE") {
            // Make sure the post is actually deleted before rerouting which
            // causes the list to reload
            dispatch(alert('Post is deleted', 'success'))
            await props.handleDeletePost(postId);
            navigate(`/r/${props.subredditTitle}`);
        } else {
            dispatch(alert('Delete operation is cancelled.', 'info'))
        }
    }

    const {
        subredditTitle,
        posterUsername,
        voteDisplayState,
        engtitletranslation,
        cover,
        upvotes,
        authUsername,
        title,
        pk,
        body,
        loading,
        showPostEditor,
        togglePostEditor
    } = props;

    useEffect(() => {
        console.log('component mounted!')
        if (props.commentScroll) {
            scrollToCommentList();
        } else {
            window.scrollTo(0, 0);
        }
    }, []) //notice the empty array here

    useComponentDidMountOrUpdate(
        (prevDeps) => {
            const prevDep1 = prevDeps[0]

            console.log(`useComponentDidMountOrUpdate prevDep1: ${prevDep1}`)
            if (props.commentScroll && prevDep1 !== pk) {
                scrollToCommentList();
            }

            return () => { /* unmount handler */
            }
        },
        [pk]
    )


    const AuthEllipsis = withMaybe(props => props.showEllipsis)(EllipsisButton);

    console.log(`XXX cover: ${cover}`)
    console.log(`XXX engtitletranslation: ${engtitletranslation}`)

    return (
        <div className="post-detail-content">
            <div className="post-detail-voter-container">
                <VoterContainer
                    upvotes={upvotes}
                    voteDisplayState={voteDisplayState}
                    itemType={"post"}
                    itemPk={pk}
                />
            </div>
            <div className="main-post-detail-content">
                {loading ? (
                    <BlockLoader/>
                ) : (
                    <Fragment>
                        <PostInfoLine title={subredditTitle} poster={posterUsername}/>
                        <div className="post-title-container">{title}</div>
                        {/*<div className="post-title-container">*/}
                        {/*    Translation: {engtitletranslation}*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*  <img*/}
                        {/*      src={cover}*/}
                        {/*      alt="car"*/}
                        {/*  />*/}
                        {/*</div>*/}
                        {/*<div className="post-body-container">*/}
                        {showPostEditor ? (
                            <PostEditorContainer
                                {...{body, pk}}
                                onEditorSubmitSuccess={togglePostEditor}
                            />
                        ) : (
                            <div
                                className="body-html"
                                dangerouslySetInnerHTML={{__html: body}}
                            />
                        )}
                        {/*</div>*/}

                        <div className="link-bar-container">
                            <ShareButton shareUrl={`${window.location.href}`}/>

                            <AuthEllipsis showEllipsis={authUsername === posterUsername}>

                                <Dropdown.Item eventKey={1} onClick={togglePostEditor}>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item eventKey={2} onClick={handleDelete}>
                                    Delete
                                </Dropdown.Item>
                            </AuthEllipsis>
                        </div>
                    </Fragment>
                )}

                <div className="post-comments-container" ref={commentListNode}>
                    <CommentTreeListContainer/>
                </div>
            </div>
        </div>
    );
}

PostDetail.propTypes = {
    title: PropTypes.string,
    posterUsername: PropTypes.string,
    authUsername: PropTypes.string,
    postTitle: PropTypes.string,
    postBody: PropTypes.string,
    loading: PropTypes.bool,
    showPostEditor: PropTypes.bool,
    commentScroll: PropTypes.bool,
    handleDeletePost: PropTypes.func,
    togglePostEditor: PropTypes.func
};

export default PostDetail;
