var canvas, ctx, gridSize,tileS, nextX, nextY;

window.onload = function(){
    canvas = document.getElementById("tt");
    ctx = canvas.getContext("2d");


    document.addEventListener("keydown", keyDownEvent);

    //renders X times/second...

    var x = 8;
    setInterval(draw, 1000 / x);
};

    //Game box

    gridSize = (tileS = 20); 
    var nextX = (nextY = 0);


    //Attributes for Snake...

    var intitalTailSize = 2;
    var tailSize = intitalTailSize;
    var snakeTrail = [];
    var snakeX = (snakeY = 10);

    //Prey...
    var preyX = (preyY = 15);




        function draw(){

  
            snakeX += nextX;
            snakeY += nextY;


            if(snakeX < 0){
                snakeX = gridSize - 1;
            }
            if(snakeX > gridSize - 1){
                snakeX = 0;
            }
            if(snakeY < 0){
                snakeY = gridSize - 1;
            }
            if(snakeY > gridSize - 1){
                snakeY = 0;
            }

            if(snakeX == preyX && snakeY == appleY){
                tailSize++

                preyX = Math.floor(Math.random() * gridSize);
                preyY = Math.floor(Math.random() * gridSize);
            }

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);


            ctx.fillStyle = "green";
            for(var i = 0; i < snakeTrail.length; i++){
                ctx.fillRect(
                    snakeTrail[i].x * tileS,
                    snakeTrail[i].y * tileS,
                    tileS,
                    tileS
                );

                if(snakeTrail[i].x == snakeX && snakeTrail[i].y ==snakeY){
                    tailSize = intitalTailSize;
                }
            }

            ctx.fillStyle = "red";
            ctx.fillRect(preyX * tileS, preyY * tileS, tileS, tileS);

            snakeTrail.push({ x: snakeX, y: snakeY});
            while(snakeTrail.length > tailSize){
                snakeTrail.shift();
            }
        }

            //For input...

            function keyDownEvent(e) {
                switch(e.keyCode){
                    case 37:
                        nextX = -1;
                        nextY = 0;
                        break;
                    case 38:
                        nextX = 0;
                        nextY = -1;
                    case 39:
                        nextX = 1;
                        nextY = 0;
                        break;
                    case 40:
                        nextX = 0;
                        nextY = 1;
                        break;
                }

            }


