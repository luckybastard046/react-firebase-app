import React from "react";

import { UseAuth } from "../../../context/AuthContext";

import SpinnerSmall from "../../../components/SpinnerSmall/SpinnerSmall";

const Message = ({ message }) => {
    const { loading } = UseAuth(); 

    if (message.length === 0) {
        return (
            <div className="empty-message">
                <p>No message yet. Create your first message!</p>
            </div>
        );
    }

    return (
        <>
            {message ? (
                <div>
                    <div className="">
                        <p className="user-name">{message.title}</p>
                        <p className="user-message">{message.message}</p>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="chat-bubble__right">
                        <SpinnerSmall />
                    </div>
                </div>
            )}
        </>
    );
};
export default Message;
