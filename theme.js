const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme === 'dark' || (!storedTheme && systemDark)) {
  root.classList.add('dark');
}

function toggleTheme() {
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateIcon();
}

function updateIcon() {
  document.querySelectorAll('#themeToggle').forEach(btn => {
    btn.innerText = root.classList.contains('dark') ? '🌞' : '🌙';
  });
}

updateIcon();