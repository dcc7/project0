$(document).ready(function(){}); //end of ready function at top.


// const playerOne = prompt("Player 1 enter your name:");
// const playerTwo = prompt("Player 2 enter your name:");

//sounds.
const selectSound = new Audio('sounds/select-sound.wav');
const endGameSound = new Audio('sounds/end-game.wav');
const tieSound = new Audio('sounds/tie-game.wav');
const resetSound = new Audio('sounds/reset-sound.wav');

const h1 = $("h1");
let player = 1; //either player 1 or 0.
const gameContainer = $('table'); //area including all the cells.
let message = $('#message'); //message variable.
const turnMessage = $('#turnMessage'); //turn message.
let td = $("td");
let tieMessage = $("#tie-message");

//function to make title appear.
const gameAppear = function (){
  h1.css("color","black").css("transition-duration","2.5s");
  turnMessage.css("color","black").css("transition-duration","2.5s");
};
setTimeout(function(){gameAppear()},600);

//eventListener clicking on the cells.
$(td).on('click', function() {
  selectSound.play();
  let cell = $(this);
  const state = checked(cell); //ensuring there is nothing in the cell.

  if (!state) { //if nothing is in the cell already then.
  let pattern = definePattern(player);

      if (pattern === 'cross'){
        pattern = 'X';
      }
      else {
        pattern = 'O';
      }

    cell.html(`${ pattern }`);
    if (!winningCheck(gameContainer, pattern)){
      appear(cell)};
    addToClass(cell, pattern);
    if (winningCheck(gameContainer, pattern)){ //check to see if someone has won.
      // if (player === 1){
      //   name = playerOne;
      // } else {
      //   name = playerTwo;
      // }
      // message.html(`Player ` + name + ` has won!` );
      message.html(`Player ` + player + ` has won!` );
      turnMessage.html("")
      setTimeout(function(){noPlay()}, 900);
      endGameSound.play();
    } else { //if no one has won, it is the computers turn.
      player = swapPlayer(player); //no need to swap player anymore, as compMove swaps to two.
      console.log(player);
      displayPlayerTurn(turnMessage, player);
      compMove(); //computer performs its move.
      player = swapPlayer(player);
      setTimeout(function(){displayPlayerTurn(turnMessage, player)},900); //swap back to player one.

      pattern = "O"; //since computer will always be O.

      if (winningCheck(gameContainer, pattern)){ //winning check for the computer
        // if (player === 1){
        //   name = playerOne;
        // } else {
        //   name = playerTwo;
        // }
        // message.html(`Player ` + name + ` has won!` );
        message.html(`Player 2 has won!`);
        turnMessage.html("")
        setTimeout(function(){noPlay()}, 2000);
        setTimeout(function(){endGameSound.play()},350);}

      else if ($('#0').html() !== "" && //checks if its a tie.
              $('#1').html() !== "" &&
              $('#2').html() !== "" &&
              $('#3').html() !== "" &&
              $('#4').html() !== "" &&
              $('#5').html() !== "" &&
              $('#6').html() !== "" &&
              $('#7').html() !== "" &&
              $('#8').html() !== "" //&&
              //!winningCheck(gameContainer, pattern)
        ) {
        turnMessage.html("");
        $(tieMessage).html(`It's a tie!`);
        setTimeout(function(){noPlay()}, 900);
        tieSound.play();
      }
    }
  }
  else { //runs if clicked cell already has something in it.
    message.html(`The box has already been ticked! Try Again.`);
    setTimeout(function(){message.html("")}, 2000);
  }
});



//function to check if box is ticked or unticked.
const checked = function (cell) {
  if (cell.hasClass('X') || cell.hasClass('O')){
    return 1;
  } else {
    return 0;
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

//need a function to see if the player has won.
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
  $(tieMessage).css('color','#ddd');
}

//function to display X and O slowly in the cell.
const appear = function (cell) {
  cell.css('color','darkblue').css("transition-duration","1s");
};


//Computer algorithm.
//Function to choose random tile. Computer makes a move by inserting a X or O.
const compMove = function (){

  const randNum = Math.floor(Math.random() * 10) //generate a random number between 0 and 9.
  const randNumString = randNum;
  let tileChoice = `#${randNumString}`;

  if ($(tileChoice).html() === ""){ //if nothing is in the randomly chosen tile, return it or run the function again and choose another tile.
    let pattern = definePattern(player);// returns cross or circle.

    if (pattern === 'cross'){
      pattern = 'X';
    }
    else {
      pattern = 'O';
    }

    $(tileChoice).html(`${ pattern }`); //add to X or O to html of randomly chosen tile.

    if (!winningCheck(gameContainer, pattern) || //if comp hasn't won or
        $('#0').html() !== "" && //if all the cells are full.
        $('#1').html() !== "" &&
        $('#2').html() !== "" &&
        $('#3').html() !== "" &&
        $('#4').html() !== "" &&
        $('#5').html() !== "" &&
        $('#6').html() !== "" &&
        $('#7').html() !== "" &&
        $('#8').html() !== "" &&
        !winningCheck(gameContainer, pattern)
  ){
      let cell = $(tileChoice);
      setTimeout(function(){appear(cell)},300);
      addToClass(cell, pattern);};
  } else if (
    $('#0').html() === "" || //if any of the cells are empty then run the function again. If all cells contain a move then move on.
    $('#1').html() === "" ||
    $('#2').html() === "" ||
    $('#3').html() === "" ||
    $('#4').html() === "" ||
    $('#5').html() === "" ||
    $('#6').html() === "" ||
    $('#7').html() === "" ||
    $('#8').html() === ""
  ){
    compMove();
  } else {
    console.log('not a resursion error!');
  }
};


//Problems or Todo List:












// anchor comment.
