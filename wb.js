let canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

let width = 2;

let globalPenColor = [0, 0, 0]

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);


    let red = document.getElementById('red');
    let green = document.getElementById('green');
    let blue = document.getElementById('blue');
    let box = document.querySelector('div.neumorphism-3');

    let r = 0, g = 0, b = 0;

    red.addEventListener("keyup", function (event) {
        r = red.value;
        if (!r)
            r = 0;
        box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });

    green.addEventListener("keyup", function (event) {
        g = green.value;
        if (!g)
            g = 0;
        box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });

    blue.addEventListener("keyup", function (event) {
        b = blue.value;
        if (!b)
            b = 0;
        box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });

    warner = document.getElementById('warning');
}

function draw() {
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over'
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = `rgb(${globalPenColor[0]}, ${globalPenColor[1]}, ${globalPenColor[2]})`;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
}

function setColor(element) {
    let display = document.getElementById('penColorDisplay');

    let re = document.getElementById('red').value;
    if (!re)
        re = 0;
    let gr = document.getElementById('green').value;
    if (!gr)
        gr = 0;
    let bl = document.getElementById('blue').value;
    if (!bl)
        bl = 0;
    if (element == "pen")
    {
        globalPenColor = [re, gr, bl];
        display.style.backgroundColor = `rgb(${re}, ${gr}, ${bl})`;
    }
    else {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = `rgb(${re}, ${gr}, ${bl})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function erase() {
    let m = confirm("Are you sure you want to clear?");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = `rgb(${re}, ${gr}, ${bl})`;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    } 
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}