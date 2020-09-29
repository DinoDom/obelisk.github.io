const supportedLanguages = ['zh_cn', 'en'];

function loadLanguage(language) {
	let newLanguage = '';
	if (language) {
		setCookie('language', language);
	} else {
		let cookie = getCookie('language');
		if (cookie)
			language = cookie;
		else {
			language = navigator.language;
			if (!language || supportedLanguages.indexOf(language.toLowerCase()) < 0)
				language = supportedLanguages[1];
			setCookie('language', language);
		}
	}
	newLanguage = $.i18n.normaliseLanguageCode(language);

	$('.nav-link[id=' + language.toLowerCase() + ']').addClass('active').siblings().removeClass('active');
	$.i18n.properties({
		name: 'Messages',
		path: './assets/i18n/',
		mode: 'both',
		language: newLanguage,
		cache: false,
		encoding: 'UTF-8',
		callback: function () {
			$('.i18n').each(function (i) {
				$(this).html($.i18n.prop($(this).attr('name')));
			});
		}
	});
}

function changeLanguage(language) {
	// let language = $(obj).attr('id');
	if ($('.nav-link[id=' + language.toLowerCase() + ']')[0].className.indexOf('active') >= 0) return;
	if (supportedLanguages.indexOf(language.toLowerCase()) >= 0)
		loadLanguage(language);
	else
		console.log('cannot find language ' + language);
}

function setCookie(cname, cvalue, exdays = 30) {
	let d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim();
		if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
	}
	return "";
}