import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../../utils/axios';

import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/config";

import { UseAuth } from "../../../context/AuthContext";

import Alert from "../../../components/Alert/Alert";
import SpinnerNotes from "../../../components/SpinnerSmall/SpinnerSmall";

import { FaEdit } from "react-icons/fa";

import { toast } from "react-toastify";

import "./NoteCreate.scss";

const NoteCreate = ({ note, handleCloseNoteModal }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const currentUser = UseAuth(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    const validate = () => {
        let errorMessage = {};

        if (!title || title === "" || title.trim() === '' || title.length === 0 || title === null) {
            errorMessage.title = "Please enter note title!!";
        }

        if (!content || content === "" || content.trim() === '' || content.length === 0 || content === null) {
            errorMessage.content = "Please enter note content!";
        }

        setErrors(errorMessage);
        return Object.keys(errorMessage).length === 0;            
    }

    const closeNoteModal = () => {
        handleCloseNoteModal(false);
    }

    const handleAddNote = async (e) => {
        e.preventDefault();
        validate();

        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 4000);
        
        if (!auth.currentUser) {
          toast.error("User not logged in!");
          return;
        }

        if (!title.trim() || !content.trim()) {
            toast.error(`Note wasn't be created!`)
        } else {
            try {
                await addDoc(
                    collection(db, "notes", auth.currentUser.uid, "userNotes"), {
                        title,
                        content,
                        time: serverTimestamp(),
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    }
                );
                await api.post('/notes-list', {
                    title,
                    content,
                });
                handleCloseNoteModal(true);
                toast.success("Note added successfully!");
            } catch (err) {
                toast.error(`Note adding failed!`);
            }
        }
    };

    return(
        <>
            {loading ? (
                <div className="loading">
                    <div className='loading-content'>
                        <h4>Loading create note...</h4>
                        <div className='loading-spinner'>
                            <SpinnerNotes />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="note-create">
                        <div className="note-create-container">
                            <h3>Create New Note</h3>
                            <form onSubmit={handleAddNote} className='create-form'>
                                <div className='create-content'>
                                <div className='create-group'>
                                    <label>Note title:</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter note title..."
                                    />
                                    {isVisible ? <Alert alertText={errors.title} /> : null}
                                </div>
                                <div className='create-group'>
                                    <label>Note:</label>
                                    <textarea
                                        type='text'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Enter note content..."
                                        rows="6"
                                    />
                                    {isVisible ? <Alert alertText={errors.content} /> : null}
                                </div>
                                </div>
                                <div className="create-actions">
                                    <button
                                        type="button"
                                        className='btn-create-cancel'
                                        onClick={closeNoteModal}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className='btn-create-add'
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default NoteCreate;