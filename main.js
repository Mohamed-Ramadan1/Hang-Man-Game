let lettersContainer = document.querySelector(".letters"),
    categorySpan = document.querySelector(".category span"),
    letterGuesContainer = document.querySelector(".letters-guess");


    
    const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);

// genrate letters and append it to the page .
lettersArray.forEach((letter )=> {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);

    span.className = "letter-box";

    lettersContainer.appendChild(span);
});

//object contain words and categories.
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

//get all keys in objec.
let allKeys = Object.keys(words);

//get random number on the rangeo f keys length
let randomNumber = Math.floor(Math.random() * allKeys.length);
//category
let randomPropName = allKeys[randomNumber];

//category words
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

//create the final random word.
let randomValueValue = randomPropValue[randomValueNumber];

//set the category value randomly.
categorySpan.innerHTML = randomPropName;


//array from the chosen word.
let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter == " ") {
        emptySpan.className = "with-space";
    }
    
    letterGuesContainer.appendChild(emptySpan);
    
});

//target all spans on giss container
guessSpan = document.querySelectorAll(".letters-guess span"); 

let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");
document.addEventListener("click", (e) => {
    let theStatus = false;

    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        let clickedLetter = e.target.innerHTML.toLowerCase();

        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, wordIndex) => {
            if (clickedLetter == wordLetter) {
                theStatus = true;

                guessSpan.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = clickedLetter;
                    }

                })


            }
        });

        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            if (wrongAttempts === 8) {
                endGame();
                
                lettersContainer.classList.add("finished");
            }
        }

    }
});


function endGame() {

    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(`Game Over, The Word Is "${randomValueValue}"`);

    // Append Text To Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = 'popup';

    // Append To The Body
    document.body.appendChild(div);

}


let resetBtn = document.querySelector(".reset");
resetBtn.onclick = () => {
    window.location.reload();
}