import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => { 
    const { id } = useParams();
    const navigate = useNavigate();

    const getNote = useCallback(async () => {
        if (id === 'new') return
        let response = await fetch(`/api/notes/${id}/`);
        let data = await response.json();
        setNote(data);
    }, [id]);

    let [note, setNote] = useState(null);

    useEffect(() => {
        getNote();
    }, [getNote]);

    let createNote = async () => {
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`/api/notes/${id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }


    // let deleteNote = async () => {
    //     fetch(`/api/notes/${id}/delete/`, {
    //         method: "DELETE",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(note)
    //     })
    //     navigate('/') 
    // }


    let deleteNote = async () => {
        if (note !== null) {
            await fetch(`/api/notes/${id}/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });
        }
        navigate('/');
    }


    // let handleSubmit = () => {
    //     console.log('NOTE:', note)
    //     if(id !== 'new' && note.body === ''){
    //         deleteNote()
    //     }else if(id !== 'new'){
    //         updateNote()
    //     }else if(id === 'new' && note !== null){
    //         createNote()
    //     }
        
    //     navigate('/') 
    // } 
    
    
    let handleSubmit = async () => {
        console.log('NOTE:', note);
    
        if (id !== 'new' && note.body === '') {
            await deleteNote(); // Await the deletion process
        } else if (id !== 'new') {
            await updateNote(); // Await the update process
        } else if (id === 'new' && note.body !== null) {
            await createNote(); // Await the creation process
        }
    
        navigate('/');
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
        console.log('Handle Change:', note)
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>                    
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
                
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    );
};

export default NotePage;