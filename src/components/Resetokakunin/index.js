import React, {useState} from "react";
import PropTypes from "prop-types";
import "./styles.css";
import {
    FormCont,
    FormHeading,
    FormPictureWrap,
    FormWrap,
    FromImg,
    Input,
    InputDiv, NewLink, Text, TextAccountHint,
    TextBox
} from "../Account.styles";
import signup from "../../assets/img/programmingdictionary_banner.svg";
import FormButton from "../ModalForm/FormButton";
import {useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";

function Resetokakunin(props) {
    let navigate = useNavigate();

    const {errorMessage, loading, uid, token} = props;
    const [submitTry, setSubmitTry] = useState("submitTryNope")
    const [submitCatch, setSubmitCatch] = useState("submitCatchNope")
    const [new_password, setNewPassword] = useState("")
    const [re_new_password, setReNewPassword] = useState("")
    const [errorMessageState, setErrorMessageState] = useState("")
    let primaryAlertBoxContainer = "HMMMM NEW ONE";
    let secondaryAlertBoxContainer = "HMMMM NEW ONE";

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update state to force render
        // An function that increment 👆🏻 the previous state like here
        // is better than directly setting `value + 1`
    }

    const forceUpdate = useForceUpdate();

    const handleNewPasswordChange = e => setNewPassword(e.target.value);

    const handleReNewPasswordChange = e => setReNewPassword(e.target.value);

    const handleSubmit = async () => {

        try {
            await props.handleResetokakunin({
                uid: uid,
                token: token,
                new_password: new_password,
                re_new_password: re_new_password
            });

        } catch {
            forceUpdate();
        }
    }

    return (
        <Form>
            <Form.Group className="mb-3 " controlId="formBasicUsername">
                <FormHeading>Choose your new account password</FormHeading>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control onChange={handleNewPasswordChange} name="password" type="password" placeholder="Password"/>
                <Form.Text className="text-muted">
                    Password must be at least 6 characters.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control onChange={handleReNewPasswordChange} name="password" type="password" placeholder="Password"/>
                <Form.Text className="text-muted">
                    Password must be at least 6 characters and match the new password above.
                </Form.Text>
            </Form.Group>
            <FormButton
                handleClick={handleSubmit}
            >
                Confirm Reset Password
            </FormButton>
        </Form>
    );

    // return (
    //     <div className="resetokakunin-container">
    //         <FormCont>
    //             <FormPictureWrap>
    //                 <FromImg src={signup}/>
    //             </FormPictureWrap>
    //             <FormWrap>
    //                 <FormHeading>Enter your new account password (6+ characters)</FormHeading>
    //                 <Form>
    //                     <InputDiv>
    //                         <Input value={new_password}
    //                                onChange={handleNewPasswordChange} name="new-password-input" type="password"
    //                                placeholder="New Password"/>
    //                     </InputDiv>
    //                     <InputDiv>
    //                         <Input value={re_new_password}
    //                                onChange={handleReNewPasswordChange} name="re-new-password-input"
    //                                type="password"
    //                                placeholder="Confirm New Password"/>
    //                     </InputDiv>
    //
    //                     <FormButton
    //                         handleClick={handleSubmit}
    //                         loading={loading}
    //                     >
    //                         Confirm Reset Password
    //                     </FormButton>
    //                 </Form>
    //             </FormWrap>
    //         </FormCont>
    //     </div>
    // );
}

Resetokakunin.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    handleResetokakunin: PropTypes.func,
    goodone: PropTypes.bool,
    resetokakuninFailedYo: PropTypes.bool

};

export default Resetokakunin;
