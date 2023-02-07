const dashes = document.querySelector('.dashes');
const button = document.querySelector('.btn');
const input = document.querySelector('.input');
const wrongWords = document.querySelector('.wrong-words');
const title = document.querySelectorAll('.title');
let names = ["Muzammil" , "Arslaan" , "Farasha" , "Nasra" , "Zaroon" , "Fariha","RAMISH","TABISH","HASHIM","ALISHBA","MEHMOOD","Maryam","Inshrah","Zerlish","ZUBIA","MAHJABEEN","ARMEENA","ALIZAY","NAFEESA","RABACA","ARMISH","ANEELA","MEERAB","UMAIMA","Ahtisham","Abrish","Bakhtawer","Jahanzaib","Hafifa","Hanzla","Minhal","Ushna","Kashmala","Zulqarnain","Azhar","miraj","sufiyan"];
let name; // Used to Store Current Name
let errorNumber = 0; // Used As a Counter To Count 12 Chances
let CorrectWords = 0; // Used As a counter to count correct words.
let nodeArr = []; // Contains spans in form of dashes
let firstTime = true; // Flag to check whether the game has been started for the 1st time
let charArr = []; // Stores All used Characters.
function restartGame() {
    charArr = [];
    input.value = "";
    for (let i = 0; i < title.length; i++) {
        title[i].style.color = "black";
    }
    wrongWords.innerHTML = '';
    errorNumber = 0;
    CorrectWords = 0;
    randomName();
    removeDash();
    displayDash();
}
function removeDash() {
    nodeArr.forEach((node) => {
        node.remove();
    })
    // for (let i = 0; i < nodeArr.length; i++) {
    //     nodeArr[i].innerText = "";
    //     // nodeArr[i].classList.add('line');
    // }
}
function usedWordsList(char, value) {
    if (value) {
        const wrongWord = document.createElement('h3');
        wrongWord.innerHTML = `<i class="fa-regular fa-circle-check green"></i>` + char;
        wrongWords.appendChild(wrongWord);
    }
    else{
        const wrongWord = document.createElement('h3');
        wrongWord.innerHTML = `<i class="fa-regular fa-circle-xmark red"></i>` + char;
        wrongWords.appendChild(wrongWord);
    }

}
function randomName() {
    let randomNum = Math.floor(Math.random() * names.length);
    name = names[randomNum].toLocaleUpperCase();
}
function createDash() {
    const dashesRow = document.createElement('div');
    dashesRow.classList.add('dashes-row');
    for (let i = 0; i < name.length; i++) {
        const node = document.createElement("span");
        node.classList.add('line');
        nodeArr.push(node);
    }
    for (let i = 0; i < name.length; i++) {
        dashesRow.appendChild(nodeArr[i]);
    }
    dashes.appendChild(dashesRow);
}
function displayDash() {
    nodeArr = [];
    if (firstTime) {
        createDash();
        firstTime = false;
    }
    else {
        removeDash();
        createDash();
    }

}
function checkWord(char) {
    let error = false;
    let matched = false; // Flag To Check Word has been entered before.
    for (let i = 0; i < charArr.length; i++) {
        if (charArr[i] === char) {
            matched = true; // word has been matched.
            error = true;
        }
    }
    charArr.push(char); // words arrays contains all entered words.
    // If word is not matched then this is executed.
    if (!matched) {
        for (let i = 0; i < name.length; i++) {
            if (name[i] === char) {
                nodeArr[i].classList.remove('line');
                nodeArr[i].innerText = char;
                error = true;
                CorrectWords++;
            }
        }
    }
    // If not matched then it will be added to usedWordList.
    if (!matched && error) {
        usedWordsList(char, true);
    }
    // If name has been completed.
    if (CorrectWords === name.length) {
        alert(`Congratulations! You have guessed the name in ${errorNumber} chances.`);
        restartGame();
        error = true; // making error ture so that below code will not execute.
    }
    // if erorr will be false, means if word does'nt matches with name
    if (!error) {
        if (errorNumber <= 11) {
            title[errorNumber].style.color = "red";
            errorNumber++;
            usedWordsList(char, false);
        }
        else {
            alert(`You are Out Of Chances. Correct Name Was ${name}`);
            restartGame();
        }

    }
}
button.addEventListener("click", () => {
    let value = input.value;
    let finalChar = value.toUpperCase();
    checkWord(finalChar);
    input.value = "";
});
if (firstTime) {
    randomName();
    displayDash();
}