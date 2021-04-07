// output to terminal solely for debugging purposes
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

console.log("begin experiment/post.js");

setAppBackground();
refreshStyling();

currentTrial = 1;
document.getElementById('currentTrial').innerHTML = '1';

totalTrials = parseFloat(sessionStorage.getItem('totalTrials'));
document.getElementById('mainImageDIV').innerHTML = totalTrials;

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

imageSize = parseFloat(sessionStorage.getItem('imageSize'));
if (imageSize % 2 == 1) {
	imageSize = imageSize-1;
} else {
	imageSize = imageSize;
}

// hSpacing = parseFloat(sessionStorage.getItem('hSpacing'));
// vSpacing = parseFloat(sessionStorage.getItem('vSpacing'));
// mainImageHeight = parseFloat(sessionStorage.getItem('mainImageHeight'));
// imageGridHeight = parseFloat(sessionStorage.getItem('imageGridHeight'));

mainImageX = centerW - imageSize/2;
mainImageY = centerH - imageSize/2;

// columnL = (mainImageX - hSpacing).toString() + 'px';
// columnC = (mainImageX).toString() + 'px';
// columnR = (mainImageX + hSpacing).toString() + 'px';

// rowT = imageGridHeight.toString() + 'px';
// rowB = (imageGridHeight + vSpacing).toString() + 'px';

// Set the coordinates for where the image should go
layoutRadius = parseFloat(sessionStorage.getItem('layoutRadius'));
length = 8;
let list = [...Array(length).keys()]
let x_coords = Array.from(list, x => 
                          (Math.round(layoutRadius * Math.cos(x * 2 * Math.PI / length) + mainImageX)).toString() + 'px');
let y_coords = Array.from(list, y => 
                          (Math.round(layoutRadius * Math.sin(y * 2 * Math.PI / length) + mainImageY)).toString() + "px");
myConsole.log(x_coords);
myConsole.log(y_coords);

mainImageDIV = document.getElementById('mainImageDIV');
mainImageDIV.style.zIndex = '1';
mainImageDIV.style.position = 'absolute';
// Changed image to be displayed in center
mainImageDIV.style.top = mainImageY.toString() + 'px'; // mainImageHeight.toString() + 'px';
mainImageDIV.style.left = mainImageX.toString() + 'px'; // columnC;
mainImageDIV.style.width = imageSize.toString() + 'px';

expImage1 = document.getElementById('expImageDIV-1');
expImage1.style.position = 'absolute';
expImage1.style.top = y_coords[0];
expImage1.style.left = x_coords[0];
expImage1.style.width = imageSize.toString() + 'px';

expImage2 = document.getElementById('expImageDIV-2');
expImage2.style.position = 'absolute';
expImage2.style.top = y_coords[1]; //rowT;
expImage2.style.left = x_coords[1]; //columnC;
expImage2.style.width = imageSize.toString() + 'px';

expImage3 = document.getElementById('expImageDIV-3');
expImage3.style.position = 'absolute';
expImage3.style.top = y_coords[2];
expImage3.style.left = x_coords[2];
expImage3.style.width = imageSize.toString() + 'px';

expImage4 = document.getElementById('expImageDIV-4');
expImage4.style.position = 'absolute';
expImage4.style.top = y_coords[3];
expImage4.style.left = x_coords[3];
expImage4.style.width = imageSize.toString() + 'px';

expImage5 = document.getElementById('expImageDIV-5');
expImage5.style.position = 'absolute';
expImage5.style.top = y_coords[4];
expImage5.style.left = x_coords[4];
expImage5.style.width = imageSize.toString() + 'px';

expImage6 = document.getElementById('expImageDIV-6');
expImage6.style.position = 'absolute';
expImage6.style.top = y_coords[5];
expImage6.style.left = x_coords[5];
expImage6.style.width = imageSize.toString() + 'px';

expImage7 = document.getElementById('expImageDIV-7');
expImage7.style.position = 'absolute';
expImage7.style.top = y_coords[6];
expImage7.style.left = x_coords[6];
expImage7.style.width = imageSize.toString() + 'px';

expImage8 = document.getElementById('expImageDIV-8');
expImage8.style.position = 'absolute';
expImage8.style.top = y_coords[7];
expImage8.style.left = x_coords[7];
expImage8.style.width = imageSize.toString() + 'px';

sounds = ['mainSound', 'choiceSound', 'startSound'];
sounds.forEach(sound => {
	var soundElem = document.getElementById(sound);
	soundElem.preload = "auto"; 
});

// start experiment
nextTrial();

