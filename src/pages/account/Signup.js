import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader} from '../../redux/loader/actions';
import axios from 'axios'
import './styles.css'
import alert from '../../redux/alert/actions';
import {useNavigate} from "react-router-dom";
import {Alink, FormHeading, NewLink, Text, TextBox} from "../../components/Account.styles";
import FormButton from "../../components/ModalForm/FormButton";
import {Form} from "react-bootstrap";
import {API_ROOT_URL} from "../../api/constants";

export default function Signup() {
    let navigate = useNavigate();

    const [formData, setformData] = useState({
        email: '',
        username: '',
        password: '',
    })
    const dispatch = useDispatch()
    const {email, username, password} = formData
    const changeFormData = e => setformData({...formData, [e.target.name]: e.target.value})
    const onSubmit = async (e) => {

        dispatch(showLoader())
        if (password) {
            if (password.length < 8) {
                dispatch(hideLoader())
                dispatch(alert('Password must be at least 6 characters.', 'danger'))
                return ''
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            const body = JSON.stringify({email, username, password})
            await axios.post(`${API_ROOT_URL}auth/users/`, body, config)
                .then((response) => {
                    if (response.status === 201) {
                        dispatch(hideLoader())
                        dispatch(alert('Check your email for activating your account!', 'success'))
                        navigate('/login/')
                    }

                }).catch((error) => {
                    dispatch(hideLoader())
                    for (let [key, value] of Object.entries(error.response.data)) {
                        dispatch(alert(`${value}`, 'danger'))
                    }
                })
        } else {
            dispatch(hideLoader())
            dispatch(alert('Error: please fill appropriate values in the form', 'danger'))
        }
    }

    return (
        <Form>
            <Form.Group className="mb-3 " controlId="formBasicUsername">
                <FormHeading>Sign up to create an account</FormHeading>

            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={changeFormData} name="username" type="text" placeholder="Username"/>
                <Form.Text className="text-muted">
                    Your username is how you will be identified on the site. It is also used to create your profile URL.
                    You cannot change your username once you have created an
                    account.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={changeFormData} name="email" type="email" placeholder="Email"/>
                <Form.Text className="text-muted">
                    You will receive an email to activate your account.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={changeFormData} name="password" type="password" placeholder="Password"/>
                <Form.Text className="text-muted">
                    Password must be at least 6 characters.
                </Form.Text>
            </Form.Group>
            {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
            {/*    <Form.Check type="checkbox" label="Check me out"/>*/}
            {/*</Form.Group>*/}
            <Text>By continuing, you are setting up a Programming Dictionary account and agree to our <Alink
                href="https://sites.google.com/view/programmingdictionary-privacy-policy/home">Privacy
                Policy</Alink></Text>
            <FormButton
                handleClick={onSubmit}
            >
                Sign up
            </FormButton>
            <br/>
            <TextBox>
                <Text>Please check your email to activate your account after you sign
                    up!</Text>
            </TextBox>

            <TextBox>
                <Text>Already created an account? <NewLink to="/login/">Login</NewLink> </Text>
            </TextBox>
        </Form>
    );
}


