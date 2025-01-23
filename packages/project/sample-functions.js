function div(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Inputs must be numbers');
  }
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}
  
// used parseInt function to extract all numbers from string to make checking easier
function containsNumbers(text) {
  for (let i = 0; i < text.length; i++) {
    if (!isNaN(parseInt(text.charAt(i), 10))) {
      return true;
    }
  }
  return false;
}


exports.div = div;
exports.containsNumbers = containsNumbers;