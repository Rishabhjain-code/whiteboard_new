// diff due to socket

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

let pencilColorInUse = "black";
// using so that when socket.io linked both have the same design as earlier
let pencilWidthInUse = 3;
let eraserWidthInUse = 3;
context.lineWidth = 3;

// taken so that font size change k baad bhi same color

// let userColour = prompt("Enter colour for background that you want :","#f3bad6");
// prompt, confirm and alert are functions which blocks the execution thread of the script until a user input and that's the reason electron team didn't supported it. Instead you can use some third party package for the same reason.

canvas.style.backgroundColor = "#f3bad6";
// canvas.style.backgroundColor = "white";
// drawing with apt color is also needed

let linesDB = [];
let currLine = [];

// let obj = canvas.getBoundingClientRect();
// console.log(obj);
// let extraHeight = obj.top;

//alias notation for same work as above pick the top key with this name = OBJECT DESTRUCTURING
let {
    top: extraHeight
} = canvas.getBoundingClientRect();

let IsPenDown = false;
canvas.height = window.innerHeight - extraHeight; //now height vartical in block elemnts like div it becomes horizontal
canvas.width = window.innerWidth;

//here canvas porps set at start thus always set acc to window with terminal thus window give small dimension 
//it will be set for always thus add event listener to window that on resize adjust the canvas height width 
// acc to new innerHeight/Width of the window(the part you see)

function drawAllLines(linesDB) {
    canvas.style.backgroundColor = "#f3bad6";

    let numLines = linesDB.length;
    for (let i = 0; i < numLines; i++) {
        let currLineObject = linesDB[i];
        drawALine(currLineObject);
    }
    // console.log("Drawn All")
}

function drawALine(lineObject) {
    let eventsLength = lineObject.length;
    for (let i = 0; i < eventsLength; i++) {
        let aEvent = lineObject[i];
        drawAEvent(aEvent);
    }
    // console.log("Drawn A line")
}

function drawAEvent(aEvent) {
    let x = aEvent.x;
    let y = aEvent.y;
    context.strokeStyle = aEvent.color;
    context.lineWidth = aEvent.linewidth;

    if (aEvent.name == "mousedown") {
        // console.log("Drawing mouseDown")
        context.beginPath();
        context.moveTo(x, y);
    } else if (aEvent.name == "mousemove") {
        // console.log("Drawing mouseMove")
        context.lineTo(x, y);
        context.stroke();
    }
    // console.log("Drawn A Event")
}

window.addEventListener("resize", function () {
    // WRONG AS THEN ALL OF SAME SIZE THUS USE THE LINEWIDTH IN OBJECT ALSO AS USED COLOR
    // let currSize = context.lineWidth; //taaki dubara draw also with same size

    context.lineWidth = 3;
    canvas.height = window.innerHeight - extraHeight;
    canvas.width = window.innerWidth;

    canvas.style.backgroundColor = "#f3bad6";
    // (canvas and context becomes new on changing the old ones height and width)
    drawAllLines(linesDB);
})

// event have mouse info
canvas.addEventListener("mousedown", function (event) {
    // right click type situation as selective drawing
    // console.log("Mouse Down");
    // console.log(event);
    let x = event.clientX;
    let y = event.clientY - extraHeight;
    // console.log(x + "," + y);
    IsPenDown = true;

    context.beginPath();
    context.moveTo(x, y);
    context.stroke();
    //to make a point on a click start
    // context.lineTo(x + 2, y + 1);
    // context.lineTo(x, y + 2);
    //to make a point on a click end

    // press down then point as a separate on move a separate when undo want both thus nothing on down(earlier point) to take them as a 2 object event now but no point will be left when we undo the lastline
    // may see if last is just a mouseDown then pop it as it is just for click no line undo
    //start of a new line

    currLine = [];
    eventObj = {
        name: "mousedown",
        x: x,
        y: y,
        //adding vurrcolor so that redraw time also same value
        color: context.strokeStyle,
        linewidth: context.lineWidth
    };

    currLine.push(eventObj);
    linesDB.push(currLine);
    socket.emit("mdDrawn", eventObj);

})

