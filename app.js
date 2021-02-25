// animation 2 - character
//alert(1);
//let timeUp = true;
var timeLeft = 10; 
var eggsCaught = 0;
var eggsNumber = document.getElementById('eggs-container');
//var stats = document.getElementById('stats');
eggsNumber.innerHTML = eggsCaught;


//let timeUp = false;

const wonContainer = document.querySelector('.win-container');
const loseContainer = document.querySelector('.lose-container');
console.log(loseContainer, wonContainer)
const eggsNumber2 = document.querySelector('.eggs-number');
const start = document.querySelector('.start-container');
const startBtn2 = document.getElementById('startGame')
startBtn2.addEventListener('click', startGame); // make sure there a few buttons for this 
startBtn2.addEventListener('touchend' , startGame )
const countdownNum = document.querySelector('#countdown');


function startGame (e) {
    
    if(e.type == 'touchend') {
        //alert(e.type);
        gogo();
    } else if (e.type == 'click') {
        gogo();
    }
    //startBtn2.classList.toggle('hide');

   countdownTimer();
   e.preventDefault;
start.style.display = "none";
loseContainer.style.display = "none";
wonContainer.style.display = "none";
}


function countdownTimer() {
    var timer = setInterval(function() {
        timeLeft--;
        countdownNum.innerHTML = timeLeft; 
        if (timeLeft <= 0) 
          clearInterval(timer);
        }, 1000);
  
        setTimeout(() => {
            countdownNum.innerHTML = '10'; // just add it to the dom later this is when it begins  
        }, 11000) // orginially 11500 
  }



function gogo() {
const canvas = document.getElementById('canvas');
const down = document.getElementById('goDown');
const ctx = canvas.getContext('2d');

const bunny = document.getElementById('bunny');
const eggy = document.getElementById('eggy');

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
    w: 40,
    h: 49,
    x: 20,
    y: 200,
    speed: 5,
    dx: 0,
    dy: 0
}
const egg = {
    w: 30,
    h: 34,
    x: 40,
    y: 60
}

let eggsCaught = 0;

function drawPlayer() {
    // using the object with the drawImage function 

    ctx.drawImage(bunny, player.x, player.y, player.w, player.h); // syntax: the image, place x , place y, width and height
}
function drawEgg() {
    // using the object with the drawImage function 

    ctx.drawImage(eggy, egg.x, egg.y, egg.w, egg.h); // syntax: the image, place x , place y, width and height
}
// function drawBox() {
//     ctx.beginPath();
//     ctx.rect(egg.x, egg.y, egg.w, egg.h); //context.rect(x,y,width,height);
//     ctx.stroke();
// }

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
// function score() {
//     ctx.fillStyle = "black";
// 	ctx.font = "16px Helvetica";
// 	ctx.textAlign = "left";
// 	ctx.textBaseline = "top";
// 	ctx.fillText("Eggs caught: " + eggsCaught, 20, 32); // position of the writing // need to add points from the update function 

// }


// anything that will be displayed on the screen 
function render() {
    clear(); // this will clear the canvas 
    //score();
    // timer as well
    drawPlayer();
    //drawBox();
    drawEgg()
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
    eggsNumber.innerHTML = eggsCaught;
})

setTimeout(() => {
    if (eggsCaught >= 2 ) {
        wonContainer.style.display = "block";
        // if (eggsCaught == 0) {
        //     eggsNumber2.innerHTML = 0;
        // } else {
        //     eggsNumber2.innerHTML = eggsCaught;
        // }
     
        
        console.log(wonContainer)
        // start.innerHTML = `
        
        // <div class="won-container">
        // <h4>You've Won!</h4>
        //    <input type="email" id="email">
        //    <button class="other">submit</button>
        // </div>
    
        // `;
       setTimeout(() => {
       
        // add block here 
       // startBtn2.style.display = "block";
        //alert("you've won")
        //startGame();
        //gogo();
        location.reload();
        // make time longer when completed 
    }, 5000) 
    } else {
        //start.style.display = "block";
        //start.innerHTML = `You Lost`;
        
        loseContainer.style.display = "block";
        // console.log('You lost!');
        // eggsNumber2.addEventListener('click', function(e) {
        //     e.preventDefault;
        //     console.log(e.type);
        //     startGame(e)
        // })
        setTimeout(() => {
            // add block here 
           // startBtn2.style.display = "block";
            //alert("you've won")
            //startGame();
            //gogo();
            location.reload();
        }, 3000)
    }
}, 11500)

}