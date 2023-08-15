import React, { useState } from 'react'
import PropTypes from "prop-types";

function TextForm(props) {
  const [text,setText] = useState('');
  const handleUpClick = () =>{
    let newText = text.toUpperCase();
    setText(newText)
    props.showAlert("Converted to uppercase","success");
  }
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase","success");
  }
  const handleOnChange = (event) =>{
    setText(event.target.value)
  }
  const handleClearClick = () =>{
    setText("");
    props.showAlert("Text Cleared","success");

  }
  const handleSentCase = () => {
    const paras = text.split("\n\n");
    const capParas = paras.map(p=>{
        const sen = p.split(". ");
        const capSen = sen.map(s=>{
            return s[0].toUpperCase()+s.slice(1);
        })
        return capSen.join(". ");
    })
    const res = capParas.join("\n\n");
    setText(res);
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Converted to copied text","success");
  }
  const calcLength = () => {
    let txtLen = text.trim().split(/\s+/).length;
    if(text.trim()===""){
        txtLen=0;
    }
    return txtLen>0?txtLen:0;
  }
  return (
    <>
        <div className='container' style={{color: props.mode==='dark'?'white':'black'}}>
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" id="myBox" rows="8" value={text} onChange={handleOnChange} placeholder='Enter the text' style={{backgroundColor: props.mode === 'light' ? 'white':'#708090',color: props.mode==='dark'?'white':'gray'}}></textarea>
            </div>

            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to UpperCase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLoClick}>Convert to LowerCase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleClearClick}>Clear the Text Area</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleSentCase}>Sentence Case</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
        </div>
        <div className='container my-3' style={{color: props.mode==='dark'?'white':'black'}}>
            <h2>Your text summary</h2>
            <p>{calcLength()} words and {text.length} characters</p>
            <p>You need {0.008 * calcLength()} Minutes read</p>
            <h4>Preview</h4>
            <p>{text.length>0 ? text : "Nothing to preview"}</p>
        </div>
    </>
  )
}

export default TextForm