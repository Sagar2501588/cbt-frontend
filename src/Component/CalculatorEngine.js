// CalculatorEngine.js

export function evaluateExpression(expression, mode = "Deg") {
  try {
    let expr = expression;

    // ---------------------
    // TCS MULTIPLICATION FIX
    // ---------------------
    expr = expr.replace(/(\d)\s*x\s*(\d)/g, "$1*$2");
    expr = expr.replace(/(\d)\s*x\s*\(/g, "$1*(");
    expr = expr.replace(/\)\s*x\s*(\d)/g, ")*$1");
    expr = expr.replace(/π\s*x\s*(\d)/g, "π*$1");
    expr = expr.replace(/(\d)\s*x\s*π/g, "$1*π");
    expr = expr.replace(/x/g, "*");

    // ---------------------
    // CONSTANTS
    // ---------------------
    expr = expr.replace(/π/g, Math.PI);
    expr = expr.replace(/\be\b/g, Math.E);

    // ---------------------
    // FACTORIAL
    // ---------------------
    expr = expr.replace(/(\d+)!/g, (_, n) => factorial(Number(n)));

    // ---------------------
    // ABSOLUTE VALUE |x|
    // ---------------------
    expr = expr.replace(/\|([^|]+)\|/g, "Math.abs($1)");

    // ---------------------
    // ROOTS
    // ---------------------
    expr = expr.replace(/√\(/g, "Math.sqrt(");
    expr = expr.replace(/³√\(/g, "Math.cbrt(");

    // ---------------------
    // LOGARITHMS
    // ---------------------
    expr = expr.replace(/log2\(/g, "Math.log2(");
    expr = expr.replace(/log\(/g, "Math.log10(");
    expr = expr.replace(/ln\(/g, "Math.log(");

    // ---------------------
    // EXPONENTIAL
    // ---------------------
    expr = expr.replace(/10\^\(/g, "Math.pow(10,");
    expr = expr.replace(/e\^\(/g, "Math.exp(");

    // ---------------------
    // TRIGONOMETRY
    // ---------------------
    if (mode === "Deg") {
      expr = expr.replace(/sin\(/g, "Math.sin((Math.PI/180)*");
      expr = expr.replace(/cos\(/g, "Math.cos((Math.PI/180)*");
      expr = expr.replace(/tan\(/g, "Math.tan((Math.PI/180)*");
    } else {
      expr = expr.replace(/sin\(/g, "Math.sin(");
      expr = expr.replace(/cos\(/g, "Math.cos(");
      expr = expr.replace(/tan\(/g, "Math.tan(");
    }

    // ---------------------
    // INVERSE TRIG
    // ---------------------
    expr = expr.replace(/asin\(/g, "Math.asin(");
    expr = expr.replace(/acos\(/g, "Math.acos(");
    expr = expr.replace(/atan\(/g, "Math.atan(");

    // ---------------------
    // HYPERBOLIC
    // ---------------------
    expr = expr.replace(/sinh\(/g, "Math.sinh(");
    expr = expr.replace(/cosh\(/g, "Math.cosh(");
    expr = expr.replace(/tanh\(/g, "Math.tanh(");

    // ---------------------
    // INVERSE HYPERBOLIC
    // ---------------------
    expr = expr.replace(/asinh\(/g, "Math.asinh(");
    expr = expr.replace(/acosh\(/g, "Math.acosh(");
    expr = expr.replace(/atanh\(/g, "Math.atanh(");

    // ---------------------
    // POWER
    // ---------------------
    expr = expr.replace(/\^/g, "**");

    // ---------------------
    // EVALUATE
    // ---------------------
    return eval(expr);
  } catch (err) {
    return "Error";
  }
}

// -------------------------------- //
// FACTORIAL FUNCTION
// -------------------------------- //
function factorial(n) {
  if (n < 0) return NaN;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
