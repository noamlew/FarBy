const upText = document.getElementById("upText");
const downText = document.getElementById("downText");

let colors, answer, score, mistake, goodAnswer, gameOn, count, myBestScore;
gameOn = false;

//#region $audio
const backgroundAudio = new Audio();
backgroundAudio.src = "audio/backgruond.mp3";

const correctAudio = new Audio();
correctAudio.src = "audio/Correct.mp3";

const worngAudio = new Audio();
worngAudio.src = "audio/wrong.mp3";

const ticTacAudio = new Audio();
ticTacAudio.src = "audio/Tic tac.mp3";

const dindDongAudio = new Audio();
dindDongAudio.src = "audio/Ding Ding.mp3";
//#endregion

const startText = document.getElementById("startText");

function startGame() {
    if (startText.innerText === "start") {
        gameOn = true;
        count = 60;
        score = 0;
        mistake = 0;
        myBestScore = parseInt(localStorage.getItem("BSTMG-farBy"));
        infoBestScore.innerHTML = `Best score: ${myBestScore}`;
        startText.innerHTML = "restart";
        startText.style.fontSize = "100px";
        backgroundAudio.volume = 0.25;
        backgroundAudio.play();

        chooseColors();
        timer();
    } else {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        startText.innerHTML = "start";
        startText.style.fontSize = "120px";
        time.innerHTML = "1:00";
        time.style.color = "black";
        gameOn = false;
    }
}

function chooseColors() {
    colors = ["green", "yellow", "red", "blue"];

    answer = Math.floor(Math.random() * 2);
    if (answer === 1) {
        answer = Math.floor(Math.random() * colors.length);
        upText.innerHTML = colors[answer];
        downText.style.color = colors[answer];
        goodAnswer = colors[answer];
        removeColor(colors[answer]);
        answer = Math.floor(Math.random() * colors.length);
        upText.style.color = colors[answer];
        removeColor(colors[answer]);
        answer = Math.floor(Math.random() * colors.length);
        downText.innerHTML = colors[answer];
    } else {
        answer = Math.floor(Math.random() * colors.length);
        downText.innerHTML = colors[answer];
        upText.style.color = colors[answer];
        goodAnswer = colors[answer];
        removeColor(colors[answer]);
        answer = Math.floor(Math.random() * colors.length);
        downText.style.color = colors[answer];
        removeColor(colors[answer]);
        answer = Math.floor(Math.random() * colors.length);
        upText.innerHTML = colors[answer];
    }
}

function removeColor(color) {
    colors = colors.filter((oneColor) => {
        if (oneColor === color) {
            return false;
        } else {
            return true;
        }
    });
}

const time = document.getElementById("timer");

function timer() {
    if (gameOn) {
        count--;
        if (count >= 10) {
            time.innerHTML = `0:${count}`;
        } else if (count >= 0) {
            time.style.color = "red";
            time.innerHTML = `0:0${count}`;
            ticTacAudio.play();
        } else if (count < 0) {
            endGame();
        }
        setTimeout(timer, 1000);
    }
}

function chackAnswer(color) {
    if (gameOn) {
        if (color === goodAnswer) {
            score++;
            correctAudio.play();
        } else {
            mistake++;
            worngAudio.volume = 0.7;
            worngAudio.play();
        }
        setUpScore();
        chooseColors();
    }
}

const infoRight = document.getElementById("infoRight");
const infoMistakes = document.getElementById("infoMistakes");
const infoRightPercent = document.getElementById("infoRightPercent");
const infoMistakesPercent = document.getElementById("infoMistakesPercent");
const infoScore = document.getElementById("infoScore");
const infoScorePercent = document.getElementById("infoScorePercent");
const infoBestScore = document.getElementById("infoBestScore");

function setUpScore() {
    infoRight.innerHTML = `Right: ${score}`;
    infoMistakes.innerHTML = `Mistakes: ${mistake}`;
    infoRightPercent.innerHTML = `Right percent: ${Math.floor(
        (100 / (score + mistake)) * score
    )}%`;
    infoMistakesPercent.innerHTML = `Mistakes percent: ${Math.floor(
        (100 / (score + mistake)) * mistake
    )}%`;
    infoScore.innerHTML = `Final score: ${score - mistake}`;
    infoScorePercent.innerHTML = `Final score percent: ${Math.floor(
        (100 / (score + mistake)) * score - (100 / (score + mistake)) * mistake
    )}%`;
    infoBestScore.innerHTML = `Best score: ${myBestScore}`;
}

function endGame() {
    bestScore();
    dindDongAudio.play();
    time.innerHTML = "1:00";
    time.style.color = "black";
    startText.innerHTML = "start";
    startText.style.fontSize = "120px";
    gameOn = false;
}

function bestScore() {
    if (!myBestScore) {
        localStorage.setItem("BSTMG-farBy", score - mistake);
    } else if (myBestScore < score - mistake) {
        localStorage.setItem("BSTMG-farBy", score - mistake);
    }
}

const helpButton = document.getElementById("helpDiv");
const helpText = document.getElementById("helpP");
const rulse = document.getElementById("rulse");

function help() {
    if (helpText.innerText === "help") {
        rulse.style.display = "flex";
        helpText.innerHTML = "back";
        infoRight.style.display = "none";
        infoMistakes.style.display = "none";
        infoRightPercent.style.display = "none";
        infoMistakesPercent.style.display = "none";
        infoScore.style.display = "none";
        infoScorePercent.style.display = "none";
        infoBestScore.style.display = "none";
    } else {
        rulse.style.display = "none";
        helpText.innerHTML = "help";
        infoRight.style.display = "flex";
        infoMistakes.style.display = "flex";
        infoRightPercent.style.display = "flex";
        infoMistakesPercent.style.display = "flex";
        infoScore.style.display = "flex";
        infoScorePercent.style.display = "flex";
        infoBestScore.style.display = "flex";
    }
}
