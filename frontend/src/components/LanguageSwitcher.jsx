import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-2 items-center">
      <button 
        onClick={() => changeLang("en")}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        EN
      </button>

      <button 
        onClick={() => changeLang("ar")}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        AR
      </button>

      <button 
        onClick={() => changeLang("ru")}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        RU
      </button>

      <button 
        onClick={() => changeLang("tr")}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        TR
      </button>
    </div>
  );
}
