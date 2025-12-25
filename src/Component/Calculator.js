import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [value, setValue] = useState("");

  const handleClick = (val) => {
    if (val === "C") setValue("");
    else if (val === "=") {
      try {
        // Evaluate expression safely
        setValue(eval(value.replace("√", "Math.sqrt").replace("^", "**")));
      } catch {
        setValue("Error");
      }
    } else if (val === "π") setValue(value + Math.PI);
    else if (val === "sin") setValue(value + "Math.sin(");
    else if (val === "cos") setValue(value + "Math.cos(");
    else if (val === "tan") setValue(value + "Math.tan(");
    else if (val === "log") setValue(value + "Math.log10(");
    else if (val === "ln") setValue(value + "Math.log(");
    else setValue(value + val);
  };

  const buttons = [
    "7", "8", "9", "/", "√",
    "4", "5", "6", "*", "^",
    "1", "2", "3", "-", "π",
    "0", ".", "=", "+", "C",
    "sin", "cos", "tan", "log", "ln"
  ];

  return (
    <div className="calc-container">
      <input type="text" className="calc-display" value={value} readOnly />
      <div className="calc-buttons">
        {buttons.map((b, i) => (
          <button key={i} onClick={() => handleClick(b)}>
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
