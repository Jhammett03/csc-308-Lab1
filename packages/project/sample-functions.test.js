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

// this test is where the code was broken originally because the 
test('Testing containsNumbers at end --success', () => {
  const result = myFunctions.containsNumbers("special-characters!@#$%^&*()   test");
  expect(result).toBeFalsy();
});
