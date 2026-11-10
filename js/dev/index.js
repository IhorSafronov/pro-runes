// \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
// src/js/common/functions.js
var bodyLockStatus = true;
var bodyLockToggle = (delay = 500) => {
	if (document.documentElement.hasAttribute("data-fls-scrolllock")) bodyUnlock(delay);
	else bodyLock(delay);
};
var bodyUnlock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
		setTimeout(() => {
			lockPaddingElements.forEach((lockPaddingElement) => {
				lockPaddingElement.style.paddingRight = "";
			});
			document.body.style.paddingRight = "";
			document.documentElement.removeAttribute("data-fls-scrolllock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function() {
			bodyLockStatus = true;
		}, delay);
	}
};
var bodyLock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
		const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
		lockPaddingElements.forEach((lockPaddingElement) => {
			lockPaddingElement.style.paddingRight = lockPaddingValue;
		});
		document.body.style.paddingRight = lockPaddingValue;
		document.documentElement.setAttribute("data-fls-scrolllock", "");
		bodyLockStatus = false;
		setTimeout(function() {
			bodyLockStatus = true;
		}, delay);
	}
};
// src/components/layout/menu/menu.js
function menuInit() {
	document.addEventListener("click", function(e) {
		if (bodyLockStatus && e.target.closest("[data-fls-menu]")) {
			bodyLockToggle();
			document.documentElement.toggleAttribute("data-fls-menu-open");
		}
	});
}
document.querySelector("[data-fls-menu]") && window.addEventListener("load", menuInit);
// src/components/pages/index/index.js
(function() {
	const canvas = document.getElementById("sky");
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
	let W, H, D, stars = [], meteor = null;
	function resize() {
		D = Math.min(window.devicePixelRatio || 1, 2);
		W = canvas.width = innerWidth * D;
		H = canvas.height = innerHeight * D;
		const count = Math.round(innerWidth * innerHeight / 5200);
		stars = Array.from({ length: count }, () => ({
			x: Math.random() * W,
			y: Math.random() * H,
			r: (Math.random() < .92 ? Math.random() * .9 + .3 : Math.random() * 1.4 + 1.1) * D,
			a: Math.random() * .55 + .2,
			s: Math.random() * .0025 + 6e-4,
			p: Math.random() * 6.3,
			v: (Math.random() * .06 + .015) * D,
			warm: Math.random() < .18
		}));
	}
	function frame(t) {
		ctx.clearRect(0, 0, W, H);
		for (const s of stars) {
			if (!still) {
				s.y -= s.v * .25;
				s.x += s.v * .1;
				if (s.y < 0) {
					s.y = H;
					s.x = Math.random() * W;
				}
				if (s.x > W) s.x = 0;
			}
			ctx.globalAlpha = still ? s.a : s.a * (.55 + .45 * Math.sin(t * s.s + s.p));
			ctx.fillStyle = s.warm ? "#f6c46b" : "#ffffff";
			ctx.beginPath();
			ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
			ctx.fill();
		}
		if (!still) {
			if (!meteor && Math.random() < .004) meteor = {
				x: Math.random() * W * .8 + W * .1,
				y: Math.random() * H * .4,
				life: 0,
				vx: -(3 + Math.random() * 2) * D,
				vy: (1.5 + Math.random() * 1) * D
			};
			if (meteor) {
				const tail = 18;
				const g = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail);
				g.addColorStop(0, "rgba(255,226,160,.9)");
				g.addColorStop(1, "rgba(255,226,160,0)");
				ctx.globalAlpha = 1;
				ctx.strokeStyle = g;
				ctx.lineWidth = 1.4 * D;
				ctx.beginPath();
				ctx.moveTo(meteor.x, meteor.y);
				ctx.lineTo(meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail);
				ctx.stroke();
				meteor.x += meteor.vx;
				meteor.y += meteor.vy;
				if (++meteor.life > 130) meteor = null;
			}
			requestAnimationFrame(frame);
		}
	}
	resize();
	addEventListener("resize", resize);
	requestAnimationFrame(frame);
})();
