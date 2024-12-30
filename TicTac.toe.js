function makePlayer() {
    const Player1 = { name: prompt("Enter the name of Player 1:"), sign: 'X' };
    const Player2 = { name: prompt("Enter the name of Player 2:"), sign: 'O' };
    return {
        getPlayer1: () => Player1,
        getPlayer2: () => Player2
    };
}
let start = document.querySelector(".begin");
let heading = document.querySelector(".heading");
let players;
let p1_moves = [];
let p2_moves = [];
start.addEventListener('click', assign);
function checkWinner() {
    const winningArrays = [
        [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ];
    for (let combination of winningArrays) {
        if (combination.every(index => p1_moves.includes(index))) {
            alert(`${players.getPlayer1().name} wins!`);
            disableAllButtons();
            return true;
        }
        if (combination.every(index => p2_moves.includes(index))) {
            alert(`${players.getPlayer2().name} wins!`);
            disableAllButtons(); 
            return true;
        }
    }
    return false;
}

function disableAllButtons() {
    const buttons = document.querySelectorAll('.Arena');
    buttons.forEach(button => button.disabled = true);
}

function assign() {
    players = makePlayer();
    heading.style.display = "none";
    start.style.display = "none";
    const gameControls = appendButtons();
    gameControls.play();
}

function appendButtons() {
    const game = document.querySelector(".game");
    let index = 0;
    let p1_turn = true;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let box = document.createElement("button");
            game.appendChild(box);
            box.classList.add("Arena");
            box.setAttribute("data-index", index);
            index++;
        }
        let lineBreak = document.createElement("br");
        game.appendChild(lineBreak);
    }

    const Player1 = players.getPlayer1();
    setTimeout(() => {
        alert(`${Player1.name} starts!`);
    }, 1000);

    return {
        play: function () {
            game.addEventListener('click', function (event) {
                if (event.target && event.target.classList.contains('Arena')) {
                    const index = parseInt(event.target.getAttribute('data-index'));

                    if (p1_turn) {
                        event.target.textContent = 'X';
                        event.target.disabled = true;
                        p1_moves.push(index);
                    } else {
                        event.target.textContent = 'O';
                        event.target.disabled = true;
                        p2_moves.push(index);
                    }

                    p1_turn = !p1_turn;

                    if (checkWinner()) {
                        return;
                    }
                }
            });
        }
    };
}
