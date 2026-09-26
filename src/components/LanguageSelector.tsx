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

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <div className="relative group">
      <button 
        className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        aria-label="Select language"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <span className="text-lg" aria-hidden="true">
          {currentLanguage?.flag || '🌐'}
        </span>
        <span className="hidden sm:inline">
          {currentLanguage?.name || 'Language'}
        </span>
      </button>
      <div 
        className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
        role="menu"
        aria-label="Language options"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors flex items-center gap-2 ${
              i18n.language === lang.code ? 'bg-gray-700' : ''
            }`}
            role="menuitem"
            aria-label={`Switch to ${lang.name}`}
            aria-current={i18n.language === lang.code ? 'true' : undefined}
          >
            <span className="text-lg" aria-hidden="true">{lang.flag}</span>
            <span className="text-white">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