// linesDB = {{{},{},{}},{{},{},{}},{{},{},{}},{{},{},{}}}
//               line1       line2

//only added to canvas area as added to context which have func for drawing
canvas.addEventListener("mousemove", function (event) {
    // console.log("Mouse Move");
    let x = event.clientX;
    let y = event.clientY - extraHeight;
    // console.log(x + "," + y);
    // wrt the whole body

    if (IsPenDown) {
        let eventObj = {
            name: "mousemove",
            x: x,
            y: y,
            color: context.strokeStyle,
            linewidth: context.lineWidth
        };

        // if (context.strokeStyle != canvas.style.backgroundColor)
        currLine.push(eventObj);

        //remember on redrawing to call stroke after calling lineTo
        context.lineTo(x, y);
        context.stroke();
        socket.emit("mmDrawn", eventObj);

    }
})

//canvas have default small height and width which can be redefined
canvas.addEventListener("mouseup", function (event) {
    // console.log("Mouse Up");
    // console.log(event);
    let x = event.clientX;
    let y = event.clientY - extraHeight;
    // console.log(x + "," + y);
    IsPenDown = false;

    let eventObj = {
        name: "mouseup",
        x: x,
        y: y,
        color: context.strokeStyle,
        linewidth: context.lineWidth
    };

    // if (context.strokeStyle != canvas.style.backgroundColor)
    currLine.push(eventObj);
    // now a line complete

    // console.log(linesDB);

    // console.log("Redo List Below");
    // console.log(redoLines)

    //as wanted to remove the functionality of redoing but can done it as even undo the recent drawn then also NO redo
    redoLines = [];
})

