import React, { useState } from "react";
import './App.css'

const colors = [
  { value: -100, color: "#bf0b1b" },
  { value: -50, color: "#961823" },
  { value: -1, color: "#702329" },
  { value: 0, color: "#3a1d1d" },
  { value: 1, color: "#23493d" },
  { value: 50, color: "#46917d" },
  { value: 100, color: "#41bc9c" },
];

const generateMatrix = () => {
  const matrix = new Array(13).fill(0).map(() => new Array(13).fill(0));
  for (let i = 0; i < 169; i++) {
    const row = Math.floor(i / 13);
    const col = i % 13;
    matrix[row][col] = Math.floor(Math.random() * 201) - 100;
  }
  return matrix;
};

const App = () => {
  const [matrix, setMatrix] = useState(generateMatrix());
  const [filter, setFilter] = useState("");

  const getCellColor = (value) => {
    const colorIndex = colors.findIndex((c) => value <= c.value);
    return colors[colorIndex].color;
  };

  const applyFilter = (row) => {
    switch (filter) {
      case "positive":
        return row.map((val) => (val > 0 ? val : null));
      case "negative":
        return row.map((val) => (val < 0 ? val : null));
      default:
        return row;
    }
  };

  const filteredMatrix = matrix.map((row) => applyFilter(row));

  return (
    <div className="App-header">
      <h3 style={{ color: "#282c34" }}>Draw Table</h3>
      <table className="table">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((val, j) => (
                <td
                  className="item"
                  key={j}
                  style={{
                    backgroundColor: filteredMatrix[i][j] !== null
                      ? getCellColor(val)
                      : "#282c34",
                  }}
                >
                  {filteredMatrix[i][j] !== null ? val : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="button button1" onClick={() => setFilter("positive")}>
          More than 0
        </button>
        <button className="button button3" onClick={() => setFilter("")}>
          All
        </button>
        <button className="button button2" onClick={() => setFilter("negative")}>
          Less than 0
        </button>
      </div>
    </div>
  );
};

export default App;

