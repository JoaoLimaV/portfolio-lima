// SH - SHOTS HORIZONTAL
// SV - SHOTS VERTICAL

// Functions Maps KeyBoard Keys
const div_game = document.getElementById('game')
const body = document.querySelector('body')
let elementVida = document.getElementById("vida");



document.addEventListener("keydown", (event) => {
    for( let x in keyPressed){
        if(x == event.key && gameVariables.enableMovePlayer != false){
            keyPressed[x] = true;
        }
    }
})

document.addEventListener("keyup", (event) => {
    let moveUp = moveKeyUp[event.key];
    if( moveUp  && gameVariables.enableMovePlayer != false){
        moveUp();
    }
})

// Player Move

const player = {
    element: document.getElementById('player'),
    spritePlayer : document.getElementById('sprite-player'),
    width: null,
    height: null,
    sprites: {
        jump : '../img/game/jump.png',
        attack: '../img/game/attack.gif',
        stop: '../img/game/stop.gif',
        deathGIF: '../img/game/deathGIF.gif',
        deathPNG: '../img/game/deathPNG.png',
        hurth: '../img/game/hurth.gif',
        run: '../img/game/run.gif'
    },
    x : 50,
    y : 50,
    life: 4
}

const boss = {
    element: document.getElementById('boss'),
    attackSprite: {
        fallGunter : '../img/game/fallGunter.gif',
        slideGunter : '../img/game/slideGunter.gif'
    },
    width: null,
    height: null,
}


const keyPressed = {
    ArrowRight: false,
    ArrowLeft:  false,
    ArrowDown:  false,
    ArrowUp :   false
}

const times = {
    lastJump : 0,
    lastAttack: 0,
    nowJump: new Date(),
    nowAttack: new Date(),
    delayMovePlayer: 400
}

const key = {
    up:    document.getElementById('key-up'),
    left:  document.getElementById('key-left'),
    right:  document.getElementById('key-right'),
    down:  document.getElementById('key-down')
}


let isJump = false;

function damagePlayer(){
    gameVariables.enableMovePlayer = false;
    gameVariables.enableDamagePlayer = false;
    player.life--;

    for( let x in keyPressed){
        keyPressed[x] = false;
    }

    player.spritePlayer.src = player.sprites.hurth
    
    let porcent;
    switch(player.life){
        case 1:
             porcent = '25%';
        break;
        case 2:
             porcent = '50%';
        break;
        case 3:
             porcent = '75%';
        break;
        
        default:
            porcent = '0%'
        break;
    }
    elementVida.style.width = porcent;

    if( player.life == 0){
        stopGame();
        return;
    }

    elementVida.style.width = porcent;

    setTimeout(() => {
        gameVariables.enableMovePlayer = true;
        gameVariables.enableDamagePlayer = true;
        player.spritePlayer.src = player.sprites.stop
    }, 750)
}

function movePlayer(){
    player.element.style.transition = "left 0.1s, bottom 0.4s"

    for( let x in keyPressed){
        if(keyPressed[x] == true){
            let moveFunction = moveKeyDowm[x];
            moveFunction();
        }
    }
}

