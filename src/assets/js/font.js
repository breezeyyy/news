(function (doc, win) {
	const docEl = doc.documentElement;
	const reSizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
	const reCalc = function () {
		// const clientWidth = docEl.clientWidth >= 640 ? 640 : docEl.clientWidth;
		
		// 适配px2rem插件根fontSize值100情况下 /375
		docEl.clientWidth && (docEl.style.fontSize = `${100 * (docEl.clientWidth / 640)}px`);
		// console.log("fontSize", `${100 * (clientWidth / 640)}px`);
	};
	if (doc.addEventListener) {
		win.addEventListener(reSizeEvt, reCalc, false);
		doc.addEventListener("DOMContentLoaded", reCalc, false);
	}
})(document, window);