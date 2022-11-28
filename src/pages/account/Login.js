import React, {useState} from 'react'
import {FormHeading, NewLink, Text, TextAccountHint, TextBox,} from '../../components/Account.styles'

import {useDispatch} from 'react-redux';
import {login} from '../../redux/';
import FormButton from "../../components/ModalForm/FormButton";
import {RESETOPASU_URL} from "../../urls";
import {Form} from "react-bootstrap";


export default function Login() {
    const [formData, setformData] = useState({
        username: '',
        password: '',
    })
    const [checked, setchecked] = useState(false)
    const dispatch = useDispatch()
    const {username, password} = formData
    const changeFormData = e => setformData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async (e) => {
        dispatch(login(username, password, checked))
    }

    return (
        <Form>
            <Form.Group className="mb-3 " controlId="formBasicUsername">
                <FormHeading>Login to your account</FormHeading>

            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={changeFormData} name="username" type="text" placeholder="Username"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={changeFormData} name="password" type="password" placeholder="Password"/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
            {/*    <Form.Check type="checkbox" label="Check me out"/>*/}
            {/*</Form.Group>*/}
            <FormButton
                handleClick={onSubmit}
            >
                Login
            </FormButton>
            <br/>
            <TextBox>
                <TextAccountHint>Ensure your account is activated before you login!</TextAccountHint>
            </TextBox>
            <br/>
            <TextBox>
                <Text>Don't have an account? <NewLink to="/signup/">Create An Account</NewLink> </Text>
            </TextBox>
            <TextBox>
                <Text>Account not activated? <NewLink to="/resend-activation/">Resend Activation
                    Email</NewLink> </Text>
            </TextBox>
            <TextBox>
                <Text>Forgot your password? <NewLink to={RESETOPASU_URL}>Reset Password</NewLink> </Text>
            </TextBox>
        </Form>
    );


    // return (
    //     <>
    //         <FormCont>
    //             <FormPictureWrap>
    //                 <FromImg src={LoginImg}/>
    //             </FormPictureWrap>
    //             <FormWrap>
    //                 <FormHeading>Login to your account</FormHeading>
    //                 <TextBox>
    //                     <TextAccountHint>Ensure your account is <NewLink to="/resend-activation">activated </NewLink>before you
    //                         login!</TextAccountHint>
    //                 </TextBox>
    //                 <Form>
    //                     <InputDiv>
    //                         <Input name="username" onChange={changeFormData} type="text" placeholder="Username"/>
    //                     </InputDiv>
    //                     <InputDiv>
    //                         <Input name="password" onChange={changeFormData} type="password" placeholder="Password"/>
    //                     </InputDiv>
    //                     <FormButton
    //                         handleClick={onSubmit}
    //                     >
    //                         Login
    //                     </FormButton>
    //                     <br/>
    //                     <br/>
    //                     <TextBox>
    //                         <Text>Don't have an account? <NewLink to="/signup/">Create An Account</NewLink> </Text>
    //                     </TextBox>
    //                     <TextBox>
    //                         <Text>Account not activated? <NewLink to="/resend-activation/">Resend Activation
    //                             Email</NewLink> </Text>
    //                     </TextBox>
    //                     <TextBox>
    //                         <Text>Forgot your password? <NewLink to={RESETOPASU_URL}>Reset Password</NewLink> </Text>
    //                     </TextBox>
    //
    //
    //                 </Form>
    //             </FormWrap>
    //
    //         </FormCont>
    //
    //     </>
    // )
}
