import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate  } from "react-router-dom";

import { db } from "../../../firebase/config";

import { StateContext } from "../../../App";
import { UseAuth } from "../../../context/AuthContext2";
import { deleteDoc, doc } from "firebase/firestore";

import SpinnerNotes from "../../../components/SpinnerNotes/SpinnerNotes";

import { ImUserCheck } from "react-icons/im";

import { FaEdit, FaTrash } from "react-icons/fa";

import { toast } from "react-toastify";

import "./NoteEdit.scss";

const NoteEdit = ({ onEditNote }) => {
    const [notes, setNotes] = useState([]);

    const { data, loading } = useContext(StateContext);
    const currentUser = UseAuth();

    const navigate = useNavigate();

    if (notes.length === 0) {
        return (
            <div className="empty-notes">
                <p>No notes yet. Create your first note!</p>
            </div>
        );
    }

    return (
      <>
        {!loading ? (
          <div className="loading">
            <div className='loading-content'>
              <h4>Loading notes...</h4>
              <div className='loading-spinner'><SpinnerNotes /></div>
            </div>
          </div>
        ) : (
          <div className='note-edit'>
            <div className="note-edit-container">
                {loading && <SpinnerNotes />}
                {data.map((notes) => (
                    <div
                        className=""
                        key={notes.id}
                    >
                        <section className="">
                        <h3 className="">
                            <Link to={`/note/${notes.id}`}>
                                <button className="btn-note-edit">
                                    <FaEdit />
                                </button>
                            </Link>
                        </h3>
                        <p className="text-xs mt-8">{notes.body}</p>
                        </section>
                    </div>
                ))}
            </div>
        </div>
      )}
      </>
    );
};

export default NoteEdit;