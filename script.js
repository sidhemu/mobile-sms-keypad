let count = -1;
let lastKeyPressed;
let start;
let firstClick = true;
let op = '';
let shouldAppend;
let lastSlowDetected = false;
const keyMap = {
  '1': ['.', ',', '!', '1'],
  '2': ['a', 'b', 'c', '2'],
  '3': ['d', 'e', 'f', '3'],
  '4': ['g', 'h', 'i', '4'],
  '5': ['j', 'k', 'l', '5'],
  '6': ['m', 'n', 'o', '6'],
  '7': ['p', 'q', 'r', 's', '7'],
  '8': ['t', 'u', 'v', '8'],
  '9': ['w', 'x', 'y', 'z', '9'],
  '0': [' ', '0'],
  '': [''],
  '#': ['#']
};

function pressKey(e, id) {
  let currKey;
  if (firstClick) {
    start = now();
    firstClick = false;
  }
  if (!lastKeyPressed) {
    lastKeyPressed = id;
  }
  if (now() - start < 1000 && lastKeyPressed === id) {
    start = now();
    shouldAppend = firstClick;
    lastSlowDetected = false;
    count++;
  } else {
    lastKeyPressed = id;
    firstClick = true;
    lastSlowDetected = true;
    shouldAppend = true;
    count = 0;
  }
  currKey = keyMap[id][count % keyMap[id].length];
  if (shouldAppend || !op || lastSlowDetected) {
    op += currKey;
  } else {
    let opArr = op.split('');
    opArr[opArr.length - 1] = currKey;
    op = opArr.join('');
  }
  document.getElementById('result').value = op;
}

function now() {
  return new Date().getTime();
}