const moveKeyDowm = {
    ArrowRight : function () { 
            keyPressed.ArrowLeft = (keyPressed.ArrowLeft == true) ? false : keyPressed.ArrowLeft;

            if( keyPressed.ArrowLeft == false){
                var maxRight = window.innerWidth;
                player.element.style.transform = "rotateY(0deg)"
                let speed = 25;

                if(!player.spritePlayer.src.includes("run.gif")){
                    player.spritePlayer.src = player.sprites.run
                }

                player.x += speed;

                if(player.x > maxRight ){
                    player.x = -player.width;
                    player.element.style.transition = "bottom 0.4s"

                }
                player.element.style.left = player.x + 'px'
            }
        
    },
    ArrowLeft : function () { 
            keyPressed.ArrowRight = (keyPressed.ArrowRight == true) ? false : keyPressed.ArrowRight;

            if( keyPressed.ArrowRight == false ){
                player.element.style.transform = "rotateY(180deg)"

                let speed = 25;
                var maxLeft = 0;

                if(!player.spritePlayer.src.includes("run.gif")){
                    player.spritePlayer.src = player.sprites.run
                }

                player.x -= speed;

                if(player.x < (maxLeft) ){
                    let maxRight = window.innerWidth;
                    player.x = maxRight;
                    player.element.style.transition = "bottom 0.4s"
                }

                player.element.style.left = player.x + 'px'
            }   
    },
    ArrowDown : function () {  
        if(player.element.classList.contains("down-player") == false && keyPressed.ArrowUp != true && isJump == false){
            player.element.classList.add('down-player')
        }
    },
    ArrowUp : function () { 
        isJump = true;

        if( keyPressed.ArrowUp == true && keyPressed.ArrowDown != true && (times.nowJump - times.lastJump) >= times.delayMovePlayer){
            times.lastJump = new Date();

            let intervalId = setInterval(() => {
                const computedPlayer = window.getComputedStyle(player.element);
                player.y = Math.round(parseInt(computedPlayer.getPropertyValue("bottom").replace('px', '')));
             }, 1);

            player.element.classList.add('jump-player')

            if(!player.spritePlayer.src.includes("jump.gif")){
                player.spritePlayer.src = player.sprites.jump
            }

            setTimeout(() => {
                if(!player.spritePlayer.src.includes("hurth.gif")){
                    player.spritePlayer.src = player.sprites.stop
                }
                times.nowJump = new Date();
                player.element.classList.remove('jump-player')
                isJump = false;
                clearInterval(intervalId); // interrompe o setInterval quando o jogador não está mais pulando
            }, 500)

        }
    }
}



const moveKeyUp = {
    ArrowDown : function () { 
        player.element.classList.remove('down-player')
        player.spritePlayer.src = player.sprites.stop
        keyPressed.ArrowDown = false;
    },
        ArrowRight : function () { 
        player.spritePlayer.src = player.sprites.stop
        keyPressed.ArrowRight = false;
    },
    ArrowLeft : function () { 
        player.spritePlayer.src = player.sprites.stop
        keyPressed.ArrowLeft = false;
    },

     ArrowUp :  function () { 
        keyPressed.ArrowUp = false;
    }, 
    z : function () { 
        times.nowAttack = new Date();
            if(!player.spritePlayer.src.includes("attack.gif") && keyPressed.ArrowRight != true && keyPressed.ArrowLeft != true && (times.nowAttack - times.lastAttack) >= times.delayMovePlayer){
                player.element.style.width = "100px"
                player.spritePlayer.src = player.sprites.attack
                times.lastAttack = new Date();
                setTimeout(() => {
                    player.spritePlayer.src = player.sprites.stop
                }, 600)
            }
    },
}

// Game Functions

const elementFinishGame = document.getElementById("finish-game")
const rGame = document.getElementById("restart-game")
const eGame = document.getElementById("exit-game")

const gameVariables = {
    enableMovePlayer : true,
    enableDamagePlayer : true,
    points : 0
}

// Set Intevals
let intervalMovePlayer;
let intervalVerifyCollisionSH;
let intervalVerifyCollisionSV;
let intervalCreateHShot;
let intervalCreateVShot;
let intervalSecondsSurvived;

function howPlay() {
    let divHowPlay = document.getElementById("how-play")
    divHowPlay.classList.remove("d-none");
    divHowPlay.classList.add("d-flex");
}

function dontShowAgain(){
    console.log('aaaaa')
    if( !localStorage.getItem('dontShowAgain') ){
        localStorage.setItem('dontShowAgain', true);
        return;
    }

    localStorage.removeItem('dontShowAgain');
}

