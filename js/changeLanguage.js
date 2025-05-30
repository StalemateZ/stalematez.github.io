const languages = {
	Indonesian: "id",
	English: "en"
};

const languagesID = {
	id: "Indonesian",
	en: "English"
};

const languageSelector = document.getElementById("language-selector");
const docElement = document.documentElement;
const pages = document.getElementsByClassName("home-page-button");

const pageURLSplitted = window.location.href.split('/');

const params = new URLSearchParams(window.location.search);

// For default language selected in subdomains
if (languagesID.hasOwnProperty(pageURLSplitted[pageURLSplitted.length - 2])) {
	languageSelector.textContent = languagesID[pageURLSplitted[pageURLSplitted.length - 2]];
	changeLanguage(languagesID[pageURLSplitted[pageURLSplitted.length - 2]]);
}
// For setting language when user comes back from subdomain to index.html
else if (params.has("lang")) {
	languageSelector.textContent = params.get("lang");
	changeLanguage(params.get("lang"));
}
// For default language when accessing the index.html, using session storage (kinda unused)
else if (sessionStorage.getItem("langPref") && sessionStorage.getItem("langPref") !== "undefined") {
	languageSelector.textContent = sessionStorage.getItem("langPref");
	changeLanguage(sessionStorage.getItem("langPref"))
}
// Set language to default "English"
else {
	languageSelector.textContent = "English";
	sessionStorage.setItem("langPref", "English");
	changeLanguage("English")
}

function changeLanguage(selectedLanguage) {
	// alert(selectedLanguage + " " + languages[selectedLanguage]);
	if(languageSelector !== null) languageSelector.textContent = selectedLanguage;

	//https://stackoverflow.com/a/71127109
	if(docElement !== null) docElement.lang = languages[selectedLanguage];
	if(pages !== null) {
		pages[0].href += "?lang=" + selectedLanguage;
		//Skip the first one since the first one is the index.html
		for (let i = 1; i < pages.length; i++) {
			const splitted = pages[i].href.split('/');
			// console.log(splitted);
			splitted[splitted.length - 2] = languages[selectedLanguage];
			pages[i].href = splitted.join('/');
			// console.log(pages[i].href)
		}
	}

	// console.log(selectedLanguage);

	sessionStorage.setItem("langPref", selectedLanguage);
}

function changePage(selectedLanguage) {
	const splitted = document.location.href.split('/');
	// console.log(splitted);
	splitted[splitted.length - 2] = languages[selectedLanguage];
	document.location.href = splitted.join('/');
}