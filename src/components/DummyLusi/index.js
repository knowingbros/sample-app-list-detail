import React, {Component} from "react";
import PropTypes from "prop-types";

import FieldGroup from "../FieldGroup";
import {ErrorAlertWithError} from "../AlertMessage";
import FormButton from "../ModalForm/FormButton";
import "./styles.css";

class DummyLusi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            title: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange = e => this.setState({title: e.target.value});

    handleDescriptionChange = e => this.setState({description: e.target.value});

    async handleSubmit() {
        try {
            await this.props.handleDummyLusi({
                title: this.state.title,
                description: this.state.description
            });
            this.props.history.push(`/r/${this.state.title}`);
        } catch {
            this.forceUpdate();
        }
    }

    render() {
        const {errorMessage, loading} = this.props;

        return (
            <div className="dummy-lusi-container">
                <div id="picture-container">
                    <a
                        href={`https://www.pexels.com/photo/assorted-colored-wooden-planks-985287/`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Photo by Magda Ehlers from Pexels
                    </a>
                </div>
                <div className="content-container">
                    <div className="form-container">
                        <h2>Dummy Lusi Title</h2>
                        <hr/>
                        <ErrorAlertWithError>{errorMessage}</ErrorAlertWithError>

                        <form>
                            <div className="input-container">
                                <FieldGroup
                                    id="title-input"
                                    placeholder="title"
                                    type="text"
                                    value={this.state.title}
                                    onChange={this.handleTitleChange}
                                    name="title"
                                    autoComplete="off"
                                />
                                <FieldGroup
                                    id="description-input"
                                    placeholder="description"
                                    componentClass="textarea"
                                    onChange={this.handleDescriptionChange}
                                />
                            </div>
                            <div className="submit-button">
                                <FormButton
                                    bsStyle="primary"
                                    handleClick={this.handleSubmit}
                                    loading={loading}
                                >
                                    create
                                </FormButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

DummyLusi.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    handleDummyLusi: PropTypes.func
};

export default DummyLusi;
