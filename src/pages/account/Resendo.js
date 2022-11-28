import React, {useState} from 'react'
import ResendoImg from '../../assets/img/programmingdictionary_banner.svg'
import {
    FormCont,
    FormHeading,
    FormPictureWrap,
    FormWrap,
    FromImg,
    Input,
    InputDiv, NewLink, Text, TextAccountHint, TextBox,
} from '../../components/Account.styles'

import {useDispatch} from 'react-redux';
import {makeResendActivationEmail, resendo} from '../../redux/';
import FormButton from "../../components/ModalForm/FormButton";
import {RESETOPASU_URL} from "../../urls";
import {Form} from "react-bootstrap";


export default function Resendo() {
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()

    const handleEmailChange = e => setEmail(e.target.value);

    const onSubmit = async (e) => {
        dispatch(makeResendActivationEmail(email))
    }

    return (
        <Form>

            <Form.Group className="mb-3 " controlId="formBasicUsername">
                <FormHeading>Activate your account</FormHeading>

            </Form.Group>
            <TextBox>
                <Text>If you haven't activated your account, please enter your email below to receive activation link!</Text>
            </TextBox>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleEmailChange} name="email" type="email" placeholder="Email"/>
                <Form.Text className="text-muted">
                    You will receive an email to activate your account.
                </Form.Text>
            </Form.Group>
            <FormButton
                handleClick={onSubmit}
            >
                Resend Activation Email
            </FormButton>
            <br/>
            <TextBox>
                <TextAccountHint>Your will only receive activation link if you have first <NewLink to="/signup/">signed up</NewLink>.</TextAccountHint>
            </TextBox>
            <TextBox>
                <TextAccountHint>Your account needs to be activated to login!</TextAccountHint>
            </TextBox>
        </Form>
    );



}
