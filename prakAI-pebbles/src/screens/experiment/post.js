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

columnL = (mainImageX - hSpacing).toString() + 'px';
columnC = (mainImageX).toString() + 'px';
columnR = (mainImageX + hSpacing).toString() + 'px';

rowT = imageGridHeight.toString() + 'px';
rowB = (imageGridHeight + vSpacing).toString() + 'px';

mainImageDIV = document.getElementById('mainImageDIV');
mainImageDIV.style.zIndex = '1';
mainImageDIV.style.position = 'absolute';
mainImageDIV.style.top = mainImageHeight.toString() + 'px';
mainImageDIV.style.left = columnC;
mainImageDIV.style.width = size.toString() + 'px';

expImage1 = document.getElementById('expImageDIV-1');
expImage1.style.position = 'absolute';
expImage1.style.top = rowT;
expImage1.style.left = columnL;
expImage1.style.width = size.toString() + 'px';

expImage2 = document.getElementById('expImageDIV-2');
expImage2.style.position = 'absolute';
expImage2.style.top = rowT;
expImage2.style.left = columnC;
expImage2.style.width = size.toString() + 'px';

expImage3 = document.getElementById('expImageDIV-3');
expImage3.style.position = 'absolute';
expImage3.style.top = rowT;
expImage3.style.left = columnR;
expImage3.style.width = size.toString() + 'px';

expImage4 = document.getElementById('expImageDIV-4');
expImage4.style.position = 'absolute';
expImage4.style.top = rowB;
expImage4.style.left = columnL;
expImage4.style.width = size.toString() + 'px';

expImage5 = document.getElementById('expImageDIV-5');
expImage5.style.position = 'absolute';
expImage5.style.top = rowB;
expImage5.style.left = columnC;
expImage5.style.width = size.toString() + 'px';

expImage6 = document.getElementById('expImageDIV-6');
expImage6.style.position = 'absolute';
expImage6.style.top = rowB;
expImage6.style.left = columnR;
expImage6.style.width = size.toString() + 'px';

// display images or send to results screen
displayNext();

sounds = ['mainSound', 'choiceSound'];
sounds.forEach(sound => {
	var soundElem = document.getElementById(sound);
	soundElem.preload = "auto"; 
});

