let showImages = {};

const { app } = require('electron').remote;
const path = require('path');

displayPath = path.join(app.getAppPath(), 'src', 'scripts', 'experimentDisplays');
let templates = require(displayPath).templates;
displays = {};
displays['1'] = templates.display1;
displays['2'] = templates.display2;
console.log(templates);
console.log(displays);

showImages.showMain = function(experiment) {

	displaySetting = experiment["displaySetting"];
	mainImage = experiment["mainImage"];
	images = experiment["images"];
	mainImagePosition = images.indexOf(mainImage);

	displays[displaySetting]();
	mainImageHTML = document.getElementById('mainImageTD');
	mainImageHTML.innerHTML = '\
		<a href="#" id="mainImageLink" data-correct="' + mainImagePosition + '">\
			<img class="experimentImage" src="' + mainImage + '" alt="">\
		</a>';

	currentImage = 0;
	for (const image of images) {
		currentImage++;
		expImageHTML = document.getElementById('expImageTD-' + currentImage);
		expImageHTML.style.visibility = 'hidden';
		expImageHTML.innerHTML = '\
			<a href="#" class="expImageLink">\
				<img class="experimentImage" src="' + image + '"  alt="">\
			</a>';
	}

	refreshStyling();

};

showImages.showChoices = function () {

	expImages = document.getElementsByClassName('expImageTD');
	for (const image of expImages) {
		image.style.visibility = 'visible';
	}

};


let setBackgroundColor = function () {
	backgroundColor = sessionStorage.getItem("backgroundColor");
	previewPane = document.getElementById('experimentPreviewList');
	if (previewPane !== null) {
		previewPane.style.backgroundColor = backgroundColor;
	}
}

let setFontColor = function () {
	fontColor = sessionStorage.getItem("fontColor");
	previewPane = document.getElementById('experimentContainer');
	if (previewPane !== null) {
		previewPane.style.color = fontColor;
	}
	anyOtherElements = document.getElementsByClassName('colorme');
	for (const elem of anyOtherElements) {
		elem.style.color = fontColor;
	}
}

let setSize = function () {
	size = sessionStorage.getItem("size");
	elems = document.getElementsByClassName('experimentImage');
	for (const elem of elems) {
		elem.style.width = size + 'px';
	}
}

let setSpacing = function () {
	spacing = sessionStorage.getItem("spacing");
	elems = document.getElementsByClassName('experimentImage');
	for (const elem of elems) {
		elem.style.marginRight = spacing + 'px';
		elem.style.marginBottom = spacing + 'px';
	}
}

showImages.refreshStyling = function () {
	setBackgroundColor();
	setFontColor();
	setSize();
	setSpacing();
}

showImages.setAppBackground = function () {
	backgroundColor = sessionStorage.getItem('backgroundColor');
	document.body.style.backgroundColor = backgroundColor;
}

exports.functions = showImages;
