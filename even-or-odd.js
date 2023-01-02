function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const randomNumber = getRndInteger(0, 10);
const playerNumber = process.argv[3];

const playerChoice = process.argv[2];

if(playerNumber === randomNumber) {
    console.log("You nailed the random number, you won !")
}

if(playerChoice === "even") {
    if(randomNumber % 2 === 0){
        console.log(`Your choice was ${playerChoice}, the computer it's Odd.
    \nThe result was ${randomNumber}, you won!`)
    } else {
        console.log(`Your choice was ${playerChoice}, the computer it's Odd.
    \nThe result was ${randomNumber}, you loose!`)
    }
}

if(playerChoice === "odd") {
    if(randomNumber % 2 === 1) {
        console.log(`Your choice was ${playerChoice}, the computer it's Even.
    \nThe result was ${randomNumber}, you won!`)
    } else {
        console.log(`Your choice was ${playerChoice}, the computer it's Even.
    \nThe result was ${randomNumber}, you loose!`)
    }
}