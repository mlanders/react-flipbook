import React from 'react';

export default function ToolCard(props) {
  const { width, opacity } = props.toolSettings[props.activeTool];
  const toolName = props.toolSettings[props.activeTool].name

  const handleInputWidth = e => {
    let value = Number(e.target.value);
    props.updateToolSettings(props.activeTool, "width", value )
  }

  const handleInputOpacity = e => {
    let value = Number(e.target.value) / 100;
    props.updateToolSettings(props.activeTool, "opacity", value )
  }

  return (
    <div className="tool-settings">
      <p>{toolName}</p>
      <label style={{ display: width ? "flex" : "none" }}>Width
        <input className="width-picker" value={width} onChange={handleInputWidth} type="number"/>
      </label>
      <label style={{ display: opacity && props.activeTool !== "eraser" ? "flex" : "none" }}>Opacity
        <input className="opacity-picker" value={opacity * 100} onChange={handleInputOpacity} type="number"/>
        <input className="opacity-slider" value={opacity * 100} onChange={handleInputOpacity} type="range" min="0" max="100"/>
      </label>
    </div>
  )
}
