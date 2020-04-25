/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, playerNum, gamePlaying, customerScore
//scores is an array to store the total points of the two players
scores = [0, 0]
//0 for player1 and 1 for player2
playerNum = 0

initialize()

//preset goal score
customerScore = 100

//happens when "Roll" is hit
document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        //generate a random number
        var dice = Math.ceil(Math.random() * 6)

        //diplay the result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + dice + '.png'

        // add the points
        var currentScore = document.querySelector('#current-' + playerNum)
        var getter = parseInt(currentScore.textContent, 10)
        if (dice === 1) {
            currentScore.textContent = 0
            nextPlayer()
        } else {
            currentScore.textContent = dice + getter
        }
    }
})

//happens when "Hold" is hit
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // save the round score to the total score
        var totalScore = document.querySelector('#score-' + playerNum)
        var roundScore = document.querySelector('#current-' + playerNum)
        scores[playerNum] += parseInt(roundScore.textContent, 10)
        totalScore.textContent = scores[playerNum]
        roundScore.textContent = 0

        //check if that player wins
        if (totalScore.textContent >= customerScore) {
            document.querySelector('#name-' + playerNum).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.player-' + playerNum + '-panel').classList.remove('active')
            document.querySelector('.player-' + playerNum + '-panel').classList.add('winner')
            gamePlaying = false
        } else {
            //skip turns, same as rolling a one
            nextPlayer()
        }
    }
})

//happens when "New game" is hit
document.querySelector('.btn-new').addEventListener('click', initialize)

//happens when "Go" is hit
document.querySelector('.btn-go').addEventListener('click', function() {
    if (document.querySelector('.final-score').value.length != 0) {
        customerScore = document.querySelector('.final-score').value
    }
})

//switch to the another player's turn 
function nextPlayer() {
    //toggle also works
    document.querySelector('.player-' + playerNum + '-panel').classList.remove('active')
    playerNum = (playerNum + 1) % 2
    document.querySelector('.player-' + playerNum + '-panel').classList.add('active')
    document.querySelector('.dice').style.display = 'none'
}

//initialize the game
function initialize() {
    scores = [0, 0]
    playerNum = 0
    gamePlaying = true
    document.querySelector('.dice').style.display = 'none'
    document.getElementById('score-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.add('active')
}