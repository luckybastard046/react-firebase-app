// Form for creating/editing notes
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseAuth } from '../../../context/AuthContext';

import { auth, db } from '../../../firebase/config';
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore';

import Alert from '../../../components/Alert/Alert';
import SpinnerNotes from '../../../components/SpinnerSmall/SpinnerSmall';

import { toast } from 'react-toastify';

import './NoteForm.scss';


export default function NoteForm({ note, handleCloseNoteModal, onClose }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const currentUser = UseAuth(); 

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

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const handleAddNote = async (e) => {
        e.preventDefault();
        validate();

        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        setLoading(true);

        if (!title.trim() || !content.trim()) {
            toast.error(`Note wasn't be created!`)
        } else {
            try {
                const noteData = {
                    title,
                    content,
                    userId: currentUser.uid,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                };
                
                if (!note) {
                    // Update existing note
                    const noteRef = doc(db, 'notes', note.id);
                    await updateDoc(noteRef, noteData);
                } else {
                    // Create new note
                    noteData.createdAt = serverTimestamp();
                    await addDoc(collection(db, 'notes'), noteData);
                }
                console.log(noteData);
                console.log(note);
                toast.success("Note added successfully!");
                onClose();
            } catch (err) {
                setLoading(false);
                toast.error(`Note adding failed!`);
            }
        }
    };

    const closeNoteModal = () => {
        handleCloseNoteModal(false);
    }

    return (
         <>
            {loading ? (
                <div className="loading">
                    <div className='loading-content'>
                        <h4>Loading create modal...</h4>
                        <div className='loading-spinner'>
                            <SpinnerNotes />
                        </div>
                    </div>
                </div>
            ) : (
            <div className="note-form">
                <div className="note-form-container">
                    <div className="note-form-content">
                        <h3>{note ? 'Edit Note' : 'Create New Note'}</h3>
                            <form onSubmit={handleAddNote} className='form'>
                                <div className='note-content'>
                                <div className='note-group'>
                                    <label>Note title:</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter note title..."
                                    />
                                    {isVisible ? <Alert message={errors.title} /> : null}
                                </div>
                                <div className='note-group'>
                                    <label>Note:</label>
                                    <textarea
                                        type='text'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Enter note content..."
                                        rows="6"
                                    />
                                    {isVisible ? <Alert message={errors.content} /> : null}
                                </div>
                                </div>
                                <div className="note-actions">
                                    <button
                                        type="button"
                                        className='btn-note-cancel'
                                        onClick={closeNoteModal}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className='btn-note-add'
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