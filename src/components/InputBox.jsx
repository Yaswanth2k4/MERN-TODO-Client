import React,{useState} from "react";
import "./CSS/InputBox.css";

function InputBox(props)
{
    const [value,setValue]=useState("");
    function handleChange(event)
    {
        setValue(event.target.value);
    }

    function handleClick()
    {
        props.addNote(value);
        setValue("");
    }

    return(
        <div className="input-box">
            <input className="text-input" type="text" placeholder="New Note" onChange={handleChange} value={value} ></input>
            <button className="add-button" onClick={handleClick} >
                <div className="vertical"></div>
                <div className="horizontal"></div>
            </button>
        </div>
    )
}

export default InputBox;