$(document).ready(function(){

// const playerOne = prompt("Player 1 enter your name:");
// const playerTwo = prompt("Player 2 enter your name:");

//sounds defined. 
const selectSound = new Audio('sounds/select-sound.wav');
const endGameSound = new Audio('sounds/end-game.wav');
const tieSound = new Audio('sounds/tie-game.wav');
const resetSound = new Audio('sounds/reset-sound.wav');

//getting html elements using jquery.
const h1 = $("h1");
let player = 1; //either player 1 or 0.
const gameContainer = $('table'); //area including all the cells.
let message = $('#message'); //message variable.
const turnMessage = $('#turnMessage'); //turn message.
let td = $("td");

//function to make title appear upon loading.
const gameAppear = function (){
  h1.css("color","black").css("transition-duration","2.5s");
  turnMessage.css("color","black").css("transition-duration","2.5s");
};
setTimeout(function(){gameAppear()},600); //makes title and turn message appear after 600ms.





//Main function. EventListener clicking on the cells.
$(td).on('click', function() { //td refers to the individual tile. If it is clicked:
  selectSound.play();
  let cell = $(this);
  const state = checked(cell); //ensuring there is nothing in the cell. Defined on line 86.

  if (!state) { //if nothing is in the cell (0) which is false.
  let pattern = definePattern(player); //defined on line 95, p1 is 'cross', p2 is 'circle'.

      if (pattern === 'cross'){
        pattern = 'X';
      }
      else {
        pattern = 'O';
      }

    cell.html(`${ pattern }`); //add the X or O to the html of the selected tile.
    if (!winningCheck(gameContainer, pattern)){ //checks if you haven't won. Defined on line 133.
      appear(cell)};
    addToClass(cell, pattern); //adding the X or O to the class of the selected tile.

    if (winningCheck(gameContainer, pattern)){ //check to see if someone has won.
      // if (player === 1){
      //   name = playerOne;
      // } else {
      //   name = playerTwo;
      // }
      // message.html(`Player ` + name + ` has won!` );
      message.html(`Player ` + player + ` has won!` );
      turnMessage.html("")
      setTimeout(function(){noPlay()}, 900); //defined on 186, fades the gameboard out.
      endGameSound.play();
    } else { //if no one has won.
      player = swapPlayer(player); //defined on line 112. Alternates between player 1 and 2.
      displayPlayerTurn(turnMessage, player);}

      if ($('#0').html() !== "" && //checks if its a tie, if all cells contain something in html and haven't won.
          $('#1').html() !== "" &&
          $('#2').html() !== "" &&
          $('#3').html() !== "" &&
          $('#4').html() !== "" &&
          $('#5').html() !== "" &&
          $('#6').html() !== "" &&
          $('#7').html() !== "" &&
          $('#8').html() !== "" &&
          !winningCheck(gameContainer, pattern)
        ) {
        turnMessage.html("");
        $('#tie-message').html(`It's a tie!`);
        setTimeout(function(){noPlay()}, 900);
        tieSound.play();
      }
    } //ending for if statement on line 33.

  else { //runs if clicked cell already has something in it.
    message.html(`The box has already been ticked! Try Again.`);
  }
});





//function to check if box is ticked or unticked.
const checked = function (cell) {
  if (cell.hasClass('X') || cell.hasClass('O')){
    return 1; //provides true.
  } else {
    return 0; //provides false.
  }
};

//pattern: argument = player/
const definePattern = function (player) {
  if (player === 1){
    return 'cross';
  } else {
    return 'circle';
  }
};

//result of definePattern into a variable./
const pattern = definePattern();

//need a function to addClass or circle or cross to the class./
const addToClass = function (cell, pattern) {
  return cell.addClass(pattern);
};

//This function swaps the player./
const swapPlayer = function (player) {
  if (player === 1){
      return player = 2;
  } else {
      return player = 1;
  }
};

//need a function to display next player./
const displayPlayerTurn = function (turnMessage ,player) {
  // if (player === 1){
  //   name = playerOne;
  // } else {
  //   name = playerTwo;
  // }
  // turnMessage.html(`Your turn: ${ name }.`);
  turnMessage.html(`Your turn: player ${ player }.`);
};
displayPlayerTurn(turnMessage, player); //say which player before click event.


//function to check if a player has won.
const winningCheck = function (gameContainer ,pattern) {
  let won = 0;
  if (gameContainer.find('#0').hasClass(pattern) &&
      gameContainer.find('#1').hasClass(pattern) &&
      gameContainer.find('#2').hasClass(pattern)){
        won = 1;
      }
  else if (gameContainer.find('#3').hasClass(pattern) &&
            gameContainer.find('#4').hasClass(pattern) &&
            gameContainer.find('#5').hasClass(pattern)){
              won = 1;
      }
  else if (gameContainer.find('#6').hasClass(pattern) &&
            gameContainer.find('#7').hasClass(pattern) &&
            gameContainer.find('#8').hasClass(pattern)){
              won = 1;
      }
  else if (gameContainer.find('#0').hasClass(pattern) &&
            gameContainer.find('#3').hasClass(pattern) &&
            gameContainer.find('#6').hasClass(pattern)){
              won = 1;
      }
  else if (gameContainer.find('#1').hasClass(pattern) &&
            gameContainer.find('#4').hasClass(pattern) &&
            gameContainer.find('#7').hasClass(pattern)){
              won = 1;
      }
  else if (gameContainer.find('#2').hasClass(pattern) &&
            gameContainer.find('#5').hasClass(pattern) &&
            gameContainer.find('#8').hasClass(pattern)){
              won = 1;
      }
  else if (gameContainer.find('#0').hasClass(pattern) &&
            gameContainer.find('#4').hasClass(pattern) &&
            gameContainer.find('#8').hasClass(pattern)){
              won = 1;
      }
  else if (gameContainer.find('#6').hasClass(pattern) &&
            gameContainer.find('#4').hasClass(pattern) &&
            gameContainer.find('#2').hasClass(pattern)){
              won = 1;
      }
  return won;
};



//function to reset the game.
$('#restart').on('click', function (){
  resetSound.play();
  setTimeout(function(){window.location.reload()},500);
});

//function to end game once a tie or player has won.
const noPlay = function (){
  td.css("color","aliceblue").css("transition-duration","2s");
  message.css('color','#ddd').css("transition-duration","2s");
  turnMessage.html("Please restart to play again!");
}

//function to display X and O slowly in the cell.
const appear = function (cell) {
  cell.css('color','darkblue').css("transition-duration","1s");
};


}); //end of document ready function at top.








// anchor comment.
