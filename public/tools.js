// matched it has sockets for undo and redo extra which I did self

let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let download = document.querySelector("#download");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pictureClick = document.querySelector("#upload");

context.lineWidth = 6;
undo.addEventListener("click", function () {
    undoWork();
    // socket.emit("ud", linesDB); //m2
    socket.emit("ud", ""); //m1

})

function undoWork() {
    // latest line drawn
    // as if pushed undefined then problem in redrawing it
    if (linesDB.length) {
        let lastLine = linesDB.pop();
        redoLines.push(lastLine);
        // WRONG AS THEN ALL OF SAME SIZE THUS USE THE LINEWIDTH IN OBJECT ALSO AS USED COLOR
        // let currSize = context.lineWidth; //taaki dubara draw also with same size
        context.clearRect(0, 0, canvas.width, canvas.height);
        // canvas cleared again set context props
        drawAllLines(linesDB);
    }
}

let redoLines = [];
redo.addEventListener("click", function () {
    // socket.emit("rd", redoLines); //m2
    socket.emit("rd", ""); //m1
    redoWork(redoLines);
});

function redoWork(redoLines) {
    if (redoLines.length) {
        let lineObject = redoLines.pop();
        //as now it is part of the drawn content whenever undo again then remove last drawn line
        linesDB.push(lineObject);
        drawALine(lineObject);
    }
    console.log(redoLines);
}

// if undo then drawn something then redo should not work because as last something is not removed it is added
download.addEventListener("click", function () {
    console.log("Download Clicked");
})

let StickyNote = document.querySelector("#sticky-note");
StickyNote.addEventListener("click", function () {
    console.log("StickyNote Clicked");
})

// now needed lastused size as well as I did with colour (my self to provide ease to the user)

pencil.addEventListener("click", function () {
    context.strokeStyle = pencilColorInUse;
    let obj = document.getElementById("pencil");
    if (!obj.classList.contains("active")) {
        let eObj = document.getElementById("eraser");
        if (eObj.classList.contains("active")) {
            eraserWidthInUse = context.lineWidth;
        }
        eObj.classList.remove("active");

        context.lineWidth = pencilWidthInUse;
        let eOptions = document.querySelector(".eraser-options");
        eOptions.classList.remove("active-options");
        obj.classList.add("active");
    } else {
        // already pencil useable thi you clicked again to enable options
        let optionsObject = document.querySelector(".pencil-options");
        if (optionsObject.classList.contains("active-options")) {
            optionsObject.classList.remove("active-options");
        } else {
            optionsObject.classList.add("active-options");
        }
    }
})

eraser.addEventListener("click", function () {
    context.strokeStyle = canvas.style.backgroundColor;
    let eObject = document.getElementById("eraser");
    if (!eObject.classList.contains("active")) {
        let pObj = document.getElementById("pencil");
        if (pObj.classList.contains("active")) {
            pencilWidthInUse = context.lineWidth;
        }
        pObj.classList.remove("active"); //if hona hoga then ho jaega

        context.lineWidth = eraserWidthInUse;
        let pOptions = document.querySelector(".pencil-options");
        pOptions.classList.remove("active-options");
        eObject.classList.add("active");
    } else {
        // already eraser useable thi you clicked again to enable options
        let optionsObject = document.querySelector(".eraser-options");
        if (optionsObject.classList.contains("active-options")) {
            optionsObject.classList.remove("active-options");
        } else {
            optionsObject.classList.add("active-options");
        }
    }
})


//adding background colors via looping over all
let colors = document.querySelectorAll(".pencil-color button");
//4 buttons in this
console.log(colors);
for (let i = 0; i < colors.length; i++) {
    let button = colors[i];
    let currColor = button.getAttribute("class");
    button.style.backgroundColor = currColor;
    button.addEventListener("click", function () {
        //updating wrt to input's curr range value else it will take according to that of eraser
        let val = document.querySelector(".pencil-font-size").value;
        context.lineWidth = val;

        pencilColorInUse = currColor;
        context.strokeStyle = currColor;
        //removing the active class
        removeActiveOptionClassPencil();
    })
}

function removeActiveOptionClassPencil() {
    let obj = document.getElementsByClassName("pencil-options")[0]; // returns an array //console.log(obj);
    obj.classList.remove("active-options");
}

function removeActiveOptionClassEraser() {
    let obj = document.getElementsByClassName("eraser-options")[0]; // returns an array //console.log(obj);
    obj.classList.remove("active-options");
}

// To set the color of an HTML5 Canvas line, we can use the strokeStyle property of the canvas context, which can be set to a color string such as red, green, or blue, a hex value such as #FF0000 or #555, or an RGB value such as rgb(255, 0, 0).
// fillStyle changes the color it fills in the rectangle if written

// The difference is that the oninput event occurs immediately after the value of an element has changed, while onchange occurs when the element loses focus, after the content has been changed.
// use change bcz input fires as soon as get a change it not lets you slide through it
let fontSizeRange = document.querySelector("#pencil-size input");
fontSizeRange.addEventListener("change", function () {
    let val = fontSizeRange.value;
    context.lineWidth = val;
    context.strokeStyle = pencilColorInUse;
    removeActiveOptionClassPencil();
})

let eraserSizeRange = document.querySelector("#eraser-size input");
eraserSizeRange.addEventListener("change", function () {
    let val = eraserSizeRange.value;
    // console.log(val);
    context.lineWidth = val;
    removeActiveOptionClassEraser();
})

// LOOK VIA CONTEXT OBJECT PRINTED ON THE DOM MODEL - TO set the font of the canvas it can also fill in the text in typed nature
// ctx.font = "30px Arial";
// ctx.fillText("Hello World", 10, 50);