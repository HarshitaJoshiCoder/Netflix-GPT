import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/constants'

const Header = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignout = () => {
    signOut(auth).then(() => {})
    .catch((error) => {
      navigate("/error");
    }
    );
  }

  useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid, email, displayName, photoUrl} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoUrl: photoUrl}));
            navigate("/browse")
        } else {
            dispatch(removeUser());
            navigate("/")
        }
        });

        //Unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);
  console.log("user: ", user)
  return (
    
    <div className="absolute w-screen last:px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className = "w-44" 
        src = {LOGO}
        alt = "logo"
        />

        {user && (<div className='flex p-2'>
          <img className = 'w-12 h-12' src = {user?.photoUrl} alt = "userimg"/>
          <button onClick = {handleSignout} className='font-bold text-white'>(Sign Out)</button>
        </div>
        )}
    </div>
  )
}

export default Header