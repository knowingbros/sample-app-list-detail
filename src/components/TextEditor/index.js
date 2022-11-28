import React, {Component} from "react";
import PropTypes from "prop-types";
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import "./styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {LoadingButton} from "../Buttons";

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorHtml: props.initialValue || "",
        };

        this.formats = [
            "header",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "link",
            "image",
            "code-block",
            "code"
        ];

        this.modules = {
            syntax: {
                highlight: text => hljs.highlightAuto(text).value,
            },
            toolbar: {
                container: [
                    [{header: [1, 2, 3, 4, 5, 6, false]}],
                    ["bold", "italic", "underline", "strike", "blockquote", "code"],
                    [{list: "ordered"}, {list: "bullet"}],
                    ["link", "image"],
                    ["code-block"],
                    ["clean"],
                ],
                handlers: {
                    image: this.imageHandler,
                    // link: this.linkHandler,
                },
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.quillNode = React.createRef();
    }

    imageHandler() {
        let range = this.quill.getSelection(true);
        this.quill.setSelection(range.index + 1);

        let value = prompt(
            'Please enter the image URL (.jpg, .png, .jpeg, ...) here.'
        );
        if (value) {
            this.quill.insertEmbed(range.index, "image", value);
        }
    }

    // imageHandler() {
    //     let range = this.quill.getSelection(true);
    //     this.quill.setSelection(range.index + 1);
    //     let value = prompt('Please enter the image URL (.jpg, .png, .jpeg). YOu can edit the image title in "alt" after you submit.');
    //     if (value) {
    //         let cool = `<img style="max-width:500px;" src="${value}"  alt="YOUR IMAGE NAME HERE"/>`
    //         this.quill.insertText(range.index, cool);
    //         // this.quill.insertEmbed(range.index, 'image', cool);
    //     }
    // }

    linkHandler() {
        let range = this.quill.getSelection(true);
        this.quill.setSelection(range.index + 1);
        let value = prompt(
            "please copy paste the link url here. You can edit the link title after you submit."
        );
        console.log(`XXXCB value: ${value}`);
        if (value) {
            let cool = `<a id="DO_NOT_EDIT_THIS" href="${value}">EDIT YOUR LINK TITLE HERE</a>`;
            this.quill.insertText(range.index, cool);
            // this.quill.insertEmbed(range.index, 'image', cool);
        }
    }

    componentDidMount() {
        if (!this.props.dontFocusOnEditor) {
            this.quillNode.current.focus();
        }
    }

    handleChange(html) {
        this.setState({
            editorHtml: html,
        });
    }

    handleSubmitClick = (editorHtml) => {
        this.setState({
            editorHtml: "",
        });

        return this.props.handleSubmit(editorHtml);
    };

    render() {
        const {placeholder, usage, onBlur, loading} = this.props;

        console.log(
            `XXXCBloading TextEditor props loading: ${JSON.stringify(loading)}`
        );

        let submitButtonWord = "Submit";
        switch (usage) {
            case "create":
                submitButtonWord = "Post";
                break;
            case "update":
                submitButtonWord = "Edit";
                break;
            default:
                break;
        }

        return (
            <div className="text-editor-content">
                <ReactQuill
                    ref={(el) => {
                        this.quill = el;
                    }}
                    value={this.state.editorHtml}
                    onChange={this.handleChange}
                    placeholder={placeholder || ""}
                    modules={this.modules}
                    formats={this.formats}
                    ref={this.quillNode}
                    onBlur={onBlur}
                />
                <div className="text-editor-loading-button-container">
                    <LoadingButton
                        onClick={() => this.handleSubmitClick(this.state.editorHtml)}
                        className="submit-button"
                        loading={loading}
                    >
                        {submitButtonWord}
                    </LoadingButton>
                </div>
            </div>
        );
    }
}

TextEditor.propTypes = {
    usage: PropTypes.string,
    rootComment: PropTypes.bool,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    onBlur: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default TextEditor;
