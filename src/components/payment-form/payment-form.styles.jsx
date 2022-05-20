import styled from 'styled-components';
import Button from '../button/button.component'

export const PaymentFormContainer = styled.div`
height: 300px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const FormContainer = styled.form`
height: 100px;
min-width: 500px; 
`
export const PaymentButton = styled(Button)`
background: #5469d4;
  color: #ffffff;
  border-radius: 4px;
margin-top: 30px;

font-size: 16px;
font-weight: 60;
cursor: pointer;
display: block;
transition: all 0.2s ease;
box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);

`