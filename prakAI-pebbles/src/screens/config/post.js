console.log("begin config/post.js");

resetPreview();

document.getElementById('password-button').onclick = function(ev) {
	submitPassword(ev);
};

// Timing Parameters
if (true) {

	// cross duration
	crossDurationPicker = document.getElementById('cross-duration-picker');
	crossDurationPicker.oninput = function(ev) {
		sessionStorage.setItem("crossDuration", ev.target.value);
		refreshStyling();
	} 
	crossDuration = sessionStorage.getItem("crossDuration");
	if (crossDuration == null) {
		crossDuration = crossDurationPicker.value;
		sessionStorage.setItem("crossDuration", crossDuration);
	} else {
		crossDurationPicker.value = crossDuration;
	}

	// main image duration
	mainImageDurationPicker = document.getElementById('main-image-duration-picker');
	mainImageDurationPicker.oninput = function(ev) {
		sessionStorage.setItem("mainImageDuration", ev.target.value);
		refreshStyling();
	} 
	mainImageDuration = sessionStorage.getItem("mainImageDuration");
	if (mainImageDuration == null) {
		mainImageDuration = mainImageDurationPicker.value;
		sessionStorage.setItem("mainImageDuration", mainImageDuration);
	} else {
		mainImageDurationPicker.value = mainImageDuration;
	}

	// noise duration
	noiseDurationPicker = document.getElementById('noise-duration-picker');
	noiseDurationPicker.oninput = function(ev) {
		sessionStorage.setItem("noiseDuration", ev.target.value);
		refreshStyling();
	} 
	noiseDuration = sessionStorage.getItem("noiseDuration");
	if (noiseDuration == null) {
		noiseDuration = noiseDurationPicker.value;
		sessionStorage.setItem("noiseDuration", noiseDuration);
	} else {
		noiseDurationPicker.value = noiseDuration;
	}

	// noise-2-duration
	/*noise2DurationPicker = document.getElementById('noise-2-duration-picker');
	noise2DurationPicker.oninput = function(ev) {
		sessionStorage.setItem("noise2Duration", ev.target.value);
		refreshStyling();
	} 
	noise2Duration = sessionStorage.getItem("noise2Duration");
	if (noise2Duration == null) {
		noise2Duration = noise2DurationPicker.value;
		sessionStorage.setItem("noise2Duration", noise2Duration);
	} else {
		noise2DurationPicker.value = noise2Duration;
	}*/
}

// Appearance Parameters
if (true) {

	// background color 
	backgroundColorPicker = document.getElementById('background-color-picker');
	backgroundColorPicker.onchange = function(ev) {
		sessionStorage.setItem("backgroundColor", ev.target.value);
		refreshStyling();
	};
	backgroundColor = sessionStorage.getItem("backgroundColor");
	if (backgroundColor == null) {
		backgroundColor = backgroundColorPicker.value;
		sessionStorage.setItem("backgroundColor", backgroundColor);
	} else {
		backgroundColorPicker.value = backgroundColor;
	}

	// font color
	fontColorPicker = document.getElementById('font-color-picker');
	fontColorPicker.onchange = function(ev) {
		sessionStorage.setItem("fontColor", ev.target.value);
		refreshStyling();
	};
	fontColor = sessionStorage.getItem("fontColor");
	if (fontColor == null) {
		fontColor = fontColorPicker.value;
		sessionStorage.setItem("fontColor", fontColor);
	} else {
		fontColorPicker.value = fontColor;
	}
}

// Layout Parameters Parameters
if (true) {

	// image-size
	imageSizePicker = document.getElementById('image-size-picker');
	imageSizePicker.oninput = function(ev) {
		sessionStorage.setItem("imageSize", ev.target.value);
		refreshStyling();
	} 
	imageSize = sessionStorage.getItem("imageSize");
	if (imageSize == null) {
		imageSize = imageSizePicker.value;
		sessionStorage.setItem("imageSize", imageSize);
	} else {
		imageSizePicker.value = imageSize;
	}

	layoutRadiusPicker = document.getElementById('layout-radius-picker');
	layoutRadiusPicker.oninput = function(ev) {
		sessionStorage.setItem("layoutRadius", ev.target.value);
		refreshStyling();
	} 
	layoutRadius = sessionStorage.getItem("layoutRadius");
	if (layoutRadius == null) {
		layoutRadius = layoutRadiusPicker.value;
		sessionStorage.setItem("layoutRadius", layoutRadius);
	} else {
		layoutRadiusPicker.value = layoutRadius;
	}
}

displayCachedExperiment();









