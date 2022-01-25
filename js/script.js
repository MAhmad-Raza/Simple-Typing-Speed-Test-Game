const typingTest = document.querySelector(".typingTest p"),
  inputField = document.querySelector(".wrapper .inputField"),
  mistakeTag = document.querySelector(".mistake span"),
  timeTag = document.querySelector(".time span b"),
  wpmTag = document.querySelector(".wpm span b"),
  cpmTag = document.querySelector(".cpm span b"),
  tryAgain = document.querySelector("button");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTiming = 0);

// Function To Get Random Paragraph From Array

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingTest.innerHTML = "";

  // Adding Each Character inside span & Adding This Span inside p Tag

  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingTest.innerHTML += spanTag;
  });
  typingTest.querySelectorAll("span")[0].classList.add("active");
  // Focusing input Field on KeyDown or Click Event

  document.addEventListener("keydown", () => inputField.focus());
  typingTest.addEventListener("click", () => inputField.focus());
}

function initTyping() {
  let characters = typingTest.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTiming) {
      // is Timer is Start it Won't Restart Again on Every Click
      timer = setInterval(initTimer, 1000);
      isTiming = true;
    }

    // if User Hasn't Entered Any Character or Pressed Backspace & Wordking on Mistakes

    if (typedChar == null) {
      charIndex--; // Decrement charIndex

      // Decrement Mistakes Only if The charIndex span Contains .InCorrect

      if (characters[charIndex].classList.contains("InCorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("Correct", "InCorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        // if User Typed Character & Shown Character Matched Then Add .Correct
        // else increment The Mistake & Add .InCorrect

        characters[charIndex].classList.add("Correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("InCorrect");
      }
      charIndex++; // Increment charIndex Either Used Typed Correct or InCorrect Character
    }

    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );

    // if WPM Value is 0 or Infinite or empty Then Set it To 0

    wpm = wpm < 0 || !wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes; //CPM Will Not Count Mistakes
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}
// Function For Timer

function initTimer() {
  // if Timer is Greater Than 0 Then Decrement The timeLeft else Clear The Timer

  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

// Function For Try Again Button

function resetGame() {
  // Calling randomParagrapgh Function & Resetting Each Variables And Elements To Default
  randomParagraph();
  inputField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTiming = 0;
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgain.addEventListener("click", resetGame);
