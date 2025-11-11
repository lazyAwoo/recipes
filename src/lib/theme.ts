import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as Theme;
  }

  // Автоматически выбираем системную тему
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

export const theme = writable<Theme>(getInitialTheme());

// Следим за изменениями
theme.subscribe((value) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', value === 'dark');
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', value);
  }
});
