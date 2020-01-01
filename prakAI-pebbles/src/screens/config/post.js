console.log("begin config/post.js");

resetPreview();

backgroundColorPicker = document.getElementById('backgroundColorPicker');
backgroundColorPicker.onchange = function(ev) {
	sessionStorage.setItem("backgroundColor", ev.target.value);
	refreshStyling();
};

fontColorPicker = document.getElementById('fontColorPicker');
fontColorPicker.onchange = function(ev) {
	sessionStorage.setItem("fontColor", ev.target.value);
	refreshStyling();
};

sizePicker = document.getElementById('sizePicker');
sizePicker.oninput = function(ev) {
	sessionStorage.setItem("size", ev.target.value);
	refreshStyling();
} 

spacingPicker = document.getElementById('spacingPicker');
spacingPicker.oninput = function(ev) {
  sessionStorage.setItem("spacing", ev.target.value);
  refreshStyling();
} 

backgroundColor = sessionStorage.getItem("backgroundColor");

if (backgroundColor == null) {
	backgroundColor = backgroundColorPicker.value;
	sessionStorage.setItem("backgroundColor", backgroundColor);
} else {
	backgroundColorPicker.value = backgroundColor;
}

fontColor = sessionStorage.getItem("fontColor");

if (fontColor == null) {
	fontColor = fontColorPicker.value;
	sessionStorage.setItem("fontColor", fontColor);
} else {
	fontColorPicker.value = fontColor;
}

size = sessionStorage.getItem("size");

if (size == null) {
	size = sizePicker.value;
	sessionStorage.setItem("size", size);
} else {
	sizePicker.value = size;
}

spacing = sessionStorage.getItem("spacing");

if (spacing == null) {
	spacing = spacingPicker.value;
	sessionStorage.setItem("spacing", spacing);
} else {
	spacingPicker.value = spacing;
}

displayCachedExperiment();









