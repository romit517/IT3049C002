"use strict";
//Variables used...

const startButton = document.getElementById("startButton");

const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");

const gameForm = document.getElementById("gameForm");



startButton.addEventListener("click", function(startButtonClickEvent){
    startButtonClickEvent.preventDefault();
    console.log("The game has now started!!!");

    welcomeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
});

var computerOpt = Math.round(Math.random()*2);
if(computerOpt === 0)  {
    computerOpt = "rock";
}   else
    { 
        if(computerOpt === 1)  {
             computerOpt = "paper"
        }else{
    computerOpt = "scissors";
            } 
    }

gameForm.addEventListener("submit" , function(gameFormSubmitEvent){
    const userChoice = document.getElementById("userChoice").value;
    gameFormSubmitEvent.preventDefault(); 
    console.log("User Choice: " + userChoice);
    console.log("Computer Choice: " + computerOpt );
    compare(userChoice, computerOpt);
});

    var compare = function(choice1, choice2) {
    if(choice1 === choice2) {
      alert("The result is a tie!! Please try again...");
}

if(choice1 === "rock") {
    if(choice2 === "scissors") {
        alert("rock wins");
    } else {
        alert("paper wins");
    }
}
if(choice1 === "paper") {
    if(choice2 === "rock") {
        alert("paper wins");
    } else {
        if(choice2 === "scissors") {
            alert("scissors wins");
    }
}

}//
    
if(choice1 === "scissors") {
    if(choice2 === "rock") {
        alert("rock wins");
    } else {
        if(choice2 === "paper") {
           alert("scissors wins");
        }
    }
}
};



