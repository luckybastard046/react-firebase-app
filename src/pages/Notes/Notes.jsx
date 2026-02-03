import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { UseAuth } from '../../context/AuthContext';

import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';

import RootWrapper from '../../layout/Wrapper/RootWrapper/RootWrapper';
import Alert from '../../components/Alert/Alert';

import NoteCreate from './NoteCreate/NoteCreate';
import NoteModal from './NoteModal/NoteModal';
import NoteList from './NoteList/NoteList';

import { toast } from 'react-toastify';

import './Notes.scss'

const Notes = () => {
    const { currentUser } = UseAuth();
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    const [loading, setLoading] = useState([]);

    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        onSnapshot(collection(db, 'notes'), (snapshot) => {
            setNotes(snapshot.docs.map(doc => doc.data()))
        })
    }, []);

    useEffect(() => {
        if (currentUser) {
        const fetchData = async () => {
            const userRef = doc(db, "notes", currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                setNotes(userSnap.data().notes);
            } else {
                console.log('Notes data loading failed!');
            }
        };

        fetchData();
        }
    }, [currentUser]);

    const handleShowNoteModal = () => {
        if (currentUser) {
            setIsNoteModalOpen(true);
        } else {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 3500);
            
            setError('Sorry, but if you want add note, you must be logged in...')
        }
    };

     const handleShowDeleteModal = () => {
        if (currentUser) {
            setIsDeleteModalOpen(true);
        } else {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 3500);
            
            setError('Sorry, but if you want add note, you must be logged in...')
        }
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setIsNoteModalOpen(true);
    };

    const handleCloseNoteModal = () => {
        setIsNoteModalOpen(false);
        setSelectedNote(null);
    };

    function closeNoteModal() {
        setIsNoteModalOpen(false);
    }

    return (
        <RootWrapper title='Notes'>
            <motion.div 
                className="notes" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <button 
                    onClick={handleShowNoteModal}
                    className="btn-add-note"
                >
                    <span style={{ fontWeight: '600' }}>+</span> Add Note
                </button>
                <div className='notes-error'>{isVisible ? <Alert alertText={error} /> : null}</div>
                
                <div className='notes-modal'>
                    <div style={{ 
                        transform: isNoteModalOpen ? 'translateY(-2%)' : 'translateY(-100%)',
                        opacity: isNoteModalOpen ? "1" : "0",
                        transition: isNoteModalOpen ? ".3s all" : ".3s all"
                    }}>
                        <NoteModal
                            isNoteModalOpen={isNoteModalOpen}
                            onClose={closeNoteModal}
                        >
                            <NoteCreate
                                note={selectedNote}
                                handleCloseNoteModal={handleCloseNoteModal} 
                                onClose={closeNoteModal}
                            />
                        </NoteModal> 
                    </div>
                    <div>
                        <NoteList
                            onEditNote={handleEditNote}
                        />
                    </div>
                </div>
            </motion.div>
        </RootWrapper>
    );
}

export default Notes;