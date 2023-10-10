import React ,{useState} from "react";
import "./CSS/Note.css";
import {MdDeleteOutline,MdOutlineEdit,MdOutlineDoneOutline} from "react-icons/md";
import {TbPencilCancel} from "react-icons/tb";

function Note(props)
{
    const [value,setValue]=useState(props.text);
    const [visibility,setVisible]=useState("hidden");

    function deleteClick(event)
    {
        props.deleteNote(event.target.name)
    }

    function doneClick(event)
    {
        setVisible("hidden");
        props.editNote(event.target.name,value);
    }

    return(
        <div className="note-box">
            <MdDeleteOutline className="delete-icon"/>
            <button type="button" className="delete-icon button-on-delete-icon" onClick={deleteClick} name={props.id} >
            </button>

            <label className="note-label">{props.text}</label>

            <MdOutlineEdit className="edit-icon" />
            <button type="button" className="edit-icon button-on-edit-icon" onClick={e=>setVisible("visible")} name={props.id} >
            </button>

            <div style={{visibility:visibility}} className="note-input-box">
                <TbPencilCancel className="delete-icon"/>
                <button type="button" className="delete-icon button-on-delete-icon" onClick={e=>setVisible("hidden")} >
                </button>

                <input type="text" contentEditable="true" onChange={e=>setValue(e.target.value)}  className="note-edit-input note-label" value={value}></input>
                
                <MdOutlineDoneOutline className="edit-icon" />
                <button type="button" className="edit-icon button-on-edit-icon" onClick={doneClick} name={props.id} >
                </button>
            </div>
        </div>
    )
}

export default Note;