var gamePattern = [];

var buttonColors = ["red" , "blue" , "green" , "yellow"];

var userClickedPattern = [];

var level = 0 ;

var check = 0;

$(document).on("keydown", function () {
    if(check == 0){
        game();
        check=1;
    }
});


$("div[type='button']").click(function (){
    var picked = $(this).attr("id");
    console.log(picked);
    playSound(picked);
    animatePress(picked);
    userClickedPattern.push(picked);
    checkAnswer(userClickedPattern.length - 1);
        
});
function game(){

 
    $("h1").text("Level " + level);

    level++;

    userClickedPattern = [];

    var randomChosenColor = buttonColors[nextSequence()];

    gamePattern.push(randomChosenColor);


    $("#" + randomChosenColor).fadeIn(100,function(){
        playSound(randomChosenColor);
        }).fadeOut(100).fadeIn();

   
    

}

function animatePress(color){

    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    },100);


}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] != userClickedPattern[currentLevel]){

        endGame();

    }
    else{

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                game();
            },1000);
        }
    }

}

function endGame(){
    $("body").css("background-color" , "red");
    setTimeout(function () {
        $("body").css("background-color" , "#011F3F");
    },100);
    playSound('wrong');
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}


function playSound(sound){
    var audio = new Audio("sounds/" + sound + ".mp3");
    console.log("Playing sound: " + sound);
    audio.play();
}

function nextSequence(){
    random_number = Math.floor(Math.random() * 4);
    
    return random_number;
}

function startOver(){

    level = 0;
    check = 0;
    gamePattern = [];
    userClickedPattern = [];
}
