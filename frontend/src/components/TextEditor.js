import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({ content, setContent }) {
  return (
    <div>
      <ReactQuill value={content} onChange={setContent} placeholder="Write your chapter content here..." />
    </div>
  );
}

export default TextEditor;
