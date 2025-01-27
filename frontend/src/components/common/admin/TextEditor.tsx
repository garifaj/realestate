import { forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor = forwardRef<ReactQuill, TextEditorProps>(
  ({ value, onChange }, ref) => {
    const modules = {
      toolbar: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["clean"],
      ],
    };

    return (
      <div className="content">
        <ReactQuill
          ref={ref}
          value={value}
          theme="snow"
          onChange={onChange}
          modules={modules}
        />
      </div>
    );
  }
);

export default TextEditor;
