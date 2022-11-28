import React, {Component} from "react";
import PropTypes from "prop-types";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

import "./styles.css";

class Voter extends Component {

    constructor(props) {
        super(props);
        this.handleVoteYo = this.handleVoteYo.bind(this);
        this.handleShowpleaseloginYo = this.handleShowpleaseloginYo.bind(this);
    }

    upvotedStyle = {
        color: "#ffd43e"
    };

    downvotedStyle = {
        color: "#18dcff"
    };

    async handleVoteYo() {
        // Make sure the post is actually deleted before rerouting which
        // causes the list to reload
        // alert('Please login to vote!')
    }

    async handleShowpleaseloginYo() {
        // Make sure the post is actually deleted before rerouting which
        // causes the list to reload
        try {
            console.log("handleShowpleaseloginYo")
            await this.props.handleShowpleaselogin({
                someprops: this.props
            });
            // this.props.history.push(`/r/${this.state.title}`);
        } catch {
            this.forceUpdate();
        }
    }


    render() {
        const {
            upvotes, displayState, handleVote, authUsername,
        } = this.props;

        // alert('Please login to upvote!')

        console.log(`XXXVT displayState: ${displayState}`)

        console.log(`authUsername: ${authUsername}`)

        if (authUsername) {
            return (

                <div className="vote-container">
                    <div className="voter-arrow upvoter">
          <span
              style={displayState === 1 ? this.upvotedStyle : {}}
              onClick={() => handleVote(1)}
          >
            <FaArrowUp/>
          </span>
                    </div>
                    <div
                        className="vote-count"
                        style={
                            displayState === 1
                                ? this.upvotedStyle
                                : displayState === -1
                                    ? this.downvotedStyle
                                    : {}
                        }
                    >
                        {upvotes}
                    </div>
                    <div className="voter-arrow downvoter">
          <span
              style={displayState === -1 ? this.downvotedStyle : {}}
              onClick={() => handleVote(-1)}
          >
            <FaArrowDown/>
          </span>
                    </div>
                </div>
            );
        } else {
            return (

                <div className="vote-container">
                    <div className="voter-arrow upvoter">
          <span
              style={displayState === 1 ? this.upvotedStyle : {}}
              onClick={this.handleShowpleaseloginYo}
          >
            <FaArrowUp/>
          </span>
                    </div>
                    <div
                        className="vote-count"
                        style={
                            displayState === 1
                                ? this.upvotedStyle
                                : displayState === -1
                                    ? this.downvotedStyle
                                    : {}
                        }
                    >
                        {upvotes}
                    </div>
                    <div className="voter-arrow downvoter">
          <span
              style={displayState === -1 ? this.downvotedStyle : {}}
              onClick={this.handleShowpleaseloginYo}
          >
            <FaArrowDown/>
          </span>
                    </div>
                </div>
            );
        }
    }

}

Voter.propTypes = {
    upvotes: PropTypes.number,
    displayState: PropTypes.oneOf([-1, 0, 1]),
    handleVote: PropTypes.func,
    handleShowpleaselogin: PropTypes.func,
    authUsername: PropTypes.string,
};

Voter.defaultProps = {
    backgroundColor: null
};

export default Voter;
