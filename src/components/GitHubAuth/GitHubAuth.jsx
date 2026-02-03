import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

import { FaGithub } from "react-icons/fa";

import { toast } from "react-toastify";

import './GitHubAuth.scss';

function GitHubAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGitHubLogin = async (e) => {
        e.preventDefault();

        const githubProvider = GithubAuthProvider();

        try {
            const result = await signInWithPopup(auth, githubProvider);
            const { user } = result;

            if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                    await setDoc(doc(db, "users", user.uid), {
                    username: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                });
            }

            toast.success("GitHub login successful!");
            navigate("/");
        } catch (error) {
            console.log("Error: ", error);
            toast.error("GitHub login failed!");
        }
    };

    return (
        <button className="o-auth" type="button" onClick={handleGitHubLogin}>
            <span><FaGithub size={20} /> Continue with GitHub</span>
        </button>
    );
}

export default GitHubAuth;