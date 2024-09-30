let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgArea = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turn = true;

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turn) {
            box.innerHTML = "O";
            turn = false;
            box.style.backgroundColor = "red";
            box.style.color = "black";
            setTimeout(() =>{
                box.style.backgroundColor = "white";
            },150);
        } else {
            box.innerHTML = "X";
            turn = true;
            box.style.backgroundColor = "red";
            setTimeout(() =>{
                box.style.backgroundColor = "white";
            },150);
        }
        box.disabled = true;

        checkWinner();
    });
});

const gameReset = () =>{
    turn = true;
    enableBoxes();
    msgArea.classList.add("hide");
}

const showWinner = (winner) =>{
    msg.innerText = `Yeah ${winner} you beat the opponent`;
    msgArea.classList.remove("hide");
}

const checkWinner = () => {
    for (pattern of winningPatterns) {
        let positionOneValue = boxes[pattern[0]].innerText;
        let positionTwoValue = boxes[pattern[1]].innerText;
        let positionThreeValue = boxes[pattern[2]].innerText;

        if(positionOneValue != "" && positionTwoValue != "" && positionThreeValue != ""){
           if(positionOneValue === positionTwoValue && positionTwoValue === positionThreeValue){
                console.log('winner', positionOneValue);
                showWinner(positionOneValue);
                disableBoxes();
           }
        }
    }
};

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

newGameBtn.addEventListener('click',gameReset);
resetBtn.addEventListener('click',gameReset);