let playerScore = 0,
    computerScore = 0;

function game() {
    let playerSelection;
    let matchCounter = 0;

    while(true) {
        ++matchCounter;

        if(playerScore === 5 || computerScore === 5) {
            console.log(playerScore > computerScore ? '\nYou emerge victorious' : '\nBetter luck next time!');
            break;

        } else {
            playerSelection = prompt('Play your hand:', 'Rock');
            console.log(`\nMatch ${matchCounter}`);
            console.log(`You choose ${playerSelection}`);
            console.log(playRound(playerSelection));
        }
    }
}

function computerPlay() {
    const computerHand = ['Rock', 'Paper', 'Scissors'],
        choice = computerHand[
            Math.round(
                Math.random() * (computerHand.length - 1)
                )
            ];
    
    console.log(`Computer plays ${choice}`);
    return choice;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = capFirstLetter(playerSelection),
    computerSelection = capFirstLetter(computerPlay());

    switch(true) {
        case playerSelection === computerSelection:
            return `It's a tie! You both played ${playerSelection}.`;

        case playerSelection === 'Rock' && computerSelection === 'Scissors':
        case playerSelection === 'Paper' && computerSelection === 'Rock':
        case playerSelection === 'Scissors' && computerSelection === 'Paper':
            playerScore = ++playerScore;
            console.log(`Player: ${playerScore} Computer: ${computerScore}`);
            return `Great move! ${playerSelection} beats ${computerSelection}.`;

        default:
            computerScore = ++computerScore;
            console.log(`Player: ${playerScore} Computer: ${computerScore}`);
            return `Too bad! ${computerSelection} beats ${playerSelection}`;
    }
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
}