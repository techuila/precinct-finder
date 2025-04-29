import { useState, useEffect } from 'react';

function useToggleTheme() {
	// use theme from local storage if available or set light theme
	const _theme = localStorage.getItem('theme') ?? 'light';
	const [theme, setTheme] = useState(_theme);

	// update state on toggle
	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	// set theme state in localstorage on mount & also update localstorage on state change
	useEffect(() => {
		localStorage.setItem('theme', theme);
		// add custom data-theme attribute to html tag required to update theme using DaisyUI
		document.querySelector('html')?.setAttribute('data-theme', theme);
		document.querySelector('html')?.setAttribute('class', theme);
	}, [theme]);

	return { state: { theme }, actions: { handleToggle } };
}

export default useToggleTheme;
