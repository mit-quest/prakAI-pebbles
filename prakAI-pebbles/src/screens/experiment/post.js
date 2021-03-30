// output to terminal solely for debugging purposes
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

console.log("begin experiment/post.js");

setAppBackground();
refreshStyling();

// set positions of the divs
width = document.getElementById('experimentTable').clientWidth;
if (width % 2 == 1) {
	centerW = (width-1) / 2;
} else {
	centerW = (width) / 2;
}

height = document.getElementById('experimentTable').clientHeight;
if (height % 2 == 1) {
	centerH = (height-1) / 2;
} else {
	centerH = (height) / 2;
}

size = parseFloat(sessionStorage.getItem('size'));
if (size % 2 == 1) {
	size = size-1;
} else {
	size = size;
}

hSpacing = parseFloat(sessionStorage.getItem('hSpacing'));
vSpacing = parseFloat(sessionStorage.getItem('vSpacing'));
mainImageHeight = parseFloat(sessionStorage.getItem('mainImageHeight'));
imageGridHeight = parseFloat(sessionStorage.getItem('imageGridHeight'));

mainImageX = centerW - size/2;
mainImageY = centerH - Math.floor(mainImageHeight /2);

columnL = (mainImageX - hSpacing).toString() + 'px';
columnC = (mainImageX).toString() + 'px';
columnR = (mainImageX + hSpacing).toString() + 'px';

rowT = imageGridHeight.toString() + 'px';
rowB = (imageGridHeight + vSpacing).toString() + 'px';

// Set the coordinates for where the image should go
radius = 283; // eventually we should make this an input variable, currently set to 400sqrt(2)/2
length = 6;
// TODO: work on randomization feature, note: this will probably have to be done outside of post.js
let list = [...Array(length).keys()]
// let random_list = list.sort(() => Math.random() - 0.5)
let x_coords = Array.from(list, x => 
                          (Math.round(radius * Math.cos(x * 2 * Math.PI / length) + mainImageX)).toString() + 'px');
let y_coords = Array.from(list, y => 
                          (Math.round(radius * Math.sin(y * 2 * Math.PI / length) + mainImageY)).toString() + "px");
myConsole.log(x_coords);
myConsole.log(y_coords);

mainImageDIV = document.getElementById('mainImageDIV');
mainImageDIV.style.zIndex = '1';
mainImageDIV.style.position = 'absolute';
// Changed image to be displayed in center
mainImageDIV.style.top = mainImageY.toString() + 'px'; // mainImageHeight.toString() + 'px';
mainImageDIV.style.left = mainImageX.toString() + 'px'; // columnC;
mainImageDIV.style.width = size.toString() + 'px';

expImage1 = document.getElementById('expImageDIV-1');
expImage1.style.position = 'absolute';
expImage1.style.top = y_coords[0];
expImage1.style.left = x_coords[0];
expImage1.style.width = size.toString() + 'px';

expImage2 = document.getElementById('expImageDIV-2');
expImage2.style.position = 'absolute';
expImage2.style.top = y_coords[1]; //rowT;
expImage2.style.left = x_coords[1]; //columnC;
expImage2.style.width = size.toString() + 'px';

expImage3 = document.getElementById('expImageDIV-3');
expImage3.style.position = 'absolute';
expImage3.style.top = y_coords[2];
expImage3.style.left = x_coords[2];
expImage3.style.width = size.toString() + 'px';

expImage4 = document.getElementById('expImageDIV-4');
expImage4.style.position = 'absolute';
expImage4.style.top = y_coords[3];
expImage4.style.left = x_coords[3];
expImage4.style.width = size.toString() + 'px';

expImage5 = document.getElementById('expImageDIV-5');
expImage5.style.position = 'absolute';
expImage5.style.top = y_coords[4];
expImage5.style.left = x_coords[4];
expImage5.style.width = size.toString() + 'px';

expImage6 = document.getElementById('expImageDIV-6');
expImage6.style.position = 'absolute';
expImage6.style.top = y_coords[5];
expImage6.style.left = x_coords[5];
expImage6.style.width = size.toString() + 'px';

sounds = ['mainSound', 'choiceSound'];
sounds.forEach(sound => {
	var soundElem = document.getElementById(sound);
	soundElem.preload = "auto"; 
});

// start experiment
nextTrial();

