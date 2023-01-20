import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8000";

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Fetch all Note
  const getNotes = async () => {

    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })

    const json = await response.json();

    setNotes(json)
  }

  //Add a Note
  const addNote = async (title, description, tag) => {

    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    })

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Delete a Note
  const deleteNote = async (id) => {

    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })

    const json = response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {

    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    })

    const json = await response.json();

    const updatedNote = JSON.parse(JSON.stringify(notes));

    for (let i = 0; i < updatedNote.length; i++) {
      const element = updatedNote[i];
      if (element._id === id) {
        updatedNote[i].title = title;
        updatedNote[i].description = description;
        updatedNote[i].tag = tag;
        break;
      }
    }
    setNotes(updatedNote);
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;