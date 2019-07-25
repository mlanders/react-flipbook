import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faPencilAlt,
  faArrowsAltH,
  faArrowsAlt,
  faEyeDropper
} from "@fortawesome/free-solid-svg-icons";

export default function ToolBox(props) {
  const isActive = name => {
    return props.activeTool === name ? "yellow" : "#e3e3e3";
  };

  const handleClick = e => {
    e.preventDefault();
    props.setActiveTool(e.target.name)
  }

  return (
    <div className="tool-box">
      <button
        style={{
          background: isActive("pencil"),
          borderColor: isActive("pencil")
        }}
        className="tool-button"
        title="Pencil"
        name="pencil"
        onClick={handleClick}
      >
        <span className="icon-wrapper" role="img" aria-label="Pencil">
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
      </button>
      <button
        style={{
          background: isActive("line"),
          borderColor: isActive("line")
        }}
        className="tool-button"
        title="Line"
        name="line"
        onClick={handleClick}
      >
        <span className="icon-wrapper" role="img" aria-label="Line">
          <FontAwesomeIcon icon={faArrowsAltH} />
        </span>
      </button>
      <button
        style={{
          background: isActive("fillRect"),
          borderColor: isActive("fillRect")
        }}
        className="tool-button"
        title="Fill Rectangle"
        name="fillRect"
        onClick={handleClick}
      >
        <span className="icon-wrapper" role="img" aria-label="Fill Rectangle">
          ⬛
        </span>
      </button>
      <button
        style={{
          background: isActive("drawRect"),
          borderColor: isActive("drawRect")
        }}
        className="tool-button"
        title="Draw Rectangle"
        name="drawRect"
        onClick={handleClick}
      >
        <span className="icon-wrapper" role="img" aria-label="Draw Rectangle">
          ⬜
        </span>
      </button>
      <button
        style={{
          background: isActive("eraser"),
          borderColor: isActive("eraser")
        }}
        className="tool-button"
        title="Eraser"
        name="eraser"
        onClick={handleClick}
      >
        <span className="icon-wrapper" role="img" aria-label="Eraser">
          <FontAwesomeIcon icon={faEraser} />
        </span>
      </button>
      <button
        style={{
          background: isActive("eyeDropper"),
          borderColor: isActive("eyeDropper")
        }}
        className="tool-button"
        title="Eye Dropper"
        name="eyeDropper"
        onClick={handleClick}
      >
        <span className="icon-wrapper" role="img" aria-label="Eye Dropper">
          <FontAwesomeIcon icon={faEyeDropper} />
        </span>
      </button>
      <button
        style={{
          background: isActive("move"),
          borderColor: isActive("move")
        }}
        className="tool-button"
        title="Move"
        name="move"
        onClick={handleClick}
      >
        <span className="icon-wrapper" role="img" aria-label="Move">
          <FontAwesomeIcon icon={faArrowsAlt} />
        </span>
      </button>
    </div>
  );
}
