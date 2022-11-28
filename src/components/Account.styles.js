import styled, {keyframes} from 'styled-components'
import {Flex} from '../globalStyles'
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
  ${Flex} //overflow-x: hidden;

  @media only screen and(max-width: 748 px) {
  flex-direction: column-reverse;
}


`
export const FormPictureWrap = styled.div`
  width: 100%;
  ${Flex} @media only screen and(max-width: 748 px) {
  width: 100%;
}

`

export const FromImg = styled.img`
  //width: 100%;
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
export const FormTextEditor = styled.form`
  ${Flex}
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: 748px) {
    width: 90%;
  }

`

export const Alink = styled.a`
  color: #127ae5 !important;
  text-decoration-line: underline !important;
  text-decoration-color: #127ae5 !important;
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

export const TextBox = styled(InputDiv)`
  margin-bottom: 20px;

`
export const Text = styled.p`
  color: var(--primary-text-color);
  font-size: 18px;
  font-weight: 500;
  margin-right: 3rem;
  margin-left: 3rem;

`

export const TextWithoutMargin = styled.p`
  color: var(--primary-text-color);
  font-size: 18px;
  font-weight: 500;

`
export const TextAccountHint = styled.p`
  color: #4d4d4d;
  font-size: 18px;
  font-weight: 500;
  margin-right: 3rem;
  margin-left: 3rem;
`


export const NewLink = styled(Link)`
  color: #127ae5 !important;
  text-decoration-line: underline !important;
  text-decoration-color: #127ae5 !important;
  font-weight: 600;
  &:hover {
    color: var(--primary-hover-color);
  }

`

