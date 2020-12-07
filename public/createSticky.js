// matched

// create and appends everything and then returns content div to modify it later based on need
function createSticky() {

    let stickyDiv = document.createElement('div');
    stickyDiv.classList.add("sticky");
    stickyDiv.id = `S${stickyCount+1}`;

    let headerDiv = document.createElement('div');
    headerDiv.classList.add("sticky-headers");

    let initialX;
    let initialY;
    let isStickyHold = false;

    headerDiv.addEventListener("mousedown", function (event) {
        isStickyHold = true;
        initialX = event.clientX;
        initialY = event.clientY;
    })

    // to make move smooth
    canvas.addEventListener("mousemove", function (event) {
        if (isStickyHold) {
            let finalX = event.clientX;
            let finalY = event.clientY;
            let dx = finalX - initialX;
            let dy = finalY - initialY;

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

    // not on canvas as then can never click on canvas bcz cursor moves with sticky
    headerDiv.addEventListener("mouseup", function (event) {
        isStickyHold = false;
    })

    let minDiv = document.createElement('div');
    minDiv.classList.add("minimize");
    minDiv.innerHTML = "-";
    minDiv.setAttribute("id", `S${stickyCount+1}`);
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

    let contentDiv = document.createElement('div');
    contentDiv.classList.add("sticky-content");

    stickyDiv.appendChild(headerDiv);
    headerDiv.appendChild(minDiv);
    headerDiv.appendChild(closeDiv);
    stickyDiv.appendChild(contentDiv);
    // contentDiv.appendChild(textArea); //do it there
    stickyCount++;

    document.body.appendChild(stickyDiv); //appends at same position appended as appended early on the end of body as css set positions it will add all to 50%,25%

    return contentDiv;
}