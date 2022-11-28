import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getAllPxulws, getPxulwListError, getPxulwListLoading} from "../../reducers/pxulwList";
import {getAuthUsername} from "../../redux/auth/reducer";
import {getCurrentSortOption} from "../../reducers/sortBy";
import {useParams} from "react-router-dom";
import {useComponentDidMountOrUpdate} from "../UserProfileContainer/useComponentDidMountOrUpdate";
import PxulwList from "../../components/PxulwList";
import {makeUserPxulwListRequest} from "../../actions/Posts";

function PxulwListContainer(props) {
    let {username} = useParams();

    useEffect(() => {
        console.log('XXXVT component mounted!')
        props.fetchPxulwList(username, props.currentSortOption);
    }, []) //notice the empty array here

    useComponentDidMountOrUpdate(
        (prevDeps) => {
            const prevDep1 = prevDeps[0]
            const prevDep2 = prevDeps[1]
            const prevDep3 = prevDeps[2]

            console.log(`useComponentDidMountOrUpdate prevDep1: ${prevDep1}`)

            if (username !== prevDep1 || props.authUsername !== prevDep2 || props.currentSortOption !== prevDep3) {
                // dep1 changed
                props.fetchPxulwList(
                    username,
                    props.currentSortOption
                );
            }

            return () => { /* unmount handler */
            }
        },
        [username, props.authUsername, props.currentSortOption]
    )


    let emptyListMessage;
    emptyListMessage = `
        There are no posts in this feed!
      `;

    return <PxulwList {...props} username={username} emptyListMessage={emptyListMessage}/>;
}

const mapStateToProps = state => ({
    loading: getPxulwListLoading(state),
    error: getPxulwListError(state),
    allPxulws: getAllPxulws(state),
    authUsername: getAuthUsername(state),
    currentSortOption: getCurrentSortOption(state)
});

const mapDispatchToProps = dispatch => ({
    fetchPxulwList: (username, orderBy) =>
        dispatch(makeUserPxulwListRequest(username, orderBy))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PxulwListContainer)
;
