import React from 'react';
import {connect} from 'react-redux';

import Resetopasu from '../../components/Resetopasu';
import {makeResetopasuRequest} from '../../actions/Resetopasu';
import {getResetopasuError, getResetopasuLoading,} from '../../reducers/resetopasu';

function ResetopasuContainer(props) {

    const {
        errorMessage,
        loading,
        handleResetopasu,
    } = props;

    return (
        <Resetopasu {...{
            errorMessage,
            loading,
            handleResetopasu,
        }}/>
    )
}

const mapStateToProps = (state) => ({
    errorMessage: getResetopasuError(state),
    loading: getResetopasuLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    handleResetopasu: (email) =>
        dispatch(makeResetopasuRequest(email)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ResetopasuContainer);