/**
 * 1
 * 
 * ISPENDOWN ONLY THEN WORK
 * 
 * MOUSE DOWN - BEGIN, MOVE TO and then stroke (beginPathto take it as a separate line)
 * MOUSE MOVE IF PENDOWN THEN LINETO, STROKE, so that visible on the spot from move to till now
 * MOUSE UP JUST SET PENDOWN FALSE
 * 
 * STROKE ON MOUSE MOVE NOT ON UP ELSE VISIBLE ONLY WHEN REACHED AT END
 * 
 * it gives shifted drawing bcz it draws at x,y wrto canvas
 * 
 * give height and width to canvas via window(object being scene) using window.innerHeight
 * shift height by 100 as due to above one it gives scrollbar
 * 
 * add event listener on resize do update heights
 * 
 * adding tools - div then div then icons 2nd div display flex set height,width space evenly
 * 100% means in whatever div you are take 100% height of that this helps in autoresizing of images on changing the div then 1st div flex,contentalign then 2nd div 100% width
 * svg have code from where take the images then use it as if direct image
 * 
 * undo ops -> 
 * 1.something like db to store ki iss beginPath s konse moves for each beginPath (like points location with event)
 * object of object of object md first and move up end thus can be done without event naming
 * 2.do something to update on ui -> 2.1 empty the canvas , 2.2 to draw again using points and events
 * 
 * optimisation - do the last event draw it again with the background color (but it will create problem when intersecting lines it will erase common points aswell).
 *
 * db done 
 * use this to draw again on resizing the window / undoing
 * redoing points m push on undoing and draw the last pushed on click
 * also once drawn something after undo empty redo as redo in one-note does the same thing
 * fontawesome for fonts / flaticon or icon
 * 
 * 
 * 2
 * 
 * implement div options active class input and all then modify the font color size appropriately on double click you do this single click just select the pencil to write as other options are selected
 * added the functionality on 2 click and sliding
 * 
 * now when 1 click the first selection and also update strokeStyle at the same time
 * 
 * set undo redo accordingly as when we run eraser it runs a text to it of same color we dont want to push it in the stack
 * 
 * store in db lineWidth and strokeStyle to draw similarly on undoing it
 * 
 * to do resizing k baad again click pr same prev length maintain 2 variables. also double click is like selecte dpr again click so no 
 * need of click count as can be done via if else more semantically.
 * 
 * use 2 var pencilWidthInUse and eraserWidthInUse when clicking on pencil removing eraser so set eraserWidth to the then context.lineWidth
 * similarly when clicking on the eraser then set the then context.lineWidth to the pencilWidthInUse. things are stored when again clicking
 * pencil set the context.lineWidth to the lastValueInUse same for eraser. Doing this from start will ensure correct shifting on clicking always
 * 
 * on drawing on resizing need lineWidth and strokeStyle when resizing or using undo thus store that in db too
 * 
 * now everything set handle the sticky structuring and formatting we want that on click it creates a div by document.createElement('div')
 * modify it to get the complete sticky outline css it will take from the styles.css, appen it to the canvas as child
 *
 * can also add on click via setting inner html of a div add then to Dom instead of creating all as innerHtml puts given thing inside the <div></div>
 * 
 * 3.
 * 
 * on minimize toggle it thus hide the textbox by toggling its textbox then the stikcyheader will shrink its width 
 * thus give it height of sticky 100% so that it not shrinks
 * 
 * also when size of textarea changes we have to update height and width of the sticky
 * 
 * on close remove the dom via sticky.remove()
 * 
 * evetn.x and y gives wrt the total window but canvas takes coordinates with repect to itself
 * 
 * move sticky function - get the change in x and change in y then set the positions lef tright top to get to new position left = left + x
 * to show the path do like whenever mouse doen
 * 
 * upload picture add an input file type then set it on click it creates one more sticky with empty body then add image to it without being torn thus use object-fit:contain and width 100% of that of sticky 
 * 
 * now hide that input whenever clik on picture symbol we simulate an click to the input file options
 * 
 * modify the minimize for the picture
 * 
 * 4
 * 
 * request heavy via https but when continuous data flow a pipeline named as socket.io is used which is bidirectional flow and receives data when needed 
 * it has 2 functions emit to send data o n to consume it when deployed then if used from diff places then server will be the mediator which handles it connected via sockets to both sides whenever a emits it receives it process through server then to b
 * data processing via server not directly. thus change one do at all places which makes it RealTime.
 * Ex - whatsapp , zoom all uses socket concept
 * 
 * application distributed server deployed then connected to each other via socket.io
 * 
 * NODE JS IS VERY SMART IT HAS PROVIDED MODULES LIKE FS ETC. SIMILARLY EXPRESS-JS TO CREATE SERVER IN JUST 2 LINES
 * 
 * STEPS-
 * 
 * 1.CREATE SERVER FOLDER
 * CREATE APP.JS
 * NPM INIT -Y IN THE FOLDER
 * NPM INSTALL EXPRESS
 * 
 * //deployment
 * 
 * server to github
 * git init first commit
 * make a repo on cloud also
 * git add +++++++++++++++++++++ to connect local repo to cloud, then stage changes and push 
 * use .git-ignore to add limited files
 * 
 * on heroku connect via github
 * 
 * name app 
 * selected all default options
 * yes -> all
 * view
 * made some changes to app.js to get port from heroku.app also .json start then node app.js should run
 * socket in index.html now to the https://interactive-board.herokuapp.com/ site
 * 
 * packaging
 * 
 * https://www.christianengvall.se/electron-packager-tutorial/
 * 
 * update name , product name,scripts copy from shortcut for all kind of devices
 * install electron normally as npm install electron and ejs-electorn before packing (ejs needed in packaging process)
 * if electron as dev dependencies then it will installl again on packing by npm run packing-app
 * 
 * we deployed server on heroku app now ehereever changes from the packaged app it will use it to update all 
 * just server uploaded on heroku
 * 
 * */