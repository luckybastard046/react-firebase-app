import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/config";

import { UseAuth } from "../../../context/AuthContext";

import Alert from "../../../components/Alert/Alert";

import { toast } from "react-toastify";

import './SendMessage.scss';

const SendMessage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);

    const [isVisible, setIsVisible] = useState(false);

    const { currentUser } = UseAuth();
        
    const validate = () => {
        let errorMessage = {};

        if (!title || title === "" || title.trim() === '' || title.length === 0 || title === null) {
            errorMessage.title = "Please enter title!";
        }

        if (!content || content === "" || content.trim() === '' || content.length === 0 || content === null) {
            errorMessage.content = "Please enter message!";
        }

        setErrors(errorMessage);
        return Object.keys(errorMessage).length === 0;            
    }

    useEffect(() => {
        setTitle(title);
        setContent(content);
    }, [title, content]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        validate();
     
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 4000);
         
        try {
            await setDoc(doc(db, "messages"), {
                title: title,
                content: content,
                createdAt: serverTimestamp(),
                uid: currentUser.uid,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form className="send-message" onSubmit={handleSendMessage}>
                <div className='send-message-group'>
                    <label htmlFor="title">
                        Title: 
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Type title..."
                    />
                    {isVisible ? <Alert alertText={errors.title} /> : null}
                </div>
                <div className='send-message-group'>
                    <label htmlFor="message">
                        Message: 
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Type content..."
                        rows="6"
                    />
                    {isVisible ? <Alert alertText={errors.content} /> : null}
                </div>
                <button type="submit" className='btn-message-send'>Send</button>
            </form>
        </div>
    );
};
export default SendMessage;
