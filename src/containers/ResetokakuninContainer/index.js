import React from 'react';
import {connect} from 'react-redux';

import Resetokakunin from '../../components/Resetokakunin';
import {makeResetokakuninRequest} from '../../actions/Resetokakunin';
import {getResetokakuninError, getResetokakuninLoading,} from '../../reducers/resetokakunin';
import {useParams} from "react-router-dom";

function ResetokakuninContainer(props) {

    let {uid, token} = useParams();

    console.log(`XXX uid: ${uid}`)
    const {
        errorMessage,
        loading,
        handleResetokakunin,
    } = props;

    return (
        <Resetokakunin {...{
            errorMessage,
            loading,
            uid,
            token,
            handleResetokakunin,
        }}/>
    )
}

const mapStateToProps = (state) => ({
    errorMessage: getResetokakuninError(state),
    loading: getResetokakuninLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    handleResetokakunin: (uid, token, new_password, re_new_password) =>
        dispatch(makeResetokakuninRequest(uid, token, new_password, re_new_password)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ResetokakuninContainer);
