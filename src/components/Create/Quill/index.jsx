import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css'

function TextEditor(props) {

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, {'font': []}],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},     {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };

  const formats = [  'header', 'font', 'size',  'bold', 'italic', 'underline', 'strike', 'blockquote',  'list', 'bullet', 'indent',  'link', 'image', 'video'];   

  return (
    <div className='quill-container'> 
        <ReactQuill
            value={props.value}
            onChange={props.onChange}
            modules={modules}
            formats={formats}
        />
    </div>
  );
}

export default TextEditor;