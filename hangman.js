// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');
let names = ["python", "java", "swift", "javascript"];
let randomVal = Math.floor(Math.random()*names.length);
let randomWord = names[randomVal];
let userGuessWords = [];
let count = 0;
let chance = 8;
let userWon = 0;
let userLost = 0;
let hintWord = "";


console.log("H A N G M A N");
userMenu();

function userMenu(){
    let userChoice = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
    if(userChoice=="play"){
        play();
    }
    else if(userChoice=="results"){
        scoreBoard();
    }

    else if(userChoice=="exit"){
        return;
    }

    else{
        userMenu();
    }
}

function play(){
    randomVal = Math.floor(Math.random()*names.length);
    randomWord = names[randomVal];
    hintWord = "";
    userGuessWords = [];
    count = 0;
    chance = 8;

    for(let i=0; i<randomWord.length; i++){
        hintWord+="-";
    }

    while(chance>0){
        if(count==randomWord.length){
            console.log("You guessed the word " + randomWord + "!");
            console.log("You survived!");
            userWon++;
            break;
        }
        userInput();
    }

    if(chance===0){
        console.log("\nYou lost!")
        userLost++;
    }

    userMenu();
}

function scoreBoard(){
    console.log(`You won: ${userWon} times.\nYou lost: ${userLost} times.`);
    userMenu();
}

function userInput(){

    console.log(`\n${hintWord}`);
    let flag = false;
    let userWord = input("Input a letter: ");

    if(userWord.length!=1){
        console.log("Please, input a single letter");
        return;
    }
    let lowerAlpha = /[a-z]/;
    if(!lowerAlpha.test(userWord)){
        console.log("Please, enter a lowercase letter from the English alphabet");
        return;
    }

    if(userGuessWords.includes(userWord)){
        console.log("You've already guessed this letter");
        return;
    }

    userGuessWords.push(userWord);

    if(hintWord.search(userWord)>=0){
        console.log("No improvements");
        chance--;
        return;
    }
    for(let i=0; i<hintWord.length; i++){
        if(hintWord[i]=="-"){
            if(userWord==randomWord[i]){
                hintWord=hintWord.slice(0,i) + userWord + hintWord.slice(i+1);
                count++;
                flag = true;
            }
        }
    }



    if(flag==false){
        console.log("That letter doesn't appear in the word");
        chance--;
    }
}
