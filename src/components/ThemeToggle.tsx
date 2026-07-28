import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600 text-white'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
      }`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
      <span className="hidden sm:inline">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};
