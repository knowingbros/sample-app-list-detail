import React, {useState} from "react";
import PropTypes from "prop-types";

import TextEditor from "../TextEditor";
import SubredditDropdown from "./SubredditDropdown";
import {ErrorAlert} from "../AlertMessage";
import {withMaybe} from "../../utilities/HOC";
import {HOME_SUBREDDIT_URL, POST_DETAIL_URL} from "../../urls";
import "./styles.css";
import {useNavigate} from "react-router-dom";
import {useComponentDidMountOrUpdate} from "../../containers/UserProfileContainer/useComponentDidMountOrUpdate";
import {FormTextEditor, Input, InputDiv} from "../Account.styles";

function CreatePost(props) {
    let navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [engtitletranslation, setEngtitletranslation] = useState("")
    const [dropdownTitle, setDropdownTitle] = useState(props.pseudoSubreddit ? "Choose a subreddit"
        : props.subredditTitle)

    useComponentDidMountOrUpdate(
        (prevDeps) => {
            const prevDep1 = prevDeps[0]

            console.log(`useComponentDidMountOrUpdate prevDep1: ${prevDep1}`)
            if (!props.authorizedUsername) {
                navigate(HOME_SUBREDDIT_URL);
            }

            return () => { /* unmount handler */
            }
        },
        []
    )

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update state to force render
        // An function that increment 👆🏻 the previous state like here
        // is better than directly setting `value + 1`
    }

    const forceUpdate = useForceUpdate();
    const handleTitleChange = e => setTitle(e.target.value)
    const handleEngtitletranslation = e => setEngtitletranslation(e.target.value)
    const handleSubredditSelection = title => setDropdownTitle(title);

    const handleSubmit = async (editorHtml) => {
        try {
            console.log(`xxx handleSubmit`)
            const postCreation = await props.handleCreatePost(
                title,
                engtitletranslation,
                editorHtml,
                dropdownTitle
            );
            navigate(POST_DETAIL_URL(dropdownTitle, postCreation.data.pk, {replace: true})
            );
        } catch {
            forceUpdate();
        }
    }


    const {authUserSubredditTitles, errorMessage, loading} = props;

    const CreatePostErrorAlert = withMaybe(props => props.children)(ErrorAlert);

    return (
        <div className="create-post-container">
            <div className="create-post-header">
                <h2>
                    Create a post
                    <hr/>
                </h2>
            </div>
            <div className="cp-subreddit-dropdown-container">
                <SubredditDropdown
                    handleSubredditSelection={handleSubredditSelection}
                    dropdownTitle={dropdownTitle}
                    authUserSubredditTitles={authUserSubredditTitles}
                />
            </div>
            <div className="create-post-form-container">
                <div className="alert-message-container">
                    <CreatePostErrorAlert children={errorMessage}/>
                </div>
                <FormTextEditor>
                    <InputDiv>
                        <Input name="title" id="create-post-title" onChange={handleTitleChange} type="text"
                               placeholder="Title" autoFocus
                               autoComplete="off"/>
                    </InputDiv>
                    {/*<InputDiv>*/}
                    {/*    <Input name="engtitletranslation" id="create-post-title" onChange={handleEngtitletranslation}*/}
                    {/*           type="text"*/}
                    {/*           placeholder="English Title Translation"*/}
                    {/*           autoComplete="off"/>*/}
                    {/*</InputDiv>*/}


                </FormTextEditor>
                <TextEditor
                    handleSubmit={handleSubmit}
                    usage="create"
                    placeholder="Text (optional)"
                    dontFocusOnEditor
                    loading={loading}
                />
            </div>
        </div>
    )
        ;
}

CreatePost.propTypes = {
    authorizedUsername: PropTypes.string,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    subredditTitle: PropTypes.string,
    handleCreatePost: PropTypes.func,
};

export default CreatePost;
