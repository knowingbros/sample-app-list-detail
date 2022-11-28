import React from "react";
import {ClipLoader} from "react-spinners";

import "./styles.css";
import {GenericBtn} from "../../UserButton/UserButton.styles";

const LoadingButton = props => {
    const {loading, children, className, ...rest} = props;

    const spinner = <ClipLoader size={20} className="display: inline-block"/>;

    // when loading make the text transparent, this retains the button size
    const style = loading
        ? {
            color: "transparent"
        }
        : {};

    return (
        <div className="loading-button-container">

            <GenericBtn {...rest} className={className || "loading-button"} style={style}>
                <div className="button-spinner-container">
                    {loading ? spinner : null}
                </div>
                &nbsp;{children}

            </GenericBtn>
        </div>
    );
};

export default LoadingButton;
