import React, {useState} from "react";
import PropTypes from "prop-types";
import "./styles.css";
import {FormHeading, Text, TextBox} from "../Account.styles";
import FormButton from "../ModalForm/FormButton";
import {useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";

function Resetopasu(props) {

    const [email, setEmail] = useState("")
    const loading = props.loading;

    let primaryAlertBoxContainer = "";
    let secondaryAlertBoxContainer = "";
    let navigate = useNavigate();

    const handleEmailChange = e => setEmail(e.target.value);

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update state to force render
        // An function that increment 👆🏻 the previous state like here
        // is better than directly setting `value + 1`
    }

    const forceUpdate = useForceUpdate();

    const handleSubmit = async () => {

        try {
            console.log(`handleSubmit: ${primaryAlertBoxContainer}`)

            await props.handleResetopasu({
                email: email,
            });
            setTimeout(function () {
                navigate("/");
            }, 5000);
        } catch {
            forceUpdate();
        }
    }

    return (
        <Form>

            <Form.Group className="mb-3 " controlId="formBasicUsername">
                <FormHeading>Reset your password</FormHeading>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleEmailChange} name="email" type="email" placeholder="Email"/>
                <Form.Text className="text-muted">
                    You will receive an email to reset your password.
                </Form.Text>
            </Form.Group>
            <FormButton
                handleClick={handleSubmit}
            >
                Send Reset Password Link
            </FormButton>
        </Form>
    );
}

Resetopasu.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    handleResetopasu: PropTypes.func,
    resetopasuFailedYo: PropTypes.bool

};

export default Resetopasu;
