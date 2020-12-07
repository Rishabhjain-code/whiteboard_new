// matched

let imageInput = document.querySelector("#photo-upload");

imageInput.addEventListener("change", function () {
    // console.log(imageInput.files[0]);
    let fileObj = imageInput.files[0];
    // display selected file but has no path thus either by electron dialog as in excel there we get the path of img aswell which can then be displayed on the canvas
    // or search how to display selected file via input file tag

    if (fileObj) { // gives you image url
        let filePath = URL.createObjectURL(fileObj);

        // img element create
        // below code works in the 
        let imgTag = document.createElement('img');;
        imgTag.setAttribute("src", filePath);
        imgTag.classList.add("sticky-image");

        // console.log(imgTag);

        // document.body.appendChild(imgTag);
        // make an sticky now put in the content appendChild takki text area k baad

        let contentDiv = createSticky();
        contentDiv.appendChild(imgTag);
    }
})

pictureClick.addEventListener("click", function () {
    let inputClick = document.querySelector("#photo-upload");
    inputClick.click();
})

download.addEventListener("click", function () {
    let file = canvas.toDataURL("imgae/png");
    // mimeType thing to specify the file saving format there

    // making the file with data in the given format to the bracket
    let aTag = document.createElement('a');

    // download attribute to set the name of file to be
    aTag.download = "canvas.png";
    aTag.href = file;
    aTag.click(); //simulate click
    aTag.remove(); //delete anchor tag
})