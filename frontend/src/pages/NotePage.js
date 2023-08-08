import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

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
        <div>
            <p>{note?.body}</p>
        </div>
    );
};

export default NotePage;