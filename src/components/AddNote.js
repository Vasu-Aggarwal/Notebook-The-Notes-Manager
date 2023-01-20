import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const handleCreateNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        props.showAlert("Note Created Successfully", "success");
    }

    const onchange = (e) => {
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <div>
            <div className="container">
                <h3>Add a note</h3>

                <form>
                    <div className="mb-3 my-4">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Decription</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange}/>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={handleCreateNote}>Create a Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote