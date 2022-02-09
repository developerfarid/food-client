
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import FirebaseInit from "../firebaseInfo/firebaseInit";

 FirebaseInit()

const AllData = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState("")
    const [product, setProduct] = useState([])
    const [post, setPost] = useState([])
    const [postAll, setPostAll] = useState([])
    const [admin, setAdmin] = useState([])
    const [loding, setLoding] = useState(true)
    const [message, setMessage] = useState("")
    const auth = getAuth();
    useEffect(() => {
        fetch(`https://floating-oasis-20837.herokuapp.com/user/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data[0]))
    }, [user.email])
    const sentResetPassByEmail = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError("")
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }
    // username email and password register
    const createUser = (email, password, displayName, location, navigate) => {
        setLoding(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                updateName(displayName)
                const user = {
                    email, displayName
                }
                setUser(user)
                saveUser(email, displayName, "POST")
                trySuccessAlart("Congratulations!", "You have successfully Register", "success")
                setError("")

            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            }).finally(() => setLoding(false))

    }
    const saveUser = (email, displayName, type) => {
        const user = {
            email, displayName
        }
        fetch("https://floating-oasis-20837.herokuapp.com/user", {
            method: type,
            "headers": {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then()
    }
    const handleSubmitLogin = (email, password, location, navigate) => {
        setLoding(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const destination = location?.state?.from || '/';
                navigate(destination);
                const user = userCredential.user;
                setUser(user)
                setError("")
                trySuccessAlart("Congratulations!", "You have successfully Login", "success")
                setMessage("Congratulations you have Successfully Login")
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                trySuccessAlart("Opps!", "Something Worng", "error")
                setError(errorMessage)
            }).finally(() => setLoding(false))
    }

    // username email and password register
    const logOut = () => {
        setLoding(true)
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser({})
            trySuccessAlart("Congratulations!", "You have successfully Logout", "success")
            setError("")

        }).catch((error) => {
            setError(error.errorMessage)
            trySuccessAlart("Opps!", "Something Worng", "error")
        }).finally(() => setLoding(false))
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setLoding(false)
        })
    }, [user.email])

    const trySuccessAlart = (a, b, c) => {
        Swal.fire(
            a,
            b,
            c,    
        )
    }

    const updateName = (displayName) => {
        updateProfile(auth.currentUser, {
            displayName: displayName,
        }).then(() => {
            setError("")
        }).catch((error) => {
            setError(error.errorMessage)
        });
    }

    useEffect(() => {
        fetch("https://floating-oasis-20837.herokuapp.com/post").then(res => res.json()).then(data => setProduct(data))
    }, [])
  
    useEffect(() => {
        fetch("https://floating-oasis-20837.herokuapp.com/addPost/find").then(res => res.json()).then(data => setPost(data))
    }, [post])
    useEffect(() => {
        fetch("https://floating-oasis-20837.herokuapp.com/addPost/pre").then(res => res.json()).then(data => setPostAll(data))
    }, [postAll])

    return {
        product, logOut, message, loding, error, user, createUser, sentResetPassByEmail, saveUser, admin, trySuccessAlart,post, postAll,setPostAll,setPost,handleSubmitLogin
    }
};
export default AllData;