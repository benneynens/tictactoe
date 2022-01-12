const Player = function() {
    const name = name;
    const icon = icon;

    return {name, icon}
}

const tictactoe = (function() {
    
    //create players
    const players = {
        '0' : Player('0','0'),
        'X' : Player('X', 'X'),
    }

    //cache DOM
    const board = document.getElementById('board');
    const boardTileTemplate = document.getElementById('boardTileTemplate').innerHTML;

    //board values
    let boardValues;

    let nextMove = 

    _renderBoard ();

    function _renderBoard () {
        board.innerHTML = boardTileTemplate.repeat(9);
    }

    //public function start new game
        //Array(9).fill(null);
        //display

    //apply boardValues to boardHTML

    //update board values
        //get tile #
        //update boardValues

    //new move
        function _newMove (player) {

        }
        //update latest move variable
        //update boardValues array
        //update board on page

    //display board on page
    function _displayBoard () {

    }

    //varible: latest move (naught or cross)

    //select a tile (public)

    //check for a winner

})();