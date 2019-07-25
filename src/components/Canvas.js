import React from "react";

class Canvas extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isDrawing: false,
      // hue: 0,
      urlArray: [],
      currentUrl: "",
      prevFrame: "",
      speed: 200,
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
      activeTool: "pencil",
    };
    this.origin = [];
    this.destArray = [];
    this.lastX = 0;
    this.lastY = 0;
    this.stagingCanvas = {};
    this.canvas = {};
    this.ctx = {};
  }

  handleMouseDown = e => {
    e.preventDefault();
    const [x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
    // const rect = this.canvas.getBoundingClientRect();
    this.setState({
      isDrawing: true
    });
    this.origin = [x, y];
    this.destArray = [];
    // this.lastX = e.clientX - rect.left;
    // this.lastY = e.clientY - rect.top;
    if (this.state.activeTool === "eyeDropper") {
      
    }
  };

  handleMouseMove = e => {
    if (!this.state.isDrawing) return;
    const [x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
    this.stagingCtx.lineWidth = this.state.toolSettings[this.state.activeTool].width;
    this.stagingCtx.strokeStyle = this.state.colorSettings.primary;
    this.stagingCtx.fillStyle = this.state.colorSettings.primary;
    // const rect = this.canvas.getBoundingClientRect();
    // this.ctx.strokeStyle = `hsl(${this.state.hue}, 100%, 0)`;
    // this.ctx.beginPath();
    // // start from
    // this.ctx.moveTo(this.lastX, this.lastY);
    // go to

    // this.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    // this.ctx.stroke();

    // this.lastX = e.clientX - rect.left;
    // this.lastY = e.clientY - rect.top;
  };

  handleMouseUp = e => {
    e.preventDefault();
    this.setState({
      isDrawing: false
    });
    this.ctx.lineWidth = this.state.toolSettings[this.state.activeTool].width;
    this.ctx.strokeStyle = this.state.colorSettings.primary;
    this.ctx.fillStyle = this.state.colorSettings.primary;
  };

  saveData = e => {
    e.preventDefault();
    const url = this.canvas.toDataURL("image/png");
    this.setState(
      prev => ({
        urlArray: [...prev.urlArray, url],
        prevFrame: url
      }),
      () => this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
          <div style={{ position: "relative", width: "200px", height: "200px"}}>
            <canvas
              style={{ position: "absolute"}}
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
              style={{ position: "absolute"}}
              width="200"
              height="200"
              ref={canvas => {
                if (canvas) {
                  this.canvas = canvas;
                  this.ctx = canvas.getContext("2d");
                  this.ctx.lineJoin = "round";
                  this.ctx.lineCap = "round";
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
