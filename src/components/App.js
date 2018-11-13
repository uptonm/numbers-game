import React, { Component } from "react";
import "./app.css";

class App extends Component {
  state = {
    min: 1,
    max: 3,
    width: 3,
    height: 3,
    grid: []
  };

  componentDidMount = () => {
    this.initializeGrid();
  };

  initializeGrid = () => {
    let grid = [];
    for (let y = 0; y < this.state.width; y++) {
      grid[y] = []; // Initialize inner array
      for (let x = 0; x < this.state.height; x++) {
        grid[y][x] = {};
        grid[y][x].x = x;
        grid[y][x].y = y;
        grid[y][x].value =
          Math.floor(Math.random() * (this.state.max - this.state.min)) +
          this.state.min;
        grid[y][x].hover = false;
      }
    }
    this.setState({ grid }, () => console.log(this.state.grid));
  };

  onHover = e => {
    let grid = this.state.grid;
    let x = e.target.id.substring(0, 1);
    let y = e.target.id.substring(2, 3);
    grid[y][x].hover = true;

    // Check Left Square
    if (x > 0) {
      if (grid[y][x - 1].value === grid[y][x].value) {
        grid[y][x - 1].hover = true;
      }
    }

    // Check Down Square
    console.log(grid[y][x]);
    console.log(grid[y + 1][x]);
    // if (y < ) {
    // console.log(grid[y][x + 1]);
    // if (grid[y][x + 1].value === grid[y][x].value) {
    //   grid[y][x + 1].hover = true;
    // }
    // }
    this.setState({ grid });
  };

  onHoverOff = e => {
    let grid = this.state.grid;
    let x = e.target.id.substring(0, 1);
    let y = e.target.id.substring(2, 3);
    grid[y][x].hover = false;
    if (x > 0) {
      if (grid[y][x - 1].value === grid[y][x].value) {
        grid[y][x - 1].hover = false;
      }
    }
    this.setState({ grid });
  };

  renderGrid = () => {
    return this.state.grid.map(row => {
      return row.map(cell => {
        return (
          <div
            id={`${cell.x}-${cell.y}`}
            key={`${cell.x}-${cell.y}`}
            onMouseOver={this.onHover}
            onMouseLeave={this.onHoverOff}
            className={cell.hover ? "hover" : ""}
          >
            <h1 id={`${cell.x}-${cell.y}`}>{cell.value}</h1>
          </div>
        );
      });
    });
  };

  render() {
    return <div className="grid">{this.renderGrid()}</div>;
  }
}

export default App;
