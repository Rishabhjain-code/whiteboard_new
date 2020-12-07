//matched with what max done mine extra

socket.on("mouseDownReceived", function (eventObj) {
    // context.strokeStyle = eventObj.color;
    // context.lineWidth = eventObj.linewidth;

    let myStrokeStyle = eventObj.color;
    let mylineWidth = eventObj.linewidth;

    // NOTE METHOD 1
    let lineObj = [];
    lineObj.push(eventObj);
    linesDB.push(lineObj);

    // console.log(linesDB);
    //strokestyle and linewidth update handled in drawaevent
    drawAEvent(eventObj);

    context.strokeStyle = myStrokeStyle;
    context.lineWidth = mylineWidth;
})

/**problem is everytime it appends the point Coming to the lines considering everyLine as a single point as linesDb is 3d ideally pointComing is mouseMove then append to last else if mouseDown then new line mouseUp then also append last line m hi */

socket.on("mouseMoveReceived", function (eventObj) {
    let myStrokeStyle = eventObj.color;
    let mylineWidth = eventObj.linewidth;

    // NOTE METHOD 1
    linesDB[linesDB.length - 1].push(eventObj);


    // needed so that when on undo sender redraw all again we can also do the same work of drawing there points db is needed
    drawAEvent(eventObj);
    // console.log(linesDB);
    context.strokeStyle = myStrokeStyle;
    context.lineWidth = mylineWidth;
})

// cannot also sent the current data base after undo work so that wo bhi accordingly update krle as if pointsDb sirf agar ek m hi update hoga then ussi s undo redo work karega sirf for ex linesDB 1 n draw kiya then vo ussi ka updated hoga agr kisi aur n undo redo mara then uska linesDB/redoLines sabpe kaega jo ki incomplete hoga thus update at every moment M1 is right
// method 1 m sirf har bar linesDB ya redoLines update hote rahenge bcz linesDB hum kr hi rhe h and jb undo call hoga vo undowork call krega then apne local redoLines m daal lega usse baakio ko bhi undowork ki call lagane ko bolega vo apne m kar lenge

// method 2
// socket.on("undoDoneReceived", function (linesDB) {
//     drawAllLines(linesDB);
//     // undoWork();
// })

socket.on("undoDoneReceived", function () {
    undoWork(linesDB);
    //LOCAL SELF KA LINESDB IS USED EVERYWHERE
})

// cannot also sent the current redoLines base before redo work so that wo bhi accordingly update krle as if pointsDb sirf agar ek m hi update hoga then ussi s undo redo work karega sirf for ex linesDB 1 n draw kiya then vo ussi ka updated hoga agr kisi aur n undo redo mara then uska linesDB/redoLines sabpe kaega jo ki incomplete hoga thus update at every moment M1 is right
// method 1 m sirf har bar linesDB ya redoLines update hote rahenge bcz linesDB hum kr hi rhe h and jb undo call hoga vo undowork call krega then apne local redoLines m daal lega usse baakio ko bhi undowork ki call lagane ko bolega vo apne m kar lenge

// method 2
// socket.on("redoDoneReceived", function (redoLines) {
//     redoWork(redoLines);
// })

socket.on("redoDoneReceived", function () {
    redoWork(redoLines);
    //LOCAL SELF KA REDOLINES IS USED EVERYWHERE
})