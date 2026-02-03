import React, { useState } from 'react';

import { IoMdClose } from "react-icons/io";

import './NoteModal.scss'

const NoteModal = ({ isNoteModalOpen, onClose, children }) => {
    if (!isNoteModalOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='modal-btn'>
                    <button 
                        className="btn-modal-close" 
                        onClick={onClose}
                    ><IoMdClose size={20} /></button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default NoteModal;