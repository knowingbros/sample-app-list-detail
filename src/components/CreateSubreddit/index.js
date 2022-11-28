import React, {useState} from "react";
import PropTypes from "prop-types";
import FormButton from "../ModalForm/FormButton";
import "./styles.css";
import {useNavigate} from "react-router-dom";
import {FormHeading} from "../Account.styles";
import {Form} from "react-bootstrap";

function CreateSubreddit(props) {
    let navigate = useNavigate();

    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")

    const handleTitleChange = e => setTitle(e.target.value);
    const handleDescriptionChange = e => setDescription(e.target.value);

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update state to force render
        // An function that increment 👆🏻 the previous state like here
        // is better than directly setting `value + 1`
    }

    const forceUpdate = useForceUpdate();

    const handleSubmit = async () => {
        try {
            await props.handleCreateSubreddit({
                title: title,
                description: description
            });
            navigate(`/r/${title}`);
        } catch {
            forceUpdate();
        }
    }


    const {errorMessage, loading} = props;

    return (
        <Form>
            <Form.Group className="mb-3 " controlId="formBasicUsername">
                <FormHeading>Create a topic</FormHeading>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control onChange={handleTitleChange} name="title" type="text" placeholder="Title"/>
                <Form.Text className="text-muted">
                    The name of your topic is forever. You cannot change it later.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={handleDescriptionChange} name="description" type="text"
                              placeholder="Description"/>
            </Form.Group>
            <FormButton
                handleClick={handleSubmit}
            >
                Create topic
            </FormButton>
        </Form>
    );
}


CreateSubreddit.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    handleCreateSubreddit: PropTypes.func,
    authorizedUsername: PropTypes.string,

};

export default CreateSubreddit;
