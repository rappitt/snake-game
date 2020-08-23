// Create all needed Variables
const grid = document.querySelector(".grid");
const startBtn = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");
const modal = document.querySelector("#modal");
const gameOver = document.querySelector("#gameOver");
const playerScore = document.querySelector("#playerScore");
const width = 20;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let intervalTime = 800;
let speed = 0.9;
let timerId = 0;
let apple = 0;

//Function to create the game grid

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i = 0; i < width * width; i++) {
        //create element
        const square = document.createElement("div");
        //add styling to the element
        square.classList.add("square");
        //put the element into the grid
        grid.appendChild(square);
        //push it into a new squares array
        squares.push(square);
    }
}
createGrid();

//creating the Snak on the Grid
currentSnake.forEach((index) => squares[index].classList.add("snake"));

//Function to move the Snake over the Grid

function moveSnake() {
    if (
        // Logic to check if the Snake hits the border or itself
        (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains("snake") // if the Snake hits itself
    ) {
        modal.style.display = "block";
        gameOver.style.display = "block";
        gameOver.textContent = "Game Over!!";
        playerScore.textContent = "Your Score is " + score;
        return clearInterval(timerId);
    }

    //remove last element from the currentSnake array
    const snakeTail = currentSnake.pop();
    //remove styling from last element
    squares[snakeTail].classList.remove("snake");
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    //add styling so we can see it
    squares[currentSnake[0]].classList.add("snake");

    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove("apple");
        //grow the snake by adding class of snake to it
        squares[snakeTail].classList.add("snake");
        //grow the snake array
        currentSnake.push(snakeTail);
        //generate new apple
        generateApple();
        //add one to the score
        score++;
        //display the score
        scoreDisplay.textContent = score;
        //speed up the snake
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(moveSnake, intervalTime);
    }
}

//Create the Apple on the Grid
function generateApple() {
    do {
        apple = Math.floor(Math.random() * squares.length);
    } while (squares[apple].classList.contains("snake"));
    squares[apple].classList.add("apple");
}
generateApple();

//Setting up the Controls with the Arrow keys
function control(e) {
    if (e.keyCode === 39) {
        direction = 1;
    } else if (e.keyCode === 38) {
        direction = -width;
    } else if (e.keyCode === 37) {
        direction = -1;
    } else if (e.keyCode === 40) {
        direction = +width;
    }
}
//Function to start the Game
function startGame() {
    //remove the snake
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    //remove the apple
    squares[apple].classList.remove("apple");
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    //re add new score to browser
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApple();
    //readd the class of snake to our new currentSnake
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    timerId = setInterval(moveSnake, intervalTime);
    modal.style.display = "none";
}
document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);