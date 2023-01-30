let player1 = "PLAYER 1"
let player2 = "PLAYER 2"

let currentPlayer

let gameOver = false
let board
let currentColumns
let rows = 6
let columns = 7

let interval = ""

const menuWindow = document.getElementById("menu-cont")
const rulesWindow = document.getElementById("gamerules-cont")
const gameCpuWindow = document.getElementById("gameplay-cpu-cont")
const namesWindow = document.getElementById("names-cont")
const gameWindow = document.getElementById("gameplay-cont")

const boardHTML = document.getElementById("board")

const timeStatus = document.getElementById("time-status")
const timeStatusPlayer = document.getElementById("time-status-player")
const winStatus = document.getElementById("win-status")
const winStatusPlayer = document.getElementById("win-status-player")
const winText = document.getElementById("win-text")

const player1Points = document.getElementById("red-points")
const player2Points = document.getElementById("yellow-points")
const time = document.getElementById("time")
const maxTime = "10s"

const redPlayerName = document.getElementById("red-player-name")
const yellowPlayerName = document.getElementById("yellow-player-name")
const redPlayer = document.getElementById("red-player")
const yellowPlayer = document.getElementById("yellow-player")


// PLAY VS PLAYER BUTTON
document.getElementById("vs-player-btn").addEventListener("click", function(){
    menuWindow.style.display = "none"
    namesWindow.style.display = "flex"
})

// PLAY VS COMP BUTTON
document.getElementById("vs-cpu-btn").addEventListener("click", function(){
    menuWindow.style.display = "none"
    gameCpuWindow.style.display = "block"
})

// VS COMP RESET BUTTON
document.getElementById("restart-btn-vs-cpu").addEventListener("click", function(){
    document.querySelector("iframe").src = "https://giphy.com/embed/ylyUQncTbxyZcDeLao";
})

// GAME RULES BUTTON
document.getElementById("rules-btn").addEventListener("click", function(){
    menuWindow.style.display = "none"
    rulesWindow.style.display = "block"
})

// BACK TO MENU FROM RULES BUTTON
document.getElementById("back-from-rules").addEventListener("click", function(){
    menuWindow.style.display = "block"
    rulesWindow.style.display = "none"
})

// ENTER NAMES TO PLAY GAMEPLAY VS PLAYER BUTTON
document.getElementById("confirm-names-btn").addEventListener("click", function(){ 

    player1 = redPlayerName.value.toUpperCase()
    player2 = yellowPlayerName.value.toUpperCase()
    redPlayer.textContent = player1
    yellowPlayer.textContent = player2
    timeStatusPlayer.textContent = player1

    redPlayerName.value = ""
    yellowPlayerName.value = ""
    namesWindow.style.display = "none"
    gameWindow.style.display = "block"
    currentPlayer = player1
})


window.onload = function(){
    setGame()
}


function setGame(){
    board = []
    currentColumns = [5, 5, 5, 5, 5, 5, 5]
    for (let r = 0; r < rows; r++){
        let row = []
        for (let c = 0; c < columns; c++){
            // JS
            row.push(" ")

            // HTML
            // <div class="tile" id="0-0"></div>
            let tile = document.createElement("div")
            tile.classList.add("tile")
            tile.id = r.toString() + "-" + c.toString()
            tile.addEventListener("click", setPiece)
            boardHTML.append(tile)
        }
        board.push(row)
    }
}


function setPiece(e) {
    
    if (gameOver){
        return
    }
    let tile = e.target
    let coordinates = tile.id.split("-")  // "0-0" => ["0", "0"]
    let r = parseInt(coordinates[0])
    let c = parseInt(coordinates[1])
    
    r = currentColumns[c]
    if (r < 0){
        return
    }
    
    board[r][c] = currentPlayer
    tile = document.getElementById(r.toString() + "-" + c.toString())
    
    if(currentPlayer===player1){
        tile.classList.add("red-piece")
        timeStatus.style.backgroundColor = "#ffce67"
        timeStatus.style.setProperty("--color-primary-gradient",
        `linear-gradient(-162deg, transparent 35px, #ffce67 0) right,
        linear-gradient(162deg, transparent 35px, #ffce67 0)left`)
        currentPlayer=player2
    } else {
        tile.classList.add("yellow-piece")
        timeStatus.style.backgroundColor = "#fc6787"
        timeStatus.style.setProperty("--color-primary-gradient",
        `linear-gradient(-162deg, transparent 35px, #fc6787 0) right,
        linear-gradient(162deg, transparent 35px, #fc6787 0)left`)
        currentPlayer=player1
    }
    r -= 1  // updating r
    currentColumns[c] = r  // updating currentColumns
    
    timeStatusPlayer.textContent = currentPlayer
    
    if(currentColumns[0] === -1 && currentColumns[1] === -1 &&
    currentColumns[2] === -1 && currentColumns[3] === -1 &&
    currentColumns[4] === -1 && currentColumns[5] === -1 &&
    currentColumns[6] === -1){
        timeStatus.style.display = "none"
        winStatus.style.display = "block"
        winText.textContent = "DRAW"
        winStatusPlayer.innerHTML = "&nbsp;"
    }

    countdown(tile, r, currentColumns)
    checkWinner()
}


