
(function () {
	const toggle = document.getElementById('theme-toggle');
	const body = document.body;
	const STORAGE_KEY = 'preferred-theme';

	function applyTheme(theme) {
		if (theme === 'light') {
			body.classList.add('light-theme');
			toggle.textContent = '🌞';
			toggle.setAttribute('aria-label', 'Switch to dark theme');
		} else {
			body.classList.remove('light-theme');
			toggle.textContent = '🌙';
			toggle.setAttribute('aria-label', 'Switch to light theme');
		}
	}

	function readStored() {
		try {
			return localStorage.getItem(STORAGE_KEY);
		} catch (e) {
			return null;
		}
	}

	
	const stored = readStored();
	if (stored === 'light' || stored === 'dark') {
		applyTheme(stored);
	} else {
		
		const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
		applyTheme(prefersLight ? 'light' : 'dark');
	}

	// Click handler
	if (toggle) {
		toggle.addEventListener('click', function () {
			const isLight = body.classList.contains('light-theme');
			const next = isLight ? 'dark' : 'light';
			applyTheme(next);
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch (e) {
				
			}
		});
	}
})();

	

(function () {
	const btn = document.getElementById('scroll-top');
	if (!btn) return;

	const SHOW_AFTER = 300;

	function update() {
		const y = window.pageYOffset || document.documentElement.scrollTop;
		if (y > SHOW_AFTER) btn.classList.add('show'); else btn.classList.remove('show');
	}


	function toTop() {
		try {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (e) {
			window.scrollTo(0, 0);
		}
		btn.blur();
	}

	window.addEventListener('scroll', update, { passive: true });

	update();

	btn.addEventListener('click', toTop);
	btn.addEventListener('keydown', function (e) {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
			e.preventDefault();
			toTop();
		}
	});
})();

