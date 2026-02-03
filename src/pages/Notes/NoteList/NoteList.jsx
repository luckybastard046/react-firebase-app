import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate  } from "react-router-dom";
import api from "../../../utils/axios";

import { db } from "../../../firebase/config";

import { UseAuth } from "../../../context/AuthContext";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";

import SpinnerNotes from "../../../components/SpinnerSmall/SpinnerSmall";

import NotesNotFound from "../NotesNotFound/NotesNotFound";
import NoteCard from "../NoteBrowse/NoteBrowse";

import { ImUserCheck } from "react-icons/im";

import { FaEdit, FaTrash } from "react-icons/fa";

import { toast } from "react-toastify";

import "./NoteList.scss";

const NoteList = ({ onEditNote }) => {
    const [rateLimited, setRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { currentUser } = UseAuth();

    useEffect(() => {
        if (!currentUser) return;

        setLoading(true);
        

        // Create query for current user's notes
        const q = query(
            collection(db, 'notes'),
            where('uid', '==', currentUser.uid)
        );

        // Real-time listener for notes
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const notesData = [];
            querySnapshot.forEach((doc) => {
                notesData.push({ id: doc.id, ...doc.data() });
            });

            // Sort by updatedAt (newest first)
            notesData.sort((a, b) =>
                (b.updatedAt?.toDate() || b.createdAt?.toDate()) -
                (a.updatedAt?.toDate() || a.createdAt?.toDate())
            );

            setNotes(notesData);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    const handleDelete = async (noteId) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await deleteDoc(doc(db, 'notes', noteId));
            } catch (error) {
                console.error('Error deleting note:', error);
                alert('Failed to delete note. Please try again.');
            }
        }
    };

    if (notes.length === 0) {
        return (
            <div className="empty-notes">
                <p>No notes yet. Create your first note!</p>
            </div>
        );
    }

    return (
      <>
        {loading ? (
          <div className="loading">
            <div className='loading-content'>
              <h4>Loading notes...</h4>
              <div className='loading-spinner'><SpinnerNotes /></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="notes-list">
              <div className='notes-list-container'>
              <h3>Your Notes</h3>
              <div className="notes-list-content">
                {notes.map((note) => (
                  <div className="note-card" key={note.id}>
                      <div className='note-card-actions'>
                        <label>Note title:</label>
                        <p>{note.title}</p>
                        <div className="note-actions">
                            <button 
                              onClick={() => onEditNote(note)}
                              className='btn-edit-note'
                            > 
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(note.id)}
                                className="btn-delete-note"
                            >
                                <FaTrash />
                            </button>
                        </div>
                      </div>
                      <div className='note-card-actions'>
                          <label>Note:</label>
                          <p>{note.content}</p>
                      </div>
                      <div className="note-footer">
                        <small>
                              Created: {note.createdAt?.toDate().toLocaleDateString()}
                              Updated: {note.updatedAt?.toDate().toLocaleDateString()}
                        </small>
                      </div>
                      <div className="notes-list-search">
                        <input
                          type="text"
                          placeholder="Search by title..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      {notes.length === 0 && !rateLimited && <NotesNotFound />}

                      {notes.length > 0 && !rateLimited && (
                        <div>
                          {notes.map((note, index) => (
                            <NoteCard key={index} note={note} setNotes={setNotes} />
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </>
    );
};

export default NoteList;