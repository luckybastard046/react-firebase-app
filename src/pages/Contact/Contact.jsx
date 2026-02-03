import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';

import RootWrapper from '../../layout/Wrapper/RootWrapper/RootWrapper';
import Message from './Message/Message';
import SendMessage from './SendMessage/SendMessage';

import './Contact.scss';

const Contact = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
                setMessages(sortedMessages);
            });
            return () => unsubscribe;
    }, []);

    return (
        <RootWrapper title='Contact'>
            <motion.div
                className="contact" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="messages-wrapper">
                    <span ref={scroll}></span>
                    <SendMessage scroll={scroll} />
                </div>
                <div>
                    {messages?.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                </div>   
            </motion.div>
        </RootWrapper>
    );
}

export default Contact;