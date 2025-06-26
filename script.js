const display = document.getElementById("display");

let audioContext;
let buffer;

// Load sound once on page load
fetch("click.mp3")
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    return audioContext.decodeAudioData(arrayBuffer);
  })
  .then(decodedBuffer => {
    buffer = decodedBuffer;
  });

// Play sound instantly
function playClickSound() {
  if (!buffer) return;
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
}

function handleClick(callback) {
  playClickSound();
  callback();
}

function appendValue(val) {
  if (display.innerText === "0" && val !== ".") {
    display.innerText = val;
  } else {
    display.innerText += val;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  if (display.innerText.length === 1) {
    display.innerText = "0";
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function calculateResult() {
  try {
    const result = eval(display.innerText.replace('×', '*').replace('÷', '/'));
    display.innerText = result;
  } catch {
    display.innerText = "Error";
  }
}
