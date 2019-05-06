import React from 'react';

class Canvas extends React.Component {
  constructor(props){
    super();
    this.state = {
       isDrawing: false,
       hue: 0,
       urlArray: [],
        currentUrl:  '',
        prevFrame: '',
        speed: 200

    }   
    this.lastX = 0;
    this.lastY = 0;
    this.canvas = {};
    this.ctx = {};
  }

  handleMouseDown = e => {
    e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    this.setState({
      isDrawing: true,
    })
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
  }

handleMouseMove = e => {  
  if(!this.state.isDrawing) return;
  const rect = this.canvas.getBoundingClientRect();
  this.ctx.strokeStyle = `hsl(0, 100%, 50%)`;
  this.ctx.beginPath();
  // // start from
  this.ctx.moveTo(this.lastX, this.lastY);
  // go to

  this.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  this.ctx.stroke();

  this.lastX = e.clientX - rect.left;
  this.lastY = e.clientY - rect.top;

}

handleMouseUp = e => {
  e.preventDefault();
  this.setState({
    isDrawing: false
  })
}

saveData = e => {
    e.preventDefault();
    const url = this.canvas.toDataURL("image/png");
    this.setState( prev => ({
        urlArray: [...prev.urlArray, url],
        prevFrame: url
    }), () => this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height))
}

playFlipbook = (e, i) => {
    e.preventDefault();
    this.state.urlArray.map((x, i) => setTimeout(() => this.setState({
        currentUrl: x
    }), i * this.state.speed))
}   

clearBook = e => {
    e.preventDefault();
    this.setState({
        urlArray: [],
        currentUrl: '',
        prevFrame: '',
    })
}

changeSpeed = e => {
    this.setState({
        speed: e.target.value
    })
}

render() {
    return (
      <>     
           <div className="drawing">
           <h3>Drawing:</h3> <canvas width="200" height="200"
      ref={canvas => {
        if (canvas) {
          this.canvas = canvas;
          this.ctx = canvas.getContext("2d");
          this.ctx.lineJoin = 'round';
this.ctx.lineCap = 'round';
this.ctx.lineWidth = 10;
        }
      }}
      onMouseDown={ this.handleMouseDown }
      onMouseMove={ this.handleMouseMove }
      onMouseUp={ this.handleMouseUp }
      onMouseOut={ this.handleMouseUp }
    />

    <div className="buttons">
        <button onClick={ this.saveData }>Add Frame</button>
        <button onClick={ this.clearBook }>Clear Book</button>
        <button onClick={ this.playFlipbook }>Play</button>
        <p>Delay time:</p>
        <input type="range" min="20" max="1000" value={this.state.speed} onChange={this.changeSpeed} />
    </div>

    </div>
    <div className="img-wrapper"><h3>
        Previous Frame:
        </h3><img src={this.state.prevFrame} /></div>
    <div className="img-wrapper">
    <h3>Playing:</h3> <img src={this.state.currentUrl} />
    </div>
    </>

    );
}
}

export default Canvas;