function closeHowPlay(){
    let divHowPlay = document.getElementById("how-play")
    divHowPlay.classList.add("d-none");
    divHowPlay.classList.remove("d-flex");

    restartGame();
}


function startGame(){

    div_game.style.display = 'block';
    body.classList.add('hideBody')

    if( !localStorage.getItem('dontShowAgain')){
        howPlay();
        return;
    }

    // Player Loop 
    intervalMovePlayer = setInterval(movePlayer, 50);

    // Shots Horizontal Loop
    intervalVerifyCollisionSH = setInterval(verifyCollisionSH, 50);
    intervalVerifyCollisionSV = setInterval(verifyCollisionSV, 50);
    
    intervalCreateHShot = setInterval(createHShot, 2000);
    intervalCreateVShot = setInterval(createVShot, 2000);

    intervalSecondsSurvived = setInterval(points, 1000)

    player.spritePlayer.style.width = "65px"
    player.spritePlayer.style.height = "87px"

    elementVida.style.width = '100%';
    elementFinishGame.style.display = "none";
    player.life = 4;
    gameVariables.points = 0;
    player.spritePlayer.src = player.sprites.stop
    gameVariables.enableDamagePlayer = true;
    gameVariables.enableMovePlayer = true;

    player.width = player.element.offsetWidth;
    player.height = player.element.offsetHeight; 
}

function stopGame(){

    gameVariables.enableMovePlayer = false;
    gameVariables.enableDamagePlayer = false;

    for( let x in keyPressed){
        keyPressed[x] = false;
    }

    clearInterval(intervalMovePlayer)

    clearInterval(intervalVerifyCollisionSH)
    clearInterval(intervalCreateHShot)

    clearInterval(intervalCreateVShot)
    clearInterval(intervalVerifyCollisionSV)
    
    clearInterval(intervalSecondsSurvived)

    player.spritePlayer.src = player.sprites.deathGIF
    player.spritePlayer.style.width = "65px"
    player.spritePlayer.style.height = "75px"

    setTimeout(() => {
        player.spritePlayer.src = player.sprites.deathPNG
    }, 370)

    let spanPoints = document.getElementById('pontos');

    spanPoints.innerHTML = gameVariables.points;

    let points = ( gameVariables.points > 25 ) ? ( gameVariables.points > 50) ? ( gameVariables.points > 75) ? 3 : 2 : 1 : 0 
    let starsElements = document.getElementsByClassName('star-game')

    for( let x = 0; x < points ; x++ ){
        starsElements[x].classList.add('yellow-star')
    }

    elementFinishGame.style.display = "flex";
    
}

function exitGame(){

    clearInterval(intervalMovePlayer)

    clearInterval(intervalVerifyCollisionSH)
    clearInterval(intervalCreateHShot)

    clearInterval(intervalCreateVShot)
    clearInterval(intervalVerifyCollisionSV)

    clearInterval(intervalSecondsSurvived)

    div_game.style.display = 'none';
    elementFinishGame.style.display = "none";

    body.classList.remove('hideBody')
}

function restartGame(){

    // Player Loop 
    intervalMovePlayer = setInterval(movePlayer, 50);

    // Shots Horizontal Loop
    intervalVerifyCollisionSH = setInterval(verifyCollisionSH, 50);
    intervalVerifyCollisionSV = setInterval(verifyCollisionSV, 50);
    
    intervalCreateHShot = setInterval(createHShot, 2000);
    intervalCreateVShot = setInterval(createVShot, 2000);

    intervalSecondsSurvived = setInterval(points, 1000)

    player.spritePlayer.style.width = "65px"
    player.spritePlayer.style.height = "87px"
    elementVida.style.width = '100%';
    elementFinishGame.style.display = "none";
    player.life = 4;
    gameVariables.points = 0;
    player.spritePlayer.src = player.sprites.stop
    gameVariables.enableDamagePlayer = true;
    gameVariables.enableMovePlayer = true;

    player.width = player.element.offsetWidth;
    player.height = player.element.offsetHeight; 
    

}


