const startPlayingBtn = document.getElementById("start-playing");
const screen1 = document.getElementById("screen-one");
const screen2 = document.getElementById("screen-two");
const screen3 = document.getElementById("screen-three");
const chooseButtons = document.getElementsByClassName("choice-text");
const choiceImageButtons = document.getElementsByClassName("img-container");
const playerDisplayChoice = document.getElementById("player-choice");
const compDisplayChoice = document.getElementById("comp-choice");
const RockContainer = document.getElementById("rock-container");
const ScissorContainer = document.getElementById("scisor-container");
const PaperContainer = document.getElementById("paper-container");
let FinalPlayerScore = document.getElementById("final-player-score");
let FinalCompScore = document.getElementById("final-computer-score");
let FinalTieScore = document.getElementById("final-tie-result");
let FinalStatement = document.getElementById("Final-statement");
const ReplayBtn = document.getElementById("replay-button");
var ClickedEltByUser;
var CompChoiceText;
var UserChoiceText;
const QuitGameBtn = document.getElementById("quit-button");

QuitGameBtn.addEventListener("click" , QuitGame);
ReplayBtn.addEventListener("click" , Replay);

// the result things

const Tier = document.getElementById("tie-score");
const CompScore = document.getElementById("comp-score");
const PlayerScore = document.getElementById("player-score");

let ComputersChoice = [ RockContainer , ScissorContainer , PaperContainer];
let computersIndex = -1;

// to avoid changing twice
var btnClicked = false;

startPlayingBtn.addEventListener("click" , GameScreenRevealer);

for(let chooseBtn of chooseButtons){
    chooseBtn.addEventListener("click" , ChooseBtnClicked);
}

for (let choiceImgBtn of choiceImageButtons ){
    choiceImgBtn.addEventListener("click" , ChooseIGBtnClicked);
}


function GameScreenRevealer(){
    screen1.classList.remove("active");
    screen2.classList.add("active");
}


function ChooseBtnClicked(event){
    btnClicked = true;
    ClickedEltByUser = event.target;
    const ImgContainer = ClickedEltByUser.previousElementSibling;
    console.log(ImgContainer);
    playerDisplayChoice.innerHTML = ImgContainer.innerHTML;
    ComputerChoose();
    ResultUpdator();
}

function ChooseIGBtnClicked(event){
    // to enable choosing by click on image
    ClickedEltByUser = event.currentTarget;
    //  console.log(ClickedButon); will give us the image
    playerDisplayChoice.innerHTML = ClickedEltByUser.innerHTML;
    ComputerChoose();
    ResultUpdator();
}

function ComputerChoose(){
    // the computer will also choose
    computersIndex = Math.floor(Math.random() * 3);
    let ComputerChosen = ComputersChoice[computersIndex];
    // html obj and set the image
    compDisplayChoice.innerHTML = ComputerChosen.innerHTML;
}

// RESULT COMPARISON 

// THE BUTTONS ARE THE ONLY WORKING PARTS 

function ResultUpdator(){
    let ComputerChosen = ComputersChoice[computersIndex];
    let ButtonUnderImg = ComputerChosen.nextElementSibling;
    console.log(ButtonUnderImg);

    CompChoiceText = ButtonUnderImg.innerText;
    console.log(CompChoiceText);
    // nextElementSibling
    let UserChoiceText = ClickedEltByUser.innerText;
    console.log(UserChoiceText);

    console.log(CompChoiceText.toLowerCase());
    console.log(UserChoiceText.toLowerCase());
    console.log(CompChoiceText.toLowerCase() === UserChoiceText.toLowerCase());
        
    if (CompChoiceText.toLowerCase().trim() === UserChoiceText.toLowerCase().trim()){
        // tie + 1
        Tier.innerText = Number(Tier.innerText) + 1;
    }

    else if ( (CompChoiceText.toLowerCase().trim() === "rock" && UserChoiceText.toLowerCase().trim() === "paper") 
    || (CompChoiceText.toLowerCase().trim() === "scissor" && UserChoiceText.toLowerCase().trim() === "rock")
    || (CompChoiceText.toLowerCase().trim() === "paper" && UserChoiceText.toLowerCase().trim() === "scissor")
    ) {
        // user + 1
        PlayerScore.innerText = Number(PlayerScore.innerText) + 1;
    }

    else {
        // comp + 1
        CompScore.innerText = Number(CompScore.innerText) + 1;
    }

}


function QuitGame(){
    screen2.classList.remove("active");
    screen3.classList.add("active");
    ResultAnnouncer();
}

function ResultAnnouncer(){
    FinalPlayerScore.innerText = PlayerScore.innerText;
    FinalCompScore.innerText = CompScore.innerText;
    FinalTieScore.innerText = Tier.innerText;

    if (Number(FinalPlayerScore.innerText) > Number(FinalCompScore.innerText)){
        FinalStatement.innerText = "You won congrats. You want to have a rematch?";
    }

    else if(Number(FinalPlayerScore.innerText) < Number(FinalCompScore.innerText)){
        FinalStatement.innerText = "I won . MUAHAHAA . I will understand if u are a sore looser otherwise let's have a rematch!!";
    }

    else if(Number(FinalPlayerScore.innerText) === Number(FinalCompScore.innerText)){
        FinalStatement.innerText = "Nice playing with you. It was a good game but they say a game never ends without a winner let's rematch.";
    }


}

function Replay(){
    FinalPlayerScore.innerText = "0";
    FinalCompScore.innerText = "0";
    FinalTieScore.innerText = "0";
    PlayerScore.innerText = "0";
    CompScore.innerText = "0";
    Tier.innerText = "0";
    btnClicked = false;
    computersIndex = -1;
    CompChoiceText = undefined
    ClickedEltByUser = undefined;
    playerDisplayChoice.innerHTML = "";
    compDisplayChoice.innerHTML = "";
    screen1.classList.add("active");
    screen3.classList.remove("active");

}
