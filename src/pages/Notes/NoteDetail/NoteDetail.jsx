import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import api from '../../../utils/axios';

import SpinnerNotes from '../../../components/SpinnerSmall/SpinnerSmall';

import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaTrash } from 'react-icons/fa';

import { toast } from 'react-toastify';

import './NoteDetail.scss';

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log('Failed to fetch: ', error);

        toast.error('Failed to fetch the note!');
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <SpinnerNotes />
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure to delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);
      navigate('/');
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.log('Error in handleDelete: ', error);
      toast.error('Failed to delete note!');
    }
  };
  
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Please add a title or content!');
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success('Note updated sussessfully!');
      navigate('/');
    } catch (error) {
      console.log('Error saving the note', error);
      toast.error('Failed to update note!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="note-detail">
      <div className="note-detail-conteiner">
        <div className="note-detail-content">
          <div>
            <Link to="/" className="btn btn-back">
              <MdKeyboardDoubleArrowLeft className="h-5 w-5" />
               Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-note-delete"
            >
              <FaTrash />
              Delete Note
            </button>
          </div>

          {/* Card */}

          <div className="note-card">
            <div className="card-body">
              <div className="note-control">
                <label>Title: </label>
                <input
                  type="text"
                  placeholder="Enter Note title..."
                  value={note.title}
                  onChange={e => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="note-control">
                <label>Content: </label>
                <input
                  type="text"
                  placeholder="Enter note..."
                  value={note.content}
                  onChange={e => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions">
                <button
                  className="btn btn-note-save"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;