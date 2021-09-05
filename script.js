const round = document.getElementById("round");

let playerHP = 5,
    enemyHP = 5,
    match = 0;

function matchCounter() {
    match += 1;
    round.textContent = `Round ${match}`;

    return match;
}

function gameResult() {
    if(playerHP === 0 || enemyHP === 0) {
        
    }
}

function computerPlay() {
    const computerHand = ['Sword', 'Arts', 'Spells'];
    const choice = computerHand[Math.round(Math.random() * (computerHand.length - 1))];
    const choiceIcon = document.getElementById("enemyPlay");

    if(choice === "Sword") {
        choiceIcon.src = "images/sword.svg";
    } else if(choice === "Arts") {
        choiceIcon.src = "images/martial-arts.svg";
    } else {
        choiceIcon.src = "images/magic-spell.svg";
    }

    return choice;
}

function story(playerSelection, computerSelection) {
    const textOutput = document.getElementById("textOutput");

    switch(true) {
        case playerSelection === computerSelection:
            borderSetter("rgb(58, 188, 248)");

            if(playerSelection === "Sword")
                textOutput.textContent = "Instinctively, you know that unless you can catch him off guard with another move. This swordplay is getting nowhere."
            else if(playerSelection === "Arts")
                textOutput.textContent = "You strike each other with the same speed and precision. This is futile."
            else textOutput.textContent = "Though your spells are powerful, they are identical so their powers cancel out."
            
            break;
        case playerSelection === 'Sword' && computerSelection === 'Spells':
            textOutput.textContent = "Your anti-magic swords cut through the dark spells to the enemy's flesh. This is your win."
            enemyHP -= 1;
            borderSetter("rgb(6, 199, 6)");

            break;
        case playerSelection === 'Arts' && computerSelection === 'Sword':
            textOutput.textContent = "His swift cut was deadly but it is no match for your hardened skin. You caught his blade and countered."
            enemyHP -= 1;
            borderSetter("rgb(6, 199, 6)");

            break;
        case playerSelection === 'Spells' && computerSelection === 'Arts':
            textOutput.textContent = "Your spells successfully drain the enemy's life force. This is very effective."
            enemyHP -= 1;
            borderSetter("rgb(6, 199, 6)");

            break;

        case computerSelection === 'Sword' && playerSelection === 'Spells':
            textOutput.textContent = "Your spells are nothing against those swords. With no energy after casting, you are left defenseless."
            playerHP -= 1;
            borderSetter("rgb(219, 9, 9)");

            break;
        case computerSelection === 'Arts' && playerSelection === 'Sword':
            textOutput.textContent = "You are rendered useless after your blade was flung out of your hand the moment you struck his solid body."
            playerHP -= 1;
            borderSetter("rgb(219, 9, 9)");

            break;
        default:
            textOutput.textContent = "Your indestructible body and arts are nothing when defending against those forbidden spells."
            playerHP -= 1;
            borderSetter("rgb(219, 9, 9)");
        
    }
}

function borderSetter(color) {
    const mainBorder = document.querySelector("main");
    const player = document.getElementById("player");
    const enemy = document.getElementById("enemy");

    mainBorder.style.border = `4px solid ${color}`;
    player.style.borderRight = `4px solid ${color}`;
    enemy.style.borderLeft = `4px solid ${color}`;
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
}