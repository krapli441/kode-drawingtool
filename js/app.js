const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const colorOptions = Array.from
    (document.getElementsByClassName("color-option")
);
const saveImage = document.getElementById("save")
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn  = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = 800;
canvas.height = 800;
context.lineWidth = lineWidth.value;
context.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onModeClick() {
    if(isFilling) {
        isFilling = false
        modeBtn.innerText = "채우기"
    } else {
        isFilling = true
        modeBtn.innerText = "그리기"
    }
}

function onMove(event) {
    if (isPainting) {
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        return;
    }
    context.beginPath();
    context.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isPainting = true;
}

function canclePainting() {
    isPainting = false;
}

function onLineWidthChange(event) {
    context.lineWidth = event.target.value;
}


function onColorChange(event) {
    context.strokeStyle = event.target.value;
    context.fillStyle = event.target.value;
}


function onColorClick(event) {
    const colorvalue = event.target.dataset.color;
    context.strokeStyle = colorvalue;
    context.fillStyle = colorvalue;
    color.value = colorvalue;
}


function onCanvasClick() {
    if (isFilling) {
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) ;
    }
}

function onDestroyClick() {
    context.fillStyle = "white"
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    context.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "채우기"; 
}

function onFilechange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    const image = new Image()
    image.src = url;
    image.onload = function() {
        context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
    context.font = "128px serif";
    context.fillText(text, event.offsetX, event.offsetY);
    }
}


function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting)
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
modeBtn.addEventListener("click", onModeClick);
colorOptions.forEach(color => color.addEventListener("click", onColorClick))
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFilechange);
saveImage.addEventListener("click", onSaveClick);