const myFunctions = require('./sample-functions.js');

test('Testing div -- success', () => {
  const target = 1;
  const result = myFunctions.div(12, 12);
  expect(target).toBe(result);
});

test('Testing div --success', () => {
  const target = 1.5;
  const result = myFunctions.div(3, 2);
  expect(target).toBe(result);
});

test('Testing div --success', () => {
  const target = 0.5125;
  const result = myFunctions.div(1.025, 2);
  expect(target).toBe(result);
});

test('Testing div by zero --failure', () => {
  expect(() => myFunctions.div(5, 0)).toThrow(Error);
});

test('Testing div string --failure', () => {
  expect(() => myFunctions.div("hello", "world")).toThrow(Error);
});

test('Testing div with negative numbers --success', () => {
  const target = -2;
  const result = myFunctions.div(-10, 5);
  expect(target).toBe(result);
});

test('Testing div with mixed signs --success', () => {
  const target = -2;
  const result = myFunctions.div(10, -5);
  expect(target).toBe(result);
});

test('Testing div with decimals --success', () => {
  const target = 0.3333;
  const result = myFunctions.div(1, 3);
  expect(result).toBeCloseTo(target, 4); // Use .toBeCloseTo for floating-point precision
});

test('Testing div with large numbers --success', () => {
  const target = 1;
  const result = myFunctions.div(1e9, 1e9);
  expect(target).toBe(result);
});

test('Testing div with zero numerator --success', () => {
  const target = 0;
  const result = myFunctions.div(0, 5);
  expect(target).toBe(result);
});

test('Testing containsNumbers at beginning --success', () => {
  const result = myFunctions.containsNumbers("1234");
  expect(result).toBeTruthy();
});

test('Testing containsNumbers in middle --success', () => {
  const result = myFunctions.containsNumbers("He11o");
  expect(result).toBeTruthy();
});

test('Testing containsNumbers at end --success', () => {
  const result = myFunctions.containsNumbers("Hell0");
  expect(result).toBeTruthy();
});

test('Testing containsNumbers no number --success', () => {
  const result = myFunctions.containsNumbers("test");
  expect(result).toBeFalsy();
});

// this test is where the code was broken originally because the whitespace is considered 
// a number
test('Testing containsNumbers at end --success', () => {
  const result = myFunctions.containsNumbers("special-characters!@#$%^&*()   test");
  expect(result).toBeFalsy();
});

test('Testing containsNumbers with only special characters --success', () => {
  const result = myFunctions.containsNumbers("@#$%^&*()");
  expect(result).toBeFalsy();
});

test('Testing containsNumbers with an empty string --success', () => {
  const result = myFunctions.containsNumbers("");
  expect(result).toBeFalsy();
});

test('Testing containsNumbers with Unicode characters --success', () => {
  const result = myFunctions.containsNumbers("こんにちは123");
  expect(result).toBeTruthy();
});