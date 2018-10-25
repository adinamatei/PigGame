/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/* *****************************************************************************
 Challenge 3
 Change the game to follow these rules:

 1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
 2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)
 3. Add another dice to the game, so that there are two dices now. the player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

 *********************************************************************************
 */

let scores, roundScore, activePlayer, gamePlaying, previousDice;

init();

// add functionality to roll button
document.querySelector(".btn-roll").addEventListener("click", function () {


    if(gamePlaying){
        // get the random numbers
        const dice1 = Math.floor(Math.random() * 6 + 1);
        const dice2 = Math.floor(Math.random() * 6 + 1);
        console.log(dice1, dice2);

        // display the results
        const diceDOM1 = document.querySelector(".dice-1");
        diceDOM1.style.display = "block";
        diceDOM1.src = "dice-" + dice1 + ".png";
        const diceDOM2 = document.querySelector(".dice-2");
        diceDOM2.style.display = "block";
        diceDOM2.src = "dice-" + dice2 + ".png";

        // console.log("previous=", previousDice);

        // CHALLENGE 3.1.
        // // check if dice rolls two 6 in a row
        // if(dice1 === 6 && previousDice === 6) {
        //     roundScore = 0;
        //     document.querySelector("#current-" + activePlayer).textContent = "0";
        //
        //     scores[activePlayer] = 0;
        //     document.querySelector("#score-" + activePlayer).textContent = "0";
        //     nextPlayer();
        // }
        // // update the round score if the rolled number is NOT 1
        // else if(dice1 !== 1 && dice2 !== 1) {
            // add scores
        //     roundScore += dice1 + dice2;
        //     //display the current score
        //     document.querySelector("#current-" + activePlayer).textContent = roundScore;
        // }
        // else {
        //     // next player
        //     nextPlayer();
        // }
        //
        // // save the previous dice roll
        // previousDice = dice1;
        // console.log("previous dice = " + previousDice);


    // update the round score if the rolled number is NOT 1
        if(dice1 !== 1 && dice2 !== 1) {
            // add scores
            roundScore += dice1 + dice2;
            //display the current score
            document.querySelector("#current-" + activePlayer).textContent = roundScore;

        }
        else {
            // next player
            nextPlayer();
        }
    }
});


// add current score to global score
document.querySelector(".btn-hold").addEventListener("click", function() {

    // get the input value
    const winnerScore = document.getElementById("setScore").value;

    // undefined, 0, null or "" are COERCED to false
    // anything else is COERCED to true
    let wScore;
    if (winnerScore) {
        wScore = winnerScore;
    } else {
        wScore = 100;
    }
    console.log("winner score =", wScore);


    if(gamePlaying) {
        //add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        //display the global score
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // check if the player is the winner
        if(scores[activePlayer] >= wScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice-1").style.display = "none";
            document.querySelector(".dice-2").style.display = "none";

            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }

    }
});

// add functionality to new game button
document.querySelector(".btn-new").addEventListener("click", init);


// next player function
function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousDice = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice-1").style.display = "none";
    document.querySelector(".dice-2").style.display = "none";
}


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

// the dice is not displayed
    document.querySelector(".dice-1").style.display = "none";
    document.querySelector(".dice-2").style.display = "none";
// set the global score to 0
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
// set the current score to 0
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
// set the initial player name
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
// remove the "active" and "winner" class
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
// add "active" class for first player
    document.querySelector(".player-0-panel").classList.add("active");

}




































