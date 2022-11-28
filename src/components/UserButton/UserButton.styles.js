import styled, {keyframes} from 'styled-components'
import {Flex} from '../../globalStyles'
import {Link} from 'react-router-dom';


export const ImgAnimation = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

export const FormAnimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`


export const FormCont = styled.div`
  ${Flex}
  justify-content: space-between;
  overflow-x: hidden;

  @media only screen and (max-width: 748px) {
    flex-direction: column-reverse;
  }


`
export const FormPictureWrap = styled.div`
  width: 50%;
  ${Flex} @media only screen and(max-width: 748 px) {
  width: 100%;
}

`

export const FromImg = styled.img`
  width: 100%;
  max-width: 75%;
  object-fit: cover;
  animation: ${ImgAnimation} .8s ease-in-out 1;
`

export const FormWrap = styled.div`
  width: 50%;
  height: 100vh;
  ${Flex}
  flex-direction: column;
  align-items: baseline;
  animation: ${FormAnimation} .8s ease-in-out 1;
  @media only screen and (max-width: 748px) {
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    width: 90%;

  }

`

export const FormHeading = styled.h1`
  font-size: 30px;
  margin-bottom: 40px;
  width: 75%;
  @media only screen and (max-width: 748px) {
    width: 90%;
  }
`

export const Form = styled.form`
  ${Flex}
  flex-direction: column;
  width: 75%;
  @media only screen and (max-width: 748px) {
    width: 90%;
  }

`

export const InputDiv = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const Input = styled.input`
  padding: 15px 16px;
  border-radius: 4px;
  background: var(--secendory-color);
  border: none;
  outline: none;
  color: var(--secendory-text-color);
  font-size: 18px;
  width: 100%;
  font-weight: 500;
  letter-spacing: 1px;
`
export const Label = styled.label`
  color: var(--primary-text-color);
  font-size: 18px;
  font-weight: 500;
  margin-right: 17px;
`

export const UserBtnSignUp = styled.button`
  font-size: 18px !important;
  color: white;
  background: inherit;
  border: 1px solid #4d4d4d;
  border-radius: 4px;
  cursor: pointer;
  transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--primary-hover-color);
  }

  &:active {
    transform: var(--for-active-click);
  }

  letter-spacing: 1px;
  font-weight: 500;
  width: 100%;
`

export const SearchNavBarBtn = styled.button`
  color: var(--primary-text-color) !important;
  background: inherit !important;
  border: 1px solid #4d4d4d !important;
  border-radius: 4px;
  cursor: pointer;
  transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--primary-hover-color) !important;
  }

  &:active {
    transform: var(--for-active-click) !important;
  }

  padding: 15px 16px;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 18px;
`

export const LoginSignUpGotCommentBtn = styled.button`
  color: var(--primary-text-color) !important;
  background: inherit !important;
  border: 1px solid #4d4d4d !important;
  border-radius: 4px;
  cursor: pointer;
  transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--primary-hover-color) !important;
  }

  &:active {
    transform: var(--for-active-click) !important;
  }

  width: 100%;
  padding: 15px 16px;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 18px;
`
export const SubscribeBtnSidebar = styled.button`
  color: var(--primary-text-color) !important;
  background: inherit !important;
  border: 1px solid #4d4d4d !important;
  margin: 0.5rem 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--primary-hover-color) !important;
  }

  &:active {
    transform: var(--for-active-click) !important;
  }

  width: 100%;
  padding: 15px 16px;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 18px;
`

export const SubscribeBtnHeader = styled.button`
  color: var(--primary-text-color) !important;
  background: #212529;
  border: 1px solid #4d4d4d !important;
  border-radius: 4px;
  cursor: pointer;
  transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--primary-hover-color) !important;
  }

  &:active {
    transform: var(--for-active-click) !important;
  }

  width: 100%;
  padding: 15px 16px;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 18px;
`
export const GenericAccountBtn = styled.button`
  color: var(--primary-text-color) !important;
  background: inherit !important;
  border: 1px solid #4d4d4d !important;
  border-radius: 4px;
  cursor: pointer;
  transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--primary-hover-color) !important;
  }

  &:active {
    transform: var(--for-active-click) !important;
  }

  padding: 15px 16px;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 18px;
  margin-right: 3rem;
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const UPINFOMATIONSIDEBAR = styled.div`
  color: var(--primary-text-color) !important;
  background: inherit !important;
  border: 1px solid #4d4d4d !important;
  border-radius: 4px;
  cursor: pointer;
  transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--primary-hover-color) !important;
  }

  &:active {
    transform: var(--for-active-click) !important;
  }

  width: 100%;
  padding: 15px 16px;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 18px;
`

export const GenericDiv = styled.div`
  color: var(--primary-text-color) !important;
  text-align: center;
  background: inherit !important;
  border: 1px solid #4d4d4d !important;
  border-radius: 4px;
  //transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  //
  //&:hover {
  //  background: var(--primary-hover-color) !important;
  //}
  //
  //&:active {
  //  transform: var(--for-active-click) !important;
  //}

  width: 100%;
  padding: 15px 16px;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 18px;
`

export const GenericBtn = styled.button`
  color: var(--primary-text-color) !important;
  background: inherit !important;
  border: 1px solid #4d4d4d !important;
  border-radius: 4px;
  cursor: pointer;
  transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--primary-hover-color) !important;
  }

  &:active {
    transform: var(--for-active-click) !important;
  }

  width: 100%;
  padding: 15px 16px;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 18px;
`

export const UserBtn = styled.button`
  font-size: 18px !important;
  color: white;
  background: inherit;
  border: 1px solid #4d4d4d;
  border-radius: 4px;
  cursor: pointer;
  transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--primary-hover-color);
  }

  &:active {
    transform: var(--for-active-click);
  }

  letter-spacing: 1px;
  font-weight: 500;
  width: 100%;
`

export const TextBox = styled(InputDiv)`
  margin-bottom: 20px;
`

export const Text = styled.p`
  color: var(--primary-text-color);
  font-size: 18px;
  font-weight: 500;
  margin-right: 17px;
`

export const NewLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 600;
`

