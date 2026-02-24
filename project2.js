let userScore=0;
let compScore=0;
let gameOver=false;
let timerMode=false;
let timeLeft=10;
let timerInterval;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");
const resetBtn=document.querySelector("#reset-btn");
const compChoiceText=document.querySelector("#comp-choice");
const darkBtn=document.querySelector("#dark-mode-toggle");
const difficultySelect=document.querySelector("#difficulty");
const timerBtn=document.querySelector("#timer-toggle");
const timerDisplay=document.querySelector("#timer");

const winSound=new Audio("https://www.soundjay.com/buttons/sounds/button-4.mp3");
const loseSound=new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

const genCompChoice=(userChoice)=>{
const options=["rock","paper","scissor"];

if(difficultySelect.value==="hard" && userChoice){
if(userChoice==="rock") return "paper";
if(userChoice==="paper") return "scissor";
if(userChoice==="scissor") return "rock";
}
return options[Math.floor(Math.random()*3)];
};

const startTimer=()=>{
timeLeft=10;
timerDisplay.innerText="Time: "+timeLeft;
timerInterval=setInterval(()=>{
timeLeft--;
timerDisplay.innerText="Time: "+timeLeft;
if(timeLeft===0){
clearInterval(timerInterval);
msg.innerText="⏰ Time Up!";
msg.style.backgroundColor="orange";
}
},1000);
};

const checkGameOver=()=>{
if(userScore===5){
msg.innerText="🏆 You Won The Game!";
msg.style.backgroundColor="darkgreen";
gameOver=true;
}
else if(compScore===5){
msg.innerText="💻 Computer Won The Game!";
msg.style.backgroundColor="darkred";
gameOver=true;
}
};

const animateScore=(element)=>{
element.classList.add("animate");
setTimeout(()=>element.classList.remove("animate"),300);
};

const playGame=(userChoice)=>{
if(gameOver) return;

if(timerMode){
clearInterval(timerInterval);
startTimer();
}

const compChoice=genCompChoice(userChoice);
compChoiceText.innerText="Computer chose: "+compChoice;

if(userChoice===compChoice){
msg.innerText="Game Draw 🤝";
msg.style.backgroundColor="gray";
}
else{
let userWin;

if(userChoice==="rock"){
userWin=compChoice==="paper"?false:true;
}
else if(userChoice==="paper"){
userWin=compChoice==="scissor"?false:true;
}
else{
userWin=compChoice==="rock"?false:true;
}

if(userWin){
userScore++;
userScorePara.innerText=userScore;
animateScore(userScorePara);
msg.innerText="You Win 🎉";
msg.style.backgroundColor="green";
winSound.play();
}else{
compScore++;
compScorePara.innerText=compScore;
animateScore(compScorePara);
msg.innerText="You Lose 😢";
msg.style.backgroundColor="red";
loseSound.play();
}
}
checkGameOver();
};

choices.forEach(choice=>{
choice.addEventListener("click",()=>{
playGame(choice.getAttribute("id"));
});
});

resetBtn.addEventListener("click",()=>{
userScore=0;
compScore=0;
gameOver=false;
userScorePara.innerText=0;
compScorePara.innerText=0;
msg.innerText="Play your move";
msg.style.backgroundColor="#081b31";
compChoiceText.innerText="Computer chose: -";
clearInterval(timerInterval);
timerDisplay.innerText="Time: 10";
});

darkBtn.addEventListener("click",()=>{
document.body.classList.toggle("dark-mode");
});

timerBtn.addEventListener("click",()=>{
timerMode=!timerMode;
if(timerMode){
startTimer();
timerBtn.innerText="⏳ Timer ON";
}else{
clearInterval(timerInterval);
timerDisplay.innerText="Time: 10";
timerBtn.innerText="⏳ Timer Mode";
}
});