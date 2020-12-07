// matched

let stickyAdd = document.querySelector("#sticky-note");

// let minimize = document.getElementsByClassName(".minimize");
// adds to all with this class name at the present moment thus add this on creation time as done in Excel Clone on adding the new Sheet

let stickyCount = 0;

// button on toolbox

//using same id to do mapping of containers of a sticky without storing them explicitly

/** stickyAdd.addEventListener("click", function () {
    let stickyDiv = document.createElement('div');
    console.log(stickyDiv);
    stickyDiv.classList.add("sticky");
    stickyDiv.id = `S${stickyCount+1}`;
    // <div class="sticky"></div>

    let headerDiv = document.createElement('div');
    headerDiv.classList.add("sticky-headers");
    // <div class="sticky-headers"></div>

    // headerDiv addEventListener
    let initialX;
    let initialY;
    let isStickyHold = false;
    // only on single mousedown on it start moving it

    headerDiv.addEventListener("mousedown", function (event) {
        isStickyHold = true;
        initialX = event.clientX;
        initialY = event.clientY;
    })

    headerDiv.addEventListener("mousemove", function (event) {
        if (isStickyHold) {
            let finalX = event.clientX;
            let finalY = event.clientY;
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            // console.log(dx, dy);

            let {
                top,
                left
            } = stickyDiv.getBoundingClientRect();
            stickyDiv.style.left = left + dx + "px";
            stickyDiv.style.top = top + dy + "px";

            initialX = finalX;
            initialY = finalY;
        }
    })

    headerDiv.addEventListener("mouseup", function (event) {
        isStickyHold = false;
    })

    let minDiv = document.createElement('div');
    minDiv.classList.add("minimize");
    minDiv.innerHTML = "-";
    // NO NEED OF THIS COUNT AND ID SETTING BECAUSE AS IN SAME FUNCTION THUS THIS STICKY IS AVAILABLE NORMALLY AS WELL
    minDiv.setAttribute("id", `S${stickyCount+1}`);
    // <div class="minimize">-</div>
    minDiv.addEventListener("click", function () {
        let thisId = minDiv.id;
        console.log(thisId);
        let thatTextArea = document.querySelector(`#${thisId} textarea`);

        if (thatTextArea.style.display == "none") {
            thatTextArea.style.display = "flex";
        } else {
            thatTextArea.style.display = "none";
        }
    })

    let closeDiv = document.createElement('div');
    closeDiv.classList.add("close");
    closeDiv.setAttribute("id", `S${stickyCount+1}`);
    closeDiv.innerHTML = "X";
    closeDiv.addEventListener("click", function () {
        let thisId = closeDiv.id;
        let thatSticky = document.querySelector(`.sticky#${thisId}`);
        thatSticky.remove();
    })
    // <div class="close">X</div>

    let contentDiv = document.createElement('div');
    contentDiv.classList.add("sticky-content");
    // <div class="sticky-content"></div>

    let textArea = document.createElement("textarea");
    textArea.id = "stickybox";
    textArea.cols = "30"
    textArea.rows = "10";

    // jQuery -> it stops the sticky click button
    // $("textarea").resizable({
    //     resize: function () {
    //         console.log(textArea.getBoundingClientRect());
    //         console.log("Hello");
    //     }
    // });


    // detects the text typing
    // textArea.addEventListener("change", function () {
    //     // console.log(textArea.style.height + " " + textArea.style.width);
    //     console.log("Changed")
    // })

    // <textarea id="stickybox" cols="30" rows="10"></textarea>

    // The appendChild() method appends a node as the last child of a node.

    stickyDiv.appendChild(headerDiv);
    headerDiv.appendChild(minDiv);
    headerDiv.appendChild(closeDiv);
    stickyDiv.appendChild(contentDiv);
    contentDiv.appendChild(textArea);
    stickyCount++;

    console.log(stickyDiv);
    document.body.appendChild(stickyDiv); //appends at same position appended as appended early on the end of body as css set positions it will add all to 50%,25%

})
 */

stickyAdd.addEventListener("click", function () {
    let contentDiv = createSticky();
    let textArea = document.createElement("textarea");
    textArea.id = "stickybox";
    textArea.cols = "30"
    textArea.rows = "10";
    contentDiv.appendChild(textArea);
    
})

// tag.style.backgroundColor only set no get thus get via getBoundingCLientRect() it has curr position 
// textArea.width fot get or by .getAttribute();