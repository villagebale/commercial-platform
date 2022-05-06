import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_BaJqwd8AMkDcGWnFrP_OV01tF9wriiY",
    authDomain: "c-platform-db.firebaseapp.com",
    projectId: "c-platform-db",
    storageBucket: "c-platform-db.appspot.com",
    messagingSenderId: "525547897318",
    appId: "1:525547897318:web:25fcc3af3595c1fc9e1627"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey); 
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })
    await batch.commit();
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories'); 
    const querySnapShot = await getDocs(query(collectionRef));
    const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
        const {title,items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})
    return categoryMap;
}

export const createUsersDocumentFromAuth = async (userAuth,
    additionalInformation={}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('Error creating the user' + error.message);
        }
    }
    return userDocRef;
    console.log(userDocRef)
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async() => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
