import "./main.min.js";
// src/components/pages/runesday/runesday.js
(function() {
	const form = document.getElementById("rcForm");
	if (!form) return;
	const $ = (id) => document.getElementById(id);
	const RUNES = [
		["Феху", "ᚠ"],
		["Уруз", "ᚢ"],
		["Турісаз", "ᚦ"],
		["Ансуз", "ᚨ"],
		["Райдо", "ᚱ"],
		["Кеназ", "ᚲ"],
		["Гебо", "ᚷ"],
		["Вуньо", "ᚹ"],
		["Хагалаз", "ᚺ"],
		["Наутіз", "ᚾ"],
		["Іса", "ᛁ"],
		["Йера", "ᛃ"],
		["Ейваз", "ᛇ"],
		["Перт", "ᛈ"],
		["Альгіз", "ᛉ"],
		["Соулу", "ᛊ"],
		["Тейваз", "ᛏ"],
		["Беркана", "ᛒ"],
		["Еваз", "ᛖ"],
		["Манназ", "ᛗ"],
		["Лагуз", "ᛚ"],
		["Інгваз", "ᛜ"],
		["Дагаз", "ᛞ"],
		["Отал", "ᛟ"],
		["Вірд", ""]
	];
	const DAYS_PER_RUNE = 3;
	const CYCLE = RUNES.length * DAYS_PER_RUNE;
	const toDayNum = (iso) => {
		const [y, m, d] = iso.split("-").map(Number);
		return Math.floor(Date.UTC(y, m - 1, d) / 864e5);
	};
	const todayNum = () => {
		const t = /* @__PURE__ */ new Date();
		return Math.floor(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 864e5);
	};
	const fromDayNum = (n) => /* @__PURE__ */ new Date(n * 864e5);
	const toISO = (n) => fromDayNum(n).toISOString().slice(0, 10);
	const fmtLong = (n) => fromDayNum(n).toLocaleDateString("uk-UA", {
		day: "numeric",
		month: "long",
		timeZone: "UTC"
	});
	const fmtShort = (n) => fromDayNum(n).toLocaleDateString("uk-UA", {
		day: "2-digit",
		month: "2-digit",
		timeZone: "UTC"
	});
	const weekday = (n) => fromDayNum(n).toLocaleDateString("uk-UA", {
		weekday: "long",
		timeZone: "UTC"
	});
	function position(startNum, dayNum) {
		const diff = dayNum - startNum;
		if (diff < 0) return null;
		const inCycle = diff % CYCLE;
		const index = Math.floor(inCycle / DAYS_PER_RUNE);
		return {
			diff,
			index,
			rune: RUNES[index],
			dayInRune: diff % DAYS_PER_RUNE + 1,
			cycleDay: inCycle + 1,
			cycle: Math.floor(diff / CYCLE) + 1,
			cycleStart: dayNum - inCycle
		};
	}
	const glyphHTML = (rune) => rune[1] || "<span class=\"rc-blank\"></span>";
	const startInput = $("rcStart");
	const targetInput = $("rcTarget");
	let saved = null;
	try {
		saved = localStorage.getItem("rc-start");
	} catch (e) {}
	targetInput.value = toISO(todayNum() + 1);
	if (saved) {
		startInput.value = saved;
		render();
	}
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		render(true);
	});
	$("rcLookupForm").addEventListener("submit", (e) => {
		e.preventDefault();
		const out = $("rcLookupResult");
		if (!startInput.value || !targetInput.value) return;
		const p = position(toDayNum(startInput.value), toDayNum(targetInput.value));
		out.hidden = false;
		if (!p) {
			out.innerHTML = "Ця дата раніше за початок циклу.";
			return;
		}
		const n = toDayNum(targetInput.value);
		out.innerHTML = `
			<span class="rc__lookup-glyph" aria-hidden="true">${glyphHTML(p.rune)}</span>
			<span><b>${fmtLong(n)}</b>, ${weekday(n)} — руна <b>${p.rune[0]}</b>, день ${p.dayInRune} з ${DAYS_PER_RUNE}.
			<span class="rc__muted">Руна ${p.index + 1} з ${RUNES.length} · цикл ${p.cycle}</span></span>`;
	});
	function render(scroll) {
		const msg = $("rcMessage");
		const result = $("rcResult");
		if (!startInput.value) {
			msg.textContent = "Оберіть дату початку циклу.";
			msg.hidden = false;
			result.hidden = true;
			return;
		}
		try {
			localStorage.setItem("rc-start", startInput.value);
		} catch (e) {}
		const start = toDayNum(startInput.value);
		const today = todayNum();
		const p = position(start, today);
		if (!p) {
			msg.textContent = `Цикл ще не почався — він стартує ${fmtLong(start)}. Першою буде руна ${RUNES[0][0]}.`;
			msg.hidden = false;
			result.hidden = true;
			return;
		}
		msg.hidden = true;
		$("rcGlyph").innerHTML = glyphHTML(p.rune);
		$("rcTodayLabel").textContent = `Сьогодні · ${fmtLong(today)}, ${weekday(today)}`;
		$("rcName").textContent = p.rune[0];
		$("rcDays").innerHTML = Array.from({ length: DAYS_PER_RUNE }, (_, i) => `<span class="rc-today__dot${i + 1 < p.dayInRune ? " is-past" : ""}${i + 1 === p.dayInRune ? " is-now" : ""}"></span>`).join("") + `<span class="rc-today__day">День ${p.dayInRune} з ${DAYS_PER_RUNE}</span>`;
		$("rcNum").textContent = `${p.index + 1} з ${RUNES.length}`;
		$("rcCycleDay").textContent = `${p.cycleDay} з ${CYCLE}`;
		$("rcCycle").textContent = p.cycle;
		const nextStart = today + (DAYS_PER_RUNE - p.dayInRune) + 1;
		const nextRune = RUNES[(p.index + 1) % RUNES.length];
		$("rcNext").innerHTML = `Наступна руна — <b>${nextRune[0]}</b>, з ${fmtLong(nextStart)}.`;
		const grid = $("rcGrid");
		grid.innerHTML = "";
		RUNES.forEach((rune, i) => {
			const from = p.cycleStart + i * DAYS_PER_RUNE;
			const to = from + DAYS_PER_RUNE - 1;
			const state = i < p.index ? "is-past" : i === p.index ? "is-now" : "";
			const li = document.createElement("li");
			li.className = "rc-tile " + state;
			li.innerHTML = `
				<span class="rc-tile__num">${i + 1}</span>
				<span class="rc-tile__glyph" aria-hidden="true">${glyphHTML(rune)}</span>
				<span class="rc-tile__name">${rune[0]}</span>
				<span class="rc-tile__dates">${fmtShort(from)}–${fmtShort(to)}</span>`;
			grid.appendChild(li);
		});
		$("rcRange").textContent = `${fmtLong(p.cycleStart)} — ${fmtLong(p.cycleStart + CYCLE - 1)}`;
		result.hidden = false;
		result.classList.remove("is-visible");
		requestAnimationFrame(() => result.classList.add("is-visible"));
		if (scroll) result.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
})();
