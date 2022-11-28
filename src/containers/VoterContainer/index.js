import React from 'react';
import {connect} from 'react-redux';

import Voter from '../../components/Voter';
import {makeShowpleaselogin, makeVoteRequest} from '../../actions/Voter';
import {getAuthUsername} from "../../redux/auth/reducer";
import * as PropTypes from "prop-types";

class VoterContainer extends React.Component {
    render() {
        let {voteDisplayState, handleVote, handleShowpleaselogin, upvotes, authUsername} = this.props;
        console.log(`XXXVT: ${voteDisplayState}`)
        return (
            <Voter
                displayState={voteDisplayState}
                handleVote={handleVote}
                handleShowpleaselogin={handleShowpleaselogin}
                upvotes={upvotes}
                authUsername={authUsername}
            />
        );
    }
}

VoterContainer.propTypes = {
    voteDisplayState: PropTypes.any,
    handleVote: PropTypes.any,
    upvotes: PropTypes.any
}

const mapStateToProps = (state, ownProps) => ({
    authUsername: getAuthUsername(state)
});


const mapDispatchToProps = (dispatch, ownProps) => (
    {
        handleVote: (voteType) => dispatch(
            makeVoteRequest({
                voteType,
                itemType: ownProps.itemType,
                itemPk: ownProps.itemPk,
            })
        ),
        handleShowpleaselogin: (some) => dispatch(makeShowpleaselogin(some))
    }
)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VoterContainer);
