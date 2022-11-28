import React, {useEffect} from "react";
import {connect} from "react-redux";

import {makeSubDetailRequest, makeSubSubscriptionRequest} from "../../actions/Subreddit";
import {getSubredditData} from "../../reducers/subreddit";
import Subreddit from "../../components/Subreddit";
import {useParams} from "react-router-dom";
import {useComponentDidMountOrUpdate} from "../UserProfileContainer/useComponentDidMountOrUpdate";
import {getAuthUsername} from "../../redux/auth/reducer";

function SubredditContainer(props) {
    let {subredditTitle = "home", postId} = useParams();

    useEffect(() => {
        console.log('component mounted!')
        props.fetchSubDetail(subredditTitle);
    }, []) //notice the empty array here


    useComponentDidMountOrUpdate(
        (prevDeps) => {
            const prevDep1 = prevDeps[0]

            console.log(`useComponentDidMountOrUpdate prevDep1: ${prevDep1}`)

            console.log(`useComponentDidMountOrUpdate subredditTitle: ${subredditTitle}`)

            if (subredditTitle !== prevDep1) {
                // dep1 changed
                props.fetchSubDetail(subredditTitle);

            }

            return () => { /* unmount handler */
            }
        },
        [subredditTitle]
    )

    const {
        subredditData: {title, description, pseudo, loading},
        authenticatedUsername,
        primaryComponent,
        showSortByNavBar
    } = props;

    return (
        <Subreddit
            {...{
                title,
                description,
                pseudo,
                authenticatedUsername,
                loading,
                primaryComponent,
                showSortByNavBar
            }}
        />
    );
}

const mapStateToProps = state => ({
    subredditData: getSubredditData(state),
    authenticatedUsername: getAuthUsername(state)

});

const mapDispatchToProps = dispatch => ({
    fetchSubDetail: subredditTitle =>
        dispatch(makeSubDetailRequest(subredditTitle)),

    makeSubscriptionRequest: (subredditTitle, subAction) =>
        dispatch(makeSubSubscriptionRequest(subredditTitle, subAction))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubredditContainer);
