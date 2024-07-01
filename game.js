var buttonColours=[ "green","red", "yellow", "blue"];
var gamePattern=[];
var userPattern=[];
var level=0;
var start=false;


$(document).on('keypress',function(){
    if(!start){
        $('h1').text('Level '+level);
        nextSequence();
        start=true;
    }
})

function nextSequence(){
    userPattern=[];
    $('h1').text('Level '+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    sound(randomChosenColour);
    gamePattern.push(randomChosenColour);           
    level=level+1;
    
}


$('.btn').on('click',function(){
    var userChoice=$(this).attr('id');
    $(userChoice).fadeOut(100).fadeIn(100);
    sound(userChoice);
    userPattern.push(userChoice);
    animatePress(userChoice);
    checkAnswer(userPattern.length-1);
    
});


function checkAnswer(cl) {
    if (userPattern[cl]==gamePattern[cl]) {
        
        if (userPattern.length===gamePattern.length) {
            setTimeout(function(){
                nextSequence();
                   },1000);
            
        }
    }
    else{
        
        sound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }
    
}


function startOver() {
    level=0;
    gamePattern=[];
    start=false;
}





function animatePress(cc){
    $('#'+cc).addClass('pressed');
    setTimeout(function(){
        $('#'+cc).removeClass('pressed');
    },100);
}


function sound(randomChosenColour)
{   
    var aud= new Audio('./sounds/'+randomChosenColour+'.mp3');
    aud.play();
}   