function countdown(tile, r, currentColumns){
    time.innerHTML = maxTime
    clearInterval(interval)

    interval = setInterval(function(){
        if (parseInt(time.innerHTML) > 0) {
            time.innerHTML = `${parseInt(time.innerHTML) - 1}s`
        } 
        else if (parseInt(time.innerHTML) === 0) {
            if (gameOver){
                return
            }
            const randomIndex = Math.floor(Math.random()*columns)
            r = currentColumns[randomIndex]
            if (r < 0){
                return
            }
            
        //  automatic play
            board[r][randomIndex] = currentPlayer
            tile = document.getElementById(r.toString() + "-" + randomIndex.toString())

            if(currentPlayer===player1){
                tile.classList.add("red-piece")
                timeStatus.style.backgroundColor = "#ffce67"
                timeStatus.style.setProperty("--color-primary-gradient",
                `linear-gradient(-162deg, transparent 35px, #ffce67 0) right,
                linear-gradient(162deg, transparent 35px, #ffce67 0)left`)
                currentPlayer=player2
            } else {
                tile.classList.add("yellow-piece")
                timeStatus.style.backgroundColor = "#fc6787"
                timeStatus.style.setProperty("--color-primary-gradient",
                `linear-gradient(-162deg, transparent 35px, #fc6787 0) right,
                linear-gradient(162deg, transparent 35px, #fc6787 0)left`)
                currentPlayer=player1
            }
            r -= 1  // updating r
            currentColumns[randomIndex] = r  // updating currentColumns

            timeStatusPlayer.textContent = currentPlayer

            if(currentColumns[0] === -1 && currentColumns[1] === -1 &&
            currentColumns[2] === -1 && currentColumns[3] === -1 &&
            currentColumns[4] === -1 && currentColumns[5] === -1 &&
            currentColumns[6] === -1){
                timeStatus.style.display = "none"
                winStatus.style.display = "block"
                winText.textContent = "DRAW"
                winStatusPlayer.textContent = ""
            }

            checkWinner()
            time.innerHTML = maxTime
            countdown(tile, r, currentColumns)
        }
    }, 1000)
}


function checkWinner(){
    // horizontally
    for (let r=0; r<rows; r++){
        for (let c=0; c<columns-3; c++){
            if (board[r][c] !== " "){
                if (board[r][c] === board[r][c+1] &&
                    board[r][c+1] === board[r][c+2] &&
                    board[r][c+2] === board[r][c+3]){
                        setWinner(r, c)
                        return
                }
            }
        }
    }

    // vertically
    for (let c=0; c<columns; c++){
        for (let r=0; r<rows-3; r++){
            if (board[r][c] !== " "){
                if (board[r][c] === board[r+1][c] &&
                    board[r+1][c] === board[r+2][c] &&
                    board[r+2][c] === board[r+3][c]){
                        setWinner(r, c)
                        return
                }
            }
        }
    }

    // diagonally "/"
    for (let r=3; r<rows; r++){
        for (let c=0; c<columns-3; c++){
            if(board[r][c] !== " "){
                if(board[r][c] === board[r-1][c+1] &&
                   board[r-1][c+1] === board[r-2][c+2] &&
                   board[r-2][c+2] === board[r-3][c+3]){
                        setWinner(r, c)
                        return
                }
            }
        }
    }

    // diagonally "\"
    for (let r=0; r<rows-3; r++){
        for (let c=0; c<columns-3; c++){
            if (board[r][c] !== " "){
                if (board[r][c] === board[r+1][c+1] &&
                    board[r+1][c+1] === board[r+2][c+2] &&
                    board[r+2][c+2] === board[r+3][c+3]){
                        setWinner(r, c)
                        return
                }
            }
        }
    }
}

function setWinner(r, c){
    currentPlayer = board[r][c]
    timeStatus.style.display = "none"
    winStatus.style.display = "block"
    winStatusPlayer.textContent = currentPlayer
    gameOver = true
    if(currentPlayer === player1){
        player1Points.innerHTML = parseInt(player1Points.innerText) + 1
        document.getElementById("footer-background").style.backgroundColor = "#fc6787"
    }  else if(currentPlayer === player2){
        player2Points.innerHTML = parseInt(player2Points.innerText) + 1
        document.getElementById("footer-background").style.backgroundColor = "#ffce67"
    }
}


// PLAY AGAIN BUTTON
document.getElementById("play-again-btn").addEventListener("click", newGame)

function newGame(){
    document.getElementById("footer-background").style.backgroundColor = "#5c2dd5"
    while (boardHTML.hasChildNodes()) {
        boardHTML.removeChild(boardHTML.firstChild);
        }
    setGame()
    gameOver = false
    timeStatus.style.display = "block"
    winStatus.style.display = "none"
    time.innerHTML = "&nbsp;"
    console.log(currentPlayer)
    if (currentPlayer === player1){
        currentPlayer = player2
    } else { currentPlayer = player1 }
    console.log(currentPlayer)
}

// RESTART BUTTON
document.getElementById("restart-btn").addEventListener("click", restartGame)

function restartGame(){

    timeStatus.style.backgroundColor = "#fc6787"
    timeStatus.style.setProperty("--color-primary-gradient",
    `linear-gradient(-162deg, transparent 35px, #fc6787 0) right,
    linear-gradient(162deg, transparent 35px, #fc6787 0)left`)
    timeStatusPlayer.textContent = currentPlayer
    document.getElementById("footer-background").style.backgroundColor = "#5c2dd5"
    currentPlayer=player1
    player1Points.innerHTML = 0
    player2Points.innerHTML = 0
    newGame()
    currentPlayer = player1
}

// MENU BUTTON -> from gameplay to main menu
document.getElementById("menu-btn").addEventListener("click", function(){
    restartGame()
    menuWindow.style.display = "block"
    gameWindow.style.display = "none"
})

// MENU BUTTON -> from cpu gameplay to main menu
document.getElementById("menu-cpu-btn").addEventListener("click", function(){
    restartGame()
    menuWindow.style.display = "block"
    gameCpuWindow.style.display = "none"
})

