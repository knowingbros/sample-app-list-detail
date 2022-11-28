import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPxulwById} from "../../reducers/pxulwList";
import {getAuthUsername} from "../../redux/auth/reducer";
import {makeDeletePostRequest, togglePxulwEditor} from "../../actions/Posts";
import {getPostEditorShowState} from "../../reducers/editPost";
import PxulwPanel from "../../components/PxulwPanel";

const PxulwPanelContainer = props => {
    const {
        pxulw,
        handleDeletePxulw,
        authUsername,
        showPxulwEditor,
        togglePxulwEditor
    } = props;

    const {
        engtitletranslation,
        upvotes,
        pk,
        title,
        subredditTitle,
        posterUsername,
        created,
        voteDisplayState
    } = pxulw;

    return (
        <PxulwPanel
            {...{
                engtitletranslation,
                upvotes,
                pk,
                title,
                subredditTitle,
                posterUsername,
                authUsername,
                created,
                voteDisplayState,
                handleDeletePxulw,
                showPxulwEditor,
                togglePxulwEditor
            }}
        />
    );
};

const mapStateToProps = (state, ownProps) => {
    const {pxulwPk} = ownProps;

    return {
        pxulw: getPxulwById(state, pxulwPk),
        authUsername: getAuthUsername(state),
        showPxulwEditor: getPostEditorShowState(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleDeletePxulw: () => dispatch(makeDeletePostRequest(ownProps.pxulwPk)),
    togglePxulwEditor: () => dispatch(togglePxulwEditor())
});

PxulwPanelContainer.propTypes = {
    pxulw: PropTypes.shape({
        engtitletranslation: PropTypes.string,
        upvotes: PropTypes.number,
        pk: PropTypes.number,
        title: PropTypes.string,
        subredditTitle: PropTypes.string,
        posterUsername: PropTypes.string,
        created: PropTypes.string,
        voteDisplayState: PropTypes.oneOf([0, -1, 1])
    }),
    handleDeletePxulw: PropTypes.func,
    authUsername: PropTypes.string,
    usage: PropTypes.oneOf(["subreddit", "search"])
};

export default connect(mapStateToProps, mapDispatchToProps)(PxulwPanelContainer);
