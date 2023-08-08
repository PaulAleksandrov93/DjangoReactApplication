import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
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

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to="/">
                        <ArrowLeft />
                    </Link>
                </h3>
            </div>
            <textarea defaultValue={note?.body}></textarea>
        </div>
    );
};

export default NotePage;