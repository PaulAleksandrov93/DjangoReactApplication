import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = ({ history }) => { 
    const { id } = useParams();

    const getNote = useCallback(async () => {
        let response = await fetch(`/api/notes/${id}/`);
        let data = await response.json();
        setNote(data);
    }, [id]);

    let [note, setNote] = useState(null);

    useEffect(() => {
        getNote();
    }, [getNote]);

    let updateNote = async () => {
        fetch(`/api/notes/${id}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let handleSubmit = () => {
        updateNote()
        window.history.pushState('/') 
    }    

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>                    
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body': e.target.value })}} defaultValue={note?.body}></textarea>
        </div>
    );
};

export default NotePage;