import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className='col-md-4 my-1'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <div className="d-flex justify-content-end">
                        {/* Edit button */}
                        <div className="btn btn-warning mx-3"><i className="far fa-edit mx-1" onClick={() => {
                            updateNote(note)
                        }} /></div>
                        {/* Delete Button */}
                        <div className="btn btn-danger"><i className="far fa-trash-alt mx-1" onClick={() => {
                            deleteNote(note._id); 
                            props.showAlert("Note Deleted Successfully", "success");
                        }} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem