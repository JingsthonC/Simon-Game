// declaration of variables

var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

//starting the game via first keydown

$(document).on("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//game start

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

//function for button clicking
$(".btn").on("click", function () {
  if (started) {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // Use class removal for animation
    setTimeout(() => {
      $(this).removeClass("pressed");
    }, 100);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

// animation for pressing button
function animatePress(color) {
  $("#" + color).addClass("pressed");
}

//checking the answer given

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 800);
    }
  } else {
    $("h1").text("Game Over!");
    playSound("wrong");
    level = 0;
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
      $("h1").text("Press Any Key to Start");
      userClickedPattern = [];
    }, 500);
    restartGame();
  }
}

//function to playSound base on the selected button color

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function to restart the game

function restartGame() {
  level = 0;
  gamePattern = [];
  started = false;
}
