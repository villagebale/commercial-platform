import {useState} from "react";
import FormInput from "../form-input/form-input-component";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils'
import Button from "../button/button.component";
import './sign-in.styles.scss'

const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const cleanFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            cleanFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password': {
                    alert('The password you entered does not match your account')
                    break;
                }
                case 'auth/user-not-found': {
                    alert('user account associated with this email not found')
                    break;
                }
                default:
                    console.log('Error: user sign in failed. Reason: ', error);
            }
        }
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopup();
    }


    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Email'
                    type="email"
                    required
                    onChange={handleChange}
                    name='email'
                    value={email} />
                <FormInput
                    label='Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name='password'
                    value={password} />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' onClick={logGoogleUser} buttonType='google'>Google Sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;