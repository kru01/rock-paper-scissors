const weapons = document.querySelectorAll('.weapons');
const round = document.getElementById("round");

let playerHP = 5,
    enemyHP = 5,
    match = 0;

game();

function game() {
    let playerSelection;

    weapons.forEach(weapon => {
        weapon.addEventListener('click', () => {
            switch(weapon.id) {
                case `sword`:
                    playerSelection = `Sword`;
                    weapons[0].style.filter = `var(--light-blue)`;
                    weapons[1].style.filter = `var(--grey)`;
                    weapons[2].style.filter = `var(--grey)`;
                    break;
                
                case `arts`:
                    playerSelection = `Arts`;
                    weapons[0].style.filter = `var(--grey)`;
                    weapons[1].style.filter = `var(--light-red)`;
                    weapons[2].style.filter = `var(--grey)`;
                    break;

                default:
                    playerSelection = `Spells`;
                    weapons[0].style.filter = `var(--grey)`;
                    weapons[1].style.filter = `var(--grey)`;
                    weapons[2].style.filter = `var(--light-purple)`;
            }

            matchCounter();
            gameProgress(playerSelection, computerPlay());
            displayResult(playerHP, enemyHP);
            playAgain();
        });
    });
}

function matchCounter() {
    ++match;
    round.textContent = `Round ${match}`;
}

function computerPlay() {
    const computerHand = ['Sword', 'Arts', 'Spells'];
    const choice = computerHand[Math.round(Math.random() * (computerHand.length - 1))];
    const choiceIcon = document.getElementById("enemyPlay");

    if(choice === "Sword") {
        choiceIcon.src = "images/sword.svg";
        choiceIcon.style.filter = `var(--light-blue)`;
    } else if(choice === "Arts") {
        choiceIcon.src = "images/martial-arts.svg";
        choiceIcon.style.filter = `var(--light-red)`;
    } else {
        choiceIcon.src = "images/magic-spell.svg";
        choiceIcon.style.filter = `var(--light-purple)`;
    }

    return choice;
}

function gameProgress(playerSelection, computerSelection) {
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

    const health = document.querySelectorAll('.health');
    
    health[0].textContent = `Your HP: ${playerHP}`;
    health[1].textContent = `Enemy's HP: ${enemyHP}`;

    return [playerHP, enemyHP];
}

function displayResult(playerHP, enemyHP) {
    if(playerHP === 0 || enemyHP === 0) {
        const story = document.getElementById('story');
        story.classList.toggle('active');
        toggle(); 

        gameResult();
    }
}

function gameResult() {
    const close = document.getElementById('close');
    const endingTitle = document.getElementById('popupTitle');
    const ending = document.getElementById('popupContent');
    const playAgain = document.getElementById('playAgain');
    
    if(playerHP > enemyHP) {
        endingTitle.textContent = `You emerged victorious!`;
        endingTitle.style.color = '#ffc107';
        ending.textContent = `But don't get too full of yourself, that fight was just one of many...`;
    
        playAgain.textContent = `Next opponent`;
        playAgain.style.visibility = `visible`;
        close.style.visibility = `hidden`;
    } else {
        endingTitle.textContent = `This is the end of the line...`;
        endingTitle.style.color = `red`;
        ending.textContent = `Your consciousness is fading...`;
    
        playAgain.textContent = `Wake up again`;
        playAgain.style.visibility = `visible`;
        close.style.visibility = `hidden`;
    }
}

function playAgain() {
    const playAgain = document.getElementById('playAgain');

    playAgain.addEventListener('click', () => window.location.reload());
}

//Set border gameProgress()
function borderSetter(color) {
    const mainBorder = document.querySelector("main");
    const player = document.getElementById("player");
    const enemy = document.getElementById("enemy");

    mainBorder.style.border = `4px solid ${color}`;
    player.style.borderRight = `4px solid ${color}`;
    enemy.style.borderLeft = `4px solid ${color}`;
}

//for pop-up story box. toggle the blur.
function toggle() {
    const blur = document.querySelector('main');
    blur.classList.toggle('active');
    const popup = document.getElementById('popup');
    popup.classList.toggle('active');
}