export function decodeHtml(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export function htmlDecode(input) {
    console.log(`XXXCB htmlDecode input BEFORE: ${input}`);
    let elemHD = document.createElement("div");
    elemHD.innerHTML = decodeHtml(input);
    let images = elemHD.getElementsByTagName('img')
    let imageHD;
    let rawImgSrcIn = "";

    for (let i = 0; i < images.length; i++) {
        let image = images[i];
        rawImgSrcIn = image ? image.getAttribute("src") : "";
    }

    imageHD = `<img style="max-width:500px;" src="${rawImgSrcIn}" />`
    let rx = new RegExp("<img[\\d\\D]*?\>", "g");
    elemHD.innerHTML = elemHD.innerHTML.replaceAll(rx, imageHD);
    input = elemHD.innerHTML;
    return input;
}



// REFERENCE
// https://www.developerscloset.com/?p=548
//https://stackoverflow.com/questions/45241943/add-width-attribute-to-img-in-a-string
//https://stackoverflow.com/questions/3678378/is-there-a-way-to-specify-a-max-height-or-width-for-an-image
// https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_decodeuri
// https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it?lq=1

