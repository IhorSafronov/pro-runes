import "./main.min.js";
// src/components/pages/irk/irk.js
window.IRK_POSITIONS = {
	essence: "Руна Сутності — ваша вроджена основа: з чим ви прийшли в цей світ і на що спираєтесь глибоко всередині.",
	personality: "Руна Особистості — те, як ви проявляєтесь у світі: характер, манера діяти і те, якими вас бачать інші.",
	golden: "Золота руна поєднує Сутність і Особистість. Це ваш головний ресурс і ключ до сили — те, що варто розвивати свідомо."
};
window.IRK_TEXTS = {
	fehu: {
		keys: "достаток · енергія · здобуток",
		essence: "Ви народжені з енергією творення і примноження. Ресурси до вас приходять, коли ви вкладаєте сили у справу, а не чекаєте.",
		personality: "Ви практичні й ініціативні, вмієте перетворювати ідеї на результат. Люди бачать у вас того, хто «вміє заробити» і рухає справи.",
		golden: "Ваш ключ — рух ресурсів. Сила зростає, коли ви не накопичуєте заради страху, а пускаєте енергію й гроші в дію."
	},
	uruz: {
		keys: "сила · витривалість · здоров’я",
		essence: "У вашій основі — первісна сила і запас витривалості. Ви здатні відновлюватися там, де інші ламаються.",
		personality: "Ви прямі, наполегливі й не боїтесь труднощів. Поруч із вами відчувається опора і впевненість.",
		golden: "Ваш ключ — тіло і воля. Коли ви бережете фізичну силу й ставите сміливі цілі, перед вами відкривається найбільше."
	},
	thurisaz: {
		keys: "захист · прорив · рішучість",
		essence: "Ви прийшли з силою, що руйнує перешкоди. Усередині вас є захисник, який вмикається, коли треба відстояти своє.",
		personality: "Ви рішучі й умієте сказати «ні». Інколи здаєтесь гострими, але саме ви проходите крізь те, що зупиняє інших.",
		golden: "Ваш ключ — спрямувати силу. Коли напір має чітку мету, він стає щитом і тараном, а не руйнує вас самих."
	},
	ansuz: {
		keys: "слово · мудрість · знаки",
		essence: "Ваша основа — зв’язок зі знанням і словом. Ви чуєте підказки та інтуїтивно відчуваєте суть речей.",
		personality: "Ви вмієте говорити, пояснювати й надихати. До вас приходять за порадою, і ваші слова мають вагу.",
		golden: "Ваш ключ — слово і навчання. Сила зростає, коли ви ділитеся знанням і довіряєте внутрішньому голосу."
	},
	raido: {
		keys: "шлях · ритм · рух",
		essence: "Ви народжені для руху і власного шляху. Застій для вас важчий за будь-яку дорогу.",
		personality: "Ви організовані, тримаєте ритм і вмієте планувати. Люди довіряють вам маршрут — і в справах, і в житті.",
		golden: "Ваш ключ — правильний напрямок. Коли ви йдете своєю дорогою у своєму темпі, все складається в потрібну мить."
	},
	kenaz: {
		keys: "вогонь · творчість · ясність",
		essence: "Усередині вас горить творчий вогонь. Ви відчуваєте потребу створювати й освітлювати темні кути.",
		personality: "Ви талановиті руками чи головою, швидко схоплюєте суть. Інші тягнуться до вашого тепла та ідей.",
		golden: "Ваш ключ — майстерність. Коли ви вкладаєте вогонь у ремесло чи творчість, він дає світло і вам, і людям."
	},
	gebo: {
		keys: "дар · партнерство · обмін",
		essence: "Ваша основа — рівновага між «давати» і «отримувати». Ви прийшли будувати зв’язки.",
		personality: "Ви щедрі, вмієте домовлятися й об’єднувати людей. Партнерство для вас — природний стан.",
		golden: "Ваш ключ — чесний обмін. Сила приходить через союзи, де обидві сторони дають і отримують порівну."
	},
	wunjo: {
		keys: "радість · гармонія · спільнота",
		essence: "Ви народжені з даром радості та гармонії. Ваше природне прагнення — щоб усім поруч було добре.",
		personality: "Ви легкі в спілкуванні й створюєте атмосферу. Біля вас людям тепло, команда при вас збирається сама.",
		golden: "Ваш ключ — радість як сила. Коли ви робите те, що приносить задоволення, результат приходить легше."
	},
	hagalaz: {
		keys: "зміни · стихія · очищення",
		essence: "Ви прийшли з силою, яка проходить крізь кризи. Зміни — не ваш ворог, а ваша стихія.",
		personality: "Ви не боїтесь ламати старе і швидко реагуєте на несподіване. У кризі ви — той, хто не губиться.",
		golden: "Ваш ключ — прийняти зміни. Кожен злам очищає місце для нового, і саме через нього ви зростаєте."
	},
	nauthiz: {
		keys: "необхідність · терпіння · загартування",
		essence: "Ваша основа загартована обмеженнями. Ви знаєте, як вижити й вистояти там, де бракує ресурсу.",
		personality: "Ви терплячі, витривалі та вмієте працювати з тим, що є. На вас можна покластися у скрутний час.",
		golden: "Ваш ключ — перетворити нестачу на рушій. Коли ви чесно бачите свою потребу, вона веде до рішення."
	},
	isa: {
		keys: "зосередженість · стійкість · воля",
		essence: "Ви народжені з внутрішнім стрижнем. Вас складно зрушити з того, у чому ви впевнені.",
		personality: "Ви стримані, зібрані й самодостатні. Інші бачать у вас спокій і силу волі.",
		golden: "Ваш ключ — пауза і фокус. Коли ви зупиняєтесь, щоб зібратися, ваші рішення стають точними."
	},
	jera: {
		keys: "врожай · цикли · терпіння",
		essence: "Ваша основа — природний ритм: посіяти, дочекатися, зібрати. Ви інтуїтивно відчуваєте час.",
		personality: "Ви послідовні та доводите справи до кінця. Ваші результати накопичуються і з часом стають вагомими.",
		golden: "Ваш ключ — довгострокова праця. Те, що ви вкладаєте сьогодні, обов’язково повернеться врожаєм."
	},
	eihwaz: {
		keys: "витримка · захист · зв’язок світів",
		essence: "Ви прийшли з глибиною і стійкістю тиса. Ви витримуєте те, що для інших стає межею.",
		personality: "Ви надійні, мудрі не за віком і вмієте бачити наслідки. Люди відчувають у вас опору.",
		golden: "Ваш ключ — пройти крізь випробування. Саме через складне ви знаходите свою справжню силу."
	},
	perthro: {
		keys: "таємниця · доля · інтуїція",
		essence: "Ваша основа пов’язана з таємницею і долею. Ви відчуваєте більше, ніж можна пояснити.",
		personality: "Ви глибокі, інтуїтивні й не розкриваєтесь одразу. У вас є «щось», що притягує інших.",
		golden: "Ваш ключ — довіра до потоку і чуття. Коли ви слухаєте інтуїцію, удача стає на ваш бік."
	},
	algiz: {
		keys: "захист · опіка · зв’язок з вищим",
		essence: "Ви народжені під захистом. У вас є внутрішнє відчуття меж і зв’язок із чимось більшим.",
		personality: "Ви оберігаєте близьких і відчуваєте небезпеку заздалегідь. Поруч із вами люди почуваються безпечно.",
		golden: "Ваш ключ — чіткі межі. Коли ви захищаєте себе і свій простір, ви маєте сили допомагати іншим."
	},
	sowilo: {
		keys: "сонце · перемога · сила волі",
		essence: "Ваша основа — сонячна енергія і прагнення до мети. Ви народжені, щоб світити й перемагати.",
		personality: "Ви енергійні, цілеспрямовані й помітні. Люди тягнуться до вашої впевненості.",
		golden: "Ваш ключ — ясна ціль. Коли ви знаєте, куди йдете, ваша енергія стає непереможною."
	},
	tiwaz: {
		keys: "справедливість · честь · мужність",
		essence: "Ви прийшли з внутрішнім законом честі. Справедливість для вас — не слово, а основа.",
		personality: "Ви чесні, сміливі й готові брати відповідальність. Вам довіряють як лідеру.",
		golden: "Ваш ключ — служіння справі. Коли ви боретесь за те, що вважаєте правильним, сила приходить сама."
	},
	berkano: {
		keys: "зростання · турбота · народження нового",
		essence: "Ваша основа — сила зростання і турботи. Ви вмієте давати життя ідеям, справам і людям.",
		personality: "Ви дбайливі, теплі й уважні до деталей. Біля вас усе розквітає — від стосунків до проєктів.",
		golden: "Ваш ключ — плекати. Коли ви терпляче вирощуєте своє, результат перевершує очікування."
	},
	ehwaz: {
		keys: "рух · довіра · партнерство",
		essence: "Ви народжені для руху вперед разом з іншими. Ваша сила розкривається в тандемі.",
		personality: "Ви легко знаходите спільну мову і швидко адаптуєтесь. З вами приємно йти до спільної мети.",
		golden: "Ваш ключ — довіра і рух. Правильний партнер і чесна співпраця відкривають вам нові дороги."
	},
	mannaz: {
		keys: "людина · самопізнання · спільнота",
		essence: "Ваша основа — пізнання себе і людей. Ви глибоко відчуваєте, що таке бути людиною.",
		personality: "Ви розумні, уважні до інших і вмієте жити в спільноті. Люди бачать у вас «свого».",
		golden: "Ваш ключ — бути собою. Коли ви приймаєте свою природу, ви знаходите своє місце серед людей."
	},
	laguz: {
		keys: "потік · інтуїція · чуттєвість",
		essence: "Ви прийшли з силою води: гнучкою, глибокою і невпинною. Ви відчуваєте течії, яких інші не бачать.",
		personality: "Ви емпатичні, творчі й тонко відчуваєте людей. Ви м’які, але вмієте обходити будь-яку перешкоду.",
		golden: "Ваш ключ — довіра до потоку. Коли ви не опираєтесь, а пливете за течією свого чуття, все складається."
	},
	ingwaz: {
		keys: "завершення · родючість · внутрішній потенціал",
		essence: "Ваша основа — прихований потенціал, що визріває всередині. Ви накопичуєте силу, перш ніж її проявити.",
		personality: "Ви доводите справи до завершення і вмієте чекати. Коли ви «вистрілюєте», це помітно всім.",
		golden: "Ваш ключ — завершувати цикли. Закриваючи старе, ви звільняєте сили для нового старту."
	},
	othala: {
		keys: "рід · дім · спадок",
		essence: "Ви народжені з силою роду. У вас є коріння, і саме воно тримає вас у бурю.",
		personality: "Ви цінуєте дім, традиції та своїх. Ви будуєте те, що залишиться після вас.",
		golden: "Ваш ключ — опора на рід. Коли ви шануєте своє коріння, ви отримуєте його силу і підтримку."
	},
	dagaz: {
		keys: "світанок · прорив · трансформація",
		essence: "Ваша основа — сила переходу від темряви до світла. Ви прийшли змінювати і пробуджувати.",
		personality: "Ви несете оновлення, легко бачите нові можливості. Поруч із вами люди прокидаються.",
		golden: "Ваш ключ — сміливість до змін. Ваш прорив стається в ту мить, коли ви наважуєтесь на новий день."
	},
	wyrd: {
		keys: "доля · невідоме · чистий аркуш",
		essence: "Порожня руна в основі — знак того, що ваша доля ще пишеться. Ви не скуті наперед заданим сценарієм.",
		personality: "Вас складно «прочитати» з першого погляду. Ви проявляєтесь по-різному залежно від шляху, який обираєте.",
		golden: "Ваш ключ — свобода вибору. Ваша сила в тому, щоб самостійно вирішувати, чим наповнити свій шлях."
	}
};
(function() {
	const form = document.getElementById("irkForm");
	if (!form) return;
	const $ = (id) => document.getElementById(id);
	const CYR = {
		"а": 1,
		"и": 1,
		"і": 1,
		"с": 1,
		"ъ": 1,
		"б": 2,
		"й": 2,
		"т": 2,
		"ы": 2,
		"ґ": 2,
		"в": 3,
		"к": 3,
		"у": 3,
		"ь": 3,
		"г": 4,
		"л": 4,
		"ф": 4,
		"э": 4,
		"д": 5,
		"м": 5,
		"х": 5,
		"ю": 5,
		"е": 6,
		"н": 6,
		"ц": 6,
		"я": 6,
		"є": 6,
		"ё": 7,
		"о": 7,
		"ч": 7,
		"ї": 7,
		"ж": 8,
		"п": 8,
		"ш": 8,
		"з": 9,
		"р": 9,
		"щ": 9
	};
	const LAT = {
		"a": 1,
		"j": 1,
		"s": 1,
		"b": 2,
		"k": 2,
		"t": 2,
		"c": 3,
		"l": 3,
		"u": 3,
		"d": 4,
		"m": 4,
		"v": 4,
		"e": 5,
		"n": 5,
		"w": 5,
		"f": 6,
		"o": 6,
		"x": 6,
		"g": 7,
		"p": 7,
		"y": 7,
		"h": 8,
		"q": 8,
		"z": 8,
		"i": 9,
		"r": 9
	};
	const LOOKALIKE = {
		"a": "а",
		"c": "с",
		"e": "е",
		"i": "і",
		"o": "о",
		"p": "р",
		"x": "х",
		"y": "у",
		"k": "к",
		"m": "м",
		"h": "н",
		"t": "т",
		"b": "в"
	};
	const SEPARATORS = /[\s'’ʼ`´ʹ‘\-‐–—.]/g;
	const isCyr = (ch) => /[Ѐ-ӿ]/.test(ch);
	const isLat = (ch) => /[a-z]/.test(ch);
	function prepare(raw) {
		let s = (raw || "").toLowerCase().normalize("NFC").replace(SEPARATORS, "");
		const cyr = [...s].filter(isCyr).length;
		const latPlain = s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/ß/g, "ss");
		const lat = [...latPlain].filter(isLat).length;
		if (cyr && cyr >= lat) {
			s = [...s].map((ch) => isLat(ch) && LOOKALIKE[ch] ? LOOKALIKE[ch] : ch).join("");
			return {
				script: "cyr",
				text: s,
				map: CYR
			};
		}
		if (lat) return {
			script: "lat",
			text: latPlain,
			map: LAT
		};
		return {
			script: null,
			text: s,
			map: CYR
		};
	}
	function wordValue(raw) {
		const p = prepare(raw);
		let sum = 0;
		const unknown = /* @__PURE__ */ new Set();
		const letters = [];
		for (const ch of p.text) if (p.map[ch]) {
			sum += p.map[ch];
			letters.push(`${ch}=${p.map[ch]}`);
		} else unknown.add(ch);
		return {
			...p,
			sum,
			unknown: [...unknown],
			letters
		};
	}
	const RUNES = {
		1: {
			1: [
				"fehu",
				"Феху",
				"ᚠ"
			],
			2: [
				"hagalaz",
				"Хагалаз",
				"ᚺ"
			],
			3: [
				"tiwaz",
				"Тейваз",
				"ᛏ"
			]
		},
		2: {
			1: [
				"uruz",
				"Уруз",
				"ᚢ"
			],
			2: [
				"nauthiz",
				"Наутіз",
				"ᚾ"
			],
			3: [
				"berkano",
				"Беркана",
				"ᛒ"
			]
		},
		3: {
			1: [
				"thurisaz",
				"Турісаз",
				"ᚦ"
			],
			2: [
				"isa",
				"Іса",
				"ᛁ"
			],
			3: [
				"ehwaz",
				"Еваз",
				"ᛖ"
			]
		},
		4: {
			1: [
				"ansuz",
				"Ансуз",
				"ᚨ"
			],
			2: [
				"jera",
				"Йера",
				"ᛃ"
			],
			3: [
				"mannaz",
				"Манназ",
				"ᛗ"
			]
		},
		5: {
			1: [
				"raido",
				"Райдо",
				"ᚱ"
			],
			2: [
				"eihwaz",
				"Ейваз",
				"ᛇ"
			],
			3: [
				"laguz",
				"Лагуз",
				"ᛚ"
			]
		},
		6: {
			1: [
				"kenaz",
				"Кеназ",
				"ᚲ"
			],
			2: [
				"perthro",
				"Перт",
				"ᛈ"
			],
			3: [
				"ingwaz",
				"Інгваз",
				"ᛜ"
			]
		},
		7: {
			1: [
				"gebo",
				"Гебо",
				"ᚷ"
			],
			2: [
				"algiz",
				"Альгіз",
				"ᛉ"
			],
			3: [
				"othala",
				"Отал",
				"ᛟ"
			]
		},
		8: {
			1: [
				"wunjo",
				"Вуньо",
				"ᚹ"
			],
			2: [
				"sowilo",
				"Соулу",
				"ᛊ"
			],
			3: [
				"dagaz",
				"Дагаз",
				"ᛞ"
			]
		}
	};
	const EMPTY = [
		null,
		"Вірд",
		""
	];
	const ETT_NAMES = {
		1: "Ат Фрейра",
		2: "Ат Хагала",
		3: "Ат Тюра"
	};
	const getRune = (group, ett) => group === 9 ? EMPTY : RUNES[group][ett];
	function reduce(num) {
		if (!num) return 9;
		let v = Math.abs(num);
		while (v > 9) v = String(v).split("").reduce((a, b) => a + Number(b), 0);
		return v;
	}
	function getEtt(num) {
		const v = reduce(num);
		if ([
			1,
			4,
			7
		].includes(v)) return 1;
		if ([
			2,
			5,
			8
		].includes(v)) return 2;
		return 3;
	}
	function decideEtt(votes, fallback) {
		const v = votes.filter((x) => x != null);
		for (const e of v) if (v.filter((x) => x === e).length >= 2) return e;
		return getEtt(fallback);
	}
	const dob = $("irkDob");
	const surname = $("irkSurname");
	const name = $("irkName");
	const patronymic = $("irkPatronymic");
	const patField = $("irkPatronymicField");
	const errorBox = $("irkError");
	dob.addEventListener("input", () => {
		const d = dob.value.replace(/\D/g, "").slice(0, 8);
		let v = d.slice(0, 2);
		if (d.length > 2) v += "." + d.slice(2, 4);
		if (d.length > 4) v += "." + d.slice(4);
		dob.value = v;
	});
	function updatePatronymic() {
		const latin = prepare(surname.value + name.value).script === "lat";
		patField.classList.toggle("is-off", latin);
		patronymic.disabled = latin;
	}
	surname.addEventListener("input", updatePatronymic);
	name.addEventListener("input", updatePatronymic);
	function parseDob(v) {
		const m = v.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
		if (!m) return null;
		const d = +m[1], mo = +m[2], y = +m[3];
		const t = new Date(Date.UTC(y, mo - 1, d));
		if (t.getUTCFullYear() !== y || t.getUTCMonth() !== mo - 1 || t.getUTCDate() !== d || y < 1900 || t > /* @__PURE__ */ new Date()) return null;
		return {
			d,
			m: mo,
			y
		};
	}
	const showError = (t) => {
		errorBox.textContent = t;
		errorBox.hidden = false;
	};
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		errorBox.hidden = true;
		const date = parseDob(dob.value);
		if (!date) return showError("Вкажіть дату народження у форматі ДД.ММ.РРРР, наприклад 14.04.1990.");
		if (!surname.value.trim() || !name.value.trim()) return showError("Заповніть прізвище та ім’я.");
		const F = wordValue(surname.value);
		const I = wordValue(name.value);
		const O = !patronymic.disabled && patronymic.value.trim() !== "" ? wordValue(patronymic.value) : null;
		const parts = [
			F,
			I,
			O
		].filter(Boolean);
		if (new Set(parts.map((p) => p.script).filter(Boolean)).size > 1) return showError("Схоже, частина імені написана кирилицею, а частина — латиницею. Напишіть усе однією мовою.");
		const bad = [...new Set(parts.flatMap((p) => p.unknown))];
		if (parts.some((p) => !p.sum)) return showError("Не вдалося розпізнати літери в одному з полів. Перевірте написання.");
		const sumD = reduce(date.d), sumM = reduce(date.m), sumY = reduce(date.y);
		const essenceGroup = reduce(sumD + sumM + sumY);
		const essenceEtt = decideEtt([
			getEtt(date.d),
			getEtt(date.m),
			getEtt(date.y)
		], essenceGroup);
		const fNum = reduce(F.sum), iNum = reduce(I.sum), oNum = O ? reduce(O.sum) : null;
		const personalityGroup = reduce(fNum + iNum + (oNum || 0));
		const personalityEtt = decideEtt([
			getEtt(fNum),
			getEtt(iNum),
			oNum != null ? getEtt(oNum) : null
		], personalityGroup);
		const goldenGroup = reduce(essenceGroup + personalityGroup);
		const goldenEtt = decideEtt([
			getEtt(sumD + iNum),
			getEtt(sumM + (oNum || 0)),
			getEtt(sumY + fNum)
		], goldenGroup);
		render([
			{
				key: "essence",
				title: "Руна Сутності",
				sub: "за датою народження",
				group: essenceGroup,
				ett: essenceEtt
			},
			{
				key: "personality",
				title: "Руна Особистості",
				sub: "за ім’ям",
				group: personalityGroup,
				ett: personalityEtt
			},
			{
				key: "golden",
				title: "Золота руна",
				sub: "поєднання дати та імені",
				group: goldenGroup,
				ett: goldenEtt
			}
		].map((r) => ({
			...r,
			rune: getRune(r.group, r.ett)
		})), {
			date,
			sumD,
			sumM,
			sumY,
			F,
			I,
			O,
			fNum,
			iNum,
			oNum,
			bad
		});
	});
	const cardsBox = $("irkCards");
	function flip(card) {
		const on = card.classList.toggle("is-flipped");
		card.setAttribute("aria-pressed", on);
	}
	cardsBox.addEventListener("click", (e) => {
		const card = e.target.closest(".irk-card");
		if (card) flip(card);
	});
	cardsBox.addEventListener("keydown", (e) => {
		const card = e.target.closest(".irk-card");
		if (card && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault();
			flip(card);
		}
	});
	function render(res, x) {
		$("irkCode").innerHTML = `<span class="irk-code__label">Ваш код</span>` + res.map((r) => `<span class="irk-code__rune"><b>${r.rune[2] || "◻"}</b>${r.rune[1]}</span>`).join("<span class=\"irk-code__sep\">—</span>");
		const TEXTS = window.IRK_TEXTS || {};
		const POS = window.IRK_POSITIONS || {};
		$("irkCards").innerHTML = res.map((r, i) => {
			const [img, title, sign] = r.rune;
			const t = TEXTS[img || "wyrd"] || {};
			const art = img ? `<img class="irk-card__art" src="/assets/img/irk/${img}.webp" alt="" loading="lazy">` : `<div class="irk-card__art irk-card__art--empty" aria-hidden="true"></div>`;
			return `
				<article class="irk-card irk-card--${r.key} reveal" style="transition-delay:${i * .12}s"
					tabindex="0" role="button" aria-pressed="false" aria-label="${r.title}: ${title}. Натисніть, щоб прочитати опис">
					<div class="irk-card__flip">
						<div class="irk-card__face irk-card__face--front">
							<div class="irk-card__head">
								<span class="irk-card__num">${[
				"I",
				"II",
				"III"
			][i]}</span>
								<h3 class="irk-card__title">${r.title}</h3>
								<span class="irk-card__sub">${r.sub}</span>
							</div>
							<div class="irk-card__media">${art}<span class="irk-card__sign" aria-hidden="true">${sign || "<i class=\"irk-blank\"></i>"}</span></div>
							<div class="irk-card__name">${title}</div>
							<div class="irk-card__meta">${r.group === 9 ? "Порожня руна" : `${ETT_NAMES[r.ett]} · група ${r.group}`}</div>
							<span class="irk-card__hint" aria-hidden="true">↻ Прочитати опис</span>
						</div>
						<div class="irk-card__face irk-card__face--back">
							<span class="irk-card__num">${[
				"I",
				"II",
				"III"
			][i]} · ${r.title}</span>
							<div class="irk-card__back-sign" aria-hidden="true">${sign || "<i class=\"irk-blank\"></i>"}</div>
							<div class="irk-card__name">${title}</div>
							${t.keys ? `<p class="irk-card__keys">${t.keys}</p>` : ""}
							<p class="irk-card__position">${POS[r.key] || ""}</p>
							<p class="irk-card__text">${t[r.key] || ""}</p>
							<span class="irk-card__hint" aria-hidden="true">↺ Назад</span>
						</div>
					</div>
				</article>`;
		}).join("");
		const pad = (n) => String(n).padStart(2, "0");
		const word = (label, w, n) => `<li><span>${label}</span><div><b>${w.letters.length ? w.letters.join(" + ") + " = " + w.sum : "—"}</b> → ${n}</div></li>`;
		$("irkDetails").innerHTML = `
			<h4>Руна Сутності</h4>
			<ul>
				<li><span>День</span><div><b>${pad(x.date.d)}</b> → ${x.sumD}</div></li>
				<li><span>Місяць</span><div><b>${pad(x.date.m)}</b> → ${x.sumM}</div></li>
				<li><span>Рік</span><div><b>${x.date.y}</b> → ${x.sumY}</div></li>
				<li><span>Група</span><div><b>${x.sumD} + ${x.sumM} + ${x.sumY}</b> → ${res[0].group}</div></li>
			</ul>
			<h4>Руна Особистості</h4>
			<ul>
				${word("Прізвище", x.F, x.fNum)}
				${word("Ім’я", x.I, x.iNum)}
				${x.O ? word("По батькові", x.O, x.oNum) : "<li><span>По батькові</span><div><b>не враховується</b></div></li>"}
				<li><span>Група</span><div><b>${x.fNum} + ${x.iNum}${x.O ? " + " + x.oNum : ""}</b> → ${res[1].group}</div></li>
			</ul>
			<h4>Золота руна</h4>
			<ul><li><span>Група</span><div><b>${res[0].group} + ${res[1].group}</b> → ${res[2].group}</div></li></ul>
			<p class="irk-details__note">Апострофи, дефіси та пробіли не рахуються.${x.bad.length ? ` Не враховано символи: ${x.bad.join(" ")}.` : ""}</p>`;
		const result = $("irkResult");
		result.hidden = false;
		requestAnimationFrame(() => result.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")));
		result.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
})();
