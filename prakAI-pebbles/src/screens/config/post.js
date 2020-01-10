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

vSpacingPicker = document.getElementById('vSpacingPicker');
vSpacingPicker.oninput = function(ev) {
  sessionStorage.setItem("vSpacing", ev.target.value);
  refreshStyling();
} 

hSpacingPicker = document.getElementById('hSpacingPicker');
hSpacingPicker.oninput = function(ev) {
  sessionStorage.setItem("hSpacing", ev.target.value);
  refreshStyling();
} 

heightPicker = document.getElementById('heightPicker');
heightPicker.oninput = function(ev) {
  sessionStorage.setItem("height", ev.target.value);
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

vSpacing = sessionStorage.getItem("vSpacing");

if (vSpacing == null) {
	vSpacing = vSpacingPicker.value;
	sessionStorage.setItem("vSpacing", vSpacing);
} else {
	vSpacingPicker.value = vSpacing;
}

hSpacing = sessionStorage.getItem("hSpacing");

if (hSpacing == null) {
	hSpacing = hSpacingPicker.value;
	sessionStorage.setItem("hSpacing", hSpacing);
} else {
	hSpacingPicker.value = hSpacing;
}

height = sessionStorage.getItem("height");

if (height == null) {
	height = heightPicker.value;
	sessionStorage.setItem("height", height);
} else {
	heightPicker.value = height;
}

displayCachedExperiment();









