import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';
const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const dispatch = useDispatch();
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value);

        setErrorMessage(message);

        if (message) return;

        // Sign In or Sign up
        if(!isSignInForm) {
            //SignUp logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                displayName: name.current.value, photoURL: USER_AVATAR
                }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(
                        addUser(
                            {uid: uid, 
                            email: email,
                            displayName: displayName,
                            photoUrl: photoURL}
                        )
                    );
                }).catch((error) => {
                    setErrorMessage(error.message)
                });
                
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode, "-", errorMessage)
            });

        }else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode, "-", errorMessage)
            });
        }

    };
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img src = "https://assets.nflxext.com/ffe/siteui/vlv3/cb72daa5-bd8d-408b-b949-1eaef000c377/web/IN-en-20250825-TRIFECTA-perspective_a3209894-0b01-4ddb-b57e-f32165e20a3f_medium.jpg" alt = "img"></img>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute bg-black p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <h1 className='font-bold text-3xl py-4'>{isSignInForm? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (<input ref={name} type="text" placeholder="Full Name" className="p-2 my-2 w-full bg-gray-700" />)}
            <input 
                ref={email} 
                type="text" 
                placeholder="Email Address" 
                className="p-2 my-2 w-full bg-gray-700" />
            <input 
                ref={password} 
                type="password" 
                placeholder="Password" 
                className="p-2 my-2 w-full bg-gray-700"  />

            {errorMessage && (<p className='text-red-500 font-bold text-sm py-2'> {errorMessage}</p>)}

            <button 
                className="p-4 my-6 bg-red-700 w-full" 
                onClick={handleButtonClick}>{isSignInForm? "Sign In" : "Sign Up"}
            </button>
            <p 
                className="py-4 cursor-pointer"
                onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
            </p>
            
        </form>
    </div>
  )
}

export default Login