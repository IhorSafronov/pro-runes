import "./main.min.js";
// src/components/pages/magichours/magichours.js
(function() {
	const form = document.getElementById("phForm");
	if (!form) return;
	const $ = (id) => document.getElementById(id);
	const cityInput = $("phCity");
	const dateInput = $("phDate");
	const btn = $("phBtn");
	const msg = $("phMessage");
	const result = $("phResult");
	const CHALDEAN = [
		"saturn",
		"jupiter",
		"mars",
		"sun",
		"venus",
		"mercury",
		"moon"
	];
	const PLANETS = {
		sun: {
			name: "Сонце",
			gen: "Сонця",
			sign: "☉"
		},
		moon: {
			name: "Місяць",
			gen: "Місяця",
			sign: "☽"
		},
		mars: {
			name: "Марс",
			gen: "Марса",
			sign: "♂"
		},
		mercury: {
			name: "Меркурій",
			gen: "Меркурія",
			sign: "☿"
		},
		jupiter: {
			name: "Юпітер",
			gen: "Юпітера",
			sign: "♃"
		},
		venus: {
			name: "Венера",
			gen: "Венери",
			sign: "♀"
		},
		saturn: {
			name: "Сатурн",
			gen: "Сатурна",
			sign: "♄"
		}
	};
	const DAY_RULER = [
		"sun",
		"moon",
		"mars",
		"mercury",
		"jupiter",
		"venus",
		"saturn"
	];
	const WEEKDAYS = [
		"неділя",
		"понеділок",
		"вівторок",
		"середа",
		"четвер",
		"п'ятниця",
		"субота"
	];
	dateInput.value = toISODate(/* @__PURE__ */ new Date());
	try {
		cityInput.value = localStorage.getItem("ph-city") || "";
	} catch (e) {}
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const city = cityInput.value.trim();
		const date = dateInput.value;
		if (!city || !date) return showMessage("Вкажіть місто та дату.");
		closeList();
		setLoading(true);
		try {
			const place = await geocode(city);
			if (!place) return showMessage("Місто не знайдено. Спробуйте українською, російською або англійською — наприклад «Дніпро», «Днепр» чи «Dnipro».");
			try {
				localStorage.setItem("ph-city", city);
			} catch (e) {}
			const next = toISODate(new Date(Date.parse(date + "T12:00:00Z") + 864e5));
			const [sun, sunNext] = await Promise.all([sunTimes(place.latitude, place.longitude, date), sunTimes(place.latitude, place.longitude, next)]);
			if (!sun || !sunNext) return showMessage("У цьому місці на обрану дату немає звичайного сходу чи заходу сонця (полярний день або ніч).");
			render(place, date, sun.sunrise, sun.sunset, sunNext.sunrise);
		} catch (err) {
			console.error(err);
			showMessage("Не вдалося отримати дані. Перевірте інтернет і спробуйте ще раз.");
		} finally {
			setLoading(false);
		}
	});
	const ALIASES = {
		"днепр": "Dnipro",
		"днепропетровск": "Dnipro",
		"дніпропетровськ": "Dnipro",
		"киев": "Kyiv",
		"kiev": "Kyiv",
		"харьков": "Kharkiv",
		"kharkov": "Kharkiv",
		"одесса": "Odesa",
		"odessa": "Odesa",
		"львов": "Lviv",
		"запорожье": "Zaporizhzhia",
		"николаев": "Mykolaiv",
		"кривой рог": "Kryvyi Rih",
		"кривий ріг": "Kryvyi Rih",
		"винница": "Vinnytsia",
		"полтава": "Poltava",
		"чернигов": "Chernihiv",
		"черкассы": "Cherkasy",
		"житомир": "Zhytomyr",
		"ровно": "Rivne",
		"луцк": "Lutsk",
		"тернополь": "Ternopil",
		"ивано-франковск": "Ivano-Frankivsk",
		"ужгород": "Uzhhorod",
		"херсон": "Kherson",
		"сумы": "Sumy",
		"хмельницкий": "Khmelnytskyi",
		"кропивницкий": "Kropyvnytskyi",
		"каменское": "Kamianske",
		"павлоград": "Pavlohrad",
		"никополь": "Nikopol"
	};
	function normalize(q) {
		return q.trim().replace(/\s+/g, " ").replace(/[’ʼ`´]/g, "'").replace(/ё/gi, "е");
	}
	const cache = /* @__PURE__ */ new Map();
	async function searchPlaces(raw) {
		const q = normalize(raw);
		if (q.length < 2) return [];
		const key = q.toLowerCase();
		if (cache.has(key)) return cache.get(key);
		const queries = [q];
		if (ALIASES[key]) queries.push(ALIASES[key]);
		let found = [];
		outer: for (const name of queries) for (const lang of [
			"uk",
			"ru",
			"en"
		]) {
			const url = `https://geocoding-api.open-meteo.com/v1/search?count=6&format=json&language=${lang}&name=` + encodeURIComponent(name);
			const data = await (await fetch(url)).json();
			if (data.results && data.results.length) {
				found = data.results;
				if (lang !== "uk") found = await toUkrainian(found);
				break outer;
			}
		}
		cache.set(key, found);
		return found;
	}
	async function toUkrainian(list) {
		try {
			return await Promise.all(list.map(async (p) => {
				const r = await fetch(`https://geocoding-api.open-meteo.com/v1/get?id=${p.id}&language=uk`);
				if (!r.ok) return p;
				const u = await r.json();
				return u && u.latitude ? u : p;
			}));
		} catch (e) {
			return list;
		}
	}
	const placeLabel = (p) => [
		p.name,
		p.admin1,
		p.country
	].filter(Boolean).join(", ");
	const list = $("phSuggest");
	let selected = null;
	let timer = null;
	let active = -1;
	let items = [];
	cityInput.addEventListener("input", () => {
		selected = null;
		clearTimeout(timer);
		const q = cityInput.value;
		if (normalize(q).length < 2) return closeList();
		timer = setTimeout(async () => {
			try {
				const res = await searchPlaces(q);
				if (cityInput.value !== q) return;
				openList(res);
			} catch (e) {
				closeList();
			}
		}, 300);
	});
	cityInput.addEventListener("keydown", (e) => {
		if (list.hidden || !items.length) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive(Math.min(active + 1, items.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive(Math.max(active - 1, 0));
		} else if (e.key === "Enter" && active >= 0) {
			e.preventDefault();
			choose(items[active]);
		} else if (e.key === "Escape") closeList();
	});
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".city")) closeList();
	});
	function openList(res) {
		items = res;
		active = -1;
		list.innerHTML = "";
		if (!res.length) list.innerHTML = "<li class=\"city__empty\">Нічого не знайдено</li>";
		else res.forEach((p, i) => {
			const li = document.createElement("li");
			li.className = "city__item";
			li.setAttribute("role", "option");
			li.innerHTML = `<span class="city__name">${p.name}</span><span class="city__meta">${[p.admin1, p.country].filter(Boolean).join(", ")}</span>`;
			li.addEventListener("mousedown", (e) => {
				e.preventDefault();
				choose(p);
			});
			li.addEventListener("mouseenter", () => setActive(i));
			list.appendChild(li);
		});
		list.hidden = false;
		cityInput.setAttribute("aria-expanded", "true");
	}
	function closeList() {
		list.hidden = true;
		cityInput.setAttribute("aria-expanded", "false");
		active = -1;
	}
	function setActive(i) {
		active = i;
		[...list.children].forEach((li, k) => li.classList.toggle("is-active", k === i));
	}
	function choose(p) {
		selected = p;
		cityInput.value = p.name;
		closeList();
	}
	async function geocode(name) {
		if (selected && selected.name === name) return selected;
		return (await searchPlaces(name))[0];
	}
	async function sunTimes(lat, lng, date) {
		const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`;
		const data = await (await fetch(url)).json();
		if (data.status !== "OK") return null;
		const sunrise = new Date(data.results.sunrise);
		const sunset = new Date(data.results.sunset);
		if (isNaN(sunrise) || isNaN(sunset) || sunset <= sunrise) return null;
		return {
			sunrise,
			sunset
		};
	}
	function render(place, date, sunrise, sunset, nextSunrise) {
		const tz = place.timezone || void 0;
		const fmt = (d) => d.toLocaleTimeString("uk-UA", {
			hour: "2-digit",
			minute: "2-digit",
			timeZone: tz
		});
		const dayLen = (sunset - sunrise) / 12;
		const nightLen = (nextSunrise - sunset) / 12;
		const weekday = (/* @__PURE__ */ new Date(date + "T12:00:00Z")).getUTCDay();
		const ruler = DAY_RULER[weekday];
		const start = CHALDEAN.indexOf(ruler);
		const label = placeLabel(place);
		const dateText = (/* @__PURE__ */ new Date(date + "T12:00:00Z")).toLocaleDateString("uk-UA", {
			day: "numeric",
			month: "long",
			year: "numeric",
			timeZone: "UTC"
		});
		$("phPlace").textContent = `${label} · ${dateText}, ${WEEKDAYS[weekday]}`;
		$("phSunrise").textContent = fmt(sunrise);
		$("phSunset").textContent = fmt(sunset);
		$("phDayLen").textContent = minutes(dayLen);
		$("phNightLen").textContent = minutes(nightLen);
		$("phRuler").innerHTML = `Володар дня — <b>${PLANETS[ruler].sign} ${PLANETS[ruler].name}</b>. Перша година після сходу сонця належить йому, далі планети йдуть у халдейському порядку.`;
		const now = Date.now();
		let current = null;
		const build = (list, from, len, offset, part) => {
			list.innerHTML = "";
			for (let i = 0; i < 12; i++) {
				const a = new Date(from.getTime() + len * i);
				const b = new Date(from.getTime() + len * (i + 1));
				const key = CHALDEAN[(start + offset + i) % 7];
				const p = PLANETS[key];
				const isNow = now >= a && now < b;
				const li = document.createElement("li");
				li.className = "ph-hour" + (isNow ? " ph-hour--now" : "");
				li.innerHTML = `
					<span class="ph-hour__num">${i + 1}</span>
					<span class="ph-hour__time">${fmt(a)} – ${fmt(b)}</span>
					<span class="ph-hour__planet"><span class="ph-hour__sign">${p.sign}</span>${p.name}</span>`;
				list.appendChild(li);
				if (isNow) {
					const nk = CHALDEAN[(start + offset + i + 1) % 7];
					current = {
						p,
						a,
						b,
						part,
						next: PLANETS[nk]
					};
				}
			}
		};
		build($("phDay"), sunrise, dayLen, 0, "day");
		build($("phNight"), sunset, nightLen, 12, "night");
		const nowBox = $("phNow");
		if (current) {
			nowBox.innerHTML = `
				<span class="ph-now__sign" aria-hidden="true">${current.p.sign}</span>
				<span class="ph-now__body">
					<span class="ph-now__label">Зараз триває</span>
					<span class="ph-now__title">Година ${current.p.gen}</span>
					<span class="ph-now__time">${fmt(current.a)} – ${fmt(current.b)} · далі ${current.next.sign} ${current.next.name} о ${fmt(current.b)}</span>
				</span>`;
			nowBox.hidden = false;
		} else nowBox.hidden = true;
		showTab(current ? current.part : "day");
		msg.hidden = true;
		result.hidden = false;
		result.classList.remove("is-visible");
		requestAnimationFrame(() => result.classList.add("is-visible"));
		result.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	const tabs = document.querySelectorAll(".ph-tabs__btn");
	tabs.forEach((btn) => btn.addEventListener("click", () => showTab(btn.dataset.tab)));
	function showTab(name) {
		tabs.forEach((b) => {
			const on = b.dataset.tab === name;
			b.classList.toggle("is-active", on);
			b.setAttribute("aria-selected", on);
		});
		document.querySelectorAll(".ph-table__list").forEach((l) => {
			l.hidden = l.dataset.panel !== name;
		});
	}
	function minutes(ms) {
		const m = Math.round(ms / 6e4);
		return m >= 60 ? `${Math.floor(m / 60)} год ${m % 60} хв` : `${m} хв`;
	}
	function toISODate(d) {
		return [
			d.getFullYear(),
			String(d.getMonth() + 1).padStart(2, "0"),
			String(d.getDate()).padStart(2, "0")
		].join("-");
	}
	function showMessage(text) {
		msg.textContent = text;
		msg.hidden = false;
		result.hidden = true;
	}
	function setLoading(on) {
		btn.disabled = on;
		btn.textContent = on ? "Рахую…" : "Розрахувати";
	}
})();
