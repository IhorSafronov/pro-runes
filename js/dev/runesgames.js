import "./main.min.js";
// src/components/pages/runesgames/runesgames.js
(function() {
	const root = document.querySelector(".games");
	if (!root) return;
	const $ = (id) => document.getElementById(id);
	const RUNES = [
		[
			"ᚠ",
			"Феху",
			"F",
			"достаток · енергія · здобуток"
		],
		[
			"ᚢ",
			"Уруз",
			"U",
			"сила · витривалість · здоров’я"
		],
		[
			"ᚦ",
			"Турісаз",
			"Th",
			"захист · прорив · рішучість"
		],
		[
			"ᚨ",
			"Ансуз",
			"A",
			"слово · мудрість · знаки"
		],
		[
			"ᚱ",
			"Райдо",
			"R",
			"шлях · ритм · рух"
		],
		[
			"ᚲ",
			"Кеназ",
			"K",
			"вогонь · творчість · ясність"
		],
		[
			"ᚷ",
			"Гебо",
			"G",
			"дар · партнерство · обмін"
		],
		[
			"ᚹ",
			"Вуньо",
			"W",
			"радість · гармонія · спільнота"
		],
		[
			"ᚺ",
			"Хагалаз",
			"H",
			"зміни · стихія · очищення"
		],
		[
			"ᚾ",
			"Наутіз",
			"N",
			"необхідність · терпіння · загартування"
		],
		[
			"ᛁ",
			"Іса",
			"I",
			"зосередженість · стійкість · воля"
		],
		[
			"ᛃ",
			"Йера",
			"J",
			"врожай · цикли · терпіння"
		],
		[
			"ᛇ",
			"Ейваз",
			"Ei",
			"витримка · захист · зв’язок світів"
		],
		[
			"ᛈ",
			"Перт",
			"P",
			"таємниця · доля · інтуїція"
		],
		[
			"ᛉ",
			"Альгіз",
			"Z",
			"захист · опіка · зв’язок з вищим"
		],
		[
			"ᛊ",
			"Соулу",
			"S",
			"сонце · перемога · сила волі"
		],
		[
			"ᛏ",
			"Тейваз",
			"T",
			"справедливість · честь · мужність"
		],
		[
			"ᛒ",
			"Беркана",
			"B",
			"зростання · турбота · нове"
		],
		[
			"ᛖ",
			"Еваз",
			"E",
			"рух · довіра · партнерство"
		],
		[
			"ᛗ",
			"Манназ",
			"M",
			"людина · самопізнання · спільнота"
		],
		[
			"ᛚ",
			"Лагуз",
			"L",
			"потік · інтуїція · чуттєвість"
		],
		[
			"ᛜ",
			"Інгваз",
			"Ng",
			"завершення · потенціал · родючість"
		],
		[
			"ᛞ",
			"Дагаз",
			"D",
			"світанок · прорив · трансформація"
		],
		[
			"ᛟ",
			"Отал",
			"O",
			"рід · дім · спадок"
		]
	].map(([sign, name, sound, meaning], id) => ({
		id,
		sign,
		name,
		sound,
		meaning
	}));
	const shuffle = (arr) => {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	};
	const store = {
		get(key, def) {
			try {
				const v = localStorage.getItem("prorunes_" + key);
				return v === null ? def : JSON.parse(v);
			} catch (e) {
				return def;
			}
		},
		set(key, val) {
			try {
				localStorage.setItem("prorunes_" + key, JSON.stringify(val));
			} catch (e) {}
		}
	};
	let learned = new Set(store.get("learned", []));
	function updateProgress() {
		$("gmLearned").textContent = learned.size;
		$("gmBar").style.width = learned.size / RUNES.length * 100 + "%";
	}
	function markLearned(id) {
		learned.add(id);
		store.set("learned", [...learned]);
		updateProgress();
	}
	$("gmReset").addEventListener("click", () => {
		learned = /* @__PURE__ */ new Set();
		store.set("learned", []);
		updateProgress();
		cards.start();
	});
	const tabs = root.querySelectorAll(".games-tab");
	tabs.forEach((tab) => tab.addEventListener("click", () => {
		const name = tab.dataset.game;
		tabs.forEach((t) => {
			const on = t === tab;
			t.classList.toggle("is-active", on);
			t.setAttribute("aria-selected", on);
		});
		root.querySelectorAll(".games-panel").forEach((p) => {
			p.hidden = p.dataset.panel !== name;
		});
		if (name === "memory" && !memory.started) memory.start(6);
		if (name === "quiz" && !quiz.started) quiz.start();
	}));
	const cards = {
		queue: [],
		start() {
			const rest = RUNES.filter((r) => !learned.has(r.id));
			this.queue = shuffle(rest.length ? rest : RUNES);
			this.render();
		},
		render() {
			const box = $("gmCards");
			const r = this.queue[0];
			if (!r) {
				box.innerHTML = `
					<div class="games-done">
						<span class="games-done__sign" aria-hidden="true">ᛟ</span>
						<h3 class="games-done__title">Усі 24 руни вивчено!</h3>
						<p class="games-done__text">Перевірте себе у квізі або пройдіть картки ще раз.</p>
						<button class="btn btn--primary" type="button" data-act="again">Пройти ще раз</button>
					</div>`;
				return;
			}
			box.innerHTML = `
				<div class="games-flash">
					<p class="games-flash__left">У колоді: ${this.queue.length}</p>
					<button class="games-flash__card" type="button" aria-label="Перевернути картку">
						<span class="games-flash__inner">
							<span class="games-flash__face games-flash__face--front">
								<span class="games-flash__sign">${r.sign}</span>
								<span class="games-flash__hint">Натисніть, щоб перевернути</span>
							</span>
							<span class="games-flash__face games-flash__face--back">
								<span class="games-flash__small">${r.sign}</span>
								<span class="games-flash__name">${r.name}</span>
								<span class="games-flash__sound">Звук: ${r.sound}</span>
								<span class="games-flash__meaning">${r.meaning}</span>
							</span>
						</span>
					</button>
					<div class="games-flash__actions">
						<button class="btn btn--outline" type="button" data-act="repeat">Повторити</button>
						<button class="btn btn--primary" type="button" data-act="know">Знаю</button>
					</div>
				</div>`;
		},
		repeat() {
			const r = this.queue.shift();
			this.queue.splice(Math.min(3, this.queue.length), 0, r);
			this.render();
		},
		know() {
			markLearned(this.queue.shift().id);
			this.render();
		}
	};
	$("gmCards").addEventListener("click", (e) => {
		if (e.target.closest(".games-flash__card")) {
			e.target.closest(".games-flash__card").classList.toggle("is-flipped");
			return;
		}
		const act = e.target.closest("[data-act]")?.dataset.act;
		if (act === "repeat") cards.repeat();
		if (act === "know") cards.know();
		if (act === "again") {
			cards.queue = shuffle(RUNES);
			cards.render();
		}
	});
	const memory = {
		started: false,
		start(pairs) {
			this.started = true;
			this.pairs = pairs;
			this.moves = 0;
			this.found = 0;
			this.open = [];
			this.lock = false;
			this.time = 0;
			clearInterval(this.timer);
			this.timer = null;
			const picked = shuffle(RUNES).slice(0, pairs);
			this.deck = shuffle(picked.flatMap((r) => [{
				r,
				type: "sign"
			}, {
				r,
				type: "name"
			}]));
			this.render();
		},
		render() {
			const best = store.get("memoryBest" + this.pairs, null);
			$("gmMemory").innerHTML = `
				<div class="games-memory">
					<div class="games-bar">
						<div class="games-bar__stats">
							<span>Ходи: <b id="gmMoves">0</b></span>
							<span>Час: <b id="gmTime">0:00</b></span>
							${best ? `<span>Рекорд: <b>${best} ходів</b></span>` : ""}
						</div>
						<div class="games-bar__switch">
							<button class="games-chip${this.pairs === 6 ? " is-active" : ""}" type="button" data-pairs="6">6 пар</button>
							<button class="games-chip${this.pairs === 10 ? " is-active" : ""}" type="button" data-pairs="10">10 пар</button>
						</div>
					</div>
					<div class="games-memory__grid games-memory__grid--${this.pairs}">
						${this.deck.map((c, i) => `
							<button class="games-memory__card" type="button" data-i="${i}" aria-label="Закрита картка">
								<span class="games-memory__inner">
									<span class="games-memory__face games-memory__face--back" aria-hidden="true">ᛟ</span>
									<span class="games-memory__face games-memory__face--front">
										${c.type === "sign" ? `<span class="games-memory__sign">${c.r.sign}</span>` : `<span class="games-memory__name">${c.r.name}</span><span class="games-memory__meaning">${c.r.meaning}</span>`}
									</span>
								</span>
							</button>`).join("")}
					</div>
					<div class="games-memory__win" id="gmWin" hidden></div>
				</div>`;
		},
		tick() {
			this.time++;
			const m = Math.floor(this.time / 60);
			const s = String(this.time % 60).padStart(2, "0");
			$("gmTime").textContent = `${m}:${s}`;
		},
		flip(btn) {
			if (this.lock || btn.classList.contains("is-open")) return;
			if (!this.timer) this.timer = setInterval(() => this.tick(), 1e3);
			btn.classList.add("is-open");
			this.open.push(btn);
			if (this.open.length < 2) return;
			this.moves++;
			$("gmMoves").textContent = this.moves;
			const [a, b] = this.open;
			const ca = this.deck[a.dataset.i];
			const cb = this.deck[b.dataset.i];
			this.open = [];
			if (ca.r.id === cb.r.id && ca.type !== cb.type) {
				a.classList.add("is-match");
				b.classList.add("is-match");
				this.found++;
				if (this.found === this.pairs) this.win();
			} else {
				this.lock = true;
				a.classList.add("is-miss");
				b.classList.add("is-miss");
				setTimeout(() => {
					a.classList.remove("is-open", "is-miss");
					b.classList.remove("is-open", "is-miss");
					this.lock = false;
				}, 900);
			}
		},
		win() {
			clearInterval(this.timer);
			const key = "memoryBest" + this.pairs;
			const best = store.get(key, null);
			const record = !best || this.moves < best;
			if (record) store.set(key, this.moves);
			const win = $("gmWin");
			win.innerHTML = `
				<h3 class="games-done__title">${record ? "Новий рекорд!" : "Усі пари знайдено!"}</h3>
				<p class="games-done__text">${this.moves} ходів · ${$("gmTime").textContent}</p>
				<button class="btn btn--primary" type="button" data-pairs="${this.pairs}">Грати ще</button>`;
			win.hidden = false;
		}
	};
	$("gmMemory").addEventListener("click", (e) => {
		const card = e.target.closest(".games-memory__card");
		if (card) return memory.flip(card);
		const pairs = e.target.closest("[data-pairs]")?.dataset.pairs;
		if (pairs) memory.start(Number(pairs));
	});
	const QUIZ_LEN = 10;
	const quiz = {
		started: false,
		start() {
			this.started = true;
			this.list = shuffle(RUNES).slice(0, QUIZ_LEN);
			this.step = 0;
			this.score = 0;
			this.streak = 0;
			this.render();
		},
		render() {
			const r = this.list[this.step];
			const options = shuffle([r, ...shuffle(RUNES.filter((x) => x.id !== r.id)).slice(0, 3)]);
			$("gmQuiz").innerHTML = `
				<div class="games-quiz">
					<div class="games-bar">
						<div class="games-bar__stats">
							<span>Питання <b>${this.step + 1}</b> з ${QUIZ_LEN}</span>
							<span>Бали: <b>${this.score}</b></span>
							${this.streak >= 2 ? `<span class="games-bar__streak">Серія: ${this.streak} ᛊ</span>` : ""}
						</div>
					</div>
					<div class="games-quiz__line"><span style="width:${this.step / QUIZ_LEN * 100}%"></span></div>
					<p class="games-quiz__question">Яка це руна?</p>
					<div class="games-quiz__sign">${r.sign}</div>
					<div class="games-quiz__options">
						${options.map((o) => `
							<button class="games-quiz__option" type="button" data-id="${o.id}">
								<span class="games-quiz__name">${o.name}</span>
								<span class="games-quiz__meaning">${o.meaning}</span>
							</button>`).join("")}
					</div>
				</div>`;
			this.answer = r.id;
		},
		pick(btn) {
			const box = $("gmQuiz");
			if (box.querySelector(".is-right")) return;
			const ok = Number(btn.dataset.id) === this.answer;
			box.querySelectorAll(".games-quiz__option").forEach((b) => {
				b.disabled = true;
				if (Number(b.dataset.id) === this.answer) b.classList.add("is-right");
			});
			if (ok) {
				this.score++;
				this.streak++;
			} else {
				btn.classList.add("is-wrong");
				this.streak = 0;
			}
			setTimeout(() => {
				this.step++;
				this.step < QUIZ_LEN ? this.render() : this.finish();
			}, ok ? 900 : 1600);
		},
		finish() {
			const best = store.get("quizBest", 0);
			if (this.score > best) store.set("quizBest", this.score);
			const phrase = this.score === QUIZ_LEN ? "Бездоганно! Руни вас знають." : this.score >= 7 ? "Дуже добре — ще трохи практики, і буде ідеально." : this.score >= 4 ? "Непоганий старт. Повторіть картки й спробуйте ще." : "Почніть з карток — і результат прийде.";
			$("gmQuiz").innerHTML = `
				<div class="games-done">
					<span class="games-done__score">${this.score}<small>/${QUIZ_LEN}</small></span>
					<h3 class="games-done__title">${phrase}</h3>
					<p class="games-done__text">Ваш рекорд: ${Math.max(best, this.score)} з ${QUIZ_LEN}</p>
					<button class="btn btn--primary" type="button" data-act="restart">Пройти ще раз</button>
				</div>`;
		}
	};
	$("gmQuiz").addEventListener("click", (e) => {
		const opt = e.target.closest(".games-quiz__option");
		if (opt) return quiz.pick(opt);
		if (e.target.closest("[data-act=\"restart\"]")) quiz.start();
	});
	updateProgress();
	cards.start();
})();
