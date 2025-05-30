// https://stackoverflow.com/questions/2481350/how-can-i-get-the-scrollbar-position-with-javascript
const documentElement = document.documentElement;
const button = document.getElementById("projects-move-to-top-button");
let buttonVisible = false;
let timeOut = false;
let zero;
let transitionTo = "visible"

function checkScrollPos() {
	if(timeOut) return;
	timeOut = true;
	setTimeout(() => {
		timeOut = false;
	}, 500);

	if(documentElement.scrollTop > window.innerHeight) {
		if(buttonVisible) return;
		buttonVisible = true;
	}
	else {
		if(!buttonVisible) return;
		buttonVisible = false;
	}
	showButton();
}

function showButton() {
	// console.log(`Showing button? ${buttonVisible}`)
	if(buttonVisible) {
		transitionTo = "visible"
		button.style.visibility = "visible"
		button.classList.toggle("popInAnimation")
	}
	else{
		transitionTo = "hidden"
		button.classList.toggle("popOutAnimation")
	}
}

document.addEventListener("scroll", checkScrollPos);
// https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event
button.addEventListener("animationend", () => {
	if(transitionTo === "visible") button.classList.remove("popInAnimation");
	else if(transitionTo === "hidden") {
		button.classList.remove("popOutAnimation");
		button.style.visibility = "hidden"
	}
})