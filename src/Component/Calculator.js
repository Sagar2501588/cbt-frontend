// import React, { useState } from "react";
// import "./Calculator.css";

// function Calculator() {
//   const [value, setValue] = useState("");

//   const handleClick = (val) => {
//     if (val === "C") setValue("");
//     else if (val === "=") {
//       try {
//         // Evaluate expression safely
//         setValue(eval(value.replace("√", "Math.sqrt").replace("^", "**")));
//       } catch {
//         setValue("Error");
//       }
//     } else if (val === "π") setValue(value + Math.PI);
//     else if (val === "sin") setValue(value + "Math.sin(");
//     else if (val === "cos") setValue(value + "Math.cos(");
//     else if (val === "tan") setValue(value + "Math.tan(");
//     else if (val === "log") setValue(value + "Math.log10(");
//     else if (val === "ln") setValue(value + "Math.log(");
//     else setValue(value + val);
//   };

//   const buttons = [
//     "7", "8", "9", "/", "√",
//     "4", "5", "6", "*", "^",
//     "1", "2", "3", "-", "π",
//     "0", ".", "=", "+", "C",
//     "sin", "cos", "tan", "log", "ln"
//   ];

//   return (
//     <div className="calc-container">
//       <input type="text" className="calc-display" value={value} readOnly />
//       <div className="calc-buttons">
//         {buttons.map((b, i) => (
//           <button key={i} onClick={() => handleClick(b)}>
//             {b}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Calculator;

import React, { useState } from "react";
// import "./Calculator.css";

export default function Calculator() {
  const [msg, setMsg] = useState("");

  const downloadExe = () => {
    const link = document.createElement("a");
    link.href = "/gate-calculator.exe"; // Put EXE inside /public/
    link.download = "GATE-Scientific-Calculator.exe";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show confirmation message
    setMsg("📥 Download started! Please check your browser's download bar.");
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <div 
      className="calc-wrapper" 
      style={{
        textAlign: "center",
        padding: "30px",
        maxWidth: "450px",
        margin: "40px auto",
        background: "#f8f9fb",
        borderRadius: "12px",
        boxShadow: "0 0 12px rgba(0,0,0,0.15)"
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#1a73e8" }}>
        Official GATE Calculator (EXE)
      </h2>

      <p style={{ 
        fontSize: "15px", 
        marginBottom: "25px",
        color: "#444"
      }}>
        Click the button below to download the original GATE Scientific Calculator.
      </p>

      {/* Main Download Button */}
      <button
        onClick={downloadExe}
        style={{
          background: "#1a73e8",
          color: "white",
          padding: "14px 22px",
          fontSize: "17px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          width: "100%",
          transition: "0.3s"
        }}
        onMouseOver={(e) => (e.target.style.background = "#0b59c9")}
        onMouseOut={(e) => (e.target.style.background = "#1a73e8")}
      >
        ⬇ Download GATE Calculator (.EXE)
      </button>

      {/* ✔ Smooth notification below button */}
      {msg && (
        <div
          style={{
            marginTop: "18px",
            padding: "12px",
            background: "#d1f7c4",
            color: "#065d00",
            borderRadius: "6px",
            fontSize: "14px",
            animation: "fadeIn 0.3s"
          }}
        >
          {msg}
        </div>
      )}

      <p style={{ 
        marginTop: "20px", 
        color: "red", 
        fontSize: "13px" 
      }}>

        To use the calculator, please open the downloaded GATE Calculator (.exe) 
        file manually from your browser’s Downloads section or Downloads folder.

      </p>
    </div>
  );
}
