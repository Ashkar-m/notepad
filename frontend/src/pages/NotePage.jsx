import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const NotePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    let [note, setNote] = useState(null);
    let noteId = id
    

    useEffect( () => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        if (noteId === 'new') return

        let response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`);
        let data = await response.json();
        setNote(data);
    }

    let createNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        
        navigate('/')
    }

    let handleSubmit = () => {
        if (noteId !== 'new' && note.body == ''){
            deleteNote();
        } else if (noteId !== 'new'){
            updateNote();
        } else if (noteId === 'new' && note.body !== null) {
            createNote();
        }
        navigate('/')
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }));
    }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3> <button onClick={handleSubmit}> &lt; </button> </h3>
            {noteId !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
            ) : (
                <button onClick={handleSubmit}>Done</button>
            )}
        </div>
        <textarea onChange={ (e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage;
