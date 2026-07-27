import { useTranslation } from 'react-i18next';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
        <span className="text-lg">
          {languages.find((lang) => lang.code === i18n.language)?.flag || '🌐'}
        </span>
        <span className="hidden sm:inline">
          {languages.find((lang) => lang.code === i18n.language)?.name || 'Language'}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors flex items-center gap-2 ${
              i18n.language === lang.code ? 'bg-gray-700' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-white">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
