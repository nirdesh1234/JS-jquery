  var userClickedPattern=[];

  var buttonColours = ["red", "blue", "green", "yellow"];

  var gamePattern = [];

  var level=0;

  var started= false;


    $(document).keydown(function(){
      
      $("#level-title").text("level"+level);
      if(!started){ 
      nextSequence();
      started=true;
    }
    });

    $(".btn").click(function()
  {
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

    
  function checkAnswer(currentLevel) {
      
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      
      if (userClickedPattern.length === gamePattern.length){

      
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

    }

  


  function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 

      $("#" + randomChosenColour).fadeIn(400).fadeOut(400).fadeIn(400);

      var audio = new Audio("sounds/" +randomChosenColour +".mp3");
    audio.play();
    
        }
  

    function playSound(name){
        var audio = new Audio("sounds/" + name +".mp3");
        audio.play();
      }



      function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
          $("#" + currentColor).removeClass("pressed");
        }, 100);
      }


      function startOver() {
        level=0;
        gamePattern=[];
        started=false;
      }