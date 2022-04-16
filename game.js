var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStart = false;

var level = 0;

//user presses a button

$(document).keydown(function() {
    if (gameStart === false) {

      $("#level-title").text("Level " + level);
      nextSequence();

      gameStart = true
    }
});

//user clicks a button and makes sound and animate
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//checkAnswer between gamePattern and userClickedPattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]
    && gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1]) {
    console.log("success");

  if (userClickedPattern.length === gamePattern.length){

    setTimeout(function() {
      nextSequence();
    }, 1000);

  }
} else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}

//next random button with sound

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
}
//playsound function
function playSound(name) {
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}
//animate effect
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout (function(){
    $("#" + currentColour).removeClass("pressed")}
    ,100);
  }

//restart Game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;

}
