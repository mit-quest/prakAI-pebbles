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

	mainImage = experiment["mainImage"];
	images = experiment["images"];
	mainImagePosition = images.indexOf(mainImage);

	mainImageHTML = document.getElementById('mainImageDIV');
	mainImageHTML.style.visibility = 'visible';
	mainImageHTML.innerHTML = '\
		<a href="#" id="mainImageLink" style="z-index: 2;" data-correct="' + mainImagePosition + '">\
			<img class="experimentImage" style="z-index: 1; width: 100%;" src="' + mainImage + '" alt="">\
		</a>';

	currentImage = 0;
	for (const image of images) {
		currentImage++;
		expImageHTML = document.getElementById('expImageDIV-' + currentImage);
		expImageHTML.style.visibility = 'hidden';
		expImageHTML.innerHTML = '\
			<a href="#" style="z-index: 2;" class="expImageLink">\
				<img class="experimentImage" style="z-index: 1; width: 100%;"  src="' + image + '"  alt="">\
			</a>';
	}

	refreshStyling();

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
	previewPane = document.getElementById('experimentPreviewList');
	if (previewPane !== null) {
		previewPane.style.color = fontColor;
	}
}

let setSize = function () {
	// size = sessionStorage.getItem("size");
	// elems = document.getElementsByClassName('experimentImage');
	// for (const elem of elems) {
	// 	elem.style.width = size + 'px';
	// }
}

let setSpacing = function () {
	// spacing = sessionStorage.getItem("spacing");
	// elems = document.getElementsByClassName('experimentImage');
	// for (const elem of elems) {
	// 	elem.style.marginRight = spacing + 'px';
	// 	elem.style.marginBottom = spacing + 'px';
	// }
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
