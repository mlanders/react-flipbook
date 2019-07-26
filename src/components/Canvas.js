import React from "react";
import draw from "../reducers/drawingReducer.js"
import { addOpacity } from '../logic/colorConversion.js';


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: false,
      urlArray: [],
      currentUrl: "",
      prevFrame: "",
      speed: 200
    };
    this.origin = [];
    this.destArray = [];
    this.stagingCanvas = {};
    this.mainCanvas = {};
    this.stagingCtx = {};
    this.mainCtx = {};
  }

  eyeDropper = (x, y, palette) => {
    let selectedColor;
    const pixel = this.mainCtx.getImageData(x, y, 1, 1);
    const data = pixel.data;
    selectedColor = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${(data[3] / 255)})`;
    if (selectedColor !== undefined) {
      this.setState({
        colorSettings: {
          ...this.props.colorSettings,
          [palette]: selectedColor
        }
      })
    }
  }

  handleMouseDown = e => {
    e.preventDefault();
    const [ x, y ] = [ e.nativeEvent.offsetX, e.nativeEvent.offsetY ]
    this.setState({
      isDrawing: true
    });
    this.origin = [ x, y ];
    this.destArray = [ x, y ];

    if (this.props.activeTool === "eyeDropper") {
      return this.eyeDropper(x, y, e.ctrlKey ? "secondary" : "primary")
    }
  };

  handleMouseMove = e => {
    if (!this.state.isDrawing) return;
    const [ x, y ] = [ e.nativeEvent.offsetX, e.nativeEvent.offsetY ]
    const color = addOpacity(
      this.props.colorSettings.primary,
      this.props.toolSettings[this.props.activeTool].opacity
    )
    this.stagingCtx.lineWidth = this.props.toolSettings[this.props.activeTool].width;
    this.stagingCtx.strokeStyle = color;
    this.stagingCtx.fillStyle = color;

    let params = { orig: this.origin, dest: [ x, y ] };
    switch (this.props.activeTool) {
      case "pencil":
        this.destArray = [...this.destArray, [ x, y ]];
        this.origin = [ x, y ];
        return draw(this.stagingCtx, { action: "drawLine", params })    
                
      case "line":
        params = {
          ...params,
          clearFirst: true
        }
        return draw(this.stagingCtx, { action: "drawLine", params })    
        
      case "fillRect":
        params = {
          ...params,
          clearFirst: true
        }
        return draw(this.stagingCtx, { action: "fillRect", params })

      case "drawRect":
        params = {
          ...params,
          clearFirst: true
        }
        return draw(this.stagingCtx, { action: "drawRect", params })

      case "eraser":
        params = {
          ...params,
          composite: "destination-out"
        }
        this.mainCtx.strokeStyle = "rgba(0, 0, 0, 1)";
        this.mainCtx.lineWidth = this.props.toolSettings.eraser.width;
        this.origin = [ x, y ]
        return draw(this.mainCtx, { action: "drawLine", params })
        
      case "eyeDropper":
        return this.eyeDropper(x, y, e.ctrlKey ? "secondary" : "primary");

      case "move":
        this.origin = [ x, y ];
        return draw(this.mainCtx, { action: "move", params })
          
      default:
        break;
    }
  };

  handleMouseUp = e => {
    e.preventDefault();
    if (!this.state.isDrawing) return;
    const [ x, y ] = [ e.nativeEvent.offsetX, e.nativeEvent.offsetY ]
    const color = addOpacity(
      this.props.colorSettings.primary,
      this.props.toolSettings[this.props.activeTool].opacity
    )
    this.setState({
      isDrawing: false
    });
    this.stagingCtx.clearRect(0, 0, this.stagingCanvas.width, this.stagingCanvas.height)
    this.mainCtx.lineWidth = this.props.toolSettings[this.props.activeTool].width;
    this.mainCtx.strokeStyle = color;
    this.mainCtx.fillStyle = color;

    let params = { orig: this.origin, dest: [ x, y ] };
    switch (this.props.activeTool) {
      case "pencil":
        params = {
          ...params,
          orig: this.destArray[0],
          destArray: this.destArray
        }
        return draw(this.mainCtx, { action: "drawLineArray", params })    
                
      case "line":
        return draw(this.mainCtx, { action: "drawLine", params })    
        
      case "fillRect":
        return draw(this.mainCtx, { action: "fillRect", params })

      case "drawRect":
        return draw(this.mainCtx, { action: "drawRect", params })
          
      default:
        break;
    }
  };

  saveData = e => {
    e.preventDefault();
    const url = this.mainCanvas.toDataURL("image/png");
    this.setState(
      prev => ({
        urlArray: [...prev.urlArray, url],
        prevFrame: url
      }),
      () => this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height)
    );
  };

  playFlipbook = (e, i) => {
    e.preventDefault();
    this.state.urlArray.map((x, i) =>
      setTimeout(
        () =>
          this.setState({
            currentUrl: x
          }),
        i * this.state.speed
      )
    );
  };

  clearBook = e => {
    e.preventDefault();
    this.setState({
      urlArray: [],
      currentUrl: "",
      prevFrame: ""
    });
  };

  changeSpeed = e => {
    this.setState({
      speed: e.target.value
    });
  };

  render() {
    return (
      <>
        <div className="drawing">
          <h3>Drawing:</h3>{" "}
          <div style={{ position: "relative", width: "200px", height: "200px", marginBottom: "5px"}}>
            <canvas
              width="200"
              height="200"
              ref={canvas => {
                if (canvas) {
                  this.stagingCanvas = canvas;
                  this.stagingCtx = canvas.getContext("2d");
                  this.stagingCtx.lineJoin = "round";
                  this.stagingCtx.lineCap = "round";
                }
              }}
            />
            <canvas
              width="200"
              height="200"
              ref={canvas => {
                if (canvas) {
                  this.mainCanvas = canvas;
                  this.mainCtx = canvas.getContext("2d");
                  this.mainCtx.lineJoin = "round";
                  this.mainCtx.lineCap = "round";
                }
              }}
              onMouseDown={this.handleMouseDown}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}
              onMouseOut={this.handleMouseUp}
            />
          </div>
          <div className="buttons">
            <button onClick={this.saveData}>Add Frame</button>
            <button onClick={this.clearBook}>Clear Book</button>
            <button onClick={this.playFlipbook}>Play</button>
            <p>Delay time:</p>
            <input
              type="range"
              min="20"
              max="1000"
              value={this.state.speed}
              onChange={this.changeSpeed}
            />
          </div>
        </div>
        <div className="img-wrapper">
          <h3>Previous Frame:</h3>
          <img alt="" src={this.state.prevFrame} />
        </div>
        <div className="img-wrapper">
          <h3>Playing:</h3> <img alt="" src={this.state.currentUrl} />
        </div>
      </>
    );
  }
}

export default Canvas;
