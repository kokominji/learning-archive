import "./Editor.css";
import { useState, useRef } from "react";

const Editor = ({ onCreate }) => {
  const [content, setContnet] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContnet(e.target.value);
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onsubmit();
    }
  };
  const onsubmit = () => {
    if (content === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContnet("");
  };
  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeydown}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
      />
      <button onClick={onsubmit}>추가</button>
    </div>
  );
};

export default Editor;
