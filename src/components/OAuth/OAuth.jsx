import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";

import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";

import './OAuth.scss';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function OAuth() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleLogin = async (e) => {
        e.preventDefault();

        const googleProvider = new GoogleAuthProvider();

        try {
            const user = await signInWithPopup(auth, googleProvider);
            toast.success("Google Login Successful!");
            navigate("/");
            console.log(user);
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Google Login Failed!");
        }
    };

    return (
        <button className="o-auth" type="button" onClick={handleGoogleLogin}>
            <span><FcGoogle size={20} /> Continue with Google</span>
        </button>
    );
}

export default OAuth;