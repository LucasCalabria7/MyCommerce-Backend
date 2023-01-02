function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const randomNumber = getRndInteger(0, 2)
const plays = ["rock", "scissor", "paper"]
const cpuPlay = plays[randomNumber]

const playerChoice = process.argv[2]

if (playerChoice === cpuPlay) {
    console.log(`You: ${playerChoice}\nCPU: ${cpuPlay}\nDraw`)
}

if(playerChoice === "rock") {
    if(cpuPlay === "scissor"){
        console.log(`You: ${playerChoice}\nCPU: ${cpuPlay}\nWin!`)
    } else if (cpuPlay === "paper") {
        console.log(`You: ${playerChoice}\nCPU: ${cpuPlay}\nLoss!`)
    }
}
if(playerChoice === "paper") {
    if(cpuPlay === "rock"){
        console.log(`You: ${playerChoice}\nCPU: ${cpuPlay}\nWin!`)
    } else if (cpuPlay === "scissor"){
        console.log(`You: ${playerChoice}\nCPU: ${cpuPlay}\nLoss!`)
    }
}
if(playerChoice === "scissor") {
    if(cpuPlay === "paper"){
        console.log(`You: ${playerChoice}\nCPU: ${cpuPlay}\nWin!`)
    } else if (cpuPlay === "rock"){
        console.log(`You: ${playerChoice}\nCPU: ${cpuPlay}\nLoss!`)
    }
}
