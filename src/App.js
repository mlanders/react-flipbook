import React from "react";

import Canvas from "./components/Canvas";
import "./App.css";
import ToolSelector from "./components/ToolSelector";
import ColorSettings from "./components/ColorSettings";
import ToolSettings from "./components/ToolSettings";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      colorSettings: {
        primary: "rgba(0, 0, 0, 1)",
        secondary: "rgba(255, 255, 255, 1)"
      },
      toolSettings: {
        pencil: { name: "Pencil", width: 5, opacity: 1 },
        line: { name: "Line", width: 5, opacity: 1 },
        fillRect: { name: "Fill Rectangle", width: 5, opacity: 1 },
        drawRect: { name: "Draw Rectangle", width: 5, opacity: 1 },
        eraser: { name: "Eraser", width: 5, opacity: 0 },
        eyeDropper: { name: "Eye Dropper", width: 0, opacity: "" },
        move: { name: "Move", width: 0, opacity: "" }
      },
      activeTool: "pencil"
    };
  }

  setActiveTool = e => {
    e.preventDefault();
    this.setState({
      activeTool: e.target.name
    });
  };

  setColor = (palette, value) => {
    this.setState({
      colorSettings: { ...this.state.colorSettings, [palette]: value }
    });
  };

  switchColors = (toPrimary, toSecondary) => {
    this.setState({
      colorSettings: { primary: toPrimary, secondary: toSecondary }
    });
  };

  updateToolSettings = (tool, changes) => {
    this.setState({
      toolSettings: {
        ...this.state.toolSettings,
        [tool]: { ...this.state.toolSettings[tool], changes }
      }
    });
  };

  render() {
    return (
      <div className="App">
        <ToolSelector
          setActiveTool={this.setActiveTool}
          activeTool={this.state.activeTool}
        />
        <div className="settings-box">
          <ColorSettings
            setColor={this.setColor}
            switchColors={this.switchColors}
            primaryRgba={this.state.colorSettings.primary}
            secondaryRgba={this.state.colorSettings.secondary}
          />
          <ToolSettings 
            updateToolSettings={this.updateToolSettings}
            toolSettings={this.state.toolSettings}
            activeTool={this.state.activeTool}
          />
        </div>
        <Canvas
          colorSettings={this.state.colorSettings}
          toolSettings={this.state.toolSettings}
          activeTool={this.state.activeTool}
        />
      </div>
    );
  }
}

export default App;
