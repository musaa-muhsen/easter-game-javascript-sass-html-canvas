// animation 2 - character
//alert(1);
//let timeUp = true;
var timeLeft = 10; 
var eggsCaught = 0;
var eggsNumber = document.getElementById('eggs-container');
eggsNumber.innerHTML = eggsCaught;

let timeUp = false;

const won = document.querySelector('.won');

const scoreBoard = document.querySelector('.score');
const startBtn2 = document.getElementById('startGame')
startBtn2.addEventListener('click' , startGame); // make sure there a few buttons for this 


function startGame () {
    
console.log(this);
    //timeUp = true;
   startBtn2.classList.toggle('hide');
   timeLeft = 10; 
   gogo();
//    setTimeout(() => {
       
//        timeUp = true
//        console.log(timeUp)
// }, 10000)
   countdownTimer();
   //this.style.display = "none";

}

function classToggle() {
    this.classList.toggle('class1');
    this.classList.toggle('class2');
}
document.querySelector('#div').addEventListener('click', classToggle);


// function countDown() {
//     timeLeft = 10
//     setInterval(function() {
//       if (timeLeft <= 0 ) {
//         clearInterval(timeLeft = 0);
//       }
//       //timeLeftDisplay.innerHTML = timeLeft
//       console.log(timeLeft)
//       timeLeft -=1;
//     }, 1000)
//   }
function countdownTimer() {
    var timer = setInterval(function() {
        timeLeft--;
        //countdownNum.textContent = timeleft; add here 
        console.log(timeLeft)
        if (timeLeft <= 0) 
          clearInterval(timer);
        }, 1000);
  
        setTimeout(() => {
//countdownNum.textContent = '10'; // just add it to the dom later this is when it begins  
          alert(eggsCaught) // after 10 seconds collect these points 
          // add the start button 
          // could add it here the you've won etc 
          

        }, 10000) // orginially 11500 
  }


//   function myFunction() {
//     var element = document.getElementById("myDIV");
//     element.classList.toggle("mystyle");
//  }
function gogo() {
  const canvas = document.getElementById('canvas');
const down = document.getElementById('goDown');
const ctx = canvas.getContext('2d');

const image = document.getElementById('source');

//const intro = 
// handle buttons 
const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');

rightBtn.addEventListener('mousedown',moveRight );
rightBtn.addEventListener('mouseup', keyUp)
rightBtn.addEventListener('touchstart', moveRight)
rightBtn.addEventListener('touchend', keyUp);

leftBtn.addEventListener('mousedown',moveLeft );
leftBtn.addEventListener('mouseup', keyUp)
leftBtn.addEventListener('touchstart', moveLeft)
leftBtn.addEventListener('touchend', keyUp);

upBtn.addEventListener('mousedown',moveUp );
upBtn.addEventListener('mouseup', keyUp)
upBtn.addEventListener('touchstart', moveUp)
upBtn.addEventListener('touchend', keyUp);


downBtn.addEventListener('mousedown',moveDown );
downBtn.addEventListener('mouseup', keyUp)
downBtn.addEventListener('touchstart', moveDown)
downBtn.addEventListener('touchend', keyUp);


// rendered stuff 
const player = {
    w: 30,
    h: 50,
    x: 20,
    y: 200,
    speed: 5,
    dx: 0,
    dy: 0
}
const egg = {
    w: 20,
    h: 30,
    x: 40,
    y: 60
}

let eggsCaught = 0;

function drawPlayer() {
    // using the object with the drawImage function 
    ctx.drawImage(image, player.x, player.y, player.w, player.h); // syntax: the image, place x , place y, width and height
}

function drawBox() {
    ctx.beginPath();
    ctx.rect(egg.x, egg.y, egg.w, egg.h); //context.rect(x,y,width,height);
    ctx.stroke();
}

// to clear
function clear() {
    ctx.clearRect(0,0,canvas.width, canvas.height); // it's clearing on every paint 
}

var reset = function () {
	player.x = (canvas.width / 2) - 20;
	player.y = (canvas.height / 2) - 10;

	// Throw the monster somewhere on the screen randomly
	egg.x = 32 + (Math.random() * (canvas.width - 64));
	egg.y = 32 + (Math.random() * (canvas.height - 64));
    // if(eggsCaught == 2) {
       
    //     won.style.display = "block";
    //    // ctx.clearRect(0,0,canvas.width, canvas.height);
      
    // } 
};

function moveUp(e) {
    e.preventDefault
    player.dy = -player.speed;
}
function moveDown(e) {
    e.preventDefault
    player.dy = player.speed;
}

function moveLeft(e) {
    e.preventDefault
    player.dx = -player.speed;
}

function moveRight(e) {
    e.preventDefault
    player.dx = player.speed;
}

// Update game objects
function update () {
   
   
  
    
//console.log(player.x) // this is constantly getting called 
        // Are they touching?
        // 32 is the size of the png 
        if (
            player.x <= (egg.x + 32)
            && egg.x <= (player.x + 32)
            && player.y <= (egg.y + 32)
            && egg.y <= (player.y + 32)
        ) {
            ++eggsCaught;
            reset();

           
    }


    //console.log(eggsCaught);
};

function newPos() {
    //console.log('gos')
  player.x += player.dx;// += append // its zero by default if 4 for example then it will go automatically 
  player.y += player.dy;

  detectWalls();
}

function detectWalls() {
    // left wall // if at 0 keep at 0
    if (player.x < 0) {
        player.x = 0;
    }
    // right wall  // take into account the width of player 
    if(player.x + player.w > canvas.width) {
        //console.log(player.x);
        player.x = canvas.width - player.w;// x value changes // so the canvas width minus the player size is the position
    }
    
    // top wall 
    if (player.y < 0) {
        player.y = 0;
    }

    // bottom wall // if is like a find 
    if (player.y + player.h > canvas.height) {
        console.log(player.y);
        player.y = canvas.height - player.h;
    }
}

// keyup event 
function keyUp(e) {
   
        player.dx = 0;
        player.dy = 0;
        e.preventDefault();   
 }


//score 
function score() {
    ctx.fillStyle = "black";
	ctx.font = "16px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Eggs caught: " + eggsCaught, 20, 32); // position of the writing // need to add points from the update function 

}


// anything that will be displayed on the screen 
function render() {
    clear(); // this will clear the canvas 
    score();
    // timer as well
    drawPlayer();
    drawBox();
    newPos(); // update the position when called by events 

}



var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};



// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 14);

setInterval(() => {
   // eggsNumber.innerHTML = eggsCaught;
})

setTimeout(() => {
    setTimeout(() => {
        startBtn2.style.display = "block";
        alert("you've won")
        //startGame();
        //gogo();
        location.reload();
    })
   

}, 10000)

}