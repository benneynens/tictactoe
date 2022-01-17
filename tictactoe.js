const Player = function(icon) {
    const iconHtml = () => `<div class="icon">${icon}</div>`;

    let playerName = 'Unnamed';

    const setPlayerName = (name) => playerName = name;

    const getPlayerName = () => playerName;

    //TODO: ... ability to add player name

    return {icon, iconHtml, setPlayerName, getPlayerName}
}

const tictactoe = (function() { 
    
    //create players
    const players = {
        'O' : Player('O'),
        'X' : Player('X'),
    }

    //cache DOM
    const board = document.getElementById('board');
    const newGameButton = document.getElementById('newgame');
    const playerNameElements = {
        'p1': {
            input: document.getElementById('submit_p1_input'),
            button: document.getElementById('submit_p1_button')
        },
        'p2': {
            input: document.getElementById('submit_p2_input'),
            button: document.getElementById('submit_p2_button')
        },
    }

    testVar = players;

    //DOM actions
    newGameButton.addEventListener('click', confirmNewGame );

    for (player in playerNameElements) {
        playerNameElements[player].button.addEventListener('click', _updatePlayerName);

    }

    function confirmNewGame () {
        if (confirm("Start New Game?")) newGame();
    }

    //game status
    let nextMove;
    let boardCells; //FIXME:

    clearBoardCellsArray = () => boardCells = [];

    function _updatePlayerName(evt) {
        let selectedPlayer = evt.currentTarget.id.slice(7,9);

        console.log(playerNameElements[selectedPlayer]);

        let targetInputVal = playerNameElements[selectedPlayer].input.value;
        
        if (targetInputVal != '') {
            player = (selectedPlayer == 'p1') ? 'X' : 'O';
            players[player].setPlayerName(targetInputVal);
        } else {
            alert ('Please add a player name before clicking the button.')
        }
        
    }

    function _setNextPlayer(previous) {
        nextMove = (previous == null || previous == 'O') ? 'X' : 'O';
    }

    newGame ();

    function _createBoardCellElement (cellIndex) {
        let cellElement = document.createElement('div');
        cellElement.className = 'board-tile';
        cellElement.cellIndex = cellIndex;
        cellElement.addEventListener('click', _tileSelected );
        cellElement.cellOccupant = null;
        cellElement.innerHTML = null;

        return cellElement;
    }

    function _tileSelected (evt) {
        //check if empty or not
        if (evt.currentTarget.cellOccupant !== null) {
            alert ('This cell is occupied.');
            return;
        }

        //update HTML
        evt.currentTarget.innerHTML = players[nextMove].iconHtml();
        evt.currentTarget.classList.add('selected');
        //update JS element properties
        evt.currentTarget.cellOccupant = nextMove;

        //TODO: check stalemate

        //check winner
        if (! _checkWinner() ) _setNextPlayer(nextMove);

    }



    function _renderBoard (boardValues) {   
        board.innerHTML = '';

        boardValues.forEach(element => {
            board.appendChild(element);
        });
    }

    //public function start new game
    function newGame() {
        clearBoardCellsArray();
        for (let i = 0; i < 9; i++) {
            boardCells.push( _createBoardCellElement (i) )
        };
        
        _renderBoard(boardCells);
        _setNextPlayer();
    }

    //check for a winner
    function _checkWinner () {
        let winningCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        for (let o = 0; o < winningCombos.length; o++) {
            //TODO: need to check for stalemate (is this only at the end of the game?)
            let cellValues = [];
            for (let j = 0; j < winningCombos[o].length; j++) {
                let singleCellVal = boardCells[winningCombos[o][j]].cellOccupant;
                if (singleCellVal == null) break;
                if (j > 0 && singleCellVal !== cellValues[0]) break;
                cellValues.push ( singleCellVal );
            }

            if (cellValues.length === 3) {
                _announceWinner ( cellValues[0] );

                _highlightWinner( winningCombos[o] );
                return true;
            }
        }
        return false; //no winning combos found            
    }

    function _announceWinner (winner) {
        alert( `Winner is ${winner}` );
    }

    function _highlightWinner (winningCombo) {
        for (cellIndex in winningCombo) {
            boardCells[ winningCombo[cellIndex] ].classList.add('winningCell');
        }
    }

    return {newGame}

})();

