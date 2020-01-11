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

mainImageHeightPicker = document.getElementById('mainImageHeightPicker');
mainImageHeightPicker.oninput = function(ev) {
  sessionStorage.setItem("mainImageHeight", ev.target.value);
  refreshStyling();
} 

imageGridHeightPicker = document.getElementById('imageGridHeightPicker');
imageGridHeightPicker.oninput = function(ev) {
  sessionStorage.setItem("imageGridHeight", ev.target.value);
  refreshStyling();
} 

noiseDurationPicker = document.getElementById('noiseDurationPicker');
noiseDurationPicker.oninput = function(ev) {
  sessionStorage.setItem("noiseDuration", ev.target.value);
  refreshStyling();
} 

blankDurationPicker = document.getElementById('blankDurationPicker');
blankDurationPicker.oninput = function(ev) {
  sessionStorage.setItem("blankDuration", ev.target.value);
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

mainImageHeight = sessionStorage.getItem("mainImageHeight");
if (mainImageHeight == null) {
	mainImageHeight = mainImageHeightPicker.value;
	sessionStorage.setItem("mainImageHeight", mainImageHeight);
} else {
	mainImageHeightPicker.value = mainImageHeight;
}

imageGridHeight = sessionStorage.getItem("imageGridHeight");
if (imageGridHeight == null) {
	imageGridHeight = imageGridHeightPicker.value;
	sessionStorage.setItem("imageGridHeight", imageGridHeight);
} else {
	imageGridHeightPicker.value = imageGridHeight;
}

noiseDuration = sessionStorage.getItem("noiseDuration");
if (noiseDuration == null) {
	noiseDuration = noiseDurationPicker.value;
	sessionStorage.setItem("noiseDuration", noiseDuration);
} else {
	noiseDurationPicker.value = noiseDuration;
}

blankDuration = sessionStorage.getItem("blankDuration");
if (blankDuration == null) {
	blankDuration = blankDurationPicker.value;
	sessionStorage.setItem("blankDuration", blankDuration);
} else {
	blankDurationPicker.value = blankDuration;
}

displayCachedExperiment();









