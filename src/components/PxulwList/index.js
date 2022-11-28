import React from "react";
import PropTypes from "prop-types";

import PxulwPanelContainer from "../../containers/PxulwPanelContainer";
import {ErrorAlert} from "../AlertMessage";
import {PanelListLoader} from "../Loaders";
import NextPageLoaderContainer from "../../containers/NextPageLoaderContainer";
import EmptyPxulwList from "./EmptyPxulwList";
import "./styles.css";
import {GenericBtn} from "../UserButton/UserButton.styles";
import {useNavigate} from "react-router-dom";
import NxpgwPageLoaderContainer from "../../containers/NxpgwPageLoaderContainer";
import SortByNavBarContainer from "../../containers/SortByNavBarContainer";

const PxulwList = props => {
    console.log(`XXXPST PxulwList: ${props}`)
    console.log(`XXXPST PxulwList stringify: ${JSON.stringify(props)}`)
    const {
        loading,
        error,
        allPxulws,
        emptyListMessage = undefined,
        showNextPageLoader = true,
        username
    } = props;

    const sortByNavBar = <SortByNavBarContainer/> ;

    let navigate = useNavigate();
    if (error) {
        return <ErrorAlert>{error}</ErrorAlert>;
    }
    let allButton;
    let createPxulwButton;
    let pxulwList;
    if (loading) {
        pxulwList = <PanelListLoader panelNumber={12}/>;
    } else if (allPxulws.length === 0) {

        if (username) {

            if (username.toLowerCase() === "home" || username.toLowerCase() === "popular") {
                allButton = <GenericBtn
                    onClick={() => {
                        return navigate(`/r/all`);
                    }}
                >
                    🖱️ Go to /r/all to check out all the pxulws!
                </GenericBtn>
            } else if (username.toLowerCase() === "all") {
                allButton = <GenericBtn
                    onClick={() => {
                        return navigate(`/create-topic`);
                    }}
                >
                    🖱️ No pxulws here! Create a topic to start pxulwing!
                </GenericBtn>
            } else {
                allButton = <GenericBtn
                    onClick={() => {
                        return navigate(`/r/all`);
                    }}
                >
                    🖱️ Go to /r/all to check out all the pxulws!
                </GenericBtn>
                createPxulwButton = <GenericBtn
                    onClick={() => {
                        return navigate(`/r/${username}/create-pxulw`);
                    }}
                >
                    📝️ Create a pxulw in this topic!
                </GenericBtn>
            }
        }

        pxulwList = <EmptyPxulwList message={emptyListMessage}/>;
    } else {
        const pxulwPanels = allPxulws.map(pxulwPk => {
            return <PxulwPanelContainer pxulwPk={pxulwPk} key={pxulwPk}/>;
        });

        pxulwList = (
            <ul>
                {pxulwPanels}
                {showNextPageLoader ? (
                    <NxpgwPageLoaderContainer usage="pxulwList"/>
                ) : null}
            </ul>
        );
    }

    return <div>{sortByNavBar}{allButton}{createPxulwButton}{pxulwList}</div>;
};

PxulwList.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    allPxulws: PropTypes.arrayOf(PropTypes.number),
    emptyListMessage: PropTypes.string,
    showNextPageLoader: PropTypes.bool
};

export default PxulwList;
