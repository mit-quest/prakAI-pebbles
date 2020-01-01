console.log("begin config/post.js");

resetPreview();

backgroundColorPicker = document.getElementById('backgroundColorPicker');
backgroundColor = backgroundColorPicker.value;
sessionStorage.setItem("backgroundColor", backgroundColor);
refreshStyling();

backgroundColorPicker.onchange = function(ev) {
	sessionStorage.setItem("backgroundColor", ev.target.value);
	refreshStyling();
};

fontColorPicker = document.getElementById('fontColorPicker');
fontColor = fontColorPicker.value;
sessionStorage.setItem("fontColor", fontColor);
refreshStyling();

fontColorPicker.onchange = function(ev) {
	sessionStorage.setItem("fontColor", ev.target.value);
	refreshStyling();
};

sizePicker = document.getElementById('sizePicker');
size = sizePicker.value;
sessionStorage.setItem("size", size);
refreshStyling();

sizePicker.oninput = function(ev) {
	sessionStorage.setItem("size", ev.target.value);
	refreshStyling();
} 

spacingPicker = document.getElementById('spacingPicker');
spacing = spacingPicker.value;
sessionStorage.setItem("spacing", spacing);
refreshStyling();

spacingPicker.oninput = function(ev) {
  sessionStorage.setItem("spacing", ev.target.value);
  refreshStyling();
} 

displayCachedExperiment();









