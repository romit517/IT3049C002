let canvas = document.getElementById('tt'), 
    ctx = canvas.getContext('2d'), 
    intro = document.getElementById('intro'),
    cellSize = 100,
        map = [
            0, 0, 0,
            0, 0, 0, 
            0, 0, 0,
        ];
        winPatterns = [
            0b111000000, 0b000111000, 0b000000111,  //Rows
            0b100100100, 0b010010010, 0b001001001,  //Columns
            0b100010001, 0b001010100,    //Diagonals
        ],
        BLANK = 0, X = 1, O = -1,

        mouse = {
            x: -1,
            y: -1,
        },
        currentPlayer = X,
        gameOver = false;


canvas.width = canvas.height = 3 * cellSize;

canvas.addEventListener('mouseout', function(){
    mouse.x = mouse.y = -1;
});

canvas.addEventListener('mousemove', function(e){
    let x = e.pageX - canvas.offsetLeft,
        y = e.pageY - canvas.offsetTop;

        mouse.x = x;
        mouse.y = y;

        //console.log(getCellByCoords(x, y)); //Troubleshooting...
});

canvas.addEventListener('click', function(e){
    play(getCellByCoords(mouse.x, mouse.y));
});

function play(cell){
    if (gameOver) return;
    if(map[cell] != BLANK){
       console.log('Position taken already...!');
       return;
    }

    map[cell] = currentPlayer;

    let winCheck = checkWinner(currentPlayer);

    if (winCheck != 0) {
        gameOver = true;
        window.alert(((currentPlayer == X)? 'X' : 'O') + ' wins!');
    } else if(map.indexOf(BLANK) == -1){
        gameOver = true;
        window.alert('TIE...!');
    }

    currentPlayer *= -1;

}

    function checkWinner(player){
        let playerMapBitMask = 0;
        for(let i = 0; i < map.length; i++){
            playerMapBitMask <<= 1;
            if(map[i] == player)
                playerMapBitMask +=1;
        }

        for (let i = 0; i < winPatterns.length; i++){
            if((playerMapBitMask & winPatterns[i]) == winPatterns[i]){
                return winPatterns[i];
            }
        }
        return 0;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard();
        fillBoard();
        function drawBoard()    {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 10;

            ctx.beginPath();
            ctx.moveTo(cellSize, 0);
            ctx.lineTo(cellSize, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(cellSize * 2, 0);
            ctx.lineTo(cellSize * 2, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, cellSize);
            ctx.lineTo(canvas.width, cellSize);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, cellSize * 2);
            ctx.lineTo(canvas.width, cellSize * 2);
            ctx.stroke();
        }

        function fillBoard()    {
            for(let i = 0; i < map.length; i++){
                let coords = getCellCoordinates(i);

                ctx.save();
                ctx.translate(coords.x + cellSize / 2, coords.y + cellSize / 2);
                if(map[i] == X) {
                    drawX();
                }else if(map[i] == O){
                    drawO();
                }
                ctx.restore();
            }
        }

        function drawX () {
           ctx.beginPath();
           ctx.moveTo(-cellSize / 3, -cellSize / 3);
           ctx.lineTo(cellSize / 3, cellSize / 3);
           ctx.moveTo(cellSize / 3, -cellSize / 3);
           ctx.lineTo(-cellSize / 3, cellSize / 3);
            ctx.stroke();
        }

        function drawO (){
          ctx.beginPath();
          ctx.arc(0 ,0, cellSize/3 , 0, Math.PI * 2);
          ctx.stroke();  
        }

        requestAnimationFrame(draw);
    }
    function getCellCoordinates(cell){
        let x = (cell % 3) * cellSize,
            y = Math.floor(cell / 3) * cellSize;

        return {
            'x': x,
            'y': y,
        };
    }


function getCellByCoords (x, y){
    return (Math.floor(x / cellSize) % 3) + Math.floor(y / cellSize) * 3;
}

draw();