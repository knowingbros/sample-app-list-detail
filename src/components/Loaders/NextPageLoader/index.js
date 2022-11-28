import React, {Component} from "react";
import PropTypes from "prop-types";
import PanelLoader from "../PanelLoader";
import IntersectionVisible from "react-intersection-visible";

class NextPageLoader extends Component {
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    onLoaderVisible = e => {
        this.props.getNextPage();
    };

    render() {
        return (
            <IntersectionVisible onShow={e => this.onLoaderVisible(e)}>
                <PanelLoader/>
            </IntersectionVisible>
        );
    }
}

NextPageLoader.propTypes = {
    getNextPage: PropTypes.func
};

export default NextPageLoader;
