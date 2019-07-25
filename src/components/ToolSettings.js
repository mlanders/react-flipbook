import React from 'react';

export default function ToolCard(props) {
  const { width, opacity } = props.toolSettings[props.activeTool];
  const toolName = props.toolSettings[props.activeTool].name

  const inputWidthHandler = ev => {
    let value = Number(ev.target.value);
    props.updateToolSettings(props.activeTool, { "width": value })
  }

  const inputOpacityHandler = ev => {
    let value = Number(ev.target.value) / 100;
    props.updateToolSettings(props.activeTool, { "opacity": value })
  }

  return (
    <div className="tool-settings">
      <p>{toolName}</p>
      <label style={{ display: width ? "flex" : "none" }}>Width
        <input className="width-picker" value={width} onChange={inputWidthHandler} type="number"/>
      </label>
      <label style={{ display: opacity && props.activeTool !== "eraser" ? "flex" : "none" }}>Opacity
        <input className="opacity-picker" value={opacity * 100} onChange={inputOpacityHandler} type="number"/>
        <input className="opacity-slider" value={opacity * 100} onChange={inputOpacityHandler} type="range" min="0" max="100"/>
      </label>
    </div>
  )
}
