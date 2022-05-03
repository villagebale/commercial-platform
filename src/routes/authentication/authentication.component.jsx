// googleredirect pattern with related functions used for understanding of mechanism in firebase utils

import {
    // auth,signInWithGoogleRedirect,
    signInWithGooglePopup,
    signInWithEmailAndPassword,
    createUsersDocumentFromAuth,} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss'
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
// import { async } from "@firebase/util";
import Button from "../../components/button/button.component";

const Authentication = () => {

    // useEffect( () => {
    //     async function redirect() {
    //         const response = await getRedirectResult(auth);
    //         if(response) {
    //             const userDocRef = await createUsersDocunmentFromAuth(response.user);
    //         }
    //     }
    //     redirect();
    // },[]);




    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default Authentication;