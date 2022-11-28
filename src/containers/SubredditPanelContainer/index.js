import React from "react";
import {connect} from "react-redux";

import SubredditPanel from "../../components/SubredditPanel";
import {getSearchSubredditById} from "../../reducers/search";
import {SUBREDDIT_URL} from "../../urls";
import {useNavigate} from "react-router-dom";

function SubredditPanelContainer(props) {
    let navigate = useNavigate();

    const handleSubredditRedirect = () =>
        navigate(SUBREDDIT_URL(props.subreddit.title));


    const {subreddit} = props;

    return (
        <SubredditPanel
            subreddit={subreddit}
            handleSubredditRedirect={handleSubredditRedirect}
        />
    );
}

const mapStateToProps = (state, {pk}) => ({
    subreddit: getSearchSubredditById(state, pk)
});

export default connect(mapStateToProps)(SubredditPanelContainer);
