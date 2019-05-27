let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let d;
let score = 0;
let gameOver = false;
let Snake = function () {
    this.spees = 10;
    this.array = [];
    this.radius = 10;
    this.taoSnake = taoSnake;
    this.taoDuoi = taoDuoi;
    this.headVsArray = headVsArray;
    this.logic=logic;
    this.getArray = function () {
        this.array[0] = {
            x: 8 * 10, y: 8 * 10
        }
    };

    function taoSnake() {
        ctx.beginPath();
        ctx.arc(this.array[0].x, this.array[0].y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.stroke();
    }

    function taoDuoi() {
        for (let i = this.array.length - 1; i > 0; i--) {
            ctx.beginPath();
            this.array[i].x = this.array[i - 1].x;
            this.array[i].y = this.array[i - 1].y;
            ctx.arc(this.array[i].x, this.array[i].y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "#2a3cff";
            ctx.fill();
        }
    }

    function headVsArray() {
        for (let i = 2; i < this.array.length; i++) {
            if (this.array[0].x == this.array[i].x && this.array[0].y == this.array[i].y) {
                gameOver = true;
            }
        }
    }
    function logic(event) {
        if (event.keyCode == 37 && d != "sangPhai") {
            d = 'sangTrai';
        } else if (event.keyCode == 38 && d != "xuongDuoi") {
            d = 'lenTren';
        } else if (event.keyCode == 39 && d != "sangTrai") {
            d = 'sangPhai';
        } else if (event.keyCode == 40 && d != "lenTren") {
            d = 'xuongDuoi';
        } else if (event.keyCode == 17) {
            d = 'tangToc';
        }
    }
};

let Food = function () {
    this.x = Math.floor(Math.random() * 17 + 3) * 10;
    this.y = Math.floor(Math.random() * 15 + 4) * 10;
    this.radius = 10;
    this.taoFood = taoFood;

    function taoFood() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#27ff5d";
        ctx.fill();
        ctx.stroke();
    }
};

let snake = new Snake();
document.addEventListener('keydown', logic);
snake.logic();
snake.getArray();

let food = new Food();

function snakeVsFood() {
    if (Math.abs(snake.array[0].x - food.x) <= 20 && Math.abs(snake.array[0].y - food.y) <= 20) {
        score++;
        snake.array.push({x: food.x, y: food.y});
        food.x = Math.floor(Math.random() * 10 + 10) * 10;
        food.y = Math.floor(Math.random() * 10 + 10) * 10;
    }
}

function tao() {
    ctx.clearRect(0, 0, 360, 360);
    snake.taoSnake();
    food.taoFood();
    snakeVsFood();
    snake.taoDuoi();
    snake.headVsArray();
    //chuyen dong
    if (d == 'sangTrai') snake.array[0].x -= snake.spees;
    if (d == 'sangPhai') snake.array[0].x += snake.spees;
    if (d == 'lenTren') snake.array[0].y -= snake.spees;
    if (d == 'xuongDuoi') snake.array[0].y += snake.spees;
    if (d == 'tangToc') snake.spees++;
    //cham vien
    if (snake.array[0].x < 10 || snake.array[0].x > 360 - 10 || snake.array[0].y < 10 || snake.array[0].y > 360 - 10 || gameOver == true) {
        clearInterval(game);
        alert("game over");
    }
    document.getElementById("score").innerHTML = 'Score: ' + score;
}


let game = setInterval(tao, 100);