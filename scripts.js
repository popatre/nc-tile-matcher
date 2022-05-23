const cards = document.querySelectorAll(".memory-card");
let arr = [];
let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 0;
let score = 0;

function flipCard(){
    document.querySelector(".instructions").style.display = "none";
    if(lockBoard) return;

    if(this===firstCard) return;

    this.classList.add('flip');  // adds  class to item//
    var audio = new Audio('audio/swoosh.mp3');
    audio.play();

    if(!hasFlipped){
        hasFlipped = true;

        firstCard = this;
        
        arr.push(this.id);
        
    } else {
        hasFlipped = false;
        secondCard = this;
        
        arr.push(this.id);
        
        matchChecker(arr);
    }
}


function matchChecker(array){
    let isMatch = array[0]===array[1];
    
    isMatch ? disableCards(): unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    count++;
    score+= 7;

   setTimeout(() => {   

    var audio = new Audio('audio/correct.wav');
    audio.play();

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
    
    gameOver();

   }, 500);
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        score--;
        var audio = new Audio('audio/wrong.wav');
        audio.play();
        
        
        resetBoard();
        lockBoard = false;
        }, 1500);
}

function resetBoard(){
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    arr=[]; 
    document.querySelector(".score").innerHTML = score;
    
}

(function shuffle(){
    cards.forEach(card => {
       let randomNumber = Math.floor(Math.random() * 12);
       card.style.order = randomNumber;
       document.querySelector(".score").innerText = score;
    //    document.querySelector('.gameover').style.visibility = 'hidden';
    }); 
})();

function shuffleReset(){
    cards.forEach(card => {
       let randomNumber = Math.floor(Math.random() * 12);
       card.style.order = randomNumber;
       
       resetBoard();
       document.querySelector('.gameover').style.visibility = 'hidden';
    }); 
};

function gameOver(){
    if (count === 6) { 
        var audio = new Audio('audio/yes.wav');
        audio.play();

        document.querySelector('.gameover').style.visibility = 'visible';
        document.querySelector('.winner').innerText = `Your score was ${score}!`;
        // setTimeout(() => {
        //     alert(`Game complete! Your score was ${score}! Refresh to play again!`);
        // }, 500);
    };
}

cards.forEach(card => card.addEventListener('click', flipCard));

