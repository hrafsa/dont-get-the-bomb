let bombPosition;
let gameOver = false;

// Function to generate random bomb position
function generateBombPosition() {
    bombPosition = Math.floor(Math.random() * 100) + 1;
}

// Function to initialize the game
function initializeGame() {
    let boxesDiv = document.getElementById('boxes');
    for (let i = 1; i <= 100; i++) {
        let box = document.createElement('div');
        box.className = 'box';
        box.textContent = i;
        box.addEventListener('click', function() {
            openBox(i);
        });
        boxesDiv.appendChild(box);
    }
    generateBombPosition();
}

// Function to handle box click event
function openBox(number) {
    if (!gameOver) {
        let resultDiv = document.getElementById('result');
        let boxes = document.getElementsByClassName('box');
        if (number === bombPosition) {
            resultDiv.textContent = "Ooops! You got the bomb. You lose!";
            gameOver = true;
        } else {
            if (number < bombPosition) {
                for (let i = 1; i <= number; i++) {
                    boxes[i - 1].classList.add('disabled');
                    boxes[i - 1].removeEventListener('click', openBox);
                }
            } else {
                for (let i = number; i <= 100; i++) {
                    boxes[i-1].classList.add('disabled');
                    boxes[i-1].removeEventListener('click', openBox);
                }
            }
            resultDiv.textContent = "You're still safe.";
        }
    }
}

// Function to reset the game
function resetGame() {
    let resultDiv = document.getElementById('result');
    let boxes = document.getElementsByClassName('box');
    resultDiv.textContent = "";
    gameOver = false;
    generateBombPosition();
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove('disabled');
        boxes[i].addEventListener('click', function() {
            openBox(i + 1);
        });
    }
}

// Initialize the game when the page loads
window.onload = function() {
    initializeGame();
};