function points() {
    gameVariables.points++;
}

// Horizontal Shots

let hShots = [];

function verifyCollisionSH(){
    for(var i in hShots){
        let shotElement = hShots[i];
        const computedShot = window.getComputedStyle(shotElement);

        let bottomShot  = Math.round(parseInt(computedShot.getPropertyValue("bottom").replace('px', '')));
        let heightShot = Math.round(parseInt(computedShot.getPropertyValue("height").replace('px', '')));
        let widthShot = Math.round(parseInt(computedShot.getPropertyValue("width").replace('px', '')));

        let yShot = bottomShot + heightShot; 
        let xShot  = Math.round(parseInt(computedShot.getPropertyValue("left").replace('px', '')));

        var maxRight = window.innerWidth;
        var maxLeft = 0;

        if(xShot <= maxLeft || xShot >= maxRight){
            shotElement.remove();
            hShots.splice(i ,1);
            return;
        }

        if( shotElement.classList.contains("right") ) {
            if(
               xShot < player.x + player.width && 
               xShot + widthShot  >= player.x  && 
               yShot - 10 > player.y           &&
               gameVariables.enableDamagePlayer != false
            ){
                shotElement.remove();
                hShots.splice(i ,1);
                damagePlayer();
                return;
            }
        }

        if( shotElement.classList.contains("left") ) {
            if(
               xShot + widthShot > player.x     &&
               xShot <= player.x + player.width &&
               yShot - 10 > player.y            &&
               gameVariables.enableDamagePlayer != false
            ){
                shotElement.remove();
                hShots.splice(i ,1);
                damagePlayer();
                return;
            }
        }
            
    }
}

function createHShot(){
    // 0 Right, 1 Left
    var number     = Math.round(Math.random())
    var elementShot = document.createElement('div'); 
    var spriteShot  = document.createElement('img'); 

    spriteShot.setAttribute("src", boss.attackSprite.slideGunter);
    var classe = "h-shot"
    classe += (number == 0) ? " cem-to-zero-shot right" : " zero-to-cem-shot left";
    elementShot.setAttribute("class", classe);

    elementShot.appendChild(spriteShot);
    div_game.appendChild(elementShot);

    hShots.push(elementShot);
}

// Vertical Shots

let vShots = [];

function verifyCollisionSV  (){
    for(var i in vShots){
        let shotElement = vShots[i];
        const computedShot = window.getComputedStyle(shotElement);

        let bottomShot  = Math.round(parseInt(computedShot.getPropertyValue("bottom").replace('px', '')));
        let widthShot   = Math.round(parseInt(computedShot.getPropertyValue("width").replace('px', '')));
        let yShot = bottomShot; 
        let xShot  = Math.round(parseInt(computedShot.getPropertyValue("left").replace('px', '')));

        if(yShot <= (-25)){
            shotElement.remove();
            vShots.splice(i ,1);
            return;
        }

            if(
                xShot <=  player.x  + player.width && 
                xShot +  widthShot >= player.x     && 
                yShot <= player.y  + player.height &&
                yShot >= player.y                  &&
                gameVariables.enableDamagePlayer  != false
            ){
                shotElement.remove();
                vShots.splice(i ,1);
                damagePlayer();
                return;
            }
    }
}

function createVShot(){
    var elementShot = document.createElement('div'); 
    var spriteShot  = document.createElement('img'); 

    spriteShot.setAttribute("src", boss.attackSprite.fallGunter);
    var classe = "v-shot top-to-bottom-shot"
    elementShot.setAttribute("class", classe);
    elementShot.appendChild(spriteShot);

    let computedBoss = window.getComputedStyle(boss.element);
    let leftBoss     = Math.round(parseInt(computedBoss.getPropertyValue("left").replace('px', '')));
    
    elementShot.style.left = `${leftBoss}px`

    div_game.appendChild(elementShot);

    vShots.push(elementShot);
}

